import React, { useState } from 'react';
import { X, Heart, Activity, Stethoscope, FileText, ShieldCheck } from 'lucide-react';
import { Doctor } from '../../types';
import { DR_JENKINS_AVATAR_FALLBACK } from '../../assets/avatars';

interface VisitSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

export const VisitSummaryModal: React.FC<VisitSummaryModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const [imgSrc, setImgSrc] = useState(doctor.avatarUrl);

  if (!isOpen) return null;

  const handleError = () => {
    if (imgSrc !== DR_JENKINS_AVATAR_FALLBACK) {
      setImgSrc(DR_JENKINS_AVATAR_FALLBACK);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-scale-in max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="visit-summary-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Visit Summary"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id="visit-summary-title" className="text-base font-bold text-slate-900">
                Clinical Visit Summary & Chart
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                Finalized
              </span>
            </div>
            <p className="text-xs text-slate-400">Encounter Date: October 24, 2024 · Session Ref: #ENC-9920-AETH</p>
          </div>
        </div>

        {/* Doctor Banner */}
        <div className="my-4 p-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={imgSrc} 
              alt={`Portrait of ${doctor.name}, ${doctor.role}`}
              className="w-10 h-10 rounded-xl object-cover object-top ring-1 ring-slate-200 shrink-0"
              onError={handleError}
            />
            <div>
              <h3 className="text-xs font-bold text-slate-900">{doctor.name}</h3>
              <p className="text-[11px] text-slate-500">{doctor.role} · Department of Cardiology & Neurology</p>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500 hidden sm:block">
            <span>Duration: <strong>45 mins</strong></span><br />
            <span>Format: <strong>Holographic Telepresence</strong></span>
          </div>
        </div>

        {/* Vitals Summary Grid */}
        <div className="my-4">
          <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-purple-600" />
            Recorded Vital Telemetry
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Blood Pressure</span>
              <span className="text-sm font-bold text-purple-900">118/79 mmHg</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Optimal</span>
            </div>
            <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Resting Heart Rate</span>
              <span className="text-sm font-bold text-blue-900">76 bpm</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Sinus Rhythm</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Oxygen Saturation</span>
              <span className="text-sm font-bold text-slate-800">99% SpO2</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Normal</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Cardiac Risk Index</span>
              <span className="text-sm font-bold text-slate-800">Low (0.12)</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Stable</span>
            </div>
          </div>
        </div>

        {/* Clinical Notes & Diagnosis */}
        <div className="space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
          <div>
            <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              Physician Narrative Assessment
            </h3>
            <p className="leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              Patient presented for scheduled follow-up following mild episodic exercise-induced tachycardia. Real-time telemetry confirms stable sinus rhythm with no ST-segment abnormalities. Initiated low-dose Propranolol (10mg daily) to smooth sympathetic tone. Baseline lab panels (CBC, Lipid) ordered for routine validation.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Primary Diagnostic Codes
            </h3>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-slate-800 border border-slate-200">
                ICD-10 R00.0: Tachycardia, unspecified (Benign)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-slate-800 border border-slate-200">
                ICD-10 Z00.00: General medical exam without abnormal findings
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>HIPAA Compliant & Encrypted EHR</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};
