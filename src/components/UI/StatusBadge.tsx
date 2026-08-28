import React from 'react';

interface StatusBadgeProps {
  label: string;
  variant?: 'green' | 'blue' | 'sky' | 'purple' | 'slate';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'green',
  showDot = true,
  className = '',
}) => {
  const variantStyles = {
    green: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]',
    blue: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
    sky: 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]',
    purple: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
    slate: 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]',
  };

  const dotStyles = {
    green: 'bg-[#10B981]',
    blue: 'bg-[#6366F1]',
    sky: 'bg-[#0EA5E9]',
    purple: 'bg-[#8B5CF6]',
    slate: 'bg-[#64748B]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />
      )}
      {label}
    </span>
  );
};
