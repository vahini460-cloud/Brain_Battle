import React from 'react';
import { X, Award, Clock, Lightbulb, Zap, Terminal } from 'lucide-react';
import { DIFFICULTY_SETTINGS } from '../data/questions';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Rules & Scoring System</h2>
              <p className="text-xs text-slate-400">Everything you need to master Brain Battle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-300">
          {/* Difficulty and scoring table */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Difficulty Levels & Time Limits
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center mt-2">
              {(['easy', 'medium', 'hard'] as const).map(diff => {
                const s = DIFFICULTY_SETTINGS[diff];
                return (
                  <div key={diff} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="block font-bold text-white capitalize">{s.name}</span>
                    <span className="block text-cyan-400 font-mono mt-1">+{s.points} pts</span>
                    <span className="block text-slate-500 font-mono text-[11px]">{s.timeSeconds}s timer</span>
                    <span className="block text-amber-400/80 text-[10px] mt-0.5">Hint: -{s.hintCost}pts</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scoring bonuses */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Multiplier & Bonus Mechanics
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              <li>
                <strong className="text-white">Streak Multiplier:</strong> Answer consecutive questions correctly to build your streak. 2+ streak grants 1.25x bonus, 3+ streak grants 1.5x bonus, and 5+ streak doubles points (2.0x)!
              </li>
              <li>
                <strong className="text-white">Speed Bonus:</strong> Answering with more than 50% time remaining awards an extra +5 quick-thinking bonus.
              </li>
              <li>
                <strong className="text-white">Hint Penalties:</strong> Each hint costs a small point deduction from that question’s payout.
              </li>
            </ul>
          </div>

          {/* Chat commands */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-purple-400" />
              Rule-Based Chatbot Commands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">"hint"</span> or <span className="text-cyan-400 font-bold">"clue"</span>
                <p className="font-sans text-slate-400 mt-0.5">Reveals a progressive clue</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">"skip"</span> or <span className="text-cyan-400 font-bold">"pass"</span>
                <p className="font-sans text-slate-400 mt-0.5">Forfeits question and reveals solution</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">"riddle"</span>, <span className="text-cyan-400 font-bold">"math"</span>, etc.
                <p className="font-sans text-slate-400 mt-0.5">Directly switches battle zone</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">"easy"</span>, <span className="text-cyan-400 font-bold">"medium"</span>, <span className="text-cyan-400 font-bold">"hard"</span>
                <p className="font-sans text-slate-400 mt-0.5">Changes active difficulty tier</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">"menu"</span> or <span className="text-cyan-400 font-bold">"zones"</span>
                <p className="font-sans text-slate-400 mt-0.5">Opens interactive zone menu</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">"restart"</span> or <span className="text-cyan-400 font-bold">"reset"</span>
                <p className="font-sans text-slate-400 mt-0.5">Resets score and begins fresh round</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-colors cursor-pointer text-xs"
          >
            Got It, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};
