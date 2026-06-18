import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { sfx } from '../lib/sfx';
import { bigBurst, CONFETTI_COLORS } from '../lib/celebrate';
import { ProgressBar, SectionTitle } from '../components/common';

export function QuestScreen() {
  const daily = useGameStore((s) => s.daily);
  const claimDaily = useGameStore((s) => s.claimDaily);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  if (!daily) {
    return (
      <div className="panel p-6 text-center text-night-100/70">クエストを準備中…</div>
    );
  }

  const allDone = daily.goals.every((g) => g.progress >= g.target);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="panel p-5">
        <SectionTitle icon="📜">今日のクエスト</SectionTitle>
        <p className="mb-4 text-sm text-night-100/70">
          毎日少しずつ。すべて達成して連続日数を伸ばそう。本日の獲得：
          <span className="ml-1 font-bold text-gold-300">{daily.xpToday} XP</span>
        </p>

        <div className="space-y-3">
          {daily.goals.map((g) => {
            const done = g.progress >= g.target;
            return (
              <div key={g.id} className="rounded-xl border border-night-700 bg-night-800/50 p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className={`font-semibold ${done ? 'text-leaf-400' : 'text-parchment'}`}>
                    {done ? '✅ ' : ''}
                    {g.labelJa}
                  </span>
                  <span className="text-xs text-night-100/60">
                    {Math.min(g.progress, g.target)}/{g.target}
                  </span>
                </div>
                <ProgressBar
                  value={g.progress}
                  max={g.target}
                  barClass={done ? 'bg-leaf-500' : 'bg-arcane-500'}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          {daily.claimed ? (
            <div className="rounded-xl bg-leaf-500/15 p-3 text-center font-semibold text-leaf-400">
              🎉 本日のクエスト達成済み！また明日。
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full disabled:opacity-50"
              disabled={!allDone}
              onClick={() => {
                claimDaily();
                sfx.daily();
                if (!reducedMotion) bigBurst(CONFETTI_COLORS.gold);
              }}
            >
              {allDone ? '報酬を受け取る (+40 XP)' : 'すべて達成すると報酬'}
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Link to="/map" className="btn-ghost flex-1">
          🗺️ マップで学習
        </Link>
        <Link to="/review" className="btn-ghost flex-1">
          🔄 復習する
        </Link>
      </div>
    </div>
  );
}
