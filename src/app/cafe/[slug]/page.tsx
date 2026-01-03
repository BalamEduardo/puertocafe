import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CafeDetailView } from '@/components/cafe/cafedetailview';
import type { CafeDetailRow } from '@/lib/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// Genera metadata dinámica para SEO y compartir
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await supabase
    .from('cafe_detail_view')
    .select('name, editorial_statement, zone')
    .eq('slug', slug)
    .single();

  if (!data) {
    return {
      title: 'Café no encontrado | Puerto Café',
    };
  }

  const zoneName = (data.zone as any)?.name ?? 'Veracruz';

  return {
    title: `${data.name} | Puerto Café`,
    description: data.editorial_statement,
    openGraph: {
      title: `${data.name} — Puerto Café`,
      description: data.editorial_statement,
      type: 'article',
      locale: 'es_MX',
      siteName: 'Puerto Café',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} — Puerto Café`,
      description: data.editorial_statement,
    },
    other: {
      'geo.placename': zoneName,
    },
  };
}

export default async function CafePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('cafe_detail_view')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  return <CafeDetailView cafe={data as CafeDetailRow} />;
}
