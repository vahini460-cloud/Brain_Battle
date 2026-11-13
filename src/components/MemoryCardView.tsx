import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Sparkles, Brain } from 'lucide-react';

interface MemoryCardViewProps {
  items: string[];
  duration: number; // in seconds
  onConcealComplete?: () => void;
  isRevealed?: boolean;
}

export const MemoryCardView: React.FC<MemoryCardViewProps> = ({
  items,
  duration,
  onConcealComplete,
  isRevealed = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isConcealed, setIsConcealed] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      setIsConcealed(false);
      return;
    }

    setTimeLeft(duration);
    setIsConcealed(false);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsConcealed(true);
          if (onConcealComplete) onConcealComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [items, duration, isRevealed, onConcealComplete]);

  return (
    <div className="my-3 p-3.5 rounded-xl bg-slate-900/90 border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/10">
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-fuchsia-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
            {isConcealed && !isRevealed ? 'Working Memory Test' : 'Memorize These Items'}
          </span>
        </div>

        {!isRevealed && (
          <div className="flex items-center gap-1.5 text-xs font-mono">
            {isConcealed ? (
              <span className="flex items-center gap-1 text-slate-400">
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                Cards Concealed
              </span>
            ) : (
              <span className="flex items-center gap-1 text-fuchsia-300 font-bold tabular-nums">
                <Eye className="w-3.5 h-3.5 animate-pulse" />
                {timeLeft}s to memorize
              </span>
            )}
          </div>
        )}
      </div>

      {/* Memory items display grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {items.map((item, index) => {
          const showContent = !isConcealed || isRevealed;
          return (
            <div
              key={index}
              className={`p-3 rounded-lg border text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[70px] ${
                showContent
                  ? 'bg-fuchsia-950/40 border-fuchsia-500/50 text-white shadow-sm'
                  : 'bg-slate-800/80 border-slate-700 text-slate-500'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400 mb-0.5">#{index + 1}</span>
              {showContent ? (
                <span className="font-display font-bold text-sm tracking-wide text-fuchsia-200">
                  {item}
                </span>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-lg font-bold font-mono text-slate-600">?</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isConcealed && !isRevealed && (
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-fuchsia-400" />
            Lock these in your mental buffer!
          </span>
          <button
            onClick={() => {
              setIsConcealed(true);
              if (onConcealComplete) onConcealComplete();
            }}
            className="text-fuchsia-400 hover:text-fuchsia-300 underline font-medium cursor-pointer"
          >
            I got them! Hide now &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
