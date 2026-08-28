import React from 'react';

interface BottomActionsProps {
  onViewSummary: () => void;
  onViewRecords: () => void;
  onGoToDashboard: () => void;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  onViewSummary,
  onViewRecords,
  onGoToDashboard,
}) => {
  return (
    <footer className="mt-8 sm:mt-9 mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {/* Primary Action */}
      <button
        type="button"
        onClick={onViewSummary}
        className="px-6 sm:px-8 py-3 rounded-full bg-[#2452D8] hover:bg-[#1D44B8] text-white font-semibold text-xs sm:text-[13px] shadow-md shadow-blue-700/20 hover:shadow-lg hover:shadow-blue-700/30 transition-all duration-150 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        View Full Visit Summary
      </button>

      {/* Secondary Action */}
      <button
        type="button"
        onClick={onViewRecords}
        className="px-5 sm:px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-[13px] border border-slate-200 shadow-sm hover:border-slate-300 transition-all duration-150 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        View Medical Records
      </button>

      {/* Tertiary Action */}
      <button
        type="button"
        onClick={onGoToDashboard}
        className="px-5 sm:px-6 py-3 rounded-full text-[#6C5CE7] hover:text-[#5846E0] hover:bg-purple-50/60 font-semibold text-xs sm:text-[13px] transition-all duration-150 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        Go To Dashboard
      </button>
    </footer>
  );
};
