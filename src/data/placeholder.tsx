import { Zap, MessageCircle, Moon, Coffee, Star, Award, type LucideIcon } from 'lucide-react';

// --- SEARCH FILTER ITEM COMPONENT ---
export const SearchFilterItem = ({ icon: Icon, label, value, active }: { icon: LucideIcon; label: string; value: string; active?: boolean }) => (
  <div className={`px-4 py-2 cursor-pointer transition-colors ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-[#606C38]" />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-sans">{label}</span>
        <span className="text-sm font-medium text-[#1A1A1A] font-sans">{value}</span>
      </div>
    </div>
  </div>
);

export const HERO_CAFES = [
  {
    id: 1,
    name: "Mamba Café",
    location: "Martí, Reforma",
    tags: ["Workspace", "Specialty"],
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    price: "$$"
  },
  {
    id: 2,
    name: "Drip Specialty",
    location: "Centro Histórico",
    tags: ["Slow Bar", "Photo Spot"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    price: "$$$"
  },
  {
    id: 3,
    name: "La Parroquia",
    location: "Malecón",
    tags: ["Clásico", "Tradición"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop",
    price: "$$"
  }
];

// --- DATOS: CATEGORÍAS EDITORIALES ---
export const EDITORIAL_CATEGORIES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'focus', label: 'Para enfocarse', icon: Zap },
  { id: 'talk', label: 'Para conversar', icon: MessageCircle },
  { id: 'calm', label: 'Espacios tranquilos', icon: Moon },
  { id: 'specialty', label: 'Café de especialidad', icon: Coffee },
  { id: 'classic', label: 'Clásicos del puerto', icon: Star },
  { id: 'editors', label: 'Selección del editor', icon: Award },
];

// --- DATOS: EXPLORAR (Enriquecidos para Detalle) ---
export const EXPLORE_CAFES = [
  {
    id: 1,
    name: "Mamba Café",
    zone: "Reforma",
    type: "Workspace",
    price: "$$",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    features: ["Wifi Rápido", "A/C"],
    description: "Espacio de concreto y luz. Un refugio brutalista para concentrarse.",
    editorialPhrase: "Un búnker de diseño donde el ruido de la ciudad desaparece.",
    specs: {
      zone: "Reforma (Martí)",
      mode: "Trabajo profundo",
      coffee: "Especialidad (Lavado)",
      ambience: "Minimalista / Frío",
      price: "$$ (Consumo medio 150mxn)",
      notes: "Enchufes en cada mesa · Silencio respetado"
    },
    gallery: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559925393-8be03361153b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
    ],
    coords: { x: 30, y: 40 },
    address: "Av. José Martí 230, Reforma",
    hours: "Lun-Dom: 8:00am - 10:00pm",
    instagram: "@mambacafe.ver",
    categoryIds: ['focus', 'specialty', 'editors']
  },
  {
    id: 2,
    name: "Drip Specialty",
    zone: "Centro",
    type: "Slow Bar",
    price: "$$$",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    features: ["Silencioso", "Barra de Autor"],
    description: "La pausa necesaria entre el caos del puerto y el mar.",
    editorialPhrase: "El café tratado como ceremonia en el corazón histórico.",
    specs: {
      zone: "Centro Histórico",
      mode: "Degustación / Lectura",
      coffee: "Métodos Manuales",
      ambience: "Íntimo / Cálido",
      price: "$$$ (Consumo medio 200mxn)",
      notes: "Pocas mesas · Barra interactiva"
    },
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2070&auto=format&fit=crop"
    ],
    coords: { x: 45, y: 25 },
    address: "Callejón de la Campana 56",
    hours: "Mar-Dom: 9:00am - 8:00pm",
    instagram: "@drip.specialty",
    categoryIds: ['calm', 'specialty', 'editors']
  },
  {
    id: 3,
    name: "La Parroquia",
    zone: "Malecón",
    type: "Clásico",
    price: "$$",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop",
    features: ["Tradición", "Vista al Mar"],
    description: "El sonido del tintineo y la brisa marina.",
    editorialPhrase: "Historia viva servida en vaso de vidrio.",
    specs: {
      zone: "Malecón",
      mode: "Social / Familiar",
      coffee: "Clásico Veracruzano",
      ambience: "Bullicioso / Nostálgico",
      price: "$$ (Consumo medio 180mxn)",
      notes: "Ruido alto · Servicio rápido"
    },
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070&auto=format&fit=crop"
    ],
    coords: { x: 55, y: 60 },
    address: "Insurgentes Veracruzanos 340",
    hours: "Lun-Dom: 7:00am - 11:00pm",
    instagram: "@laparroquia",
    categoryIds: ['classic', 'talk']
  },
  {
    id: 4,
    name: "Nómada Barra",
    zone: "Costa de Oro",
    type: "Social",
    price: "$$",
    image: "https://images.unsplash.com/photo-1507133750069-bef72f3707a9?q=80&w=2070&auto=format&fit=crop",
    features: ["Pet Friendly", "Terraza"],
    description: "Vibras relajadas cerca del mar. Perfecto para atardeceres.",
    editorialPhrase: "Donde el café se encuentra con la brisa salada.",
    specs: {
      zone: "Costa de Oro",
      mode: "Social / Atardecer",
      coffee: "Barra fría / Espresso",
      ambience: "Relajado / Abierto",
      price: "$$ (Consumo medio 160mxn)",
      notes: "Pet friendly · Terraza amplia"
    },
    gallery: [
      "https://images.unsplash.com/photo-1507133750069-bef72f3707a9?q=80&w=2070&auto=format&fit=crop"
    ],
    coords: { x: 70, y: 50 },
    address: "Blvd. del Mar 88",
    hours: "Lun-Dom: 8:00am - 9:00pm",
    instagram: "@nomada.barra",
    categoryIds: ['talk', 'specialty']
  },
  {
    id: 5,
    name: "Café de la Esquina",
    zone: "Boca del Río",
    type: "Bakery",
    price: "$",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop",
    features: ["Pan Casero", "Desayunos"],
    description: "Pequeño y acogedor. El olor a pan recién hecho te recibe.",
    editorialPhrase: "Sencillez honesta y pan recién horneado.",
    specs: {
      zone: "Boca del Río (Centro)",
      mode: "Desayuno / Rápido",
      coffee: "Americano / Olla",
      ambience: "Hogareño",
      price: "$ (Consumo medio 100mxn)",
      notes: "Espacio reducido · Panadería propia"
    },
    gallery: [
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop"
    ],
    coords: { x: 80, y: 75 },
    address: "Cabecera Municipal s/n",
    hours: "Lun-Sab: 7:00am - 8:00pm",
    instagram: "@laesquina.pan",
    categoryIds: ['talk', 'calm']
  },
  {
    id: 6,
    name: "Antisocial Club",
    zone: "Reforma",
    type: "Focus",
    price: "$$",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop",
    features: ["Música Lo-Fi", "Dark Coffee"],
    description: "Minimalismo oscuro para quienes buscan concentración total.",
    editorialPhrase: "Estética oscura para mentes brillantes.",
    specs: {
      zone: "Reforma",
      mode: "Focus Intenso",
      coffee: "Dark Roast / Cold Brew",
      ambience: "Alternativo / Oscuro",
      price: "$$ (Consumo medio 140mxn)",
      notes: "Playlist curada · Sin niños"
    },
    gallery: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop"
    ],
    coords: { x: 25, y: 55 },
    address: "Washington 45, Reforma",
    hours: "Lun-Dom: 10:00am - 10:00pm",
    instagram: "@antisocial.club",
    categoryIds: ['focus', 'calm']
  }
];
