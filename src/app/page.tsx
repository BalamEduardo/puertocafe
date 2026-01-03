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
  coffee: { name: string; slug: string } | {}; // viene como {} si no hay
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

export default async function Page() {
  const [
    { data: listData, error: e1 },
    { data: mapData, error: e2 },
    { data: locData, error: e3 },
  ] = await Promise.all([
    supabase.from('cafe_list_view').select('*'),
    supabase.from('cafe_map_view').select('id,lat,lng'),
    supabase.from('locations').select('cafe_id,address'),
  ]);

  if (e1) throw new Error(e1.message);
  if (e2) throw new Error(e2.message);
  if (e3) throw new Error(e3.message);

  const listRows = (listData ?? []) as unknown as CafeListRow[];
  const mapRows = (mapData ?? []) as unknown as CafeMapRow[];
  const locRows = (locData ?? []) as unknown as LocationRow[];

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
      slug: c.slug, // para enlazar a /cafe/[slug]
      name: c.name,
      zone: c.zone.name,
      type: coffeeName, // badge en card/sidepanel
      price: priceToSymbols(c.price_level),
      image,
      description: c.editorial_statement,
      address,
      coords,
      categoryIds: (c.modes ?? []).map((t) => t.slug), // para filtrar en mapa
    };
  });

  const heroCafes = listRows.map((c) => ({
    id: c.id,
    name: c.name,
    location: c.zone.name,
    tags: (c.modes ?? []).map((m) => m.name),
    price: priceToSymbols(c.price_level),
    image: c.hero ? publicStorageUrl(c.hero.bucket, c.hero.path) : '',
  }));

  return <PuertoCafeAppClient heroCafes={heroCafes} cafes={cafes} />;
}
