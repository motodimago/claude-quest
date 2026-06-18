// Web Audio API で短い効果音を合成する（音声ファイル不要・オフライン可・依存ゼロ）。
// 設定の sound と同期して enabled を切り替える。

let audioCtx: AudioContext | null = null;
let enabled = true;

export function setSfxEnabled(on: boolean) {
  enabled = on;
}

function getCtx(): AudioContext | null {
  if (audioCtx) return audioCtx;
  try {
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  } catch {
    audioCtx = null;
  }
  return audioCtx;
}

interface Tone {
  freq: number;
  dur: number;
  type?: OscillatorType;
  delay?: number;
  gain?: number;
}

function play(tones: Tone[]) {
  if (!enabled) return;
  const ac = getCtx();
  if (!ac) return;
  // ユーザー操作後にコンテキストを再開（自動再生ポリシー対策）
  if (ac.state === 'suspended') void ac.resume();
  const now = ac.currentTime;
  for (const t of tones) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = t.type ?? 'sine';
    osc.frequency.value = t.freq;
    const start = now + (t.delay ?? 0);
    const peak = t.gain ?? 0.12;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, start + t.dur);
    osc.connect(g);
    g.connect(ac.destination);
    osc.start(start);
    osc.stop(start + t.dur + 0.03);
  }
}

export const sfx = {
  // UI クリック（控えめなティック）
  click: () => play([{ freq: 280, dur: 0.05, type: 'triangle', gain: 0.05 }]),
  // クイズ/ケース正解
  correct: () =>
    play([
      { freq: 660, dur: 0.1, type: 'sine', gain: 0.12 },
      { freq: 880, dur: 0.14, delay: 0.08, type: 'sine', gain: 0.12 },
    ]),
  // 不正解（やわらかいブザー）
  wrong: () =>
    play([
      { freq: 220, dur: 0.16, type: 'sawtooth', gain: 0.08 },
      { freq: 160, dur: 0.2, delay: 0.07, type: 'sawtooth', gain: 0.07 },
    ]),
  // トピック習得（解答時の軽いディン）
  master: () =>
    play([
      { freq: 523, dur: 0.12, gain: 0.11 },
      { freq: 659, dur: 0.12, delay: 0.1, gain: 0.11 },
      { freq: 784, dur: 0.2, delay: 0.2, gain: 0.11 },
    ]),
  // トピッククリア（完了画面の豪華ファンファーレ）
  clear: () =>
    play([
      { freq: 587.33, dur: 0.12, gain: 0.12 }, // D5
      { freq: 783.99, dur: 0.12, delay: 0.1, gain: 0.12 }, // G5
      { freq: 1174.66, dur: 0.45, delay: 0.2, gain: 0.14 }, // D6
      // 下支えの和音
      { freq: 783.99, dur: 0.45, delay: 0.2, gain: 0.07 },
      { freq: 587.33, dur: 0.45, delay: 0.2, gain: 0.06 },
      // きらめき
      { freq: 2349.32, dur: 0.14, delay: 0.34, type: 'triangle', gain: 0.05 },
    ]),
  // レベルアップ（上昇アルペジオ＋締めの和音＋きらめき）
  levelup: () =>
    play([
      { freq: 523.25, dur: 0.11, gain: 0.11 },
      { freq: 659.25, dur: 0.11, delay: 0.1, gain: 0.11 },
      { freq: 783.99, dur: 0.11, delay: 0.2, gain: 0.11 },
      { freq: 1046.5, dur: 0.4, delay: 0.3, gain: 0.14 },
      { freq: 659.25, dur: 0.4, delay: 0.3, gain: 0.07 },
      { freq: 783.99, dur: 0.4, delay: 0.3, gain: 0.07 },
      { freq: 2093, dur: 0.14, delay: 0.44, type: 'triangle', gain: 0.05 },
    ]),
  // バッジ獲得
  badge: () =>
    play([
      { freq: 740, dur: 0.1, type: 'triangle', gain: 0.1 },
      { freq: 1108, dur: 0.22, delay: 0.1, type: 'triangle', gain: 0.1 },
    ]),
  // ボス撃破（壮大なファンファーレ）
  boss: () =>
    play([
      { freq: 392, dur: 0.18, type: 'square', gain: 0.08 },
      { freq: 523.25, dur: 0.18, delay: 0.16, gain: 0.1 },
      { freq: 659.25, dur: 0.18, delay: 0.32, gain: 0.1 },
      { freq: 783.99, dur: 0.55, delay: 0.48, gain: 0.13 },
      // 勝利の和音
      { freq: 523.25, dur: 0.55, delay: 0.48, gain: 0.07 },
      { freq: 392, dur: 0.55, delay: 0.48, gain: 0.06 },
      { freq: 1046.5, dur: 0.55, delay: 0.48, gain: 0.06 },
      { freq: 2093, dur: 0.16, delay: 0.64, type: 'triangle', gain: 0.05 },
    ]),
  // デイリー達成
  daily: () =>
    play([
      { freq: 600, dur: 0.1, gain: 0.1 },
      { freq: 900, dur: 0.2, delay: 0.09, gain: 0.1 },
    ]),
};
