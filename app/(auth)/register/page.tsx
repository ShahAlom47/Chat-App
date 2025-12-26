"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const userId = crypto.randomUUID();
      await api.user.createUser.mutate({
        userId,
        name,
        email,
      });

      // registration success → redirect to login
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
