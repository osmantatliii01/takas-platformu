import React, { useState, useEffect } from 'react';
import { Sparkles, X, Loader2, ArrowLeftRight, ShieldCheck, Scale, DollarSign } from 'lucide-react';
import { Item, Language } from '../types';
import { translations } from '../utils/translations';

interface AiTopUpAdvisorModalProps {
  isOpen: boolean;
  myItems: Item[];
  targetItem: Item | null;
  lang: Language;
  onClose: () => void;
  onApplyCashTopUp?: (amount: number, direction: 'proposer_pays' | 'target_owner_pays' | 'none') => void;
}

export const AiTopUpAdvisorModal: React.FC<AiTopUpAdvisorModalProps> = ({
  isOpen,
  myItems,
  targetItem,
  lang,
  onClose,
  onApplyCashTopUp,
}) => {
  if (!isOpen || !targetItem) return null;

  const t = translations[lang];

  const [selectedMyItemId, setSelectedMyItemId] = useState<string>(myItems[0]?.id || '');
  const selectedMyItem = myItems.find((i) => i.id === selectedMyItemId) || myItems[0];

  const [loading, setLoading] = useState(false);
  const [advisorData, setAdvisorData] = useState<any>(null);

  const handleCalculateTopUp = async () => {
    if (!selectedMyItem || !targetItem) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/top-up-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemA: {
            title: selectedMyItem.title,
            estimatedValue: selectedMyItem.estimatedValue,
            condition: selectedMyItem.condition,
          },
          itemB: {
            title: targetItem.title,
            estimatedValue: targetItem.estimatedValue,
            condition: targetItem.condition,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAdvisorData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMyItem) {
      handleCalculateTopUp();
    }
  }, [selectedMyItemId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-auto text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Scale className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black">{t.aiTopUpAdvisor}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.aiTopUpDesc}</p>
          </div>
        </div>

        {/* Compare Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* User's Offered Item Picker */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <label className="block text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
              Sizin Verceğiniz Eşya
            </label>
            {myItems.length > 0 ? (
              <select
                value={selectedMyItemId}
                onChange={(e) => setSelectedMyItemId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
              >
                {myItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title} (₺{item.estimatedValue})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-xs text-slate-400">Henüz ekli ilanınız yok.</p>
            )}

            {selectedMyItem && (
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={selectedMyItem.images[0]}
                  alt={selectedMyItem.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <span className="font-bold block line-clamp-1">{selectedMyItem.title}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    ₺{selectedMyItem.estimatedValue.toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Target Requested Item */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <label className="block text-[10px] font-extrabold uppercase text-amber-500">
              İstediğiniz Eşya (Satıcı)
            </label>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold line-clamp-1">
              {targetItem.title}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <img
                src={targetItem.images[0]}
                alt={targetItem.title}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="text-xs">
                <span className="font-bold block line-clamp-1">{targetItem.title}</span>
                <span className="text-amber-500 font-extrabold">
                  ₺{targetItem.estimatedValue.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading or Advisor Output */}
        {loading ? (
          <div className="py-12 text-center space-y-2">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-500">
              Gemini AI adil üste para hesabı yapıyor...
            </p>
          </div>
        ) : advisorData ? (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-emerald-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  AI HESAPLANAN ÜSTE PARA FARKI
                </span>
                <div className="text-2xl font-black text-amber-300">
                  {advisorData.payerDirection === 'user1_pays_user2'
                    ? `Sizin Vermeniz Gereken Üste Para: ₺${advisorData.recommendedCashTRY}`
                    : advisorData.payerDirection === 'user2_pays_user1'
                    ? `Karşı Tarafın Vermesi Gereken Üste Para: ₺${advisorData.recommendedCashTRY}`
                    : 'Birebir Denk Takas (₺0 Üste Para)'}
                </div>
              </div>

              <div className="text-right bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800">
                <span className="text-[9px] text-slate-400 block uppercase">Adalet Skoru</span>
                <span className="text-sm font-black text-emerald-400">
                  %{advisorData.tradeFairnessScore}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">
                ⚖️ AI Takas Dengesi Analizi:
              </span>
              {advisorData.analysisTR}
            </p>

            <div className="text-xs text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-900/40">
              <span className="font-bold text-amber-400 block mb-1">💡 Güvenli Takas İpucu:</span>
              {advisorData.negotiationTipTR}
            </div>

            {onApplyCashTopUp && (
              <button
                onClick={() => {
                  const dir =
                    advisorData.payerDirection === 'user1_pays_user2'
                      ? 'proposer_pays'
                      : advisorData.payerDirection === 'user2_pays_user1'
                      ? 'target_owner_pays'
                      : 'none';
                  onApplyCashTopUp(advisorData.recommendedCashTRY, dir);
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer"
              >
                Bu Hesaplamayı Teklife Uygula ve Gönder
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
