import confetti from 'canvas-confetti';

// prefers-reduced-motion を尊重（OS設定）
function osReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );
}

const GOLD = ['#ffe08a', '#ffce5c', '#f5b73d', '#fff4d6'];
const ARCANE = ['#8b9cff', '#6d7dff', '#ffce5c', '#ffffff'];
const EMBER = ['#ff8a5c', '#ff6b3d', '#f5b73d', '#fff0e6'];

export const CONFETTI_COLORS = { gold: GOLD, arcane: ARCANE, ember: EMBER };

// 単発の大きめバースト
export function bigBurst(colors: string[] = GOLD) {
  if (osReducedMotion()) return;
  confetti({
    particleCount: 150,
    spread: 100,
    startVelocity: 48,
    origin: { y: 0.5 },
    colors,
    scalar: 1.1,
  });
}

// 派手な「クリア」演出：中央の大バースト＋左右の砲から連続花火。
export function fireworks(colors: string[] = GOLD, durationMs = 1500) {
  if (osReducedMotion()) return;
  // 中央の大バースト
  confetti({
    particleCount: 160,
    spread: 120,
    startVelocity: 52,
    origin: { y: 0.5 },
    colors,
    scalar: 1.2,
  });
  // 左右の砲から連続発射
  let count = 0;
  const shots = Math.max(1, Math.floor(durationMs / 250));
  const timer = window.setInterval(() => {
    confetti({
      particleCount: 28,
      angle: 60,
      spread: 75,
      startVelocity: 45,
      origin: { x: 0.04, y: 0.78 },
      colors,
    });
    confetti({
      particleCount: 28,
      angle: 120,
      spread: 75,
      startVelocity: 45,
      origin: { x: 0.96, y: 0.78 },
      colors,
    });
    if (++count >= shots) window.clearInterval(timer);
  }, 250);
}
