
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

/* =========================
   REGISTER USER
========================= */
export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // check existing user
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", args.email))
      .unique();

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const userId = await ctx.db.insert("users", {
      userId: args.email,
      name: args.name,
      email: args.email,
      password: hashedPassword,
      role: "user",
      isOnline: true,
      lastSeen: Date.now(),
    });

    return { userId };
  },
});





/**
 * ✅ Add a new user
 */


/**
 * ✅ Get user by userId
 */
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
// convex/users.ts


export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", args.email))
      .unique();
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  }
});
