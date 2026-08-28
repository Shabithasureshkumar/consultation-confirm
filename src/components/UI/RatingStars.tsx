import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  maxStars = 5,
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Rating ${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < Math.floor(rating);
        return (
          <Star
            key={index}
            className={`w-3.5 h-3.5 ${
              isFilled
                ? 'text-[#FBBF24] fill-[#FBBF24]'
                : 'text-slate-300 fill-slate-100'
            }`}
          />
        );
      })}
    </div>
  );
};
