export function publicStorageUrl(bucket: string, path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

export function priceToSymbols(level: number) {
  const n = Math.max(1, Math.min(3, level));
  return '$'.repeat(n);
}
