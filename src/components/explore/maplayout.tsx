'use client';

import { InteractiveMap } from './interactivemap';
import { CategorySidebar } from './categorysidebar';
import { SidePanel } from './sidepanel';
import { EDITORIAL_CATEGORIES } from '@/data/placeholder';
import type { ExploreCafe } from './types';

interface MapLayoutProps {
    cafes: ExploreCafe[];
    activeCategory: string | null;
    selectedCafeId: string | null;
    onCategoryChange: (categoryId: string | null) => void;
    onSelectCafe: (id: string | null) => void;
    onViewDetail: (id: string) => void;
}


export const MapLayout = ({
    cafes,
    activeCategory,
    selectedCafeId,
    onCategoryChange,
    onSelectCafe,
    onViewDetail,
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
