import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SuccessHeroProps {
  onTriggerConfetti?: () => void;
}

export const SuccessHero: React.FC<SuccessHeroProps> = () => {
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.35 },
        colors: ['#6C5CE7', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'],
      });
    } catch {
      // Fallback gracefully if canvas is unavailable
    }
  };

  useEffect(() => {
    // Initial subtle celebration on mount
    const timer = setTimeout(() => {
      triggerCelebration();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="text-center pt-3 pb-7 px-4 max-w-2xl mx-auto flex flex-col items-center">
      {/* Triple-Ring Glowing Success Checkmark */}
      <button
        onClick={triggerCelebration}
        type="button"
        title="Consultation Completed Successfully - Click for celebration!"
        className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full p-2 transition-transform hover:scale-105 active:scale-95"
      >
        {/* Outer Ring 1 */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-purple-200/50 bg-purple-50/20 flex items-center justify-center transition-all duration-300 group-hover:border-purple-300">
          {/* Middle Ring 2 */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border border-purple-300/70 bg-purple-100/40 flex items-center justify-center transition-all duration-300 group-hover:border-purple-400">
            {/* Center Solid Circle */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#6C5CE7] via-[#7052FF] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3] text-white" />
            </div>
          </div>
        </div>
      </button>

      {/* Main Success Title */}
      <h1 className="fluid-hero-title font-extrabold text-slate-900 tracking-tight mt-3">
        Consultation completed Successfully! 🎉
      </h1>

      {/* Subtitle / Description */}
      <p className="fluid-hero-desc text-slate-500 max-w-xl mx-auto mt-2 leading-relaxed font-normal">
        Your consultation has been scheduled and the doctor has been notified. We&apos;ve optimized your care path with AI-driven preliminary analysis.
      </p>
    </section>
  );
};
