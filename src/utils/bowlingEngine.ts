import { FrameResult } from '../types/game';

/**
 * Calculates standard bowling scores for an array of frames.
 * Returns updated frames with cumulative running scores.
 */
export function calculateBowlingScores(frames: FrameResult[]): FrameResult[] {
  const updatedFrames: FrameResult[] = frames.map(f => ({ ...f }));
  let runningScore = 0;

  for (let i = 0; i < updatedFrames.length; i++) {
    const current = updatedFrames[i];
    if (current.roll1 === null) {
      current.score = runningScore;
      continue;
    }

    // Is it the 10th (or final) frame?
    const isFinalFrame = i === updatedFrames.length - 1;

    if (isFinalFrame) {
      const r1 = current.roll1 ?? 0;
      const r2 = current.roll2 ?? 0;
      const r3 = current.roll3 ?? 0;
      runningScore += r1 + r2 + r3;
      current.score = runningScore;
      continue;
    }

    if (current.isStrike) {
      // Strike: 10 + next 2 rolls
      let strikeBonus = 0;
      const nextFrame = updatedFrames[i + 1];
      if (nextFrame && nextFrame.roll1 !== null) {
        strikeBonus += nextFrame.roll1;
        if (nextFrame.isStrike && i + 1 < updatedFrames.length - 1) {
          const secondFrame = updatedFrames[i + 2];
          if (secondFrame && secondFrame.roll1 !== null) {
            strikeBonus += secondFrame.roll1;
          }
        } else if (nextFrame.roll2 !== null) {
          strikeBonus += nextFrame.roll2;
        }
      }
      runningScore += 10 + strikeBonus;
      current.score = runningScore;
    } else if (current.isSpare) {
      // Spare: 10 + next 1 roll
      let spareBonus = 0;
      const nextFrame = updatedFrames[i + 1];
      if (nextFrame && nextFrame.roll1 !== null) {
        spareBonus += nextFrame.roll1;
      }
      runningScore += 10 + spareBonus;
      current.score = runningScore;
    } else {
      // Open frame
      const r1 = current.roll1 ?? 0;
      const r2 = current.roll2 ?? 0;
      runningScore += r1 + r2;
      current.score = runningScore;
    }
  }

  return updatedFrames;
}

export function createEmptyFrames(frameCount: number = 10): FrameResult[] {
  return Array.from({ length: frameCount }, (_, idx) => ({
    frameNumber: idx + 1,
    roll1: null,
    roll2: null,
    roll3: null,
    isStrike: false,
    isSpare: false,
    score: 0
  }));
}
