import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { LabOrder } from '../../types';

interface LabScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: LabOrder[];
  onConfirmSchedule: (details: { clinic: string; date: string; time: string }) => void;
}

const CLINIC_OPTIONS = [
  { id: 'c1', name: 'Aether BioLabs Downtown Clinic', address: '742 Evergreen Blvd, Suite 400', distance: '1.2 miles' },
  { id: 'c2', name: 'Metro Health Diagnostics West', address: '1204 Grand Avenue, 2nd Floor', distance: '2.8 miles' },
  { id: 'c3', name: 'At-Home Phlebotomist Specialist', address: 'Mobile dispatch to your home address', distance: 'Direct Visit' },
];

const TIME_SLOTS = ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '04:15 PM'];

export const LabScheduleModal: React.FC<LabScheduleModalProps> = ({
  isOpen,
  onClose,
  orders,
  onConfirmSchedule,
}) => {
  const [selectedClinic, setSelectedClinic] = useState(CLINIC_OPTIONS[0].id);
  const [selectedDate, setSelectedDate] = useState('2024-10-28');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBook = () => {
    const clinic = CLINIC_OPTIONS.find((c) => c.id === selectedClinic)?.name || '';
    setIsBooked(true);
    setTimeout(() => {
      onConfirmSchedule({ clinic, date: selectedDate, time: selectedTime });
      setIsBooked(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-scale-in max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-schedule-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Lab Schedule Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-slate-100">
          <h2 id="lab-schedule-title" className="text-base font-bold text-slate-900">
            Schedule Diagnostic Lab Work
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Book an appointment for {orders.map((o) => o.name).join(' & ')}
          </p>
        </div>

        {isBooked ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Appointment Confirmed!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Confirmation SMS and prep instructions sent. Fasting of 8-12 hours is recommended before lipid testing.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-5">
            {/* Choose Facility */}
            <div>
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                Select Laboratory Facility
              </label>
              <div className="space-y-2">
                {CLINIC_OPTIONS.map((clinic) => (
                  <button
                    key={clinic.id}
                    type="button"
                    onClick={() => setSelectedClinic(clinic.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedClinic === clinic.id
                        ? 'border-purple-500 bg-purple-50/50 ring-1 ring-purple-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{clinic.name}</span>
                      <span className="text-[10px] font-semibold text-purple-600 bg-purple-100/60 px-2 py-0.5 rounded-full">
                        {clinic.distance}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{clinic.address}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2024-10-25"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Test Summary Pill */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-semibold text-slate-700 block mb-1">Tests included in this order:</span>
              <ul className="text-slate-500 space-y-0.5 text-[11px]">
                <li>• Complete Blood Count (CBC) w/ Differential</li>
                <li>• Full Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleBook}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-semibold text-xs text-center shadow-md shadow-purple-500/20 cursor-pointer transition-all active:scale-95"
            >
              Confirm Appointment Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
