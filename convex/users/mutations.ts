
import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // basic validation
      if (!args.userId)
        return { success: false, field: "userId", message: "Invalid user ID" };

      if (!args.email)
        return { success: false, field: "email", message: "Email is required" };

      const now = Date.now();

      const existing = await ctx.db
        .query("users")
        .withIndex("by_userId", q => q.eq("userId", args.userId))
        .first();

      // update user
      if (existing) {
        await ctx.db.patch(existing._id, {
          isOnline: true,
          lastSeen: now,
        });

        return {
          success: true,
          type: "update",
          message: "User session updated",
        };
      }

      // create user
      await ctx.db.insert("users", {
        userId: args.userId,
        name: args.name || "Unknown",
        email: args.email,
        image: args.image,
        role: "user",
        isOnline: true,
        lastSeen: now,
      });

      return {
        success: true,
        type: "create",
        message: "User account created",
      };
    } catch (error) {
      return {
        success: false,
        field: "server",
        message: "Something went wrong while syncing user",
      };
    }
  },
});
