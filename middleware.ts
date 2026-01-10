// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  console.log(session,'session ')

  // if (!session) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}
