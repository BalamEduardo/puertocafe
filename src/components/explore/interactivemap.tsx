'use client';

import type { ExploreCafe } from './types';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  cafes: ExploreCafe[];
  activeCategory: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
}


export const InteractiveMap = ({ cafes, activeCategory, selectedId, onSelect }: InteractiveMapProps) => {
  const mapCenterOffset = activeCategory ? 'translate-x-[5%]' : 'translate-x-0';
  const mapPanelOffset = selectedId ? 'translate-x-[-15%]' : 'translate-x-0';

  return (
    <div className="relative w-full h-full bg-[#E5E3D0] overflow-hidden group">
      <div 
        className={`absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${mapCenterOffset} ${mapPanelOffset}`}
        style={{
          backgroundImage: 'radial-gradient(#CFCBB6 2px, transparent 2px), radial-gradient(#CFCBB6 2px, transparent 2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D6D3BC] opacity-50 blur-3xl transform skew-x-12 translate-x-20"></div>
        {cafes.map((cafe) => {
          const isSelected = selectedId === cafe.id;
          const matchesCategory = !activeCategory || cafe.categoryIds.includes(activeCategory);
          const isDimmed = !matchesCategory;

          return (
            <button
              key={cafe.id}
              onClick={(e) => { e.stopPropagation(); onSelect(cafe.id); }}
              disabled={isDimmed && !isSelected}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group/pin z-10
                ${isSelected ? 'scale-125 z-30' : 'hover:scale-110 hover:z-20'}
                ${isDimmed ? 'opacity-30 grayscale scale-90 z-0' : 'opacity-100'}
              `}
              style={{ left: `${cafe.coords.x}%`, top: `${cafe.coords.y}%` }}
            >
              <div className={`relative flex flex-col items-center gap-2`}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300
                  ${isSelected ? 'bg-[#1A1A1A] text-white' : 'bg-[#606C38] text-white group-hover/pin:bg-[#1A1A1A]'}
                  ${isDimmed ? 'bg-gray-400' : ''}
                `}>
                  <MapPin size={16} fill={isSelected ? "white" : "none"} />
                </div>
                <span className={`
                  absolute top-10 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-[10px] font-medium uppercase tracking-wide
                  transition-all duration-300 origin-top
                  ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover/pin:opacity-100 group-hover/pin:scale-100'}
                `}>
                  {cafe.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-4 text-[#1A1A1A]/20 text-[10px] uppercase tracking-widest pointer-events-none">
        Mapa Interactivo Conceptual
      </div>
    </div>
  );
};
