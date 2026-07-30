import React, { useState } from 'react';
import { X, Sparkles, Plus, Image as ImageIcon, Loader2, Crown, AlertCircle } from 'lucide-react';
import { Item, ItemCategory, ItemCondition, Language, UserProfile } from '../types';
import { translations } from '../utils/translations';

interface AddListingModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  lang: Language;
  onClose: () => void;
  onOpenPaywall: () => void;
  onAddListingSuccess: (newItem: Item) => void;
}

const SAMPLE_PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', // smartwatch
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', // headphones
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', // watch
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80', // laptop
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', // phone
];

export const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  currentUser,
  lang,
  onClose,
  onOpenPaywall,
  onAddListingSuccess,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const quotaExceeded = !currentUser.isPremium && currentUser.listingQuotaUsed >= currentUser.listingQuotaMax;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('elektronik');
  const [condition, setCondition] = useState<ItemCondition>('az_kullanılmış');
  const [estimatedValue, setEstimatedValue] = useState<number>(2500);
  const [targetSwapDescription, setTargetSwapDescription] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_PRODUCT_IMAGES[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isBoosted, setIsBoosted] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);

  // AI Auto-valuation
  const handleAiValuation = async () => {
    if (!title.trim()) return;

    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, condition, description }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEstimatedValue(data.data.estimatedAvgTRY);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quotaExceeded) {
      onOpenPaywall();
      return;
    }

    if (!title.trim()) return;

    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;

    const newItem: Item = {
      id: `item_${Date.now()}`,
      title,
      description,
      category,
      condition,
      estimatedValue,
      targetSwapDescription: targetSwapDescription || 'Benzer değerde teknolojik ürünler veya aksesuarlar.',
      images: [finalImage],
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerAvatar: currentUser.avatar,
      ownerTrustScore: currentUser.trustScore,
      ownerRating: currentUser.starRating,
      location: {
        district: 'Kadıköy',
        city: 'İstanbul',
        distanceKm: 0.0,
      },
      createdAt: 'Az önce',
      views: 1,
      isBoosted: isBoosted || currentUser.isPremium,
      isAiValuated: true,
      status: 'active',
    };

    onAddListingSuccess(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-auto text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Plus className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black">{t.addListing}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ücretsiz takas ilanınızı yayınlayın, hemen teklifleri toplayın.
            </p>
          </div>
        </div>

        {/* Quota Exceeded Warning Banner */}
        {quotaExceeded ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 space-y-3 mb-6 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{t.quotaExceeded}</span>
            </div>
            <p className="text-xs leading-relaxed">{t.quotaExceededDesc}</p>
            <button
              type="button"
              onClick={onOpenPaywall}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer"
            >
              {t.upgradePremium} (veya Paketi İncele)
            </button>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              İlan Başlığı *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Apple Watch Series 8 45mm GPS Siyah"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              >
                <option value="elektronik">Elektronik & Teknoloji</option>
                <option value="oyun">Oyun & Konsol</option>
                <option value="moda">Moda & Giyim</option>
                <option value="ev_yasam">Ev & Yaşam</option>
                <option value="spor">Spor & Outdoor</option>
                <option value="vasita">Vasıta & Oto</option>
                <option value="hobi">Hobi & Koleksiyon</option>
                <option value="kitap_muzik">Kitap, Müzik & Film</option>
                <option value="anne_bebek">Anne, Bebek & Çocuk</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Kullanım Durumu
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              >
                <option value="sıfır">Sıfır / Kapalı Kutu</option>
                <option value="az_kullanılmış">Sıfır Ayarında / Az Kullanılmış</option>
                <option value="iyi">İyi Durumda</option>
                <option value="makul">Makul / Çalışır Durumda</option>
              </select>
            </div>
          </div>

          {/* Estimated Value & AI Valuation Trigger */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Tahmini Piyasa Değeri (TL)
              </label>
              <button
                type="button"
                onClick={handleAiValuation}
                disabled={aiLoading || !title.trim()}
                className="text-xs text-amber-500 hover:underline font-bold flex items-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                {aiLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                )}
                AI ile Otomatik Değer Biç
              </button>
            </div>
            <input
              type="number"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-extrabold text-emerald-600 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Target Swap Wishlist */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Aradığınız Takas Eşyası / Kriterleri
            </label>
            <input
              type="text"
              value={targetSwapDescription}
              onChange={(e) => setTargetSwapDescription(e.target.value)}
              placeholder="Örn: AirPods Pro 2, Elektrikli Scooter veya Gitar Amfisi"
              className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Açıklama / Detaylar
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ürünün kozmetik durumu, faturası, aksesuarları hakkında bilgi yazın..."
              className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Image Picker */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              Ürün Görseli Seçin
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {SAMPLE_PRODUCT_IMAGES.map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedImage(imgUrl);
                    setCustomImageUrl('');
                  }}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImage === imgUrl && !customImageUrl
                      ? 'border-emerald-500 ring-2 ring-emerald-500/50 scale-105'
                      : 'border-slate-200 dark:border-slate-700 opacity-70'
                  }`}
                >
                  <img src={imgUrl} alt="sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Veya özel görsel URL yapıştırın (https://...)"
              className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs mt-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer text-sm"
          >
            {quotaExceeded ? 'Abonelik / Paket Sayfasına Git' : 'İlanı Ücretsiz Yayınla'}
          </button>
        </form>
      </div>
    </div>
  );
};
