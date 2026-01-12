// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db"; // 🔁 Mongo / Prisma / Convex

type JwtPayload = {
  userId: string;
};

export async function GET() {
  try {
    // 1️⃣ Cookie থেকে token নাও
    const session = cookies().get("session");

    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // 2️⃣ Token verify করো
    let payload: JwtPayload;

    try {
      payload = jwt.verify(
        session.value,
        process.env.JWT_SECRET!
      ) as JwtPayload;
    } catch {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // 3️⃣ DB থেকে user আনো
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // 4️⃣ Safe user object return
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("ME API ERROR:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
