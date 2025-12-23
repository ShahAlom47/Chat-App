import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),

  messages: defineTable({
    text: v.string(),
    userId: v.id("users"),
  }),
});
