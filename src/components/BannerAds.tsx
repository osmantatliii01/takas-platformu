import React, { useState } from 'react';
import { ExternalLink, Sparkles, Shield, X, Gift } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface BannerAdsProps {
  lang: Language;
  onWatchAdForReward: () => void;
}

export const BannerAds: React.FC<BannerAdsProps> = ({ lang, onWatchAdForReward }) => {
  const t = translations[lang];
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="relative my-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <button
        onClick={() => setClosed(true)}
        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white cursor-pointer"
        title="Reklamı Kapat"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
          <Gift className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-500 text-white uppercase tracking-wider">
              {t.sponsoredAd}
            </span>
            <span className="text-xs font-bold text-indigo-300">Sponsorlu Takas Fırsatı</span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Sponsorlu kısa videoyu izleyin, anında +1 ücretsiz ilan hakkı kazanın!
          </p>
        </div>
      </div>

      <button
        onClick={onWatchAdForReward}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-lg shadow-indigo-500/25 border border-indigo-400/30"
      >
        İzle & +1 Hak Kazan
      </button>
    </div>
  );
};
