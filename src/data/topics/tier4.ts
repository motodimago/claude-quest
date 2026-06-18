import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 4: Extensibility（拡張 — 道具屋）=====
export const TIER4: Topic[] = [
  {
    id: 't4-skills',
    tier: 't4',
    order: 1,
    title: 'Skills',
    titleJa: 'Skills（再利用ワークフロー）',
    icon: '📜',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Skills は、繰り返す手順を 1 つのワークフローとして定義し、`/<名前>` で呼び出せる仕組み。`.claude/skills/<名前>/SKILL.md` に書く。',
      blocks: [
        { type: 'lead', textJa: '同じ呪文を毎回詠唱するのは面倒。巻物（Skill）に封じて一言で発動しよう。' },
        {
          type: 'list',
          titleJa: 'Skill の要点',
          items: [
            { term: 'SKILL.md', descJa: '手順・説明を書いた本体ファイル。' },
            { term: '.claude/skills/', descJa: 'ここに置くとプロジェクトの Skill として認識される。' },
            { term: '/<名前>', descJa: 'Skill 名のスラッシュコマンドとして呼び出せる。' },
            { term: 'description', descJa: 'いつ使うかを書くと、適切な場面で発動しやすくなる。' },
          ],
        },
        {
          type: 'code',
          caption: 'デプロイ用 Skill の置き場所',
          lang: 'text',
          code: '.claude/skills/deploy/SKILL.md  →  /deploy で呼び出し',
        },
        { type: 'tip', textJa: 'チームで共有したいなら .claude/skills/ を git にコミットすればよい。' },
      ],
      links: [{ labelJa: '公式: Skills', url: DOC }],
    },
    quiz: [
      {
        id: 't4-skills-q1',
        type: 'mcq',
        promptJa: 'プロジェクト固有の Skill を定義するファイルはどれ？',
        options: [
          { textJa: '.claude/skills/<名前>/SKILL.md', whyJa: '正解。ここに書いた手順が Skill になる。' },
          { textJa: 'CLAUDE.md の末尾', whyJa: '×: CLAUDE.md は永続的な指示で、Skill の定義場所ではない。' },
          { textJa: 'package.json の scripts', whyJa: '×: npm スクリプトであって Skill ではない。' },
          { textJa: '.env', whyJa: '×: 環境変数用。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't4-skills-q2',
        type: 'mcq',
        promptJa: '`deploy` という Skill を定義した。どう呼び出す？',
        options: [
          { textJa: '/deploy と入力する', whyJa: '正解。Skill 名のスラッシュコマンドで発動する。' },
          { textJa: 'deploy() と関数呼び出しする', whyJa: '×: コード呼び出しではない。' },
          { textJa: 'claude run deploy', whyJa: '×: そのような起動方法ではない。' },
          { textJa: '自動で常に実行される', whyJa: '×: 呼び出して使うもの。常時自動実行ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't4-skills-case1',
        type: 'case',
        scenarioJa:
          'リリース手順（テスト→ビルド→タグ付け→デプロイ）が毎回同じで、その都度長い指示を打つのが面倒。',
        tags: ['skills', 'workflow'],
        feature: {
          promptJa: 'どの仕組みでまとめる？',
          options: [
            {
              id: 'skill',
              labelJa: 'Skill にワークフローを定義',
              correct: true,
              whyJa: '決まった手順を 1 つの巻物にまとめ、`/<名前>` で再利用できる。これが最適。',
            },
            { id: 'hook', labelJa: 'Hook で自動化', whyJa: '×: Hook はイベント駆動の自動実行。任意の場面で「呼び出す」手順には不向き。' },
            { id: 'mcp', labelJa: 'MCP サーバを追加', whyJa: '×: 外部ツール連携用。手順のまとめとは別物。' },
            { id: 'paste', labelJa: '毎回コピペする', whyJa: '×: まさにその手間を無くしたい。' },
          ],
        },
        invoke: {
          promptJa: 'どう用意する？',
          options: [
            { textJa: '.claude/skills/release/SKILL.md に手順を書く', correct: true, whyJa: '正解。Skill として定義すれば /release で呼べる。' },
            { textJa: 'settings.json の hooks に書く', whyJa: '×: それは Hook の設定でワークフロー定義ではない。' },
            { textJa: 'CLAUDE.md に手順を書く', whyJa: '△: 文脈には入るが、コマンドとして明示的に呼び出す用途には Skill が適切。' },
            { textJa: 'README.md に書く', whyJa: '×: 人間向けの説明であって Skill にはならない。' },
          ],
        },
        rewardJa: 'リリースは `/release` の一言に。手順の暗記から解放された。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't4-slash-commands',
    tier: 't4',
    order: 2,
    title: 'Slash Commands',
    titleJa: 'スラッシュコマンド',
    icon: '⌘',
    requires: ['t4-skills'],
    mapPos: { col: 2, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '`/` から始まるコマンドで機能を呼び出す。組み込みコマンド（/help, /clear, /compact など）に加え、自作の Skill も `/<名前>` として並ぶ。',
      blocks: [
        { type: 'lead', textJa: 'スラッシュは魔法の発動キー。`/` を打てば使える呪文が一覧に並ぶ。' },
        {
          type: 'list',
          titleJa: 'よく使う組み込み',
          items: [
            { term: '/help', descJa: 'コマンド一覧を表示。' },
            { term: '/clear', descJa: '会話をリセットする。' },
            { term: '/compact', descJa: '会話を要約して文脈を節約する。' },
            { term: '/permissions', descJa: '権限ルールを確認・編集する。' },
          ],
        },
        { type: 'kbd', keys: '/', descJa: '入力欄の先頭で打つと、使えるコマンドの一覧が出る。' },
        { type: 'tip', textJa: '自作 Skill も同じ一覧に `/<名前>` として現れる。組み込みと自作はシームレス。' },
      ],
      links: [{ labelJa: '公式: スラッシュコマンド', url: DOC }],
    },
    quiz: [
      {
        id: 't4-slash-commands-q1',
        type: 'mcq',
        promptJa: '今このセッションで使えるコマンドの一覧をすばやく見るには？',
        options: [
          { textJa: '入力欄の先頭で `/` を打つ', whyJa: '正解。使えるコマンドが一覧表示される。' },
          { textJa: 'Ctrl+B を押す', whyJa: '×: タスクのバックグラウンド化で無関係。' },
          { textJa: 'claude --commands を実行', whyJa: '×: そのようなフラグ運用ではない。' },
          { textJa: 'README を開く', whyJa: '×: コマンド一覧は `/` か /help で見る。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't4-slash-commands-q2',
        type: 'mcq',
        promptJa: '自作した Skill `review` はどう呼び出される？',
        options: [
          { textJa: '`/review` として他のコマンドと同じ一覧に並ぶ', whyJa: '正解。Skill はスラッシュコマンドとして現れる。' },
          { textJa: '組み込みコマンドとは全く別の専用メニューから', whyJa: '×: 同じ `/` 一覧に統合される。' },
          { textJa: '呼び出せず自動でのみ動く', whyJa: '×: 明示的に `/review` で呼べる。' },
          { textJa: 'API 経由でしか使えない', whyJa: '×: REPL からスラッシュで使える。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't4-slash-commands-case1',
        type: 'case',
        scenarioJa:
          '会話が長くなりトークンを圧迫してきた。これまでの要点は残したまま、文脈だけ軽くしたい。',
        tags: ['slash-commands', 'context'],
        feature: {
          promptJa: 'どのコマンドを使う？',
          options: [
            { id: 'compact', labelJa: '/compact', correct: true, whyJa: '会話を要約し、要点を保ったまま文脈を圧縮できる。これが最適。' },
            { id: 'clear', labelJa: '/clear', whyJa: '×: 全消去。要点まで失ってしまう。' },
            { id: 'help', labelJa: '/help', whyJa: '×: コマンド一覧表示で目的が違う。' },
            { id: 'restart', labelJa: 'セッション再起動', whyJa: '×: 文脈ごと失う。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '`/compact` と入力する', correct: true, whyJa: '正解。要約して文脈を節約する。' },
            { textJa: '`/clear` と入力する', whyJa: '×: 会話をリセットしてしまう。' },
            { textJa: 'Esc を 2 回押す', whyJa: '×: 過去メッセージの編集であって要約ではない。' },
            { textJa: 'Ctrl+C を押す', whyJa: '×: 中断であって文脈圧縮ではない。' },
          ],
        },
        rewardJa: '要点は手元に、荷物は軽く。会話は再び快適に進みだした。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't4-mcp',
    tier: 't4',
    order: 3,
    title: 'MCP Servers',
    titleJa: 'MCP サーバ',
    icon: '🔌',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 5,
    study: {
      summaryJa:
        'MCP（Model Context Protocol）サーバを追加すると、Claude が外部ツール（GitHub・Slack・データベースなど）を直接操作できるようになる。`claude mcp add <名前>` で追加する。',
      blocks: [
        { type: 'lead', textJa: '道具屋に新しい武器が並ぶように、MCP は Claude に「外の世界」とつながる手を与える。' },
        {
          type: 'list',
          titleJa: 'つなげられる例',
          items: [
            { term: 'GitHub', descJa: 'Issue や PR の読み書き。' },
            { term: 'Slack', descJa: 'メッセージの取得・投稿。' },
            { term: 'データベース', descJa: 'スキーマ参照やクエリ実行。' },
            { term: 'Google Drive 等', descJa: 'ドキュメントの参照。' },
          ],
        },
        {
          type: 'code',
          caption: 'GitHub の MCP サーバを追加',
          lang: 'bash',
          code: 'claude mcp add github',
        },
        { type: 'warn', textJa: '外部サービスへ接続するため、認証情報の扱いと権限範囲には注意する。' },
        { type: 'tip', textJa: '何でもかんでも追加せず、必要なツールだけを足すのがコツ。' },
      ],
      links: [{ labelJa: '公式: MCP', url: DOC }],
    },
    quiz: [
      {
        id: 't4-mcp-q1',
        type: 'mcq',
        promptJa: 'MCP サーバの役割を最もよく表すのは？',
        options: [
          { textJa: 'Claude を GitHub やデータベースなど外部ツールに接続する', whyJa: '正解。外部ツール連携の仕組みが MCP。' },
          { textJa: '会話を要約して文脈を節約する', whyJa: '×: それは /compact の役割。' },
          { textJa: 'ファイル編集を自動承認する', whyJa: '×: それは権限モードの話。' },
          { textJa: 'コマンドの実行を禁止する', whyJa: '×: それは権限の deny。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't4-mcp-q2',
        type: 'mcq',
        promptJa: 'GitHub 連携の MCP サーバを追加するコマンドは？',
        options: [
          { textJa: 'claude mcp add github', whyJa: '正解。MCP サーバを追加する。' },
          { textJa: 'npm install github', whyJa: '×: パッケージ導入であって MCP 追加ではない。' },
          { textJa: '/github を実行', whyJa: '×: そのような組み込みコマンドで追加はしない。' },
          { textJa: 'git remote add github', whyJa: '×: git のリモート設定で無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't4-mcp-case1',
        type: 'case',
        scenarioJa:
          'Claude に GitHub の Issue を読ませ、内容に応じて新しい Issue も作らせたい。',
        tags: ['mcp', 'integration'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            {
              id: 'mcp',
              labelJa: 'MCP サーバ（GitHub）を追加',
              correct: true,
              whyJa: 'Issue の読み書きなど外部サービス操作は MCP の役目。これが最適。',
            },
            { id: 'skill', labelJa: 'Skill を作る', whyJa: '×: Skill は手順のまとめ。外部 API への接続そのものは提供しない。' },
            { id: 'hook', labelJa: 'Hook を設定する', whyJa: '×: ローカルのイベント駆動自動化用。外部サービス連携には不向き。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に「GitHub を見て」と書く', whyJa: '×: 指示はできても接続手段が無ければ操作できない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'claude mcp add github で追加し、認証する', correct: true, whyJa: '正解。MCP サーバを追加して GitHub を操作可能にする。' },
            { textJa: 'settings.json の hooks に書く', whyJa: '×: Hook の設定で MCP 追加ではない。' },
            { textJa: '.claude/skills/github/SKILL.md を作る', whyJa: '×: Skill 定義であって外部接続は提供しない。' },
            { textJa: 'git clone github', whyJa: '×: 無関係なコマンド。' },
          ],
        },
        rewardJa: 'Claude は GitHub と握手した。Issue の海を自在に泳ぐ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't4-mcp-config',
    tier: 't4',
    order: 4,
    title: 'MCP Config & Sharing',
    titleJa: 'MCP の設定共有',
    icon: '🤝',
    requires: ['t4-mcp'],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'MCP サーバの設定を `.claude/settings.json` に書いて git にコミットすれば、チーム全員が同じ MCP を自動で使えるようになる。',
      blocks: [
        { type: 'lead', textJa: '自分だけ強くなっても道は遠い。仲間と装備を共有して、ギルド全体を強くしよう。' },
        {
          type: 'list',
          titleJa: '共有の考え方',
          items: [
            { term: '.claude/settings.json', descJa: 'チーム共有の設定（MCP・権限など）を書く場所。' },
            { term: 'git にコミット', descJa: 'リポジトリに入れれば全員に配布される。' },
            { term: 'settings.local.json', descJa: '個人だけの上書き（.gitignore 推奨）。' },
          ],
        },
        {
          type: 'code',
          caption: '.claude/settings.json（MCP 共有のイメージ）',
          lang: 'json',
          code: '{\n  "mcpServers": {\n    "github": { "command": "..." }\n  }\n}',
        },
        { type: 'warn', textJa: '秘密情報（トークン等）は settings.json に直書きせず、環境変数などで渡す。' },
      ],
      links: [{ labelJa: '公式: MCP の設定共有', url: DOC }],
    },
    quiz: [
      {
        id: 't4-mcp-config-q1',
        type: 'mcq',
        promptJa: 'チーム全員に同じ MCP サーバを自動で使わせたい。設定をどこに置く？',
        options: [
          { textJa: '.claude/settings.json にコミットする', whyJa: '正解。チーム共有設定として全員に配布される。' },
          { textJa: 'settings.local.json に書く', whyJa: '×: 個人用の上書きで、通常コミットしない。' },
          { textJa: '各自の ~/.bashrc に書く', whyJa: '×: 共有・再現性に乏しい。' },
          { textJa: '誰か 1 人のマシンにだけ追加する', whyJa: '×: 他のメンバーには配布されない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't4-mcp-config-q2',
        type: 'mcq',
        promptJa: '自分のマシンだけ設定を上書きしたい（チームには影響させない）。使うのは？',
        options: [
          { textJa: 'settings.local.json', whyJa: '正解。個人の上書き用で、通常は git 管理しない。' },
          { textJa: '.claude/settings.json を直接書き換える', whyJa: '×: チーム全員に影響してしまう。' },
          { textJa: 'CLAUDE.md', whyJa: '×: 指示の記述場所で設定の上書きではない。' },
          { textJa: 'package.json', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't4-mcp-config-case1',
        type: 'case',
        scenarioJa:
          '新しく入ったメンバーが、追加設定なしでチームと同じ GitHub MCP をすぐ使えるようにしたい。',
        tags: ['mcp', 'team'],
        feature: {
          promptJa: 'どう実現する？',
          options: [
            { id: 'commit', labelJa: '共有設定にコミットして配布', correct: true, whyJa: 'リポジトリの共有設定に入れれば、clone した全員が同じ MCP を得られる。' },
            { id: 'manual', labelJa: '各自に手順書を渡して手動設定させる', whyJa: '△: 動くが手間と設定ミスのもと。共有設定の方が確実。' },
            { id: 'local', labelJa: 'settings.local.json に書く', whyJa: '×: 個人用で配布されない。' },
            { id: 'dm', labelJa: '口頭で伝える', whyJa: '×: 再現性ゼロ。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '.claude/settings.json に MCP 設定を書いて git にコミット', correct: true, whyJa: '正解。チーム共有設定として全員に行き渡る。' },
            { textJa: 'settings.local.json に書いてコミット', whyJa: '×: そもそも個人用で、通常コミット対象にしない。' },
            { textJa: 'CLAUDE.md に MCP 設定を書く', whyJa: '×: 設定の置き場所ではない。' },
            { textJa: '各自 claude mcp add を毎回手で実行', whyJa: '△: 手動運用に逆戻り。共有設定が望ましい。' },
          ],
        },
        rewardJa: 'clone するだけで全員が同じ装備に。ギルドの足並みが揃った。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't4-plugins',
    tier: 't4',
    order: 5,
    title: 'Plugins',
    titleJa: 'Plugins（束ね）',
    icon: '🧩',
    requires: ['t4-skills'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'Plugins は、Skills・MCP・Hooks などをひとまとめにした既製パッケージ。`/plugins` から導入でき、一括で能力を増やせる。',
      blocks: [
        { type: 'lead', textJa: '巻物・武器・仕掛けを一袋に。Plugin は「装備一式」をまるごと手に入れる近道だ。' },
        {
          type: 'list',
          titleJa: 'Plugin に入りうるもの',
          items: [
            { term: 'Skills', descJa: '再利用ワークフロー。' },
            { term: 'MCP サーバ', descJa: '外部ツール連携。' },
            { term: 'Hooks', descJa: 'イベント駆動の自動化。' },
          ],
        },
        { type: 'kbd', keys: '/plugins', descJa: 'プラグインの一覧・導入・管理を行う。' },
        { type: 'tip', textJa: '個別に Skill や MCP を揃えるより、まとまった Plugin で一気に整えると速い。' },
      ],
      links: [{ labelJa: '公式: Plugins', url: DOC }],
    },
    quiz: [
      {
        id: 't4-plugins-q1',
        type: 'mcq',
        promptJa: 'Plugins を最もよく表すのは？',
        options: [
          { textJa: 'Skills・MCP・Hooks などを束ねた既製パッケージ', whyJa: '正解。複数の拡張をまとめて導入できる。' },
          { textJa: '権限を一括で拒否する設定', whyJa: '×: それは権限の deny。' },
          { textJa: '会話を要約する機能', whyJa: '×: それは /compact。' },
          { textJa: 'モデルを切り替える機能', whyJa: '×: 別機能。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't4-plugins-q2',
        type: 'mcq',
        promptJa: 'Plugin の導入・管理を行うコマンドは？',
        options: [
          { textJa: '/plugins', whyJa: '正解。一覧・導入・管理ができる。' },
          { textJa: 'npm install plugin', whyJa: '×: 一般の npm 導入ではない。' },
          { textJa: '/skills のみ', whyJa: '×: Skill 個別の話で Plugin 管理ではない。' },
          { textJa: 'git submodule add', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't4-plugins-case1',
        type: 'case',
        scenarioJa:
          'あるチームが公開している「レビュー用 Skill＋必要な MCP＋整形 Hook」のセットを、丸ごと自分の環境に入れたい。',
        tags: ['plugins', 'setup'],
        feature: {
          promptJa: 'どの手段が最適？',
          options: [
            {
              id: 'plugin',
              labelJa: 'Plugin として一括導入',
              correct: true,
              whyJa: '複数の拡張がまとまっているなら、Plugin でまるごと入れるのが最短・確実。',
            },
            { id: 'each', labelJa: 'Skill・MCP・Hook を 1 つずつ手で設定', whyJa: '△: できるが手間と抜け漏れのもと。束ねられているなら Plugin が良い。' },
            { id: 'copy', labelJa: '設定を全部コピペする', whyJa: '×: 非効率でミスしやすい。' },
            { id: 'nothing', labelJa: '諦めて手作業を続ける', whyJa: '×: 既製の束ねがあるのに使わない手はない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '/plugins から該当 Plugin を導入する', correct: true, whyJa: '正解。Plugin を入れれば Skill・MCP・Hook が一括で揃う。' },
            { textJa: '.claude/skills/ に手で SKILL.md を並べる', whyJa: '△: Skill 単体ならともかく、束ね導入には /plugins が適切。' },
            { textJa: 'settings.json に Hook だけ書く', whyJa: '×: セットの一部しか入らない。' },
            { textJa: 'claude mcp add だけ実行', whyJa: '×: MCP しか入らず Skill/Hook が漏れる。' },
          ],
        },
        rewardJa: '装備一式が一度に揃った。準備運動は終わり、本番へ進める。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
