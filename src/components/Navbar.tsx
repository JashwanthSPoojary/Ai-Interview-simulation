import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/">Home</Link>
      {session ? (
        <div className="flex gap-4">
          <span>{session.user?.name}</span>
          <SignOutButton />
        </div>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </nav>
  );
}