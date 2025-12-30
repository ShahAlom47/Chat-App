"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    toast.loading("Logging in...", { id: "login" });

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
console.log(res)
    if (res?.error) {
      toast.error(res.error, { id: "login" });
    } else {
      toast.success("Login successful 🎉", { id: "login" });
      reset();
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 border rounded-xl space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
