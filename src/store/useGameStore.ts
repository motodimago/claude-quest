import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  BadgeContext,
  Counters,
  DailyGoal,
  DailyState,
  GameStateData,
  PlayerState,
  Settings,
  TierId,
  TopicId,
  TopicRecord,
} from '../types';
import { STORAGE_KEY, STORAGE_VERSION, CONFIG } from '../data/config';
import { Content } from '../lib/content';
import { addDays, daysBetween, todayStr } from '../lib/dates';
import { evaluateBadges, levelFromXp, levelTitle } from '../lib/gamify';
import { SRS } from '../lib/srs';
import {
  isBossUnlocked,
  isMastered,
  tierMasteryPct,
  totalMasteredCount,
} from '../lib/progress';
import { BADGES } from '../data/badges';

// ===== 通知（トースト）/ 演出（モーダル）：永続化しない一時状態 =====
export type NotifKind = 'xp' | 'badge' | 'mastered' | 'levelup' | 'info';
export interface Notification {
  id: string;
  kind: NotifKind;
  titleJa: string;
  descJa?: string;
}
export type Celebration =
  | { kind: 'levelup'; level: number; titleJa: string }
  | { kind: 'boss'; tierId: TierId }
  | null;

let notifSeq = 0;
const mkNotif = (kind: NotifKind, titleJa: string, descJa?: string): Notification => ({
  id: `n${++notifSeq}`,
  kind,
  titleJa,
  descJa,
});

// ===== 永続化される初期状態 =====
function initialData(): GameStateData {
  const today = todayStr();
  return {
    version: STORAGE_VERSION,
    player: {
      xp: 0,
      level: 1,
      createdAt: today,
      lastActiveDate: today,
      streak: { current: 0, best: 0, lastDay: '' },
    },
    topics: {},
    badges: {},
    daily: null,
    settings: { sound: true, reducedMotion: false },
    counters: { reviewsDone: 0, flawlessCases: 0, casesSolved: 0, bossCleared: {} },
  };
}

// ===== 作業用ミュータブルコンテキスト（set 内で組み立てて返す）=====
interface WorkCtx {
  player: PlayerState;
  topics: Record<string, TopicRecord>;
  badges: Record<string, { earnedAt: string }>;
  counters: Counters;
  daily: DailyState | null;
  notifications: Notification[];
  celebration: Celebration;
}

function cloneCtx(s: GameStore): WorkCtx {
  return {
    player: { ...s.player, streak: { ...s.player.streak } },
    topics: { ...s.topics },
    badges: { ...s.badges },
    counters: { ...s.counters, bossCleared: { ...s.counters.bossCleared } },
    daily: s.daily ? { ...s.daily, goals: s.daily.goals.map((g) => ({ ...g })) } : null,
    notifications: [...s.notifications],
    celebration: s.celebration,
  };
}

function commit(ctx: WorkCtx): Partial<GameStore> {
  return {
    player: ctx.player,
    topics: ctx.topics,
    badges: ctx.badges,
    counters: ctx.counters,
    daily: ctx.daily,
    notifications: ctx.notifications,
    celebration: ctx.celebration,
  };
}

// XP 付与＋レベルアップ判定
function grantXp(ctx: WorkCtx, xp: number, reasonJa?: string) {
  if (xp <= 0) return;
  ctx.player.xp += xp;
  if (ctx.daily) ctx.daily.xpToday += xp;
  if (reasonJa) ctx.notifications.push(mkNotif('xp', `+${xp} XP`, reasonJa));
  const { level } = levelFromXp(ctx.player.xp);
  if (level > ctx.player.level) {
    ctx.player.level = level;
    const titleJa = levelTitle(level);
    ctx.celebration = { kind: 'levelup', level, titleJa };
    ctx.notifications.push(mkNotif('levelup', `レベル ${level}！`, titleJa));
  }
}

// 日々の活動を記録し連続日数を更新
function touchActivity(ctx: WorkCtx) {
  const today = todayStr();
  const st = ctx.player.streak;
  ctx.player.lastActiveDate = today;
  if (st.lastDay === today) return;
  if (!st.lastDay) st.current = 1;
  else {
    const gap = daysBetween(st.lastDay, today);
    st.current = gap === 1 ? st.current + 1 : 1;
  }
  st.best = Math.max(st.best, st.current);
  st.lastDay = today;
}

// バッジ評価コンテキストを組み立てる
function badgeContext(ctx: WorkCtx): BadgeContext {
  return {
    masteredCount: totalMasteredCount(ctx.topics),
    casesSolved: ctx.counters.casesSolved,
    reviewsDone: ctx.counters.reviewsDone,
    level: ctx.player.level,
    bestStreak: ctx.player.streak.best,
    flawlessCase: ctx.counters.flawlessCases > 0,
    tierMasteryPct: (tierId: TierId) => tierMasteryPct(tierId, ctx.topics),
    bossCleared: (tierId: TierId) => !!ctx.counters.bossCleared[tierId],
  };
}

// 新規獲得バッジを付与し通知
function awardBadges(ctx: WorkCtx) {
  const earned = evaluateBadges(badgeContext(ctx));
  const today = todayStr();
  for (const id of earned) {
    if (!ctx.badges[id]) {
      ctx.badges[id] = { earnedAt: today };
      const def = BADGES.find((b) => b.id === id);
      ctx.notifications.push(mkNotif('badge', `バッジ獲得：${def?.titleJa ?? id}`, def?.descJa));
    }
  }
}

function ensureRecord(ctx: WorkCtx, topicId: TopicId): TopicRecord {
  const prev = ctx.topics[topicId];
  const rec: TopicRecord = prev
    ? { ...prev, srs: prev.srs ? { ...prev.srs } : undefined }
    : { quizCorrect: 0, caseCorrect: 0, attempts: 0 };
  ctx.topics[topicId] = rec;
  return rec;
}

// 習得への遷移を検知して報酬・SRS 登録・通知
function maybeMaster(ctx: WorkCtx, topicId: TopicId) {
  const rec = ctx.topics[topicId];
  if (!rec || rec.masteredAt) return; // 既習得 or レコード無し
  if (isMastered(rec)) {
    const today = todayStr();
    rec.masteredAt = today;
    rec.srs = SRS.init(today);
    grantXp(ctx, CONFIG.xp.rewards.topicMastered);
    const topic = Content.getTopic(topicId);
    ctx.notifications.push(mkNotif('mastered', `習得：${topic?.titleJa ?? topicId}`, '+50 XP'));
  }
}

function bumpDaily(ctx: WorkCtx, goalId: string, n = 1) {
  if (!ctx.daily) return;
  const g = ctx.daily.goals.find((x) => x.id === goalId);
  if (g) g.progress = Math.min(g.target, g.progress + n);
}

// 期限到来の復習件数
function dueReviewCount(topics: Record<string, TopicRecord>): number {
  return Object.values(topics).filter((r) => SRS.isDue(r.srs)).length;
}

// 当日のデイリー目標を生成。復習が無い日（初日など）は達成不能を避け、
// 「復習」目標を「クイズ正解」目標に差し替える。
function buildDailyGoals(dueCount: number): DailyGoal[] {
  const goals: DailyGoal[] = [
    { id: 'study', labelJa: 'トピックを1つ学習する', target: 1, progress: 0 },
  ];
  if (dueCount > 0) {
    const t = Math.min(3, dueCount);
    goals.push({ id: 'review', labelJa: `復習を${t}問こなす`, target: t, progress: 0 });
  } else {
    goals.push({ id: 'quiz', labelJa: 'クイズに2問正解する', target: 2, progress: 0 });
  }
  goals.push({ id: 'case', labelJa: 'ケースを1問正解する', target: 1, progress: 0 });
  return goals;
}

// ===== ストア本体 =====
export interface GameStore extends GameStateData {
  // 一時状態
  notifications: Notification[];
  celebration: Celebration;

  // 起動時処理
  rolloverDay: () => void;
  ensureDaily: () => void;

  // 学習・回答
  recordStudy: (topicId: TopicId) => void;
  recordQuiz: (topicId: TopicId, correct: boolean) => void;
  recordCase: (topicId: TopicId, correct: boolean, flawless: boolean) => void;
  reviewAnswer: (topicId: TopicId, correct: boolean) => void;
  clearBoss: (tierId: TierId, accuracy: number) => boolean;
  claimDaily: () => void;

  // 一時状態の操作
  dismissNotification: (id: string) => void;
  clearCelebration: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialData(),
      notifications: [],
      celebration: null,

      rolloverDay: () =>
        set((s) => {
          const today = todayStr();
          const st = { ...s.player.streak };
          if (st.lastDay && st.lastDay !== today && daysBetween(st.lastDay, today) > 1) {
            st.current = 0;
          }
          let daily = s.daily;
          if (daily && daily.date !== today) daily = null;
          return { player: { ...s.player, streak: st }, daily };
        }),

      ensureDaily: () =>
        set((s) => {
          const today = todayStr();
          const desired = buildDailyGoals(dueReviewCount(s.topics));
          const desiredIds = desired.map((g) => g.id).join(',');

          if (s.daily && s.daily.date === today) {
            const currentIds = s.daily.goals.map((g) => g.id).join(',');
            if (currentIds === desiredIds) return {}; // 既に正しい
            // 達成不能な当日デイリー（例：初日の復習目標）を作り直す。
            // 同じ id の目標は進捗を引き継ぎ、claimed/xpToday は保持。
            const prev = new Map(s.daily.goals.map((g) => [g.id, g]));
            const goals = desired.map((g) => {
              const p = prev.get(g.id);
              return p ? { ...g, progress: Math.min(g.target, p.progress) } : g;
            });
            return { daily: { ...s.daily, goals } };
          }

          const daily: DailyState = {
            date: today,
            goals: desired,
            claimed: false,
            xpToday: 0,
          };
          return { daily };
        }),

      recordStudy: (topicId) =>
        set((s) => {
          const ctx = cloneCtx(s);
          const rec = ensureRecord(ctx, topicId);
          const firstTime = !rec.firstStudiedAt;
          if (firstTime) {
            rec.firstStudiedAt = todayStr();
            grantXp(ctx, CONFIG.xp.rewards.studyComplete);
            bumpDaily(ctx, 'study');
          }
          touchActivity(ctx);
          awardBadges(ctx);
          return commit(ctx);
        }),

      recordQuiz: (topicId, correct) =>
        set((s) => {
          const ctx = cloneCtx(s);
          const rec = ensureRecord(ctx, topicId);
          rec.attempts += 1;
          if (correct) {
            rec.quizCorrect += 1;
            grantXp(ctx, CONFIG.xp.rewards.quizCorrect);
            bumpDaily(ctx, 'quiz');
          } else {
            grantXp(ctx, CONFIG.xp.rewards.quizWrong);
          }
          maybeMaster(ctx, topicId);
          touchActivity(ctx);
          awardBadges(ctx);
          return commit(ctx);
        }),

      recordCase: (topicId, correct, flawless) =>
        set((s) => {
          const ctx = cloneCtx(s);
          const rec = ensureRecord(ctx, topicId);
          rec.attempts += 1;
          if (correct) {
            rec.caseCorrect += 1;
            ctx.counters.casesSolved += 1;
            let xp = CONFIG.xp.rewards.caseSolved;
            if (flawless) {
              xp += CONFIG.xp.rewards.caseFirstTryBonus;
              ctx.counters.flawlessCases += 1;
            }
            grantXp(ctx, xp, 'ケース正解');
            bumpDaily(ctx, 'case');
          }
          maybeMaster(ctx, topicId);
          touchActivity(ctx);
          awardBadges(ctx);
          return commit(ctx);
        }),

      reviewAnswer: (topicId, correct) =>
        set((s) => {
          const ctx = cloneCtx(s);
          const rec = ensureRecord(ctx, topicId);
          const today = todayStr();
          rec.srs = SRS.schedule(rec.srs ?? SRS.init(today), correct, today);
          ctx.counters.reviewsDone += 1;
          if (correct) grantXp(ctx, CONFIG.xp.rewards.reviewCorrect);
          bumpDaily(ctx, 'review');
          touchActivity(ctx);
          awardBadges(ctx);
          return commit(ctx);
        }),

      clearBoss: (tierId, accuracy) => {
        if (accuracy < CONFIG.boss.minAccuracy) return false;
        set((s) => {
          const ctx = cloneCtx(s);
          if (!ctx.counters.bossCleared[tierId]) {
            ctx.counters.bossCleared[tierId] = true;
            grantXp(ctx, CONFIG.xp.rewards.bossClear, 'ボス撃破');
            ctx.celebration = { kind: 'boss', tierId };
          }
          touchActivity(ctx);
          awardBadges(ctx);
          return commit(ctx);
        });
        return true;
      },

      claimDaily: () =>
        set((s) => {
          if (!s.daily || s.daily.claimed) return {};
          const allDone = s.daily.goals.every((g) => g.progress >= g.target);
          if (!allDone) return {};
          const ctx = cloneCtx(s);
          if (ctx.daily) ctx.daily.claimed = true;
          grantXp(ctx, CONFIG.xp.rewards.dailyQuest, 'デイリー達成');
          touchActivity(ctx);
          awardBadges(ctx);
          return commit(ctx);
        }),

      dismissNotification: (id) =>
        set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),

      clearCelebration: () => set({ celebration: null }),

      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      reset: () => set({ ...initialData(), notifications: [], celebration: null }),
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => {
        try {
          // localStorage が使えない環境ではメモリ fallback
          const k = '__cq_test__';
          window.localStorage.setItem(k, '1');
          window.localStorage.removeItem(k);
          return window.localStorage;
        } catch {
          const mem = new Map<string, string>();
          return {
            getItem: (key: string) => mem.get(key) ?? null,
            setItem: (key: string, value: string) => void mem.set(key, value),
            removeItem: (key: string) => void mem.delete(key),
          };
        }
      }),
      // 一時状態は保存しない
      partialize: (s) => ({
        version: s.version,
        player: s.player,
        topics: s.topics,
        badges: s.badges,
        daily: s.daily,
        settings: s.settings,
        counters: s.counters,
      }),
      migrate: (persisted) => persisted as GameStateData,
    },
  ),
);

// 便利エクスポート（再計算系は lib/progress を直接使う）
export { isBossUnlocked, addDays };
