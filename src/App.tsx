import { useState, useCallback } from 'react';
import { 
  NavigationTab, 
  NextStep, 
  NotificationItem 
} from './types';
import { 
  currentUser, 
  attendingDoctor, 
  appointmentDetails, 
  clinicalSummary, 
  activePrescription, 
  labOrders, 
  nextSteps, 
  mockNotifications 
} from './data/consultationData';

import { Header } from './components/Header/Header';
import { SuccessHero } from './components/Hero/SuccessHero';
import { DoctorAppointmentCard } from './components/Dashboard/DoctorAppointmentCard';
import { ClinicalSummaryCard } from './components/Dashboard/ClinicalSummaryCard';
import { PrescriptionCard } from './components/Dashboard/PrescriptionCard';
import { LabOrdersCard } from './components/Dashboard/LabOrdersCard';
import { NextStepsSection } from './components/Dashboard/NextStepsSection';
import { BottomActions } from './components/Dashboard/BottomActions';

import { PrescriptionModal } from './components/Modals/PrescriptionModal';
import { LabScheduleModal } from './components/Modals/LabScheduleModal';
import { VisitSummaryModal } from './components/Modals/VisitSummaryModal';
import { MedicalRecordsModal } from './components/Modals/MedicalRecordsModal';
import { SearchModal } from './components/Modals/SearchModal';
import { NotificationsPopover } from './components/Modals/NotificationsPopover';
import { NextStepDetailModal } from './components/Modals/NextStepDetailModal';
import { DoctorProfileModal } from './components/Modals/DoctorProfileModal';
import { Toast, ToastProps } from './components/UI/Toast';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('Dashboard');
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

  // Modal states
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isLabScheduleOpen, setIsLabScheduleOpen] = useState(false);
  const [isVisitSummaryOpen, setIsVisitSummaryOpen] = useState(false);
  const [isMedicalRecordsOpen, setIsMedicalRecordsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [selectedNextStep, setSelectedNextStep] = useState<NextStep | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab !== 'Dashboard') {
      showToast(`Navigated to ${tab} portal`, 'info');
    }
  };

  const handleDownloadPrescription = () => {
    setIsPrescriptionOpen(true);
  };

  const handleConfirmPrescriptionDownload = () => {
    showToast('Prescription PDF downloaded & transmitted to pharmacy!');
    setIsPrescriptionOpen(false);
  };

  const handleScheduleLab = () => {
    setIsLabScheduleOpen(true);
  };

  const handleConfirmLabSchedule = (details: { clinic: string; date: string; time: string }) => {
    showToast(`Lab scheduled at ${details.clinic} on ${details.date} (${details.time})`);
  };

  const handleCopyMeetingId = (id: string) => {
    navigator.clipboard?.writeText(id);
    showToast(`Meeting ID copied to clipboard: ${id}`);
  };

  const handleNextStepAction = (step: NextStep) => {
    if (step.id === 'lifestyle') {
      showToast('Cardiovascular Activity Plan added to your Health Routine');
    } else if (step.id === 'reminders') {
      showToast('Daily morning dosage reminder configured in Aether App');
    } else if (step.id === 'followup') {
      showToast('3-Month review calendar placeholder reserved');
    }
  };

  const handleSearchAction = (action: string) => {
    if (action === 'doctor') setIsDoctorProfileOpen(true);
    else if (action === 'prescription') setIsPrescriptionOpen(true);
    else if (action === 'summary') setIsVisitSummaryOpen(true);
    else if (action === 'lab') setIsLabScheduleOpen(true);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setIsNotificationsOpen(false);
    if (item.type === 'prescription') setIsPrescriptionOpen(true);
    else if (item.type === 'lab') setIsLabScheduleOpen(true);
    else setIsVisitSummaryOpen(true);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 flex flex-col relative overflow-x-hidden">
      {/* Background Soft Glow Accents */}
      <div 
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-200/25 rounded-full blur-3xl -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed bottom-10 left-[-100px] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed top-1/3 right-[-100px] w-[450px] h-[450px] bg-purple-100/30 rounded-full blur-3xl -z-10" 
        aria-hidden="true" 
      />

      {/* Top Floating Navigation Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentUser={currentUser}
        unreadCount={unreadNotificationCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => showToast('Settings panel opened', 'info')}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => showToast(`Logged in as Dr. ${currentUser.name} (${currentUser.role})`, 'info')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {activeTab === 'Dashboard' ? (
          <>
            {/* Success Hero Section */}
            <SuccessHero />

            {/* Top Grid: Doctor Info & AI Clinical Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              <DoctorAppointmentCard
                doctor={attendingDoctor}
                details={appointmentDetails}
                onViewDoctorProfile={() => setIsDoctorProfileOpen(true)}
                onCopyMeetingId={handleCopyMeetingId}
              />
              <ClinicalSummaryCard
                summary={clinicalSummary}
                onExpandSummary={() => setIsVisitSummaryOpen(true)}
              />
            </div>

            {/* Second Row: Prescription Ready & Lab Orders Issued */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5 items-stretch">
              <PrescriptionCard
                prescription={activePrescription}
                onDownload={handleDownloadPrescription}
              />
              <LabOrdersCard
                orders={labOrders}
                onSchedule={handleScheduleLab}
              />
            </div>

            {/* Third Row: Recommended Next Steps */}
            <NextStepsSection
              steps={nextSteps}
              onSelectStep={(step) => setSelectedNextStep(step)}
            />

            {/* Bottom Actions */}
            <BottomActions
              onViewSummary={() => setIsVisitSummaryOpen(true)}
              onViewRecords={() => setIsMedicalRecordsOpen(true)}
              onGoToDashboard={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('Refreshed Dashboard view');
              }}
            />
          </>
        ) : (
          /* Placeholder View when other nav tabs are selected */
          <div className="py-20 text-center space-y-4 animate-fade-in max-w-md mx-auto">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto text-xl font-bold shadow-inner">
              {activeTab.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{activeTab} Module</h2>
            <p className="text-xs text-slate-500">
              You are currently viewing the {activeTab} workspace. All patient consultation data remains saved in your session.
            </p>
            <button
              onClick={() => setActiveTab('Dashboard')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-xs font-semibold shadow-sm hover:shadow-purple-500/30 transition-all cursor-pointer"
            >
              Return to Consultation Summary
            </button>
          </div>
        )}
      </main>

      {/* Modals & Overlays */}
      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        prescription={activePrescription}
        onConfirmDownload={handleConfirmPrescriptionDownload}
      />

      <LabScheduleModal
        isOpen={isLabScheduleOpen}
        onClose={() => setIsLabScheduleOpen(false)}
        orders={labOrders}
        onConfirmSchedule={handleConfirmLabSchedule}
      />

      <VisitSummaryModal
        isOpen={isVisitSummaryOpen}
        onClose={() => setIsVisitSummaryOpen(false)}
        doctor={attendingDoctor}
      />

      <MedicalRecordsModal
        isOpen={isMedicalRecordsOpen}
        onClose={() => setIsMedicalRecordsOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={handleSearchAction}
      />

      <NotificationsPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
      />

      <NextStepDetailModal
        step={selectedNextStep}
        onClose={() => setSelectedNextStep(null)}
        onTakeAction={handleNextStepAction}
      />

      <DoctorProfileModal
        isOpen={isDoctorProfileOpen}
        onClose={() => setIsDoctorProfileOpen(false)}
        doctor={attendingDoctor}
        onBookFollowup={() => {
          showToast('Follow-up consultation booking initialized');
        }}
      />

      {/* Toast Notifications Stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
