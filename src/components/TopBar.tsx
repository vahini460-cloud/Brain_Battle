import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Cpu } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TopBarProps {
  onOpenRules: () => void;
  onOpenInspector: () => void;
  onOpenZones: () => void;
  onRestart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenRules,
  onOpenInspector,
  onOpenZones,
  onRestart,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 shadow-sm shadow-cyan-500/20 bg-slate-800 flex items-center justify-center">
          <img
            src="/src/assets/images/cortex_brain_mascot_1793772702776.jpg"
            alt="Brain Battle Mascot"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap">
          BRAIN BATTLE
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={onOpenZones}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Battle Zones
        </button>
        <button
          onClick={onOpenRules}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4 text-slate-400" />
          Rules & Scoring
        </button>
        <button
          onClick={onOpenInspector}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          Rule-Based Engine
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => {
            onToggleMute();
            soundFx.isMuted = !isMuted;
          }}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        <button
          onClick={onRestart}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-sm shadow-cyan-500/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Challenge</span>
        </button>
      </div>
    </header>
  );
};
