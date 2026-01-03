"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  // ✅ CORRECT
  const registerUser = useAction(api.actions.register);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    toast.loading("Creating account...", { id: "register" });

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful 🎉", { id: "register" });
      reset();
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed", {
        id: "register",
      });
    }
  };

  // JSX same থাকবে
}
