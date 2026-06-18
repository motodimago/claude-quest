import { CONFIG } from '../data/config';
import type { SrsState } from '../types';
import { addDays, todayStr } from './dates';

// 軽量 Leitner 方式の間隔反復
export const SRS = {
  init(today: string = todayStr()): SrsState {
    const box = 1;
    return { box, dueDate: addDays(today, CONFIG.srs.intervals[box]), lastReviewed: today };
  },

  schedule(srs: SrsState, correct: boolean, today: string = todayStr()): SrsState {
    const box = correct
      ? Math.min(srs.box + 1, CONFIG.srs.maxBox)
      : Math.max(srs.box - 1, CONFIG.srs.minBox);
    return { box, dueDate: addDays(today, CONFIG.srs.intervals[box]), lastReviewed: today };
  },

  isDue(srs: SrsState | undefined, today: string = todayStr()): boolean {
    if (!srs) return false;
    return srs.dueDate <= today;
  },
};
