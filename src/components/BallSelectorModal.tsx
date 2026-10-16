import React from 'react';
import { BallSkin } from '../types/game';
import { BALL_SKINS } from '../data/ballSkins';
import { X, Check } from 'lucide-react';

interface BallSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBallId: string;
  onSelectBall: (ball: BallSkin) => void;
}

export const BallSelectorModal: React.FC<BallSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedBallId,
  onSelectBall
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div>
            <h2 className="text-lg font-black text-white font-['Chakra_Petch',sans-serif]">
              БОУЛИНГ ШАРЫН ТАНДОО
            </h2>
            <p className="text-xs text-slate-400">
              Өзүңүзгө жаккан шарды тандап, рекорд коюңуз!
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skins Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {BALL_SKINS.map((ball) => {
            const isSelected = selectedBallId === ball.id;

            return (
              <button
                key={ball.id}
                onClick={() => {
                  onSelectBall(ball);
                  onClose();
                }}
                className={`flex items-center gap-3.5 p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                    : 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {/* 3D Ball Graphic */}
                <div
                  className="w-12 h-12 rounded-full relative shrink-0 shadow-md flex items-center justify-center border border-white/20"
                  style={{
                    background: ball.gradient,
                    boxShadow: `0 4px 12px ${ball.shadow}`
                  }}
                >
                  <div className="absolute top-2 left-2.5 w-1.5 h-1.5 rounded-full bg-slate-950" />
                  <div className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-slate-950" />
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-950" />
                  <span className="text-xs">{ball.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-sm truncate font-sans">
                      {ball.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {ball.description}
                  </p>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Салмагы: {ball.weight}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20"
          >
            Даяр
          </button>
        </div>
      </div>
    </div>
  );
};
