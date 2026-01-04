'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

export const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? 'bg-[#1A1A1A]/80 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`flex items-center gap-2 transition-opacity duration-300 ${
            isScrolled || isMenuOpen ? 'opacity-100' : 'opacity-100 md:opacity-50'
          }`}
        >
            <span className="text-white font-serif text-lg tracking-tight font-medium relative">
            Puerto Café 
            
            </span>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
        >
          {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Overlay del Menú (Placeholder funcional) */}
      <div
        className={`fixed inset-0 z-40 bg-[#1A1A1A] transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center space-y-8">
            {/* Aquí irán los links de navegación más adelante */}
            <span className="text-white/40 font-serif italic">Menú en construcción</span>
        </div>
      </div>
    </>
  );
};