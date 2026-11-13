/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { TopBar } from './components/TopBar';
import { StatsBar } from './components/StatsBar';
import { ChatWindow } from './components/ChatWindow';
import { ZoneSelectorModal } from './components/ZoneSelectorModal';
import { RulesModal } from './components/RulesModal';
import { RuleInspectorModal } from './components/RuleInspectorModal';
import {
  ChatMessage,
  Difficulty,
  PlayerStats,
  Question,
  ZoneId,
} from './types/game';
import {
  QUESTION_DATABASE,
  DIFFICULTY_SETTINGS,
  WELCOME_MESSAGE,
  ZONES,
} from './data/questions';
import {
  detectRuleIntent,
  evaluateAnswer,
  calculateRank,
} from './utils/nlpEngine';
import { soundFx } from './utils/audio';

const STORAGE_KEY = 'brain_battle_stats_v1';

export default function App() {
  // Player Stats
  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          score: parsed.score || 0,
          highScore: parsed.highScore || 0,
          streak: parsed.streak || 0,
          maxStreak: parsed.maxStreak || 0,
          questionsAnswered: parsed.questionsAnswered || 0,
          questionsCorrect: parsed.questionsCorrect || 0,
          hintsUsed: parsed.hintsUsed || 0,
          currentZone: parsed.currentZone || 'riddle',
          currentDifficulty: parsed.currentDifficulty || 'easy',
        };
      }
    } catch {
      // ignore
    }
    return {
      score: 0,
      highScore: 0,
      streak: 0,
      maxStreak: 0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      hintsUsed: 0,
      currentZone: 'riddle',
      currentDifficulty: 'easy',
    };
  });

  // Save stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Audio mute state
  const [isMuted, setIsMuted] = useState(false);

  // Modals state
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isZonesOpen, setIsZonesOpen] = useState(false);

  // Question & Timer State
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'cortex',
      text: WELCOME_MESSAGE,
      timestamp: new Date(),
      quickActions: [
        { label: '🔮 Riddle Zone', action: 'riddle', variant: 'primary' },
        { label: '🧩 Puzzle Zone', action: 'puzzle' },
        { label: '🧮 Math Challenge', action: 'math' },
        { label: '🧭 Logical Reasoning', action: 'logic' },
        { label: '🌍 General Knowledge', action: 'gk' },
        { label: '🧠 Memory Challenge', action: 'memory' },
      ],
    },
  ]);

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop Timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerActive(false);
  }, []);

  // Handle Question Timeout
  const handleTimeout = useCallback(() => {
    stopTimer();
    soundFx.playWrong();

    if (!activeQuestion) return;

    setStats(prev => ({
      ...prev,
      streak: 0,
      questionsAnswered: prev.questionsAnswered + 1,
    }));

    const timeoutMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'cortex',
      text: `⏰ **TIME'S UP!**\n\nThe correct answer was: **${activeQuestion.acceptedAnswers[0].toUpperCase()}**.\n\n💡 *Explanation:* ${activeQuestion.explanation}`,
      timestamp: new Date(),
      feedbackType: 'timeout',
      quickActions: [
        { label: 'Next Question', action: 'next', variant: 'primary' },
        { label: 'Change Zone', action: 'menu' },
        { label: 'Check Score', action: 'score' },
      ],
    };

    setMessages(prev => [...prev, timeoutMsg]);
    setActiveQuestion(null);
  }, [activeQuestion, stopTimer]);

  // Timer tick effect
  useEffect(() => {
    if (isTimerActive && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          if (prev <= 6) {
            soundFx.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, remainingTime, handleTimeout]);

  // Trigger Confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#3b82f6', '#ec4899', '#f59e0b', '#10b981'],
      });
    } catch {
      // ignore
    }
  };

  // Serve a question
  const serveQuestion = useCallback(
    (zoneId?: ZoneId, difficulty?: Difficulty) => {
      stopTimer();

      const targetZone = zoneId || stats.currentZone;
      const targetDiff = difficulty || stats.currentDifficulty;

      // Filter available questions
      let candidatePool = QUESTION_DATABASE.filter(
        q => q.zone === targetZone && q.difficulty === targetDiff && !usedQuestionIds.has(q.id)
      );

      // Reset pool for this zone if exhausted
      if (candidatePool.length === 0) {
        candidatePool = QUESTION_DATABASE.filter(
          q => q.zone === targetZone && q.difficulty === targetDiff
        );
        // Clear used for this zone
        setUsedQuestionIds(prev => {
          const next = new Set(prev);
          candidatePool.forEach(q => next.delete(q.id));
          return next;
        });
      }

      if (candidatePool.length === 0) {
        // Fallback: any question in this zone
        candidatePool = QUESTION_DATABASE.filter(q => q.zone === targetZone);
      }

      const selectedQ = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      setUsedQuestionIds(prev => new Set(prev).add(selectedQ.id));

      const settings = DIFFICULTY_SETTINGS[targetDiff];
      setActiveQuestion(selectedQ);
      setCurrentHintLevel(0);
      setRemainingTime(settings.timeSeconds);
      setTotalTime(settings.timeSeconds);
      setIsTimerActive(true);

      const zoneObj = ZONES.find(z => z.id === targetZone);

      const questionMsg: ChatMessage = {
        id: 'q_' + Date.now(),
        sender: 'cortex',
        text: `🎯 **${zoneObj?.name.toUpperCase()}** · [${settings.name.toUpperCase()} · ${settings.points} PTS · ⏱️ ${settings.timeSeconds}s]\n\n${selectedQ.question}`,
        timestamp: new Date(),
        isQuestion: true,
        questionData: selectedQ,
        quickActions: [
          { label: `💡 Request Hint (-${settings.hintCost} pts)`, action: 'hint', variant: 'warning' },
          { label: '⏭️ Skip', action: 'skip' },
        ],
      };

      setMessages(prev => [...prev, questionMsg]);
    },
    [stats.currentZone, stats.currentDifficulty, usedQuestionIds, stopTimer]
  );

  // Request Hint Action
  const handleRequestHint = useCallback(() => {
    if (!activeQuestion) {
      setMessages(prev => [
        ...prev,
        {
          id: 'hint_err_' + Date.now(),
          sender: 'cortex',
          text: "There is no active challenge to give a hint for! Choose a zone or type 'next' to begin.",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    soundFx.playHint();
    const settings = DIFFICULTY_SETTINGS[activeQuestion.difficulty];

    if (currentHintLevel === 0) {
      setCurrentHintLevel(1);
      setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));

      setMessages(prev => [
        ...prev,
        {
          id: 'hint_' + Date.now(),
          sender: 'cortex',
          text: `💡 **HINT 1/2 (-${settings.hintCost} pts):**\n${activeQuestion.hints[0]}`,
          timestamp: new Date(),
          isHint: true,
          quickActions: [
            { label: `💡 Reveal Stronger Clue (-${settings.hintCost} pts)`, action: 'hint', variant: 'warning' },
            { label: '⏭️ Skip', action: 'skip' },
          ],
        },
      ]);
    } else if (currentHintLevel === 1) {
      setCurrentHintLevel(2);
      setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));

      setMessages(prev => [
        ...prev,
        {
          id: 'hint2_' + Date.now(),
          sender: 'cortex',
          text: `🔍 **FINAL HINT 2/2:**\n${activeQuestion.hints[1]}`,
          timestamp: new Date(),
          isHint: true,
          quickActions: [{ label: '⏭️ Give Up & Skip', action: 'skip' }],
        },
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: 'nohint_' + Date.now(),
          sender: 'cortex',
          text: "⚠️ All hints have already been unlocked for this question! Take your best guess or type 'skip' to see the answer.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [activeQuestion, currentHintLevel]);

  // Skip Question Action
  const handleSkipQuestion = useCallback(() => {
    if (!activeQuestion) {
      serveQuestion();
      return;
    }

    stopTimer();
    soundFx.playWrong();

    setStats(prev => ({
      ...prev,
      streak: 0,
      questionsAnswered: prev.questionsAnswered + 1,
    }));

    const skipMsg: ChatMessage = {
      id: 'skip_' + Date.now(),
      sender: 'cortex',
      text: `⏭️ **QUESTION SKIPPED**\n\nThe correct answer was: **${activeQuestion.acceptedAnswers[0].toUpperCase()}**.\n\n💡 *Explanation:* ${activeQuestion.explanation}`,
      timestamp: new Date(),
      feedbackType: 'info',
      quickActions: [
        { label: 'Next Question', action: 'next', variant: 'primary' },
        { label: 'Change Zone', action: 'menu' },
      ],
    };

    setMessages(prev => [...prev, skipMsg]);
    setActiveQuestion(null);
  }, [activeQuestion, stopTimer, serveQuestion]);

  // Handle User Message submission
  const handleSendMessage = (userText: string) => {
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Rule-Based Intent Resolution with short simulated latency (250ms)
    setTimeout(() => {
      setIsTyping(false);

      const intent = detectRuleIntent(userText, !!activeQuestion);

      switch (intent.type) {
        case 'GREETING': {
          setMessages(prev => [
            ...prev,
            {
              id: 'bot_' + Date.now(),
              sender: 'cortex',
              text: "Hello, challenger! Cortex is ready. Choose a battle zone or command below to test your neurons!",
              timestamp: new Date(),
              quickActions: [
                { label: '🔮 Play Riddles', action: 'riddle', variant: 'primary' },
                { label: '🧮 Play Math', action: 'math' },
                { label: '🧭 Play Logic', action: 'logic' },
                { label: '🧠 Play Memory', action: 'memory' },
              ],
            },
          ]);
          break;
        }

        case 'HELP': {
          setIsRulesOpen(true);
          setMessages(prev => [
            ...prev,
            {
              id: 'bot_' + Date.now(),
              sender: 'cortex',
              text: "Opened the **Rules & Scoring** manual for you! You can also type commands like `hint`, `skip`, `riddle`, `math`, `easy`, `hard`, `score`, or `restart`.",
              timestamp: new Date(),
            },
          ]);
          break;
        }

        case 'MENU': {
          setIsZonesOpen(true);
          setMessages(prev => [
            ...prev,
            {
              id: 'bot_' + Date.now(),
              sender: 'cortex',
              text: "Opened the **Battle Zone Selection Menu**! Pick your battle arena or type the name of the zone (e.g. `puzzle`, `logic`, `gk`).",
              timestamp: new Date(),
            },
          ]);
          break;
        }

        case 'RESTART': {
          stopTimer();
          setActiveQuestion(null);
          setStats(prev => ({
            ...prev,
            score: 0,
            streak: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            hintsUsed: 0,
          }));
          setMessages(prev => [
            ...prev,
            {
              id: 'bot_' + Date.now(),
              sender: 'cortex',
              text: "🔄 **CHALLENGE RESET!** Scores have been refreshed to zero. Which zone would you like to conquer first?",
              timestamp: new Date(),
              quickActions: [
                { label: '🔮 Riddle Zone', action: 'riddle', variant: 'primary' },
                { label: '🧩 Puzzle Zone', action: 'puzzle' },
                { label: '🧮 Math Challenge', action: 'math' },
                { label: '🧭 Logic Reasoning', action: 'logic' },
              ],
            },
          ]);
          break;
        }

        case 'SCORE': {
          const rank = calculateRank(stats.score);
          const accuracy =
            stats.questionsAnswered > 0
              ? Math.round((stats.questionsCorrect / stats.questionsAnswered) * 100)
              : 0;

          setMessages(prev => [
            ...prev,
            {
              id: 'bot_' + Date.now(),
              sender: 'cortex',
              text: `📊 **PLAYER PERFORMANCE REPORT**
• **Current Score:** ${stats.score} pts
• **All-Time High Score:** ${stats.highScore} pts
• **Active Streak:** ${stats.streak}x (Max: ${stats.maxStreak}x)
• **Rank Standing:** ${rank.badge} (${rank.title})
• **Accuracy:** ${accuracy}% (${stats.questionsCorrect}/${stats.questionsAnswered} correct)
• **Hints Utilized:** ${stats.hintsUsed}

Keep answering to climb towards Grandmaster!`,
              timestamp: new Date(),
              quickActions: [
                { label: activeQuestion ? 'Return to Question' : 'Next Question', action: activeQuestion ? 'hint' : 'next' },
                { label: 'Change Zone', action: 'menu' },
              ],
            },
          ]);
          break;
        }

        case 'HINT': {
          handleRequestHint();
          break;
        }

        case 'SKIP': {
          handleSkipQuestion();
          break;
        }

        case 'ZONE_CHANGE': {
          if (intent.targetZone) {
            setStats(prev => ({ ...prev, currentZone: intent.targetZone! }));
            const zone = ZONES.find(z => z.id === intent.targetZone);
            setMessages(prev => [
              ...prev,
              {
                id: 'bot_' + Date.now(),
                sender: 'cortex',
                text: `🔀 Switched battle zone to **${zone?.name}**! Preparing your first challenge...`,
                timestamp: new Date(),
              },
            ]);
            setTimeout(() => {
              serveQuestion(intent.targetZone);
            }, 300);
          }
          break;
        }

        case 'DIFFICULTY_CHANGE': {
          if (intent.targetDifficulty) {
            setStats(prev => ({ ...prev, currentDifficulty: intent.targetDifficulty! }));
            const settings = DIFFICULTY_SETTINGS[intent.targetDifficulty];
            setMessages(prev => [
              ...prev,
              {
                id: 'bot_' + Date.now(),
                sender: 'cortex',
                text: `⚡ Difficulty updated to **${settings.name.toUpperCase()}**! Each correct answer earns **${settings.points} pts** with a **${settings.timeSeconds}s** timer limit.`,
                timestamp: new Date(),
                quickActions: [{ label: 'Start New Question', action: 'next', variant: 'primary' }],
              },
            ]);
          }
          break;
        }

        case 'ANSWER': {
          if (!activeQuestion) {
            serveQuestion();
            break;
          }

          // Evaluate with rule-based NLP matcher
          const evaluation = evaluateAnswer(userText, activeQuestion);

          if (evaluation.isCorrect) {
            stopTimer();
            soundFx.playCorrect();
            triggerConfetti();

            const settings = DIFFICULTY_SETTINGS[activeQuestion.difficulty];
            const basePoints = settings.points;
            const hintPenalty = currentHintLevel * settings.hintCost;
            const isSpeedy = remainingTime > totalTime / 2;
            const speedBonus = isSpeedy ? 5 : 0;

            const newStreak = stats.streak + 1;
            const multiplier = newStreak >= 5 ? 2.0 : newStreak >= 3 ? 1.5 : newStreak >= 2 ? 1.25 : 1.0;

            const finalEarned = Math.max(1, Math.round((basePoints - hintPenalty + speedBonus) * multiplier));
            const newScore = stats.score + finalEarned;

            setStats(prev => ({
              ...prev,
              score: newScore,
              highScore: Math.max(prev.highScore, newScore),
              streak: newStreak,
              maxStreak: Math.max(prev.maxStreak, newStreak),
              questionsAnswered: prev.questionsAnswered + 1,
              questionsCorrect: prev.questionsCorrect + 1,
            }));

            // Check if fanfare is warranted (milestone score or high streak)
            if (newStreak % 3 === 0 || newScore >= 100) {
              soundFx.playFanfare();
            }

            const praisePrefixes = [
              '🎯 **BRILLIANT! That is correct!**',
              '🧠 **EXCELLENT REASONING!**',
              '⚡ **GENIUS AT WORK! You nailed it!**',
              '🔥 **UNSTOPPABLE! Perfect answer!**',
            ];
            const praise = praisePrefixes[Math.floor(Math.random() * praisePrefixes.length)];

            setMessages(prev => [
              ...prev,
              {
                id: 'correct_' + Date.now(),
                sender: 'cortex',
                text: `${praise}\n\n**Accepted Answer:** ${activeQuestion.acceptedAnswers[0].toUpperCase()}${
                  evaluation.matchMethod === 'fuzzy' ? ' *(Accepted via typo tolerance)*' : ''
                }\n\n💡 *Explanation:* ${activeQuestion.explanation}\n\n📈 **Points Breakdown:**\n• Base (${settings.name}): +${basePoints} pts\n${
                  hintPenalty > 0 ? `• Hint penalty: -${hintPenalty} pts\n` : ''
                }${speedBonus > 0 ? '• Rapid thinking bonus: +5 pts\n' : ''}• Streak Multiplier (${newStreak}x): ×${multiplier}\n**Total Earned: +${finalEarned} Points!**`,
                timestamp: new Date(),
                feedbackType: 'correct',
                earnedPoints: finalEarned,
                quickActions: [
                  { label: 'Next Challenge →', action: 'next', variant: 'primary' },
                  { label: 'Change Zone', action: 'menu' },
                  { label: 'View Scorecard', action: 'score' },
                ],
              },
            ]);

            setActiveQuestion(null);
          } else {
            // Incorrect guess
            soundFx.playWrong();
            setMessages(prev => [
              ...prev,
              {
                id: 'inc_' + Date.now(),
                sender: 'cortex',
                text: `❌ **Not quite right!** "${userText}" isn't the solution I'm looking for.\n\nThe clock is still ticking! Try another guess or click **💡 Request Hint**.`,
                timestamp: new Date(),
                feedbackType: 'incorrect',
                quickActions: [
                  { label: '💡 Request Hint', action: 'hint', variant: 'warning' },
                  { label: '⏭️ Skip Question', action: 'skip' },
                ],
              },
            ]);
          }
          break;
        }

        default: {
          // Unknown intent without active question
          setMessages(prev => [
            ...prev,
            {
              id: 'unk_' + Date.now(),
              sender: 'cortex',
              text: `I heard: "${userText}". As a rule-based challenger, you can command me by selecting an action below or typing **"riddle"**, **"math"**, **"logic"**, **"easy"**, **"hard"**, or **"rules"**!`,
              timestamp: new Date(),
              quickActions: [
                { label: 'Start Random Question', action: 'next', variant: 'primary' },
                { label: 'Battle Zones', action: 'menu' },
                { label: 'Rules & Guide', action: 'rules' },
              ],
            },
          ]);
        }
      }
    }, 250);
  };

  // Change zone handler
  const handleSelectZone = (zoneId: ZoneId) => {
    setStats(prev => ({ ...prev, currentZone: zoneId }));
    serveQuestion(zoneId);
  };

  // Change difficulty handler
  const handleSelectDifficulty = (diff: Difficulty) => {
    setStats(prev => ({ ...prev, currentDifficulty: diff }));
    serveQuestion(undefined, diff);
  };

  // Restart handler
  const handleRestart = () => {
    stopTimer();
    setActiveQuestion(null);
    setStats({
      score: 0,
      highScore: stats.highScore,
      streak: 0,
      maxStreak: stats.maxStreak,
      questionsAnswered: 0,
      questionsCorrect: 0,
      hintsUsed: 0,
      currentZone: 'riddle',
      currentDifficulty: 'easy',
    });
    setMessages([
      {
        id: 'restart_' + Date.now(),
        sender: 'cortex',
        text: "⚡ **BRAIN BATTLE RESTARTS NOW!** ⚡\n\nYour score has been reset. Choose your preferred battle zone below to step into the ring!",
        timestamp: new Date(),
        quickActions: [
          { label: '🔮 Riddle Zone', action: 'riddle', variant: 'primary' },
          { label: '🧩 Puzzle Zone', action: 'puzzle' },
          { label: '🧮 Math Challenge', action: 'math' },
          { label: '🧭 Logical Reasoning', action: 'logic' },
          { label: '🌍 General Knowledge', action: 'gk' },
          { label: '🧠 Memory Challenge', action: 'memory' },
        ],
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar following contract */}
      <TopBar
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenZones={() => setIsZonesOpen(true)}
        onRestart={handleRestart}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(prev => !prev)}
      />

      {/* Heads-up Stats and Timer Bar */}
      <StatsBar
        stats={stats}
        remainingTime={remainingTime}
        totalTime={totalTime}
        isTimerActive={isTimerActive}
        onSelectDifficulty={handleSelectDifficulty}
        onOpenZones={() => setIsZonesOpen(true)}
      />

      {/* Main Interactive Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onRequestHint={handleRequestHint}
          onSkipQuestion={handleSkipQuestion}
          onOpenRules={() => setIsRulesOpen(true)}
          onOpenZones={() => setIsZonesOpen(true)}
          hasActiveQuestion={!!activeQuestion}
        />
      </main>

      {/* Modals */}
      <ZoneSelectorModal
        isOpen={isZonesOpen}
        onClose={() => setIsZonesOpen(false)}
        onSelectZone={handleSelectZone}
        currentZone={stats.currentZone}
      />

      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      <RuleInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
