import React, { useState } from 'react';
import {
  Shield,
  Users,
  Package,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Search,
  Activity,
  Lock,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { Language, UserProfile, Item } from '../types';
import { translations } from '../utils/translations';

interface AdminDashboardViewProps {
  currentUser: UserProfile;
  allItems: Item[];
  lang: Language;
  onToggleItemStatus: (itemId: string) => void;
}

const MOCK_ACTIVITY_LOGS = [
  { id: 'log_1', time: '14:22', text: 'Osman Tatlı, Sony PS5 için takas teklifi oluşturdu.', type: 'trade' },
  { id: 'log_2', time: '13:50', text: 'Zeynep Yılmaz, Fujifilm kamera ilanına AI değerleme başlattı.', type: 'ai' },
  { id: 'log_3', time: '12:10', text: 'Yeni üye Google Auth ile giriş yaptı: deniz.altan@gmail.com', type: 'user' },
  { id: 'log_4', time: '10:45', text: 'Sponsorlu video reklam izlendi (+1 İlan Kotası tanımlandı).', type: 'monetization' },
  { id: 'log_5', time: '09:15', text: 'TakasPass PRO Aboneliği satın alındı: ₺79.99 (Osman Tech)', type: 'monetization' },
];

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  allItems,
  lang,
  onToggleItemStatus,
}) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'logs'>('overview');
  const [filterSearch, setFilterSearch] = useState('');

  const filteredItems = allItems.filter((i) =>
    i.title.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{t.adminDashboardTitle}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500 text-white uppercase">
                SİSTEM YÖNETİCİSİ
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Platform aktiviteleri, üye ilanları, reklam gelirleri ve AI servis durumu takibi.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Genel Özet
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            İlan Moderasyonu
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Aktivite Logları
          </button>
        </div>
      </div>

      {/* System Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.totalUsers}</span>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-black">12,480</div>
          <span className="text-[10px] text-emerald-500 font-bold">↑ %12.4 Bu Ay</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.activeListings}</span>
            <Package className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black">{allItems.length * 320} İlan</div>
          <span className="text-[10px] text-emerald-500 font-bold">Tüm Kategoriler Aktif</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.completedTradesCount}</span>
            <CheckCircle2 className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-black">4,812 Takas</div>
          <span className="text-[10px] text-emerald-500 font-bold">%98.2 Memnuniyet</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.revenueEst}</span>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-500">₺142,800</div>
          <span className="text-[10px] text-amber-500 font-bold">Sürdürülebilir Gelir</span>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Moderation Queue Preview */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>İlan Denetim & Güvenlik Moderasyonu</span>
            </h3>

            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {allItems.slice(0, 4).map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold block line-clamp-1">{item.title}</span>
                      <span className="text-slate-400">{item.ownerName} • ₺{item.estimatedValue}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleItemStatus(item.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                      item.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}
                  >
                    {item.status === 'active' ? '✓ Aktif & Onaylı' : '✕ Pasife Alındı'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              <span>Canlı Sistem Aktiviteleri</span>
            </h3>

            <div className="space-y-3">
              {MOCK_ACTIVITY_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs flex items-start gap-2.5"
                >
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500 text-white shrink-0">
                    {log.time}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'listings' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold">Tüm İlan Veritabanı & İnceleme</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="İlan ara..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Görsel & Başlık</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Piyasa Değeri</th>
                  <th className="p-3">Sahibi</th>
                  <th className="p-3">Durum</th>
                  <th className="p-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="p-3 flex items-center gap-3">
                      <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
                      <span className="font-bold line-clamp-1">{item.title}</span>
                    </td>
                    <td className="p-3 capitalize">{item.category}</td>
                    <td className="p-3 font-extrabold text-emerald-500">₺{item.estimatedValue}</td>
                    <td className="p-3">{item.ownerName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onToggleItemStatus(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-[10px]"
                      >
                        Durum Değiştir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 text-xs">
          <h3 className="font-extrabold text-base">Detaylı Sistem Güvenlik & İşlem Logları</h3>
          {MOCK_ACTIVITY_LOGS.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] flex items-center gap-3">
              <span className="text-emerald-400 font-bold">[{log.time}]</span>
              <span>{log.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
