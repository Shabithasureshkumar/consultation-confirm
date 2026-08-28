import React, { useState } from 'react';
import { X, FolderHeart, Calendar, FileText, Shield, Search } from 'lucide-react';

interface MedicalRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalRecordsModal: React.FC<MedicalRecordsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'visits' | 'labs' | 'rx'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const records = [
    {
      id: 'rec-1',
      title: 'Neurological & Cardio Tele-Consultation',
      category: 'visits',
      doctor: 'Dr. Sarah Jenkins',
      date: 'Oct 24, 2024',
      status: 'Completed',
      attachment: 'Summary_ENC9920.pdf',
    },
    {
      id: 'rec-2',
      title: 'Lipid Panel & CBC Diagnostic Request',
      category: 'labs',
      doctor: 'Aether BioLabs Downtown',
      date: 'Oct 24, 2024',
      status: 'Pending Sample',
      attachment: 'LabOrder_CBC_LPD.pdf',
    },
    {
      id: 'rec-3',
      title: 'Propranolol 10mg Active Rx',
      category: 'rx',
      doctor: 'Dr. Sarah Jenkins',
      date: 'Oct 24, 2024',
      status: 'Active (2 refills)',
      attachment: 'Rx_Propranolol_10mg.pdf',
    },
    {
      id: 'rec-4',
      title: 'Annual Comprehensive Health Screening',
      category: 'visits',
      doctor: 'Dr. David Brock',
      date: 'May 14, 2024',
      status: 'Archived',
      attachment: 'Annual_Summary_2024.pdf',
    },
    {
      id: 'rec-5',
      title: '24-Hour Holter ECG Telemetry',
      category: 'labs',
      doctor: 'Pacific Heart Institute',
      date: 'Apr 02, 2024',
      status: 'Normal Sinus',
      attachment: 'Holter_Report_Apr2024.pdf',
    },
  ];

  const filteredRecords = records.filter((r) => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-scale-in max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="med-records-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Medical Records"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <h2 id="med-records-title" className="text-base font-bold text-slate-900">
              Patient Health Records Vault
            </h2>
            <p className="text-xs text-slate-400">Patient: Alex Taylor · MRN: #AETH-209-8812</p>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="my-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past visits, labs, or medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['all', 'visits', 'labs', 'rx'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Records' : cat === 'visits' ? 'Visits' : cat === 'labs' ? 'Lab Reports' : 'Prescriptions'}
              </button>
            ))}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-2.5 my-4">
          {filteredRecords.length === 0 ? (
            <p className="text-center py-8 text-xs text-slate-400">No medical records match your criteria.</p>
          ) : (
            filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-purple-300 hover:bg-purple-50/20 transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{rec.title}</h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{rec.doctor}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{rec.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {rec.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>End-to-end encrypted medical storage</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
