import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Tier, Topic, TopicState } from '../types';
import { Content } from '../lib/content';
import {
  computeTopicState,
  isBossUnlocked,
  isTierUnlocked,
  tierMasteryPct,
} from '../lib/progress';
import { useGameStore } from '../store/useGameStore';
import { MasteryRing, Pill } from '../components/common';

const CELL_W = 128;
const CELL_H = 116;

const NODE_STYLE: Record<TopicState, string> = {
  locked: 'border-night-700 bg-night-800 text-night-100/30',
  available: 'border-arcane-400 bg-night-800 text-arcane-400 shadow-glow animate-pulse-glow',
  learning: 'border-gold-400/70 bg-night-800 text-gold-300',
  mastered: 'border-gold-400 bg-gold-400/15 text-gold-300 shadow-glow-gold',
};

const STATE_BADGE: Record<TopicState, string> = {
  locked: '🔒',
  available: '!',
  learning: '⚔️',
  mastered: '✅',
};

function center(pos: { col: number; row: number }) {
  return { x: (pos.col - 0.5) * CELL_W, y: (pos.row - 0.5) * CELL_H };
}

function TopicNode({ topic, state }: { topic: Topic; state: TopicState }) {
  const { x, y } = center(topic.mapPos);
  const locked = state === 'locked';
  const node = (
    <motion.div
      whileHover={locked ? {} : { scale: 1.08 }}
      whileTap={locked ? {} : { scale: 0.95 }}
      className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl border-2 text-2xl transition ${NODE_STYLE[state]}`}
    >
      <span>{topic.icon}</span>
    </motion.div>
  );
  return (
    <div
      className="absolute flex w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
      style={{ left: x, top: y }}
    >
      <div className="relative">
        {locked ? (
          <div className="cursor-not-allowed" title="前提を習得すると解放">
            {node}
          </div>
        ) : (
          <Link to={`/topic/${topic.id}`}>{node}</Link>
        )}
        <span className="absolute -right-1 -top-1 text-xs">{STATE_BADGE[state]}</span>
      </div>
      <span className="text-center text-[0.66rem] font-semibold leading-tight text-night-100/80">
        {topic.titleJa}
      </span>
    </div>
  );
}

function TierRegion({ tier, id }: { tier: Tier; id?: string }) {
  const records = useGameStore((s) => s.topics);
  const bossClearedMap = useGameStore((s) => s.counters.bossCleared);

  const topics = Content.tierTopics(tier.id);
  const unlocked = isTierUnlocked(tier.id, records);
  const pct = tierMasteryPct(tier.id, records);
  const bossUnlocked = isBossUnlocked(tier.id, records);
  const bossCleared = !!bossClearedMap[tier.id];

  const maxCol = Math.max(...topics.map((t) => t.mapPos.col), 1);
  const maxRow = Math.max(...topics.map((t) => t.mapPos.row), 1);
  const bossPos = { col: maxCol + 1, row: 1 };
  const width = (maxCol + 1) * CELL_W;
  const height = maxRow * CELL_H;
  const byId = new Map(topics.map((t) => [t.id, t]));

  const bossCenter = center(bossPos);

  return (
    <section id={id} className={`panel scroll-mt-24 overflow-hidden p-4 ${unlocked ? '' : 'opacity-70'}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{tier.icon}</span>
          <div>
            <h3 className="font-bold text-parchment">
              {tier.titleJa}
              <span className="ml-2 text-xs font-normal text-night-100/50">{tier.title}</span>
            </h3>
            <p className="text-xs text-night-100/60">{tier.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!unlocked && <Pill className="bg-night-700 text-night-100/70">🔒 未解放</Pill>}
          <MasteryRing pct={pct} />
        </div>
      </div>

      {!unlocked && (
        <p className="mb-2 text-xs text-ember-400">
          前のティアを {Math.round((tier.unlock.pct ?? 0.8) * 100)}% 習得すると解放されます。
        </p>
      )}

      <div className="overflow-x-auto pb-2">
        <div className="relative" style={{ width, height }}>
          {/* 前提のつながり（スキルツリーの辺）*/}
          <svg className="absolute inset-0 h-full w-full" style={{ width, height }}>
            {topics.flatMap((t) =>
              t.requires
                .map((rid) => byId.get(rid))
                .filter((p): p is Topic => !!p)
                .map((p) => {
                  const a = center(p.mapPos);
                  const b = center(t.mapPos);
                  return (
                    <line
                      key={`${p.id}-${t.id}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#343c6e"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                  );
                }),
            )}
          </svg>

          {topics.map((t) => (
            <TopicNode key={t.id} topic={t} state={computeTopicState(t, records)} />
          ))}

          {/* ボスノード */}
          <div
            className="absolute flex w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: bossCenter.x, top: bossCenter.y }}
          >
            {bossUnlocked ? (
              <Link to={`/boss/${tier.id}`}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-2xl ${
                    bossCleared
                      ? 'border-gold-400 bg-gold-400/20 shadow-glow-gold'
                      : 'border-ember-500 bg-ember-500/15 text-ember-400 shadow-glow animate-pulse-glow'
                  }`}
                >
                  {bossCleared ? '👑' : '⚔️'}
                </motion.div>
              </Link>
            ) : (
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-night-700 bg-night-800 text-2xl text-night-100/30"
                title="ティアを80%習得すると解放"
              >
                ⚔️
              </div>
            )}
            <span className="text-center text-[0.66rem] font-semibold text-ember-400/80">
              BOSS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StubTier({ tier }: { tier: Tier }) {
  return (
    <section className="panel flex items-center gap-3 border-dashed p-3 opacity-60">
      <span className="text-xl grayscale">{tier.icon}</span>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-night-100/70">
          {tier.titleJa}
          <span className="ml-2 text-xs font-normal text-night-100/40">{tier.title}</span>
        </h3>
        <p className="text-xs text-night-100/40">{tier.desc}</p>
      </div>
      <Pill className="bg-night-800 text-night-100/50">近日公開</Pill>
    </section>
  );
}

export function MapScreen() {
  const records = useGameStore((s) => s.topics);

  // いま一番進んでいる（最前線の）ティアを求める：解放済みアクティブティアのうち、
  // まだ習得しきっていない最も奥のもの。先頭ティアが最前線のとき（＝序盤）は
  // イントロを隠さないようにスクロールしない。
  const frontierId = useMemo(() => {
    const active = Content.tiers.filter((t) => t.status === 'active');
    const unlocked = active.filter((t) => isTierUnlocked(t.id, records));
    const frontier =
      [...unlocked].reverse().find((t) => tierMasteryPct(t.id, records) < 1) ??
      unlocked[unlocked.length - 1] ??
      active[0];
    return frontier && frontier.id !== active[0]?.id ? frontier.id : undefined;
  }, [records]);

  // 戻ってきたら最前線のティアまで自動スクロール（マウント時に一度だけ）。
  useEffect(() => {
    if (!frontierId) return;
    const raf = requestAnimationFrame(() => {
      document
        .getElementById(`tier-${frontierId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
    // frontierId はマウント時点の値で十分（戻るたびに一度だけ実行）。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <h1 className="flex items-center gap-2 text-xl font-black text-parchment">
          🗺️ ワールドマップ
        </h1>
        <p className="mt-1 text-sm text-night-100/70">
          各機能はノード。<span className="text-arcane-400">⚔️学習中</span>・
          <span className="text-gold-300">✅習得済</span>・<span className="text-night-100/40">🔒未解放</span> が一目で分かる。
          ノードを選んで学習を始めよう。
        </p>
      </div>
      {Content.tiers.map((tier) =>
        tier.status === 'active' ? (
          <TierRegion key={tier.id} tier={tier} id={`tier-${tier.id}`} />
        ) : (
          <StubTier key={tier.id} tier={tier} />
        ),
      )}
    </div>
  );
}
