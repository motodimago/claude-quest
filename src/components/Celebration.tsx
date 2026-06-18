import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Content } from '../lib/content';
import { sfx } from '../lib/sfx';
import { CONFETTI_COLORS, fireworks } from '../lib/celebrate';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );
}

export function Celebration() {
  const celebration = useGameStore((s) => s.celebration);
  const clear = useGameStore((s) => s.clearCelebration);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  useEffect(() => {
    if (!celebration) return;
    // 効果音はモーション軽減に関係なく鳴らす
    if (celebration.kind === 'levelup') sfx.levelup();
    else if (celebration.kind === 'boss') sfx.boss();
    if (reducedMotion || prefersReducedMotion()) return;
    if (celebration.kind === 'boss') {
      fireworks(CONFETTI_COLORS.ember, 1900);
    } else {
      fireworks(CONFETTI_COLORS.arcane, 1300);
    }
  }, [celebration, reducedMotion]);

  const isBoss = celebration?.kind === 'boss';
  let title = '';
  let body = '';
  let icon = '🎉';
  if (celebration?.kind === 'levelup') {
    icon = '⬆️';
    title = `レベル ${celebration.level}！`;
    body = `称号「${celebration.titleJa}」に到達した。`;
  } else if (celebration?.kind === 'boss') {
    const tier = Content.getTier(celebration.tierId);
    icon = '👑';
    title = 'ボス撃破！';
    body = `${tier?.titleJa ?? celebration.tierId} を制覇した。次なる地が開かれる。`;
  }

  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={clear}
        >
          {/* 暗幕＋中央フラッシュ */}
          <div className="absolute inset-0 bg-night-950/75 backdrop-blur-sm" />
          <motion.div
            className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full blur-2xl"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.3, 1], opacity: [0, 0.9, 0.5] }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              background: isBoss
                ? 'radial-gradient(circle, rgba(255,107,61,0.5), transparent 60%)'
                : 'radial-gradient(circle, rgba(109,125,255,0.5), transparent 60%)',
            }}
          />

          <motion.div
            className="panel relative max-w-sm overflow-hidden p-8 text-center"
            initial={{ scale: 0.5, y: 40, rotate: -4 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* アイコン＋脈動グロー */}
            <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${isBoss ? 'from-ember-500 to-gold-400' : 'from-arcane-500 to-gold-400'} blur-xl`}
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative text-6xl"
                animate={{ rotate: [0, -12, 12, -6, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 0.9 }}
              >
                {icon}
              </motion.div>
            </div>

            {/* きらめき */}
            <div className="pointer-events-none absolute inset-0">
              {['✨', '⭐', '✨', '⭐'].map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl"
                  style={{ left: `${15 + i * 23}%`, top: i % 2 ? '18%' : '70%' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: [0, -10, 0] }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.12, repeat: Infinity, repeatDelay: 0.6 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>

            <motion.h2
              className="mb-2 text-3xl font-black text-gold-400"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
            >
              {title}
            </motion.h2>
            <p className="mb-6 text-night-100/80">{body}</p>
            <button className="btn-primary w-full" onClick={clear}>
              続ける
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
