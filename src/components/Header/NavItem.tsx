import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { NavigationTab } from '../../types';

interface NavItemProps {
  tab: NavigationTab;
  isActive: boolean;
  onClick: (tab: NavigationTab) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ tab, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(tab)}
      className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
        isActive
          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-sm shadow-purple-500/20'
          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50/80'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {tab === 'Dashboard' && (
        <LayoutGrid className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
      )}
      <span>{tab}</span>
    </button>
  );
};
