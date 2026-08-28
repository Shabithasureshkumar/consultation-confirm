import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badgeCount?: number;
  variant?: 'white' | 'gray';
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  badgeCount = 0,
  variant = 'white',
  className = '',
}) => {
  const variantStyles = {
    white: 'bg-white border border-slate-100 hover:bg-slate-50 text-slate-700 shadow-sm',
    gray: 'bg-[#F1F3F9] hover:bg-[#E5E9F2] text-slate-600 border border-transparent',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-95 ${variantStyles[variant]} ${className}`}
    >
      {icon}
      {badgeCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse-subtle">
          {badgeCount}
        </span>
      )}
    </button>
  );
};
