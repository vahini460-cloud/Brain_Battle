import React, { useRef, useEffect, useState } from 'react';
import { Send, Sparkles, Lightbulb, SkipForward, HelpCircle, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types/game';
import { MemoryCardView } from './MemoryCardView';

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onRequestHint: () => void;
  onSkipQuestion: () => void;
  onOpenRules: () => void;
  onOpenZones: () => void;
  hasActiveQuestion: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  onSendMessage,
  onRequestHint,
  onSkipQuestion,
  onOpenRules,
  onOpenZones,
  hasActiveQuestion,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleActionClick = (actionText: string) => {
    onSendMessage(actionText);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-125px)] max-w-4xl mx-auto w-full px-3 sm:px-4 py-3">
      {/* Scrollable Message Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scroll-smooth">
        {messages.map(msg => {
          const isCortex = msg.sender === 'cortex';
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 items-start transition-opacity duration-200 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar Icon */}
              {isCortex ? (
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 bg-slate-900 mt-1">
                  <img
                    src="/src/assets/images/cortex_brain_mascot_1793772702776.jpg"
                    alt="Cortex Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full shrink-0 bg-gradient-to-tr from-cyan-600 to-blue-600 border border-cyan-400/40 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm mt-1">
                  YOU
                </div>
              )}

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-cyan-600/90 text-white shadow-md'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
                }`}
              >
                {/* Header label for Cortex */}
                {isCortex && (
                  <div className="flex items-center justify-between gap-2 mb-1 pb-1 border-b border-slate-800/80 text-[11px] text-slate-400">
                    <span className="font-semibold text-cyan-400 flex items-center gap-1 font-display">
                      <Sparkles className="w-3 h-3" />
                      CORTEX · Master Bot
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Main Text Content */}
                <div className="whitespace-pre-line text-slate-100">
                  {msg.text}
                </div>

                {/* Memory Challenge Card (if attached) */}
                {msg.questionData?.memoryItems && (
                  <MemoryCardView
                    items={msg.questionData.memoryItems}
                    duration={msg.questionData.memoryDisplayDuration || 5}
                  />
                )}

                {/* Feedback Banner (Correct / Incorrect / Timeout) */}
                {msg.feedbackType && (
                  <div
                    className={`mt-2.5 p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                      msg.feedbackType === 'correct'
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : msg.feedbackType === 'timeout'
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    {msg.feedbackType === 'correct' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : msg.feedbackType === 'timeout' ? (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}

                    <div className="flex-1">
                      {msg.feedbackType === 'correct' && (
                        <span className="font-semibold">
                          Spot on! +{msg.earnedPoints || 10} points awarded!
                        </span>
                      )}
                      {msg.feedbackType === 'timeout' && (
                        <span className="font-semibold">Time expired! Challenge completed.</span>
                      )}
                      {msg.feedbackType === 'incorrect' && (
                        <span className="font-semibold">Not quite right this time!</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Multiple Choice Options (if present) */}
                {msg.questionData?.options && (
                  <div className="mt-3 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-medium text-slate-400 mb-1.5 block">
                      Quick Select Answer:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {msg.questionData.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(opt)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-cyan-500/50 text-left text-xs font-medium text-slate-200 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <span className="w-4 h-4 rounded-full bg-slate-700 text-[10px] font-mono flex items-center justify-center text-slate-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="truncate">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Action Chips attached to message */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                    {msg.quickActions.map((qa, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(qa.action)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                          qa.variant === 'primary'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                            : qa.variant === 'warning'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                            : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-slate-400 pl-1">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-cyan-500/30 bg-slate-900">
              <img
                src="/src/assets/images/cortex_brain_mascot_1793772702776.jpg"
                alt="Cortex Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-1 text-[11px] text-slate-400 font-medium">Cortex is processing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Assist Bar */}
      <div className="flex items-center gap-1.5 my-2 overflow-x-auto pb-1 text-xs">
        {hasActiveQuestion && (
          <>
            <button
              onClick={onRequestHint}
              className="px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>💡 Request Hint</span>
            </button>
            <button
              onClick={onSkipQuestion}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5 text-slate-400" />
              <span>⏭️ Skip Question</span>
            </button>
          </>
        )}
        <button
          onClick={onOpenZones}
          className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-all shrink-0 cursor-pointer"
        >
          🔀 Change Zone
        </button>
        <button
          onClick={onOpenRules}
          className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Rules</span>
        </button>
      </div>

      {/* Input Field Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={
              hasActiveQuestion
                ? "Type your answer, or 'hint', 'skip', 'menu'..."
                : "Type a command like 'riddle', 'math', 'menu', 'help'..."
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:hover:from-cyan-600 disabled:hover:to-blue-600 text-white rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
