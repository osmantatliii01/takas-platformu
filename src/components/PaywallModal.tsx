import React, { useState } from 'react';
import { Crown, Sparkles, X, Check, Play, ShieldCheck, Zap, CreditCard, Lock, Calendar } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../utils/translations';

interface PaywallModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  lang: Language;
  onClose: () => void;
  onUpgradeSuccess: () => void;
  onWatchAdReward: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  currentUser,
  lang,
  onClose,
  onUpgradeSuccess,
  onWatchAdReward,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [watchingAd, setWatchingAd] = useState(false);
  const [adFinished, setAdFinished] = useState(false);

  const handleSimulateWatchAd = () => {
    setWatchingAd(true);
    setTimeout(() => {
      setWatchingAd(false);
      setAdFinished(true);
      onWatchAdReward();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 my-auto text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30">
            <Crown className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black">{t.upgradePremium}</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {t.quotaExceededDesc}
          </p>

          {/* Billing Cycle Selector Bar */}
          <div className="inline-flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 mt-3">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Aylık Faturalama
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yıllık Faturalama</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-950 text-amber-300 border border-amber-500/30">
                %27 İNDİRİM
              </span>
            </button>
          </div>
        </div>

        {/* Grid options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Plan 1: TakasPass Premium PRO */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-950 border-2 border-amber-500/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                  EN POPÜLER • TAKASPASS PRO
                </span>
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              
              <h3 className="text-lg font-black mt-2 text-white">TakasPass PRO</h3>
              
              {/* Dynamic Price Display */}
              {billingCycle === 'yearly' ? (
                <div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-amber-400">₺58</span>
                    <span className="text-xl font-bold text-amber-400">.33</span>
                    <span className="text-xs text-slate-400 font-medium">/ ay</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Yıllık ₺699.99 Faturalandırılır</span>
                    <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded text-[9px] border border-amber-500/40">
                      2 Ay Bedava!
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-amber-400">₺79</span>
                    <span className="text-xl font-bold text-amber-400">.99</span>
                    <span className="text-xs text-slate-400 font-medium">/ ay</span>
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-400">
                    Aylık faturalandırılır • İstediğin zaman iptal et
                  </div>
                </div>
              )}

              {/* Selector Tabs inside card */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 my-3 text-center text-xs">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Aylık ₺79.99
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    billingCycle === 'yearly'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-amber-400 hover:text-amber-300'
                  }`}
                >
                  <span>Yıllık ₺699.99</span>
                </button>
              </div>

              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{t.unlimitedListings}</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.aiValuationFree}</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Her ay 3 Adet Öne Çıkan İlan Hakkı</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.noAds}</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Onaylı PRO Rozeti & Mağaza Analiz Paneli</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onUpgradeSuccess();
                onClose();
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/25 text-xs transition-all cursor-pointer transform active:scale-95"
            >
              {billingCycle === 'yearly'
                ? 'Yıllık TakasPass PRO Ol (₺699.99/Yıl)'
                : 'Aylık TakasPass PRO Ol (₺79.99/Ay)'}
            </button>
          </div>

          {/* Plan 2: 1-Time Listing Pack / Watch Ad */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 uppercase tracking-wider">
                TEK SEFERLİK SEÇENEK
              </span>
              <h3 className="text-lg font-black mt-2 text-white">1-İlan Paketi veya Reklam</h3>
              <div className="text-2xl font-black text-indigo-400 mt-1">
                ₺19<span className="text-sm font-normal text-slate-400">.99 / ilan</span>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Abonelik olmadan tek bir ilan yüklemek istiyorsanız 19.99 TL paket alabilir veya sponsorlu kısa bir reklam izleyerek +1 ilan hakkı kazanabilirsiniz.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onUpgradeSuccess();
                  onClose();
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>Tek İlan Satın Al (₺19.99)</span>
              </button>

              <button
                onClick={handleSimulateWatchAd}
                disabled={watchingAd || adFinished}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20"
              >
                <Play className="w-4 h-4" />
                <span>
                  {watchingAd
                    ? t.watchingAd
                    : adFinished
                    ? 'Hak Eklendi! 🎉'
                    : t.watchAdForQuota}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <Lock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Güvenli ödemeler 256-Bit SSL şifreleme ile korunan harici altyapı üzerinden tamamlanır.</span>
        </div>
      </div>
    </div>
  );
};

