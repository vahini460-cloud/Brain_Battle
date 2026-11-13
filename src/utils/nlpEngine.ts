import { ZoneId, Difficulty, Question, RuleIntentResult } from '../types/game';

// Levenshtein distance for fuzzy matching
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Convert textual numbers to numeric strings
const NUMBER_WORDS: Record<string, string> = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  first: '1st',
  second: '2nd',
  third: '3rd',
  fourth: '4th',
  fifth: '5th',
};

// Normalize input string: lowercase, strip punctuation, remove noise words
export function normalizeText(raw: string): string {
  let cleaned = raw
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Strip leading conversational phrases
  cleaned = cleaned
    .replace(/^(i think (it is|its|it's)?|it is|its|it's|is it|the answer is|my answer is|answer is|could it be)\s+/i, '')
    .trim();

  // Strip leading articles
  cleaned = cleaned.replace(/^(the|a|an)\s+/i, '').trim();

  // Replace common number words if exact match or separated
  const tokens = cleaned.split(' ');
  const normalizedTokens = tokens.map(t => NUMBER_WORDS[t] || t);
  return normalizedTokens.join(' ').trim();
}

// Determine if the user's input matches the expected answer for a given question
export function evaluateAnswer(
  userInput: string,
  question: Question
): { isCorrect: boolean; matchedPattern: string; matchMethod: 'exact' | 'keyword' | 'fuzzy' | 'none' } {
  const normInput = normalizeText(userInput);

  if (!normInput) {
    return { isCorrect: false, matchedPattern: '', matchMethod: 'none' };
  }

  // 1. Direct normalized match against accepted answers
  for (const accepted of question.acceptedAnswers) {
    const normAccepted = normalizeText(accepted);
    if (normInput === normAccepted) {
      return { isCorrect: true, matchedPattern: accepted, matchMethod: 'exact' };
    }
  }

  // 2. Keyword inclusion check (all or any required primary keyword)
  for (const kw of question.keywords) {
    const normKw = normalizeText(kw);
    // Check whole word or substring boundary
    const regex = new RegExp(`\\b${normKw}\\b`, 'i');
    if (regex.test(normInput) || normInput.includes(normKw)) {
      return { isCorrect: true, matchedPattern: kw, matchMethod: 'keyword' };
    }
  }

  // 3. Fuzzy match for typo tolerance on accepted answers (distance <= 1 for words length >= 4, distance <= 2 for words >= 7)
  for (const accepted of question.acceptedAnswers) {
    const normAccepted = normalizeText(accepted);
    const dist = levenshteinDistance(normInput, normAccepted);

    if (normAccepted.length >= 7 && dist <= 2) {
      return { isCorrect: true, matchedPattern: `${accepted} (approx)`, matchMethod: 'fuzzy' };
    } else if (normAccepted.length >= 4 && dist <= 1) {
      return { isCorrect: true, matchedPattern: `${accepted} (approx)`, matchMethod: 'fuzzy' };
    }
  }

  return { isCorrect: false, matchedPattern: '', matchMethod: 'none' };
}

// Detect conversational command intents
export function detectRuleIntent(userInput: string, hasActiveQuestion: boolean): RuleIntentResult {
  const norm = normalizeText(userInput);

  // 1. Greetings
  if (/^(hello|hi|hey|hola|greetings|howdy|sup|good morning|good afternoon|good evening)\b/i.test(norm)) {
    return { type: 'GREETING', confidence: 0.95, rawText: userInput };
  }

  // 2. Help / Rules
  if (/^(help|rules|instructions|how to play|guide|commands)\b/i.test(norm)) {
    return { type: 'HELP', confidence: 0.95, rawText: userInput };
  }

  // 3. Menu / Categories
  if (/^(menu|categories|modes|zones|category|select zone|change zone|list)\b/i.test(norm)) {
    return { type: 'MENU', confidence: 0.95, rawText: userInput };
  }

  // 4. Restart / Reset
  if (/^(restart|reset|new game|clear|start over|restart game)\b/i.test(norm)) {
    return { type: 'RESTART', confidence: 0.95, rawText: userInput };
  }

  // 5. Score / Stats
  if (/^(score|stats|points|my score|high score|streak|rank|standing)\b/i.test(norm)) {
    return { type: 'SCORE', confidence: 0.95, rawText: userInput };
  }

  // 6. Hint Intent
  if (/^(hint|clue|give me a hint|give hint|i need a hint|give me a clue|give clue|stuck|help me)\b/i.test(norm)) {
    return { type: 'HINT', confidence: 0.9, rawText: userInput };
  }

  // 7. Skip Intent
  if (/^(skip|pass|next|next question|give up|i give up|surrender|reveal answer|dont know|idk)\b/i.test(norm)) {
    return { type: 'SKIP', confidence: 0.9, rawText: userInput };
  }

  // 8. Zone Switch Requests
  if (/\b(riddle|riddles)\b/i.test(norm)) {
    return { type: 'ZONE_CHANGE', targetZone: 'riddle', confidence: 0.9, rawText: userInput };
  }
  if (/\b(puzzle|puzzles|brain teaser)\b/i.test(norm)) {
    return { type: 'ZONE_CHANGE', targetZone: 'puzzle', confidence: 0.9, rawText: userInput };
  }
  if (/\b(math|mathematics|arithmetic|calc|numbers)\b/i.test(norm)) {
    return { type: 'ZONE_CHANGE', targetZone: 'math', confidence: 0.9, rawText: userInput };
  }
  if (/\b(logic|logical|reasoning|deduction)\b/i.test(norm)) {
    return { type: 'ZONE_CHANGE', targetZone: 'logic', confidence: 0.9, rawText: userInput };
  }
  if (/\b(gk|general knowledge|trivia|knowledge)\b/i.test(norm)) {
    return { type: 'ZONE_CHANGE', targetZone: 'gk', confidence: 0.9, rawText: userInput };
  }
  if (/\b(memory|recall|remember|sequence)\b/i.test(norm)) {
    return { type: 'ZONE_CHANGE', targetZone: 'memory', confidence: 0.9, rawText: userInput };
  }

  // 9. Difficulty Switch Requests
  if (/\b(easy mode|set easy|switch to easy|make it easy|play easy|easy)\b/i.test(norm) && (!hasActiveQuestion || norm === 'easy')) {
    return { type: 'DIFFICULTY_CHANGE', targetDifficulty: 'easy', confidence: 0.85, rawText: userInput };
  }
  if (/\b(medium mode|set medium|switch to medium|make it medium|play medium|medium)\b/i.test(norm) && (!hasActiveQuestion || norm === 'medium')) {
    return { type: 'DIFFICULTY_CHANGE', targetDifficulty: 'medium', confidence: 0.85, rawText: userInput };
  }
  if (/\b(hard mode|set hard|switch to hard|make it hard|play hard|hard)\b/i.test(norm) && (!hasActiveQuestion || norm === 'hard')) {
    return { type: 'DIFFICULTY_CHANGE', targetDifficulty: 'hard', confidence: 0.85, rawText: userInput };
  }

  // 10. If an active question is in play, the default assumption is an Answer attempt
  if (hasActiveQuestion) {
    return { type: 'ANSWER', confidence: 0.8, rawText: userInput };
  }

  return { type: 'UNKNOWN', confidence: 0.2, rawText: userInput };
}

// Rank computation based on points
export function calculateRank(score: number): { title: string; badge: string; nextThreshold: number; icon: string } {
  if (score >= 400) {
    return { title: 'Brain Grandmaster', badge: '👑 Grandmaster', nextThreshold: 9999, icon: 'Crown' };
  }
  if (score >= 250) {
    return { title: 'Neural Mastermind', badge: '💎 Mastermind', nextThreshold: 400, icon: 'Sparkles' };
  }
  if (score >= 130) {
    return { title: 'Puzzle Strategist', badge: '🥇 Strategist', nextThreshold: 250, icon: 'Award' };
  }
  if (score >= 50) {
    return { title: 'Logic Explorer', badge: '🥈 Explorer', nextThreshold: 130, icon: 'Compass' };
  }
  return { title: 'Brain Cadet', badge: '🥉 Cadet', nextThreshold: 50, icon: 'Target' };
}
