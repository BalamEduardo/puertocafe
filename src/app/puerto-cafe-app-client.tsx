'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { CafeDetailRow } from '@/lib/types';
import { CafeDetailView } from '@/components/cafe/cafedetailview';
import { HeroSection } from '@/components/hero/herosection'; // Asegúrate que el import apunte al archivo correcto
import { ExploreSection } from '@/components/explore/exploresection'; // Asegúrate que el import apunte al archivo correcto
import { Footer } from '@/components/layout/footer'; // Asegúrate que el import apunte al archivo correcto
import { globalStyles } from '@/styles/animations';

interface PuertoCafeAppClientProps {
  heroCafes: any[];
  cafes: any[];
  availableZones: string[];
  availableModes: string[];
}

export default function PuertoCafeAppClient({
  heroCafes,
  cafes,
  availableZones,
  availableModes,
}: PuertoCafeAppClientProps) {
  const [detailCafeSlug, setDetailCafeSlug] = useState<string | null>(null);
  const [detailCafe, setDetailCafe] = useState<CafeDetailRow | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollRef = useRef<number>(0);

  // Obtener params de búsqueda desde URL
  const zoneFilter = searchParams.get('zone');
  const modeFilter = searchParams.get('mode');
  const priceFilter = searchParams.get('price');

  // Filtrar cafeterías basado en la selección del Hero
  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      // Filtro de Zona
      if (zoneFilter && zoneFilter !== 'Todos' && cafe.zone !== zoneFilter) {
        return false;
      }

      // Filtro de Modo (convertimos a slug para comparar)
      if (modeFilter && modeFilter !== 'Todos') {
        const filterSlug = modeFilter.toLowerCase().replace(/\s+/g, '-');
        const hasMode = cafe.categoryIds.includes(filterSlug);
        if (!hasMode) return false;
      }

      // Filtro de Precio
      if (priceFilter && priceFilter !== 'Todos') {
        if (cafe.price !== priceFilter) return false;
      }

      return true;
    });
  }, [cafes, zoneFilter, modeFilter, priceFilter]);

  // Sincroniza overlay con navegación "atrás" del navegador
  useEffect(() => {
    if (!pathname.startsWith('/cafe/') && detailCafeSlug) {
      setDetailCafeSlug(null);
    }
  }, [pathname, detailCafeSlug]);

  // Handler para abrir ficha (overlay + URL)
  const openDetail = (slug: string) => {
    scrollRef.current = window.scrollY;
    setDetailCafeSlug(slug);
    router.push(`/cafe/${slug}`, { scroll: false });
  };

  // Handler para cerrar ficha (vuelve a /#explore)
  const closeDetail = () => {
    setDetailCafeSlug(null);
    router.push('/#explore', { scroll: false });
    // Pequeño timeout para permitir que el DOM se restaure antes de scrollear
    setTimeout(() => {
       window.scrollTo({ top: scrollRef.current, behavior: 'auto' });
    }, 10);
  };

  useEffect(() => {
    const isOpen = Boolean(detailCafeSlug);

    if (!isOpen) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        return;
    }

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // Compensa el “salto” cuando desaparece el scrollbar
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [detailCafeSlug]);


  useEffect(() => {
    if (!detailCafeSlug) {
      setDetailCafe(null);
      setDetailError(null);
      return;
    }

    let cancelled = false;

    (async () => {
      setIsLoadingDetail(true);
      setDetailError(null);

      const { data, error } = await supabase
        .from('cafe_detail_view')
        .select('*')
        .eq('slug', detailCafeSlug)
        .single();

      if (cancelled) return;

      if (error) {
        setDetailError(error.message);
        setDetailCafe(null);
      } else {
        setDetailCafe(data as CafeDetailRow);
      }

      setIsLoadingDetail(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [detailCafeSlug]);

  return (
    <div className="w-full bg-[#FAFAFA] text-[#1A1A1A] overflow-x-hidden relative">
      <style>{globalStyles}</style>

      {/* Overlay editorial */}
      {detailCafeSlug && (
        <>
          {isLoadingDetail && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
              <div className="bg-white rounded-xl px-6 py-4 text-sm text-[#1A1A1A]/70 border border-black/10 shadow-2xl">
                Cargando ficha editorial…
              </div>
            </div>
          )}

          {!isLoadingDetail && detailError && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
              <div className="bg-white rounded-xl px-6 py-4 max-w-md text-sm border border-black/10 shadow-2xl">
                <p className="text-[#1A1A1A] font-medium mb-2">No se pudo cargar la ficha.</p>
                <p className="text-[#1A1A1A]/60 mb-4">{detailError}</p>
                <button
                  onClick={closeDetail}
                  className="px-4 py-2 rounded-lg bg-[#1A1A1A] text-white text-sm hover:bg-[#606C38] transition-colors"
                >
                  Volver
                </button>
              </div>
            </div>
          )}

          {!isLoadingDetail && detailCafe && (
            <CafeDetailView cafe={detailCafe as any} onBack={closeDetail} />
          )}
        </>
      )}

      {/* Hero Section con Buscador Inteligente conectado a Datos */}
      <HeroSection 
        cafes={heroCafes as any} 
        availableZones={availableZones}
        availableModes={availableModes}
      />

      <ExploreSection cafes={filteredCafes as any} onViewDetail={openDetail} />
      
      <Footer />
    </div>
  );
}