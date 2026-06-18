import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 3: Configuration（設定 — 工房）=====
export const TIER3: Topic[] = [
  {
    id: 't3-settings-json',
    tier: 't3',
    order: 1,
    title: 'settings.json',
    titleJa: 'settings.json（チーム設定）',
    icon: '⚙️',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 5,
    study: {
      summaryJa:
        '.claude/settings.json はプロジェクトの設定を束ねる中枢。モデル・権限・Hooks・MCP をまとめて定義し、コミットしてチームで共有できる。',
      blocks: [
        { type: 'lead', textJa: '工房の設計図。ここを整えれば、チーム全員の相棒が同じ流儀で動く。' },
        {
          type: 'list',
          titleJa: 'settings.json に書ける主なもの',
          items: [
            { term: 'model', descJa: '既定で使うモデルを指定する。' },
            { term: 'permissions', descJa: 'allow / deny の権限ルール。' },
            { term: 'hooks', descJa: 'イベント駆動の自動実行（Hooks）。' },
            { term: 'mcpServers', descJa: '接続する MCP サーバの定義。' },
          ],
        },
        {
          type: 'code',
          caption: '.claude/settings.json の例',
          lang: 'json',
          code: '{\n  "model": "claude-opus-4-8",\n  "permissions": {\n    "allow": ["Bash(npm run test:*)"]\n  }\n}',
        },
        { type: 'tip', textJa: 'チームで共有したい設定は .claude/settings.json に置き、コミットする。' },
        { type: 'warn', textJa: '秘密情報（API キー等）はここに直書きしない。環境変数を使う。' },
      ],
      links: [{ labelJa: '公式: 設定', url: DOC }],
    },
    quiz: [
      {
        id: 't3-settings-json-q1',
        type: 'mcq',
        promptJa: 'チーム全員に同じ権限・モデル設定を行き渡らせたい。どこに置く？',
        options: [
          { textJa: '.claude/settings.json にまとめてコミット', whyJa: '正解。共有設定の正本。コミットで全員に届く。' },
          { textJa: '各自の settings.local.json', whyJa: '×: 個人用で gitignore される。共有されない。' },
          { textJa: 'README に文章で書くだけ', whyJa: '×: 手動依存で強制力が無い。' },
          { textJa: '.env に書く', whyJa: '×: 環境変数用で設定の正本ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-settings-json-q2',
        type: 'mcq',
        promptJa: 'settings.json に書くのが不適切なものは？',
        options: [
          { textJa: '本番 API の秘密キー', whyJa: '正解。秘密情報は直書きせず環境変数で渡す。' },
          { textJa: '既定モデルの指定', whyJa: '×: 適切。model に書ける。' },
          { textJa: '権限の allow/deny', whyJa: '×: 適切。permissions に書ける。' },
          { textJa: 'Hooks の定義', whyJa: '×: 適切。hooks に書ける。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't3-settings-json-case1',
        type: 'case',
        scenarioJa:
          '新メンバーが入るたびに権限やモデルの設定がバラバラになる。チームで統一したい。',
        tags: ['settings', 'team'],
        feature: {
          promptJa: 'どの仕組みで統一する？',
          options: [
            { id: 'shared', labelJa: '共有設定ファイルをコミットする', correct: true, whyJa: 'リポジトリに含めれば clone した全員に同じ設定が適用される。' },
            { id: 'local', labelJa: '各自 settings.local.json に書いてもらう', whyJa: '×: 個人用で共有されず、バラつきは解消しない。' },
            { id: 'wiki', labelJa: 'Wiki に手順を書く', whyJa: '△: 周知にはなるが手動で揺れる。' },
            { id: 'nothing', labelJa: '各自に任せる', whyJa: '×: 現状維持で問題が続く。' },
          ],
        },
        invoke: {
          promptJa: '具体的にはどこに？',
          options: [
            { textJa: '.claude/settings.json に書いてコミット', correct: true, whyJa: '正解。共有設定の正本。' },
            { textJa: '~/.claude/settings.json（ユーザ全体）', whyJa: '×: 自分のマシン全体用で、チーム共有ではない。' },
            { textJa: '.claude/settings.local.json', whyJa: '×: gitignore 対象の個人設定。' },
            { textJa: 'package.json の scripts', whyJa: '×: 設定の置き場所ではない。' },
          ],
        },
        rewardJa: '工房の設計図が共有された。全員の相棒が同じ流儀で動き出す。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't3-settings-local',
    tier: 't3',
    order: 2,
    title: 'settings.local.json',
    titleJa: 'settings.local.json（個人設定）',
    icon: '🧍',
    requires: ['t3-settings-json'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'settings.local.json は自分専用の上書き設定。gitignore されるため、共有設定を壊さず個人の好みを反映できる。',
      blocks: [
        { type: 'lead', textJa: 'チームの設計図はそのままに、自分の作業台だけ微調整する。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: '個人の許可', descJa: '自分だけ確認を省きたいコマンドの allow。' },
            { term: '実験的な設定', descJa: 'チームに押し付けずに試す。' },
            { term: 'ローカル環境差', descJa: '自分のマシン固有の事情を吸収。' },
          ],
        },
        { type: 'code', caption: '個人だけ許可を足す例', lang: 'json', code: '{\n  "permissions": {\n    "allow": ["Bash(git push:*)"]\n  }\n}' },
        { type: 'tip', textJa: '.local は gitignore 済み。コミットされないので安心して個人設定を書ける。' },
      ],
      links: [{ labelJa: '公式: 設定の優先順位', url: DOC }],
    },
    quiz: [
      {
        id: 't3-settings-local-q1',
        type: 'mcq',
        promptJa: 'チーム設定を変えずに、自分だけ特定コマンドの確認を省きたい。どこに書く？',
        options: [
          { textJa: 'settings.local.json', whyJa: '正解。個人用の上書きで gitignore される。' },
          { textJa: '共有の settings.json', whyJa: '×: 全員に影響してしまう。' },
          { textJa: 'CLAUDE.md', whyJa: '×: 指示書であって権限設定の場所ではない。' },
          { textJa: '.gitignore', whyJa: '×: 無視ルールのファイルで設定は書けない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-settings-local-q2',
        type: 'mcq',
        promptJa: 'settings.local.json の特徴として正しいのは？',
        options: [
          { textJa: 'gitignore され、自分のマシンにだけ効く', whyJa: '正解。個人専用の上書き。' },
          { textJa: 'コミットされチーム全員に共有される', whyJa: '×: それは settings.json の役割。' },
          { textJa: '存在すると settings.json は無視される', whyJa: '×: 上書きであって全無効化ではない。' },
          { textJa: '秘密キーの保管に最適', whyJa: '×: 秘密は環境変数で扱う。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't3-settings-local-case1',
        type: 'case',
        scenarioJa:
          '自分は `git push` を確認なしで通したいが、チームの共有設定は厳しめに保ちたい。',
        tags: ['settings', 'personal'],
        feature: {
          promptJa: 'どこで許可する？',
          options: [
            { id: 'local', labelJa: '個人の上書き設定で許可', correct: true, whyJa: '共有設定に触れず、自分のマシンだけ確認を省ける。' },
            { id: 'shared', labelJa: '共有 settings.json で許可', whyJa: '×: 全員が無確認になり、厳しめ方針が崩れる。' },
            { id: 'bypass', labelJa: 'bypassPermissions で全許可', whyJa: '×: push 以外も無確認になり危険。' },
            { id: 'ask', labelJa: '毎回手で確認する', whyJa: '△: 動くが目的（省略）を満たさない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'settings.local.json の permissions.allow に "Bash(git push:*)"', correct: true, whyJa: '正解。個人だけに効く許可。' },
            { textJa: '.claude/settings.json の allow に追加', whyJa: '×: 共有され全員に影響する。' },
            { textJa: 'CLAUDE.md に「push は確認不要」と書く', whyJa: '×: 指示であって権限の制御ではない。' },
            { textJa: '.env に書く', whyJa: '×: 環境変数用で権限は定義できない。' },
          ],
        },
        rewardJa: '自分の作業台だけ軽快に。チームの守りはそのまま。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't3-env-vars',
    tier: 't3',
    order: 3,
    title: 'Environment Variables',
    titleJa: '環境変数',
    icon: '🔑',
    requires: ['t3-settings-json'],
    mapPos: { col: 1, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        '秘密情報や環境ごとに変わる値は、設定ファイルに直書きせず環境変数で渡す。安全で、環境差にも強い。',
      blocks: [
        { type: 'lead', textJa: '宝の鍵をマップに描いてはいけない。鍵は環境変数という金庫へ。' },
        {
          type: 'list',
          titleJa: '環境変数で扱うべきもの',
          items: [
            { term: 'API キー', descJa: 'コミットすると漏洩リスク。環境変数で渡す。' },
            { term: '環境ごとの値', descJa: '本番/検証で変わるエンドポイント等。' },
            { term: '一時的な切替', descJa: 'その場のセッションだけ効かせたい設定。' },
          ],
        },
        { type: 'code', caption: 'セッションに環境変数を渡す例', lang: 'bash', code: 'ANTHROPIC_API_KEY=sk-... claude' },
        { type: 'warn', textJa: '秘密値を settings.json や CLAUDE.md に直書きしない。git に残ると危険。' },
      ],
      links: [{ labelJa: '公式: 環境変数', url: DOC }],
    },
    quiz: [
      {
        id: 't3-env-vars-q1',
        type: 'mcq',
        promptJa: 'API キーの安全な渡し方として最適なのは？',
        options: [
          { textJa: '環境変数で渡す', whyJa: '正解。コミットされず漏洩を避けられる。' },
          { textJa: 'settings.json に直書きしてコミット', whyJa: '×: リポジトリに秘密が残り危険。' },
          { textJa: 'CLAUDE.md に書く', whyJa: '×: 指示書に秘密は不適切。共有されてしまう。' },
          { textJa: 'コード中にハードコードする', whyJa: '×: 最も漏洩しやすい。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-env-vars-q2',
        type: 'mcq',
        promptJa: '本番と検証でエンドポイントが違う。設定をどう扱うのが筋が良い？',
        options: [
          { textJa: '環境変数で環境ごとに切り替える', whyJa: '正解。環境差は環境変数で吸収するのが定石。' },
          { textJa: '毎回 settings.json を書き換える', whyJa: '×: 手間が多く事故のもと。' },
          { textJa: 'コードに両方書いて if 分岐', whyJa: '△: 可能だが設定の混入で見通しが悪い。' },
          { textJa: '本番値を直書きしてコミット', whyJa: '×: 危険かつ柔軟性が無い。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't3-env-vars-case1',
        type: 'case',
        scenarioJa:
          'API キーをチームのリポジトリに入れずに Claude Code へ渡したい。',
        tags: ['env', 'security'],
        feature: {
          promptJa: 'どう渡す？',
          options: [
            { id: 'env', labelJa: '環境変数で渡す', correct: true, whyJa: 'リポジトリに残さず、各自の環境で安全に供給できる。' },
            { id: 'settings', labelJa: 'settings.json に書いてコミット', whyJa: '×: 秘密が git 履歴に残り漏洩する。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に貼る', whyJa: '×: 共有される指示書で、秘密の置き場ではない。' },
            { id: 'paste', labelJa: '毎回チャットに貼る', whyJa: '×: 履歴に残り危険、手間も多い。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '起動時に ANTHROPIC_API_KEY=... claude のように環境変数で渡す', correct: true, whyJa: '正解。秘密をコミットせずに供給できる。' },
            { textJa: '.claude/settings.json の "apiKey" に直書き', whyJa: '×: コミットされ漏洩する。' },
            { textJa: 'README に鍵を記載', whyJa: '×: 公開され最悪。' },
            { textJa: 'Hooks に鍵を埋め込む', whyJa: '×: 設定ファイルに残り危険。' },
          ],
        },
        rewardJa: '鍵は金庫の中。リポジトリは綺麗なまま、相棒はちゃんと動く。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't3-model-selection',
    tier: 't3',
    order: 4,
    title: 'Model Selection',
    titleJa: 'モデル選択',
    icon: '🧭',
    requires: ['t3-settings-json'],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'タスクに応じてモデル（Opus/Sonnet/Haiku）を選ぶ。/model で切り替え、品質とコストのバランスを取る。',
      blocks: [
        { type: 'lead', textJa: '相棒には得意分野がある。難所には賢い者を、雑務には素早い者を。' },
        {
          type: 'list',
          titleJa: 'モデルの目安',
          items: [
            { term: 'Opus', descJa: '最も高性能。難しい設計や推論が必要な場面に。' },
            { term: 'Sonnet', descJa: 'バランス型。日常の開発作業に。' },
            { term: 'Haiku', descJa: '高速・低コスト。単純作業や大量処理に。' },
          ],
        },
        { type: 'kbd', keys: '/model', descJa: 'セッション中にモデルを切り替える。' },
        { type: 'code', caption: '既定モデルを settings.json で固定', lang: 'json', code: '{\n  "model": "claude-sonnet-4-6"\n}' },
        { type: 'tip', textJa: '難しい設計は Opus、定型処理は Haiku、と使い分けるとコスト効率が良い。' },
      ],
      links: [{ labelJa: '公式: モデル選択', url: DOC }],
    },
    quiz: [
      {
        id: 't3-model-selection-q1',
        type: 'mcq',
        promptJa: 'セッション中にモデルを切り替えるコマンドは？',
        options: [
          { textJa: '/model', whyJa: '正解。モデルを切り替えられる。' },
          { textJa: '/switch', whyJa: '×: そのようなコマンドは無い。' },
          { textJa: '/llm', whyJa: '×: 標準のコマンドではない。' },
          { textJa: '--model のみ（起動後は不可）', whyJa: '×: 起動後の切替は /model で行える。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-model-selection-q2',
        type: 'mcq',
        promptJa: '大量のログを定型ルールで分類するだけの軽い処理。コスト重視なら？',
        options: [
          { textJa: 'Haiku', whyJa: '正解。高速・低コストで定型処理向き。' },
          { textJa: 'Opus 固定', whyJa: '×: 過剰でコストが高い。' },
          { textJa: '毎回最上位モデル', whyJa: '×: 無駄が大きい。' },
          { textJa: 'モデルは関係ない', whyJa: '×: コストと速度に直結する。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-model-selection-q3',
        type: 'mcq',
        promptJa: 'プロジェクトの既定モデルを固定したい。どこに書く？',
        options: [
          { textJa: 'settings.json の "model"', whyJa: '正解。既定モデルを指定できる。' },
          { textJa: '.env の MODEL', whyJa: '△: 環境変数運用も可能だが、プロジェクト既定は settings.json が素直。' },
          { textJa: 'CLAUDE.md の冒頭', whyJa: '×: 指示書でモデル指定の正規の場所ではない。' },
          { textJa: 'package.json', whyJa: '×: 関係ない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't3-model-selection-case1',
        type: 'case',
        scenarioJa:
          '複雑なアーキテクチャ設計を相談中。今のセッションだけ最も賢いモデルに切り替えたい。',
        tags: ['model', 'cost'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'switch', labelJa: 'セッション中にモデルを切り替える', correct: true, whyJa: 'その場だけ上位モデルにでき、難所に最適化できる。' },
            { id: 'editsettings', labelJa: 'settings.json を書き換えて再起動', whyJa: '△: できるが、その場限りなら再起動は重い。' },
            { id: 'newrepo', labelJa: '別プロジェクトを作る', whyJa: '×: 無関係で過剰。' },
            { id: 'nothing', labelJa: '今のモデルのまま頑張る', whyJa: '×: 難所では品質が足りない可能性。' },
          ],
        },
        invoke: {
          promptJa: '具体的な操作は？',
          options: [
            { textJa: '/model で Opus を選ぶ', correct: true, whyJa: '正解。セッション中に上位モデルへ切り替えられる。' },
            { textJa: '/clear する', whyJa: '×: 会話リセットで無関係。' },
            { textJa: 'Shift+Tab を押す', whyJa: '×: 権限モードの循環でモデル切替ではない。' },
            { textJa: '/compact する', whyJa: '×: 会話の要約でモデルは変わらない。' },
          ],
        },
        rewardJa: '難所には最も賢い相棒を。設計は一気に前進した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't3-hooks',
    tier: 't3',
    order: 5,
    title: 'Hooks',
    titleJa: 'Hooks（自動実行）',
    icon: '🪝',
    requires: ['t3-settings-json'],
    mapPos: { col: 3, row: 1 },
    estMin: 6,
    study: {
      summaryJa:
        'Hooks は特定イベント（ツール実行の前後など）で任意のコマンドを自動実行する仕組み。整形・検査・危険操作のブロックを自動化できる。',
      blocks: [
        { type: 'lead', textJa: '工房に仕掛けを張る。あるイベントが起きた瞬間、自動で歯車が回る。' },
        {
          type: 'list',
          titleJa: '主なイベント',
          items: [
            { term: 'PreToolUse', descJa: 'ツール実行の「前」。危険操作のブロックや検査に。' },
            { term: 'PostToolUse', descJa: 'ツール実行の「後」。編集後フォーマット等に。' },
            { term: 'Stop', descJa: '応答の停止時。まとめ処理や通知に。' },
          ],
        },
        {
          type: 'code',
          caption: '編集後に prettier を走らせる例（settings.json）',
          lang: 'json',
          code: '{\n  "hooks": {\n    "PostToolUse": [\n      { "matcher": "Edit", "command": "npx prettier --write ." }\n    ]\n  }\n}',
        },
        { type: 'tip', textJa: '「毎回確実に」自動でやりたい処理は、指示より Hooks の方が堅い。' },
        { type: 'warn', textJa: 'PreToolUse と PostToolUse は実行タイミングが逆。目的に合わせて選ぶ。' },
      ],
      links: [{ labelJa: '公式: Hooks', url: DOC }],
    },
    quiz: [
      {
        id: 't3-hooks-q1',
        type: 'mcq',
        promptJa: 'ファイル編集の「後」に自動でコマンドを走らせたい。使うイベントは？',
        options: [
          { textJa: 'PostToolUse', whyJa: '正解。ツール実行の後に発火する。' },
          { textJa: 'PreToolUse', whyJa: '×: 実行の前。編集が終わる前に走ってしまう。' },
          { textJa: 'Stop', whyJa: '×: 応答停止時で、編集ごとの後処理には不向き。' },
          { textJa: 'OnStart', whyJa: '×: そのような Hooks イベントは無い。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-hooks-q2',
        type: 'mcq',
        promptJa: '危険なコマンドの実行を「未然に」止めたい。どのイベントで仕掛ける？',
        options: [
          { textJa: 'PreToolUse', whyJa: '正解。実行の前に検査・ブロックできる。' },
          { textJa: 'PostToolUse', whyJa: '×: 実行後では手遅れ。' },
          { textJa: 'Stop', whyJa: '×: タイミングが合わない。' },
          { textJa: 'permissions.allow', whyJa: '×: 許可リストで、ブロックの仕掛けではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't3-hooks-q3',
        type: 'mcq',
        promptJa: 'Hooks の定義を書く場所は？',
        options: [
          { textJa: 'settings.json の hooks', whyJa: '正解。hooks セクションに定義する。' },
          { textJa: 'CLAUDE.md', whyJa: '×: 指示書で Hooks の定義場所ではない。' },
          { textJa: '.env', whyJa: '×: 環境変数用。' },
          { textJa: 'package.json の scripts', whyJa: '×: npm スクリプトで Hooks とは別物。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't3-hooks-case1',
        type: 'case',
        scenarioJa: 'Claudeがファイルを編集するたびに、自動でフォーマッタ(prettier)を走らせたい。',
        tags: ['hooks', 'automation'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            {
              id: 'hook',
              labelJa: 'Hooks (PostToolUse)',
              correct: true,
              whyJa: 'ツール実行後に任意コマンドを自動実行できる。編集後フォーマットの定番。',
            },
            { id: 'claudemd', labelJa: 'CLAUDE.md に「整形して」と書く', whyJa: '△: 指示はできるが毎回確実に実行される保証がない。自動化ではない。' },
            { id: 'skill', labelJa: 'Skill を作る', whyJa: '×: Skill は能力の追加。イベント駆動の自動実行には向かない。' },
            { id: 'mcp', labelJa: 'MCP サーバを追加', whyJa: '×: 外部ツール連携用。ローカルの編集後処理には過剰。' },
          ],
        },
        invoke: {
          promptJa: 'どこに、どのイベントで設定する？',
          options: [
            { textJa: 'settings.json の hooks.PostToolUse', correct: true, whyJa: '正解。ツール実行後イベントでコマンドを起動する。' },
            { textJa: 'settings.json の hooks.PreToolUse', whyJa: '×: 実行「前」。編集が終わる前に走ってしまう。' },
            { textJa: 'CLAUDE.md の先頭', whyJa: '×: CLAUDE.md は Hooks の設定場所ではない。' },
            { textJa: '.env ファイル', whyJa: '×: 環境変数用で Hooks は定義できない。' },
          ],
        },
        rewardJa: '保存するたび自動で整形。手作業から解放された。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
      {
        id: 't3-hooks-case2',
        type: 'case',
        scenarioJa:
          '`rm -rf` のような破壊的コマンドを、実行される前に必ずブロックしたい。',
        tags: ['hooks', 'safety'],
        feature: {
          promptJa: 'どう実現する？',
          options: [
            { id: 'pre', labelJa: 'Hooks (PreToolUse) で検査', correct: true, whyJa: '実行前に内容を検査して中止できる。未然防止に最適。' },
            { id: 'post', labelJa: 'Hooks (PostToolUse) で検査', whyJa: '×: 実行後では既に被害が出ている。' },
            { id: 'review', labelJa: '実行後にログを目視', whyJa: '×: 事後では手遅れ。' },
            { id: 'hope', labelJa: '注意して使う', whyJa: '×: 強制力が無い。' },
          ],
        },
        invoke: {
          promptJa: 'どこに設定する？',
          options: [
            { textJa: 'settings.json の hooks.PreToolUse', correct: true, whyJa: '正解。実行前イベントで検査・ブロックする。' },
            { textJa: 'settings.json の hooks.Stop', whyJa: '×: 応答停止時でタイミングが合わない。' },
            { textJa: 'CLAUDE.md に「rm 禁止」と書く', whyJa: '△: 抑止の指示にはなるが、確実なブロックは Hooks/権限。' },
            { textJa: 'README に注意書き', whyJa: '×: 強制力が無い。' },
          ],
        },
        rewardJa: '危険な一撃は発動前に封じられた。工房は安全だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
