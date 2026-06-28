import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Topic } from '../types';
import { Content } from '../lib/content';
import { shuffled } from '../lib/shuffle';
import { SRS } from '../lib/srs';
import { useGameStore } from '../store/useGameStore';
import { OptionButton, Pill, SectionTitle } from '../components/common';
import type { OptionStatus } from '../components/common';

export function ReviewScreen() {
  const reviewAnswer = useGameStore((s) => s.reviewAnswer);

  // マウント時に期限到来トピックをスナップショット（クイズを持つもの）。
  // 選択肢は表示用にシャッフルして保持する（正解はデータ上は先頭固定のため）。
  const queue = useMemo(() => {
    const records = useGameStore.getState().topics;
    return Content.allTopics
      .filter((t) => SRS.isDue(records[t.id]?.srs) && t.quiz.length > 0)
      .map((t: Topic) => {
        const q = t.quiz[0];
        return {
          topic: t,
          options: shuffled(q.options.map((o, i) => ({ ...o, isCorrect: i === q.correct }))),
        };
      });
  }, []);

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [doneCount, setDoneCount] = useState(0);

  if (queue.length === 0) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="panel p-8 text-center">
          <div className="mb-3 text-5xl">🌙</div>
          <h2 className="mb-2 text-xl font-bold text-parchment">今日の復習は完了！</h2>
          <p className="mb-5 text-night-100/70">
            習得したトピックは間隔をあけて復習に戻ってきます。また後で覗いてみよう。
          </p>
          <Link to="/map" className="btn-primary">
            マップへ
          </Link>
        </div>
      </div>
    );
  }

  if (idx >= queue.length) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="panel p-8 text-center">
          <div className="mb-3 text-5xl">✨</div>
          <h2 className="mb-2 text-xl font-bold text-parchment">復習セッション完了</h2>
          <p className="mb-5 text-night-100/70">{doneCount} 件を復習した。記憶が定着していく。</p>
          <Link to="/map" className="btn-primary">
            マップへ
          </Link>
        </div>
      </div>
    );
  }

  const { topic, options } = queue[idx];
  const q = topic.quiz[0];
  const answered = chosen !== null;

  function choose(i: number) {
    if (answered) return;
    setChosen(i);
    reviewAnswer(topic.id, options[i].isCorrect);
  }
  function next() {
    setDoneCount((c) => c + 1);
    setIdx((i) => i + 1);
    setChosen(null);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <SectionTitle icon="🔄">復習</SectionTitle>
        <Pill className="bg-night-800 text-night-100/70">
          {idx + 1} / {queue.length}
        </Pill>
      </div>
      <div className="panel p-5">
        <p className="mb-1 text-xs text-night-100/50">{topic.titleJa}</p>
        <p className="mb-4 text-lg font-semibold text-parchment">{q.promptJa}</p>
        <div className="space-y-2">
          {options.map((o, i) => {
            let status: OptionStatus = 'idle';
            if (answered) {
              if (o.isCorrect) status = 'correct';
              else if (i === chosen) status = 'wrong';
            }
            return (
              <OptionButton
                key={i}
                label={o.textJa}
                why={o.whyJa}
                status={status}
                disabled={answered}
                onClick={() => choose(i)}
              />
            );
          })}
        </div>
        {answered && (
          <button className="btn-primary mt-4 w-full" onClick={next}>
            {idx + 1 < queue.length ? '次へ' : '復習を終える'}
          </button>
        )}
      </div>
    </div>
  );
}
