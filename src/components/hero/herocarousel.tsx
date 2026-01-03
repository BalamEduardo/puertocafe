'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCafe {
  id: string;
  name: string;
  location: string;
  image: string;
}

interface HeroCarouselProps {
  cafes: HeroCafe[];
  currentSlide: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export const HeroCarousel = ({
  cafes,
  currentSlide,
  onPrevSlide,
  onNextSlide,
}: HeroCarouselProps) => {
  const currentCafe = cafes[currentSlide];

  return (
    <>
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full blur-xs scale-105 ">
        {cafes.map((cafe, index) => (
          <div
            key={cafe.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/20 z-10" />
            <img
              src={cafe.image}
              alt={cafe.name}
              className="w-full h-full object-cover animate-kenburns"
            />
          </div>
        ))}
      </div>

  
     

      {/* Navigation Buttons */}
      <button
        onClick={onPrevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={onNextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
      >
        <ChevronRight />
      </button>
    </>
  );
};
