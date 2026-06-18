# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Claude Quest** — an RPG-themed web app for learning Claude Code (the CLI) from its docs. Single-page, **no backend**, progress saved in `localStorage`. Japanese UI; feature/command names stay in English (e.g. `Ctrl+B`, `settings.json`).

## Commands

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc --noEmit (typecheck) then vite build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit only
```

- **No test suite exists** (no test runner configured). Verify changes by running `npm run build` (catches type errors) and exercising the app in the browser. The core loop to manually verify: Map → open a Tier-1 topic → Study → Quiz → Case → topic becomes ✅mastered → at 80% tier mastery the next tier unlocks.
- Deploy = build and serve `dist/` (GitHub Pages-ready: `vite.config.ts` sets `base: './'` and `public/.nojekyll` exists).

## Hard constraints (do not break)

- **Offline / no runtime CDN.** Everything is bundled. Sound is **synthesized via Web Audio** (`src/lib/sfx.ts`), not audio files; visual celebration uses the bundled `canvas-confetti` (`src/lib/celebrate.ts`). Don't introduce CDN `<script>`/`<link>` or web-font fetches required for core function.
- **Routing uses `HashRouter`** (`src/main.tsx`) so it works on GitHub Pages subpaths without server config.

## Architecture (the parts that span multiple files)

### Content is data, not code
All learning material lives in `src/data/` as typed objects conforming to `src/types.ts`:
- `data/tiers.ts` — the 15 tiers (regions on the map) + unlock rules + `status: 'active' | 'stub'`.
- `data/topics/tierN.ts` — each exports `TIERN: Topic[]`; `data/topics/index.ts` aggregates them into `ALL_TOPICS`.
- `data/badges.ts` — badges as `{ test(ctx) }` predicates.
- `data/config.ts` — all tunables (mastery thresholds, XP curve, SRS intervals, tier-unlock %).

**Adding a topic = add one object** to a `tierN.ts` array; it is auto-indexed by `lib/content.ts`. A `Topic` bundles one `study` card (a discriminated-union `blocks` array), a `quiz` array (MCQ), and a `cases` array. A **case is two-step**: pick the optimal *feature*, then the correct *invocation*; every option carries a `whyJa`. `requires` edges must reference **only same-tier** topic ids (cross-tier gating is by tier unlock). Authoring style: Japanese prose, English feature names, reuse the `const DOC` link. `tier1.ts` is the canonical template.

### Derived vs. persisted state
- **Persisted** (Zustand `persist`, key `claudequest`, see `store/useGameStore.ts`): per-topic counters (`quizCorrect`, `caseCorrect`, `attempts`, `srs`), player XP/level/streak, badges, daily quest, settings.
- **Derived, never stored**: a topic's `locked | available | learning | mastered` state and tier-unlock status are **computed on render** by `lib/progress.ts` from the counters. Don't add a stored `state` field — the map calls `computeTopicState(topic, records)`.
- **Transient, not persisted**: `notifications` and `celebration` live in the store but are excluded via `partialize`. They are the event channel the UI reacts to (toasts / celebration modal).

### How an answer flows through the store
Screens call store actions (`recordQuiz` / `recordCase` / `reviewAnswer` / `clearBoss` / `claimDaily`). Each action follows a **clone → mutate → commit** pattern (there is **no immer**): `cloneCtx(s)` makes shallow copies of the slices it touches, helper fns mutate that working ctx (`grantXp`, `touchActivity`, `maybeMaster`, `awardBadges`, `bumpDaily`), then `commit(ctx)` returns the new slices. Follow this pattern when adding actions; mutating the live state directly will break persistence/reactivity. `grantXp` handles level-ups (sets a `levelup` celebration); `maybeMaster` detects the not-mastered→mastered transition (awards XP, seeds SRS, fires a `mastered` notification).

### Key rules that look arbitrary but are intentional
- **Mastery requires a correct case**: `quizCorrect >= 2 AND caseCorrect >= 1` (`config.mastery`). The case requirement operationalizes the product goal "you only master a topic by proving applied judgment."
- **Tiers unlock at 80%** mastery of the previous tier (`config.tierUnlockPct`); Tier 1 is always open.
- **SRS** (`lib/srs.ts`, Leitner) only schedules **mastered** topics, and the first due date is the **next day** — so reviews never appear the same day you master something. Because of this, `ensureDaily` builds the daily quest adaptively: when no reviews are due it swaps the "review" goal for a "quiz" goal (`buildDailyGoals`). Keep daily goals always-achievable.

### Effects & accessibility gating
Celebrations live in `components/Celebration.tsx` (level-up / boss) and the topic done-screen (`screens/TopicScreen.tsx`). Confetti (`lib/celebrate.ts`) is gated by `settings.reducedMotion` and OS `prefers-reduced-motion`; sound (`lib/sfx.ts`) is gated by `settings.sound` (synced to the sfx module via `setSfxEnabled`, toggled from the header and Stats screen). A global click listener in `App.tsx` plays a click tick for buttons/links except those marked `data-sfx="skip"` (answer option buttons opt out so they only play correct/wrong).

## Tailwind gotcha
The `night` color scale in `tailwind.config.ts` is split: **50–300 are light** (text on dark) and **600–950 are dark** (surfaces). `text-night-100` is light text, `bg-night-800` is a dark surface. Shared component classes (`.btn`, `.btn-primary`, `.btn-ghost`, `.panel`, `.kbd`) are defined in `src/index.css` under `@layer components`.
