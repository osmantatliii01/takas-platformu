import React, { useState } from 'react';
import { X, ShieldCheck, ArrowLeftRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AuthModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onGoogleLoginSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  lang,
  onClose,
  onGoogleLoginSuccess,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const [loading, setLoading] = useState(false);

  const handleSimulateGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGoogleLoginSuccess('Osman Tatlı', 'osman.tatli@gmail.com');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-auto text-slate-900 dark:text-slate-100 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Logo */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-lg mb-4">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
            <ArrowLeftRight className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <h2 className="text-2xl font-black mb-1">SWAPiFY'a Hoş Geldiniz</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Güvenli takas platformuna tek tıkla saniyeler içinde giriş yapın.
        </p>

        {/* Google Auth Button */}
        <button
          onClick={handleSimulateGoogle}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold rounded-2xl border border-slate-300 dark:border-slate-700 shadow-md flex items-center justify-center gap-3 transition-all cursor-pointer text-sm mb-4"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
          ) : (
            <>
              {/* Google G SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google Hesabı ile Otomatik Giriş Yap</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Şifre oluşturmaya gerek kalmadan hızlı onay</span>
        </div>
      </div>
    </div>
  );
};
