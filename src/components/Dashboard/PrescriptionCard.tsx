import React from 'react';
import { Pill, Download } from 'lucide-react';
import { Prescription } from '../../types';

interface PrescriptionCardProps {
  prescription: Prescription;
  onDownload: () => void;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  onDownload,
}) => {
  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-card-hover transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between border-l-4 border-l-[#6C5CE7]">
      <div>
        {/* Card Header with Pill Icon */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Pill className="w-3.5 h-3.5 rotate-45" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Prescription Ready
          </h3>
        </div>

        {/* Medication Details */}
        <div className="mt-3">
          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
            {prescription.medicationName}
          </h4>
          <p className="text-xs text-slate-500 font-normal mt-0.5 leading-snug">
            {prescription.formattedInstruction}
          </p>
        </div>
      </div>

      {/* Action Button: Download Prescription */}
      <button
        type="button"
        onClick={onDownload}
        className="w-full mt-4 py-2.5 px-4 rounded-xl border border-purple-200/90 hover:border-purple-300 bg-purple-50/30 hover:bg-purple-50 text-purple-600 font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.2]" />
        <span>Download Prescription</span>
      </button>
    </article>
  );
};
