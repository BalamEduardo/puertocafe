'use client';

import { RefreshCcw } from 'lucide-react'; // Icono para reset
import { CafeCard } from './cafecard';
import type { ExploreCafe } from './types';

interface ListViewProps {
  cafes: ExploreCafe[];
  onSelectCafe: (slug: string) => void;
  onResetFilters?: () => void;
}

export const ListView = ({ cafes, onSelectCafe, onResetFilters }: ListViewProps) => {
  
  // ESTADO VACÍO EDITORIAL
  if (cafes.length === 0) {
    return (
      <div className="px-6 md:px-12 py-32 max-w-2xl mx-auto text-center animate-fadeIn">
        <div className="mb-6 flex justify-center opacity-30">
             {/* Icono decorativo minimalista */}
             <div className="w-16 h-px bg-black"></div>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">
          Sin coincidencias.
        </h3>
        <p className="font-sans text-[#1A1A1A]/60 leading-relaxed mb-8 max-w-md mx-auto">
          No encontramos una cafetería para esta selección específica. Quizás es buen momento para explorar otro ambiente o ver todo lo que la ciudad ofrece.
        </p>
        
        {onResetFilters && (
          <button 
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#EFEDE0] hover:bg-[#E5E3D0] text-[#1A1A1A] rounded-full transition-colors font-medium text-sm group"
          >
            <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            Ver todas las cafeterías
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-12 max-w-8xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-fadeIn">
        {cafes.map((cafe) => (
          <CafeCard
            key={cafe.id}
            cafe={cafe}
            onClick={() => onSelectCafe(cafe.slug)}
          />
        ))}
      </div>
    </div>
  );
};