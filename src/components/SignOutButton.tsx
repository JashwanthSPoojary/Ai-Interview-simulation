"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut()} 
      className="p-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}