import { Link } from 'react-router-dom';
import { BADGES } from '../data/badges';
import { Content } from '../lib/content';
import { levelFromXp, levelTitle } from '../lib/gamify';
import { tierMasteryPct, totalMasteredCount } from '../lib/progress';
import { setSfxEnabled, sfx } from '../lib/sfx';
import { useGameStore } from '../store/useGameStore';
import { MasteryRing, SectionTitle } from '../components/common';

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-night-700 bg-night-800/50 p-3 text-center">
      <div className="text-2xl font-black text-gold-400">{value}</div>
      <div className="text-xs text-night-100/60">{label}</div>
    </div>
  );
}

function ToggleRow({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-night-100/85">{label}</span>
      <button
        type="button"
        data-sfx="skip"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`relative h-6 w-11 rounded-full transition ${on ? 'bg-arcane-500' : 'bg-night-700'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
        />
      </button>
    </div>
  );
}

export function StatsScreen() {
  const player = useGameStore((s) => s.player);
  const badges = useGameStore((s) => s.badges);
  const counters = useGameStore((s) => s.counters);
  const records = useGameStore((s) => s.topics);
  const reset = useGameStore((s) => s.reset);
  const settings = useGameStore((s) => s.settings);
  const updateSettings = useGameStore((s) => s.updateSettings);

  const { level, intoLevel, needed } = levelFromXp(player.xp);
  const mastered = totalMasteredCount(records);

  function handleReset() {
    if (window.confirm('本当に進捗をすべてリセットしますか？この操作は取り消せません。')) {
      reset();
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="panel p-5">
        <SectionTitle icon="🏆">冒険の記録</SectionTitle>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-arcane-500 to-gold-400 font-black text-white">
            <span className="text-[0.6rem]">Lv</span>
            <span className="-mt-1 text-2xl">{level}</span>
          </div>
          <div>
            <p className="text-lg font-bold text-parchment">{levelTitle(level)}</p>
            <p className="text-sm text-night-100/60">
              累計 {player.xp} XP ・ 次のレベルまで {Math.max(0, needed - intoLevel)} XP
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="習得トピック" value={mastered} />
          <Stat label="ケース正解" value={counters.casesSolved} />
          <Stat label="復習回数" value={counters.reviewsDone} />
          <Stat label="最高連続日数" value={player.streak.best} />
        </div>
      </div>

      <div className="panel p-5">
        <SectionTitle icon="🗺️">ティア習得状況</SectionTitle>
        <div className="flex flex-wrap gap-4">
          {Content.activeTiers().map((tier) => (
            <div key={tier.id} className="flex flex-col items-center gap-1">
              <MasteryRing pct={tierMasteryPct(tier.id, records)} size={52} />
              <span className="text-xs text-night-100/70">{tier.icon} {tier.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-5">
        <SectionTitle icon="🏅">バッジ</SectionTitle>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BADGES.map((b) => {
            const earned = !!badges[b.id];
            return (
              <div
                key={b.id}
                className={`rounded-xl border p-3 ${
                  earned
                    ? 'border-gold-400/60 bg-gold-400/10'
                    : 'border-night-700 bg-night-800/40 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xl ${earned ? '' : 'grayscale'}`}>{b.icon}</span>
                  <div>
                    <p className={`text-sm font-bold ${earned ? 'text-gold-300' : 'text-night-100/60'}`}>
                      {b.titleJa}
                    </p>
                    <p className="text-[0.68rem] leading-tight text-night-100/55">{b.descJa}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel p-5">
        <SectionTitle icon="⚙️">設定</SectionTitle>
        <ToggleRow
          label="🔊 効果音"
          on={settings.sound}
          onChange={(v) => {
            updateSettings({ sound: v });
            setSfxEnabled(v);
            if (v) sfx.click();
          }}
        />
        <ToggleRow
          label="🎬 アニメーションを控える"
          on={settings.reducedMotion}
          onChange={(v) => updateSettings({ reducedMotion: v })}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Link to="/map" className="btn-ghost">
          ← マップ
        </Link>
        <button
          className="text-xs text-night-100/40 underline hover:text-ember-400"
          onClick={handleReset}
        >
          進捗をリセット
        </button>
      </div>
    </div>
  );
}
