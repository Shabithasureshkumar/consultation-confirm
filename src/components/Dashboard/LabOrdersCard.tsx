import React from 'react';
import { FlaskConical, CheckCircle2 } from 'lucide-react';
import { LabOrder } from '../../types';

interface LabOrdersCardProps {
  orders: LabOrder[];
  onSchedule: () => void;
}

export const LabOrdersCard: React.FC<LabOrdersCardProps> = ({
  orders,
  onSchedule,
}) => {
  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-card-hover transition-shadow duration-300 flex flex-col justify-between">
      <div>
        {/* Card Header with Flask Icon */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <FlaskConical className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Lab Orders Issued
          </h3>
        </div>

        {/* Lab Order List Items */}
        <div className="mt-3 space-y-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#F8FAFC] border border-slate-100/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between transition-colors hover:bg-slate-100/60"
            >
              <span className="text-xs font-semibold text-slate-800 truncate pr-2">
                {order.name}
              </span>
              <CheckCircle2 className="w-4 h-4 text-slate-700 fill-slate-700 stroke-white shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Button: Schedule Lab Appointment */}
      <button
        type="button"
        onClick={onSchedule}
        className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-medium text-xs text-center shadow-sm shadow-purple-500/20 transition-all duration-150 cursor-pointer active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        Schedule Lab Appointment
      </button>
    </article>
  );
};
