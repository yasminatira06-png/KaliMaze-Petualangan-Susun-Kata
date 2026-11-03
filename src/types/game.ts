export type GameScreen =
  | 'SPLASH'
  | 'MENU'
  | 'LEVEL_SELECT'
  | 'GAMEPLAY'
  | 'REWARD'
  | 'GUIDE'
  | 'ABOUT'
  | 'SETTINGS';

export interface Question {
  id: string;
  levelId: number;
  questionNumber: number; // 1 to 5
  originalWords: string[]; // correct tokens in order
  scrambledWords: string[]; // randomized
  targetSentence: string; // full sentence with punctuation
  hint: string;
  category: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan' | 'Mahir';
}

export interface LevelData {
  id: number;
  title: string;
  theme: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan' | 'Mahir';
  questions: Question[];
}

export interface UserProgress {
  unlockedLevels: number[];
  completedLevels: number[];
  levelStars: Record<number, number>; // levelId -> 1..3
  levelHighScores: Record<number, number>; // levelId -> score
  totalScore: number;
  musicEnabled: boolean;
  soundEnabled: boolean;
  musicVolume: number; // 0 to 1
  soundVolume: number; // 0 to 1
  lastPlayedLevel?: number;
}

export interface LevelResult {
  levelId: number;
  score: number;
  correctFirstTryCount: number;
  totalQuestions: number;
  totalAttempts: number;
  stars: number;
  isNewBest: boolean;
}
