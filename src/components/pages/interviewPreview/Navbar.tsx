import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center gap-2 p-4 mb-4">
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 text-black border border-black rounded-md text-sm transition hover:bg-black hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Home</span>
      </Link>

      <Link
        href="/interview/setup"
        className="flex items-center gap-2 px-4 py-2 text-black border border-black rounded-md text-sm transition hover:bg-black hover:text-white"
      >
        <span>Previous</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default Navbar;
