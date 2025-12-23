import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Send message
 */
export const sendMessage = mutation({
  args: {
    senderId: v.id("users"),
    receiverId: v.id("users"),
    text: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("image"),
      v.literal("file")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      text: args.text,
      type: args.type,
      isSeen: false,
      createdAt: Date.now(),
    });
  },
});

/**
 * Get messages between two users
 */
export const getMessages = query({
  args: {
    userA: v.id("users"),
    userB: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), args.userA),
            q.eq(q.field("receiverId"), args.userB)
          ),
          q.and(
            q.eq(q.field("senderId"), args.userB),
            q.eq(q.field("receiverId"), args.userA)
          )
        )
      )
      .collect();
  },
});
