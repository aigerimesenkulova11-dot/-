export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameMode = 'tournament' | 'quick' | 'practice';

export interface MathQuestion {
  id: string;
  grade: 5 | 6 | 7 | 8;
  difficulty: Difficulty;
  category: string; // e.g., 'Арифметика', 'Бөлчөктөр', 'Теңдемелер', 'Даражалар', 'Пайыздар', 'Геометрия'
  question: string;
  formula?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface FrameResult {
  frameNumber: number;
  roll1: number | null; // pins knocked down (0-10)
  roll2: number | null; // pins knocked down in roll 2 (0-10)
  roll3?: number | null; // for 10th frame
  isStrike: boolean;
  isSpare: boolean;
  score: number; // cumulative score up to this frame
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  grade: number; // 5, 6, 7, 8
  difficulty: Difficulty;
  score: number;
  strikes: number;
  spares: number;
  accuracy: number; // percentage
  date: string;
  ballName: string;
}

export interface BallSkin {
  id: string;
  name: string;
  description: string;
  color: string;
  accent: string;
  gradient: string;
  shadow: string;
  weight: string;
  icon: string;
}
