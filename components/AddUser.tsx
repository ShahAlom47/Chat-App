"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function AddUser() {


  const user = useQuery(api.users.getUserByUserId, {
    userId: "test-user-3",
  });

  
  const allUsers = useQuery(api.users.getAllUsers, {});
  console.log(allUsers)
 


  return (
    <div className="p-6 space-y-4">
  

      {/* <pre className="bg-gray-100 p-4 text-sm rounded">
        {JSON.stringify(user, null, 2)}
      </pre> */}
<h1>All User </h1>
      {
        allUsers ? (
          <ul>
            {allUsers.map((user) => ( 
              <li key={user._id}>
                {user.name} ({user.email})
              </li> 
            ))}
          </ul>
        ) : <p>Loading users...</p>
      }
    </div>
  );
}
