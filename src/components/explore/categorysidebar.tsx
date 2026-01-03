'use client';

import { type LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategorySidebar = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) => {
  return (
    <div className="w-80 h-full bg-white z-20 border-r border-black/5 shrink-0 overflow-y-auto hidden md:flex md:flex-col shadow-xl">
      <div className="p-8 pb-4 border-b border-black/5 bg-[#FAFAFA]">
        <h4 className="font-serif text-xl">Índice</h4>
        <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-wider mt-2 font-sans">
          Curaduría por ambiente
        </p>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-6 py-4 rounded-lg flex items-center justify-between transition-all duration-300 group ${
            !activeCategory ? 'bg-gray-50' : 'hover:bg-gray-50/50'
          }`}
        >
          <span
            className={`font-sans text-sm tracking-wide ${
              !activeCategory
                ? 'text-[#1A1A1A] font-medium'
                : 'text-[#1A1A1A]/60 group-hover:text-[#1A1A1A]'
            }`}
          >
            Ver todo el mapa
          </span>
          {!activeCategory && <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />}
        </button>
        <div className="h-px bg-black/5 mx-6 my-2" />
        
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id === activeCategory ? null : cat.id)}
              className={`w-full text-left px-6 py-4 rounded-lg flex items-center justify-between transition-all duration-300 group relative
                ${isActive ? 'bg-[#EFEDE0]/50' : 'hover:bg-[#EFEDE0]/30'}
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className={`transition-colors ${
                    isActive
                      ? 'text-[#606C38]'
                      : 'text-[#1A1A1A]/30 group-hover:text-[#606C38]/70'
                  }`}
                />
                <span
                  className={`font-sans text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#1A1A1A] font-medium'
                      : 'text-[#1A1A1A]/70 font-light group-hover:text-[#1A1A1A]'
                  }`}
                >
                  {cat.label}
                </span>
              </div>
              <div
                className={`w-1 h-1 rounded-full bg-[#606C38] transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              />
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#606C38]/30 rounded-r transition-all duration-300 ${
                  isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="p-6 border-t border-black/5 bg-[#FAFAFA]">
        <p className="text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest text-center">
          Puerto Café ® 2025
        </p>
      </div>
    </div>
  );
};
