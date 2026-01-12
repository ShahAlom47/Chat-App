import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Auth related
    userId: v.string(), // Clerk / Auth.js ID
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    password: v.string(), // hashed password

    // Role & status
    role: v.union(
      v.literal("admin"),
      v.literal("user")
    ),

    isOnline: v.boolean(),
    lastSeen: v.number(), // Date.now()

    // Profile
    about: v.optional(v.string()),
    phone: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

    sessions: defineTable({
  token: v.string(),              // random session token
  userId: v.id("users"),          // relation with users table
  expiresAt: v.number(),          // Date.now() + ttl
})
  .index("by_token", ["token"])
  .index("by_userId", ["userId"]),


  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),

    text: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("image"),
      v.literal("file")
    ),

    isSeen: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_receiver", ["receiverId"])
    .index("by_sender", ["senderId"]),
});
