import { motion } from 'framer-motion';
import { useCallback, useRef, type ReactNode } from 'react';

// 末尾/先頭要素へスムーズスクロールするためのアンカー。
// ref を対象要素に付け、操作後に scroll() を呼ぶ。
// レイアウト確定（フィードバック展開・ボタン出現）を待ってからスクロールする。
export function useScrollAnchor() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useCallback((block: ScrollLogicalPosition = 'end') => {
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block });
      }, 60);
    });
  }, []);
  return { ref, scroll };
}

// ===== 進捗バー =====
export function ProgressBar({
  value,
  max,
  barClass = 'bg-arcane-500',
  className = '',
}: {
  value: number;
  max: number;
  barClass?: string;
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-night-700 ${className}`}>
      <motion.div
        className={`h-full rounded-full ${barClass}`}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  );
}

// ===== ピル/タグ =====
export function Pill({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

// ===== ステッパー（Study → Quiz → Case）=====
export function Stepper({
  steps,
  current,
}: {
  steps: { key: string; labelJa: string }[];
  current: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${
                active
                  ? 'bg-arcane-500 text-white shadow-glow'
                  : done
                    ? 'bg-leaf-500/20 text-leaf-400'
                    : 'bg-night-800 text-night-100/50'
              }`}
            >
              <span>{done ? '✓' : i + 1}</span>
              {s.labelJa}
            </div>
            {i < steps.length - 1 && <span className="text-night-600">→</span>}
          </div>
        );
      })}
    </div>
  );
}

// ===== 選択肢ボタン（クイズ/ケース共通）=====
export type OptionStatus = 'idle' | 'correct' | 'wrong' | 'reveal';

export function OptionButton({
  label,
  status,
  why,
  disabled,
  onClick,
}: {
  label: string;
  status: OptionStatus;
  why?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const tone =
    status === 'correct'
      ? 'border-leaf-500 bg-leaf-500/15'
      : status === 'wrong'
        ? 'border-ember-500 bg-ember-500/15'
        : status === 'reveal'
          ? 'border-leaf-500/60 bg-leaf-500/5'
          : 'border-night-700 bg-night-800/60 hover:border-arcane-500 hover:bg-night-700';
  return (
    <button
      type="button"
      data-sfx="skip"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-xl border p-3 text-left transition disabled:cursor-default ${tone}`}
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-sm">
          {status === 'correct' || status === 'reveal' ? '✅' : status === 'wrong' ? '❌' : '▫️'}
        </span>
        <span className="font-medium leading-snug">{label}</span>
      </div>
      {why && status !== 'idle' && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 pl-6 text-sm text-night-100/70"
        >
          {why}
        </motion.p>
      )}
    </button>
  );
}

// ===== セクション見出し =====
export function SectionTitle({ icon, children }: { icon?: string; children: ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-parchment">
      {icon && <span>{icon}</span>}
      {children}
    </h2>
  );
}

// ===== 円形の習得リング（ティア習得率など）=====
export function MasteryRing({
  pct,
  size = 44,
  label,
}: {
  pct: number;
  size?: number;
  label?: string;
}) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(1, Math.max(0, pct)));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#262c52" strokeWidth={5} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f5b73d"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: off }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        />
      </svg>
      <span className="absolute text-[0.62rem] font-bold text-parchment">
        {label ?? `${Math.round(pct * 100)}%`}
      </span>
    </div>
  );
}
