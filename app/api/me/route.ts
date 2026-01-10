// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session");

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // future: session → user lookup from DB
  return NextResponse.json({
    user: { loggedIn: true },
  });
}
