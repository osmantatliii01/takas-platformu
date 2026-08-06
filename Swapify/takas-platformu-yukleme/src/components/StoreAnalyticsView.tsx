import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { Store, Eye, ArrowLeftRight, TrendingUp, DollarSign, Award, ShieldCheck } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../utils/translations';

interface StoreAnalyticsViewProps {
  user: UserProfile;
  lang: Language;
}

const VIEWS_DATA = [
  { day: 'Pzt', views: 240, offers: 18 },
  { day: 'Sal', views: 320, offers: 24 },
  { day: 'Çar', views: 410, offers: 32 },
  { day: 'Per', views: 380, offers: 28 },
  { day: 'Cum', views: 560, offers: 45 },
  { day: 'Cmt', views: 720, offers: 64 },
  { day: 'Paz', views: 890, offers: 78 },
];

const CATEGORY_DEMAND = [
  { name: 'Elektronik', value: 45, color: '#10b981' },
  { name: 'Oyun & Konsol', value: 25, color: '#f59e0b' },
  { name: 'Moda', value: 15, color: '#06b6d4' },
  { name: 'Hobi & Spor', value: 15, color: '#8b5cf6' },
];

export const StoreAnalyticsView: React.FC<StoreAnalyticsViewProps> = ({ user, lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Store Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{user.storeName || user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-slate-950 uppercase">
                {t.storeBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Güvenlik Skoru: %{user.trustScore}</span>
              <span>•</span>
              <span>Toplam Takas: {user.totalTrades}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Envanter Değeri
            </span>
            <span className="text-lg font-black text-amber-300">₺84,500</span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Haftalık Görüntülenme
            </span>
            <span className="text-lg font-black text-emerald-400">3,520</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.totalViews}</span>
            <Eye className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black">3,520</div>
          <span className="text-[10px] text-emerald-500 font-bold">↑ %24 geçen haftaya göre</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.tradeInquiries}</span>
            <ArrowLeftRight className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black">261 Teklif</div>
          <span className="text-[10px] text-emerald-500 font-bold">↑ %18 artış</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">{t.conversionRate}</span>
            <TrendingUp className="w-5 h-5 text-teal-500" />
          </div>
          <div className="text-2xl font-black">%72.4</div>
          <span className="text-[10px] text-emerald-500 font-bold">Mükemmel Takas Oranı</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">AI Onaylı Portföy</span>
            <Award className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-black">7 / 7 İlan</div>
          <span className="text-[10px] text-indigo-500 font-bold">Tam AI Doğrulama</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Views & Offers Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span>İlan Görüntülenme & Takas Teklif Trendi</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VIEWS_DATA}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    borderColor: '#334155',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  name="Görüntülenme"
                />
                <Area
                  type="monotone"
                  dataKey="offers"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                  name="Takas Teklifi"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-500" />
            <span>Kategoriye Göre Talep</span>
          </h3>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DEMAND}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DEMAND.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {CATEGORY_DEMAND.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {item.name} (%{item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
