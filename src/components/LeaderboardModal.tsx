import React, { useState } from 'react';
import { LeaderboardEntry, Difficulty } from '../types/game';
import { getLeaderboard, filterLeaderboard } from '../utils/leaderboard';
import { Trophy, Medal, X, Search, Zap, Target, Star } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightId?: string | null;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  highlightId
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const allEntries = getLeaderboard();
  const filtered = filterLeaderboard(allEntries, selectedDifficulty, selectedGrade).filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(entry.grade).includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-600/30 via-slate-800 to-indigo-900/30 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-['Chakra_Petch',sans-serif] tracking-wide">
                ЛИДЕРЛЕР ТАКТАСЫ
              </h2>
              <p className="text-xs text-slate-400">
                5-8-класстын эң жогорку упай топтогон чемпиондору
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Окуучунун аты же класс боюнча издөө..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
              {[
                { id: 'all', label: 'Бардык деңгээл' },
                { id: 'easy', label: 'Жеңил (5-кл)' },
                { id: 'medium', label: 'Орто (6-7 кл)' },
                { id: 'hard', label: 'Татаал (7-8 кл)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDifficulty(tab.id as Difficulty | 'all')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    selectedDifficulty === tab.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grade filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Класс:</span>
              {(['all', 5, 6, 7, 8] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-2 py-1 rounded-lg border font-semibold transition ${
                    selectedGrade === g
                      ? 'bg-sky-500 text-white border-sky-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {g === 'all' ? 'Баары' : `${g}-кл`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Medal className="w-12 h-12 text-slate-600 mx-auto mb-2 opacity-50" />
              <p>Бул категорияда рекорддор азырынча жок.</p>
              <p className="text-xs text-slate-500 mt-1">Оюнду баштап, өз ысымыңызды биринчилерден болуп жазыңыз!</p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isHighlight = highlightId === item.id;
              const rank = index + 1;

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all ${
                    isHighlight
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                      : rank === 1
                      ? 'bg-gradient-to-r from-amber-500/10 via-slate-800 to-slate-800/80 border-amber-500/40'
                      : rank === 2
                      ? 'bg-gradient-to-r from-slate-300/10 via-slate-800 to-slate-800/80 border-slate-400/40'
                      : rank === 3
                      ? 'bg-gradient-to-r from-amber-700/10 via-slate-800 to-slate-800/80 border-amber-700/40'
                      : 'bg-slate-800/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                      {rank === 1 ? (
                        <span className="text-xl">🥇</span>
                      ) : rank === 2 ? (
                        <span className="text-xl">🥈</span>
                      ) : rank === 3 ? (
                        <span className="text-xl">🥉</span>
                      ) : (
                        <span className="text-slate-400 font-mono font-bold">#{rank}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 text-sm sm:text-base font-sans">
                          {item.name}
                        </span>
                        {isHighlight && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Сиздин жыйынтык
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-slate-700 text-slate-300 font-medium">
                          {item.grade}-класс
                        </span>
                        <span>•</span>
                        <span className="capitalize text-amber-300/90">
                          {item.difficulty === 'easy'
                            ? 'Жеңил'
                            : item.difficulty === 'medium'
                            ? 'Орто'
                            : 'Татаал'}
                        </span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score & Badges */}
                  <div className="flex items-center gap-3 sm:gap-5 text-right">
                    <div className="hidden sm:flex flex-col text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-amber-300 font-semibold justify-end">
                        <Zap className="w-3 h-3 fill-amber-400" /> {item.strikes} страйк
                      </span>
                      <span className="flex items-center gap-1 text-sky-300 justify-end">
                        <Target className="w-3 h-3" /> {item.spares} спээр
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xl sm:text-2xl font-black text-amber-400 font-['Chakra_Petch',sans-serif]">
                        {item.score}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.accuracy}% тактык
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Страйктар жана туура эсептөөлөр көп упай берет!</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Жабуу
          </button>
        </div>
      </div>
    </div>
  );
};
