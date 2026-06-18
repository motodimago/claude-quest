import type { Topic, TopicRecord, TopicState, TierId } from '../types';
import { CONFIG } from '../data/config';
import { Content } from './content';

type Records = Record<string, TopicRecord>;

export function isMastered(rec: TopicRecord | undefined): boolean {
  if (!rec) return false;
  return (
    rec.quizCorrect >= CONFIG.mastery.minQuizCorrect &&
    rec.caseCorrect >= CONFIG.mastery.minCaseCorrect
  );
}

/** ティアの習得率 0..1（active なティアのみ意味を持つ）*/
export function tierMasteryPct(tierId: TierId, records: Records): number {
  const topics = Content.tierTopics(tierId);
  if (topics.length === 0) return 0;
  const mastered = topics.filter((t) => isMastered(records[t.id])).length;
  return mastered / topics.length;
}

export function masteredCountInTier(tierId: TierId, records: Records): number {
  return Content.tierTopics(tierId).filter((t) => isMastered(records[t.id])).length;
}

export function isTierUnlocked(tierId: TierId, records: Records): boolean {
  const tier = Content.getTier(tierId);
  if (!tier) return false;
  if (tier.unlock.type === 'always') return true;
  if (tier.unlock.type === 'tierMastery' && tier.unlock.tierId) {
    return tierMasteryPct(tier.unlock.tierId, records) >= (tier.unlock.pct ?? CONFIG.tierUnlockPct);
  }
  return false;
}

/** ボス戦が解放されているか（そのティアが習得率しきい値に達した）*/
export function isBossUnlocked(tierId: TierId, records: Records): boolean {
  const tier = Content.getTier(tierId);
  if (!tier || tier.status !== 'active') return false;
  return tierMasteryPct(tierId, records) >= CONFIG.tierUnlockPct;
}

/** マップ描画用：トピックの状態を records から導出する */
export function computeTopicState(topic: Topic, records: Records): TopicState {
  const rec = records[topic.id];
  if (isMastered(rec)) return 'mastered';
  if (!isTierUnlocked(topic.tier, records)) return 'locked';
  const prereqsMet = topic.requires.every((rid) => isMastered(records[rid]));
  if (!prereqsMet) return 'locked';
  if (rec && rec.attempts > 0) return 'learning';
  return 'available';
}

export function totalMasteredCount(records: Records): number {
  return Content.allTopics.filter((t) => isMastered(records[t.id])).length;
}
