import React from 'react';
import { X, Bell, Sparkles, AlertCircle, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { AppNotification, Language } from '../types';
import { translations } from '../utils/translations';

interface NotificationsModalProps {
  isOpen: boolean;
  notifications: AppNotification[];
  lang: Language;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onActionClick: (link?: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  notifications,
  lang,
  onClose,
  onMarkAllAsRead,
  onActionClick,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-auto text-slate-900 dark:text-slate-100 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-black">Uygulama İçi Bildirimler</h2>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            Tümünü Okundu İşaretle
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.linkAction) onActionClick(n.linkAction);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                !n.read
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span className="uppercase text-emerald-600 dark:text-emerald-400">{n.type}</span>
                <span>{n.date}</span>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{n.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
