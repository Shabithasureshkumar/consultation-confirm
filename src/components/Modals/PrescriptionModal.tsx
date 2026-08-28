import React from 'react';
import { X, Printer, CheckCircle2, QrCode, Pill, FileCheck } from 'lucide-react';
import { Prescription } from '../../types';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: Prescription;
  onConfirmDownload: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  onClose,
  prescription,
  onConfirmDownload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-scale-in max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rx-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Prescription Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-purple-600 flex items-center justify-center">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 id="rx-modal-title" className="text-base font-bold text-slate-900">
              Official Digital Prescription
            </h2>
            <p className="text-xs text-slate-400">Rx ID: RX-88429-AETH · Valid across US Pharmacies</p>
          </div>
        </div>

        {/* Prescription Paper Card */}
        <div className="my-5 bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-4 text-xs">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Prescriber</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{prescription.prescribedBy}</p>
              <p className="text-slate-500">License: #MED-908234-CA</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Issue Date</span>
              <p className="font-semibold text-slate-800 mt-0.5">October 24, 2024</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-purple-700">{prescription.medicationName}</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">Approved</span>
            </div>
            <p className="text-slate-700 font-medium">{prescription.instructions}</p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-slate-500 text-[11px]">
              <span>Quantity: <strong>30 Tablets</strong></span>
              <span>Refills: <strong>{prescription.refillsRemaining} remaining</strong></span>
              <span>Days Supply: <strong>{prescription.supplyDays} Days</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-slate-600">
              <QrCode className="w-9 h-9 text-slate-700" />
              <div className="text-[10px] leading-tight text-slate-400">
                <span>Scan at pharmacy counter</span><br />
                <strong className="text-slate-600">e-Rx Verification Active</strong>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-serif italic text-slate-600">Dr. Sarah Jenkins, MD</div>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1 justify-end font-semibold">
                <FileCheck className="w-3 h-3" /> Digitally Signed
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onConfirmDownload}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            Download & Send to Pharmacy
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            title="Print Prescription"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
