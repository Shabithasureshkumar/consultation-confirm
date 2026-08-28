import React from 'react';
import { Dumbbell, AlarmClock, CalendarCheck, ChevronRight } from 'lucide-react';
import { NextStep } from '../../types';

interface NextStepsSectionProps {
  steps: NextStep[];
  onSelectStep: (step: NextStep) => void;
}

export const NextStepsSection: React.FC<NextStepsSectionProps> = ({
  steps,
  onSelectStep,
}) => {
  const getIcon = (type: NextStep['iconType']) => {
    switch (type) {
      case 'activity':
        return <Dumbbell className="w-4 h-4 text-purple-600" />;
      case 'reminder':
        return <AlarmClock className="w-4 h-4 text-sky-500" />;
      case 'recap':
        return <CalendarCheck className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <section className="mt-5 sm:mt-6">
      <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3">
        Recommended Next Steps
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelectStep(step)}
            className="group bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-card-hover hover:border-slate-200 transition-all duration-200 text-left flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.99]"
          >
            <div>
              {/* Card Header with Icon & Chevron */}
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(step.iconType)}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Title & Description */}
              <h4 className="font-bold text-slate-900 text-xs mt-2.5 group-hover:text-purple-600 transition-colors">
                {step.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
