import prisma from "@/lib/prisma";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(sessionToken, secretKey);
    
    const user = {
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      email: payload.email as string,
      userType: payload.userType as string
    };

    const body = await request.json();
    const { firstName, lastName } = body;

    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" }, 
        { status: 400 }
      );
    }

  const updatedUserFromDB = await prisma.user.update({
      where: { email: user.email },
      data: updateData,
    });

    const newPayload = {
      firstName: updatedUserFromDB.firstName!,
      lastName: updatedUserFromDB.lastName!,
      email: user.email,
      userType: user.userType
    };

    const newToken = await new SignJWT(newPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secretKey);

    const response = NextResponse.json({ 
      updatedUser: newPayload 
    });

    response.cookies.set("sessionToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (e) {
      console.error('profile API error:', e);
      return NextResponse.json({ message: "Failed to update user" });
  }
}