// app/api/login/route.ts
import { NextResponse } from "next/server";
import { convex } from "@/lib/convexClient";
import { api } from "@/convex/_generated/api";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await convex.mutation(api.auth.loginUser, {
    email,
    password,
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // 🔐 Create session token
  const sessionToken = crypto.randomUUID();

  // (optional) DB তে session save করা ভালো
  // convex.mutation(api.auth.createSession, {...})

  // 🍪 Set HTTP-only cookie
  cookies().set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ success: true });
}
