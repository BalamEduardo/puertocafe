export type ExploreCafe = {
  id: string; // uuid
  slug: string; // para enlazar a /cafe/[slug]
  name: string;
  zone: string;
  type: string;
  price: string;
  image: string;
  description: string;
  address: string;
  coords: { x: number; y: number };
  categoryIds: string[];
};
