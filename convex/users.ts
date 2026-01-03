// convex/users.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

/* =========================
   REGISTER USER
========================= */

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // 1️⃣ Convert password to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(args.password);

    // 2️⃣ Hash using SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // 3️⃣ Insert into DB
    await ctx.db.insert("users", {
      userId: crypto.randomUUID(),
      name: args.name,
      email: args.email,
      password: hashedPassword, // ✅ hashed password
      role: "user",
      isOnline: false,
      lastSeen: Date.now(),
    });

    return { success: true };
  },
});


/* =========================
   GET USER BY userId
========================= */

export const getUserByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    return user;
  },
});

/* =========================
   GET USER BY EMAIL
========================= */

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

/* =========================
   GET ALL USERS
========================= */

export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});
