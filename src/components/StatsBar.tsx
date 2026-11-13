import React from 'react';
import { Flame, Clock, Award, ChevronRight, Zap } from 'lucide-react';
import { Difficulty, PlayerStats, ZoneId } from '../types/game';
import { ZONES, DIFFICULTY_SETTINGS } from '../data/questions';
import { calculateRank } from '../utils/nlpEngine';

interface StatsBarProps {
  stats: PlayerStats;
  remainingTime: number;
  totalTime: number;
  isTimerActive: boolean;
  onSelectDifficulty: (d: Difficulty) => void;
  onOpenZones: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  stats,
  remainingTime,
  totalTime,
  isTimerActive,
  onSelectDifficulty,
  onOpenZones,
}) => {
  const currentZoneInfo = ZONES.find(z => z.id === stats.currentZone) || ZONES[0];
  const rank = calculateRank(stats.score);
  const timePercent = totalTime > 0 ? (remainingTime / totalTime) * 100 : 0;
  const isUrgent = remainingTime <= 5 && isTimerActive;

  return (
    <div className="border-b border-slate-800 bg-slate-900/60 px-4 md:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Zone Selector + Difficulty Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onOpenZones}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer group"
          >
            <span className="text-cyan-400 font-display font-medium">Zone:</span>
            <span className="text-white font-bold">{currentZoneInfo.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Difficulty Segmented Control */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => {
              const active = stats.currentDifficulty === diff;
              const settings = DIFFICULTY_SETTINGS[diff];
              return (
                <button
                  key={diff}
                  onClick={() => onSelectDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`${settings.name}: ${settings.points}pts · ${settings.timeSeconds}s`}
                >
                  {settings.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Live Timer Dial */}
        <div className="flex items-center gap-2">
          {isTimerActive ? (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all ${
                isUrgent
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-slate-800/90 border-slate-700 text-slate-200'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-rose-400 animate-spin' : 'text-cyan-400'}`} />
              <span className="text-xs font-mono font-bold tabular-nums">
                {remainingTime}s remaining
              </span>
              <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isUrgent ? 'bg-rose-500' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${timePercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Timer paused</span>
            </div>
          )}
        </div>

        {/* Right: Score, Streak & Rank */}
        <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Flame className={`w-4 h-4 ${stats.streak >= 2 ? 'fill-amber-400 animate-bounce' : 'text-slate-500'}`} />
            <span>Streak: {stats.streak}x</span>
          </div>

          {/* Current Score */}
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Score:</span>
            <span className="text-white font-bold text-sm">{stats.score}</span>
          </div>

          {/* Player Rank Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 rounded-md">
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span className="font-sans font-medium text-[11px]">{rank.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
