import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 1: Foundations（基礎）=====
export const TIER1: Topic[] = [
  {
    id: 't1-install-login',
    tier: 't1',
    order: 1,
    title: 'Install & Login',
    titleJa: 'インストールとログイン',
    icon: '📦',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'Claude Code は npm でインストールし、プロジェクトの中で `claude` と打って起動する。初回は Anthropic アカウントで認証する。',
      blocks: [
        { type: 'lead', textJa: 'すべての冒険は、この一歩から始まる。まずは武器を手に入れよう。' },
        {
          type: 'code',
          caption: 'インストール（グローバル）',
          lang: 'bash',
          code: 'npm install -g @anthropic-ai/claude-code',
        },
        {
          type: 'code',
          caption: 'プロジェクトで起動',
          lang: 'bash',
          code: 'cd your-project\nclaude',
        },
        {
          type: 'list',
          titleJa: '認証の方法',
          items: [
            { term: 'Anthropic アカウント', descJa: '初回起動時にブラウザで認証（Pro/Max プラン）。' },
            { term: 'API キー', descJa: 'コンソールの API キーでも利用可能（従量課金）。' },
          ],
        },
        { type: 'tip', textJa: 'まずは試したいプロジェクトのルートで `claude` を実行するのが基本。' },
      ],
      links: [{ labelJa: '公式: クイックスタート', url: DOC }],
    },
    quiz: [
      {
        id: 't1-install-login-q1',
        type: 'mcq',
        promptJa: 'Claude Code をマシンに導入する正しいコマンドは？',
        options: [
          { textJa: 'npm install -g @anthropic-ai/claude-code', whyJa: '正解。npm でグローバルに導入する。' },
          { textJa: 'pip install claude-code', whyJa: '×: Python パッケージではない。' },
          { textJa: 'brew install claude', whyJa: '×: 公式の標準導入手順は npm。' },
          { textJa: 'git clone してビルド', whyJa: '×: 利用するだけならビルドは不要。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't1-install-login-q2',
        type: 'mcq',
        promptJa: 'あるプロジェクトで Claude Code を使い始めるには？',
        options: [
          { textJa: 'プロジェクトのディレクトリで `claude` を実行', whyJa: '正解。カレントのプロジェクト文脈で起動する。' },
          { textJa: 'ホームディレクトリで必ず起動する', whyJa: '×: 対象プロジェクトの中で起動するのが基本。' },
          { textJa: 'Web ブラウザでしか使えない', whyJa: '×: CLI が基本。Web/IDE もあるが必須ではない。' },
          { textJa: '専用のサーバを立てる', whyJa: '×: サーバ構築は不要。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't1-install-login-case1',
        type: 'case',
        scenarioJa:
          '新しいリポジトリで初めて Claude Code を使いたい。最短で対話を始めるには？',
        tags: ['install', 'cli'],
        feature: {
          promptJa: 'どうやって始める？',
          options: [
            {
              id: 'cd-claude',
              labelJa: 'プロジェクトへ移動して `claude` を実行',
              correct: true,
              whyJa: 'そのプロジェクトの文脈（ファイル・git 履歴）込みで対話が始まる。これが最短。',
            },
            { id: 'global', labelJa: 'どこでもいいので `claude` を実行', whyJa: '△: 起動はするが対象プロジェクトの文脈が無く非効率。' },
            { id: 'web', labelJa: 'まず Web 版にログインする', whyJa: '×: ローカルのリポジトリ作業には CLI 起動が早い。' },
            { id: 'config', labelJa: '先に settings.json を作る', whyJa: '×: 初回起動に設定ファイルは必須ではない。' },
          ],
        },
        invoke: {
          promptJa: '具体的な操作は？',
          options: [
            { textJa: 'cd your-project && claude', correct: true, whyJa: '正解。プロジェクトに入って起動する。' },
            { textJa: 'claude --headless', whyJa: '×: 無人実行用。対話したい今回には不向き。' },
            { textJa: 'npx claude-code login のみ', whyJa: '×: 認証は初回起動時に案内される。' },
            { textJa: 'claude serve', whyJa: '×: そのようなコマンドは無い。' },
          ],
        },
        rewardJa: 'プロジェクトの文脈を抱えた相棒が起動した。冒険の始まりだ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't1-repl',
    tier: 't1',
    order: 2,
    title: 'Interactive REPL',
    titleJa: '対話モード（REPL）',
    icon: '⌨️',
    requires: ['t1-install-login'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'REPL は Claude Code の母艦。会話しながらコードを読み書き・実行する。覚えるべきキー操作がいくつかある。',
      blocks: [
        { type: 'lead', textJa: 'ここが主戦場。指示を出し、Claude が動き、結果が返る。' },
        {
          type: 'list',
          titleJa: '覚える操作',
          items: [
            { term: '/help', descJa: 'コマンド一覧を表示。迷ったらまずこれ。' },
            { term: 'Shift+Tab', descJa: '権限モードを循環切替（default → acceptEdits → plan）。' },
            { term: 'Ctrl+B', descJa: '実行中タスクをバックグラウンドへ送り、ターミナルを解放。' },
            { term: 'Esc', descJa: '生成・実行を中断する。' },
            { term: '/clear', descJa: '会話をリセットして文脈をまっさらにする。' },
          ],
        },
        { type: 'kbd', keys: 'Esc を2回', descJa: '過去のメッセージまで遡って編集・やり直しできる。' },
        { type: 'tip', textJa: '長い会話は /compact で要約し、文脈を節約できる。' },
      ],
      links: [{ labelJa: '公式: 基本操作', url: DOC }],
    },
    quiz: [
      {
        id: 't1-repl-q1',
        type: 'mcq',
        promptJa: '実行中のタスクを止めずに、ターミナルを自分の作業に使いたい。押すキーは？',
        options: [
          { textJa: 'Ctrl+B', whyJa: '正解。タスクをバックグラウンドへ送る。' },
          { textJa: 'Ctrl+C', whyJa: '×: 中断（キャンセル）になってしまう。' },
          { textJa: 'Esc', whyJa: '×: 生成・実行の中断。タスクは続かない。' },
          { textJa: 'Ctrl+L', whyJa: '×: 画面クリア程度で目的を満たさない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't1-repl-q2',
        type: 'mcq',
        promptJa: '使えるコマンドの一覧を確認したい。最初に打つのは？',
        options: [
          { textJa: '/help', whyJa: '正解。コマンド一覧が出る。' },
          { textJa: 'man claude', whyJa: '×: REPL 内のコマンドは /help で見る。' },
          { textJa: '--list-commands', whyJa: '×: そのようなフラグは無い。' },
          { textJa: '/commands すべて表示', whyJa: '×: 標準は /help。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't1-repl-q3',
        type: 'mcq',
        promptJa: '会話が長くなりトークンを圧迫してきた。文脈を保ちつつ節約するには？',
        options: [
          { textJa: '/compact で会話を要約する', whyJa: '正解。要点を残して文脈を圧縮する。' },
          { textJa: '/clear で全消去する', whyJa: '△: 節約にはなるが文脈も失う。保ちたいなら不適。' },
          { textJa: '何もしない', whyJa: '×: 圧迫が続く。' },
          { textJa: 'ターミナルを再起動する', whyJa: '×: セッションごと失う。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't1-repl-case1',
        type: 'case',
        scenarioJa:
          '30 分かかるビルドを Claude に実行させたが、その間に別作業でターミナルを使いたい。最善の一手は？',
        tags: ['repl', 'productivity'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            {
              id: 'bg',
              labelJa: 'バックグラウンド実行',
              correct: true,
              whyJa: '実行中タスクを背面へ送り、ターミナルを即解放できる。これが最適。',
            },
            { id: 'esc', labelJa: 'Esc で中断', whyJa: '×: ビルドが止まり目的を達成できない。' },
            { id: 'newwin', labelJa: '新しいターミナルを開く', whyJa: '△: 動くが同一タスクの管理が分断され非効率。' },
            { id: 'wait', labelJa: '終わるまで待つ', whyJa: '×: 30 分拘束され解決になっていない。' },
          ],
        },
        invoke: {
          promptJa: 'その機能の正しい操作は？',
          options: [
            { textJa: 'Ctrl+B', correct: true, whyJa: '正解。実行中タスクをバックグラウンドへ送る。' },
            { textJa: 'Ctrl+C', whyJa: '×: プロセス中断（キャンセル）になる。' },
            { textJa: 'Ctrl+Z', whyJa: '×: シェルのサスペンド。Claude のタスク管理とは別物。' },
            { textJa: '/background', whyJa: '×: そのようなスラッシュコマンドは無い。' },
          ],
        },
        rewardJa: 'ビルドは裏で進み、君はターミナルを取り戻した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't1-project-context',
    tier: 't1',
    order: 3,
    title: 'Project Context',
    titleJa: 'プロジェクト文脈の自動把握',
    icon: '🗺️',
    requires: ['t1-repl'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'Claude Code は起動したプロジェクトのファイル構成・git 履歴・CLAUDE.md を自動で読み、文脈として活用する。',
      blocks: [
        { type: 'lead', textJa: '相棒は黙っていても周囲を観察している。地形（プロジェクト）を読むのだ。' },
        {
          type: 'list',
          titleJa: '自動で参照されるもの',
          items: [
            { term: 'ファイル構成', descJa: 'ディレクトリ構造を把握する。' },
            { term: 'git 履歴', descJa: '直近の変更やブランチ状況を理解する。' },
            { term: 'CLAUDE.md', descJa: 'プロジェクト固有の指示を読み込む（Tier 2 で詳説）。' },
          ],
        },
        { type: 'tip', textJa: '`@ファイル名` で特定のファイルを明示的に参照させられる（IDE 連携時は行番号も）。' },
      ],
      links: [{ labelJa: '公式: プロジェクト文脈', url: DOC }],
    },
    quiz: [
      {
        id: 't1-project-context-q1',
        type: 'mcq',
        promptJa: '起動時に Claude Code が自動で文脈として読まないものは？',
        options: [
          { textJa: '個人の銀行口座情報', whyJa: '正解。そんなものは読まない（無関係）。' },
          { textJa: 'ファイル構成', whyJa: '×: 自動で把握される。' },
          { textJa: 'git 履歴', whyJa: '×: 自動で参照される。' },
          { textJa: 'CLAUDE.md', whyJa: '×: あれば自動で読み込まれる。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't1-project-context-case1',
        type: 'case',
        scenarioJa: '特定の認証ロジックを書いた `auth.ts` を踏まえて修正させたい。確実に見てもらうには？',
        tags: ['context'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'mention', labelJa: 'そのファイルを明示的に参照させる', correct: true, whyJa: '@ で指定すれば確実にそのファイルを文脈に含められる。' },
            { id: 'paste', labelJa: '全文をコピペする', whyJa: '△: 動くが冗長。参照の方が速く正確。' },
            { id: 'hope', labelJa: '自動把握に任せて何も言わない', whyJa: '×: 大規模だと見落とす可能性。明示が確実。' },
            { id: 'rename', labelJa: 'ファイル名を変える', whyJa: '×: 無関係。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '`@auth.ts` のように @ で参照する', correct: true, whyJa: '正解。ファイルを明示参照できる。' },
            { textJa: '#auth.ts と書く', whyJa: '×: ファイル参照の記法ではない。' },
            { textJa: '!auth.ts と書く', whyJa: '×: それは別の用途の記法。' },
            { textJa: 'settings.json に書く', whyJa: '×: 設定ファイルは参照指定の場所ではない。' },
          ],
        },
        rewardJa: '相棒は的確に対象を捉えた。修正は一発で決まった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't1-permissions',
    tier: 't1',
    order: 4,
    title: 'Permissions',
    titleJa: '権限（許可と拒否）',
    icon: '🔐',
    requires: ['t1-repl'],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        '権限は、Claude が実行できるツール（コマンドやファイル操作）を allow/deny で制御する仕組み。危険な操作を止める手綱。',
      blocks: [
        { type: 'lead', textJa: '強力な相棒には手綱が要る。許可と拒否で行動範囲を決めよう。' },
        {
          type: 'list',
          titleJa: '主な考え方',
          items: [
            { term: 'allow', descJa: '確認なしに許可するツール/パターン。' },
            { term: 'deny', descJa: '常に拒否するツール/パターン（最優先）。' },
            { term: '/permissions', descJa: '現在の権限ルールを確認・編集する。' },
          ],
        },
        {
          type: 'code',
          caption: 'settings.json の例',
          lang: 'json',
          code: '{\n  "permissions": {\n    "allow": ["Bash(npm run test:*)"],\n    "deny": ["Bash(rm:*)"]\n  }\n}',
        },
        { type: 'warn', textJa: 'deny は allow より強い。危険コマンドは deny で確実に封じる。' },
      ],
      links: [{ labelJa: '公式: 権限', url: DOC }],
    },
    quiz: [
      {
        id: 't1-permissions-q1',
        type: 'mcq',
        promptJa: 'Claude に `rm` 系コマンドを絶対に実行させたくない。設定すべきは？',
        options: [
          { textJa: 'permissions.deny に Bash(rm:*) を追加', whyJa: '正解。deny は最優先で拒否される。' },
          { textJa: 'permissions.allow に rm を追加', whyJa: '×: 逆に許可してしまう。' },
          { textJa: 'CLAUDE.md に「rm 禁止」と書くだけ', whyJa: '△: 指示にはなるが強制力は権限ルールの方が確実。' },
          { textJa: '何もしない', whyJa: '×: 既定では確認は入るが、確実に封じるなら deny。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't1-permissions-q2',
        type: 'mcq',
        promptJa: '今の権限ルールを確認・編集する REPL コマンドは？',
        options: [
          { textJa: '/permissions', whyJa: '正解。権限を確認・編集できる。' },
          { textJa: '/auth', whyJa: '×: 認証関連で別物。' },
          { textJa: '/rules', whyJa: '×: そのようなコマンドは無い。' },
          { textJa: '/settings only', whyJa: '×: 権限専用は /permissions。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't1-permissions-case1',
        type: 'case',
        scenarioJa: 'テスト実行 `npm test` は毎回確認なしで通したいが、それ以外の Bash は確認させたい。',
        tags: ['permissions', 'safety'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'allow', labelJa: '権限の allow ルール', correct: true, whyJa: '特定パターンだけ allow に入れれば、そのコマンドのみ確認を省ける。' },
            { id: 'bypass', labelJa: '全許可モードにする', whyJa: '×: それ以外も無確認になり危険。過剰。' },
            { id: 'deny', labelJa: 'deny に npm test を入れる', whyJa: '×: 逆。実行できなくなる。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に書く', whyJa: '△: 指示はできるが確認省略の制御は権限ルールの役目。' },
          ],
        },
        invoke: {
          promptJa: 'どう書く？',
          options: [
            { textJa: 'permissions.allow に "Bash(npm test:*)"', correct: true, whyJa: '正解。そのパターンのみ無確認で許可。' },
            { textJa: 'permissions.deny に "Bash(npm test:*)"', whyJa: '×: 拒否になってしまう。' },
            { textJa: 'permissions.allow に "Bash(*)"', whyJa: '×: 全 Bash を許可。範囲が広すぎ危険。' },
            { textJa: '.env に書く', whyJa: '×: 権限の定義場所ではない。' },
          ],
        },
        rewardJa: 'テストはサクサク、危険操作はしっかり確認。バランスの取れた手綱だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't1-permission-modes',
    tier: 't1',
    order: 5,
    title: 'Permission Modes',
    titleJa: '権限モード',
    icon: '🛡️',
    requires: ['t1-permissions'],
    mapPos: { col: 3, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        '権限モードは、ツール実行前にどこまで確認を取るかをまとめて切り替える設定。Shift+Tab で循環できる。',
      blocks: [
        { type: 'lead', textJa: '状況に応じて手綱の強さを変える。それが権限モードだ。' },
        {
          type: 'list',
          titleJa: '主なモード',
          items: [
            { term: 'default', descJa: '重要な操作の前に毎回確認する標準モード。' },
            { term: 'acceptEdits', descJa: 'ファイル編集は自動承認、コマンドは確認。' },
            { term: 'plan', descJa: '読み取り中心。まず計画を立てさせる安全モード。' },
            { term: 'bypassPermissions', descJa: '全自動。信頼できる隔離環境専用の劇薬。' },
          ],
        },
        { type: 'kbd', keys: 'Shift+Tab', descJa: 'モードを循環切替する。' },
        { type: 'tip', textJa: '迷ったら default。無人の CI でだけ bypass を検討する。' },
      ],
      links: [{ labelJa: '公式: 権限モード', url: DOC }],
    },
    quiz: [
      {
        id: 't1-permission-modes-q1',
        type: 'mcq',
        promptJa: 'CI 上で人の確認なしに Claude を完全自動で走らせたい。最も近いモードは？',
        options: [
          { textJa: 'bypassPermissions', whyJa: '正解。全操作を自動承認。隔離環境前提。' },
          { textJa: 'default', whyJa: '×: 毎回確認が入り無人実行で止まる。' },
          { textJa: 'plan', whyJa: '×: 計画重視で読み取り中心。実行は限定的。' },
          { textJa: 'acceptEdits', whyJa: '×: 編集は自動だがコマンドで確認が残る。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't1-permission-modes-q2',
        type: 'mcq',
        promptJa: 'まず実装方針を立てさせ、いきなりファイルを変更させたくない。最適なモードは？',
        options: [
          { textJa: 'plan モード', whyJa: '正解。読み取り中心で計画を先に作る。' },
          { textJa: 'bypassPermissions', whyJa: '×: 全自動で勝手に変更してしまう。' },
          { textJa: 'acceptEdits', whyJa: '×: 編集が自動承認され方針確認前に変わりうる。' },
          { textJa: '権限を全部 deny', whyJa: '×: 何もできなくなる。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't1-permission-modes-q3',
        type: 'mcq',
        promptJa: '権限モードを素早く循環切替するキーは？',
        options: [
          { textJa: 'Shift+Tab', whyJa: '正解。モードを循環できる。' },
          { textJa: 'Ctrl+M', whyJa: '×: モード切替の標準キーではない。' },
          { textJa: 'Tab 単独', whyJa: '×: 補完など別用途。' },
          { textJa: 'Alt+P', whyJa: '×: 別機能（モデル切替等）。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't1-permission-modes-case1',
        type: 'case',
        scenarioJa:
          '大きなリファクタを頼みたいが、いきなりコードを書き換えられるのは不安。まず計画を確認したい。',
        tags: ['permission-modes', 'safety'],
        feature: {
          promptJa: 'どのモードを使う？',
          options: [
            { id: 'plan', labelJa: 'plan モード', correct: true, whyJa: '読み取り中心で先に計画を提示。承認してから実行できる。' },
            { id: 'accept', labelJa: 'acceptEdits モード', whyJa: '×: 編集が自動承認され、確認前に変更されうる。' },
            { id: 'bypass', labelJa: 'bypassPermissions モード', whyJa: '×: 全自動。最も不安な選択。' },
            { id: 'deny', labelJa: '全部 deny にする', whyJa: '×: 計画すら立てられず過剰。' },
          ],
        },
        invoke: {
          promptJa: 'どう切り替える？',
          options: [
            { textJa: 'Shift+Tab で plan モードへ循環', correct: true, whyJa: '正解。モードを循環して plan に合わせる。' },
            { textJa: 'Ctrl+C を押す', whyJa: '×: 中断であってモード切替ではない。' },
            { textJa: '/clear する', whyJa: '×: 会話リセットで無関係。' },
            { textJa: 'ターミナルを再起動', whyJa: '×: モード切替の手段ではない。' },
          ],
        },
        rewardJa: '計画を見てから GO。安全に大改修を進められた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
