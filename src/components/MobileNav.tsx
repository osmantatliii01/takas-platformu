import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User, Store, Shield } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface MobileNavProps {
  currentView: string;
  onNavigateView: (view: 'home' | 'messages' | 'profile' | 'store' | 'admin') => void;
  onOpenAddListing: () => void;
  unreadMessagesCount: number;
  lang: Language;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onNavigateView,
  onOpenAddListing,
  unreadMessagesCount,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 py-2.5 px-4 md:hidden shadow-2xl">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onNavigateView('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            currentView === 'home'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t.home}</span>
        </button>

        <button
          onClick={() => onNavigateView('messages')}
          className={`relative flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            currentView === 'messages'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>{t.messages}</span>
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-indigo-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Center Add Button */}
        <button
          onClick={onOpenAddListing}
          className="-mt-6 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center transform active:scale-90 transition-all border border-indigo-400/30 cursor-pointer"
          title={t.addListing}
        >
          <PlusCircle className="w-7 h-7" />
        </button>

        <button
          onClick={() => onNavigateView('store')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            currentView === 'store'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>{t.storeAnalytics}</span>
        </button>

        <button
          onClick={() => onNavigateView('profile')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            currentView === 'profile'
              ? 'text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span>{t.profile}</span>
        </button>
      </div>
    </div>
  );
};
