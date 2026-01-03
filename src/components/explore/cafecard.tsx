'use client';

import { MapPin, ArrowRight } from 'lucide-react';

import type { ExploreCafe } from './types';

interface CafeCardProps {
  cafe: ExploreCafe;
  onClick: () => void;
}

export const CafeCard = ({ cafe, onClick }: CafeCardProps) => {
  return (
    <div
      className="group cursor-pointer flex flex-col gap-4"
      onClick={onClick}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded bg-gray-200">
        <img
          src={cafe.image}
          alt={cafe.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-[#1A1A1A]/90 backdrop-blur text-white text-[10px] font-medium tracking-wider uppercase rounded-sm">
            {cafe.type}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]">
              Descubrir
            </span>
            <ArrowRight size={14} className="text-[#1A1A1A]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pr-4">
        <div className="flex justify-between items-baseline border-b border-black/5 pb-2 mb-2">
          <h3 className="font-serif text-2xl text-[#1A1A1A] group-hover:text-[#606C38] transition-colors">
            {cafe.name}
          </h3>
          <span className="font-sans text-xs text-[#1A1A1A]/50">{cafe.price}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={14} className="text-[#606C38]" />
          <span className="font-sans text-xs uppercase tracking-wide text-[#1A1A1A]/70">
            {cafe.zone}
          </span>
        </div>
        <p className="font-sans text-sm text-[#1A1A1A]/60 font-light leading-relaxed line-clamp-2">
          {cafe.description}
        </p>
      </div>
    </div>
  );
};
