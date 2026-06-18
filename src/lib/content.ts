import type { CaseQuestion, Tier, TierId, Topic, TopicId } from '../types';
import { TIERS } from '../data/tiers';
import { ALL_TOPICS } from '../data/topics';

// ===== コンテンツの索引（プレイヤー状態は一切持たない純粋データ）=====

const topicById = new Map<TopicId, Topic>();
const topicsByTier = new Map<TierId, Topic[]>();
const tierById = new Map<TierId, Tier>();

for (const tier of TIERS) {
  tierById.set(tier.id, tier);
  topicsByTier.set(tier.id, []);
}
for (const topic of ALL_TOPICS) {
  topicById.set(topic.id, topic);
  const list = topicsByTier.get(topic.tier);
  if (list) list.push(topic);
}
// ティア内は order で並べる
for (const list of topicsByTier.values()) {
  list.sort((a, b) => a.order - b.order);
}

export const Content = {
  tiers: TIERS,
  allTopics: ALL_TOPICS,

  getTier(id: TierId): Tier | undefined {
    return tierById.get(id);
  },

  getTopic(id: TopicId): Topic | undefined {
    return topicById.get(id);
  },

  tierTopics(tierId: TierId): Topic[] {
    return topicsByTier.get(tierId) ?? [];
  },

  /** ティア内の全ケース（ボス戦用）をシャッフルせずに返す */
  tierCases(tierId: TierId): CaseQuestion[] {
    return this.tierTopics(tierId).flatMap((t) => t.cases);
  },

  /** active なティア（中身あり）だけ */
  activeTiers(): Tier[] {
    return TIERS.filter((t) => t.status === 'active');
  },

  /** 直前ティア（order-1）。無ければ undefined */
  prevTier(tierId: TierId): Tier | undefined {
    const t = tierById.get(tierId);
    if (!t) return undefined;
    return TIERS.find((x) => x.order === t.order - 1);
  },
};
