import { ItemCategory, ItemCondition, Language } from '../types';

export const translations = {
  tr: {
    appName: 'SWAPiFY Takas',
    tagline: 'Güvenli, Ücretsiz ve AI Destekli Eşya Takas Platformu',
    
    // Nav & Common
    home: 'Anasayfa',
    explore: 'Keşfet',
    addListing: 'İlan Yükle',
    messages: 'Mesajlar',
    profile: 'Profilim',
    storeAnalytics: 'Mağaza Analizi',
    adminPanel: 'Yönetici Paneli',
    login: 'Google ile Giriş Yap',
    logout: 'Çıkış Yap',
    searchPlaceholder: 'Eşya, marka, model veya kategori ara...',
    allCategories: 'Tüm Kategoriler',
    filterByDistance: 'Mesafe Filtresi',
    filterByCondition: 'Kullanım Durumu',
    filterByValue: 'Piyasa Değeri',
    sortBy: 'Sıralama',
    newest: 'En Yeniler',
    closest: 'En Yakındakiler',
    valueAsc: 'Değer: Düşükten Yükseğe',
    valueDesc: 'Değer: Yüksekten Düşüğe',
    aiApprovedOnly: 'Sadece AI Onaylı İlanlar',
    kmAway: 'km uzakta',
    trustScore: 'Güven Puanı',
    estimatedValue: 'Piyasa Değeri',
    swapPreference: 'Takas Tercihi',
    details: 'Detayları Gör',
    proposeSwap: 'Takas Teklifi Yap',
    
    // Categories
    cat_elektronik: 'Elektronik & Teknoloji',
    cat_moda: 'Moda & Giyim',
    cat_ev_yasam: 'Ev, Yaşam & Dekor',
    cat_vasita: 'Vasıta & Oto Aksesuar',
    cat_hobi: 'Hobi & Koleksiyon',
    cat_kitap_muzik: 'Kitap, Müzik & Film',
    cat_spor: 'Spor & Outdoor',
    cat_anne_bebek: 'Anne, Bebek & Çocuk',
    cat_oyun: 'Oyun & Konsol',

    // Conditions
    cond_sıfır: 'Sıfır / Kapalı Kutu',
    cond_az_kullanılmış: 'Sıfır Ayarında / Az Kullanılmış',
    cond_iyi: 'İyi Durumda',
    cond_makul: 'Makul / Çalışır Durumda',

    // Quota & Subscriptions
    quotaTitle: 'Aylık İlan Kotası',
    quotaRemaining: 'İlan Hakkı Kaldı',
    quotaExceeded: 'Aylık Ücretsiz İlan Kotanız Doldu!',
    quotaExceededDesc: 'Ücretsiz üyelikte ayda en fazla 3 ilan yüklenebilir. Sınırsız yükleme için TakasPass Premium\'a geçin veya tek seferlik paket alın.',
    upgradePremium: 'TakasPass Premium\'a Yükselt',
    buyPackage: '1-Tek Seferlik İlan Hakkı Al (₺19.99)',
    watchAdForQuota: 'Sponsorlu Reklam İzle (+1 Hak Kazan)',
    premiumBadge: 'TakasPass PRO',
    storeBadge: 'Onaylı Mağaza',
    unlimitedListings: 'Sınırsız İlan Yükleme',
    aiValuationFree: 'Sınırsız AI Değerleme',
    noAds: 'Tamamen Reklamsız Deneyim',
    storeAnalyticsAccess: 'Gelişmiş Mağaza Analitik Paneli',

    // AI Tools
    aiValuationBtn: 'AI ile Değer Biç',
    aiValuationTitle: 'AI İkinci El Piyasa Değerlemesi',
    aiValuationDesc: 'Gemini AI motorumuz ilan başlığı ve ayrıntılarını analiz ederek güncel piyasa ortalamasını hesaplar.',
    aiTopUpAdvisor: 'AI Üste Para Hesaplayıcı',
    aiTopUpDesc: 'Eşit olmayan değerdeki takaslarda iki taraf için de adil üste para farkını AI hesaplar.',
    suggestedCashDiff: 'Önerilen Üste Para Farkı',
    fairTradeScore: 'Takas Adalet Skoru',

    // Chat & Trade Negotiation
    startChat: 'Satıcı ile Mesajlaş',
    tradeOfferCardTitle: 'Takas Teklifi Gönderildi',
    offeredItems: 'Teklif Edilen Eşyalar',
    cashTopUpAmount: 'Üste Eklenen Para',
    acceptOffer: 'Teklifi Kabul Et',
    rejectOffer: 'Teklifi Reddet',
    counterOffer: 'Karşı Teklif Yap',
    escrowApproval: 'Emanet & Çift Onaylı Güvenli Takas',
    confirmExchangeCompleted: 'Eşyaları & Parayı Teslim Aldım (Onayla)',
    exchangeConfirmed: 'İki Taraf da Onayladı! Takas Başarıyla Tamamlandı 🎉',

    // User Profile
    myListings: 'İlanlarım',
    completedTrades: 'Tamamlanan Takaslar',
    tradeReviews: 'Kullanıcı Yorumları & Puanları',
    userTrustScoreBreakdown: 'Güvenilirlik Metrikleri',
    verifiedEmail: 'E-posta Onaylı',
    verifiedPhone: 'Telefon Onaylı',
    quickResponder: 'Hızlı Yanıt Veren Satıcı',

    // Store & Admin
    storeAnalyticsTitle: 'Gelişmiş Mağaza Analiz Paneli',
    totalViews: 'Toplam İlan Görüntülenmesi',
    tradeInquiries: 'Gelen Takas Talepleri',
    conversionRate: 'Takas Dönüşüm Oranı',
    totalInventoryValue: 'Toplam Envanter Değeri',
    categoryDemandChart: 'Kategori Bazlı Talep Dağılımı',

    adminDashboardTitle: 'Platform Yönetici Paneli (Admin)',
    systemStats: 'Sistem Genel Özeti',
    totalUsers: 'Toplam Kayıtlı Kullanıcı',
    activeListings: 'Aktif Takas İlanları',
    completedTradesCount: 'Başarılı Takas Sayısı',
    revenueEst: 'Tahmini Aylık Gelir (Reklam + Sub)',
    flaggedReports: 'Şikayet Edilen İlanlar & Moderasyon',
    activityLogs: 'Son Sistem Aktiviteleri',

    // Ads
    sponsoredAd: 'Sponsorlu İlan',
    rewardedAdTitle: 'Kazanmak için Sponsorlu Videoyu İzle',
    watchingAd: 'Sponsorlu reklam izleniyor... (3 sn)',
    adRewardEarned: 'Tebrikler! +1 Ücretsiz İlan Hakkı Hesabınıza Tanımlandı 🎉',

    // Language & Theme
    themeDark: 'Karanlık Mod',
    themeLight: 'Aydınlık Mod',
    langTR: 'Türkçe',
    langEN: 'English',
  },
  en: {
    appName: 'SWAPiFY Trade',
    tagline: 'Secure, Free & AI-Powered Barter & Swap Marketplace',
    
    // Nav & Common
    home: 'Home',
    explore: 'Explore',
    addListing: 'Add Listing',
    messages: 'Messages',
    profile: 'My Profile',
    storeAnalytics: 'Store Analytics',
    adminPanel: 'Admin Panel',
    login: 'Sign in with Google',
    logout: 'Log Out',
    searchPlaceholder: 'Search item, brand, model or category...',
    allCategories: 'All Categories',
    filterByDistance: 'Distance Filter',
    filterByCondition: 'Item Condition',
    filterByValue: 'Market Value',
    sortBy: 'Sort By',
    newest: 'Newest',
    closest: 'Closest First',
    valueAsc: 'Value: Low to High',
    valueDesc: 'Value: High to Low',
    aiApprovedOnly: 'AI Approved Only',
    kmAway: 'km away',
    trustScore: 'Trust Score',
    estimatedValue: 'Market Value',
    swapPreference: 'Swap Preference',
    details: 'View Details',
    proposeSwap: 'Make Swap Offer',

    // Categories
    cat_elektronik: 'Electronics & Tech',
    cat_moda: 'Fashion & Apparel',
    cat_ev_yasam: 'Home, Living & Decor',
    cat_vasita: 'Vehicles & Auto Accessories',
    cat_hobi: 'Hobbies & Collectibles',
    cat_kitap_muzik: 'Books, Music & Movies',
    cat_spor: 'Sports & Outdoor',
    cat_anne_bebek: 'Baby & Kids',
    cat_oyun: 'Gaming & Consoles',

    // Conditions
    cond_sıfır: 'Brand New / Sealed',
    cond_az_kullanılmış: 'Like New / Barely Used',
    cond_iyi: 'Good Condition',
    cond_makul: 'Fair / Working Order',

    // Quota & Subscriptions
    quotaTitle: 'Monthly Listing Quota',
    quotaRemaining: 'Listings Remaining',
    quotaExceeded: 'Your Free Monthly Listing Quota is Reached!',
    quotaExceededDesc: 'Free members can post up to 3 listings per month. Upgrade to TakasPass Premium for unlimited listings or buy a single pack.',
    upgradePremium: 'Upgrade to TakasPass Premium',
    buyPackage: 'Buy 1-Time Listing Pack ($0.99)',
    watchAdForQuota: 'Watch Sponsored Ad (+1 Free Listing)',
    premiumBadge: 'TakasPass PRO',
    storeBadge: 'Verified Store',
    unlimitedListings: 'Unlimited Item Listings',
    aiValuationFree: 'Unlimited AI Item Valuations',
    noAds: '100% Ad-Free Experience',
    storeAnalyticsAccess: 'Advanced Merchant Analytics Panel',

    // AI Tools
    aiValuationBtn: 'Get AI Valuation',
    aiValuationTitle: 'AI Second-Hand Valuation',
    aiValuationDesc: 'Gemini AI evaluates title and description to calculate fair average second-hand market value.',
    aiTopUpAdvisor: 'AI Cash Top-Up Advisor',
    aiTopUpDesc: 'For unequal swaps, AI calculates the exact fair cash top-up difference for both parties.',
    suggestedCashDiff: 'Recommended Cash Top-Up',
    fairTradeScore: 'Trade Fairness Score',

    // Chat & Trade Negotiation
    startChat: 'Message Trader',
    tradeOfferCardTitle: 'Swap Proposal Received',
    offeredItems: 'Offered Items',
    cashTopUpAmount: 'Cash Top-Up',
    acceptOffer: 'Accept Proposal',
    rejectOffer: 'Decline Proposal',
    counterOffer: 'Make Counter Offer',
    escrowApproval: 'Safe Double-Approval Escrow Trade',
    confirmExchangeCompleted: 'I Received Items & Cash (Confirm)',
    exchangeConfirmed: 'Both Parties Confirmed! Trade Successfully Completed 🎉',

    // User Profile
    myListings: 'My Listings',
    completedTrades: 'Completed Trades',
    tradeReviews: 'User Ratings & Reviews',
    userTrustScoreBreakdown: 'Trustability Metrics',
    verifiedEmail: 'Email Verified',
    verifiedPhone: 'Phone Verified',
    quickResponder: 'Fast Responder Seller',

    // Store & Admin
    storeAnalyticsTitle: 'Advanced Store Analytics',
    totalViews: 'Total Listing Impressions',
    tradeInquiries: 'Trade Inquiries Received',
    conversionRate: 'Trade Deal Conversion',
    totalInventoryValue: 'Total Inventory Market Value',
    categoryDemandChart: 'Demand Distribution by Category',

    adminDashboardTitle: 'Platform Admin Control Panel',
    systemStats: 'System Overview',
    totalUsers: 'Total Registered Users',
    activeListings: 'Active Barter Listings',
    completedTradesCount: 'Successful Trades',
    revenueEst: 'Est. Monthly Revenue (Ads + Sub)',
    flaggedReports: 'Flagged Listings & Moderation',
    activityLogs: 'Recent System Activity',

    // Ads
    sponsoredAd: 'Sponsored Listing',
    rewardedAdTitle: 'Watch Sponsored Video to Earn Listing',
    watchingAd: 'Watching sponsored video... (3s)',
    adRewardEarned: 'Congratulations! +1 Free Listing added to your account 🎉',

    // Language & Theme
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    langTR: 'Türkçe',
    langEN: 'English',
  },
};

export function getCategoryLabel(category: ItemCategory, lang: Language): string {
  const key = `cat_${category}` as keyof typeof translations.tr;
  return translations[lang][key] || category;
}

export function getConditionLabel(condition: ItemCondition, lang: Language): string {
  const key = `cond_${condition}` as keyof typeof translations.tr;
  return translations[lang][key] || condition;
}
