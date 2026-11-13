export type ZoneId = 'riddle' | 'puzzle' | 'math' | 'logic' | 'gk' | 'memory';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  zone: ZoneId;
  difficulty: Difficulty;
  question: string;
  acceptedAnswers: string[];
  keywords: string[];
  hints: [string, string]; // [mild clue, direct clue]
  explanation: string;
  options?: string[]; // Optional multiple choice suggestions
  // Special for memory challenge
  memoryItems?: string[];
  memoryDisplayDuration?: number; // seconds to show
  memoryQuestion?: string;
}

export type MessageSender = 'cortex' | 'user' | 'system';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  isQuestion?: boolean;
  questionData?: Question;
  isMemoryPrompt?: boolean;
  isHint?: boolean;
  feedbackType?: 'correct' | 'incorrect' | 'info' | 'timeout';
  earnedPoints?: number;
  quickActions?: { label: string; action: string; variant?: 'primary' | 'secondary' | 'warning' }[];
}

export interface PlayerStats {
  score: number;
  highScore: number;
  streak: number;
  maxStreak: number;
  questionsAnswered: number;
  questionsCorrect: number;
  hintsUsed: number;
  currentZone: ZoneId;
  currentDifficulty: Difficulty;
}

export type IntentType =
  | 'GREETING'
  | 'HELP'
  | 'MENU'
  | 'ZONE_CHANGE'
  | 'DIFFICULTY_CHANGE'
  | 'HINT'
  | 'SKIP'
  | 'SCORE'
  | 'RESTART'
  | 'ANSWER'
  | 'UNKNOWN';

export interface RuleIntentResult {
  type: IntentType;
  targetZone?: ZoneId;
  targetDifficulty?: Difficulty;
  confidence: number;
  rawText: string;
}
