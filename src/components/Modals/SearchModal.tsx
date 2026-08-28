import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, User, FileText, Pill, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { icon: <User className="w-3.5 h-3.5 text-purple-600" />, label: 'Dr. Sarah Jenkins - Neurologist profile', action: 'doctor' },
    { icon: <Pill className="w-3.5 h-3.5 text-emerald-600" />, label: 'Propranolol 10mg - View digital prescription', action: 'prescription' },
    { icon: <FileText className="w-3.5 h-3.5 text-blue-600" />, label: 'Visit Summary - Holographic Telepresence notes', action: 'summary' },
    { icon: <Calendar className="w-3.5 h-3.5 text-amber-600" />, label: 'Schedule CBC & Lipid panel lab appointment', action: 'lab' },
  ];

  const filteredLinks = quickLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search className="w-4 h-4 text-purple-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search consultation, prescriptions, records, or doctors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] text-slate-400 bg-slate-100 border border-slate-200 rounded">
              ESC
            </kbd>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 block">
            Suggested Quick Actions
          </span>
          {filteredLinks.length === 0 ? (
            <p className="text-center py-6 text-xs text-slate-400">No matching search items found.</p>
          ) : (
            filteredLinks.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectAction(item.action);
                  onClose();
                }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-purple-50/60 hover:text-purple-900 transition-colors text-xs text-slate-700 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="truncate font-medium">{item.label}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-600 shrink-0 ml-2" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
