# 🗡️ Claude Quest

ゲーミフィケーションで [Claude Code](https://code.claude.com/docs/ja) を学ぶ、RPG 風の学習 Web アプリ。

膨大な公式ドキュメントを上から読むのではなく、**冒険しながら少しずつ習得**できる。

## なにができる？

- **ワールドマップ／スキルツリー** — 各機能が 🔒未習得 / ⚔️学習中 / ✅習得済 のどれかを一目で把握。
- **実戦ケースモード**（本アプリの核） — 「こういう状況、どの機能をどう使うのが最適？」をシナリオで出題。
  例：*30分のビルド中に端末を取り戻したい* → バックグラウンド実行 `Ctrl+B`。誤答にも「なぜ違うか」を表示。
- **XP・レベル・連続日数・バッジ・ボス戦** といったゲーム要素。
- **間隔反復（SRS）** で習得済みを忘れないよう復習に呼び戻す。

進捗はブラウザの localStorage に保存（バックエンド不要・オフライン可）。

## 開発

```bash
npm install
npm run dev        # 開発サーバ
npm run build      # 本番ビルド → dist/
npm run preview    # ビルド結果をローカル確認
npm run typecheck  # 型チェック
```

## デプロイ（GitHub Pages）

`npm run build` で生成される `dist/` を公開する。`vite.config.ts` は `base: './'`（相対パス）、`public/.nojekyll` で Jekyll 処理を無効化しているため、Pages のサブパス配信でもそのまま動く。

## コンテンツの追加

学習トピックは `src/data/topics/tierN.ts` に型付きオブジェクトとして定義。**1 トピック追加 = オブジェクトを 1 個足すだけ**。スキーマは `src/types.ts` を参照。

## 技術スタック

React + TypeScript + Vite / Zustand（永続化）/ React Router（HashRouter）/ Framer Motion / Tailwind CSS。
