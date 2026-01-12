"use client"
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import React from "react";

const Navbar = () => {

   const { user, loading } = useAuth();
   console.log(user, loading);
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          MyApp
        </Link>

        {/* Menu */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="hover:text-blue-600 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="hover:text-blue-600 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
