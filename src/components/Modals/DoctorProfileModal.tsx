import React, { useState } from 'react';
import { X, Award, Stethoscope, Clock, ShieldCheck, Star } from 'lucide-react';
import { Doctor } from '../../types';
import { DR_JENKINS_AVATAR_FALLBACK } from '../../assets/avatars';

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  onBookFollowup: () => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  isOpen,
  onClose,
  doctor,
  onBookFollowup,
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
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-profile-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <img
            src={imgSrc}
            alt={`Portrait of ${doctor.name}, ${doctor.role}`}
            className="w-16 h-16 rounded-2xl object-cover object-top ring-2 ring-purple-100 shrink-0"
            onError={handleError}
          />
          <div>
            <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              {doctor.badge}
            </span>
            <h2 id="doc-profile-title" className="text-base font-bold text-slate-900 mt-1">
              {doctor.name}
            </h2>
            <p className="text-xs text-slate-500">{doctor.department} · {doctor.experience}</p>
          </div>
        </div>

        <div className="py-4 space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-800">{doctor.rating}</span>
              <span className="text-slate-400">({doctor.reviewCount} patient reviews)</span>
            </div>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Board Certified
            </span>
          </div>

          <div className="space-y-2 text-slate-600">
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Harvard Medical School · Fellowship in Neuro-Cardiology</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Chief Consultant at Stanford Pacific Health Telemedicine</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Response time: &lt; 15 mins for follow-up inquiries</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onBookFollowup();
            onClose();
          }}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-semibold text-xs text-center cursor-pointer shadow-md shadow-purple-500/20 active:scale-95 transition-all"
        >
          Book Follow-up Consultation
        </button>
      </div>
    </div>
  );
};
