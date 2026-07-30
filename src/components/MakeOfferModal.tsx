import React, { useState } from 'react';
import { X, ArrowLeftRight, Sparkles, Plus, Check, DollarSign } from 'lucide-react';
import { Item, Language, UserProfile } from '../types';
import { translations } from '../utils/translations';

interface MakeOfferModalProps {
  isOpen: boolean;
  targetItem: Item | null;
  myItems: Item[];
  lang: Language;
  onClose: () => void;
  onSubmitOffer: (
    targetItem: Item,
    offeredItemIds: string[],
    cashAmount: number,
    direction: 'proposer_pays' | 'target_owner_pays' | 'none'
  ) => void;
  onOpenAiAdvisor: () => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  isOpen,
  targetItem,
  myItems,
  lang,
  onClose,
  onSubmitOffer,
  onOpenAiAdvisor,
}) => {
  if (!isOpen || !targetItem) return null;

  const t = translations[lang];

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    myItems[0] ? [myItems[0].id] : []
  );
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [direction, setDirection] = useState<'proposer_pays' | 'target_owner_pays' | 'none'>('none');

  const toggleItemSelection = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((item) => item !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const handleSend = () => {
    onSubmitOffer(targetItem, selectedItemIds, cashAmount, direction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-auto text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">{t.proposeSwap}</h2>
            <p className="text-xs text-slate-500">{targetItem.ownerName} kullanıcısına takas teklifi oluşturun</p>
          </div>
        </div>

        {/* Target Item Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-3 mb-5">
          <img
            src={targetItem.images[0]}
            alt={targetItem.title}
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">İstediğiniz Eşya</span>
            <span className="font-extrabold text-sm block line-clamp-1">{targetItem.title}</span>
            <span className="text-amber-500 font-extrabold">
              Piyasa Değeri: ₺{targetItem.estimatedValue.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>

        {/* Select From My Items */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-slate-500">
              Verceğiniz Eşya(lar)ı Seçin
            </label>
            <button
              onClick={onOpenAiAdvisor}
              className="text-xs text-amber-500 hover:underline font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI ile Üste Parayı Hesapla
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {myItems.map((item) => {
              const isSelected = selectedItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="text-xs">
                      <span className="font-bold block line-clamp-1">{item.title}</span>
                      <span className="text-slate-500 font-medium">₺{item.estimatedValue}</span>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cash Top-Up Adjustment */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 mb-6">
          <label className="block text-xs font-bold uppercase text-slate-500">
            Üste Para Ekle / İsteyin (İsteğe Bağlı)
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDirection('none')}
              className={`py-2 rounded-xl border font-bold transition-all ${
                direction === 'none'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Üste Para Yok
            </button>
            <button
              type="button"
              onClick={() => setDirection('proposer_pays')}
              className={`py-2 rounded-xl border font-bold transition-all ${
                direction === 'proposer_pays'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Ben Vereceğim
            </button>
            <button
              type="button"
              onClick={() => setDirection('target_owner_pays')}
              className={`py-2 rounded-xl border font-bold transition-all ${
                direction === 'target_owner_pays'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Satıcı Versin
            </button>
          </div>

          {direction !== 'none' && (
            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
                Tutar (TL)
              </label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(Number(e.target.value))}
                placeholder="Örn: 500"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSend}
          disabled={selectedItemIds.length === 0}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer disabled:opacity-50 text-sm"
        >
          Teklifi Mesaj Olarak Gönder
        </button>
      </div>
    </div>
  );
};
