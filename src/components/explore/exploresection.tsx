'use client';

import { useState } from 'react';
import { ExploreHeader } from './exploreheader';
import { ListView } from './listview';
import { MapLayout } from './maplayout';
import type { ExploreCafe } from './types';



interface ExploreSectionProps {
  cafes: ExploreCafe[];
  onViewDetail: (slug: string) => void;
}

export const ExploreSection = ({ cafes, onViewDetail }: ExploreSectionProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);

  const handleViewModeChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
    setSelectedCafeId(null);
    setActiveCategory(null);
  };

  return (
    <section
      id="explore"
      className={`relative min-h-screen bg-[#FAFAFA] flex flex-col ${
        viewMode === 'map' ? 'h-screen overflow-hidden' : ''
      }`}
    >
      <ExploreHeader viewMode={viewMode} onViewModeChange={handleViewModeChange} />

      <div className="flex-1 relative w-full">
        {viewMode === 'list' ? (
          <ListView cafes={cafes} onSelectCafe={onViewDetail} />
        ) : (
          <MapLayout
            cafes={cafes}
            activeCategory={activeCategory}
            selectedCafeId={selectedCafeId}
            onCategoryChange={setActiveCategory}
            onSelectCafe={setSelectedCafeId}
            onViewDetail={onViewDetail}
          />
        )}
      </div>
    </section>
  );
};
