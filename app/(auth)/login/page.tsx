"use client";

import { useForm } from "react-hook-form";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type LoginForm = { email: string; password: string };

export default function Login() {
  const router = useRouter();
  const loginUser = useAction(api.users.loginUser);

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const user = await loginUser(data);
    if (!user) {
      toast.error("Invalid credentials");
      return;
    }

    // Save session (localStorage / context)
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Login successful");
    router.push("/dashboard"); // protected page
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      <input type="password" {...register("password")} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
