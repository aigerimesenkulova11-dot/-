import React, { useState, useEffect } from 'react';
import { Difficulty, BallSkin } from '../types/game';
import { saveLeaderboardEntry } from '../utils/leaderboard';
import confetti from 'canvas-confetti';
import { Trophy, Zap, Target, Star, RotateCcw, Award } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  strikes: number;
  spares: number;
  accuracy: number;
  difficulty: Difficulty;
  ballSkin: BallSkin;
  onPlayAgain: () => void;
  onViewLeaderboard: (savedId: string) => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  strikes,
  spares,
  accuracy,
  difficulty,
  ballSkin,
  onPlayAgain,
  onViewLeaderboard
}) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number>(() => {
    if (difficulty === 'easy') return 5;
    if (difficulty === 'medium') return 6;
    return 7;
  });
  const [isSaved, setIsSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setIsSaved(false);
    setErrorMsg('');

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Title rank based on score
  const getRankTitle = () => {
    if (score >= 240) return { title: 'МАТЕМАТИКАЛЫК ГРОССМЕЙСТЕР! 🏆', desc: 'Укмуштуудай так эсептөө жана чебер боулингчи!' };
    if (score >= 180) return { title: 'БОУЛИНГ ЧЕМПИОНУ! 🥇', desc: 'Эң сонун жыйынтык! Мыкты даярдык!' };
    if (score >= 120) return { title: 'ЧЕБЕР ОКУУЧУ! 🥈', desc: 'Жакшы ойнодуңуз! Дагы бир аз машыгуу менен рекорд жаңыртасыз!' };
    return { title: 'ТАЛАНТТУУ МАТЕМАТИК! 🥉', desc: 'Ар бир оюн сизге жаңы тажрыйба берет!' };
  };

  const rankInfo = getRankTitle();

  const handleSaveToLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setErrorMsg('Сураныч, ысымыңызды же фамилияңызды жазыңыз');
      return;
    }

    const saved = saveLeaderboardEntry({
      name: playerName.trim(),
      grade: selectedGrade,
      difficulty,
      score,
      strikes,
      spares,
      accuracy,
      ballName: ballSkin.name
    });

    setIsSaved(true);
    setTimeout(() => {
      onViewLeaderboard(saved.id);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden p-6 text-center">
        {/* Glow backdrop */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none" />

        {/* Trophy icon */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/30 animate-bounce">
          <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-amber-400">
            <Trophy className="w-9 h-9" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-amber-300 font-['Chakra_Petch',sans-serif] tracking-wide">
          {rankInfo.title}
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
          {rankInfo.desc}
        </p>

        {/* Final Score Circle */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Жалпы Топтогон Упайыңыз
          </div>
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 font-['Chakra_Petch',sans-serif] my-1">
            {score}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Zap className="w-3.5 h-3.5 fill-amber-400" /> {strikes}
              </span>
              <span className="text-[11px] text-slate-400">Страйк</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-800">
              <span className="flex items-center gap-1 text-sky-400 font-bold">
                <Target className="w-3.5 h-3.5" /> {spares}
              </span>
              <span className="text-[11px] text-slate-400">Спээр</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-emerald-400" /> {accuracy}%
              </span>
              <span className="text-[11px] text-slate-400">Тактык</span>
            </div>
          </div>
        </div>

        {/* Save to Leaderboard Form */}
        {!isSaved ? (
          <form onSubmit={handleSaveToLeaderboard} className="space-y-3 my-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Лидерлер тактасына ысымыңызды жазыңыз:
              </label>
              <input
                type="text"
                placeholder="Мис: Азамат Бекболотов"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
              {errorMsg && <p className="text-xs text-rose-400 mt-1">{errorMsg}</p>}
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Классты тандаңыз:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 6, 7, 8].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`py-1.5 rounded-xl border text-xs font-bold transition ${
                      selectedGrade === g
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {g}-класс
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition transform active:scale-98"
            >
              <Award className="w-4 h-4" />
              <span>Лидерлер тактасына сактоо</span>
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs my-4 font-semibold">
            🎉 Жыйынтыгыңыз Лидерлер тактасына ийгиликтүү жазылды!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onPlayAgain}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Кайра ойноо</span>
          </button>
          <button
            onClick={() => onViewLeaderboard('')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Тактаны көрүү</span>
          </button>
        </div>
      </div>
    </div>
  );
};
