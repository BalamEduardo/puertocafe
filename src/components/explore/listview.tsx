'use client';

import { CafeCard } from './cafecard';

import type { ExploreCafe } from './types';

interface ListViewProps {
  cafes: ExploreCafe[];
  onSelectCafe: (slug: string) => void;
}


export const ListView = ({ cafes, onSelectCafe }: ListViewProps) => {
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
