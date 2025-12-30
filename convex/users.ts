
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * ✅ Add a new user
 */
export const createUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // আগেই user আছে কিনা চেক
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existingUser) {
      return existingUser._id; // আগেই থাকলে নতুন add করবে না
    }

    // নতুন user add
    const userId = await ctx.db.insert("users", {
      userId: args.userId,
      name: args.name,
      email: args.email,
      image: args.image,

      role: "user",
      isOnline: true,
      lastSeen: Date.now(),
    });

    return userId;
  },
});


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
