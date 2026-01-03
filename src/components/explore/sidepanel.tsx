'use client';

import { X, Clock, DollarSign, MapPin, ArrowRight } from 'lucide-react';
import type { ExploreCafe } from './types';

interface Cafe {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  description: string;
  address: string;
}

interface SidePanelProps {
  cafe: ExploreCafe | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetail: (slug: string) => void;
}

export const SidePanel = ({ cafe, isOpen, onClose, onViewDetail }: SidePanelProps) => {
  if (!cafe) return null;

  return (
    <div
      className={`
        absolute top-4 bottom-4 right-4 w-100 bg-white rounded-xl shadow-2xl z-30 transform transition-transform duration-500 overflow-hidden flex flex-col border border-black/5
        ${isOpen ? 'translate-x-0' : 'translate-x-[110%]'}
      `}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-[#1A1A1A] transition-colors shadow-sm"
      >
        <X size={20} />
      </button>

      <div className="h-64 w-full relative shrink-0">
        <img
          src={cafe.image}
          className="w-full h-full object-cover"
          alt={cafe.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white">
          <span className="text-[10px] uppercase tracking-widest font-medium border border-white/30 px-2 py-1 rounded backdrop-blur-sm mb-2 inline-block">
            {cafe.type}
          </span>
          <h2 className="font-serif text-3xl">{cafe.name}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/60 font-sans mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock size={16} /> <span>Abierto hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} /> <span>{cafe.price}</span>
          </div>
        </div>
        <p className="font-serif text-lg leading-relaxed text-[#1A1A1A] mb-6">
          &quot;{cafe.description}&quot;
        </p>
        <div className="bg-[#EFEDE0]/50 p-4 rounded-lg flex items-start gap-3">
          <MapPin className="mt-1 text-[#606C38]" size={18} />
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">{cafe.address}</p>
            <p className="text-xs text-[#1A1A1A]/50 mt-1">Veracruz, Ver.</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 shrink-0 bg-white">
        <button
          onClick={() => onViewDetail(cafe.slug)}
          className="w-full bg-[#1A1A1A] text-white py-3.5 rounded-lg font-medium text-sm hover:bg-[#606C38] transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          Descubrir más
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
