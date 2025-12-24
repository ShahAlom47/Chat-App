"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function AddUser() {
  // ✅ users (plural) — folder name অনুযায়ী
  const createUser = useMutation(api.user.createUser);

  const user = useQuery(api.user.getUserByUserId, {
    userId: "test-user-3",
  });

  const handleAddUser = async () => {
    const result = await createUser({
      userId: "test-user-3",
      name: "Test User 2",
      email: "test2@gmail.com",
      image: "",
    });
    console.log("Created user with ID:", result);
  };

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={handleAddUser}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Add User
      </button>

      <pre className="bg-gray-100 p-4 text-sm rounded">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
