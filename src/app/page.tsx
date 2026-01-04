import { Suspense } from 'react';
import PuertoCafeAppClient from './puerto-cafe-app-client';
import { supabase } from '@/lib/supabase';
import { publicStorageUrl, priceToSymbols } from '@/lib/utils/image';

type CafeListRow = {
  id: string;
  slug: string;
  name: string;
  zone: { name: string; slug: string };
  price_level: number;
  editorial_statement: string;
  hero: { bucket: string; path: string; alt_text: string | null } | null;
  modes: { name: string; slug: string }[];
  coffee: { name: string; slug: string } | {}; 
};

type CafeMapRow = {
  id: string;
  lat: number;
  lng: number;
};

type LocationRow = {
  cafe_id: string;
  address: string;
};

// Helper para normalizar coordenadas (0-100%)
function normalizeToPercent(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }
) {
  const { minLat, maxLat, minLng, maxLng } = bounds;
  const dx = maxLng - minLng || 1;
  const dy = maxLat - minLat || 1;

  const x = 10 + ((lng - minLng) / dx) * 80;
  const y = 10 + (1 - (lat - minLat) / dy) * 80;

  return { x, y };
}

// Revalidar cada 60s (ISR)
export const revalidate = 60;

export default async function Page() {
  const [
    { data: listData, error: e1 },
    { data: mapData, error: e2 },
    { data: locData, error: e3 },
    { data: zonesData, error: e4 },
    // Fetch relacional robusto para 'Modo'
    { data: modesData, error: e5 }, 
  ] = await Promise.all([
    // Ordenamos por nombre para evitar error si is_featured no existe aún en la vista
    supabase.from('cafe_list_view').select('*').order('name', { ascending: true }),
    supabase.from('cafe_map_view').select('id,lat,lng'),
    supabase.from('locations').select('cafe_id,address'),
    supabase.from('zones').select('name').order('order', { ascending: true }),
    
    // Pedimos la categoría 'modo' y sus tags anidados.
    supabase
      .from('tag_categories')
      .select('tags(name)') 
      .eq('slug', 'modo')
      .single(),
  ]);

  if (e1) console.error('Error fetching list:', e1);
  if (e2) console.error('Error fetching map:', e2);
  
  const listRows = (listData ?? []) as unknown as CafeListRow[];
  const mapRows = (mapData ?? []) as unknown as CafeMapRow[];
  const locRows = (locData ?? []) as unknown as LocationRow[];

  // Extraer nombres simples para el Searchbar
  const availableZones = (zonesData ?? []).map((z) => z.name);
  
  // Extraemos los tags del objeto relacional.
  const availableModes = (modesData?.tags ?? []).map((t: any) => t.name).sort();

  const mapById = new Map(mapRows.map((r) => [r.id, r]));
  const addrById = new Map(locRows.map((r) => [r.cafe_id, r.address]));

  const bounds = mapRows.reduce(
    (acc, r) => ({
      minLat: Math.min(acc.minLat, r.lat),
      maxLat: Math.max(acc.maxLat, r.lat),
      minLng: Math.min(acc.minLng, r.lng),
      maxLng: Math.max(acc.maxLng, r.lng),
    }),
    { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity }
  );

  const cafes = listRows.map((c) => {
    const m = mapById.get(c.id);
    const coords = m ? normalizeToPercent(m.lat, m.lng, bounds) : { x: 50, y: 50 };

    const coffeeName =
      (c.coffee as any)?.name && typeof (c.coffee as any).name === 'string'
        ? (c.coffee as any).name
        : 'Café';

    const image = c.hero ? publicStorageUrl(c.hero.bucket, c.hero.path) : '';
    const address = addrById.get(c.id) ?? '';

    return {
      id: c.id,
      slug: c.slug, // <--- ¡AQUÍ ESTABA EL ERROR! Faltaba mapear el slug
      name: c.name,
      zone: c.zone.name,
      type: coffeeName,
      price: priceToSymbols(c.price_level),
      image,
      description: c.editorial_statement,
      address,
      coords,
      categoryIds: (c.modes ?? []).map((t) => t.slug),
    };
  });

  const heroCafes = listRows.slice(0, 5).map((c) => ({
    id: c.id,
    name: c.name,
    location: c.zone.name,
    tags: (c.modes ?? []).map((m) => m.name),
    price: priceToSymbols(c.price_level),
    image: c.hero ? publicStorageUrl(c.hero.bucket, c.hero.path) : '',
  }));

  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-[#1A1A1A] flex items-center justify-center">
        <p className="text-white/50 font-serif italic">Cargando experiencia editorial...</p>
      </div>
    }>
      <PuertoCafeAppClient 
        heroCafes={heroCafes} 
        cafes={cafes} 
        availableZones={availableZones}
        availableModes={availableModes}
      />
    </Suspense>
  );
}