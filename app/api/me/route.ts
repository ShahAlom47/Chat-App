// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session");

  if (!session) {
    return NextResponse.json(
      { user: null },
      { status: 200 } // ⚠️ 401 না
    );
  }

  return NextResponse.json({
    user: { loggedIn: true },
  });
}
