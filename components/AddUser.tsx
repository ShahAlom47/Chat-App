"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AddUser() {
  const createUser = useMutation(api.user.createUser);

  const user = useQuery(api.user.getUserByUserId, {
    userId: "test-user-1",
  });

  const handleAddUser = async () => {
    await createUser({
      userId: "test-user-1",
      name: "Test User",
      email: "test@gmail.com",
      image: "",
    });
  };

  return (
    <div className="p-6">
      <button
        onClick={handleAddUser}
        className="px-4 py-2 bg-black text-white"
      >
        Add User
      </button>

      <pre className="mt-4 bg-gray-100 p-4">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
