import React from 'react';
import { X, Sparkles, Puzzle, Calculator, Compass, Globe, Brain, Zap } from 'lucide-react';
import { ZONES } from '../data/questions';
import { ZoneId } from '../types/game';

interface ZoneSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectZone: (zoneId: ZoneId) => void;
  currentZone: ZoneId;
}

export const ZoneSelectorModal: React.FC<ZoneSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectZone,
  currentZone,
}) => {
  if (!isOpen) return null;

  const renderIcon = (id: ZoneId) => {
    switch (id) {
      case 'riddle':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'puzzle':
        return <Puzzle className="w-5 h-5 text-cyan-400" />;
      case 'math':
        return <Calculator className="w-5 h-5 text-emerald-400" />;
      case 'logic':
        return <Compass className="w-5 h-5 text-purple-400" />;
      case 'gk':
        return <Globe className="w-5 h-5 text-rose-400" />;
      case 'memory':
        return <Brain className="w-5 h-5 text-fuchsia-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Select Battle Zone</h2>
              <p className="text-xs text-slate-400">Choose your area of intellect to battle Cortex</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {ZONES.map(zone => {
            const isSelected = zone.id === currentZone;
            return (
              <div
                key={zone.id}
                onClick={() => {
                  onSelectZone(zone.id);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500'
                    : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700">
                      {renderIcon(zone.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-display">{zone.name}</h3>
                      <span className="text-[11px] text-cyan-300/80 font-medium">{zone.tagline}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{zone.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">3 Difficulty tiers</span>
                  <span className="text-cyan-400 font-semibold group-hover:underline">
                    {isSelected ? 'Currently Active' : 'Enter Zone →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Tip: You can also type "riddle", "math", "gk" etc. in chat anytime!</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
