'use client';

import { Menu } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

export const Navbar = ({ isScrolled }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1A1A1A]/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`flex items-center gap-2 transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-50'
        }`}
      >
        <span className="text-white font-serif text-lg tracking-tight font-medium">
          Puerto Café
        </span>
      </div>
      <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
        <Menu size={24} strokeWidth={1.5} />
      </button>
    </nav>
  );
};
