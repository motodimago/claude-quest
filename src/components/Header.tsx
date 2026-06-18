import { NavLink } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { levelFromXp, levelTitle } from '../lib/gamify';
import { SRS } from '../lib/srs';
import { setSfxEnabled, sfx } from '../lib/sfx';
import { ProgressBar } from './common';

function navClass({ isActive }: { isActive: boolean }) {
  return `rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
    isActive ? 'bg-arcane-500 text-white' : 'text-night-100/70 hover:bg-night-800'
  }`;
}

export function Header() {
  const xp = useGameStore((s) => s.player.xp);
  const streak = useGameStore((s) => s.player.streak.current);
  const topics = useGameStore((s) => s.topics);
  const sound = useGameStore((s) => s.settings.sound);
  const updateSettings = useGameStore((s) => s.updateSettings);

  const { level, intoLevel, needed } = levelFromXp(xp);
  const dueCount = Object.values(topics).filter((r) => SRS.isDue(r.srs)).length;

  function toggleSound() {
    const next = !sound;
    updateSettings({ sound: next });
    setSfxEnabled(next);
    if (next) sfx.click(); // オンにしたら確認の音
  }

  return (
    <header className="sticky top-0 z-30 border-b border-night-700 bg-night-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5">
        <NavLink to="/map" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-xl">🗡️</span>
          <span className="hidden sm:inline">Claude Quest</span>
        </NavLink>

        {/* レベル & XP */}
        <div className="flex min-w-[170px] flex-1 items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-[0.6rem] uppercase tracking-wider text-night-100/50">Lv</span>
            <span className="-mt-1 text-lg font-black text-gold-400">{level}</span>
          </div>
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-[0.65rem] text-night-100/60">
              <span>{levelTitle(level)}</span>
              <span>
                {intoLevel}/{needed} XP
              </span>
            </div>
            <ProgressBar value={intoLevel} max={needed} barClass="bg-gradient-to-r from-arcane-500 to-gold-400" />
          </div>
        </div>

        {/* 連続日数 */}
        <div
          className="flex items-center gap-1 rounded-lg bg-night-800 px-2.5 py-1 text-sm font-bold"
          title="連続学習日数"
        >
          <span className={streak > 0 ? '' : 'opacity-40 grayscale'}>🔥</span>
          <span>{streak}</span>
        </div>

        {/* 効果音オン/オフ */}
        <button
          type="button"
          data-sfx="skip"
          onClick={toggleSound}
          title={sound ? '効果音: オン' : '効果音: オフ'}
          aria-label={sound ? '効果音をオフにする' : '効果音をオンにする'}
          className="rounded-lg bg-night-800 px-2 py-1 text-sm transition hover:bg-night-700"
        >
          <span className={sound ? '' : 'opacity-40 grayscale'}>{sound ? '🔊' : '🔇'}</span>
        </button>

        {/* ナビ */}
        <nav className="flex items-center gap-1">
          <NavLink to="/map" className={navClass}>
            🗺️ <span className="hidden md:inline">マップ</span>
          </NavLink>
          <NavLink to="/quest" className={navClass}>
            📜 <span className="hidden md:inline">クエスト</span>
          </NavLink>
          <NavLink to="/review" className={navClass}>
            🔄 <span className="hidden md:inline">復習</span>
            {dueCount > 0 && (
              <span className="ml-1 rounded-full bg-ember-500 px-1.5 text-[0.65rem] text-white">
                {dueCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/stats" className={navClass}>
            🏆 <span className="hidden md:inline">記録</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
