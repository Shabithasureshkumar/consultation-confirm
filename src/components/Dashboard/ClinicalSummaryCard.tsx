import React from 'react';
import { Sparkles } from 'lucide-react';
import { ClinicalSummary } from '../../types';

interface ClinicalSummaryCardProps {
  summary: ClinicalSummary;
  onExpandSummary?: () => void;
}

export const ClinicalSummaryCard: React.FC<ClinicalSummaryCardProps> = ({
  summary,
  onExpandSummary,
}) => {
  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-card-hover transition-shadow duration-300 flex flex-col justify-between">
      <div>
        {/* Card Header with AI Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Sparkles className="w-3.5 h-3.5 fill-purple-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              AI Clinical Summary
            </h3>
          </div>
          {onExpandSummary && (
            <button
              onClick={onExpandSummary}
              className="text-[11px] font-medium text-purple-600 hover:text-purple-700 hover:underline"
            >
              Full analysis
            </button>
          )}
        </div>

        {/* Clinical Synthesis Paragraph */}
        <p className="text-xs leading-relaxed text-slate-600 mt-3 font-normal">
          {summary.description}
        </p>

        {/* 2-Column Findings & Recommendations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-5 pt-4 border-t border-slate-100">
          {/* Key Findings */}
          <div>
            <h4 className="text-[10px] font-bold tracking-wider text-purple-700 uppercase mb-2">
              Key Findings
            </h4>
            <ul className="space-y-1 text-[11px] text-slate-700">
              {summary.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-purple-500 font-bold leading-none">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-[10px] font-bold tracking-wider text-sky-700 uppercase mb-2">
              Recommendations
            </h4>
            <ul className="space-y-1 text-[11px] text-slate-700">
              {summary.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-sky-500 font-bold leading-none">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};
