'use client';

import { ViewToggle } from './viewtoggle';

interface ExploreHeaderProps {
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
}

export const ExploreHeader = ({ viewMode, onViewModeChange }: ExploreHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-black/5 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-all shrink-0">
      <div className="hidden md:block w-32">
        <h3 className="font-serif text-xl text-[#1A1A1A]">Explorar</h3>
      </div>

      <ViewToggle mode={viewMode} setMode={onViewModeChange} />

      <div className="hidden md:flex justify-end gap-2 w-32">
        <button className="px-4 py-2 text-xs font-sans uppercase tracking-wider border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors">
          Filtros
        </button>
      </div>
    </div>
  );
};
