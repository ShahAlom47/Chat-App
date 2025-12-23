import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create user after login (Clerk / NextAuth)
 */
export const createUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existingUser) return existingUser;

    return await ctx.db.insert("users", {
      userId: args.userId,
      name: args.name,
      email: args.email,
      image: args.image,
      role: "user",
      isOnline: true,
      lastSeen: Date.now(),
    });
  },
});

/**
 * Get current logged in user
 */
export const getUserByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
  },
});
