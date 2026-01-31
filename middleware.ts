import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Verify token validity
  if (sessionToken && isProtectedRoute) {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(sessionToken, secretKey);
      return NextResponse.next();
    } catch (error) {
      // Invalid/expired token - redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/";
      const response = NextResponse.redirect(url);
      response.cookies.delete("sessionToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
