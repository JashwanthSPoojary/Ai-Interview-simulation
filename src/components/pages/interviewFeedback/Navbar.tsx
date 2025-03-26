import React from 'react';
import { Home, Trophy } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">InterviewAI</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;