import React, { useState } from 'react';
import { Calendar, Clock, Video, CreditCard, Sparkles } from 'lucide-react';
import { Doctor, AppointmentDetail } from '../../types';
import { DR_JENKINS_AVATAR_FALLBACK } from '../../assets/avatars';
import { RatingStars } from '../UI/RatingStars';
import { StatusBadge } from '../UI/StatusBadge';

interface DoctorAppointmentCardProps {
  doctor: Doctor;
  details: AppointmentDetail[];
  onViewDoctorProfile?: () => void;
  onCopyMeetingId?: (id: string) => void;
}

export const DoctorAppointmentCard: React.FC<DoctorAppointmentCardProps> = ({
  doctor,
  details,
  onViewDoctorProfile,
  onCopyMeetingId,
}) => {
  const [imgSrc, setImgSrc] = useState(doctor.avatarUrl);

  const handleError = () => {
    if (imgSrc !== DR_JENKINS_AVATAR_FALLBACK) {
      setImgSrc(DR_JENKINS_AVATAR_FALLBACK);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'calendar':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'clock':
        return <Clock className="w-4 h-4 text-purple-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-600" />;
      case 'id':
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-card-hover transition-shadow duration-300 flex flex-col justify-between">
      {/* Top Doctor Profile Info */}
      <div>
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="relative shrink-0">
            <img
              src={imgSrc}
              alt={`Portrait of ${doctor.name}, ${doctor.role}`}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover object-top ring-1 ring-slate-100 shadow-sm cursor-pointer hover:opacity-95 transition-opacity shrink-0"
              onClick={onViewDoctorProfile}
              onError={handleError}
              loading="eager"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 
                onClick={onViewDoctorProfile}
                className="font-bold text-slate-900 text-sm sm:text-base leading-snug cursor-pointer hover:text-purple-600 transition-colors truncate"
              >
                {doctor.name}
              </h3>
              <span className="bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase border border-sky-100 shrink-0">
                {doctor.badge}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-normal mt-0.5">
              {doctor.department} · {doctor.experience}
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <RatingStars rating={doctor.rating} />
              <span className="font-bold text-xs text-slate-800">{doctor.rating}</span>
              <span className="text-[11px] text-slate-400">({doctor.reviewCount} reviews)</span>
            </div>

            {/* Availability / High Rating Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {doctor.availableToday && (
                <span className="bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Available today
                </span>
              )}
              {doctor.highlyRated && (
                <span className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Highly rated
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Appointment Details Header Bar */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800">Appointment Details</h4>
          <StatusBadge label="Completed" variant="green" showDot={true} />
        </div>

        {/* 2x2 Grid for Appointment Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
          {details.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50/70 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-50/80 border border-purple-100/50 flex items-center justify-center shrink-0">
                {getIcon(item.iconName)}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block font-normal leading-tight">
                  {item.label}
                </span>
                <span 
                  className={`text-xs font-bold text-slate-800 leading-tight truncate block ${
                    item.id === 'meetingId' ? 'cursor-pointer hover:text-purple-600' : ''
                  }`}
                  onClick={() => {
                    if (item.id === 'meetingId' && onCopyMeetingId) {
                      onCopyMeetingId(item.value);
                    }
                  }}
                  title={item.id === 'meetingId' ? 'Click to copy Meeting ID' : undefined}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
