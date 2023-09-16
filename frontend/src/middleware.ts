import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("sambandh_token")?.value || "";
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/feeds", request.url));
  } else if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/register", "/login", "/account/:path*"],
};
