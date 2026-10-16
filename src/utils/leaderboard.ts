import { LeaderboardEntry, Difficulty } from '../types/game';

const STORAGE_KEY = 'math_bowling_leaderboard_v1';

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    name: 'Айбек Маратов',
    grade: 8,
    difficulty: 'hard',
    score: 284,
    strikes: 8,
    spares: 2,
    accuracy: 100,
    date: '2026-10-14',
    ballName: 'Алтын Чемпион'
  },
  {
    id: 'lead-2',
    name: 'Айпери Асанова',
    grade: 7,
    difficulty: 'hard',
    score: 265,
    strikes: 7,
    spares: 3,
    accuracy: 95,
    date: '2026-10-15',
    ballName: 'Аалам сыры'
  },
  {
    id: 'lead-3',
    name: 'Нурсултан Кадыров',
    grade: 7,
    difficulty: 'medium',
    score: 250,
    strikes: 7,
    spares: 2,
    accuracy: 90,
    date: '2026-10-12',
    ballName: 'Оттуу Лава'
  },
  {
    id: 'lead-4',
    name: 'Арууке Бакытова',
    grade: 6,
    difficulty: 'medium',
    score: 238,
    strikes: 6,
    spares: 4,
    accuracy: 100,
    date: '2026-10-13',
    ballName: 'Изумруд Кристалл'
  },
  {
    id: 'lead-5',
    name: 'Чыңгыз Токтогулов',
    grade: 5,
    difficulty: 'easy',
    score: 225,
    strikes: 5,
    spares: 4,
    accuracy: 90,
    date: '2026-10-15',
    ballName: 'Классикалык Неон'
  },
  {
    id: 'lead-6',
    name: 'Дильназ Эркинова',
    grade: 5,
    difficulty: 'easy',
    score: 210,
    strikes: 5,
    spares: 3,
    accuracy: 85,
    date: '2026-10-11',
    ballName: 'Оттуу Лава'
  },
  {
    id: 'lead-7',
    name: 'Эмир Исмаилов',
    grade: 6,
    difficulty: 'medium',
    score: 198,
    strikes: 4,
    spares: 5,
    accuracy: 85,
    date: '2026-10-10',
    ballName: 'Аалам сыры'
  }
];

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse leaderboard', e);
  }
  return INITIAL_LEADERBOARD;
}

export function saveLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: 'score-' + Date.now(),
    date: new Date().toISOString().split('T')[0]
  };

  const updated = [...current, newEntry];
  // Sort descending by score
  updated.sort((a, b) => b.score - a.score);

  // Keep top 50
  const topList = updated.slice(0, 50);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topList));
  } catch (e) {
    console.error('Failed to save leaderboard', e);
  }

  return newEntry;
}

export function filterLeaderboard(
  entries: LeaderboardEntry[],
  difficulty: Difficulty | 'all',
  grade: number | 'all'
): LeaderboardEntry[] {
  return entries.filter(entry => {
    if (difficulty !== 'all' && entry.difficulty !== difficulty) return false;
    if (grade !== 'all' && entry.grade !== grade) return false;
    return true;
  });
}
