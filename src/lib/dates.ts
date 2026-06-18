// ローカル日付ユーティリティ（YYYY-MM-DD 文字列ベース）

export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return todayStr(d);
}

/** b - a の日数（同日=0、翌日=1）。a が空なら NaN */
export function daysBetween(a: string, b: string): number {
  if (!a || !b) return NaN;
  const da = new Date(a + 'T00:00:00').getTime();
  const db = new Date(b + 'T00:00:00').getTime();
  return Math.round((db - da) / 86_400_000);
}
