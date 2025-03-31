"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100/20 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-bold">
            InterviewAI
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/"
            className=" flex  gap-1.5 rounded-full bg-black text-white px-6 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-gray-800 shadow hover:shadow-md"
          >
            <HomeIcon/> <p>Go Home</p>
          </Link>
        </div>
      </div>
    </header>
  );
}