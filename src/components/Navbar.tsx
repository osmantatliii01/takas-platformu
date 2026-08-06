import React from 'react';
import {
  ArrowLeftRight,
  Search,
  PlusCircle,
  Bell,
  Sun,
  Moon,
  Globe,
  User as UserIcon,
  Crown,
  Sparkles,
  MapPin,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import { Language, Theme, UserProfile, AppNotification } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  user: UserProfile;
  theme: Theme;
  lang: Language;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onOpenAddListing: () => void;
  onOpenAiValuator: () => void;
  onOpenPaywall: () => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  onNavigateView: (view: 'home' | 'messages' | 'profile' | 'store' | 'admin') => void;
  currentView: string;
  notifications: AppNotification[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  theme,
  lang,
  onToggleTheme,
  onToggleLang,
  onOpenAddListing,
  onOpenAiValuator,
  onOpenPaywall,
  onOpenNotifications,
  onOpenAuth,
  onNavigateView,
  currentView,
  notifications,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
}) => {
  const t = translations[lang];
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full max-w-[100vw] overflow-x-hidden backdrop-blur-xl bg-slate-900/90 dark:bg-slate-950/90 border-b border-slate-800 transition-colors duration-200 shadow-xl pt-[max(2.75rem,env(safe-area-inset-top))] sm:pt-[env(safe-area-inset-top)]">
      {/* Top Banner / Announcement Bar for Monetization & App Trust */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-violet-800 text-white text-xs py-1.5 px-3 sm:px-4 font-medium flex items-center justify-between border-b border-indigo-500/20 max-w-[100vw] overflow-hidden">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span className="tracking-wide text-[11px] sm:text-xs">
            {lang === 'tr'
              ? 'AI Destekli Akıllı Takas: Eşyalarını sıfır komisyonla adil değerinde takasla!'
              : 'AI-Powered Smart Swap: Trade items commission-free at fair value!'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={onOpenAiValuator}
            className="hover:underline flex items-center gap-1 text-indigo-200 hover:text-white transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            {t.aiValuationBtn}
          </button>
          <button
            onClick={onOpenPaywall}
            className="bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20 transition-all cursor-pointer"
          >
            <Crown className="w-3 h-3 text-amber-300" />
            {user.isPremium ? t.premiumBadge : t.upgradePremium}
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 overflow-hidden">
        <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
          {/* Sleek Interface Rotated Square Logo & Brand */}
          <div
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg shadow-indigo-500/30 group-hover:rotate-0 transition-transform duration-300">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  SWAPiFY
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/30 uppercase tracking-wider">
                  2.EL TAKAS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden lg:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Location Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 px-3 py-2 rounded-xl text-slate-200 border border-slate-800 transition-colors cursor-pointer shrink-0">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-slate-200"
            >
              <option value="İstanbul" className="bg-slate-900 text-slate-200">İstanbul (Kadıköy)</option>
              <option value="Ankara" className="bg-slate-900 text-slate-200">Ankara (Çankaya)</option>
              <option value="İzmir" className="bg-slate-900 text-slate-200">İzmir (Alsancak)</option>
              <option value="Bursa" className="bg-slate-900 text-slate-200">Bursa (Nilüfer)</option>
              <option value="Antalya" className="bg-slate-900 text-slate-200">Antalya (Muratpaşa)</option>
            </select>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900/90 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Action Buttons & Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Listing Quota Indicator Button */}
            <button
              onClick={onOpenPaywall}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
              title={t.quotaTitle}
            >
              <span className="text-slate-400">Kota:</span>
              <span
                className={`px-1.5 py-0.2 rounded font-bold ${
                  user.isPremium
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : user.listingQuotaUsed >= user.listingQuotaMax
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}
              >
                {user.isPremium
                  ? 'Sınırsız PRO'
                  : `${user.listingQuotaMax - user.listingQuotaUsed}/${user.listingQuotaMax}`}
              </span>
            </button>

            {/* AI Valuator Trigger */}
            <button
              onClick={onOpenAiValuator}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title={t.aiValuationTitle}
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="hidden xl:inline">{t.aiValuationBtn}</span>
            </button>

            {/* Add Listing Primary Button - Sleek Indigo CTA (Hidden on mobile as MobileNav has the central + button) */}
            <button
              onClick={onOpenAddListing}
              className="hidden sm:flex px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-500/20 items-center gap-1.5 transition-all cursor-pointer transform active:scale-95 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.addListing}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-300 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              title="Bildirimler"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:bg-slate-800 border border-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              title="Dil Değiştir / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase text-[10px] sm:text-xs">{lang}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              title="Karanlık / Aydınlık Mod"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* User Profile Avatar / Quick Auth */}
            <div className="relative pl-1 border-l border-slate-800">
              <button
                onClick={() => onNavigateView('profile')}
                className={`flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800 transition-colors ${
                  currentView === 'profile' ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-500/50"
                />
                <div className="hidden lg:block text-left text-xs">
                  <div className="font-bold text-slate-200 flex items-center gap-1">
                    {user.name}
                    {user.isPremium && <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />}
                  </div>
                  <div className="text-[10px] text-indigo-400 font-semibold">
                    ⭐ {user.starRating} (%{user.trustScore} Güven)
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2 sm:hidden relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </header>
  );
};
