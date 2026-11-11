import React, { useState, useEffect } from 'react';
import { Palette, CheckCircle2, Star, Send } from 'lucide-react';
import { RatingStars } from '../UI/RatingStars';

interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  status?: string;
}

interface DesignReviewSectionProps {
  onSubmitted?: (message: string) => void;
}

const initialReviews: Review[] = [
  {
    id: 'panu',
    name: 'Panu',
    role: 'Patient',
    comment: 'The consultation was smooth and the doctor explained everything clearly.',
    rating: 5,
    status: 'Verified Visit',
  },
];

const STORAGE_KEY = 'consultation-feedback';

const loadReviews = (): Review[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // storage unavailable or corrupt: fall back to defaults
  }
  return initialReviews;
};

export const DesignReviewSection: React.FC<DesignReviewSectionProps> = ({ onSubmitted }) => {
  const [reviews, setReviews] = useState<Review[]>(loadReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // ignore storage errors
    }
  }, [reviews]);

  const canSubmit = rating > 0 && comment.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const review: Review = {
      id: Date.now().toString(),
      name: name.trim() || 'Anonymous',
      role: 'Patient',
      comment: comment.trim(),
      rating,
    };
    setReviews((prev) => [review, ...prev]);
    setName('');
    setRating(0);
    setComment('');
    onSubmitted?.('Thanks! Your consultation feedback was submitted');
  };

  return (
    <section className="mt-4 sm:mt-5" aria-labelledby="consultation-feedback-heading">
      <article className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <Palette className="w-3.5 h-3.5" />
          </div>
          <h3 id="consultation-feedback-heading" className="font-bold text-slate-900 text-sm sm:text-base">
            Consultation Feedback
          </h3>
          <span className="text-[11px] text-slate-400">({reviews.length})</span>
        </div>

        {/* Review form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={40}
              className="flex-1 min-w-[160px] rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <div
              className="flex items-center gap-0.5"
              role="radiogroup"
              aria-label="Your rating"
              onMouseLeave={() => setHover(0)}
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = n <= (hover || rating);
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => setRating(n)}
                    className="p-0.5 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        filled ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-slate-300 fill-slate-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was your consultation?"
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-xs font-semibold shadow-sm transition-all enabled:hover:shadow-purple-500/30 enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Review
            </button>
          </div>
        </form>

        {/* Reviews list */}
        <ul className="mt-5 space-y-3 border-t border-slate-100 pt-4">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4"
            >
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center">
                {r.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{r.name}</p>
                    <p className="text-[11px] text-slate-500">{r.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={r.rating} />
                    {r.status && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />
                        {r.status}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600 break-words">
                  {r.comment}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};
