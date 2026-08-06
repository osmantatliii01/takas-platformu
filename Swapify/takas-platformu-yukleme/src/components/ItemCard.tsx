import React from 'react';
import { Sparkles, MapPin, ShieldCheck, ArrowLeftRight, Eye, Star } from 'lucide-react';
import { Item, Language } from '../types';
import { translations, getCategoryLabel, getConditionLabel } from '../utils/translations';

interface ItemCardProps {
  item: Item;
  lang: Language;
  onSelectItem: (item: Item) => void;
  onMakeOffer: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, lang, onSelectItem, onMakeOffer }) => {
  const t = translations[lang];

  return (
    <div
      onClick={() => onSelectItem(item)}
      className="group relative bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Boosted or AI Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
        {item.isBoosted && (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
            ⚡ ÖNE ÇIKAN
          </span>
        )}
        {item.isAiValuated && (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            AI DEĞERLİ
          </span>
        )}
      </div>

      {/* Distance Pill Top Right */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-800 flex items-center gap-1 shadow-sm">
        <MapPin className="w-3 h-3 text-indigo-400" />
        <span>{item.location.distanceKm} km</span>
      </div>

      <div>
        {/* Item Image */}
        <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

          {/* Value Badge on Image Bottom */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
            <div className="bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black tracking-wide border border-indigo-400/30 shadow-md">
              Piyasa Değeri: ₺{item.estimatedValue.toLocaleString('tr-TR')}
            </div>
            <span className="text-[10px] text-slate-300 font-medium flex items-center gap-1 bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-800">
              <Eye className="w-3 h-3" /> {item.views}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Category & Condition tags */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">
              {getCategoryLabel(item.category, lang)}
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300 font-medium border border-slate-700/50">
              {getConditionLabel(item.condition, lang)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h3>

          {/* Swap Wishlist Target */}
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold block text-[10px] uppercase text-indigo-400 mb-0.5">
              🔄 Aranan Takas:
            </span>
            <p className="line-clamp-1 italic text-[11px] text-slate-300">{item.targetSwapDescription}</p>
          </div>
        </div>
      </div>

      {/* Card Footer - Seller Info & Offer Button */}
      <div className="p-4 pt-0 border-t border-slate-800/80 mt-2">
        <div className="flex items-center justify-between pt-3">
          {/* Seller Trust Info */}
          <div className="flex items-center gap-2">
            <img
              src={item.ownerAvatar}
              alt={item.ownerName}
              className="w-7 h-7 rounded-full object-cover border border-indigo-500/40"
            />
            <div className="text-left">
              <span className="text-xs font-semibold text-slate-200 block truncate max-w-[100px]">
                {item.ownerName}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">
                  %{item.ownerTrustScore} Güven
                </span>
              </div>
            </div>
          </div>

          {/* Make Offer Button - Sleek Indigo CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMakeOffer(item);
            }}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer transform active:scale-95"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Takas Et</span>
          </button>
        </div>
      </div>
    </div>
  );
};
