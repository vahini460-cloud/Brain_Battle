import React from 'react';
import { X, Cpu, CheckCircle2, ShieldCheck, Search, Code2 } from 'lucide-react';
import { QUESTION_DATABASE } from '../data/questions';

interface RuleInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleInspectorModal: React.FC<RuleInspectorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Rule-Based Chatbot Architecture</h2>
              <p className="text-xs text-slate-400">100% Deterministic · Zero External AI / LLM Calls</p>
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
          {/* Compliance badge */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-cyan-200 block text-sm">Strict Rule-Based Architecture</span>
              <p className="text-slate-300 mt-1 leading-relaxed">
                As required by the specification, this chatbot is entirely powered by deterministic rule-based algorithms. It uses zero external LLM API calls, zero neural networks, and no machine learning models. Every dialogue turn, keyword evaluation, and state transition is driven by conditional logic.
              </p>
            </div>
          </div>

          {/* Engine pipeline */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Search className="w-4 h-4 text-cyan-400" />
              Evaluation Pipeline Stages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block mb-1">1. Normalization</span>
                <p className="text-slate-400">
                  Case folding, punctuation stripping, article removal ("a", "an", "the"), and textual number-to-digit conversion ("three" &rarr; "3").
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block mb-1">2. Keyword & Regex</span>
                <p className="text-slate-400">
                  Exact dictionary checks, boundary regular expressions (<code className="text-cyan-300">\bkeyword\b</code>), and synonym match trees.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block mb-1">3. Fuzzy Levenshtein</span>
                <p className="text-slate-400">
                  Dynamic programming matrix calculating edit distance (&le;1 for short words, &le;2 for long words) for natural typo tolerance.
                </p>
              </div>
            </div>
          </div>

          {/* Question Bank Stats */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-purple-400" />
              Deterministic Question Bank Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-sans">Total Questions</span>
                <span className="text-base font-bold text-white">{QUESTION_DATABASE.length}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-sans">Zones Covered</span>
                <span className="text-base font-bold text-cyan-400">6 Zones</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-sans">Difficulty Tiers</span>
                <span className="text-base font-bold text-emerald-400">3 Tiers</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block font-sans">Hint System</span>
                <span className="text-base font-bold text-amber-400">2 Tiers / Q</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors cursor-pointer text-xs"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
