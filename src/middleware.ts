import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/signup" ||
    path === "/auth/forgot-password";
  const currentUser = request.cookies.get("userData")?.value;

  if (isPublicPath && currentUser) {
    return NextResponse.redirect(new URL("/app/message", request.nextUrl));
  }
  if (!isPublicPath && !currentUser) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  // Redirect logged-in users from root to /app/home
  if (path === "/" && currentUser) {
    return NextResponse.redirect(new URL("/app/home", request.nextUrl));
  }

  // If the user is not logged in and tries to access root, redirect to login
  if (path === "/" && !currentUser) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/app/:path*", "/auth/:path*", "/"],
};
