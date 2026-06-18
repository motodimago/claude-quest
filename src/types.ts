// ===== ドメインの型定義 =====
// コンテンツ（ティア/トピック/学習カード/クイズ/ケース）と
// プレイヤー進捗（store に保存する状態）の両方をここに集約する。

export type TierId = string; // 't1'..'t15'
export type TopicId = string;

export type TopicState = 'locked' | 'available' | 'learning' | 'mastered';

// ---- ティア（マップの地域）----
export interface TierUnlock {
  type: 'always' | 'tierMastery';
  tierId?: TierId; // tierMastery のとき：直前ティア
  pct?: number; // tierMastery のとき：必要習得率(0..1)
}

export interface Tier {
  id: TierId;
  order: number;
  title: string; // 英語の機能群名
  titleJa: string;
  theme: string; // マップ地域のスタイルフック
  icon: string;
  desc: string;
  unlock: TierUnlock;
  status: 'active' | 'stub'; // stub = 近日公開（ノード無し）
}

// ---- 学習カード（StudyCard）----
export interface StudyListItem {
  term?: string; // コマンド/用語（英語可）
  descJa: string;
}

export type StudyBlock =
  | { type: 'lead'; textJa: string }
  | { type: 'para'; textJa: string }
  | { type: 'list'; titleJa?: string; items: StudyListItem[] }
  | { type: 'code'; caption?: string; lang?: string; code: string }
  | { type: 'tip'; textJa: string }
  | { type: 'warn'; textJa: string }
  | { type: 'kbd'; keys: string; descJa: string };

export interface StudyLink {
  labelJa: string;
  url: string;
}

export interface StudyCard {
  summaryJa: string;
  blocks: StudyBlock[];
  links?: StudyLink[];
}

// ---- クイズ（4択）----
export interface QuizOption {
  textJa: string;
  whyJa: string; // 正誤どちらでも理由を表示（教育的フィードバック）
}

export interface QuizQuestion {
  id: string;
  type: 'mcq';
  promptJa: string;
  options: QuizOption[];
  correct: number; // options の index
  xp: number;
}

// ---- ケース（核機能・2段階）----
export interface CaseFeatureOption {
  id: string;
  labelJa: string;
  correct?: boolean;
  whyJa: string;
}

export interface CaseInvokeOption {
  textJa: string;
  correct?: boolean;
  whyJa: string;
}

export interface CaseQuestion {
  id: string;
  type: 'case';
  scenarioJa: string;
  tags?: string[];
  // Step A: 最適な「機能」を選ぶ
  feature: { promptJa: string; options: CaseFeatureOption[] };
  // Step B: その機能の「正しい操作・設定場所」を選ぶ
  invoke: { promptJa: string; options: CaseInvokeOption[] };
  rewardJa: string;
  xp: number;
  bonusFirstTry: number; // 両段一発正解のボーナス
}

// ---- トピック（スキルノード）----
export interface Topic {
  id: TopicId;
  tier: TierId;
  order: number;
  title: string; // 英語の機能名
  titleJa: string;
  icon: string;
  requires: TopicId[]; // 同ティア内の前提（スキルツリーの辺）
  mapPos: { col: number; row: number };
  estMin: number;
  study: StudyCard;
  quiz: QuizQuestion[];
  cases: CaseQuestion[];
}

// ---- バッジ ----
export interface BadgeContext {
  masteredCount: number;
  casesSolved: number;
  reviewsDone: number;
  level: number;
  bestStreak: number;
  flawlessCase: boolean;
  tierMasteryPct: (tierId: TierId) => number;
  bossCleared: (tierId: TierId) => boolean;
}

export interface Badge {
  id: string;
  titleJa: string;
  descJa: string;
  icon: string;
  test: (c: BadgeContext) => boolean;
}

// ===== 進捗（store / localStorage に保存）=====
export interface SrsState {
  box: number; // 1..5（Leitner）
  dueDate: string; // YYYY-MM-DD
  lastReviewed?: string;
}

// state は records から導出するため保存しない（progress.computeTopicState）。
export interface TopicRecord {
  quizCorrect: number;
  caseCorrect: number;
  attempts: number;
  firstStudiedAt?: string;
  masteredAt?: string;
  srs?: SrsState;
}

export interface StreakState {
  current: number;
  best: number;
  lastDay: string; // YYYY-MM-DD
}

export interface PlayerState {
  xp: number;
  level: number;
  createdAt: string;
  lastActiveDate: string;
  streak: StreakState;
}

export interface DailyGoal {
  id: string;
  labelJa: string;
  target: number;
  progress: number;
}

export interface DailyState {
  date: string; // YYYY-MM-DD
  goals: DailyGoal[];
  claimed: boolean;
  xpToday: number;
}

export interface Settings {
  sound: boolean;
  reducedMotion: boolean;
}

export interface Counters {
  reviewsDone: number;
  flawlessCases: number;
  casesSolved: number;
  bossCleared: Record<TierId, boolean>;
}

export interface BadgeRecord {
  earnedAt: string;
}

// 回答記録の入力
export type AnswerKind = 'quiz' | 'case';

// 永続化されるゲーム状態（store のデータ部分）
export interface GameStateData {
  version: number;
  player: PlayerState;
  topics: Record<TopicId, TopicRecord>;
  badges: Record<string, BadgeRecord>;
  daily: DailyState | null;
  settings: Settings;
  counters: Counters;
}
