'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Instagram, DollarSign, Navigation } from 'lucide-react';
import type { CafeDetailRow } from '@/lib/types';
import { publicStorageUrl, priceToSymbols } from '@/lib/utils/image';

export const CafeDetailView = ({
  cafe,
  onBack,
}: {
  cafe: CafeDetailRow | null;
  onBack?: () => void;
}) => {
  const router = useRouter();

  useEffect(() => {
    document.getElementById('detail-view-container')?.scrollTo(0, 0);
  }, [cafe?.id]);

  const heroImageUrl = useMemo(() => {
    if (!cafe) return '';
    const hero = cafe.gallery?.find((i) => i.is_hero) ?? cafe.gallery?.[0];
    return hero ? publicStorageUrl(hero.bucket, hero.path) : '';
  }, [cafe]);

  const galleryUrls = useMemo(() => {
    if (!cafe) return [];
    return (cafe.gallery ?? [])
      .slice() // no mutar
      .sort((a, b) => Number(b.is_hero) - Number(a.is_hero) || a.order - b.order)
      .map((img) => ({
        url: publicStorageUrl(img.bucket, img.path),
        alt: img.alt_text ?? cafe.name,
        isHero: img.is_hero,
      }));
  }, [cafe]);

  const specs = useMemo(() => {
    if (!cafe) return null;

    const mode = (cafe.tags?.mode ?? []).map((t) => t.name).join(' / ') || '—';
    const coffee =
      (cafe.tags?.coffee as any)?.name && typeof (cafe.tags.coffee as any).name === 'string'
        ? (cafe.tags.coffee as any).name
        : '—';
    const ambience =
      (cafe.tags?.ambience as any)?.name && typeof (cafe.tags.ambience as any).name === 'string'
        ? (cafe.tags.ambience as any).name
        : '—';

    const notes = (cafe.subtags ?? []).slice(0, 3).map((t) => t.name).join(' · ') || '—';

    return {
      zone: cafe.zone?.name ?? '—',
      mode,
      coffee,
      ambience,
      notes,
    };
  }, [cafe]);

  const mapsUrl = useMemo(() => {
    if (!cafe) return '#';
    const { lat, lng } = cafe.location;
    const q = encodeURIComponent(`${cafe.name} ${cafe.location.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=&center=${lat},${lng}`;
  }, [cafe]);

  if (!cafe || !specs) return null;

  return (
    <div
      id="detail-view-container"
      className="fixed inset-0 z-60 bg-[#FAFAFA] overflow-y-auto overscroll-contain animate-fadeInUp"

    >
      {/* HEADER STICKY (Navegación) */}
      <div className="sticky top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => (onBack ? onBack() : router.push('/#explore'))}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-black/5 shadow-sm text-[#1A1A1A] hover:bg-white hover:scale-105 transition-all group"
        >
          <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-sm font-medium">Volver</span>
        </button>
        <div className="w-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24 -mt-20 pt-32">
        {/* 1) OVERVIEW EDITORIAL */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-black/10 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-[#1A1A1A] text-white text-[10px] font-medium uppercase tracking-widest rounded-sm">
                  {/* Café (Especialidad/Tradicional) */}
                  {(cafe.tags?.coffee as any)?.name && typeof (cafe.tags.coffee as any).name === 'string'
                    ? (cafe.tags.coffee as any).name
                    : 'Café'}
                </span>
                <span className="text-xs font-sans text-[#1A1A1A]/60 tracking-wide uppercase">
                  {cafe.zone.name}
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] leading-tight mb-4">
                {cafe.name}
              </h1>

              <p className="font-serif text-xl md:text-2xl text-[#1A1A1A]/70 italic font-light max-w-2xl leading-relaxed">
                “{cafe.editorial_statement}”
              </p>
            </div>

            <div className="text-right">
              <span className="font-serif text-3xl md:text-3xl text-[#1A1A1A]/40">
                {priceToSymbols(cafe.price_level)}
              </span>
            </div>

          </div>
        </div>

        {/* 2) ESPECIFICACIONES (Tabla Editorial) */}
        <div className="mb-20">
          <h3 className="font-sans text-xs uppercase tracking-widest text-[#1A1A1A]/40 mb-6 font-bold border-l-2 border-[#606C38] pl-3">
            Ficha Técnica
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 font-sans text-sm">
            <div className="space-y-6">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#1A1A1A]/40 uppercase tracking-wide text-xs">Zona</span>
                <span className="text-[#1A1A1A] font-medium">{specs.zone}</span>
              </div>

              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#1A1A1A]/40 uppercase tracking-wide text-xs">Para</span>
                <span className="text-[#1A1A1A] font-medium">{specs.mode}</span>
              </div>

              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#1A1A1A]/40 uppercase tracking-wide text-xs">Café</span>
                <span className="text-[#1A1A1A] font-medium">{specs.coffee}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#1A1A1A]/40 uppercase tracking-wide text-xs">Ambiente</span>
                <span className="text-[#1A1A1A] font-medium">{specs.ambience}</span>
              </div>

              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#1A1A1A]/40 uppercase tracking-wide text-xs">Notas</span>
                <span className="text-[#606C38] font-medium">{specs.notes}</span>
              </div>
            </div>
          </div>

          {/* Descripción editorial larga (tu view la trae) */}
          <div className="mt-10">
            <p className="font-sans text-sm md:text-base text-[#1A1A1A]/70 leading-relaxed">
              {cafe.description}
            </p>
          </div>
        </div>

        {/* 3) GALERÍA EDITORIAL */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-4/3 w-full overflow-hidden rounded-sm bg-gray-100 md:col-span-2">
              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt={cafe.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full bg-[#EFEDE0]" />
              )}
            </div>

            {galleryUrls
              .filter((g) => !g.isHero)
              .slice(0, 4)
              .map((g, idx) => (
                <div key={idx} className="aspect-square w-full overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src={g.url}
                    alt={g.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* 4) UBICACIÓN & 5) CONTACTO (Bloque Final) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#EFEDE0]/30 p-8 rounded-xl border border-[#EFEDE0]">
          <div className="md:col-span-2 flex flex-col justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Ubicación</h3>
              <p className="font-sans text-[#1A1A1A]/70 leading-relaxed max-w-md">
                {cafe.location.address}
                {cafe.location.reference ? (
                  <span className="block mt-2 text-xs text-[#1A1A1A]/50">
                    {cafe.location.reference}
                  </span>
                ) : null}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#606C38] transition-colors shadow-lg"
              >
                <Navigation size={16} />
                Cómo llegar
              </a>
            </div>
          </div>

          <div className="border-l border-black/10 pl-8 flex flex-col justify-center space-y-4">
            {cafe.contact.hours_text ? (
              <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/80">
                <Clock size={16} className="text-[#606C38]" />
                <span>{cafe.contact.hours_text}</span>
              </div>
            ) : null}

            {cafe.contact.instagram_url ? (
              <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/80">
                <Instagram size={16} className="text-[#606C38]" />
                <a
                  href={cafe.contact.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline decoration-[#606C38]"
                >
                  Instagram
                </a>
              </div>
            ) : null}

            <div className="flex items-center gap-3 text-sm text-[#1A1A1A]/80">
              <DollarSign size={16} className="text-[#606C38]" />
              <span>{priceToSymbols(cafe.price_level)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
