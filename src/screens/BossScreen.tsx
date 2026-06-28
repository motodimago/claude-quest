import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CaseQuestion } from '../types';
import { Content } from '../lib/content';
import { CONFIG } from '../data/config';
import { isBossUnlocked } from '../lib/progress';
import { shuffled } from '../lib/shuffle';
import { sfx } from '../lib/sfx';
import { useGameStore } from '../store/useGameStore';
import { OptionButton, Pill, useScrollAnchor } from '../components/common';
import type { OptionStatus } from '../components/common';

export function BossScreen() {
  const { tierId = '' } = useParams();

  const clearBoss = useGameStore((s) => s.clearBoss);
  const records = useGameStore((s) => s.topics);

  const tier = Content.getTier(tierId);
  const unlocked = isBossUnlocked(tierId, records);

  // 出題順と、各問の選択肢の並びをどちらもシャッフルする（正解はデータ上は先頭固定のため）。
  const cases = useMemo<CaseQuestion[]>(
    () =>
      shuffled(Content.tierCases(tierId)).map((c) => ({
        ...c,
        feature: { ...c.feature, options: shuffled(c.feature.options) },
      })),
    [tierId],
  );

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<{ acc: number; won: boolean } | null>(null);
  const top = useScrollAnchor();
  const bottom = useScrollAnchor();

  if (!tier || cases.length === 0) {
    return (
      <div className="panel p-6 text-center">
        <p className="mb-4">このボスはまだ挑戦できません。</p>
        <Link to="/map" className="btn-primary">
          マップへ
        </Link>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="panel p-6 text-center">
        <div className="mb-3 text-4xl">🔒</div>
        <p className="mb-4 text-night-100/80">
          {tier.titleJa} のボスは、ティアを {Math.round(CONFIG.tierUnlockPct * 100)}% 習得すると解放されます。
        </p>
        <Link to="/map" className="btn-primary">
          マップへ戻る
        </Link>
      </div>
    );
  }

  function finish(finalCorrect: number) {
    const acc = finalCorrect / cases.length;
    const won = clearBoss(tierId, acc);
    setResult({ acc, won });
  }

  function choose(optId: string, isCorrect: boolean) {
    if (chosen !== null) return;
    setChosen(optId);
    if (isCorrect) {
      setCorrect((c) => c + 1);
      sfx.correct();
    } else {
      sfx.wrong();
    }
    bottom.scroll('end'); // 解説と「次へ」ボタンまで自動スクロール
  }

  function next() {
    const last = idx + 1 >= cases.length;
    if (last) {
      finish(correct);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      top.scroll('center'); // 次の問題を画面に表示
    }
  }

  function retry() {
    setIdx(0);
    setChosen(null);
    setCorrect(0);
    setResult(null);
  }

  if (result) {
    return (
      <div className="mx-auto max-w-md">
        <div className="panel p-8 text-center">
          <div className="mb-3 text-6xl">{result.won ? '👑' : '💥'}</div>
          <h2 className="mb-2 text-2xl font-black text-gold-400">
            {result.won ? 'ボス撃破！' : 'あと一歩…'}
          </h2>
          <p className="mb-5 text-night-100/75">
            正答率 {Math.round(result.acc * 100)}%（合格ライン {Math.round(CONFIG.boss.minAccuracy * 100)}%）
            {result.won ? '。見事な実戦判断だ。' : '。復習して再挑戦しよう。'}
          </p>
          <div className="flex gap-2">
            {!result.won && (
              <button className="btn-ghost flex-1" onClick={retry}>
                再挑戦
              </button>
            )}
            <Link to="/map" className="btn-primary flex-1">
              マップへ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = cases[idx];
  const answered = chosen !== null;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div ref={top.ref} className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-black text-ember-400">
          ⚔️ {tier.titleJa} ボス戦
        </h1>
        <Pill className="bg-night-800 text-night-100/70">
          {idx + 1} / {cases.length}
        </Pill>
      </div>

      <div className="panel p-5">
        <div className="mb-4 rounded-xl border border-ember-500/40 bg-ember-500/10 p-3">
          <p className="font-semibold leading-relaxed text-parchment">{q.scenarioJa}</p>
        </div>
        <p className="mb-2 font-bold text-arcane-400">{q.feature.promptJa}</p>
        <div className="space-y-2">
          {q.feature.options.map((o) => {
            let status: OptionStatus = 'idle';
            if (answered) {
              if (o.correct) status = 'correct';
              else if (o.id === chosen) status = 'wrong';
            }
            return (
              <OptionButton
                key={o.id}
                label={o.labelJa}
                why={o.whyJa}
                status={status}
                disabled={answered}
                onClick={() => choose(o.id, !!o.correct)}
              />
            );
          })}
        </div>
        {answered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="btn-primary mt-4 w-full"
            onClick={next}
          >
            {idx + 1 >= cases.length ? '結果を見る' : '次の敵へ'}
          </motion.button>
        )}
      </div>
      <div ref={bottom.ref} />
    </div>
  );
}
