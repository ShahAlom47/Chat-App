"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { api } from "../_generated/api";

export default action({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<any> => {
    const hashed = await bcrypt.hash(args.password, 10);

    return ctx.runMutation(api.users.createUser, {
      name: args.name,
      email: args.email,
      password: hashed,
    });
  },
}) as any;


