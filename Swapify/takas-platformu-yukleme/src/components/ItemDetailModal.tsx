import React, { useState } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowLeftRight,
  MessageSquare,
  Eye,
  CheckCircle2,
  Calendar,
  DollarSign,
  Share2,
  AlertTriangle,
} from 'lucide-react';
import { Item, Language, UserProfile } from '../types';
import { translations, getCategoryLabel, getConditionLabel } from '../utils/translations';

interface ItemDetailModalProps {
  item: Item | null;
  currentUser: UserProfile;
  lang: Language;
  onClose: () => void;
  onMakeOffer: (item: Item) => void;
  onStartChat: (item: Item) => void;
  onOpenAiValuatorWithTitle: (title: string, desc: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  currentUser,
  lang,
  onClose,
  onMakeOffer,
  onStartChat,
  onOpenAiValuatorWithTitle,
}) => {
  if (!item) return null;

  const t = translations[lang];
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto text-slate-900 dark:text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Side: Images */}
          <div className="lg:col-span-7 bg-slate-950 p-4 flex flex-col justify-between">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={item.images[selectedImgIndex] || item.images[0]}
                alt={item.title}
                className="w-full h-full object-contain"
              />
              {item.isBoosted && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-black bg-amber-500 text-white shadow-md">
                  ⚡ ÖNE ÇIKAN İLAN
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {item.images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImgIndex === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* AI Valuation Banner Inside Detail */}
            <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  <span>Gemini AI Tahmini Piyasa Değeri</span>
                </div>
                <div className="text-xl font-black text-amber-300 mt-0.5">
                  ₺{item.estimatedValue.toLocaleString('tr-TR')}
                </div>
              </div>
              <button
                onClick={() => onOpenAiValuatorWithTitle(item.title, item.description)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
              >
                Yeniden Değerle
              </button>
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Category, Condition & Share */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase">
                  {getCategoryLabel(item.category, lang)}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-medium border border-slate-700/60 text-slate-200">
                    {getConditionLabel(item.condition, lang)}
                  </span>
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Paylaş"
                  >
                    <Share2 className="w-4 h-4 text-slate-400" />
                  </button>
                  {copied && <span className="text-[10px] text-indigo-400 font-bold">Kopyalandı!</span>}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black leading-snug text-slate-100">{item.title}</h1>

              {/* Location & Distance */}
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-semibold">
                  {item.location.district}, {item.location.city}
                </span>
                <span className="ml-auto text-indigo-400 font-bold">
                  ({item.location.distanceKm} km yakınınızda)
                </span>
              </div>

              {/* Swap Wishlist Target Box */}
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
                <span className="font-bold text-indigo-300 block uppercase text-[11px] mb-1">
                  🔄 İstenen Takas Eşyası / Kriterleri:
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {item.targetSwapDescription}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
                  Açıklama
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Seller Trust Snippet */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase text-slate-400">Satıcı Profili</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.ownerAvatar}
                      alt={item.ownerName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-100">
                        {item.ownerName}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <span>⭐ {item.ownerRating}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">
                          %{item.ownerTrustScore} Güven
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto mb-0.5" />
                    Kimlik Onaylı
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onMakeOffer(item);
                }}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
              >
                <ArrowLeftRight className="w-5 h-5" />
                <span>Hemen Takas Teklifi Yap</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onStartChat(item);
                }}
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Satıcıya Mesaj Gönder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
