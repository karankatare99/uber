import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import z from "zod";
import bcrypt from "bcryptjs";

const Schema = z.object({
  email: z.string().email(),
  password: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = Schema.safeParse(body);
    if (!parseResult.success) return NextResponse.json({ message: "Invalid Body", issues: parseResult.error.issues }, { status: 400 });

    const { email, password } = parseResult.data;
    
    const user = await prisma.user.findUnique({ where: { email }} );

    if (!user) {
      return NextResponse.json({ message: "User doesn't exist"}, { status: 404 })
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Wrong Password"}, { status: 401 })
    }

    const secretKey = process.env.JWT_SECRET!;
    if (!secretKey) {
      return NextResponse.json(
        { message: "Server misconfiguration: missing JWT_SECRET" },
        { status: 500 }
      );
    }

    const payload = { firstName: user.firstName, lastName: user.lastName, email, userType: user.userType }

    const key = new TextEncoder().encode(secretKey);
    const sessionToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

    
    const response = NextResponse.json(
      { 
        userData: { 
          id: user.id, 
          email: email, 
          userType: user.userType 
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
      console.error('login API error:', e);
      return NextResponse.json({ message: "Failed to login user" });
  }
}
