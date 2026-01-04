'use client';

import { type LucideIcon, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchFilterItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  options?: string[];
  active?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  onSelect?: (val: string) => void;
}

export const SearchFilterItem = ({ 
  icon: Icon, 
  label, 
  value, 
  options = [], 
  active = false, 
  isOpen = false,
  onToggle,
  onSelect 
}: SearchFilterItemProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={onToggle}
        className="flex items-center gap-3 px-4 py-2 group hover:bg-black/5 transition-colors rounded-full text-left min-w-[140px] relative z-10"
      >
        <div className={`p-2 rounded-full transition-colors duration-300 ${
          active || isOpen
            ? 'bg-[#606C38] text-white shadow-md' 
            : 'bg-[#EFEDE0] text-[#1A1A1A] group-hover:bg-[#E5E3D0]'
        }`}>
          <Icon size={16} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</span>
          <span className={`text-sm font-medium font-sans truncate max-w-[100px] transition-colors ${
            active || isOpen ? 'text-[#606C38]' : 'text-[#1A1A1A]'
          }`}>
            {value}
          </span>
        </div>
        
        {/* Flecha indicadora */}
        {options.length > 0 && (
          <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Menú Desplegable HACIA ARRIBA */}
      {isOpen && options.length > 0 && (
        <div className="absolute bottom-full left-0 mb-4 w-[180px] bg-white rounded-xl shadow-xl border border-black/5 py-2 overflow-hidden z-50 animate-fadeInUp origin-bottom-left">
          <div className="max-h-[240px] overflow-y-auto overscroll-contain">
             <button
                onClick={() => onSelect && onSelect('Todos')}
                className="w-full text-left px-4 py-2.5 text-sm text-[#1A1A1A]/50 hover:bg-[#FAFAFA] hover:text-[#606C38] transition-colors font-sans border-b border-black/5"
              >
                Cualquiera
              </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => onSelect && onSelect(opt)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-sans flex justify-between items-center ${
                  value === opt 
                    ? 'bg-[#606C38]/5 text-[#606C38] font-medium' 
                    : 'text-[#1A1A1A] hover:bg-[#FAFAFA] hover:text-[#606C38]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};