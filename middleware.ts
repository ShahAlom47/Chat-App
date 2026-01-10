// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const pathname = req.nextUrl.pathname;

  // 🔒 Protected routes
  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔁 logged-in user যেন login/register এ না যায়
  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// middleware কোন কোন route এ চলবে
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};
