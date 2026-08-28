import React from 'react';
import { X, Bell, Pill, FileText, FlaskConical } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'prescription':
        return <Pill className="w-3.5 h-3.5 text-purple-600" />;
      case 'lab':
        return <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:pr-12 sm:pt-20 bg-slate-900/20 backdrop-blur-2xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-100 p-4 space-y-3 animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notif-title"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-600" />
            <h3 id="notif-title" className="font-bold text-slate-900 text-xs sm:text-sm">
              Clinical Notifications
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-purple-600 hover:text-purple-700"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-0.5">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => onSelectNotification(notif)}
              className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                notif.read
                  ? 'border-slate-100 bg-white hover:bg-slate-50 text-slate-600'
                  : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50 text-slate-800 font-medium'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                {getNotifIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 truncate">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-1">{notif.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{notif.message}</p>
              </div>
              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1.5" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
