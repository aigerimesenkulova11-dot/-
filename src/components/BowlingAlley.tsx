import React, { useEffect, useState, useMemo } from 'react';
import { BallSkin } from '../types/game';

interface BowlingAlleyProps {
  standingPins: boolean[]; // 10 pins (true = standing, false = knocked down)
  ballSkin: BallSkin;
  isRolling: boolean;
  rollOutcome: 'strike' | 'spare' | 'partial' | 'gutter' | null;
  pinsHitCount: number;
  aimAngle: number; // -1 to 1 (left to right)
  onRollComplete: () => void;
}

export const BowlingAlley: React.FC<BowlingAlleyProps> = ({
  standingPins,
  ballSkin,
  isRolling,
  rollOutcome,
  pinsHitCount,
  aimAngle,
  onRollComplete
}) => {
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const [flyingPins, setFlyingPins] = useState<{ id: number; x: number; y: number; rot: number; opacity: number }[]>([]);
  const [showOutcomeBanner, setShowOutcomeBanner] = useState(false);

  // Pin coordinates on the pin deck in percentages
  // Pins 1-10 layout (classic bowling triangle):
  //       7   8   9  10     (row 4)
  //         4   5   6       (row 3)
  //           2   3         (row 2)
  //             1           (row 1 - headpin)
  const pinPositions = useMemo(() => [
    { id: 1, x: 50, y: 34, row: 1 },
    { id: 2, x: 44, y: 27, row: 2 },
    { id: 3, x: 56, y: 27, row: 2 },
    { id: 4, x: 38, y: 20, row: 3 },
    { id: 5, x: 50, y: 20, row: 3 },
    { id: 6, x: 62, y: 20, row: 3 },
    { id: 7, x: 32, y: 13, row: 4 },
    { id: 8, x: 44, y: 13, row: 4 },
    { id: 9, x: 56, y: 13, row: 4 },
    { id: 10, x: 68, y: 13, row: 4 }
  ], []);

  // Animate the ball roll
  useEffect(() => {
    if (!isRolling) {
      setAnimProgress(0);
      setShowOutcomeBanner(false);
      return;
    }

    setShowOutcomeBanner(false);
    let startTimestamp: number | null = null;
    const duration = 1200; // 1.2s roll duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // ease-in-quad for acceleration
      const eased = progress * progress;
      setAnimProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Impact! Trigger flying pins animation
        triggerPinExplosion();
        setShowOutcomeBanner(true);
        setTimeout(() => {
          onRollComplete();
        }, 1100);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isRolling]);

  const triggerPinExplosion = () => {
    if (rollOutcome === 'gutter') {
      setFlyingPins([]);
      return;
    }

    const newFlyingPins = pinPositions
      .filter((_, idx) => !standingPins[idx])
      .map((pin) => {
        const spreadX = (Math.random() - 0.5) * 80;
        const spreadY = -Math.random() * 50 - 15;
        const rot = (Math.random() - 0.5) * 360;
        return {
          id: pin.id,
          x: spreadX,
          y: spreadY,
          rot,
          opacity: 1
        };
      });

    setFlyingPins(newFlyingPins);

    // Fade out flying pins
    setTimeout(() => {
      setFlyingPins([]);
    }, 900);
  };

  // Ball position calculations
  const ballY = 92 - animProgress * 65; // from 92% (bottom) to 27% (pins)
  const targetX = rollOutcome === 'gutter' ? (aimAngle < 0 ? 12 : 88) : 50 + aimAngle * 6;
  const ballX = 50 + (targetX - 50) * animProgress;
  const ballScale = 1 - animProgress * 0.65; // scales down with perspective
  const ballRotation = animProgress * 720; // 2 full revolutions

  return (
    <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[430px] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border-2 border-amber-600/30 select-none flex flex-col justify-end">
      {/* Bowling Alley Roof & Neon Back Wall */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-slate-950 via-indigo-950/60 to-transparent z-10 pointer-events-none">
        {/* Neon Bowler's Sign */}
        <div className="flex items-center justify-between px-6 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-ping" />
            <span className="text-xs font-black tracking-widest text-cyan-300 font-['Chakra_Petch',sans-serif] uppercase">
              ДОРОЖКА №1 • МАТЕМАТИКАЛЫК ЛИГА
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-sans">
            <span>PIN DECK</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Perspective Alley Container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        style={{ perspective: '800px' }}
      >
        {/* The 3D Bowling Lane */}
        <div
          className="relative w-[340px] sm:w-[460px] md:w-[560px] h-full flex flex-col items-center justify-end"
          style={{
            transform: 'rotateX(48deg)',
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Gutters on Left & Right */}
          <div className="absolute inset-y-0 -left-6 sm:-left-8 w-6 sm:w-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-l-md shadow-inner border-r border-slate-700/50">
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:8px_8px]" />
          </div>
          <div className="absolute inset-y-0 -right-6 sm:-right-8 w-6 sm:w-8 bg-gradient-to-l from-slate-950 via-slate-900 to-slate-950 rounded-r-md shadow-inner border-l border-slate-700/50">
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:8px_8px]" />
          </div>

          {/* Polished Maple Wood Lane */}
          <div className="relative w-full h-full bg-gradient-to-b from-amber-800 via-amber-700 to-amber-600 rounded-b-xl shadow-2xl overflow-hidden border-x border-amber-500/40">
            {/* Wood Planks Longitudinal Lines */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, #451a03 0px, #451a03 2px, transparent 2px, transparent 18px)`
              }}
            />

            {/* High-Gloss Varnish Lane Reflection Lighting */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-white/10 to-black/40 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 via-amber-950/60 to-transparent pointer-events-none" />

            {/* Target Arrows (The 7 Classic Bowling Guide Arrows) */}
            <div className="absolute top-[48%] inset-x-0 flex justify-center items-center gap-5 sm:gap-8 opacity-70">
              {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
                <div
                  key={val}
                  className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[14px] ${
                    val === 0 ? 'border-b-amber-300 scale-125' : 'border-b-amber-950'
                  }`}
                  style={{
                    transform: `translateY(${Math.abs(val) * 4}px)`
                  }}
                />
              ))}
            </div>

            {/* Foul Line at Bottom */}
            <div className="absolute bottom-6 inset-x-0 h-1.5 bg-rose-600 shadow-[0_0_8px_#f43f5e] z-10" />
            <div className="absolute bottom-2 inset-x-0 text-center text-[10px] font-bold text-amber-950 tracking-wider">
              FOUL LINE
            </div>

            {/* Pin Deck (Far End) */}
            <div className="absolute top-2 inset-x-4 h-36 bg-slate-900/90 rounded-t-lg border-b border-amber-900/60 shadow-inner flex items-center justify-center">
              {/* Pins Container */}
              <div className="relative w-full h-full">
                {pinPositions.map((pin, idx) => {
                  const isStanding = standingPins[idx];
                  return (
                    <div
                      key={pin.id}
                      className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${pin.x}%`,
                        top: `${pin.y}%`,
                        zIndex: 10 + pin.row
                      }}
                    >
                      {isStanding ? (
                        <div className="group relative cursor-default flex flex-col items-center">
                          {/* Pin Drop Shadow */}
                          <div className="absolute -bottom-1 w-5 h-2 bg-black/60 rounded-full blur-[2px]" />

                          {/* Authentic Bowling Pin Graphic (SVG) */}
                          <svg
                            className="w-7 h-14 sm:w-8 sm:h-16 drop-shadow-md transform transition-transform group-hover:scale-105"
                            viewBox="0 0 100 240"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Pin White Glossy Body */}
                            <path
                              d="M50 8C40 8 36 20 36 38C36 50 40 65 38 88C35 118 20 150 20 190C20 220 32 232 50 232C68 232 80 220 80 190C80 150 65 118 62 88C60 65 64 50 64 38C64 20 60 8 50 8Z"
                              fill="url(#pinBodyGradient)"
                              stroke="#cbd5e1"
                              strokeWidth="3"
                            />
                            {/* Red Neck Stripe 1 */}
                            <path
                              d="M37 68C43 70 57 70 63 68L63.5 76C57 78 43 78 36.5 76L37 68Z"
                              fill="#dc2626"
                            />
                            {/* Red Neck Stripe 2 */}
                            <path
                              d="M37.5 82C43 84 57 84 62.5 82L63 90C57 92 43 92 37 90L37.5 82Z"
                              fill="#dc2626"
                            />
                            {/* Pin Highlight Reflection */}
                            <path
                              d="M44 20C42 28 42 45 44 65C45 80 43 110 32 165C30 178 30 200 35 215"
                              stroke="white"
                              strokeWidth="5"
                              strokeLinecap="round"
                              opacity="0.6"
                            />
                            <defs>
                              <linearGradient id="pinBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#cbd5e1" />
                                <stop offset="35%" stopColor="#ffffff" />
                                <stop offset="75%" stopColor="#f8fafc" />
                                <stop offset="100%" stopColor="#94a3b8" />
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Pin Number Badge */}
                          <span className="absolute top-5 text-[9px] font-black text-slate-800">
                            {pin.id}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                {/* Flying knocked-down pins upon impact */}
                {flyingPins.map((fpin) => (
                  <div
                    key={'fly-' + fpin.id}
                    className="absolute pointer-events-none transition-transform duration-700 ease-out"
                    style={{
                      left: `calc(50% + ${fpin.x}px)`,
                      top: `calc(20% + ${fpin.y}px)`,
                      transform: `rotate(${fpin.rot}deg) scale(0.8)`,
                      opacity: fpin.opacity,
                      zIndex: 30
                    }}
                  >
                    <svg
                      className="w-7 h-14 drop-shadow-lg"
                      viewBox="0 0 100 240"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 8C40 8 36 20 36 38C36 50 40 65 38 88C35 118 20 150 20 190C20 220 32 232 50 232C68 232 80 220 80 190C80 150 65 118 62 88C60 65 64 50 64 38C64 20 60 8 50 8Z"
                        fill="#f8fafc"
                        stroke="#94a3b8"
                        strokeWidth="3"
                      />
                      <path d="M37 68C43 70 57 70 63 68L63.5 76C57 78 43 78 36.5 76L37 68Z" fill="#dc2626" />
                      <path d="M37.5 82C43 84 57 84 62.5 82L63 90C57 92 43 92 37 90L37.5 82Z" fill="#dc2626" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Bowling Ball */}
            {isRolling && (
              <div
                className="absolute z-20 pointer-events-none transition-none transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${ballX}%`,
                  top: `${ballY}%`,
                  transform: `translate(-50%, -50%) scale(${ballScale}) rotate(${ballRotation}deg)`
                }}
              >
                {/* Ball Shadow */}
                <div
                  className="absolute -bottom-2 inset-x-1 h-3 rounded-full blur-[3px]"
                  style={{ backgroundColor: ballSkin.shadow }}
                />

                {/* Bowling Ball Graphic */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full relative shadow-xl overflow-hidden flex items-center justify-center border-2 border-white/20"
                  style={{
                    background: ballSkin.gradient,
                    boxShadow: `0 10px 25px -5px ${ballSkin.shadow}, inset 0 -6px 12px rgba(0,0,0,0.6)`
                  }}
                >
                  {/* Finger Grip Holes */}
                  <div className="absolute top-3.5 left-4 w-2.5 h-2.5 rounded-full bg-slate-950 shadow-inner" />
                  <div className="absolute top-3.5 right-4 w-2.5 h-2.5 rounded-full bg-slate-950 shadow-inner" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-950 shadow-inner" />

                  {/* Surface specular reflection */}
                  <div className="absolute top-1 left-2 w-5 h-3 rounded-full bg-white/40 blur-[1px] transform -rotate-45" />

                  {/* Ball Icon Badge */}
                  <span className="text-xs opacity-75">{ballSkin.icon}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Outcome Banner Overlay */}
      {showOutcomeBanner && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center px-8 py-5 rounded-3xl bg-slate-900/95 border-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm mx-4 transform animate-bounce">
            {rollOutcome === 'strike' && (
              <div className="border-amber-400">
                <div className="text-4xl sm:text-5xl font-black text-amber-400 font-['Chakra_Petch',sans-serif] tracking-wider drop-shadow-[0_0_15px_#fbbf24]">
                  ⚡ СТРАЙК! ⚡
                </div>
                <p className="mt-1 text-sm font-semibold text-emerald-300">
                  Бардык 10 кегли кулады! Мыкты эсептөө!
                </p>
                <div className="mt-2 text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full inline-block border border-amber-500/40">
                  +10 упай + Бонус
                </div>
              </div>
            )}

            {rollOutcome === 'spare' && (
              <div className="border-cyan-400">
                <div className="text-4xl sm:text-5xl font-black text-cyan-400 font-['Chakra_Petch',sans-serif] tracking-wider drop-shadow-[0_0_15px_#38bdf8]">
                  🎯 СПЭЭР! 🎯
                </div>
                <p className="mt-1 text-sm font-semibold text-sky-200">
                  Калган кеглилер тазаланды! Экинчи ыргытуу ийгиликтүү!
                </p>
                <div className="mt-2 text-xs font-bold px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full inline-block border border-cyan-500/40">
                  +10 упай
                </div>
              </div>
            )}

            {rollOutcome === 'partial' && (
              <div className="border-indigo-400">
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-['Chakra_Petch',sans-serif]">
                  {pinsHitCount} КЕГЛИ КУЛАДЫ
                </div>
                <p className="mt-1 text-sm text-slate-300">
                  Ката кетти, бирок экинчи ыргытууда «Спээр» жасоого мүмкүнчүлүк бар!
                </p>
              </div>
            )}

            {rollOutcome === 'gutter' && (
              <div className="border-rose-500">
                <div className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-['Chakra_Petch',sans-serif]">
                  ⚠️ АУТ (АРЫККА ТҮШТҮ)
                </div>
                <p className="mt-1 text-sm text-rose-200">
                  Шар арыкка түшүп кетти. Катадан сабак алып, кийинкисин туура чыгар!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
