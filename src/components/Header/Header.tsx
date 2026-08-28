import React, { useState } from 'react';
import { Search, Settings, Bell, Menu } from 'lucide-react';
import { NavigationTab, CurrentUser } from '../../types';
import { NavItem } from './NavItem';
import { IconButton } from './IconButton';
import { ProfileBadge } from './ProfileBadge';
import { MobileNavDrawer } from './MobileNavDrawer';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentUser: CurrentUser;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

const NAV_TABS: NavigationTab[] = [
  'Dashboard',
  'Appointment',
  'Patient',
  'Reports',
  'Chats',
  'Billing',
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onOpenSearch,
  onOpenSettings,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full pt-3 sm:pt-6 pb-2 sm:pb-4 px-3 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* DESKTOP VIEW (lg+): Reference Floating Navigation Pill */}
        <nav 
          aria-label="Main Navigation"
          className="hidden lg:flex bg-white/95 backdrop-blur-md rounded-full p-1.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] items-center gap-1 shrink-0"
        >
          {NAV_TABS.map((tab) => (
            <NavItem
              key={tab}
              tab={tab}
              isActive={activeTab === tab}
              onClick={onTabChange}
            />
          ))}
        </nav>

        {/* MOBILE VIEW (<lg): LEFT - Hamburger Menu Button ONLY */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 min-w-[40px] rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="Open Navigation Menu"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* RIGHT SIDE: Action Icons & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <IconButton
            icon={<Search className="w-4 h-4 text-slate-600" />}
            label="Search records, doctors, or tests"
            variant="gray"
            onClick={onOpenSearch}
          />
          <div className="hidden sm:block">
            <IconButton
              icon={<Settings className="w-4 h-4 text-slate-600" />}
              label="Settings"
              variant="white"
              onClick={onOpenSettings}
            />
          </div>
          <IconButton
            icon={<Bell className="w-4 h-4 text-slate-600" />}
            label="Notifications"
            variant="white"
            badgeCount={unreadCount}
            onClick={onOpenNotifications}
          />
          <div className="h-6 w-[1px] bg-slate-200/80 mx-0.5 hidden sm:block" />
          <ProfileBadge user={currentUser} onClick={onOpenProfile} />
        </div>
      </header>

      {/* Side Navigation Drawer for Mobile & Tablet */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabSelect={onTabChange}
        currentUser={currentUser}
        onOpenSearch={onOpenSearch}
        onOpenSettings={onOpenSettings}
        onOpenNotifications={onOpenNotifications}
        unreadCount={unreadCount}
      />
    </>
  );
};
