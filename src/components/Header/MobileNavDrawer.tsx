import React, { useEffect } from 'react';
import { 
  X, 
  LayoutGrid, 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Search, 
  Bell,
  ChevronRight 
} from 'lucide-react';
import { NavigationTab, CurrentUser } from '../../types';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavigationTab;
  onTabSelect: (tab: NavigationTab) => void;
  currentUser: CurrentUser;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

interface NavItemConfig {
  id: NavigationTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'Appointment', label: 'Appointment', icon: <Calendar className="w-4 h-4" />, badge: '1' },
  { id: 'Patient', label: 'Patient', icon: <Users className="w-4 h-4" /> },
  { id: 'Reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
  { id: 'Chats', label: 'Chats', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'Billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
];

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabSelect,
  currentUser,
  onOpenSearch,
  onOpenSettings,
  onOpenNotifications,
  unreadCount = 0,
}) => {
  // Prevent background scrolling and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Left Navigation Drawer */}
      <aside 
        className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto animate-scale-in border-r border-slate-100"
      >
        <div>
          {/* Top User Profile Bar & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatarUrl}
                  alt={`Portrait of ${currentUser.name}`}
                  className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-purple-100 shadow-sm shrink-0"
                />
                <span 
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" 
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <h3 id="mobile-nav-title" className="text-sm font-bold text-slate-900 truncate">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-400 truncate">{currentUser.role}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Utility Actions Row */}
          <div className="grid grid-cols-3 gap-2 my-4">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors text-xs font-semibold gap-1"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenNotifications();
              }}
              className="relative flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors text-xs font-semibold gap-1"
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-4 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-colors text-xs font-semibold gap-1"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          {/* Side Navigation Items */}
          <nav aria-label="Mobile Drawer Navigation" className="space-y-1 pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider block mb-1.5">
              Menu
            </span>
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabSelect(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-md shadow-purple-500/25'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && !isActive && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white/80' : 'text-slate-300'}`} />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer App Info */}
        <div className="pt-4 mt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Aether Healthcare Portal · v2.4
          </p>
        </div>
      </aside>
    </div>
  );
};
