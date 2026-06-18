import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import type { NotifKind } from '../store/useGameStore';

const ICON: Record<NotifKind, string> = {
  xp: '✨',
  badge: '🏅',
  mastered: '🌟',
  levelup: '⬆️',
  info: 'ℹ️',
};

const TONE: Record<NotifKind, string> = {
  xp: 'border-arcane-500/50',
  badge: 'border-gold-400/60',
  mastered: 'border-gold-400/60',
  levelup: 'border-arcane-400/60',
  info: 'border-night-600',
};

export function Toaster() {
  const notifications = useGameStore((s) => s.notifications);
  const dismiss = useGameStore((s) => s.dismissNotification);

  // 最大4件表示
  const shown = notifications.slice(-4);

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map((n) =>
      setTimeout(() => dismiss(n.id), n.kind === 'badge' || n.kind === 'levelup' ? 4500 : 2600),
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, dismiss]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex w-72 flex-col gap-2">
      <AnimatePresence initial={false}>
        {shown.map((n) => (
          <motion.div
            key={n.id}
            layout
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            className={`panel pointer-events-auto cursor-pointer border-l-4 p-3 ${TONE[n.kind]}`}
            onClick={() => dismiss(n.id)}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{ICON[n.kind]}</span>
              <div>
                <p className="font-bold leading-tight">{n.titleJa}</p>
                {n.descJa && <p className="text-sm text-night-100/70">{n.descJa}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
