'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Coffee, DollarSign, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { HeroCarousel } from './herocarousel';
import { SearchFilterItem } from './searchbar';

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
  availableZones: string[]; 
  availableModes: string[];
}

export const HeroSection = ({ 
  cafes, 
  availableZones = [], 
  availableModes = [] 
}: HeroSectionProps) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Estados del Buscador
  const [selectedZone, setSelectedZone] = useState('Todos');
  const [selectedMode, setSelectedMode] = useState('Todos');
  const [selectedPrice, setSelectedPrice] = useState('Todos');

  // Control de qué dropdown está abierto ('zone' | 'mode' | 'price' | null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Opciones de Precio (Estáticas)
  const priceOptions = ['$', '$$', '$$$'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (e: MouseEvent) => {
       // Cierra el menú si haces clic fuera del componente (simplificado)
       if (!(e.target as Element).closest('button')) {
          setOpenDropdown(null);
       }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Lógica Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cafes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [cafes.length]);

  const toggleDropdown = (name: string) => {
     // Si ya está abierto, lo cierra. Si no, abre este y cierra los demás.
     setOpenDropdown(prev => prev === name ? null : name);
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que cierre el dropdown inmediatamente si hubo overlap
    
    // Construir Query Params
    const params = new URLSearchParams();
    if (selectedZone !== 'Todos') params.set('zone', selectedZone);
    if (selectedMode !== 'Todos') params.set('mode', selectedMode);
    if (selectedPrice !== 'Todos') params.set('price', selectedPrice);

    // Navegar y scrollear
    router.push(`/?${params.toString()}#explore`, { scroll: false });
    
    // Forzar scroll suave manual para asegurar UX
    setTimeout(() => {
        document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    setOpenDropdown(null);
  };

  // PROTECCIÓN: Si no hay datos, no renderizamos el carrusel
  if (!cafes || cafes.length === 0) {
    return (
      <section className="relative w-full h-screen bg-[#1A1A1A] flex items-center justify-center">
        <Navbar isScrolled={false} />
        <p className="text-white/50 font-serif italic">Cargando experiencia...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden">
      <Navbar isScrolled={isScrolled} />

      <HeroCarousel
        cafes={cafes}
        currentSlide={currentSlide}
        onPrevSlide={() => setCurrentSlide(prev => prev === 0 ? cafes.length - 1 : prev - 1)}
        onNextSlide={() => setCurrentSlide(prev => (prev + 1) % cafes.length)}
      />

      {/* Hero Content Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
        <div className="text-center animate-fadeIn">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#FAFAFA] leading-none tracking-tighter mb-4 drop-shadow-xl relative inline-block">
            Puerto Café
            <span className="text-[#606C38] text-6xl md:text-8xl lg:text-9xl absolute -right-4 md:-right-6 bottom-0 leading-none">.</span>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-lg mx-auto leading-relaxed mt-2">
            Explora las mejores cafeterías para cada momento
          </p>
        </div>
      </div>

      {/* Search Bar Layer */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end pb-8 px-6 md:px-12 pointer-events-none">
        <div className="w-full flex flex-col md:flex-row items-end justify-between gap-8 mb-6">
          
          {/* Cafe Info (Izquierda) */}
          <div className="w-full md:max-w-xs pointer-events-auto order-2 md:order-1 hidden md:block">
            <div className="opacity-70 border-l border-white/40 pl-4 transition-all duration-500 hover:opacity-100">
              <h2 className="font-serif text-2xl text-white mb-1 leading-tight">
                {cafes[currentSlide].name}
              </h2>
              <p className="font-sans text-xs text-white/80 uppercase tracking-widest">
                {cafes[currentSlide].location}
              </p>
            </div>
          </div>

          {/* Search Widget (Centro) */}
          <div className="w-full md:w-auto flex justify-center order-1 md:order-2 pointer-events-auto mx-auto relative">
            {/* Backdrop invisible para cerrar menús al hacer click fuera del widget (opcional extra safety) */}
            {openDropdown && (
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
            )}
            
            <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-2xl p-1.5 flex items-center gap-1 max-w-4xl border border-white/40 transition-transform hover:scale-[1.01] relative z-50">
              <div className="flex items-center divide-x divide-black/5 px-2">
                
                <SearchFilterItem 
                    icon={MapPin} 
                    label="Zona" 
                    value={selectedZone}
                    options={availableZones}
                    isOpen={openDropdown === 'zone'}
                    active={selectedZone !== 'Todos'}
                    onToggle={() => toggleDropdown('zone')}
                    onSelect={(val) => { setSelectedZone(val); setOpenDropdown(null); }}
                />
                
                <SearchFilterItem 
                    icon={Coffee} 
                    label="Modo" 
                    value={selectedMode} 
                    options={availableModes}
                    isOpen={openDropdown === 'mode'}
                    active={selectedMode !== 'Todos'}
                    onToggle={() => toggleDropdown('mode')}
                    onSelect={(val) => { setSelectedMode(val); setOpenDropdown(null); }}
                />
                
                <SearchFilterItem 
                    icon={DollarSign} 
                    label="Precio" 
                    value={selectedPrice}
                    options={priceOptions}
                    isOpen={openDropdown === 'price'}
                    active={selectedPrice !== 'Todos'}
                    onToggle={() => toggleDropdown('price')}
                    onSelect={(val) => { setSelectedPrice(val); setOpenDropdown(null); }}
                />

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