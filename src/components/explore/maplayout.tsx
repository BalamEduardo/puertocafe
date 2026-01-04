'use client';

import { InteractiveMap } from './interactivemap';
import { CategorySidebar } from './categorysidebar';
import { SidePanel } from './sidepanel';
import { EDITORIAL_CATEGORIES } from '@/data/placeholder';
import type { ExploreCafe } from './types';
import { RefreshCcw } from 'lucide-react'; // Icono

interface MapLayoutProps {
    cafes: ExploreCafe[];
    activeCategory: string | null;
    selectedCafeId: string | null;
    onCategoryChange: (categoryId: string | null) => void;
    onSelectCafe: (id: string | null) => void;
    onViewDetail: (id: string) => void;
    onResetFilters?: () => void;
}

export const MapLayout = ({
    cafes,
    activeCategory,
    selectedCafeId,
    onCategoryChange,
    onSelectCafe,
    onViewDetail,
    onResetFilters,
}: MapLayoutProps) => {
    const selectedCafe = cafes.find((c) => c.id === selectedCafeId) || null;

    const handleCategoryChange = (categoryId: string | null) => {
        onCategoryChange(categoryId);
        onSelectCafe(null);
    };

    return (
        <div className="absolute inset-0 flex w-full h-full animate-fadeIn bg-[#EFEDE0]">
            <CategorySidebar
                categories={EDITORIAL_CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />

            <div
                className="flex-1 relative h-full bg-[#E5E3D0]"
                onClick={() => onSelectCafe(null)}
            >
                <InteractiveMap
                    cafes={cafes}
                    activeCategory={activeCategory}
                    selectedId={selectedCafeId}
                    onSelect={onSelectCafe}
                />

                {/* MENSAJE FLOTANTE DE VACÍO PARA EL MAPA */}
                {cafes.length === 0 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-black/5 flex items-center gap-4 animate-fadeInUp">
                            <span className="text-sm font-sans text-[#1A1A1A]/80">
                                Sin resultados en esta zona.
                            </span>
                            {onResetFilters && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onResetFilters(); }}
                                    className="text-xs font-bold uppercase tracking-wide text-[#606C38] hover:underline flex items-center gap-1"
                                >
                                    <RefreshCcw size={10} /> Ver todo
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <SidePanel
                cafe={selectedCafe}
                isOpen={selectedCafeId !== null}
                onClose={() => onSelectCafe(null)}
                onViewDetail={onViewDetail}
            />
        </div>
    );
};