import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Difficulty, GameMode, MathQuestion, FrameResult, BallSkin } from './types/game';
import { getQuestionsForGame, generateProceduralQuestion } from './data/mathQuestions';
import { BALL_SKINS } from './data/ballSkins';
import { createEmptyFrames, calculateBowlingScores } from './utils/bowlingEngine';
import { soundManager } from './utils/audio';
import { BowlingAlley } from './components/BowlingAlley';
import { ScoreBoard } from './components/ScoreBoard';
import { QuestionCard } from './components/QuestionCard';
import { Scratchpad } from './components/Scratchpad';
import { LeaderboardModal } from './components/LeaderboardModal';
import { BallSelectorModal } from './components/BallSelectorModal';
import { GameOverModal } from './components/GameOverModal';
import {
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  HelpCircle,
  PenTool,
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Game Setup States
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameMode, setGameMode] = useState<GameMode>('tournament');
  const [frameCount, setFrameCount] = useState<number>(10);
  const [playerName, setPlayerName] = useState<string>('Окуучу');
  const [selectedBall, setSelectedBall] = useState<BallSkin>(BALL_SKINS[0]);
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.getMuted());

  // UI Modals
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isBallSelectorOpen, setIsBallSelectorOpen] = useState(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [highlightLeaderboardId, setHighlightLeaderboardId] = useState<string | null>(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Active Game Session States
  const [frames, setFrames] = useState<FrameResult[]>(() => createEmptyFrames(10));
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [currentRollIndex, setCurrentRollIndex] = useState<1 | 2>(1);
  const [standingPins, setStandingPins] = useState<boolean[]>(() => Array(10).fill(true));

  // Bowling Rolling Animation States
  const [isRolling, setIsRolling] = useState(false);
  const [rollOutcome, setRollOutcome] = useState<'strike' | 'spare' | 'partial' | 'gutter' | null>(null);
  const [pinsHitInRoll, setPinsHitInRoll] = useState(0);
  const [aimAngle, setAimAngle] = useState(0);

  // Questions pool
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Statistics
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [strikesCount, setStrikesCount] = useState(0);
  const [sparesCount, setSparesCount] = useState(0);
  const [streakCombo, setStreakCombo] = useState(0);

  // Initialize or reset game
  const startNewGame = useCallback((diff: Difficulty = difficulty, mode: GameMode = gameMode) => {
    const totalF = mode === 'quick' ? 5 : 10;
    setFrameCount(totalF);
    setFrames(createEmptyFrames(totalF));
    setCurrentFrameIndex(0);
    setCurrentRollIndex(1);
    setStandingPins(Array(10).fill(true));
    setIsRolling(false);
    setRollOutcome(null);
    setPinsHitInRoll(0);
    setStrikesCount(0);
    setSparesCount(0);
    setStreakCombo(0);
    setTotalCorrectAnswers(0);
    setTotalAttempts(0);
    setIsGameOverOpen(false);

    // Fetch initial questions
    const qList = getQuestionsForGame(diff, totalF * 2 + 5);
    setQuestions(qList);
    setCurrentQuestionIndex(0);
  }, [difficulty, gameMode]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const currentQuestion = useMemo(() => {
    if (questions.length === 0) {
      return generateProceduralQuestion(difficulty);
    }
    return questions[currentQuestionIndex] || generateProceduralQuestion(difficulty);
  }, [questions, currentQuestionIndex, difficulty]);

  // Standing pins count
  const pinsStandingCount = useMemo(() => {
    return standingPins.filter(Boolean).length;
  }, [standingPins]);

  // Cumulative score total
  const currentTotalScore = useMemo(() => {
    if (frames.length === 0) return 0;
    const lastActive = frames.filter(f => f.roll1 !== null).pop();
    return lastActive ? lastActive.score : 0;
  }, [frames]);

  // Handle student answer selection
  const handleAnswerSelected = (selectedIndex: number, timeSpentSec: number) => {
    if (isRolling) return;
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    setTotalAttempts((prev) => prev + 1);
    if (isCorrect) {
      setTotalCorrectAnswers((prev) => prev + 1);
      setStreakCombo((prev) => prev + 1);
      soundManager.playCorrect();
    } else {
      setStreakCombo(0);
      soundManager.playWrong();
    }

    // Determine pins knocked down & roll outcome
    let hitCount = 0;
    let outcome: 'strike' | 'spare' | 'partial' | 'gutter' = 'gutter';
    let chosenAngle = 0;

    if (currentRollIndex === 1) {
      if (isCorrect) {
        // Correct on Roll 1 -> STRIKE!
        hitCount = 10;
        outcome = 'strike';
        chosenAngle = (Math.random() - 0.5) * 0.15; // clean center shot
        soundManager.playBallRoll(1.1);
        setTimeout(() => {
          soundManager.playPinsCrash(10);
          soundManager.playStrikeFanfare();
          try {
            confetti({
              particleCount: 60,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch {}
        }, 1100);
      } else {
        // Wrong on Roll 1 -> Partial hit or Gutter
        const accuracyLuck = Math.random();
        if (accuracyLuck > 0.4) {
          hitCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 pins
          outcome = 'partial';
          chosenAngle = (Math.random() > 0.5 ? 1 : -1) * 0.6;
          soundManager.playBallRoll(1.1);
          setTimeout(() => {
            soundManager.playPinsCrash(hitCount);
          }, 1100);
        } else {
          hitCount = 0;
          outcome = 'gutter';
          chosenAngle = Math.random() > 0.5 ? 0.95 : -0.95;
          soundManager.playBallRoll(1.1);
          setTimeout(() => {
            soundManager.playGutterSound();
          }, 1100);
        }
      }
    } else {
      // Roll 2 (Attempting Spare)
      if (isCorrect) {
        // Correct on Roll 2 -> SPARE!
        hitCount = pinsStandingCount;
        outcome = 'spare';
        chosenAngle = (Math.random() - 0.5) * 0.2;
        soundManager.playBallRoll(1.1);
        setTimeout(() => {
          soundManager.playPinsCrash(hitCount);
          soundManager.playSpareSound();
        }, 1100);
      } else {
        // Wrong on Roll 2 -> knocks down 0 to a few remaining pins
        hitCount = Math.min(Math.floor(Math.random() * Math.max(1, pinsStandingCount)), pinsStandingCount - 1);
        outcome = hitCount === 0 ? 'gutter' : 'partial';
        chosenAngle = (Math.random() > 0.5 ? 1 : -1) * 0.7;
        soundManager.playBallRoll(1.1);
        setTimeout(() => {
          if (hitCount > 0) {
            soundManager.playPinsCrash(hitCount);
          } else {
            soundManager.playGutterSound();
          }
        }, 1100);
      }
    }

    setAimAngle(chosenAngle);
    setPinsHitInRoll(hitCount);
    setRollOutcome(outcome);
    setIsRolling(true);

    // Update standing pins state
    if (hitCount === 10 || (currentRollIndex === 2 && isCorrect)) {
      setStandingPins(Array(10).fill(false));
    } else if (hitCount > 0) {
      // randomly knock down hitCount pins among standing ones
      const standingIndices: number[] = [];
      standingPins.forEach((st, idx) => {
        if (st) standingIndices.push(idx);
      });
      // shuffle
      const toKnock = [...standingIndices].sort(() => 0.5 - Math.random()).slice(0, hitCount);
      const newPins = [...standingPins];
      toKnock.forEach(i => (newPins[i] = false));
      setStandingPins(newPins);
    }
  };

  // Called when ball roll animation and pin explosion finishes
  const handleRollComplete = () => {
    setIsRolling(false);

    // Update bowling frames
    const newFrames = [...frames];
    const curr = { ...newFrames[currentFrameIndex] };

    if (currentRollIndex === 1) {
      curr.roll1 = pinsHitInRoll;
      if (pinsHitInRoll === 10) {
        // Strike!
        curr.isStrike = true;
        setStrikesCount((prev) => prev + 1);
        newFrames[currentFrameIndex] = curr;
        const recomputed = calculateBowlingScores(newFrames);
        setFrames(recomputed);

        // Move to next frame or finish game
        finishOrAdvanceFrame(currentFrameIndex, recomputed);
      } else {
        // Not a strike, move to Roll 2
        newFrames[currentFrameIndex] = curr;
        const recomputed = calculateBowlingScores(newFrames);
        setFrames(recomputed);
        setCurrentRollIndex(2);
        // Advance question
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      // Roll 2 completed
      curr.roll2 = pinsHitInRoll;
      if ((curr.roll1 ?? 0) + pinsHitInRoll === 10) {
        curr.isSpare = true;
        setSparesCount((prev) => prev + 1);
      }
      newFrames[currentFrameIndex] = curr;
      const recomputed = calculateBowlingScores(newFrames);
      setFrames(recomputed);

      finishOrAdvanceFrame(currentFrameIndex, recomputed);
    }
  };

  const finishOrAdvanceFrame = (frameIdx: number, updatedFrames: FrameResult[]) => {
    if (frameIdx >= frameCount - 1) {
      // Game Over!
      setTimeout(() => {
        setIsGameOverOpen(true);
      }, 600);
    } else {
      // Move to next frame
      setCurrentFrameIndex(frameIdx + 1);
      setCurrentRollIndex(1);
      setStandingPins(Array(10).fill(true));
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  const accuracyPercent = totalAttempts > 0 ? Math.round((totalCorrectAnswers / totalAttempts) * 100) : 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bowling Alley Header */}
      <header className="sticky top-0 z-30 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-500/20">
              🎳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white font-['Chakra_Petch',sans-serif]">
                  МАТЕМАТИКАЛЫК БОУЛИНГ
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  5-8 класс
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Мисалдарды чыгар • Кеглилерди кулат • Рекорд кой!
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Streak indicator */}
            {streakCombo >= 2 && (
              <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold animate-pulse">
                <Flame className="w-4 h-4 fill-orange-400" />
                <span>{streakCombo}x Серия!</span>
              </div>
            )}

            {/* Ball Selector Button */}
            <button
              onClick={() => setIsBallSelectorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition shadow-sm"
              title="Шардын түрүн тандоо"
            >
              <span>{selectedBall.icon}</span>
              <span className="hidden sm:inline">{selectedBall.name}</span>
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition shadow-md shadow-amber-500/20"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Лидерлер</span>
            </button>

            {/* Scratchpad Trigger */}
            <button
              onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
              className={`p-2 rounded-xl border text-xs font-semibold transition ${
                isScratchpadOpen
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
              }`}
              title="Каралама (Черновик) баракчасы"
            >
              <PenTool className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
              title={isMuted ? 'Үндү күйгүзүү' : 'Үндү өчүрүү'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* How to play */}
            <button
              onClick={() => setShowHowToPlay(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
              title="Эрежелер жана жардам"
            >
              <HelpCircle className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* Difficulty and Mode Selectors Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-2.5 sm:p-3 rounded-2xl border border-slate-800">
          {/* Difficulty options */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold mr-1 hidden sm:inline">Деңгээл:</span>
            {[
              { id: 'easy', label: 'Жеңил', subtitle: '5-класс', color: 'hover:border-emerald-500' },
              { id: 'medium', label: 'Орто', subtitle: '6-7-класс', color: 'hover:border-sky-500' },
              { id: 'hard', label: 'Татаал', subtitle: '7-8-класс', color: 'hover:border-rose-500' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setDifficulty(d.id as Difficulty);
                  startNewGame(d.id as Difficulty, gameMode);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  difficulty === d.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : `bg-slate-800/80 text-slate-300 border-slate-700 ${d.color}`
                }`}
              >
                <span>{d.label}</span>
                <span className={`text-[10px] opacity-75 font-normal ${difficulty === d.id ? 'text-slate-900' : 'text-slate-400'}`}>
                  ({d.subtitle})
                </span>
              </button>
            ))}
          </div>

          {/* Mode & New Game Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => {
                  setGameMode('tournament');
                  startNewGame(difficulty, 'tournament');
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  gameMode === 'tournament' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                10 Фрейм (Турнир)
              </button>
              <button
                onClick={() => {
                  setGameMode('quick');
                  startNewGame(difficulty, 'quick');
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  gameMode === 'quick' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                5 Фрейм (Ыкчам)
              </button>
            </div>

            <button
              onClick={() => startNewGame()}
              title="Оюнду кайра баштоо"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10-Frame Bowling Scoreboard */}
        <ScoreBoard
          frames={frames}
          currentFrameIndex={currentFrameIndex}
          currentRollIndex={currentRollIndex}
          totalScore={currentTotalScore}
          strikesCount={strikesCount}
          sparesCount={sparesCount}
          playerName={playerName}
          difficultyLabel={
            difficulty === 'easy' ? 'Жеңил (5-кл)' : difficulty === 'medium' ? 'Орто (6-7 кл)' : 'Татаал (7-8 кл)'
          }
        />

        {/* Main Interactive Arena: Bowling Lane & Math Question Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Bowling Alley 2.5D Interactive Canvas */}
          <div className="lg:col-span-7">
            <BowlingAlley
              standingPins={standingPins}
              ballSkin={selectedBall}
              isRolling={isRolling}
              rollOutcome={rollOutcome}
              pinsHitCount={pinsHitInRoll}
              aimAngle={aimAngle}
              onRollComplete={handleRollComplete}
            />
          </div>

          {/* Math Question Section */}
          <div className="lg:col-span-5">
            <QuestionCard
              question={currentQuestion}
              rollNumber={currentRollIndex}
              pinsLeft={pinsStandingCount}
              onAnswerSelected={handleAnswerSelected}
              disabled={isRolling}
              onOpenScratchpad={() => setIsScratchpadOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Floating Scratchpad Button for Quick Access */}
      {!isScratchpadOpen && (
        <button
          onClick={() => setIsScratchpadOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-2xl shadow-amber-500/40 border border-amber-300 transition transform hover:scale-105"
        >
          <PenTool className="w-4 h-4" />
          <span>Каралама ачуу</span>
        </button>
      )}

      {/* Scratchpad Window */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => {
          setIsLeaderboardOpen(false);
          setHighlightLeaderboardId(null);
        }}
        highlightId={highlightLeaderboardId}
      />

      {/* Ball Selector Modal */}
      <BallSelectorModal
        isOpen={isBallSelectorOpen}
        onClose={() => setIsBallSelectorOpen(false)}
        selectedBallId={selectedBall.id}
        onSelectBall={(ball) => setSelectedBall(ball)}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={isGameOverOpen}
        score={currentTotalScore}
        strikes={strikesCount}
        spares={sparesCount}
        accuracy={accuracyPercent}
        difficulty={difficulty}
        ballSkin={selectedBall}
        onPlayAgain={() => startNewGame()}
        onViewLeaderboard={(savedId) => {
          setIsGameOverOpen(false);
          setHighlightLeaderboardId(savedId);
          setIsLeaderboardOpen(true);
        }}
      />

      {/* How to play modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-200">
            <h2 className="text-xl font-black text-amber-400 font-['Chakra_Petch',sans-serif] mb-3 flex items-center gap-2">
              <span>🎳</span> КАНТИП ОЙНОЙБУЗ? (ЭРЕЖЕЛЕР)
            </h2>
            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300">
              <p>
                <strong>1. Максат:</strong> Математикалык эсептерди туура чыгарып, боулинг кеглилерин кулатып, эң жогорку упай топтоп Лидерлер тактасына чыгуу!
              </p>
              <p>
                <strong>2. Деңгээлдер:</strong>
                <br />• <span className="text-emerald-400 font-semibold">Жеңил (5-класс):</span> Амалдар тартиби, бөлчөктөр, теңдемелер, аянт жана периметр.
                <br />• <span className="text-sky-400 font-semibold">Орто (6-7-класс):</span> Терс сандар, ондук бөлчөктөр, пайыздар, сызыктуу теңдемелер, пропорция.
                <br />• <span className="text-rose-400 font-semibold">Татаал (7-8-класс):</span> Квадрат тамырлар, кыскача көбөйтүү, Пифагор теоремасы, геометрия.
              </p>
              <p>
                <strong>3. Страйк жана Спээр:</strong>
                <br />• 1-ыргытууда туура тапсаңыз — <strong>СТРАЙК (10 кегли кулайт!)</strong>
                <br />• Ката кетсе, калган кеглилерди 2-ыргытууда кулатып <strong>СПЭЭР</strong> жасасаңыз болот!
              </p>
              <p>
                <strong>4. Каралама:</strong> Эгер мамыча түрүндө эсептөө же формула чийүү керек болсо, «Каралама» баскычын басып калем менен экранга эркин жазыңыз!
              </p>
            </div>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
            >
              Түшүндүм, оюнду баштайлы!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
