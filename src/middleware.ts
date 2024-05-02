import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicPaths } from "./app/data/constants-data";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);
  const currentUser = request.cookies.get("userData")?.value;

  if (isPublicPath && currentUser) {
    return NextResponse.redirect(new URL("/app/message", request.nextUrl));
  }
  if (!isPublicPath && !currentUser) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (path === "/" && !currentUser) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  // navigate to home on root / currently disabled as there is no home. remove / from publicPaths when enabling these back
  // Redirect logged-in users from root to /app/home
  // if (path === "/" && currentUser) {
  //   return NextResponse.redirect(new URL("/app/home", request.nextUrl));
  // }

  // // If the user is not logged in and tries to access root, redirect to login
  // if (path === "/" && !currentUser) {
  //   return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  // }
}

export const config = {
  matcher: ["/app/:path*", "/auth/:path*", "/"],
};
