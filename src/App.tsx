import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Toaster } from './components/Toaster';
import { Celebration } from './components/Celebration';
import { useGameStore } from './store/useGameStore';
import { setSfxEnabled, sfx } from './lib/sfx';
import { MapScreen } from './screens/MapScreen';
import { TopicScreen } from './screens/TopicScreen';
import { QuestScreen } from './screens/QuestScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import { StatsScreen } from './screens/StatsScreen';
import { BossScreen } from './screens/BossScreen';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="mx-auto max-w-5xl px-4 py-6"
      >
        <Routes location={location}>
          <Route path="/map" element={<MapScreen />} />
          <Route path="/topic/:id" element={<TopicScreen />} />
          <Route path="/quest" element={<QuestScreen />} />
          <Route path="/review" element={<ReviewScreen />} />
          <Route path="/stats" element={<StatsScreen />} />
          <Route path="/boss/:tierId" element={<BossScreen />} />
          <Route path="*" element={<Navigate to="/map" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// 通知の種類に応じて効果音を鳴らす（習得・バッジ）。
// レベルアップ／ボスは Celebration 側で鳴らすためここでは扱わない。
function useNotificationSfx() {
  const notifications = useGameStore((s) => s.notifications);
  const seen = useRef<Set<string>>(new Set());
  useEffect(() => {
    for (const n of notifications) {
      if (seen.current.has(n.id)) continue;
      seen.current.add(n.id);
      if (n.kind === 'badge') sfx.badge();
      else if (n.kind === 'mastered') sfx.master();
    }
  }, [notifications]);
}

export default function App() {
  const rolloverDay = useGameStore((s) => s.rolloverDay);
  const ensureDaily = useGameStore((s) => s.ensureDaily);
  const sound = useGameStore((s) => s.settings.sound);

  useEffect(() => {
    rolloverDay();
    ensureDaily();
  }, [rolloverDay, ensureDaily]);

  // 効果音の有効/無効を設定と同期
  useEffect(() => {
    setSfxEnabled(sound);
  }, [sound]);

  // ボタン/リンクの汎用クリック音（data-sfx="skip" の要素は除外）
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest('button, a[href]');
      if (!el || el.getAttribute('data-sfx') === 'skip') return;
      sfx.click();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useNotificationSfx();

  return (
    <div className="min-h-full">
      <Header />
      <AnimatedRoutes />
      <Toaster />
      <Celebration />
    </div>
  );
}
