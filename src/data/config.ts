// ===== 調整値（バランス調整はここを触る）=====

export const CONFIG = {
  // 習得（mastered）の条件：ケース正解を必須にして「実戦で使える＝習得」を担保。
  // 1周（クイズ全問＋ケース1問）で習得できるよう quiz しきい値は 2 にする。
  mastery: {
    minQuizCorrect: 2,
    minCaseCorrect: 1,
  },

  // ティアのアンロック：直前ティアの習得率がこの値以上で開放
  tierUnlockPct: 0.8,

  // 間隔反復（Leitner）box -> 次回までの日数
  srs: {
    intervals: { 1: 1, 2: 3, 3: 7, 4: 16, 5: 35 } as Record<number, number>,
    maxBox: 5,
    minBox: 1,
  },

  // XP / レベル
  xp: {
    // レベル L -> L+1 に必要な XP = round(base * L^exp / 10) * 10
    base: 100,
    exp: 1.4,
    rewards: {
      studyComplete: 5,
      quizCorrect: 10,
      quizWrong: 2, // 挑戦への小さな報酬
      caseSolved: 25,
      caseFirstTryBonus: 10,
      topicMastered: 50,
      reviewCorrect: 8,
      dailyQuest: 40,
      bossClear: 150,
    },
  },

  // ボス戦のクリア条件（最低正答率）
  boss: {
    minAccuracy: 0.8,
  },

  // レベル称号（minLevel 以上で該当）
  levelTitles: [
    { minLevel: 1, titleJa: '見習い' },
    { minLevel: 5, titleJa: '駆け出し' },
    { minLevel: 10, titleJa: '一人前' },
    { minLevel: 15, titleJa: '熟練' },
    { minLevel: 20, titleJa: '達人' },
  ],
} as const;

export const STORAGE_KEY = 'claudequest';
export const STORAGE_VERSION = 1;
