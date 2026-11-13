import { Question, ZoneId, Difficulty } from '../types/game';

export interface ZoneInfo {
  id: ZoneId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
}

export const ZONES: ZoneInfo[] = [
  {
    id: 'riddle',
    name: 'Riddle Zone',
    tagline: 'Wordplay & Clever Metaphors',
    description: 'Deceptively simple riddles testing your poetic wit and out-of-the-box deduction.',
    icon: 'Sparkles',
    accentColor: 'from-amber-500 to-orange-500',
  },
  {
    id: 'puzzle',
    name: 'Puzzle Zone',
    tagline: 'Lateral Thinking & Brain Teasers',
    description: 'Challenging situational puzzles where standard assumptions lead you astray.',
    icon: 'Puzzle',
    accentColor: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'math',
    name: 'Math Challenge',
    tagline: 'Speed Numbers & Algebraic Logic',
    description: 'Rapid arithmetic, clever sequences, and deceptive mathematical paradoxes.',
    icon: 'Calculator',
    accentColor: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'logic',
    name: 'Logical Reasoning',
    tagline: 'Syllogisms & Analytical Deduction',
    description: 'Pure formal deduction, order rankings, and paradox elimination problems.',
    icon: 'Compass',
    accentColor: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'gk',
    name: 'General Knowledge',
    tagline: 'Trivia Across Science, Earth & History',
    description: 'Fascinating questions spanning astronomy, biology, history, geography, and wonders.',
    icon: 'Globe',
    accentColor: 'from-rose-500 to-pink-500',
  },
  {
    id: 'memory',
    name: 'Memory Challenge',
    tagline: 'Rapid Recall & Sequence Retention',
    description: 'Study a flash of objects, words, or colors and test your working memory retention.',
    icon: 'Brain',
    accentColor: 'from-fuchsia-500 to-violet-500',
  },
];

export const DIFFICULTY_SETTINGS: Record<Difficulty, { name: string; timeSeconds: number; points: number; hintCost: number; badgeColor: string }> = {
  easy: {
    name: 'Easy',
    timeSeconds: 35,
    points: 10,
    hintCost: 2,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  medium: {
    name: 'Medium',
    timeSeconds: 25,
    points: 20,
    hintCost: 4,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  hard: {
    name: 'Hard',
    timeSeconds: 15,
    points: 30,
    hintCost: 6,
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
};

export const QUESTION_DATABASE: Question[] = [
  // ================= RIDDLES =================
  {
    id: 'rid-e1',
    zone: 'riddle',
    difficulty: 'easy',
    question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
    acceptedAnswers: ['echo', 'an echo', 'echoes'],
    keywords: ['echo'],
    hints: [
      'Think about sounds bouncing off canyon walls or in empty halls.',
      'It starts with "E" and repeats whatever words you shout.'
    ],
    explanation: 'An echo repeats sound vibrations through reflection without having a physical vocal cord.',
    options: ['Echo', 'Wind chime', 'Shadow', 'Radio']
  },
  {
    id: 'rid-e2',
    zone: 'riddle',
    difficulty: 'easy',
    question: 'What has hands, but cannot clap or hold anything?',
    acceptedAnswers: ['clock', 'a clock', 'watch', 'a watch'],
    keywords: ['clock', 'watch'],
    hints: [
      'It usually sits on a wall or straps around your wrist.',
      'It has an hour hand and a minute hand.'
    ],
    explanation: 'A clock (or wristwatch) has hour and minute hands that point to numbers to tell the time.',
    options: ['Clock', 'Glove', 'Mirror', 'Statue']
  },
  {
    id: 'rid-e3',
    zone: 'riddle',
    difficulty: 'easy',
    question: 'What gets wetter the more it dries?',
    acceptedAnswers: ['towel', 'a towel', 'bath towel'],
    keywords: ['towel'],
    hints: [
      'You use it right after stepping out of the shower.',
      'It absorbs moisture from your skin to make you dry.'
    ],
    explanation: 'A towel dries you off by absorbing water, making itself progressively wetter.',
    options: ['Towel', 'Sponge', 'Cloud', 'Soap']
  },
  {
    id: 'rid-m1',
    zone: 'riddle',
    difficulty: 'medium',
    question: 'The more you take from me, the bigger I become. What am I?',
    acceptedAnswers: ['hole', 'a hole', 'pit'],
    keywords: ['hole', 'pit'],
    hints: [
      'Think about digging in the sand or dirt.',
      'Removing material actually expands my size.'
    ],
    explanation: 'A hole grows larger each time you dig out more dirt or material.',
    options: ['Hole', 'Shadow', 'Debt', 'Secret']
  },
  {
    id: 'rid-m2',
    zone: 'riddle',
    difficulty: 'medium',
    question: 'I have branches, but no fruit, trunk, or leaves. What am I?',
    acceptedAnswers: ['bank', 'a bank', 'river bank'],
    keywords: ['bank'],
    hints: [
      'It holds financial deposits and has multiple branch locations.',
      'Or it is the edge of a flowing stream.'
    ],
    explanation: 'A financial bank operates local branches, or a river has natural banks.',
    options: ['Bank', 'Library', 'Road network', 'Family tree']
  },
  {
    id: 'rid-m3',
    zone: 'riddle',
    difficulty: 'medium',
    question: 'What can travel around the world while remaining locked in a corner?',
    acceptedAnswers: ['stamp', 'a stamp', 'postage stamp'],
    keywords: ['stamp', 'postage'],
    hints: [
      'It is affixed to envelopes and letters before being mailed.',
      'It stays in the top-right corner of the letter.'
    ],
    explanation: 'A postage stamp stays glued to the corner of an envelope as it travels across continents.',
    options: ['Stamp', 'Compass', 'Passport', 'Coin']
  },
  {
    id: 'rid-h1',
    zone: 'riddle',
    difficulty: 'hard',
    question: 'A box without hinges, key, or lid, yet golden treasure inside is hid. What is it?',
    acceptedAnswers: ['egg', 'an egg'],
    keywords: ['egg'],
    hints: [
      'This riddle was famously told by Bilbo Baggins to Gollum.',
      'Its shell must be cracked to reveal the yellow yolk.'
    ],
    explanation: 'An egg has a seamless shell with a rich golden yolk protected inside.',
    options: ['Egg', 'Chestnut', 'Pearl oyster', 'Geode']
  },
  {
    id: 'rid-h2',
    zone: 'riddle',
    difficulty: 'hard',
    question: 'I can be cracked, made, told, and played. What am I?',
    acceptedAnswers: ['joke', 'a joke', 'jokes'],
    keywords: ['joke'],
    hints: [
      'Stand-up comedians specialize in this.',
      'You crack one at a party to make friends laugh.'
    ],
    explanation: 'A joke can be cracked, made up, told to an audience, or played as a prank.',
    options: ['Joke', 'Record', 'Game', 'Puzzle']
  },

  // ================= PUZZLES =================
  {
    id: 'puz-e1',
    zone: 'puzzle',
    difficulty: 'easy',
    question: 'A man is looking at a portrait. Someone asks him who it is. He replies: "Brothers and sisters I have none, but this man\'s father is my father\'s son." Whose portrait is it?',
    acceptedAnswers: ['his son', 'son', 'the son', 'his own son'],
    keywords: ['son', 'his son'],
    hints: [
      'Since he has no siblings, who is "my father\'s son"? (It is himself!)',
      'If "this man\'s father is myself", then who is "this man"?'
    ],
    explanation: 'With no siblings, "my father\'s son" is the speaker himself. Thus "this man\'s father is me", meaning the portrait is his son.',
    options: ['His son', 'His father', 'Himself', 'His nephew']
  },
  {
    id: 'puz-e2',
    zone: 'puzzle',
    difficulty: 'easy',
    question: 'Which weighs more: a pound of pure feathers or a pound of solid gold?',
    acceptedAnswers: ['neither', 'both weigh the same', 'equal', 'same weight', 'they are the same', 'same'],
    keywords: ['same', 'neither', 'equal'],
    hints: [
      'Pay close attention to the unit of measurement specified for each item.',
      'Both items specify exactly one pound!'
    ],
    explanation: 'Both weigh exactly one pound! While feathers take up much more volume, their mass is identical.',
    options: ['They weigh the same', 'A pound of gold', 'A pound of feathers', 'Depends on gravity']
  },
  {
    id: 'puz-m1',
    zone: 'puzzle',
    difficulty: 'medium',
    question: 'Two fathers and two sons go fishing together. Each catches exactly one fish. Yet when they return, they have only three fish total. How is this possible?',
    acceptedAnswers: ['three people', 'grandfather father son', 'three generations', 'grandfather father and son', '3 people', 'there were only three people'],
    keywords: ['grandfather', '3 people', 'three people', 'three generations', 'grandson'],
    hints: [
      'Look at familial relationships across three generations.',
      'One of the men is both a father to someone and a son to someone else.'
    ],
    explanation: 'There are only three people: a grandfather, his son (who is also a father), and his grandson (son). That makes two fathers and two sons!',
    options: ['Grandfather, father, and son (3 people)', 'One fish ate another', 'A fish fell overboard', 'One was not hungry']
  },
  {
    id: 'puz-m2',
    zone: 'puzzle',
    difficulty: 'medium',
    question: 'A cowboy rides into town on Friday. He stays at the hotel for three full days, and then rides out on Friday. How did he do it?',
    acceptedAnswers: ['friday is the horse', 'his horse is named friday', 'horse named friday', 'horse is friday', 'horse friday', 'friday is a horse'],
    keywords: ['horse', 'friday'],
    hints: [
      'Friday does not necessarily refer to a day of the week in both instances.',
      'What was the cowboy riding on?'
    ],
    explanation: 'The cowboy\'s horse is named Friday! He rode in on his horse named Friday and rode out on him.',
    options: ['His horse was named Friday', 'He crossed the international date line', 'He stayed for a whole week', 'Time zone leap']
  },
  {
    id: 'puz-h1',
    zone: 'puzzle',
    difficulty: 'hard',
    question: 'You have a 3-liter jug and a 5-liter jug, with an unlimited water supply. How can you measure exactly 4 liters of water in the fewest steps? (What is the target amount you end up with in the 5L jug?)',
    acceptedAnswers: ['4', '4 liters', 'four', 'four liters'],
    keywords: ['4', 'four'],
    hints: [
      'Fill 5L, pour into 3L (leaving 2L in 5L jug). Empty 3L, pour the 2L into 3L. Fill 5L again and top off 3L (which takes 1L).',
      'This leaves exactly 4 liters in the 5L jug!'
    ],
    explanation: 'Fill 5L -> Pour into 3L (5L has 2L left) -> Empty 3L -> Pour 2L into 3L -> Fill 5L -> Pour 1L to fill 3L -> Leaves exactly 4L in the 5L jug!',
    options: ['4 liters', '2 liters', '3.5 liters', '1 liter']
  },

  // ================= MATH CHALLENGE =================
  {
    id: 'math-e1',
    zone: 'math',
    difficulty: 'easy',
    question: 'What is 15 + 6 × 4?',
    acceptedAnswers: ['39', 'thirty-nine', 'thirty nine'],
    keywords: ['39', 'thirty-nine', 'thirty nine'],
    hints: [
      'Remember the standard order of operations (PEMDAS / BODMAS).',
      'Multiplication must be calculated before addition: compute 6 × 4 first.'
    ],
    explanation: 'By order of operations, 6 × 4 = 24. Then 15 + 24 = 39.',
    options: ['39', '84', '54', '42']
  },
  {
    id: 'math-e2',
    zone: 'math',
    difficulty: 'easy',
    question: 'If half of a certain number is 42, what is three times that original number?',
    acceptedAnswers: ['252', 'two hundred fifty two', 'two hundred and fifty-two'],
    keywords: ['252'],
    hints: [
      'First double 42 to find the original number.',
      'Original number = 84. Now calculate 84 × 3.'
    ],
    explanation: 'If half is 42, the number is 84. Then 3 × 84 = 252.',
    options: ['252', '126', '168', '210']
  },
  {
    id: 'math-m1',
    zone: 'math',
    difficulty: 'medium',
    question: 'A baseball bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    acceptedAnswers: ['5 cents', '0.05', '$0.05', '5c', 'five cents', '0.05 dollars', '5'],
    keywords: ['0.05', '5 cents', '5c', 'five cents', '5'],
    hints: [
      'Do not say 10 cents! If the ball were 10 cents, the bat would be $1.10, making the total $1.20.',
      'Set up the equation: Bat + Ball = 1.10, where Bat = Ball + 1.00.'
    ],
    explanation: 'Ball + (Ball + $1.00) = $1.10 => 2 × Ball = $0.10 => Ball = $0.05 (5 cents). Bat is $1.05.',
    options: ['5 cents ($0.05)', '10 cents ($0.10)', '1 cent ($0.01)', '15 cents ($0.15)']
  },
  {
    id: 'math-m2',
    zone: 'math',
    difficulty: 'medium',
    question: 'What is the next number in this mathematical series: 2, 6, 12, 20, 30, ?',
    acceptedAnswers: ['42', 'forty two', 'forty-two'],
    keywords: ['42'],
    hints: [
      'Examine the differences between consecutive terms: +4, +6, +8, +10...',
      'Alternatively, observe n × (n + 1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7.'
    ],
    explanation: 'The differences increment by 2 each step (+4, +6, +8, +10, +12). 30 + 12 = 42 (or 6 × 7 = 42).',
    options: ['42', '40', '48', '36']
  },
  {
    id: 'math-h1',
    zone: 'math',
    difficulty: 'hard',
    question: 'If 5 machines take 5 minutes to make 5 widgets, how many minutes would it take 100 machines to make 100 widgets?',
    acceptedAnswers: ['5', '5 minutes', 'five', 'five minutes'],
    keywords: ['5', 'five'],
    hints: [
      'Think about the rate of a single machine: how long does 1 machine take to make 1 widget?',
      'Since 1 machine makes 1 widget in 5 minutes, 100 machines working in parallel make 100 widgets in that same time.'
    ],
    explanation: 'Each machine produces 1 widget in 5 minutes. Therefore, 100 machines working simultaneously produce 100 widgets in exactly 5 minutes.',
    options: ['5 minutes', '100 minutes', '20 minutes', '1 minute']
  },
  {
    id: 'math-h2',
    zone: 'math',
    difficulty: 'hard',
    question: 'What is the sum of all integers from 1 to 50?',
    acceptedAnswers: ['1275', 'one thousand two hundred seventy five'],
    keywords: ['1275'],
    hints: [
      'Use Gauss\'s formula: Sum = n × (n + 1) / 2.',
      'Multiply 50 × 51 and divide the product by 2.'
    ],
    explanation: 'Using the formula n(n+1)/2 with n = 50: 50 × 51 / 2 = 25 × 51 = 1,275.',
    options: ['1275', '1250', '1325', '1225']
  },

  // ================= LOGICAL REASONING =================
  {
    id: 'log-e1',
    zone: 'logic',
    difficulty: 'easy',
    question: 'All squares are rectangles. All rectangles are polygons. Are all squares polygons? (Answer Yes or No)',
    acceptedAnswers: ['yes', 'true', 'definitely yes', 'y'],
    keywords: ['yes', 'true'],
    hints: [
      'This follows the transitive property of categorical logic (if A is B and B is C, then A is C).',
      'Since every square falls into the rectangle category, and every rectangle falls into polygon.'
    ],
    explanation: 'Yes! By logical deduction, since the subset of squares is contained within rectangles, which is contained within polygons, all squares are polygons.',
    options: ['Yes', 'No', 'Only some', 'Cannot determine']
  },
  {
    id: 'log-e2',
    zone: 'logic',
    difficulty: 'easy',
    question: 'You are competing in a 100m sprint and you overtake the runner who is in second place. What position are you currently in?',
    acceptedAnswers: ['second', '2nd', 'second place', '2'],
    keywords: ['second', '2nd', '2'],
    hints: [
      'Do not say first place! You only overtook the person who was second.',
      'You took their spot, so you are now in...'
    ],
    explanation: 'By overtaking the runner in second place, you take over second place. The leader is still ahead of you!',
    options: ['Second place', 'First place', 'Third place', 'Last place']
  },
  {
    id: 'log-m1',
    zone: 'logic',
    difficulty: 'medium',
    question: 'On an island, Knights always tell the truth and Knaves always lie. You meet Jack and Jill. Jack says: "At least one of us is a Knave." What is Jack: Knight or Knave?',
    acceptedAnswers: ['knight', 'a knight'],
    keywords: ['knight'],
    hints: [
      'If Jack were a Knave, his statement would be false, meaning neither is a Knave (both are Knights), which creates an impossible contradiction.',
      'Therefore, Jack must be telling the truth.'
    ],
    explanation: 'If Jack were a Knave, his statement would be a lie, meaning neither is a Knave (both Knights), which contradicts Jack being a Knave. Thus Jack is a Knight (and Jill is a Knave).',
    options: ['Knight', 'Knave', 'Neither', 'Impossible to tell']
  },
  {
    id: 'log-m2',
    zone: 'logic',
    difficulty: 'medium',
    question: 'Five sprinters (A, B, C, D, E) run a race. A finishes ahead of B, but behind C. D finishes ahead of C, but behind E. Who finished in 1st place?',
    acceptedAnswers: ['e', 'runner e'],
    keywords: ['e'],
    hints: [
      'Order them from fastest to slowest step by step.',
      'From statements: C > A > B, and E > D > C. Combining gives E > D > C > A > B.'
    ],
    explanation: 'Combining the relative positions: E > D > C > A > B. Therefore Runner E finished in 1st place.',
    options: ['E', 'D', 'C', 'A']
  },
  {
    id: 'log-h1',
    zone: 'logic',
    difficulty: 'hard',
    question: 'A doctor gives you 3 pills and tells you to take one every half hour. How many minutes will the pills last from the first pill to the last pill?',
    acceptedAnswers: ['60', '60 minutes', 'sixty', 'sixty minutes', '1 hour', 'one hour'],
    keywords: ['60', 'sixty', '1 hour', 'one hour'],
    hints: [
      'You take the first pill immediately at minute 0.',
      'You take the second pill at minute 30. When do you take the third pill?'
    ],
    explanation: 'Pill 1 at 0 mins, Pill 2 at 30 mins, Pill 3 at 60 mins. The total duration elapsed is 60 minutes (1 hour).',
    options: ['60 minutes (1 hour)', '90 minutes (1.5 hours)', '30 minutes', '120 minutes']
  },

  // ================= GENERAL KNOWLEDGE =================
  {
    id: 'gk-e1',
    zone: 'gk',
    difficulty: 'easy',
    question: 'Which planet in our solar system is famously known as the "Red Planet"?',
    acceptedAnswers: ['mars', 'planet mars'],
    keywords: ['mars'],
    hints: [
      'It is the 4th planet from the Sun and has rovers like Curiosity and Perseverance exploring its rusty surface.',
      'Named after the Roman god of war.'
    ],
    explanation: 'Mars appears reddish in the night sky due to the prevalence of iron oxide (rust) on its surface.',
    options: ['Mars', 'Venus', 'Jupiter', 'Mercury']
  },
  {
    id: 'gk-e2',
    zone: 'gk',
    difficulty: 'easy',
    question: 'What is the largest living mammal on planet Earth?',
    acceptedAnswers: ['blue whale', 'the blue whale', 'whale'],
    keywords: ['blue whale', 'whale'],
    hints: [
      'It lives in the ocean and can weigh up to 200 metric tons.',
      'Its tongue alone can weigh as much as an elephant.'
    ],
    explanation: 'The Blue Whale (Balaenoptera musculus) is the largest animal known to have ever existed.',
    options: ['Blue whale', 'African elephant', 'Colossal squid', 'Fin whale']
  },
  {
    id: 'gk-m1',
    zone: 'gk',
    difficulty: 'medium',
    question: 'What is the hardest naturally occurring mineral substance found on Earth?',
    acceptedAnswers: ['diamond', 'a diamond', 'diamonds'],
    keywords: ['diamond'],
    hints: [
      'It scores a 10 on the Mohs mineral hardness scale.',
      'Formed deep within the Earth under extreme heat and pressure from pure carbon atoms.'
    ],
    explanation: 'Diamond is an allotrope of carbon where each atom is bonded to 4 others in a rigid tetrahedral lattice, making it the hardest natural mineral.',
    options: ['Diamond', 'Corundum', 'Titanium', 'Quartz']
  },
  {
    id: 'gk-m2',
    zone: 'gk',
    difficulty: 'medium',
    question: 'What is the chemical symbol for the precious metal Gold on the Periodic Table?',
    acceptedAnswers: ['au'],
    keywords: ['au'],
    hints: [
      'It comes from the Latin word "Aurum", meaning shining dawn.',
      'It is a two-letter symbol starting with A.'
    ],
    explanation: 'Gold has the chemical symbol "Au", derived from the Latin word "Aurum".',
    options: ['Au', 'Ag', 'Gd', 'Go']
  },
  {
    id: 'gk-h1',
    zone: 'gk',
    difficulty: 'hard',
    question: 'What is the only mammal on Earth that is capable of true, sustained powered flight?',
    acceptedAnswers: ['bat', 'bats', 'the bat', 'fruit bat', 'vampire bat'],
    keywords: ['bat', 'bats'],
    hints: [
      'Creatures like flying squirrels and sugar gliders only glide; this creature flaps modified webbed finger wings.',
      'They are nocturnal and navigate using echolocation.'
    ],
    explanation: 'Bats (order Chiroptera) are the only mammals capable of true sustained flight with aerodynamic wing flapping.',
    options: ['Bat', 'Flying squirrel', 'Sugar glider', 'Colugo']
  },
  {
    id: 'gk-h2',
    zone: 'gk',
    difficulty: 'hard',
    question: 'Which ancient wonder of the world is the only one that remains largely intact today?',
    acceptedAnswers: ['great pyramid of giza', 'pyramid of giza', 'pyramids of giza', 'giza pyramid', 'great pyramid'],
    keywords: ['pyramid', 'giza'],
    hints: [
      'Built around 2560 BC as a tomb for Pharaoh Khufu.',
      'Located near Cairo, Egypt.'
    ],
    explanation: 'The Great Pyramid of Giza (Khufu) is the oldest and only surviving monument of the original Seven Wonders of the Ancient World.',
    options: ['Great Pyramid of Giza', 'Hanging Gardens of Babylon', 'Colossus of Rhodes', 'Lighthouse of Alexandria']
  },

  // ================= MEMORY CHALLENGE =================
  {
    id: 'mem-e1',
    zone: 'memory',
    difficulty: 'easy',
    question: 'Memory Retention Phase: Memorize these 4 colorful items in order: [RUBY, EMERALD, SAPPHIRE, TOPAZ]. Then tell me: What was the 3rd gem?',
    acceptedAnswers: ['sapphire', 'the sapphire', '3rd is sapphire', 'third is sapphire'],
    keywords: ['sapphire'],
    hints: [
      'It was the blue precious gemstone.',
      'The order was: 1. Ruby, 2. Emerald, 3. ???, 4. Topaz.'
    ],
    explanation: 'The 4 items were: 1. Ruby, 2. Emerald, 3. Sapphire, 4. Topaz. The 3rd gem is Sapphire!',
    memoryItems: ['RUBY', 'EMERALD', 'SAPPHIRE', 'TOPAZ'],
    memoryDisplayDuration: 6,
    memoryQuestion: 'What was the 3rd gem in the sequence?',
    options: ['Sapphire', 'Emerald', 'Ruby', 'Topaz']
  },
  {
    id: 'mem-e2',
    zone: 'memory',
    difficulty: 'easy',
    question: 'Memory Retention Phase: Remember these 4 numbers: [14, 82, 39, 56]. What was the last number?',
    acceptedAnswers: ['56', 'fifty six', 'fifty-six'],
    keywords: ['56'],
    hints: [
      'It ends with a 6.',
      'The sequence was [14, 82, 39, 56].'
    ],
    explanation: 'The numbers were [14, 82, 39, 56]. The 4th and last number is 56!',
    memoryItems: ['14', '82', '39', '56'],
    memoryDisplayDuration: 6,
    memoryQuestion: 'What was the last (4th) number in the sequence?',
    options: ['56', '39', '82', '14']
  },
  {
    id: 'mem-m1',
    zone: 'memory',
    difficulty: 'medium',
    question: 'Memory Retention Phase: Remember these 5 space objects: [COMET, NEBULA, PULSAR, GALAXY, QUASAR]. Which object appeared directly between NEBULA and GALAXY?',
    acceptedAnswers: ['pulsar', 'the pulsar'],
    keywords: ['pulsar'],
    hints: [
      'It is a highly magnetized rotating neutron star.',
      'Order: Comet, Nebula, ???, Galaxy, Quasar.'
    ],
    explanation: 'The list was [COMET, NEBULA, PULSAR, GALAXY, QUASAR]. The item between NEBULA and GALAXY was PULSAR!',
    memoryItems: ['COMET', 'NEBULA', 'PULSAR', 'GALAXY', 'QUASAR'],
    memoryDisplayDuration: 6,
    memoryQuestion: 'Which object appeared directly between NEBULA and GALAXY?',
    options: ['PULSAR', 'COMET', 'QUASAR', 'ASTEROID']
  },
  {
    id: 'mem-m2',
    zone: 'memory',
    difficulty: 'medium',
    question: 'Memory Retention Phase: Remember this 5-digit security code: [9, 3, 7, 1, 8]. What is the sum of the 1st and 5th digits?',
    acceptedAnswers: ['17', 'seventeen'],
    keywords: ['17', 'seventeen'],
    hints: [
      'The 1st digit was 9. The 5th digit was 8.',
      'Add 9 + 8.'
    ],
    explanation: 'The 1st digit was 9 and the 5th was 8. 9 + 8 = 17!',
    memoryItems: ['9', '3', '7', '1', '8'],
    memoryDisplayDuration: 6,
    memoryQuestion: 'What was the sum of the 1st digit and the 5th digit?',
    options: ['17', '16', '18', '12']
  },
  {
    id: 'mem-h1',
    zone: 'memory',
    difficulty: 'hard',
    question: 'Memory Retention Phase: Memorize this 6-word mnemonic cipher: [PHOENIX, QUANTUM, VORTEX, HORIZON, CIPHER, ZENITH]. What was the word right before CIPHER?',
    acceptedAnswers: ['horizon', 'the horizon'],
    keywords: ['horizon'],
    hints: [
      'It represents where the earth meets the sky.',
      'The sequence: Phoenix, Quantum, Vortex, ???, Cipher, Zenith.'
    ],
    explanation: 'The sequence was [Phoenix, Quantum, Vortex, Horizon, Cipher, Zenith]. The word before Cipher was Horizon!',
    memoryItems: ['PHOENIX', 'QUANTUM', 'VORTEX', 'HORIZON', 'CIPHER', 'ZENITH'],
    memoryDisplayDuration: 5,
    memoryQuestion: 'What was the word positioned right before CIPHER?',
    options: ['HORIZON', 'VORTEX', 'QUANTUM', 'ZENITH']
  }
];

export const WELCOME_MESSAGE = `⚡ **WELCOME TO BRAIN BATTLE!** ⚡
I am **Cortex**, your interactive brain challenge master. 

Here, your intellect is put to the ultimate test across 6 specialized battle zones:
• 🔮 **Riddle Zone** — Devious wordplay & metaphorical puzzles
• 🧩 **Puzzle Zone** — Lateral thinking brain-twisters
• 🧮 **Math Challenge** — Speed mental arithmetic & numerical teasers
• 🧭 **Logical Reasoning** — Syllogisms, deductions & order rankings
• 🌍 **General Knowledge** — Science, nature, geography & world wonders
• 🧠 **Memory Challenge** — High-speed working memory retention

🎯 **Game Rules:**
- Choose your **Difficulty Level**: Easy (35s, 10pts), Medium (25s, 20pts), or Hard (15s, 30pts).
- Answer before the timer ticks out to score points and build a **Streak Multiplier**!
- Stuck? Type **"hint"** or click **💡 Request Hint** for clues.
- Type **"menu"**, **"help"**, or **"restart"** anytime to navigate.

Ready to challenge your mind and unlock your intelligence? Choose a zone below or type what you want to play!`;
