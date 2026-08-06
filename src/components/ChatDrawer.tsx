import React, { useState } from 'react';
import {
  X,
  Send,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { Conversation, ChatMessage, TradeOffer, Language, UserProfile } from '../types';
import { translations } from '../utils/translations';

interface ChatDrawerProps {
  isOpen: boolean;
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  currentUser: UserProfile;
  lang: Language;
  activeConvId: string | null;
  onSelectConv: (id: string) => void;
  onClose: () => void;
  onSendMessage: (convId: string, text: string) => void;
  onAcceptTradeOffer: (offerId: string) => void;
  onRejectTradeOffer: (offerId: string) => void;
  onConfirmEscrowExchange: (offerId: string) => void;
  onOpenEscrowGuide: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  conversations,
  messages,
  currentUser,
  lang,
  activeConvId,
  onSelectConv,
  onClose,
  onSendMessage,
  onAcceptTradeOffer,
  onRejectTradeOffer,
  onConfirmEscrowExchange,
  onOpenEscrowGuide,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const currentConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeMessages = currentConv ? messages[currentConv.id] || [] : [];

  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !currentConv) return;
    onSendMessage(currentConv.id, inputMsg.trim());
    setInputMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-md animate-fade-in pt-[max(2.75rem,env(safe-area-inset-top))] sm:pt-0">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col sm:flex-row text-slate-900 dark:text-slate-100 overflow-hidden">
        {/* Close Mobile Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 shadow-md"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        {/* Conversations List Left */}
        <div className="w-full sm:w-64 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 flex flex-col h-1/3 sm:h-full bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-sm">{t.messages}</h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-200/50 dark:divide-slate-800/50">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onSelectConv(conv.id)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                  currentConv?.id === conv.id
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <img
                  src={conv.participant.avatar}
                  alt={conv.participant.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs truncate">{conv.participant.name}</span>
                    <span className="text-[10px] text-slate-400">{conv.lastTimestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message View Right */}
        {currentConv ? (
          <div className="flex-1 flex flex-col h-2/3 sm:h-full bg-white dark:bg-slate-900">
            {/* Header */}
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-3">
                <img
                  src={currentConv.participant.avatar}
                  alt={currentConv.participant.name}
                  className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                />
                <div>
                  <div className="font-bold text-xs">{currentConv.participant.name}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>%{currentConv.participant.trustScore} Güvenilirlik Skoru</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenEscrowGuide}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                <span>Çift Onay Rehberi</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Embedded Trade Offer Card inside Chat */}
                      {msg.tradeOffer && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white border border-emerald-500/40 space-y-3">
                          <div className="flex items-center justify-between text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                            <span className="flex items-center gap-1">
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                              {t.tradeOfferCardTitle}
                            </span>
                            <span>{msg.tradeOffer.status.toUpperCase()}</span>
                          </div>

                          <div className="text-xs font-bold text-slate-100">
                            Takas Edilecek: {msg.tradeOffer.targetItemTitle}
                          </div>

                          {/* AI Rationale */}
                          {msg.tradeOffer.aiAdvice && (
                            <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[11px] text-emerald-300">
                              <span className="font-bold block">🤖 AI Tavsiyesi:</span>
                              {msg.tradeOffer.aiAdvice.analysisTR}
                            </div>
                          )}

                          {/* Offer Action Buttons */}
                          {msg.tradeOffer.status === 'pending' && (
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => onAcceptTradeOffer(msg.tradeOffer!.id)}
                                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all"
                              >
                                {t.acceptOffer}
                              </button>
                              <button
                                onClick={() => onRejectTradeOffer(msg.tradeOffer!.id)}
                                className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-lg text-xs transition-all"
                              >
                                {t.rejectOffer}
                              </button>
                            </div>
                          )}

                          {/* Escrow Exchange Status */}
                          {msg.tradeOffer.status === 'accepted' && (
                            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 space-y-2 text-[11px]">
                              <div className="font-bold text-emerald-400 flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" />
                                <span>Emanet & Çift Onay Süreci</span>
                              </div>
                              <p className="text-slate-300 text-[10px]">
                                Fiziksel takas ve varsa üste parayı teslim aldığınızda onaylayın.
                              </p>
                              <button
                                onClick={() => onConfirmEscrowExchange(msg.tradeOffer!.id)}
                                className="w-full py-1.5 bg-emerald-600 text-white font-extrabold rounded-lg text-[11px] hover:bg-emerald-500 transition-all"
                              >
                                {t.confirmExchangeCompleted}
                              </button>
                            </div>
                          )}

                          {msg.tradeOffer.status === 'completed' && (
                            <div className="text-center font-extrabold text-emerald-400 text-xs py-1">
                              {t.exchangeConfirmed}
                            </div>
                          )}
                        </div>
                      )}

                      <span className="text-[9px] opacity-70 block text-right mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-900"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
