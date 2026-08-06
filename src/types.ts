export type Language = 'tr' | 'en';
export type Theme = 'light' | 'dark';

export type ItemCategory =
  | 'elektronik'
  | 'moda'
  | 'ev_yasam'
  | 'vasita'
  | 'hobi'
  | 'kitap_muzik'
  | 'spor'
  | 'anne_bebek'
  | 'oyun';

export type ItemCondition = 'sıfır' | 'az_kullanılmış' | 'iyi' | 'makul';

export interface UserReview {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  tradedItemTitle: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string; // e.g. "Kadıköy, İstanbul"
  trustScore: number; // e.g. 98%
  starRating: number; // e.g. 4.9
  totalTrades: number; // e.g. 24
  responseTime: string; // e.g. "< 15 dk"
  isStore: boolean;
  storeName?: string;
  isPremium: boolean;
  listingQuotaUsed: number;
  listingQuotaMax: number;
  isIdVerified?: boolean;
  tcNo?: string;
  badges: string[]; // e.g. ["Onaylı Takasçı", "Hızlı Cevap", "Rozetli Satıcı"]
  reviews: UserReview[];
  memberSince: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  condition: ItemCondition;
  estimatedValue: number; // TRY
  targetSwapDescription: string; // What the owner wants in exchange
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerTrustScore: number;
  ownerRating: number;
  location: {
    district: string;
    city: string;
    distanceKm: number; // Distance from current user
  };
  createdAt: string;
  views: number;
  isBoosted?: boolean;
  isAiValuated?: boolean;
  status: 'active' | 'traded' | 'reserved';
}

export interface TradeOffer {
  id: string;
  targetItemId: string;
  targetItemTitle: string;
  targetItemImage: string;
  targetItemOwnerId: string;
  proposerId: string;
  proposerName: string;
  proposerAvatar: string;
  offeredItemIds: string[];
  offeredItems: Item[];
  cashTopUpAmount: number; // positive = proposer pays cash topup; negative = target owner pays
  cashPayerDirection: 'proposer_pays' | 'target_owner_pays' | 'none';
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  escrowConfirmedByProposer: boolean;
  escrowConfirmedByTargetOwner: boolean;
  aiAdvice?: {
    fairnessScore: number;
    recommendedCashTRY: number;
    analysisTR: string;
  };
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  tradeOffer?: TradeOffer;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    trustScore: number;
  };
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  itemId?: string;
  itemTitle?: string;
  itemImage?: string;
}

export interface AppNotification {
  id: string;
  type: 'offer' | 'chat' | 'quota' | 'system' | 'reward' | 'admin';
  title: string;
  message: string;
  date: string;
  read: boolean;
  linkAction?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthlyTRY: number;
  unlimitedListings: boolean;
  aiValuationUnlimited: boolean;
  storeAnalyticsAccess: boolean;
  boostCreditsPerMonth: number;
  badgeName: string;
}
