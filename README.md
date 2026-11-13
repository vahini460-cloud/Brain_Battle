# BRAIN BATTLE – Interactive Brain Challenge

> **Tagline:** *"Challenge Your Mind, Unlock Your Intelligence!"*

A web-based, 100% deterministic rule-based interactive chatbot that challenges users' thinking and problem-solving abilities through interactive mind activities.

---

## 🌟 Key Features

1. **🔮 Riddle Zone**: Engaging wordplay and metaphorical riddles.
2. **🧩 Puzzle Zone**: Lateral thinking, situational logic, and paradox brain teasers.
3. **🧮 Math Challenge**: Speed mental arithmetic, order of operations, and algebraic sequences.
4. **🧭 Logical Reasoning**: Syllogisms, truth-teller/liar deductions, and order rankings.
5. **🌍 General Knowledge (GK)**: Fascinating questions spanning astronomy, natural science, geography, and world wonders.
6. **🧠 Memory Challenge**: Timed item sequence retention with interactive card concealment and rapid recall testing.
7. **⚡ 3 Difficulty Tiers**:
   - **Easy**: 35-second timer · +10 points base · 2-point hint cost
   - **Medium**: 25-second timer · +20 points base · 4-point hint cost
   - **Hard**: 15-second timer · +30 points base · 6-point hint cost
8. **💡 Multi-Tier Hint System**: Progressive clues accessible via button or typing `"hint"` / `"clue"`.
9. **🏆 Dynamic Scoring & Streaks**:
   - Consecutive answer streak multipliers (1.25× at 2 streaks, 1.5× at 3 streaks, 2.0× at 5+ streaks).
   - Speed bonus for answers submitted in the first half of the timer.
   - Ranks: *Brain Cadet* &rarr; *Logic Explorer* &rarr; *Puzzle Strategist* &rarr; *Neural Mastermind* &rarr; *Brain Grandmaster*.
   - Local persistence of high scores in browser storage.
10. **⏱️ Interactive Visual Timer**: Progress ring with urgent pulse warning and optional tick audio for the final 5 seconds.
11. **🤖 Completely Rule-Based Chatbot**:
    - Zero external AI / LLM APIs.
    - Normalization pipeline: case folding, punctuation stripping, article removal, textual number conversion.
    - Keyword matching and boundary regex.
    - Dynamic programming Levenshtein distance for forgiving minor typos.
    - Instant conversational intent router (`GREETING`, `HELP`, `MENU`, `ZONE_CHANGE`, `DIFFICULTY_CHANGE`, `HINT`, `SKIP`, `SCORE`, `RESTART`, `ANSWER`).
12. **🎵 Zero-Dependency Web Audio Synth**:
    - Synthesizes harmonic arpeggios for correct answers, buzzer thuds for mistakes, sparkly pings for hints, and celebration fanfares via browser `AudioContext`. Includes a one-click mute/unmute control.

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (version 18 or newer recommended)
- npm or yarn

### Installation & Execution
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Visit http://localhost:3000
```

### Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with Outfit & Plus Jakarta Sans typography
├── package.json                 # Project dependencies & scripts
├── src/
│   ├── assets/images/           # Generated mascot & arena graphics
│   ├── components/
│   │   ├── ChatWindow.tsx       # Message feed, quick action chips & input bar
│   │   ├── MemoryCardView.tsx   # Interactive timed card sequence for memory zone
│   │   ├── RuleInspectorModal.tsx # Rule engine verification & transparency modal
│   │   ├── RulesModal.tsx       # Scoring breakdown & command cheat-sheet
│   │   ├── StatsBar.tsx         # Heads-up display for score, streak, timer, and difficulty
│   │   ├── TopBar.tsx           # Navigation bar compliant with Top Bar Contract
│   │   └── ZoneSelectorModal.tsx# Grid picker for the 6 battle zones
│   ├── data/
│   │   └── questions.ts         # Predefined question banks across 6 zones & 3 difficulties
│   ├── types/
│   │   └── game.ts              # TypeScript interface definitions
│   ├── utils/
│   │   ├── audio.ts             # Web Audio API sound synthesizer
│   │   └── nlpEngine.ts         # Deterministic NLP parser, keyword matcher, and intent classifier
│   ├── App.tsx                  # Main game state machine and chat loop
│   ├── index.css                # Tailwind CSS v4 setup and custom animations
│   └── main.tsx                 # React DOM root mounting
```
