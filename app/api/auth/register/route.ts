import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

const Schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  userType: z.enum(["driver", "rider"])
})

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = Schema.safeParse(body);
    if (!parseResult.success) return NextResponse.json({ message: "Invalid Body", issues: parseResult.error.issues }, { status: 400 });

    const { firstName, lastName, email, password, userType } = parseResult.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = { firstName, lastName, email, userType };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return NextResponse.json(
        { message: "Server misconfiguration: missing JWT_SECRET" },
        { status: 500 }
      );
    }

    const key = new TextEncoder().encode(secretKey);
    const sessionToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

    const newUser = await prisma.user.create({ data: { firstName, lastName, email, password: hashedPassword, userType, sessionToken } });

    const response = NextResponse.json(
      { 
        newUserData: { 
          id: newUser.id, 
          email: newUser.email, 
          userType: newUser.userType 
        }
      }, 
      { status: 201 }
    );

    response.cookies.set("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,  // 7 days
      path: "/"
    });

    return response
  } catch (e) {
      console.error('register API error:', e);
      return NextResponse.json({ message: "Failed to create user" });
  }
}
