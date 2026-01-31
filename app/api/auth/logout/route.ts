import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" }, 
      { status: 200 }
    );

    response.cookies.set("sessionToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/"
    });

    return response;
    
  } catch (e) {
    console.error('Logout error:', e);
    return NextResponse.json(
      { message: "Logout failed" }, 
      { status: 500 }
    );
  }
}
