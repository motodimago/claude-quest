import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CaseQuestion, StudyBlock, Topic } from '../types';
import { Content } from '../lib/content';
import { CONFIG } from '../data/config';
import { isMastered } from '../lib/progress';
import { shuffled } from '../lib/shuffle';
import { sfx } from '../lib/sfx';
import { CONFETTI_COLORS, fireworks } from '../lib/celebrate';
import { useGameStore } from '../store/useGameStore';
import { OptionButton, Pill, SectionTitle, Stepper, useScrollAnchor } from '../components/common';
import type { OptionStatus } from '../components/common';

type Phase = 'study' | 'quiz' | 'case' | 'done';

// ===== 学習カードのブロック描画 =====
function StudyBlockView({ block }: { block: StudyBlock }) {
  switch (block.type) {
    case 'lead':
      return <p className="text-lg font-semibold leading-relaxed text-parchment">{block.textJa}</p>;
    case 'para':
      return <p className="leading-relaxed text-night-100/85">{block.textJa}</p>;
    case 'list':
      return (
        <div>
          {block.titleJa && <p className="mb-1 font-bold text-arcane-400">{block.titleJa}</p>}
          <ul className="space-y-1.5">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 text-arcane-400">◆</span>
                <span>
                  {it.term && <code className="kbd mr-2">{it.term}</code>}
                  <span className="text-night-100/85">{it.descJa}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'code':
      return (
        <div>
          {block.caption && <p className="mb-1 text-xs text-night-100/50">{block.caption}</p>}
          <pre className="overflow-x-auto rounded-xl border border-night-700 bg-night-950 p-3 text-sm text-leaf-400">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case 'tip':
      return (
        <div className="rounded-xl border border-leaf-500/40 bg-leaf-500/10 p-3 text-sm">
          💡 <span className="text-night-100/85">{block.textJa}</span>
        </div>
      );
    case 'warn':
      return (
        <div className="rounded-xl border border-ember-500/40 bg-ember-500/10 p-3 text-sm">
          ⚠️ <span className="text-night-100/85">{block.textJa}</span>
        </div>
      );
    case 'kbd':
      return (
        <div className="flex items-center gap-2 text-sm">
          <code className="kbd">{block.keys}</code>
          <span className="text-night-100/85">{block.descJa}</span>
        </div>
      );
    default:
      return null;
  }
}

function StudyView({ topic, onNext }: { topic: Topic; onNext: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-arcane-500/30 bg-arcane-500/10 p-3 text-night-100/90">
        {topic.study.summaryJa}
      </div>
      <div className="space-y-3">
        {topic.study.blocks.map((b, i) => (
          <StudyBlockView key={i} block={b} />
        ))}
      </div>
      {topic.study.links && topic.study.links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {topic.study.links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-arcane-400 underline hover:text-arcane-500"
            >
              📖 {l.labelJa}
            </a>
          ))}
        </div>
      )}
      <button className="btn-primary w-full" onClick={onNext}>
        理解した → クイズへ
      </button>
    </div>
  );
}

// ===== クイズ =====
function QuizView({ topic, onDone }: { topic: Topic; onDone: () => void }) {
  const recordQuiz = useGameStore((s) => s.recordQuiz);
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const top = useScrollAnchor();
  const bottom = useScrollAnchor();

  if (topic.quiz.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-night-100/70">このトピックにクイズはありません。</p>
        <button className="btn-primary w-full" onClick={onDone}>
          ケースへ進む
        </button>
      </div>
    );
  }

  const q = topic.quiz[qi];
  // 表示用に選択肢をシャッフル（正解はデータ上は常に先頭のため）。問題ごとに固定。
  const options = useMemo(
    () => shuffled(q.options.map((o, i) => ({ ...o, isCorrect: i === q.correct }))),
    [q],
  );
  const answered = chosen !== null;

  function choose(i: number) {
    if (answered) return;
    setChosen(i);
    const ok = options[i].isCorrect;
    recordQuiz(topic.id, ok);
    if (ok) sfx.correct();
    else sfx.wrong();
    bottom.scroll('end'); // 解説と「次へ」ボタンまで自動スクロール
  }
  function next() {
    if (qi + 1 < topic.quiz.length) {
      setQi(qi + 1);
      setChosen(null);
      top.scroll('center'); // 次の問題を画面に表示
    } else {
      onDone();
    }
  }

  return (
    <div className="space-y-4">
      <div ref={top.ref} className="flex items-center justify-between text-xs text-night-100/50">
        <span>
          クイズ {qi + 1} / {topic.quiz.length}
        </span>
        <Pill className="bg-arcane-500/20 text-arcane-400">+{q.xp} XP</Pill>
      </div>
      <p className="text-lg font-semibold text-parchment">{q.promptJa}</p>
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
        <button className="btn-primary w-full" onClick={next}>
          {qi + 1 < topic.quiz.length ? '次のクイズへ' : 'ケースへ進む'}
        </button>
      )}
      <div ref={bottom.ref} />
    </div>
  );
}

// ===== ケース（2段階）=====
function CasePlayer({
  caseQ,
  onSolved,
  onInteract,
}: {
  caseQ: CaseQuestion;
  onSolved: (flawless: boolean) => void;
  onInteract: () => void;
}) {
  const [aReveal, setAReveal] = useState<Record<string, boolean>>({});
  const [aWrong, setAWrong] = useState(false);
  const [step, setStep] = useState<'A' | 'B'>('A');
  const [bReveal, setBReveal] = useState<Record<number, boolean>>({});
  const [bWrong, setBWrong] = useState(false);
  const [solved, setSolved] = useState(false);

  // 表示用に各ステップの選択肢をシャッフル（正解はデータ上は常に先頭のため）。
  const aOptions = useMemo(() => shuffled(caseQ.feature.options), [caseQ]);
  const bOptions = useMemo(() => shuffled(caseQ.invoke.options), [caseQ]);

  const aCorrectChosen = caseQ.feature.options.some((o) => o.correct && aReveal[o.id]);

  function chooseA(id: string, correct: boolean) {
    if (aCorrectChosen) return;
    setAReveal((r) => ({ ...r, [id]: true }));
    if (!correct) setAWrong(true);
    if (correct) sfx.correct();
    else sfx.wrong();
    onInteract(); // 解説／次ステップのボタンまで自動スクロール
  }
  function chooseB(idx: number, correct: boolean) {
    if (solved) return;
    setBReveal((r) => ({ ...r, [idx]: true }));
    if (correct) {
      setSolved(true);
      onSolved(!aWrong && !bWrong);
      sfx.correct();
    } else {
      setBWrong(true);
      sfx.wrong();
    }
    onInteract();
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-ember-500/40 bg-ember-500/10 p-4">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-ember-400">実戦ケース</p>
        <p className="font-semibold leading-relaxed text-parchment">{caseQ.scenarioJa}</p>
      </div>

      {/* Step A: 機能を選ぶ */}
      <div>
        <p className="mb-2 font-bold text-arcane-400">① {caseQ.feature.promptJa}</p>
        <div className="space-y-2">
          {aOptions.map((o) => {
            const revealed = !!aReveal[o.id];
            const status: OptionStatus = !revealed ? 'idle' : o.correct ? 'correct' : 'wrong';
            return (
              <OptionButton
                key={o.id}
                label={o.labelJa}
                why={o.whyJa}
                status={status}
                disabled={aCorrectChosen || revealed}
                onClick={() => chooseA(o.id, !!o.correct)}
              />
            );
          })}
        </div>
      </div>

      {/* Step B: 操作を選ぶ（A 正解後に表示）*/}
      {aCorrectChosen && step === 'A' && (
        <button
          className="btn-primary w-full"
          onClick={() => {
            setStep('B');
            onInteract();
          }}
        >
          ② 操作の選択へ
        </button>
      )}
      {step === 'B' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mb-2 font-bold text-arcane-400">② {caseQ.invoke.promptJa}</p>
          <div className="space-y-2">
            {bOptions.map((o, i) => {
              const revealed = !!bReveal[i];
              const status: OptionStatus = !revealed ? 'idle' : o.correct ? 'correct' : 'wrong';
              return (
                <OptionButton
                  key={i}
                  label={o.textJa}
                  why={o.whyJa}
                  status={status}
                  disabled={solved || revealed}
                  onClick={() => chooseB(i, !!o.correct)}
                />
              );
            })}
          </div>
        </motion.div>
      )}

      {solved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-leaf-500/50 bg-leaf-500/10 p-3"
        >
          🏆 <span className="font-semibold text-leaf-400">{caseQ.rewardJa}</span>
          {!aWrong && !bWrong && (
            <span className="ml-2 text-gold-300">⚡ 一撃必殺ボーナス！</span>
          )}
        </motion.div>
      )}
    </div>
  );
}

function CaseView({ topic, onDone }: { topic: Topic; onDone: () => void }) {
  const recordCase = useGameStore((s) => s.recordCase);
  const [ci, setCi] = useState(0);
  const [solvedThis, setSolvedThis] = useState(false);
  const top = useScrollAnchor();
  const bottom = useScrollAnchor();

  if (topic.cases.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-night-100/70">このトピックにケースはありません。</p>
        <button className="btn-primary w-full" onClick={onDone}>
          完了
        </button>
      </div>
    );
  }

  const caseQ = topic.cases[ci];

  function handleSolved(flawless: boolean) {
    recordCase(topic.id, true, flawless);
    setSolvedThis(true);
    bottom.scroll('end'); // 報酬と「次へ」ボタンまで自動スクロール
  }
  function next() {
    if (ci + 1 < topic.cases.length) {
      setCi(ci + 1);
      setSolvedThis(false);
      top.scroll('center'); // 次のケースを画面に表示
    } else {
      onDone();
    }
  }

  return (
    <div className="space-y-4">
      <div ref={top.ref} className="flex items-center justify-between text-xs text-night-100/50">
        <span>
          ケース {ci + 1} / {topic.cases.length}
        </span>
        <Pill className="bg-ember-500/20 text-ember-400">+{caseQ.xp} XP</Pill>
      </div>
      <CasePlayer key={caseQ.id} caseQ={caseQ} onSolved={handleSolved} onInteract={() => bottom.scroll('end')} />
      {solvedThis && (
        <button className="btn-primary w-full" onClick={next}>
          {ci + 1 < topic.cases.length ? '次のケースへ' : '完了'}
        </button>
      )}
      <div ref={bottom.ref} />
    </div>
  );
}

// ===== 画面本体 =====
export function TopicScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recordStudy = useGameStore((s) => s.recordStudy);
  const rec = useGameStore((s) => (id ? s.topics[id] : undefined));
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);
  const [phase, setPhase] = useState<Phase>('study');

  const mastered = isMastered(rec);

  // クリア演出：習得して完了画面に到達したら、豪華ファンファーレ＋花火。
  useEffect(() => {
    if (phase === 'done' && mastered) {
      sfx.clear();
      if (!reducedMotion) fireworks(CONFETTI_COLORS.gold, 1600);
    }
  }, [phase, mastered, reducedMotion]);

  const topic = id ? Content.getTopic(id) : undefined;
  if (!topic) {
    return (
      <div className="panel p-6 text-center">
        <p className="mb-4">トピックが見つかりません。</p>
        <Link to="/map" className="btn-primary">
          マップへ戻る
        </Link>
      </div>
    );
  }

  const steps = [
    { key: 'study', labelJa: '学習' },
    { key: 'quiz', labelJa: 'クイズ' },
    { key: 'case', labelJa: 'ケース' },
  ];
  const currentStep = phase === 'study' ? 0 : phase === 'quiz' ? 1 : 2;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <Link to="/map" className="text-sm text-night-100/60 hover:text-arcane-400">
          ← マップ
        </Link>
        <div className="flex items-center gap-2 text-xs text-night-100/60">
          <span>
            クイズ {rec?.quizCorrect ?? 0}/{CONFIG.mastery.minQuizCorrect}
          </span>
          <span>
            ケース {rec?.caseCorrect ?? 0}/{CONFIG.mastery.minCaseCorrect}
          </span>
          {mastered && <Pill className="bg-gold-400/20 text-gold-300">✅ 習得済</Pill>}
        </div>
      </div>

      <div className="panel p-5">
        <SectionTitle icon={topic.icon}>
          {topic.titleJa}
          <span className="ml-2 text-sm font-normal text-night-100/50">{topic.title}</span>
        </SectionTitle>
        <div className="mb-5">
          <Stepper steps={steps} current={currentStep} />
        </div>

        {phase === 'study' && (
          <StudyView
            topic={topic}
            onNext={() => {
              recordStudy(topic.id);
              setPhase('quiz');
            }}
          />
        )}
        {phase === 'quiz' && <QuizView topic={topic} onDone={() => setPhase('case')} />}
        {phase === 'case' && <CaseView topic={topic} onDone={() => setPhase('done')} />}
        {phase === 'done' && (
          <div className="space-y-4 py-2 text-center">
            {mastered ? (
              <>
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-arcane-500 blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="relative text-6xl"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: [0, 1.4, 1], rotate: [-30, 12, 0] }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
                  >
                    🌟
                  </motion.div>
                </div>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                >
                  <p className="text-sm font-black tracking-[0.35em] text-gold-300">★ CLEAR ★</p>
                  <h3 className="text-2xl font-black text-gold-400">習得完了！</h3>
                </motion.div>
                <p className="text-night-100/75">
                  このトピックを習得した。マップで次のノードが開かれているかも。
                </p>
              </>
            ) : (
              <>
                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-5xl">
                  🎉
                </motion.div>
                <h3 className="text-xl font-black text-gold-400">ひと回り完了！</h3>
                <p className="text-night-100/75">
                  よくやった。習得にはクイズとケースの正解をもう少し重ねよう。
                </p>
              </>
            )}
            <div className="flex gap-2">
              <button className="btn-ghost flex-1" onClick={() => setPhase('study')}>
                もう一度
              </button>
              <button className="btn-primary flex-1" onClick={() => navigate('/map')}>
                マップへ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
