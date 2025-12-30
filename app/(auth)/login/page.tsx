"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(email,password)
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false, // 🔴 MUST
  });

  console.log(res);

  if (res?.error) {
    alert(res.error);
  } else {
    window.location.href = "/";
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 border rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn btn-primary w-full">
          Login
        </button>
      </div>
    </div>
  );
}
