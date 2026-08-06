import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, X, UserCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface IdVerificationModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onVerificationSuccess: (tcNo: string) => void;
}

export const IdVerificationModal: React.FC<IdVerificationModalProps> = ({
  isOpen,
  lang,
  onClose,
  onVerificationSuccess,
}) => {
  const [tcNo, setTcNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tcNo.length !== 11 || !/^\d+$/.test(tcNo)) {
      setError('Lütfen 11 haneli geçerli T.C. Kimlik numaranızı girin.');
      return;
    }
    if (!fullName.trim() || fullName.trim().split(' ').length < 2) {
      setError('Lütfen ad ve soyadınızı eksiksiz girin.');
      return;
    }
    if (!birthYear || parseInt(birthYear) < 1920 || parseInt(birthYear) > 2010) {
      setError('Lütfen geçerli bir doğum yılı girin.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onVerificationSuccess(tcNo);
        onClose();
        setIsSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-[#0] z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-100 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-1.5">
              T.C. Kimlik Doğrulaması
            </h2>
            <p className="text-xs text-slate-400">Güvenli Takas Topluluğu Standardı</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl animate-fade-in">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-emerald-200">Kimliğiniz Başarıyla Doğrulandı!</h3>
            <p className="text-xs text-slate-300 px-4">
              Profilinize <strong className="text-emerald-400">✓ T.C. Onaylı Takasçı</strong> rozeti eklendi. Artık güvenle teklif verip takas başlatabilirsiniz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Lock className="w-3.5 h-3.5" />
                <span>Neden Kimlik Doğrulaması Yapıyoruz?</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Swapify’da sahte ilan ve dolandırıcılığı %0'a indirmek için tüm kullanıcılarımızın T.C. Kimlik bilgilerini doğruluyoruz. Bilgileriniz KVKK gereği %100 şifrelenir ve 3. kişilerle asla paylaşılmaz.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">T.C. Kimlik No (11 Haneli)</label>
                <input
                  type="text"
                  maxLength={11}
                  value={tcNo}
                  onChange={(e) => setTcNo(e.target.value.replace(/\D/g, ''))}
                  placeholder="11 haneli T.C. Kimlik No"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Ad Soyad (Kimlikteki Gibi)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Örn: Osman Tatlı"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Doğum Yılı</label>
                  <input
                    type="number"
                    maxLength={4}
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    placeholder="Örn: 1995"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Telefon No (SMS İçin)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05xx xxx xx xx"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>T.C. Nüfus Müd. Doğrulanıyor...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Kimliğimi Doğrula & Takasa Başla</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
