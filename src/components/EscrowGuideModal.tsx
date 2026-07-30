import React from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeftRight, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface EscrowGuideModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const EscrowGuideModal: React.FC<EscrowGuideModalProps> = ({ isOpen, lang, onClose }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-auto text-slate-900 dark:text-slate-100 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">Güvenli Çift Onaylı Takas Rehberi</h2>
            <p className="text-xs text-slate-500">Para ve Eşya Güvenliği Protokolü</p>
          </div>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Fiziksel İnceleme & Buluşma
              </span>
              Takas edeceğiniz eşyayı kalabalık ve güvenli ortak bir alanda (AVM, kafe, metro istasyonu) inceleyiniz.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Üste Para Transferi (Varsa)
              </span>
              AI tarafından önerilen üste para farkı iki taraf onayladığında dış güvenli ödeme/havale platformları veya Param Güvende/Emanet Havuzu üzerinden tamamlanır.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Uygulama İçi Çift Onay
              </span>
              Eşya ve para el değiştirdiğinde iki taraf da mesaj ekranındaki "Teslim Aldım" butonuna basarak işlemi resmileştirir ve güven puanı güncellenir.
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 text-white font-extrabold rounded-2xl text-xs transition-all cursor-pointer"
        >
          Anlaşıldı, Mesajlaşmaya Dön
        </button>
      </div>
    </div>
  );
};
