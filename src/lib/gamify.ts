import { CONFIG } from '../data/config';
import { BADGES } from '../data/badges';
import type { BadgeContext } from '../types';

// レベル L -> L+1 に必要な XP
export function levelXp(level: number): number {
  return Math.round((CONFIG.xp.base * Math.pow(level, CONFIG.xp.exp)) / 10) * 10;
}

// 累計 XP からレベルと「現レベル内の進捗」を求める
export function levelFromXp(xp: number): {
  level: number;
  intoLevel: number; // 現レベルで稼いだ XP
  needed: number; // 次レベルに必要な XP
} {
  let level = 1;
  let remaining = Math.max(0, Math.floor(xp));
  // 暴走防止に上限を設ける
  while (level < 999 && remaining >= levelXp(level)) {
    remaining -= levelXp(level);
    level++;
  }
  return { level, intoLevel: remaining, needed: levelXp(level) };
}

export function levelTitle(level: number): string {
  let title: string = CONFIG.levelTitles[0].titleJa;
  for (const t of CONFIG.levelTitles) {
    if (level >= t.minLevel) title = t.titleJa;
  }
  return title;
}

// 条件を満たすバッジ id の一覧
export function evaluateBadges(ctx: BadgeContext): string[] {
  return BADGES.filter((b) => b.test(ctx)).map((b) => b.id);
}
