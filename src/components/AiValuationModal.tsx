import React, { useState } from 'react';
import { Sparkles, X, Loader2, CheckCircle2, TrendingUp, Tag, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AiValuationModalProps {
  isOpen: boolean;
  initialTitle?: string;
  initialDesc?: string;
  lang: Language;
  onClose: () => void;
  onApplyValuation?: (avgValue: number) => void;
}

export const AiValuationModal: React.FC<AiValuationModalProps> = ({
  isOpen,
  initialTitle = '',
  initialDesc = '',
  lang,
  onClose,
  onApplyValuation,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const [title, setTitle] = useState(initialTitle || 'Sony PlayStation 5 Disc Edition');
  const [category, setCategory] = useState('oyun');
  const [condition, setCondition] = useState('az_kullanılmış');
  const [description, setDescription] = useState(
    initialDesc || 'Orijinal kutusunda, 2 DualSense kol ve 2 oyun ile sorunsuz çalışır durumda.'
  );

  const [loading, setLoading] = useState(false);
  const [valuationData, setValuationData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRunValuation = async () => {
    if (!title.trim()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/ai/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, condition, description }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setValuationData(data.data);
      } else {
        throw new Error('Değerleme alınamadı.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('AI Servis yoğunluğu veya bağlantı hatası. Varsayılan değerleme gösteriliyor.');
    } finally {
      setLoading(false);
    }
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black">{t.aiValuationTitle}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.aiValuationDesc}</p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Ürün Başlığı & Marka Model
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: iPhone 13 128GB Temiz Cihaz"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="elektronik">Elektronik & Teknoloji</option>
                <option value="oyun">Oyun & Konsol</option>
                <option value="moda">Moda & Giyim</option>
                <option value="ev_yasam">Ev & Yaşam</option>
                <option value="spor">Spor & Outdoor</option>
                <option value="vasita">Vasıta & Oto</option>
                <option value="hobi">Hobi & Koleksiyon</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Kullanım Durumu
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="sıfır">Sıfır / Kapalı Kutu</option>
                <option value="az_kullanılmış">Sıfır Ayarında / Az Kullanılmış</option>
                <option value="iyi">İyi Durumda</option>
                <option value="makul">Makul / Çalışır Durumda</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Ürün Detayı / Özellikleri
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Aksesuarlar, kutu garantisi, çizik durumu..."
              className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleRunValuation}
            disabled={loading || !title.trim()}
            className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Gemini AI Piyasa Analizi Yapılıyor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Gemini AI ile Piyasa Değerini Hesapla</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && <p className="text-xs text-amber-500 font-medium mt-2">{errorMsg}</p>}

        {/* Valuation Result Cards */}
        {valuationData && (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-amber-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  AI TAHMİNİ PİYASA ORTALAMASI
                </span>
                <div className="text-3xl font-black text-amber-300">
                  ₺{valuationData.estimatedAvgTRY?.toLocaleString('tr-TR')}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Güven Aralığı (Min - Max)</span>
                <span className="text-xs font-bold text-slate-200">
                  ₺{valuationData.estimatedMinTRY?.toLocaleString('tr-TR')} - ₺
                  {valuationData.estimatedMaxTRY?.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-400 text-[10px] block">Piyasa Talebi</span>
                <span className="font-extrabold text-emerald-400">
                  🔥 {valuationData.marketDemand}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-400 text-[10px] block">Kondisyon Skoru</span>
                <span className="font-extrabold text-amber-300">
                  ✨ {valuationData.conditionRating}
                </span>
              </div>
            </div>

            {/* AI Rationale */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">🤖 AI Analiz Yorumu:</span>
              {valuationData.aiRationale}
            </div>

            {/* Recommended Swap Items */}
            {valuationData.recommendedSwapTypes && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  💡 Bu Ürün İçin İdeal Takas Eşleştirmeleri:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {valuationData.recommendedSwapTypes.map((rec: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800"
                    >
                      ✓ {rec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {onApplyValuation && (
              <button
                onClick={() => {
                  onApplyValuation(valuationData.estimatedAvgTRY);
                  onClose();
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Bu Değeri İlan Formuna Aktar (₺{valuationData.estimatedAvgTRY})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
