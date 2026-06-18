import type { Badge } from '../types';

// バッジ定義。test(ctx) 述語が true になったら獲得。
// 追加 = オブジェクトを 1 個足すだけ。
export const BADGES: Badge[] = [
  {
    id: 'first-blood',
    titleJa: '最初の一歩',
    descJa: '初めてトピックを習得した',
    icon: '⭐',
    test: (c) => c.masteredCount >= 1,
  },
  {
    id: 'case-cracker',
    titleJa: '実戦派',
    descJa: 'ケースを 10 問正解した',
    icon: '⚔️',
    test: (c) => c.casesSolved >= 10,
  },
  {
    id: 'flawless-case',
    titleJa: '一撃必殺',
    descJa: 'ケースを一発で両段正解した',
    icon: '⚡',
    test: (c) => c.flawlessCase,
  },
  {
    id: 'tier1-clear',
    titleJa: '村を旅立つ者',
    descJa: 'Tier 1 のボスを撃破した',
    icon: '🚩',
    test: (c) => c.bossCleared('t1'),
  },
  {
    id: 'librarian',
    titleJa: '記憶の番人',
    descJa: 'Tier 2 を全習得した',
    icon: '📚',
    test: (c) => c.tierMasteryPct('t2') >= 1,
  },
  {
    id: 'config-king',
    titleJa: '設定の支配者',
    descJa: 'Tier 3 を全習得した',
    icon: '🛠️',
    test: (c) => c.tierMasteryPct('t3') >= 1,
  },
  {
    id: 'toolsmith',
    titleJa: '道具の達人',
    descJa: 'Tier 4 を全習得した',
    icon: '🧰',
    test: (c) => c.tierMasteryPct('t4') >= 1,
  },
  {
    id: 'reviewer',
    titleJa: '反復の達人',
    descJa: '復習を 50 回完了した',
    icon: '🔄',
    test: (c) => c.reviewsDone >= 50,
  },
  {
    id: 'streak-7',
    titleJa: '七日の誓い',
    descJa: '7 日連続で学習した',
    icon: '🔥',
    test: (c) => c.bestStreak >= 7,
  },
  {
    id: 'level-10',
    titleJa: '一人前',
    descJa: 'レベル 10 に到達した',
    icon: '👑',
    test: (c) => c.level >= 10,
  },
];
