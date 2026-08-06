import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Filter,
  SlidersHorizontal,
  ArrowLeftRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  PlusCircle,
  BarChart3,
  Globe,
  Sun,
  Moon,
  Crown,
  Lock,
} from 'lucide-react';
import {
  Item,
  ItemCategory,
  ItemCondition,
  Language,
  Theme,
  UserProfile,
  Conversation,
  ChatMessage,
  AppNotification,
  TradeOffer,
} from './types';
import { translations, getCategoryLabel, getConditionLabel } from './utils/translations';
import {
  CURRENT_USER,
  INITIAL_ITEMS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AddListingModal } from './components/AddListingModal';
import { AiValuationModal } from './components/AiValuationModal';
import { AiTopUpAdvisorModal } from './components/AiTopUpAdvisorModal';
import { MakeOfferModal } from './components/MakeOfferModal';
import { ChatDrawer } from './components/ChatDrawer';
import { PaywallModal } from './components/PaywallModal';
import { BannerAds } from './components/BannerAds';
import { StoreAnalyticsView } from './components/StoreAnalyticsView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { UserProfileView } from './components/UserProfileView';
import { AuthModal } from './components/AuthModal';
import { EscrowGuideModal } from './components/EscrowGuideModal';
import { NotificationsModal } from './components/NotificationsModal';
import { IdVerificationModal } from './components/IdVerificationModal';

export default function App() {
  // Theme & Language State
  const [lang, setLang] = useState<Language>('tr');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(lang === 'tr' ? 'en' : 'tr');

  // Core Data States
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // View Navigation
  const [currentView, setCurrentView] = useState<'home' | 'messages' | 'profile' | 'store' | 'admin'>('home');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<ItemCondition | 'all'>('all');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(20);
  const [aiApprovedOnly, setAiApprovedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'closest' | 'valueAsc' | 'valueDesc'>('newest');

  // Modals
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<Item | null>(null);
  const [selectedItemForOffer, setSelectedItemForOffer] = useState<Item | null>(null);
  const [activeConvId, setActiveConvId] = useState<string | null>('conv_1');

  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isAiValuatorOpen, setIsAiValuatorOpen] = useState(false);
  const [aiValuationInitialTitle, setAiValuationInitialTitle] = useState('');
  const [aiValuationInitialDesc, setAiValuationInitialDesc] = useState('');

  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEscrowGuideOpen, setIsEscrowGuideOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isIdVerificationOpen, setIsIdVerificationOpen] = useState(false);

  // User Items list
  const userItems = items.filter((i) => i.ownerId === user.id);

  // Filter & Sort Logic
  const filteredItems = items
    .filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) return false;
      if (item.location.distanceKm > maxDistanceKm) return false;
      if (aiApprovedOnly && !item.isAiValuated) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'closest') return a.location.distanceKm - b.location.distanceKm;
      if (sortBy === 'valueAsc') return a.estimatedValue - b.estimatedValue;
      if (sortBy === 'valueDesc') return b.estimatedValue - a.estimatedValue;
      return b.id.localeCompare(a.id); // newest
    });

  // Handlers
  const handleAddNewListing = (newItem: Item) => {
    setItems([newItem, ...items]);
    setUser((prev) => ({
      ...prev,
      listingQuotaUsed: prev.listingQuotaUsed + 1,
    }));
    // Add success notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      type: 'system',
      title: 'İlanınız Yayında! 🎉',
      message: `"${newItem.title}" ilanınız başarıyla yüklendi.`,
      date: 'Az önce',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleWatchAdReward = () => {
    setUser((prev) => ({
      ...prev,
      listingQuotaMax: prev.listingQuotaMax + 1,
    }));
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      type: 'reward',
      title: '+1 Ücretsiz İlan Hakkı Kazanıldı!',
      message: 'Sponsorlu reklam izleme görevi tamamlandı. Kalan hakkınız arttırıldı.',
      date: 'Az önce',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleUpgradeSuccess = () => {
    setUser((prev) => ({
      ...prev,
      isPremium: true,
      listingQuotaMax: 999,
      badges: [...prev.badges, 'TakasPass PRO Üye'],
    }));
  };

  const handleOpenAiValuatorWithTitle = (title: string, desc: string) => {
    setAiValuationInitialTitle(title);
    setAiValuationInitialDesc(desc);
    setIsAiValuatorOpen(true);
  };

  const handleSubmitOffer = (
    targetItem: Item,
    offeredItemIds: string[],
    cashAmount: number,
    direction: 'proposer_pays' | 'target_owner_pays' | 'none'
  ) => {
    const offeredObjects = items.filter((i) => offeredItemIds.includes(i.id));

    // Find existing conversation or create new
    let conv = conversations.find((c) => c.participant.id === targetItem.ownerId);
    let convId = conv ? conv.id : `conv_${Date.now()}`;

    if (!conv) {
      conv = {
        id: convId,
        participant: {
          id: targetItem.ownerId,
          name: targetItem.ownerName,
          avatar: targetItem.ownerAvatar,
          trustScore: targetItem.ownerTrustScore,
        },
        lastMessage: 'Yeni Takas Teklifi Gönderildi',
        lastTimestamp: 'Az önce',
        unreadCount: 0,
        itemId: targetItem.id,
        itemTitle: targetItem.title,
        itemImage: targetItem.images[0],
      };
      setConversations([conv, ...conversations]);
    }

    const offerId = `offer_${Date.now()}`;
    const newTradeOffer: TradeOffer = {
      id: offerId,
      targetItemId: targetItem.id,
      targetItemTitle: targetItem.title,
      targetItemImage: targetItem.images[0],
      targetItemOwnerId: targetItem.ownerId,
      proposerId: user.id,
      proposerName: user.name,
      proposerAvatar: user.avatar,
      offeredItemIds,
      offeredItems: offeredObjects,
      cashTopUpAmount: cashAmount,
      cashPayerDirection: direction,
      status: 'pending',
      escrowConfirmedByProposer: false,
      escrowConfirmedByTargetOwner: false,
      aiAdvice: {
        fairnessScore: 94,
        recommendedCashTRY: cashAmount,
        analysisTR: 'Değer matrisleri kıyaslanmıştır. Teklif edilen dengeler adil bulunmuştur.',
      },
      createdAt: 'Az önce',
    };

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: convId,
      senderId: user.id,
      text: `Merhaba ${targetItem.ownerName}, "${targetItem.title}" ilanınız için bir takas teklifinde bulundum!`,
      tradeOffer: newTradeOffer,
      timestamp: 'Az önce',
      read: true,
    };

    const existingMsgs = messages[convId] || [];
    setMessages({
      ...messages,
      [convId]: [...existingMsgs, newMsg],
    });

    setActiveConvId(convId);
    setIsChatDrawerOpen(true);
  };

  const handleSendMessage = (convId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: convId,
      senderId: user.id,
      text,
      timestamp: 'Az önce',
      read: true,
    };
    setMessages({
      ...messages,
      [convId]: [...(messages[convId] || []), newMsg],
    });
  };

  const handleAcceptTradeOffer = (offerId: string) => {
    if (!activeConvId) return;
    const currentMsgs = messages[activeConvId] || [];
    const updatedMsgs = currentMsgs.map((m) => {
      if (m.tradeOffer && m.tradeOffer.id === offerId) {
        return {
          ...m,
          tradeOffer: {
            ...m.tradeOffer,
            status: 'accepted' as const,
          },
        };
      }
      return m;
    });
    setMessages({ ...messages, [activeConvId]: updatedMsgs });
  };

  const handleRejectTradeOffer = (offerId: string) => {
    if (!activeConvId) return;
    const currentMsgs = messages[activeConvId] || [];
    const updatedMsgs = currentMsgs.map((m) => {
      if (m.tradeOffer && m.tradeOffer.id === offerId) {
        return {
          ...m,
          tradeOffer: {
            ...m.tradeOffer,
            status: 'rejected' as const,
          },
        };
      }
      return m;
    });
    setMessages({ ...messages, [activeConvId]: updatedMsgs });
  };

  const handleConfirmEscrowExchange = (offerId: string) => {
    if (!activeConvId) return;
    const currentMsgs = messages[activeConvId] || [];
    const updatedMsgs = currentMsgs.map((m) => {
      if (m.tradeOffer && m.tradeOffer.id === offerId) {
        return {
          ...m,
          tradeOffer: {
            ...m.tradeOffer,
            status: 'completed' as const,
          },
        };
      }
      return m;
    });
    setMessages({ ...messages, [activeConvId]: updatedMsgs });
    setUser((prev) => ({
      ...prev,
      totalTrades: prev.totalTrades + 1,
      trustScore: Math.min(100, prev.trustScore + 1),
    }));
  };

  const handleToggleItemStatus = (itemId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, status: i.status === 'active' ? ('reserved' as const) : ('active' as const) }
          : i
      )
    );
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans transition-colors duration-200 pb-20 md:pb-8 selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        user={user}
        theme={theme}
        lang={lang}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
        onOpenAddListing={() => setIsAddListingOpen(true)}
        onOpenAiValuator={() => {
          setAiValuationInitialTitle('');
          setAiValuationInitialDesc('');
          setIsAiValuatorOpen(true);
        }}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onNavigateView={(v) => {
          if (v === 'messages') setIsChatDrawerOpen(true);
          else setCurrentView(v);
        }}
        currentView={currentView}
        notifications={notifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Main Body Router */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'home' && (
          <div className="space-y-6">
            {/* Category Chips Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-indigo-500/40'
                }`}
              >
                {t.allCategories}
              </button>

              {(
                [
                  'elektronik',
                  'oyun',
                  'moda',
                  'ev_yasam',
                  'spor',
                  'vasita',
                  'hobi',
                  'kitap_muzik',
                  'anne_bebek',
                ] as ItemCategory[]
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-indigo-500/40'
                  }`}
                >
                  {getCategoryLabel(cat, lang)}
                </button>
              ))}
            </div>

            {/* Filter & Sorting Controls */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                {/* Distance Filter */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-slate-300">{t.filterByDistance}:</span>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={maxDistanceKm}
                    onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                    className="w-24 accent-indigo-500 cursor-pointer"
                  />
                  <span className="font-bold text-indigo-400">
                    {maxDistanceKm} km
                  </span>
                </div>

                {/* Condition Filter */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-400">{t.filterByCondition}:</span>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value as any)}
                    className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 font-bold focus:outline-none text-slate-200"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="sıfır">Sıfır</option>
                    <option value="az_kullanılmış">Az Kullanılmış</option>
                    <option value="iyi">İyi Durumda</option>
                  </select>
                </div>

                {/* AI Approved Toggle */}
                <label className="flex items-center gap-1.5 font-bold cursor-pointer text-amber-400">
                  <input
                    type="checkbox"
                    checked={aiApprovedOnly}
                    onChange={(e) => setAiApprovedOnly(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sadece AI Değerli</span>
                </label>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-400">{t.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 font-bold focus:outline-none text-slate-200"
                >
                  <option value="newest">{t.newest}</option>
                  <option value="closest">{t.closest}</option>
                  <option value="valueAsc">{t.valueAsc}</option>
                  <option value="valueDesc">{t.valueDesc}</option>
                </select>
              </div>
            </div>

            {/* Sponsored Native Banner Ad */}
            <BannerAds lang={lang} onWatchAdForReward={() => setIsPaywallOpen(true)} />

            {/* Items Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black tracking-tight text-slate-100">
                  {selectedCategory === 'all'
                    ? 'Yakınınızdaki Tüm Takas İlanları'
                    : getCategoryLabel(selectedCategory, lang)}
                  <span className="ml-2 text-xs font-bold text-indigo-400">
                    ({filteredItems.length} İlan)
                  </span>
                </h2>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-slate-900 rounded-3xl border border-slate-800">
                  <Search className="w-10 h-10 text-slate-500 mx-auto" />
                  <h3 className="font-bold text-base text-slate-200">Aradığınız Kriterlerde İlan Bulunamadı</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Arama filtresini temizleyerek veya daha geniş bir lokasyon mesafe ayarı seçerek tekrar deneyin.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setMaxDistanceKm(50);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-500/20"
                  >
                    Filtreleri Sıfırla
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      lang={lang}
                      onSelectItem={(i) => setSelectedItemForDetail(i)}
                      onMakeOffer={(i) => setSelectedItemForOffer(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          <UserProfileView
            user={user}
            userItems={userItems}
            lang={lang}
            onOpenAddListing={() => setIsAddListingOpen(true)}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onSelectItem={(i) => setSelectedItemForDetail(i)}
            onMakeOffer={(i) => setSelectedItemForOffer(i)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onNavigateStore={() => setCurrentView('store')}
            onOpenIdVerification={() => setIsIdVerificationOpen(true)}
          />
        )}

        {currentView === 'store' && <StoreAnalyticsView user={user} lang={lang} />}

        {currentView === 'admin' && (
          <AdminDashboardView
            currentUser={user}
            allItems={items}
            lang={lang}
            onToggleItemStatus={handleToggleItemStatus}
          />
        )}
      </main>

      {/* Admin Panel Quick Floating Button (Bottom Left) */}
      <div className="fixed bottom-16 md:bottom-4 left-4 z-30">
        <button
          onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
          className="px-3 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-xl flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-indigo-200" />
          <span className="hidden sm:inline">
            {currentView === 'admin' ? 'Kullanıcı Görünümü' : 'Admin Paneli'}
          </span>
        </button>
      </div>

      {/* Mobile Sticky Navigation */}
      <MobileNav
        currentView={currentView}
        onNavigateView={(v) => {
          if (v === 'messages') setIsChatDrawerOpen(true);
          else setCurrentView(v);
        }}
        onOpenAddListing={() => setIsAddListingOpen(true)}
        unreadMessagesCount={1}
        lang={lang}
      />

      {/* All Application Modals */}
      <ItemDetailModal
        item={selectedItemForDetail}
        currentUser={user}
        lang={lang}
        onClose={() => setSelectedItemForDetail(null)}
        onMakeOffer={(item) => setSelectedItemForOffer(item)}
        onStartChat={(item) => {
          const conv = conversations.find((c) => c.participant.id === item.ownerId);
          if (conv) setActiveConvId(conv.id);
          setIsChatDrawerOpen(true);
        }}
        onOpenAiValuatorWithTitle={handleOpenAiValuatorWithTitle}
      />

      <AddListingModal
        isOpen={isAddListingOpen}
        currentUser={user}
        lang={lang}
        onClose={() => setIsAddListingOpen(false)}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onAddListingSuccess={handleAddNewListing}
      />

      <AiValuationModal
        isOpen={isAiValuatorOpen}
        initialTitle={aiValuationInitialTitle}
        initialDesc={aiValuationInitialDesc}
        lang={lang}
        onClose={() => setIsAiValuatorOpen(false)}
      />

      <AiTopUpAdvisorModal
        isOpen={isAiAdvisorOpen}
        myItems={userItems}
        targetItem={selectedItemForOffer}
        lang={lang}
        onClose={() => setIsAiAdvisorOpen(false)}
      />

      <MakeOfferModal
        isOpen={!!selectedItemForOffer}
        targetItem={selectedItemForOffer}
        myItems={userItems}
        lang={lang}
        onClose={() => setSelectedItemForOffer(null)}
        onSubmitOffer={handleSubmitOffer}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      <ChatDrawer
        isOpen={isChatDrawerOpen}
        conversations={conversations}
        messages={messages}
        currentUser={user}
        lang={lang}
        activeConvId={activeConvId}
        onSelectConv={(id) => setActiveConvId(id)}
        onClose={() => setIsChatDrawerOpen(false)}
        onSendMessage={handleSendMessage}
        onAcceptTradeOffer={handleAcceptTradeOffer}
        onRejectTradeOffer={handleRejectTradeOffer}
        onConfirmEscrowExchange={handleConfirmEscrowExchange}
        onOpenEscrowGuide={() => setIsEscrowGuideOpen(true)}
      />

      <PaywallModal
        isOpen={isPaywallOpen}
        currentUser={user}
        lang={lang}
        onClose={() => setIsPaywallOpen(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
        onWatchAdReward={handleWatchAdReward}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        lang={lang}
        onClose={() => setIsAuthModalOpen(false)}
        onGoogleLoginSuccess={(name, email) => {
          setUser((prev) => ({ ...prev, name, email }));
        }}
      />

      <EscrowGuideModal
        isOpen={isEscrowGuideOpen}
        lang={lang}
        onClose={() => setIsEscrowGuideOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        notifications={notifications}
        lang={lang}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={() => {
          setNotifications(notifications.map((n) => ({ ...n, read: true })));
        }}
        onActionClick={(link) => {
          if (link === 'paywall') setIsPaywallOpen(true);
          if (link?.startsWith('chat')) setIsChatDrawerOpen(true);
        }}
      />

      <IdVerificationModal
        isOpen={isIdVerificationOpen}
        lang={lang}
        onClose={() => setIsIdVerificationOpen(false)}
        onVerificationSuccess={(tcNo) => {
          setUser((prev) => ({
            ...prev,
            isIdVerified: true,
            tcNo,
            badges: prev.badges.includes('T.C. Kimlik Onaylı')
              ? prev.badges
              : ['T.C. Kimlik Onaylı', ...prev.badges],
          }));
        }}
      />
    </div>
  );
}
