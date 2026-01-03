'use client';

import { useState, useEffect } from 'react';
import { MapPin, Coffee, DollarSign, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { HeroCarousel } from './herocarousel';
import { SearchFilterItem } from '@/data/placeholder';

interface HeroCafe {
    id: string;
    name: string;
    location: string;
    tags: string[];
    image: string;
    price: string;
}


interface HeroSectionProps {
    cafes: HeroCafe[];
}

export const HeroSection = ({ cafes }: HeroSectionProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev: number) => (prev + 1) % cafes.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [cafes.length]);

    const nextSlide = () => setCurrentSlide((prev: number) => (prev + 1) % cafes.length);
    const prevSlide = () =>
        setCurrentSlide((prev: number) => (prev === 0 ? cafes.length - 1 : prev - 1));

    const handleExploreClick = () => {
        document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden">
            <Navbar isScrolled={isScrolled} />

            <HeroCarousel
                cafes={cafes}
                currentSlide={currentSlide}
                onPrevSlide={prevSlide}
                onNextSlide={nextSlide}
            />

            {/* Hero Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
                <div className="text-center animate-fadeIn">
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#FAFAFA] leading-none tracking-tighter mb-4 drop-shadow-xl">
                        Puerto Café
                    </h1>
                    <p className="font-serif italic text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-lg mx-auto leading-relaxed">
                        Explora las mejores cafeterías para cada momento
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="absolute inset-0 z-30 flex flex-col justify-end pb-8 px-6 md:px-12 pointer-events-none">
                <div className="w-full flex flex-col md:flex-row items-end justify-between gap-8 mb-6">
                    <div className="w-full md:max-w-xs pointer-events-auto order-2 md:order-1 hidden md:block">
                        <div className="opacity-70 border-l border-white/40 pl-4 transition-all duration-500">
                            <h2 className="font-serif text-2xl text-white mb-1">
                                {cafes[currentSlide].name}
                            </h2>
                            <p className="font-sans text-xs text-white/80 uppercase tracking-widest">
                                {cafes[currentSlide].location}
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex justify-center order-1 md:order-2 pointer-events-auto mx-auto">
                        <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-2xl p-1.5 flex items-center gap-1 max-w-4xl border border-white/40">
                            <div className="flex items-center divide-x divide-black/5 px-2">
                                <SearchFilterItem icon={MapPin} label="Zona" value="Veracruz" active />
                                <SearchFilterItem icon={Coffee} label="Modo" value="Trabajar" />
                                <SearchFilterItem icon={DollarSign} label="Precio" value="$$" />
                            </div>
                            <button
                                onClick={handleExploreClick}
                                className="bg-[#1A1A1A] hover:bg-[#606C38] text-white h-12 px-8 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg group ml-2"
                            >
                                <span className="font-sans font-medium text-sm">Explorar</span>
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:max-w-xs order-3 hidden md:block" />
                </div>
            </div>
        </section>
    );
};
