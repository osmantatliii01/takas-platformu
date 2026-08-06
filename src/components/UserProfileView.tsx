import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  Award,
  Crown,
  MapPin,
  Clock,
  Package,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Settings,
  LogOut,
  Store,
} from 'lucide-react';
import { UserProfile, Item, Language } from '../types';
import { translations } from '../utils/translations';
import { ItemCard } from './ItemCard';

interface UserProfileViewProps {
  user: UserProfile;
  userItems: Item[];
  lang: Language;
  onOpenAddListing: () => void;
  onOpenPaywall: () => void;
  onSelectItem: (item: Item) => void;
  onMakeOffer: (item: Item) => void;
  onOpenAuthModal: () => void;
  onNavigateStore: () => void;
  onOpenIdVerification?: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  userItems,
  lang,
  onOpenAddListing,
  onOpenPaywall,
  onSelectItem,
  onMakeOffer,
  onOpenAuthModal,
  onNavigateStore,
  onOpenIdVerification,
}) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'trust'>('listings');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Profile Card Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-emerald-500 shadow-lg"
            />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black">{user.name}</h1>
                {user.isPremium && <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>{user.location}</span>
                <span>•</span>
                <span>{user.memberSince} üye</span>
              </p>

              {/* Badges row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-2">
                {user.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {user.isIdVerified ? (
              <span className="px-3 py-1.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>T.C. Kimlik Onaylı</span>
              </span>
            ) : (
              <button
                onClick={onOpenIdVerification}
                className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>T.C. Kimlik Doğrula</span>
              </button>
            )}
            <button
              onClick={onNavigateStore}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Store className="w-4 h-4 text-amber-400" />
              <span>{t.storeAnalytics}</span>
            </button>

            <button
              onClick={onOpenPaywall}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Crown className="w-4 h-4 text-amber-200" />
              <span>{user.isPremium ? t.premiumBadge : t.upgradePremium}</span>
            </button>

            <button
              onClick={onOpenAuthModal}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
              title={t.login}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Key Trust Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Güven Puanı</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              %{user.trustScore}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Yıldız Değerlendirme</span>
            <span className="text-xl font-black text-amber-500">⭐ {user.starRating}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tamamlanan Takas</span>
            <span className="text-xl font-black text-teal-600 dark:text-teal-400">
              {user.totalTrades} İşlem
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">İlan Kotası</span>
            <span className="text-xl font-black text-indigo-500">
              {user.isPremium ? 'Sınırsız' : `${user.listingQuotaMax - user.listingQuotaUsed}/${user.listingQuotaMax}`}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'listings'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.myListings} ({userItems.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.tradeReviews} ({user.reviews.length})
        </button>

        <button
          onClick={() => setActiveTab('trust')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'trust'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.userTrustScoreBreakdown}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base">Aktif İlanlarınız</h3>
            <button
              onClick={onOpenAddListing}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yeni İlan Yükle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                lang={lang}
                onSelectItem={onSelectItem}
                onMakeOffer={onMakeOffer}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base">Geçmiş Takaslardan Alınan Değerlendirmeler</h3>
          <div className="space-y-3">
            {user.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.reviewerAvatar}
                      alt={rev.reviewerName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-bold text-xs block">{rev.reviewerName}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>
                  <div className="text-amber-500 font-black text-xs">⭐ {rev.rating} / 5.0</div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-500 font-semibold">
                  Takaslanan İlan: {rev.tradedItemTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'trust' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 text-xs">
          <h3 className="font-extrabold text-base">Güvenilirlik & Kimlik Doğrulama Kriterleri</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.verifiedEmail}</span>
              </div>
              <p className="text-slate-500 text-[11px]">Google Otomatik Kimlik Doğrulaması ile onaylandı.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.quickResponder}</span>
              </div>
              <p className="text-slate-500 text-[11px]">Ortalama mesaj yanıtlama süresi 10 dakikanın altındadır.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
