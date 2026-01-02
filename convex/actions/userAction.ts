import { action } from "../_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { api } from "../_generated/api";

export const registerAction = action({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const hashed = await bcrypt.hash(args.password, 10);

    return await ctx.runMutation(api.users.createUser, {
      name: args.name,
      email: args.email,
      password: hashed,
    });
  },
} as const);

