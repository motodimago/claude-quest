import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 14: Advanced MCP（異界の門）=====
export const TIER14: Topic[] = [
  {
    id: 't14-mcp-quickstart',
    tier: 't14',
    order: 1,
    title: 'MCP Quickstart',
    titleJa: 'MCPクイックスタート',
    icon: '🌐',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'MCP（Model Context Protocol）は、Claude を外部ツールやサービスへ繋ぐ標準規格。`claude mcp add` でサーバを追加し、認証すれば GitHub や Slack などを操作できる。',
      blocks: [
        { type: 'lead', textJa: '異界への門を開け。MCP は Claude を外の世界とつなぐ魔法陣だ。' },
        {
          type: 'code',
          caption: 'GitHub サーバを追加',
          lang: 'bash',
          code: 'claude mcp add github',
        },
        {
          type: 'list',
          titleJa: 'つなげる先の例',
          items: [
            { term: 'GitHub', descJa: 'Issue・PR の読み書き。' },
            { term: 'Slack', descJa: 'メッセージの取得・送信。' },
            { term: 'Database', descJa: 'クエリ実行やスキーマ参照。' },
          ],
        },
        { type: 'list', titleJa: 'よく使う管理', items: [
          { term: 'claude mcp list', descJa: '追加済みサーバを一覧表示。' },
          { term: 'claude mcp remove <名前>', descJa: 'サーバを削除。' },
        ] },
        { type: 'tip', textJa: '初回は認証フローが走る。OAuth でブラウザ認証する MCP が多い。' },
      ],
      links: [{ labelJa: '公式: MCP', url: DOC }],
    },
    quiz: [
      {
        id: 't14-mcp-quickstart-q1',
        type: 'mcq',
        promptJa: 'Claude を GitHub につなぐ MCP サーバを追加するコマンドは？',
        options: [
          { textJa: 'claude mcp add github', whyJa: '正解。MCP サーバを追加する標準コマンド。' },
          { textJa: 'claude install github', whyJa: '×: そのようなサブコマンドは無い。' },
          { textJa: 'npm install github-mcp', whyJa: '×: npm パッケージ導入では接続設定にならない。' },
          { textJa: 'git remote add mcp', whyJa: '×: git のリモート設定で無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't14-mcp-quickstart-q2',
        type: 'mcq',
        promptJa: 'MCP（Model Context Protocol）の役割として正しいのは？',
        options: [
          { textJa: 'Claude を外部ツール/サービスへ標準的につなぐ', whyJa: '正解。外界との接続を担う規格。' },
          { textJa: 'モデルの推論時間を増やす', whyJa: '×: それは拡張思考の話。' },
          { textJa: 'トークン使用量を可視化する', whyJa: '×: それは /usage / /context。' },
          { textJa: 'ファイル編集を自動承認する', whyJa: '×: それは権限モードの話。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't14-mcp-quickstart-q3',
        type: 'mcq',
        promptJa: '追加済みの MCP サーバを確認するには？',
        options: [
          { textJa: 'claude mcp list', whyJa: '正解。登録済みサーバを一覧できる。' },
          { textJa: 'claude mcp status all', whyJa: '×: 標準の一覧は list。' },
          { textJa: '/mcp-show', whyJa: '×: そのようなスラッシュコマンドは無い。' },
          { textJa: 'cat mcp.json', whyJa: '△: 設定を直接読む手はあるが、確認の標準は list。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't14-mcp-quickstart-case1',
        type: 'case',
        scenarioJa:
          'Claude に GitHub の Issue を読ませたり新規作成させたりしたい。どう実現する？',
        tags: ['mcp', 'github'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'mcp', labelJa: 'MCP サーバを追加する', correct: true, whyJa: '外部サービス連携は MCP の役目。GitHub サーバを繋げば Issue を操作できる。' },
            { id: 'skill', labelJa: 'Skill を作る', whyJa: '×: Skill はローカルの手順化。GitHub API への接続そのものは担えない。' },
            { id: 'hook', labelJa: 'Hook を設定する', whyJa: '×: Hook はイベント駆動の自動実行で、外部接続の確立用ではない。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に手順を書く', whyJa: '×: 指示は書けるが接続・認証は提供できない。' },
          ],
        },
        invoke: {
          promptJa: '具体的な操作は？',
          options: [
            { textJa: 'claude mcp add github して認証', correct: true, whyJa: '正解。サーバ追加＋認証で Issue/PR を操作できる。' },
            { textJa: 'claude skill add github', whyJa: '×: Skill 追加では外部接続にならない。' },
            { textJa: 'settings.json に api_key だけ書く', whyJa: '×: それだけでは MCP 接続は確立しない。' },
            { textJa: 'git clone でリポジトリを取得', whyJa: '×: ローカル取得であり Issue 操作はできない。' },
          ],
        },
        rewardJa: '門が開き、GitHub と直接やり取りできるようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't14-managed-mcp',
    tier: 't14',
    order: 2,
    title: 'Managed MCP',
    titleJa: '管理MCP',
    icon: '🏛️',
    requires: ['t14-mcp-quickstart'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        '管理MCP は、組織が承認した MCP サーバを全メンバーへ一括配備する仕組み。個々人が手動で追加しなくても共通の接続先が使える。',
      blocks: [
        { type: 'lead', textJa: '王国の門は、領主がまとめて開く。管理MCP は組織配備の魔法だ。' },
        {
          type: 'list',
          titleJa: 'ねらい',
          items: [
            { term: '一括配備', descJa: '承認済みサーバを全員に行き渡らせる。' },
            { term: '統制', descJa: '使ってよい接続先を組織で管理する。' },
            { term: '手間削減', descJa: '各自の手動セットアップが不要になる。' },
          ],
        },
        { type: 'warn', textJa: '管理MCP は組織ポリシーの一部。個人設定では上書きできないことがある。' },
        { type: 'tip', textJa: '社内専用ツールを全員に配るときに有効。' },
      ],
      links: [{ labelJa: '公式: Managed MCP', url: DOC }],
    },
    quiz: [
      {
        id: 't14-managed-mcp-q1',
        type: 'mcq',
        promptJa: '組織の全メンバーに同じ MCP サーバを行き渡らせたい。適切なのは？',
        options: [
          { textJa: '管理MCP（組織配備）を使う', whyJa: '正解。承認済みサーバを一括配備できる。' },
          { textJa: '各自に claude mcp add を手動で頼む', whyJa: '△: 動くが抜け漏れと手間が出る。組織配備が適切。' },
          { textJa: 'CLAUDE.md に「追加して」と書く', whyJa: '×: 指示はできるが自動配備にはならない。' },
          { textJa: '何もしない', whyJa: '×: 全員に行き渡らない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't14-managed-mcp-q2',
        type: 'mcq',
        promptJa: '管理MCP の特徴として正しいのは？',
        options: [
          { textJa: '組織が管理し、個人で勝手に変えにくい', whyJa: '正解。組織ポリシーとして統制される。' },
          { textJa: '各ユーザーが自由に削除できる', whyJa: '×: 統制目的なので自由変更は前提でない。' },
          { textJa: 'ローカルのみで有効', whyJa: '×: 組織全体への配備が目的。' },
          { textJa: 'モデルを切り替える機能', whyJa: '×: モデル選択とは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't14-managed-mcp-case1',
        type: 'case',
        scenarioJa:
          '新入社員が増えるたびに、全員へ社内チケット管理ツールの MCP を手動で追加させていて手間。どうする？',
        tags: ['mcp', 'enterprise'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'managed', labelJa: '管理MCP で組織配備する', correct: true, whyJa: '承認済みサーバを全員へ自動で行き渡らせられる。手動追加が不要になる。' },
            { id: 'each', labelJa: '入社時に手動で claude mcp add', whyJa: '△: 現状と同じで手間と抜けが残る。' },
            { id: 'plugin', labelJa: '各自に Plugin を入れてもらう', whyJa: '×: 配布の統制にはならず手動依存が残る。' },
            { id: 'doc', labelJa: '手順書を配る', whyJa: '×: 自動化されず属人的。' },
          ],
        },
        invoke: {
          promptJa: 'どこで管理する？',
          options: [
            { textJa: '組織の管理設定（managed）で MCP を配備', correct: true, whyJa: '正解。組織レベルで一括配備・統制する。' },
            { textJa: '各自の settings.local.json', whyJa: '×: 個人設定では全員に配れない。' },
            { textJa: 'CLAUDE.md', whyJa: '×: 指示文であり配備の仕組みではない。' },
            { textJa: '.gitignore', whyJa: '×: 全く無関係。' },
          ],
        },
        rewardJa: '門は組織の手で一斉に開かれた。オンボーディングが一瞬に。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't14-custom-mcp',
    tier: 't14',
    order: 3,
    title: 'Custom MCP Server',
    titleJa: '自作MCPサーバ',
    icon: '🔧',
    requires: ['t14-mcp-quickstart'],
    mapPos: { col: 2, row: 2 },
    estMin: 5,
    study: {
      summaryJa:
        '既製の MCP が無い独自/社内ツールには、自分で MCP サーバを作って繋げる。ツール（関数）を MCP として公開すれば Claude から呼べる。',
      blocks: [
        { type: 'lead', textJa: '門が無いなら自分で作る。独自の世界への通路を開くのだ。' },
        {
          type: 'list',
          titleJa: '自作する場面',
          items: [
            { term: '社内API', descJa: '公開されていない独自システムを操作したい。' },
            { term: '専用ツール', descJa: '自社固有の業務手順を Claude から実行したい。' },
          ],
        },
        {
          type: 'code',
          caption: 'イメージ：自作サーバを追加',
          lang: 'bash',
          code: 'claude mcp add my-tool -- node ./my-mcp-server.js',
        },
        { type: 'tip', textJa: '公式の MCP SDK を使うとサーバ実装が楽になる。' },
        { type: 'warn', textJa: 'ツールが副作用を持つ場合は権限と認証を丁寧に設計する。' },
      ],
      links: [{ labelJa: '公式: MCP サーバ開発', url: DOC }],
    },
    quiz: [
      {
        id: 't14-custom-mcp-q1',
        type: 'mcq',
        promptJa: '社内専用システムを Claude から操作したいが既製の MCP が無い。最善は？',
        options: [
          { textJa: '自作の MCP サーバを開発して繋ぐ', whyJa: '正解。独自ツールは自作 MCP で公開すれば呼べる。' },
          { textJa: '諦めて手作業でやる', whyJa: '×: 自作で自動化できる。' },
          { textJa: 'CLAUDE.md に API 仕様を書くだけ', whyJa: '△: 知識は与えられるが実際の接続・実行はできない。' },
          { textJa: '別の既製サービスに乗り換える', whyJa: '×: 過剰。自作 MCP で繋げばよい。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't14-custom-mcp-q2',
        type: 'mcq',
        promptJa: '自作 MCP サーバ開発を楽にする一般的な手段は？',
        options: [
          { textJa: '公式の MCP SDK を使う', whyJa: '正解。サーバ実装の定型部分を肩代わりしてくれる。' },
          { textJa: 'CLAUDE.md にコードを貼る', whyJa: '×: 指示文でありサーバにはならない。' },
          { textJa: 'settings.json に関数を書く', whyJa: '×: 設定ファイルに実装は書けない。' },
          { textJa: 'Hook で代用する', whyJa: '×: Hook はローカルイベント自動実行で別物。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't14-custom-mcp-case1',
        type: 'case',
        scenarioJa:
          '社内の在庫管理システム（独自API）を Claude から照会・更新したい。公開 MCP は存在しない。',
        tags: ['mcp', 'custom'],
        feature: {
          promptJa: 'どう実現する？',
          options: [
            { id: 'custom', labelJa: '自作 MCP サーバを作って繋ぐ', correct: true, whyJa: '独自APIはツールとして MCP に公開すれば Claude から呼べる。これが本筋。' },
            { id: 'wait', labelJa: '公式が対応するまで待つ', whyJa: '×: 独自社内システムは公式対応されない。' },
            { id: 'skill', labelJa: 'Skill にAPI手順を書く', whyJa: '△: 手順は書けるが実際の接続・認証は担えない。' },
            { id: 'paste', labelJa: '毎回レスポンスを手で貼る', whyJa: '×: 自動化できず非効率。' },
          ],
        },
        invoke: {
          promptJa: 'どう追加する？',
          options: [
            { textJa: 'claude mcp add で自作サーバを登録する', correct: true, whyJa: '正解。自作サーバを MCP として追加すれば呼び出せる。' },
            { textJa: 'npm publish するだけ', whyJa: '×: 公開しても Claude には接続されない。' },
            { textJa: '.env に在庫データを書く', whyJa: '×: データ直書きは接続でも自動化でもない。' },
            { textJa: 'CLAUDE.md にエンドポイントURLを書く', whyJa: '×: URL を書いても実行はできない。' },
          ],
        },
        rewardJa: '自作の門が開通。Claude が社内システムを直に扱えるようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't14-mcp-tool-search',
    tier: 't14',
    order: 4,
    title: 'MCP Tool Search',
    titleJa: 'MCPツール検索',
    icon: '🔎',
    requires: ['t14-mcp-quickstart'],
    mapPos: { col: 3, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'サーバが増えツールが大量になると、全ツール定義を常時読み込むのは文脈の無駄。MCPツール検索は必要なツールだけを動的に見つけ、スキーマをオンデマンドで読み込む。',
      blocks: [
        { type: 'lead', textJa: '無数の門の中から、今くぐるべき一つを選び出す目利きだ。' },
        {
          type: 'list',
          titleJa: 'なぜ必要？',
          items: [
            { term: '文脈節約', descJa: '全ツール定義を常時積まずに済む。' },
            { term: '精度', descJa: 'タスクに合うツールを的確に選べる。' },
          ],
        },
        { type: 'tip', textJa: 'サーバ数・ツール数が多い環境ほど効果が大きい。' },
        { type: 'kbd', keys: '/context', descJa: 'ツール定義が文脈を圧迫していないか確認に使える。' },
      ],
      links: [{ labelJa: '公式: MCP ツール検索', url: DOC }],
    },
    quiz: [
      {
        id: 't14-mcp-tool-search-q1',
        type: 'mcq',
        promptJa: '多数の MCP サーバを繋いだら、全ツール定義で文脈が圧迫された。役立つのは？',
        options: [
          { textJa: 'MCPツール検索（必要なツールを動的に読み込む）', whyJa: '正解。オンデマンドでスキーマを読み無駄を減らす。' },
          { textJa: '全サーバを削除する', whyJa: '×: 機能を失う。検索で両立できる。' },
          { textJa: 'モデルを Haiku にする', whyJa: '×: 文脈圧迫の根本対処ではない。' },
          { textJa: 'CLAUDE.md を消す', whyJa: '×: 無関係で逆効果のことも。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't14-mcp-tool-search-q2',
        type: 'mcq',
        promptJa: 'MCPツール検索が文脈を節約できる理由は？',
        options: [
          { textJa: '全ツール定義を常時積まず、必要時に読み込むから', whyJa: '正解。オンデマンド読み込みで無駄を省く。' },
          { textJa: 'モデルの推論を止めるから', whyJa: '×: 推論停止とは無関係。' },
          { textJa: '会話を要約するから', whyJa: '×: それは /compact の役割。' },
          { textJa: 'ファイルを圧縮するから', whyJa: '×: ファイル圧縮の話ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't14-mcp-tool-search-case1',
        type: 'case',
        scenarioJa:
          '10 以上の MCP サーバを繋いだら起動直後から文脈が重く、応答も鈍い。機能は減らしたくない。',
        tags: ['mcp', 'context'],
        feature: {
          promptJa: 'どう対処する？',
          options: [
            { id: 'search', labelJa: 'MCPツール検索を活用する', correct: true, whyJa: '必要なツールだけ動的に読み込み、機能を保ったまま文脈を軽くできる。' },
            { id: 'drop', labelJa: 'サーバを半分削除する', whyJa: '×: 機能を犠牲にする。検索で両立可能。' },
            { id: 'clear', labelJa: '毎回 /clear する', whyJa: '△: 一時しのぎで、ツール定義の常時積載は解決しない。' },
            { id: 'ignore', labelJa: '我慢して使う', whyJa: '×: 改善できるのに放置するのは非効率。' },
          ],
        },
        invoke: {
          promptJa: 'まず何で状況を確認する？',
          options: [
            { textJa: '/context でツール定義の占有を確認する', correct: true, whyJa: '正解。何が文脈を食べているかを可視化してから対処する。' },
            { textJa: '/usage で課金だけ見る', whyJa: '△: コストは見えるが文脈の内訳把握には /context が適切。' },
            { textJa: 'settings.json を消す', whyJa: '×: 設定削除は無関係で危険。' },
            { textJa: 'ターミナルを再起動する', whyJa: '×: 根本対処にならない。' },
          ],
        },
        rewardJa: '門の数はそのまま、通路はすっきり。応答が軽くなった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't14-mcp-hooks',
    tier: 't14',
    order: 5,
    title: 'MCP + Hooks',
    titleJa: 'MCPとHooks連携',
    icon: '⛓️',
    requires: ['t14-custom-mcp'],
    mapPos: { col: 3, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'Hooks の定義から MCP ツールを呼び出せば、イベント駆動の高度な自動化ができる。例：特定操作の後に外部サービスへ自動通知する。',
      blocks: [
        { type: 'lead', textJa: '門（MCP）と歯車（Hooks）を噛み合わせると、自動化は次の次元へ。' },
        {
          type: 'list',
          titleJa: '組み合わせの例',
          items: [
            { term: 'PostToolUse + Slack MCP', descJa: '編集後に Slack へ自動投稿。' },
            { term: 'Stop + チケットMCP', descJa: '作業完了時にチケットを更新。' },
          ],
        },
        { type: 'tip', textJa: 'Hooks（Tier 3）と MCP（本ティア）の知識が前提。両者を繋ぐと強力。' },
        { type: 'warn', textJa: '外部送信を伴う自動化は、誤発火しないようイベント条件を絞る。' },
      ],
      links: [{ labelJa: '公式: Hooks と MCP', url: DOC }],
    },
    quiz: [
      {
        id: 't14-mcp-hooks-q1',
        type: 'mcq',
        promptJa: '「作業が完了したら自動で社内チケットを更新」したい。組み合わせる仕組みは？',
        options: [
          { textJa: 'Hooks から MCP ツールを呼ぶ', whyJa: '正解。イベント（Stop 等）で MCP の更新ツールを起動できる。' },
          { textJa: 'CLAUDE.md に「更新して」と書くだけ', whyJa: '×: 自動・確実な実行にはならない。' },
          { textJa: '手動でチケットを開く', whyJa: '×: 自動化になっていない。' },
          { textJa: 'モデルを Opus にする', whyJa: '×: モデル選択は無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't14-mcp-hooks-q2',
        type: 'mcq',
        promptJa: 'MCP×Hooks の自動化で注意すべき点は？',
        options: [
          { textJa: '外部送信が誤発火しないようイベント条件を絞る', whyJa: '正解。副作用のある自動化は発火条件を厳密にする。' },
          { textJa: 'できるだけ多くのイベントで発火させる', whyJa: '×: 誤送信や乱発のリスクが高まる。' },
          { textJa: '認証は不要', whyJa: '×: 外部サービス連携には認証が要る。' },
          { textJa: 'Hooks は使わない方がよい', whyJa: '×: 適切に使えば強力。否定は誤り。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't14-mcp-hooks-case1',
        type: 'case',
        scenarioJa:
          'Claude がデプロイ用コマンドを実行し終えたら、毎回 Slack の運用チャンネルへ自動で結果を通知したい。',
        tags: ['mcp', 'hooks', 'automation'],
        feature: {
          promptJa: 'どう実現する？',
          options: [
            { id: 'hookmcp', labelJa: 'Hooks から Slack の MCP ツールを呼ぶ', correct: true, whyJa: 'イベント（実行後）をトリガに MCP の送信ツールを起動でき、完全自動化できる。' },
            { id: 'mcponly', labelJa: 'MCP を入れて毎回手で投稿', whyJa: '△: 接続はできるが自動発火しない。Hooks が要る。' },
            { id: 'hookonly', labelJa: 'Hook でローカルにログを書くだけ', whyJa: '×: Slack へは届かない。MCP 連携が必要。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に「通知して」と書く', whyJa: '×: 確実な自動発火にはならない。' },
          ],
        },
        invoke: {
          promptJa: 'どのイベントで発火させる？',
          options: [
            { textJa: 'PostToolUse（実行後）に MCP 送信ツールを呼ぶ', correct: true, whyJa: '正解。コマンド実行後に通知を起動できる。' },
            { textJa: 'PreToolUse（実行前）', whyJa: '×: 実行前では結果がまだ出ていない。' },
            { textJa: '.env に Webhook を書くだけ', whyJa: '×: それだけでは発火しない。' },
            { textJa: 'CLAUDE.md の先頭', whyJa: '×: Hook の設定場所ではない。' },
          ],
        },
        rewardJa: '門と歯車が噛み合い、デプロイ結果が自動で流れ込むようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
