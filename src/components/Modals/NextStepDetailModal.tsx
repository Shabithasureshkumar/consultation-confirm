import React from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { NextStep } from '../../types';

interface NextStepDetailModalProps {
  step: NextStep | null;
  onClose: () => void;
  onTakeAction: (step: NextStep) => void;
}

export const NextStepDetailModal: React.FC<NextStepDetailModalProps> = ({
  step,
  onClose,
  onTakeAction,
}) => {
  if (!step) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nextstep-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 id="nextstep-title" className="text-base font-bold text-slate-900 pr-8">
          {step.title}
        </h2>
        <p className="text-xs text-slate-500 mt-1">{step.description}</p>

        {step.details && (
          <div className="my-5 bg-purple-50/50 border border-purple-100/70 rounded-2xl p-4 space-y-2.5">
            <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider block">
              Doctor&apos;s Protocol & Instructions:
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              {step.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            onTakeAction(step);
            onClose();
          }}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20 active:scale-95 transition-all"
        >
          <span>{step.actionLabel || 'Proceed'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
