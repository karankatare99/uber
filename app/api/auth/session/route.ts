import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("sessionToken")?.value;

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const secretKey = process.env.JWT_SECRET!;
    const key = new TextEncoder().encode(secretKey);

    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"]
    })

    const user = await prisma.user.findFirst({
      where: { 
        id: payload.id as string,
        sessionToken: token 
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true
      }
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      }
    });
  } catch (e) {
      console.error('session API error:', e);
      return NextResponse.json({ message: "Failed to fetch user" });
  }
}
