import React, { useState } from 'react';
import { CurrentUser } from '../../types';
import { DR_BROCK_AVATAR_FALLBACK } from '../../assets/avatars';

interface ProfileBadgeProps {
  user: CurrentUser;
  onClick?: () => void;
}

export const ProfileBadge: React.FC<ProfileBadgeProps> = ({ user, onClick }) => {
  const [imgSrc, setImgSrc] = useState(user.avatarUrl);

  const handleError = () => {
    if (imgSrc !== DR_BROCK_AVATAR_FALLBACK) {
      setImgSrc(DR_BROCK_AVATAR_FALLBACK);
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100/60 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
      title="View Profile Settings"
      aria-label={`User Profile: ${user.name}, ${user.role}`}
    >
      <div className="relative shrink-0">
        <img
          src={imgSrc}
          alt={`Portrait of ${user.name}, ${user.role}`}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover object-top ring-2 ring-white shadow-sm shrink-0"
          onError={handleError}
          loading="eager"
        />
        <span 
          className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" 
          aria-hidden="true" 
        />
      </div>
      <div className="hidden md:block">
        <h4 className="text-xs font-bold text-slate-900 leading-tight">
          {user.name}
        </h4>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-normal leading-none mt-0.5">
          {user.role}
        </p>
      </div>
    </button>
  );
};
