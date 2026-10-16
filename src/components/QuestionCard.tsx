import React, { useState, useEffect } from 'react';
import { MathQuestion } from '../types/game';
import { HelpCircle, Sparkles, Clock, PenTool, CheckCircle2, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: MathQuestion;
  rollNumber: 1 | 2;
  pinsLeft: number;
  onAnswerSelected: (selectedIndex: number, timeSpentSec: number) => void;
  disabled: boolean;
  onOpenScratchpad: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  rollNumber,
  pinsLeft,
  onAnswerSelected,
  disabled,
  onOpenScratchpad
}) => {
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Reset state on question change
  useEffect(() => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setShowHint(false);
    setSeconds(0);
  }, [question.id]);

  // Timer counter
  useEffect(() => {
    if (disabled || hasSubmitted) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [disabled, hasSubmitted, question.id]);

  const handleSelect = (idx: number) => {
    if (disabled || hasSubmitted) return;
    setSelectedAnswer(idx);
    setHasSubmitted(true);
    onAnswerSelected(idx, seconds);
  };

  // Keyboard shortcut listener (1,2,3,4 or A,B,C,D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || hasSubmitted) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (idx >= 0 && idx < question.options.length) {
          handleSelect(idx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, hasSubmitted, question.options.length]);

  const formatFormula = (raw?: string) => {
    if (!raw) return '';
    return raw
      .replace(/\\times/g, '×')
      .replace(/\\div/g, '÷')
      .replace(/\\pmod/g, 'mod')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
      .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
      .replace(/\\begin\{cases\}/g, '{ ')
      .replace(/\\end\{cases\}/g, ' }')
      .replace(/\\\\/g, ' ; ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\^\\circ/g, '°');
  };

  const renderMathText = (text: string) => {
    const parts = text.split(/(\^[0-9a-zA-Z]+|[²³⁴⁵⁶⁷⁸⁹])/g);
    return parts.map((part, i) => {
      if (part.startsWith('^')) {
        return <sup key={i} className="text-[0.7em] font-bold">{part.slice(1)}</sup>;
      }
      if (part === '²') return <sup key={i} className="text-[0.7em] font-bold">2</sup>;
      if (part === '³') return <sup key={i} className="text-[0.7em] font-bold">3</sup>;
      if (part === '⁴') return <sup key={i} className="text-[0.7em] font-bold">4</sup>;
      if (part === '⁵') return <sup key={i} className="text-[0.7em] font-bold">5</sup>;
      if (part === '⁶') return <sup key={i} className="text-[0.7em] font-bold">6</sup>;
      if (part === '⁷') return <sup key={i} className="text-[0.7em] font-bold">7</sup>;
      if (part === '⁸') return <sup key={i} className="text-[0.7em] font-bold">8</sup>;
      if (part === '⁹') return <sup key={i} className="text-[0.7em] font-bold">9</sup>;
      return part;
    });
  };

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Top Header info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs border border-sky-500/30">
            {question.grade}-класс
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-medium text-xs border border-indigo-500/30">
            {question.category}
          </span>
          {rollNumber === 2 && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 animate-pulse">
              🎯 Спээр үчүн! (Калган {pinsLeft} кегли)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Scratchpad button */}
          <button
            onClick={onOpenScratchpad}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition"
          >
            <PenTool className="w-3.5 h-3.5 text-amber-400" />
            <span>Каралама</span>
          </button>

          {/* Time & speed bonus indicator */}
          <div className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{seconds} сек</span>
            {seconds <= 15 && (
              <span className="ml-1 text-[10px] text-emerald-400 font-bold">+Бонус</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Question Display */}
      <div className="py-4 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-sans leading-relaxed">
          {renderMathText(question.question)}
        </h3>

        {/* Highlighted Math Formula Box */}
        {question.formula && (
          <div className="my-3 inline-block px-6 py-2 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-300 font-mono text-xl sm:text-2xl font-bold shadow-inner">
            {renderMathText(formatFormula(question.formula))}
          </div>
        )}
      </div>

      {/* 4 Interactive Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 my-2">
        {question.options.map((opt, idx) => {
          const letter = ['A', 'B', 'C', 'D'][idx];
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctIndex;

          let btnStyle = 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10';

          if (hasSubmitted) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-400/50';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200 ring-2 ring-rose-400/50';
            } else {
              btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={disabled || hasSubmitted}
              className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border text-left font-medium transition-all duration-150 transform active:scale-98 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold font-mono text-amber-400 border border-slate-700 group-hover:border-amber-400">
                  {letter}
                </span>
                <span className="text-base sm:text-lg font-bold font-sans">
                  {opt}
                </span>
              </div>

              {hasSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in" />
              )}
              {hasSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 animate-in zoom-in" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint & Explanation Section */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Кыйытманы жашыруу' : 'Кыйытма (подсказка) алуу'}</span>
          </button>

          <span className="text-[11px] text-slate-400">
            Клавиатурадан: 1, 2, 3, 4 баскычтарын басса болот
          </span>
        </div>

        {showHint && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm animate-in fade-in duration-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Кыйытма: </strong>
              {question.hint}
            </div>
          </div>
        )}

        {hasSubmitted && (
          <div className={`p-3 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
            selectedAnswer === question.correctIndex
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}>
            <div className="font-bold mb-1">
              {selectedAnswer === question.correctIndex ? '✅ Туура эсептелди!' : '❌ Ката кетти!'}
            </div>
            <div className="text-slate-300 leading-relaxed">
              {question.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
