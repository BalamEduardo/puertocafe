'use client';

export const ViewToggle = ({ mode, setMode }: { mode: 'list' | 'map'; setMode: (mode: 'list' | 'map') => void }) => (
  <div className="flex bg-[#EFEDE0] p-1 rounded-full border border-black/5 shadow-inner relative w-fit mx-auto md:mx-0 pointer-events-auto">
    <div 
      className={`absolute top-1 bottom-1 w-[50%] rounded-full bg-[#1A1A1A] transition-all duration-300 ease-out shadow-sm ${mode === 'list' ? 'left-1' : 'left-[48%] translate-x-0.5'}`}
    />
    <button 
      onClick={() => setMode('list')}
      className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 w-24 text-center ${mode === 'list' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
    >
      Lista
    </button>
    <button 
      onClick={() => setMode('map')}
      className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 w-24 text-center ${mode === 'map' ? 'text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
    >
      Mapa
    </button>
  </div>
);