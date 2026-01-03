import Link from 'next/link';

export default function CafeNotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 md:px-12">
      <div className="text-center max-w-md">
        <span className="text-6xl mb-6 block">☕</span>
        <h1 className="font-serif text-4xl text-[#1A1A1A] mb-4">
          Café no encontrado
        </h1>
        <p className="text-sm text-[#1A1A1A]/60 mb-8 leading-relaxed">
          Esta ficha no existe o fue removida. Quizá cambió de nombre o ya no está disponible.
        </p>
        <Link
          href="/#explore"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#606C38] transition-colors"
        >
          Explorar cafés
        </Link>
      </div>
    </div>
  );
}
