import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 15: Production & SDK（創造主の玉座）=====
export const TIER15: Topic[] = [
  {
    id: 't15-headless',
    tier: 't15',
    order: 1,
    title: 'Headless Mode',
    titleJa: 'ヘッドレスモード',
    icon: '🤖',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 5,
    study: {
      summaryJa:
        'ヘッドレス（非対話）モードは、人の確認なしに Claude Code をスクリプト/CI から走らせるための実行形態。`-p`（print）で結果を標準出力に返し、`--output-format json` で機械可読にできる。',
      blocks: [
        { type: 'lead', textJa: '玉座の間へようこそ。ここからは「人が見ていなくても動く」自動化の領域だ。' },
        {
          type: 'list',
          titleJa: '主なフラグ',
          items: [
            { term: 'claude -p "…"', descJa: '対話せず1回だけ実行して結果を返す（print/非対話）。' },
            { term: '--output-format json', descJa: '結果を JSON で出力。CI でパースしやすい。' },
            { term: '--output-format stream-json', descJa: '途中経過をストリームで取得。' },
          ],
        },
        {
          type: 'code',
          caption: 'CI から1回だけ実行',
          lang: 'bash',
          code: 'claude -p "変更点のリリースノートを書いて" --output-format json',
        },
        { type: 'warn', textJa: '無人実行では権限の確認が出せない。隔離環境＋限定した権限/モードで動かすこと。' },
        { type: 'tip', textJa: 'ログをパイプで渡すのも定番：tail -200 app.log | claude -p "原因を推測して"' },
      ],
      links: [{ labelJa: '公式: ヘッドレス/CI', url: DOC }],
    },
    quiz: [
      {
        id: 't15-headless-q1',
        type: 'mcq',
        promptJa: 'CI のジョブから対話なしで Claude を1回実行し、結果をパースしたい。最適なのは？',
        options: [
          { textJa: 'claude -p "…" --output-format json', whyJa: '正解。非対話で実行し JSON で受け取れる。' },
          { textJa: '通常の `claude` を起動して待つ', whyJa: '×: 対話前提で CI では止まる。' },
          { textJa: 'ブラウザ版を開く', whyJa: '×: CI から人手操作はできない。' },
          { textJa: 'settings.json を編集するだけ', whyJa: '×: 実行手段にならない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't15-headless-q2',
        type: 'mcq',
        promptJa: 'ヘッドレス実行で特に注意すべき点は？',
        options: [
          { textJa: '権限確認が出せないので隔離環境＋限定権限で動かす', whyJa: '正解。無人なので安全側に倒す。' },
          { textJa: '必ず bypassPermissions を本番マシンで使う', whyJa: '×: 信頼できる隔離環境に限るべき。' },
          { textJa: '出力形式は常に人間向け text 固定', whyJa: '×: CI では json/stream-json が扱いやすい。' },
          { textJa: 'ログは渡してはいけない', whyJa: '×: パイプでログを渡すのはむしろ定番。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't15-headless-case1',
        type: 'case',
        scenarioJa:
          'GitHub Actions の中で、PR の差分を要約して Slack に貼るスクリプトを組みたい。Claude をどう呼ぶ？',
        tags: ['headless', 'ci'],
        feature: {
          promptJa: 'どの実行形態を使う？',
          options: [
            { id: 'headless', labelJa: 'ヘッドレス（非対話）実行', correct: true, whyJa: 'CI から1回実行して結果を受け取る用途にぴったり。' },
            { id: 'repl', labelJa: '対話 REPL を起動', whyJa: '×: 人の入力待ちになり CI で止まる。' },
            { id: 'ide', labelJa: 'IDE 拡張を使う', whyJa: '×: GUI 前提で CI には不向き。' },
            { id: 'routine', labelJa: 'ルーティン（定期実行）', whyJa: '△: スケジュール用途。PR イベント駆動の今回は CI 実行が素直。' },
          ],
        },
        invoke: {
          promptJa: '具体的な呼び方は？',
          options: [
            { textJa: 'claude -p "この差分を要約" --output-format json', correct: true, whyJa: '正解。非対話＋JSON で後段が扱いやすい。' },
            { textJa: 'claude を引数なしで起動', whyJa: '×: 対話モードになり待ちが発生。' },
            { textJa: 'claude login だけ実行', whyJa: '×: 認証のみで要約はできない。' },
            { textJa: 'claude serve', whyJa: '×: そのようなコマンドは無い。' },
          ],
        },
        rewardJa: 'CI が回るたび、要約が自動で Slack に届くようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't15-agent-sdk',
    tier: 't15',
    order: 2,
    title: 'Agent SDK',
    titleJa: 'Agent SDK',
    icon: '🛠️',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 5,
    study: {
      summaryJa:
        'Agent SDK は、Claude Code の能力を自分のプログラムから使うための開発キット。TypeScript / Python から独自エージェントを組み立てられる。',
      blocks: [
        { type: 'lead', textJa: 'CLI の外へ。君のアプリの中に相棒を埋め込むための鍛冶場だ。' },
        {
          type: 'list',
          titleJa: 'ポイント',
          items: [
            { term: 'TypeScript', descJa: '`@anthropic-ai/claude-agent-sdk` を使う。' },
            { term: 'Python', descJa: 'Python 向け SDK で同等の構築ができる。' },
            { term: 'ツール/権限', descJa: '使えるツールや権限をコードで制御できる。' },
          ],
        },
        {
          type: 'code',
          caption: 'TypeScript（概念例）',
          lang: 'ts',
          code: "import { query } from '@anthropic-ai/claude-agent-sdk';\nfor await (const msg of query({ prompt: 'テストを直して' })) {\n  console.log(msg);\n}",
        },
        { type: 'tip', textJa: 'まず CLI/ヘッドレスで十分なことも多い。SDK は「自前アプリに組み込む」段階の道具。' },
      ],
      links: [{ labelJa: '公式: Agent SDK', url: DOC }],
    },
    quiz: [
      {
        id: 't15-agent-sdk-q1',
        type: 'mcq',
        promptJa: '自社アプリのバックエンドに Claude Code 相当のエージェントを組み込みたい。使うのは？',
        options: [
          { textJa: 'Agent SDK（TypeScript/Python）', whyJa: '正解。プログラムから組み込むための SDK。' },
          { textJa: 'CLAUDE.md を書く', whyJa: '×: 指示の記憶であって組み込み手段ではない。' },
          { textJa: 'キーバインド設定', whyJa: '×: 無関係。' },
          { textJa: '/usage コマンド', whyJa: '×: 使用量表示で別物。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't15-agent-sdk-q2',
        type: 'mcq',
        promptJa: 'Agent SDK と CLI/ヘッドレスの使い分けとして適切なのは？',
        options: [
          { textJa: '自前アプリへ深く組み込むなら SDK、単発自動化ならヘッドレスで足りることが多い', whyJa: '正解。目的の深さで選ぶ。' },
          { textJa: 'SDK は CLI の完全な置き換えで常に必須', whyJa: '×: 多くの用途は CLI/ヘッドレスで足りる。' },
          { textJa: 'SDK は対話専用', whyJa: '×: プログラム制御が主目的。' },
          { textJa: 'CLI は本番では一切使えない', whyJa: '×: そんな制約はない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't15-agent-sdk-case1',
        type: 'case',
        scenarioJa:
          '社内の Web ダッシュボードに「コードを直してくれる」ボタンを作り、裏で Claude を動かしたい。',
        tags: ['sdk'],
        feature: {
          promptJa: 'どれを使う？',
          options: [
            { id: 'sdk', labelJa: 'Agent SDK', correct: true, whyJa: 'アプリのコードから呼び出し、結果を UI に返せる。これが適切。' },
            { id: 'cli', labelJa: '手元の対話 CLI を都度叩く', whyJa: '×: Web アプリのボタンから人手 CLI は繋がらない。' },
            { id: 'plugin', labelJa: 'Plugin を入れる', whyJa: '×: Plugin は Claude Code 自体の拡張で、外部アプリ組み込みではない。' },
            { id: 'hook', labelJa: 'Hooks を設定する', whyJa: '×: イベント自動実行用で、アプリ組み込みの手段ではない。' },
          ],
        },
        invoke: {
          promptJa: '実装の入り口は？',
          options: [
            { textJa: '@anthropic-ai/claude-agent-sdk を import して query を呼ぶ', correct: true, whyJa: '正解。SDK のエントリから実行できる。' },
            { textJa: 'settings.json に書くだけ', whyJa: '×: 設定だけでは外部アプリから呼べない。' },
            { textJa: 'CLAUDE.md に「直して」と書く', whyJa: '×: 指示であって API ではない。' },
            { textJa: '/model を切り替える', whyJa: '×: モデル選択で組み込み手段ではない。' },
          ],
        },
        rewardJa: 'ダッシュボードのボタンが、裏でエージェントを起動するようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't15-devcontainers',
    tier: 't15',
    order: 3,
    title: 'DevContainers',
    titleJa: 'DevContainers',
    icon: '📦',
    requires: ['t15-headless'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'DevContainers は `.devcontainer/` 設定で開発環境をコンテナに隔離する仕組み。Claude を限定された権限・ネットワークで安全に動かす土台になる。',
      blocks: [
        { type: 'lead', textJa: '危険な実験は隔離室で。コンテナの中なら何が起きても外は無傷だ。' },
        {
          type: 'list',
          titleJa: 'うれしさ',
          items: [
            { term: '.devcontainer/', descJa: '環境定義をリポジトリに同梱し再現可能に。' },
            { term: '隔離', descJa: 'ファイルシステム/ネットワークを制限して暴走の被害を封じる。' },
            { term: '無人実行の相性', descJa: 'bypass 系を使う自動実行は隔離環境でこそ安全。' },
          ],
        },
        {
          type: 'code',
          caption: '.devcontainer/devcontainer.json（概念）',
          lang: 'json',
          code: '{\n  "name": "claude-dev",\n  "image": "mcr.microsoft.com/devcontainers/base:ubuntu"\n}',
        },
        { type: 'tip', textJa: '「全自動で走らせたいが本番マシンは怖い」ときの定番の置き場所。' },
      ],
      links: [{ labelJa: '公式: DevContainers/サンドボックス', url: DOC }],
    },
    quiz: [
      {
        id: 't15-devcontainers-q1',
        type: 'mcq',
        promptJa: '自動実行を安全に行うための隔離環境を、リポジトリ同梱で再現可能にしたい。使うのは？',
        options: [
          { textJa: '.devcontainer/ による DevContainer', whyJa: '正解。環境を定義し隔離・再現できる。' },
          { textJa: 'CLAUDE.md', whyJa: '×: 指示の記憶で隔離はできない。' },
          { textJa: '/context', whyJa: '×: 文脈可視化で別物。' },
          { textJa: 'キーバインド設定', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't15-devcontainers-q2',
        type: 'mcq',
        promptJa: 'DevContainer が特に効くのはどんなとき？',
        options: [
          { textJa: '権限を緩めた無人実行を本番から切り離して動かしたいとき', whyJa: '正解。隔離して被害範囲を限定できる。' },
          { textJa: '対話で軽く質問するだけのとき', whyJa: '×: そこまでの隔離は不要。' },
          { textJa: '単にテーマ色を変えたいとき', whyJa: '×: 無関係。' },
          { textJa: 'トークンを節約したいとき', whyJa: '×: それは /context や /compact の領域。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't15-devcontainers-case1',
        type: 'case',
        scenarioJa:
          'CI で権限をほぼ全自動にして Claude を走らせたいが、本番環境に影響が出るのは絶対に避けたい。',
        tags: ['sandbox', 'security'],
        feature: {
          promptJa: 'まず何で守る？',
          options: [
            { id: 'devc', labelJa: '隔離環境（DevContainer/サンドボックス）で実行', correct: true, whyJa: 'ファイルシステム/ネットワークを限定し被害を封じ込める。最優先の備え。' },
            { id: 'trust', labelJa: '本番でそのまま bypass で実行', whyJa: '×: 最も危険。隔離なしの全自動は禁物。' },
            { id: 'nothing', labelJa: '特に何もしない', whyJa: '×: 事故時に本番が壊れる。' },
            { id: 'compact', labelJa: '/compact で文脈を減らす', whyJa: '×: 安全対策ではない。' },
          ],
        },
        invoke: {
          promptJa: '設定の置き場所は？',
          options: [
            { textJa: '.devcontainer/devcontainer.json に環境を定義', correct: true, whyJa: '正解。隔離環境を宣言的に用意できる。' },
            { textJa: '~/.claude/keybindings.json', whyJa: '×: キーバインド用で無関係。' },
            { textJa: 'CLAUDE.md の先頭', whyJa: '×: 指示の場所であって環境定義ではない。' },
            { textJa: '/usage を実行', whyJa: '×: 使用量表示で別物。' },
          ],
        },
        rewardJa: 'コンテナの中でだけ全自動。万一暴れても本番は無傷だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't15-providers',
    tier: 't15',
    order: 4,
    title: 'Third-Party Providers',
    titleJa: 'サードパーティプロバイダ',
    icon: '☁️',
    requires: ['t15-headless'],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'Claude Code は Anthropic 直だけでなく、Amazon Bedrock や Google Vertex AI 経由でも動かせる。組織のクラウド契約・データ要件に合わせて経路を選ぶ。',
      blocks: [
        { type: 'lead', textJa: '玉座への道は一つではない。組織の事情に合わせて経路を選べ。' },
        {
          type: 'list',
          titleJa: '主な経路',
          items: [
            { term: 'Anthropic API', descJa: '標準。アカウント/API キーで利用。' },
            { term: 'Amazon Bedrock', descJa: 'AWS 上で利用。環境変数で切り替える。' },
            { term: 'Google Vertex AI', descJa: 'Google Cloud 上で利用。' },
          ],
        },
        {
          type: 'code',
          caption: '環境変数で切り替え（概念）',
          lang: 'bash',
          code: 'export CLAUDE_CODE_USE_BEDROCK=1   # Bedrock 経由\n# または\nexport CLAUDE_CODE_USE_VERTEX=1    # Vertex AI 経由',
        },
        { type: 'tip', textJa: '「データを自社クラウド内に閉じたい」等のコンプラ要件があるとき検討する。' },
      ],
      links: [{ labelJa: '公式: プロバイダ設定', url: DOC }],
    },
    quiz: [
      {
        id: 't15-providers-q1',
        type: 'mcq',
        promptJa: '社内方針で「AWS 契約の範囲内で Claude を使う」必要がある。経路は？',
        options: [
          { textJa: 'Amazon Bedrock 経由で利用する', whyJa: '正解。AWS 上のプロバイダ経由にできる。' },
          { textJa: '必ず Anthropic 直のみ', whyJa: '×: Bedrock/Vertex の選択肢がある。' },
          { textJa: 'ローカルだけで動かす', whyJa: '×: モデル実行はクラウド経由が前提。' },
          { textJa: 'Plugin を入れる', whyJa: '×: プロバイダ切替の手段ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't15-providers-q2',
        type: 'mcq',
        promptJa: 'Vertex AI 経由に切り替える一般的な方法は？',
        options: [
          { textJa: '環境変数（例 CLAUDE_CODE_USE_VERTEX）で指定する', whyJa: '正解。環境変数で経路を切り替える。' },
          { textJa: 'CLAUDE.md に「Vertex を使え」と書く', whyJa: '×: 指示であって経路設定ではない。' },
          { textJa: 'キーバインドを変える', whyJa: '×: 無関係。' },
          { textJa: '/compact を打つ', whyJa: '×: 文脈圧縮で別物。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't15-providers-case1',
        type: 'case',
        scenarioJa:
          'コンプライアンス上、推論トラフィックを自社の Google Cloud に通す必要がある。どうする？',
        tags: ['providers', 'enterprise'],
        feature: {
          promptJa: 'どの仕組みで対応する？',
          options: [
            { id: 'vertex', labelJa: 'Google Vertex AI 経由で利用', correct: true, whyJa: '自社 Google Cloud を経路にでき、要件を満たせる。' },
            { id: 'direct', labelJa: 'Anthropic 直のまま放置', whyJa: '×: 要件（Google Cloud 経由）を満たせない。' },
            { id: 'zdr', labelJa: 'ZDR を有効化', whyJa: '△: データ保持の話で、経路の指定そのものではない。' },
            { id: 'sandbox', labelJa: 'サンドボックス化', whyJa: '×: 実行隔離であって推論経路の選択ではない。' },
          ],
        },
        invoke: {
          promptJa: '切り替えの実務は？',
          options: [
            { textJa: 'CLAUDE_CODE_USE_VERTEX を環境変数で設定', correct: true, whyJa: '正解。環境変数で Vertex 経由に切り替える。' },
            { textJa: 'settings.json の permissions.deny に書く', whyJa: '×: 権限拒否で経路設定ではない。' },
            { textJa: '/usage を実行', whyJa: '×: 使用量表示で別物。' },
            { textJa: 'keybindings.json を編集', whyJa: '×: 無関係。' },
          ],
        },
        rewardJa: '推論は自社クラウド内を通るようになり、監査も通った。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't15-sdk-mcp',
    tier: 't15',
    order: 5,
    title: 'SDK + MCP',
    titleJa: 'SDKでのMCP活用',
    icon: '🔌',
    requires: ['t15-agent-sdk'],
    mapPos: { col: 3, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Agent SDK で組んだエージェントにも MCP サーバやツールを接続できる。自前アプリのエージェントへ、外部システム（DB・社内 API 等）を扱う手を与えられる。',
      blocks: [
        { type: 'lead', textJa: '鍛えた相棒に、異界の門（MCP）を持たせる。これで創造主の道具は揃った。' },
        {
          type: 'list',
          titleJa: 'できること',
          items: [
            { term: 'MCP 接続', descJa: 'SDK のエージェントから MCP サーバのツールを呼ぶ。' },
            { term: 'ツール定義', descJa: '独自ツールをコードで定義して使わせる。' },
            { term: '権限制御', descJa: 'どのツールを許すかをコードで絞る。' },
          ],
        },
        { type: 'tip', textJa: 'まず Tier 4/14 の MCP を理解しておくと、SDK からの接続が腹落ちする。' },
        { type: 'warn', textJa: '外部システムに触れる分、許可するツールは最小限に絞ること。' },
      ],
      links: [{ labelJa: '公式: SDK と MCP', url: DOC }],
    },
    quiz: [
      {
        id: 't15-sdk-mcp-q1',
        type: 'mcq',
        promptJa: 'SDK で作った自前エージェントに、社内 DB を扱う MCP サーバを使わせたい。可能？',
        options: [
          { textJa: '可能。SDK から MCP サーバ/ツールを接続できる', whyJa: '正解。SDK のエージェントにも MCP を繋げる。' },
          { textJa: '不可能。MCP は CLI 専用', whyJa: '×: SDK からも利用できる。' },
          { textJa: 'CLAUDE.md に DB 情報を貼れば十分', whyJa: '×: 接続手段にならない。' },
          { textJa: 'キーバインドで対応する', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't15-sdk-mcp-q2',
        type: 'mcq',
        promptJa: 'SDK＋MCP で外部システムを扱うときの安全策は？',
        options: [
          { textJa: '許可するツールを最小限に絞る', whyJa: '正解。権限は最小限が原則。' },
          { textJa: '全ツールを無制限に許可する', whyJa: '×: 危険。最小権限に反する。' },
          { textJa: '認証情報をプロンプトに直書きする', whyJa: '×: 漏洩リスク。環境変数等で扱う。' },
          { textJa: '何も考えず本番 DB に書き込ませる', whyJa: '×: 事故の元。読み取り限定など段階を踏む。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't15-sdk-mcp-case1',
        type: 'case',
        scenarioJa:
          'SDK で作った社内エージェントに、GitHub の Issue を読んで整理させたい。どう能力を足す？',
        tags: ['sdk', 'mcp'],
        feature: {
          promptJa: 'どの仕組みで外部連携する？',
          options: [
            { id: 'mcp', labelJa: 'MCP サーバを SDK のエージェントに接続', correct: true, whyJa: 'GitHub 等の外部ツールを扱う標準手段。SDK からも繋げる。' },
            { id: 'paste', labelJa: 'Issue を毎回手でコピペ', whyJa: '△: 動くが自動化にならず非効率。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に Issue を書く', whyJa: '×: 記憶であって連携手段ではない。' },
            { id: 'keybind', labelJa: 'キーバインドを足す', whyJa: '×: 無関係。' },
          ],
        },
        invoke: {
          promptJa: '実務上の進め方は？',
          options: [
            { textJa: 'GitHub の MCP サーバを接続し、許可ツールを必要分だけに絞る', correct: true, whyJa: '正解。MCP で繋ぎ、最小権限で安全に使わせる。' },
            { textJa: '全ツールを無制限許可で接続', whyJa: '×: 最小権限に反し危険。' },
            { textJa: 'settings.local.json を消す', whyJa: '×: 無関係で有害。' },
            { textJa: '/usage を実行する', whyJa: '×: 使用量表示で連携にならない。' },
          ],
        },
        rewardJa: '自前エージェントが Issue を読み、整理して返すようになった。創造主の道具が揃った。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
