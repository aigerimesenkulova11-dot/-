import React from 'react';
import { FrameResult } from '../types/game';
import { Trophy, Zap, Target } from 'lucide-react';

interface ScoreBoardProps {
  frames: FrameResult[];
  currentFrameIndex: number;
  currentRollIndex: 1 | 2 | 3;
  totalScore: number;
  strikesCount: number;
  sparesCount: number;
  playerName: string;
  difficultyLabel: string;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  frames,
  currentFrameIndex,
  currentRollIndex,
  totalScore,
  strikesCount,
  sparesCount,
  playerName,
  difficultyLabel
}) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/80 p-3 sm:p-4 shadow-xl backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white shadow-md">
            🎳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm sm:text-base font-sans">
                {playerName || 'Оюнчу'}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {difficultyLabel}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Фрейм: <span className="text-sky-300 font-semibold">{currentFrameIndex + 1} / {frames.length}</span> • 
              Ыргытуу: <span className="text-emerald-300 font-semibold">{currentRollIndex}-ыргытуу</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{strikesCount} Страйк</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300">
            <Target className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold">{sparesCount} Спээр</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-['Chakra_Petch',sans-serif] font-bold shadow-md shadow-emerald-900/30">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-sm tracking-wider">{totalScore} Упай</span>
          </div>
        </div>
      </div>

      {/* 10-Frame Bowling Scoreboard Grid */}
      <div className="overflow-x-auto pb-1 scrollbar-thin">
        <div className="grid grid-flow-col auto-cols-[minmax(60px,1fr)] sm:auto-cols-[minmax(72px,1fr)] gap-1.5 min-w-[620px]">
          {frames.map((frame, idx) => {
            const isCurrent = idx === currentFrameIndex;
            const is10th = idx === frames.length - 1;

            const formatRoll = (val: number | null, isFirst: boolean, isSecond: boolean) => {
              if (val === null) return '';
              if (val === 10 && (isFirst || is10th)) return 'X';
              if (val === 0) return '-';
              if (isSecond && !is10th && (frame.roll1 ?? 0) + val === 10) return '/';
              return String(val);
            };

            return (
              <div
                key={frame.frameNumber}
                className={`flex flex-col rounded-xl overflow-hidden border transition-all ${
                  isCurrent
                    ? 'border-amber-400 ring-2 ring-amber-400/30 bg-slate-800 shadow-lg shadow-amber-500/10'
                    : frame.roll1 !== null
                    ? 'border-slate-700 bg-slate-800/70'
                    : 'border-slate-800 bg-slate-900/50 opacity-70'
                }`}
              >
                {/* Frame Number Bar */}
                <div
                  className={`text-center py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {frame.frameNumber}
                </div>

                {/* Rolls Boxes */}
                <div className="flex border-b border-slate-700/80 h-7 text-xs font-bold font-mono">
                  {/* Roll 1 */}
                  <div className="flex-1 flex items-center justify-center text-slate-200">
                    {formatRoll(frame.roll1, true, false)}
                  </div>

                  {/* Roll 2 */}
                  <div className="flex-1 flex items-center justify-center border-l border-slate-700/80 text-amber-300 bg-slate-900/40">
                    {formatRoll(frame.roll2, false, true)}
                  </div>

                  {/* Optional Roll 3 for Frame 10 */}
                  {is10th && (
                    <div className="flex-1 flex items-center justify-center border-l border-slate-700/80 text-emerald-300 bg-slate-900/60">
                      {frame.roll3 !== null && frame.roll3 !== undefined
                        ? frame.roll3 === 10
                          ? 'X'
                          : frame.roll3 === 0
                          ? '-'
                          : frame.roll3
                        : ''}
                    </div>
                  )}
                </div>

                {/* Cumulative Running Score */}
                <div className="h-7 flex items-center justify-center font-['Chakra_Petch',sans-serif] font-black text-sm text-slate-100">
                  {frame.score > 0 || frame.roll1 !== null ? frame.score : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
