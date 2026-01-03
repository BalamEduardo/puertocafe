export type ZoneRef = { name: string; slug: string };

export type TagRef = { name: string; slug: string };
export type HeroRef = { bucket: string; path: string; alt_text: string | null };

export type CafeListRow = {
  id: string;
  slug: string;
  name: string;
  zone: ZoneRef;
  price_level: number;
  editorial_statement: string;
  hero: HeroRef | null;
  modes: TagRef[];       // jsonb_agg
  coffee: TagRef | {};   // '{}' si no hay
  ambience: TagRef | {}; // '{}' si no hay
};

export type CafeMapRow = {
  id: string;
  slug: string;
  name: string;
  zone_slug: string;
  price_level: number;
  lat: number;
  lng: number;
  primary_mode: TagRef | null;
  hero: HeroRef | null;
};

export type GalleryItem = HeroRef & { order: number; is_hero: boolean };

export type CafeDetailRow = {
  id: string;
  slug: string;
  name: string;
  zone: { name: string; slug: string };
  price_level: number;
  editorial_statement: string;
  description: string;

  tags: {
    mode: TagRef[];
    coffee: TagRef | {};
    ambience: TagRef | {};
  };

  subtags: TagRef[];

  gallery: {
    bucket: string;
    path: string;
    alt_text: string | null;
    order: number;
    is_hero: boolean;
  }[];

  location: {
    address: string;
    lat: number;
    lng: number;
    reference: string | null;
  };

  contact: {
    instagram_url: string; // en tu view ya viene coalesce('')
    website_url: string | null;
    phone: string | null;
    hours_text: string | null;
  };
};

