import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'info';
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 text-xs font-medium animate-fade-in max-w-sm">
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-sky-400 shrink-0" />
      )}
      <p className="flex-1">{message}</p>
      <button 
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
