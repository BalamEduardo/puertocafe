import { type LucideIcon } from 'lucide-react';

interface SearchFilterItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  active?: boolean;
}

export const SearchFilterItem = ({ icon: Icon, label, value, active = false }: SearchFilterItemProps) => (
  <button className="flex items-center gap-3 px-4 py-2 group hover:bg-black/5 transition-colors rounded-full text-left min-w-35">
    <div className={`p-2 rounded-full transition-colors ${active ? 'bg-[#606C38] text-white' : 'bg-[#EFEDE0] text-[#1A1A1A] group-hover:bg-[#E5E3D0]'}`}>
      <Icon size={16} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</span>
      <span className="text-sm font-medium text-[#1A1A1A] font-sans">{value}</span>
    </div>
  </button>
);