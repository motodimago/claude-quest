import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 2: Memory（記憶 — 知恵の書庫）=====
export const TIER2: Topic[] = [
  {
    id: 't2-claude-md',
    tier: 't2',
    order: 1,
    title: 'CLAUDE.md',
    titleJa: 'CLAUDE.md（プロジェクト記憶）',
    icon: '📜',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'CLAUDE.md は、プロジェクト固有の指示を書いておく「記憶の書」。ルートに置けば、起動のたびに自動で読み込まれ文脈になる。',
      blocks: [
        { type: 'lead', textJa: '相棒に同じ説明を毎回するのは疲れる。書庫に記しておけば、二度と忘れない。' },
        {
          type: 'list',
          titleJa: 'よく書く内容',
          items: [
            { term: 'コーディング規約', descJa: 'インデントや命名、使用ライブラリの方針。' },
            { term: 'よく使うコマンド', descJa: 'ビルド・テスト・lint の手順。' },
            { term: 'アーキテクチャ', descJa: '主要ディレクトリの役割や設計の前提。' },
          ],
        },
        {
          type: 'code',
          caption: 'プロジェクトルートの ./CLAUDE.md',
          lang: 'markdown',
          code: '# 開発メモ\n- インデントは2スペース\n- テストは `npm test`\n- API は src/api/ に置く',
        },
        { type: 'tip', textJa: '`/init` を使うと、既存コードを調べて CLAUDE.md の雛形を自動生成できる。' },
        { type: 'warn', textJa: '長すぎる CLAUDE.md は毎回トークンを消費する。要点を簡潔に。' },
      ],
      links: [{ labelJa: '公式: メモリ（CLAUDE.md）', url: DOC }],
    },
    quiz: [
      {
        id: 't2-claude-md-q1',
        type: 'mcq',
        promptJa: 'チームのコーディング規約を、毎回説明せず Claude に常に守らせたい。どこに書く？',
        options: [
          { textJa: 'プロジェクトルートの CLAUDE.md', whyJa: '正解。起動のたびに自動で読み込まれる記憶になる。' },
          { textJa: '毎回チャットの冒頭に貼る', whyJa: '△: 動くが手間で忘れやすい。記憶に残らない。' },
          { textJa: 'README.md にだけ書く', whyJa: '×: README は人間向け。自動で指示として読まれる保証はない。' },
          { textJa: '.gitignore に書く', whyJa: '×: 無視ファイルの指定であり指示の置き場ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't2-claude-md-q2',
        type: 'mcq',
        promptJa: '既存プロジェクトの CLAUDE.md 雛形をすばやく作るには？',
        options: [
          { textJa: '/init でコードを調べて自動生成', whyJa: '正解。既存構成を解析して雛形を作る。' },
          { textJa: '/compact を実行', whyJa: '×: 会話の要約であり CLAUDE.md 生成ではない。' },
          { textJa: '/clear を実行', whyJa: '×: 会話のリセット。無関係。' },
          { textJa: '手で1から書くしかない', whyJa: '×: /init で土台を作れる。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't2-claude-md-q3',
        type: 'mcq',
        promptJa: 'CLAUDE.md を肥大化させると起きる問題は？',
        options: [
          { textJa: '毎回読み込まれ、トークン消費が増える', whyJa: '正解。常時読まれるため簡潔さが大切。' },
          { textJa: 'git にコミットできなくなる', whyJa: '×: そのような制限は無い。' },
          { textJa: 'Claude が起動しなくなる', whyJa: '×: 起動はする。' },
          { textJa: '自動的に削除される', whyJa: '×: 勝手に消えはしない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't2-claude-md-case1',
        type: 'case',
        scenarioJa:
          'チーム全員が「テストは npm test、インデントは2スペース」を Claude に守らせたい。リポジトリで共有したい。',
        tags: ['claude-md', 'memory'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            {
              id: 'claudemd',
              labelJa: 'プロジェクトの CLAUDE.md',
              correct: true,
              whyJa: 'リポジトリにコミットすれば全員が同じ記憶を共有でき、自動で読み込まれる。',
            },
            { id: 'local', labelJa: '各自の頭の中で覚える', whyJa: '×: 共有されず属人的。Claude も知らない。' },
            { id: 'chat', labelJa: '毎回チャットで伝える', whyJa: '×: 手間で忘れる。共有もされない。' },
            { id: 'env', labelJa: '.env に書く', whyJa: '×: 環境変数用で指示の置き場ではない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'ルートに ./CLAUDE.md を作り git にコミット', correct: true, whyJa: '正解。共有され自動で読まれる。' },
            { textJa: '~/.claude にだけ書く', whyJa: '×: それは自分専用。チームには共有されない。' },
            { textJa: 'settings.local.json に書く', whyJa: '×: 個人用かつ指示の置き場ではない。' },
            { textJa: 'コミットせず手元だけに置く', whyJa: '×: 他のメンバーに届かない。' },
          ],
        },
        rewardJa: '規約は書庫に刻まれ、全員の相棒が同じ流儀で動き出した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't2-scope-hierarchy',
    tier: 't2',
    order: 2,
    title: 'CLAUDE.md Scope',
    titleJa: 'スコープ階層',
    icon: '🏛️',
    requires: ['t2-claude-md'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        '指示は複数の階層に置ける。managed（組織）→ user（~/.claude）→ project（./CLAUDE.md）→ local の順で重なり、より具体的なものが効く。',
      blocks: [
        { type: 'lead', textJa: '書庫は一つではない。組織の掟、個人の流儀、プロジェクトの作法――層になって君を支える。' },
        {
          type: 'list',
          titleJa: '主なスコープ（広い→狭い）',
          items: [
            { term: 'managed（組織）', descJa: '管理者が全社へ配る指示。最も広い。' },
            { term: 'user（~/.claude）', descJa: '自分のすべてのプロジェクト共通の好み。' },
            { term: 'project（./CLAUDE.md）', descJa: 'そのプロジェクト固有。チームで共有。' },
            { term: 'local', descJa: '自分のそのプロジェクトだけの上書き（共有しない）。' },
          ],
        },
        { type: 'tip', textJa: '個人的な好みは user スコープ、チーム共通は project スコープに置くと整理しやすい。' },
        { type: 'warn', textJa: '同じ事柄が複数階層にあると、より具体的（狭い）スコープが優先される点に注意。' },
      ],
      links: [{ labelJa: '公式: メモリのスコープ', url: DOC }],
    },
    quiz: [
      {
        id: 't2-scope-hierarchy-q1',
        type: 'mcq',
        promptJa: '「自分の全プロジェクト共通の好み」を置くのに最適なスコープは？',
        options: [
          { textJa: 'user スコープ（~/.claude）', whyJa: '正解。自分の全プロジェクトに効く。' },
          { textJa: 'project スコープ（./CLAUDE.md）', whyJa: '×: そのプロジェクト限定になる。' },
          { textJa: 'managed スコープ', whyJa: '×: 組織管理者が配る層。個人の好み向けではない。' },
          { textJa: 'どこでも同じ', whyJa: '×: スコープごとに効く範囲が違う。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't2-scope-hierarchy-q2',
        type: 'mcq',
        promptJa: '組織が全社員に強制したい方針を配るスコープは？',
        options: [
          { textJa: 'managed（組織）スコープ', whyJa: '正解。管理者が全社へ配る最上位の層。' },
          { textJa: 'local スコープ', whyJa: '×: 個人のそのプロジェクト限定で共有されない。' },
          { textJa: 'user スコープ', whyJa: '×: その人個人の設定であり全社配布ではない。' },
          { textJa: 'README.md', whyJa: '×: 指示スコープではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't2-scope-hierarchy-case1',
        type: 'case',
        scenarioJa:
          'あなたは「コミットメッセージは英語で」を全プロジェクトで個人的に徹底したい。でもチームには押し付けたくない。',
        tags: ['scope', 'memory'],
        feature: {
          promptJa: 'どのスコープに書く？',
          options: [
            { id: 'user', labelJa: 'user スコープ（~/.claude）', correct: true, whyJa: '自分の全プロジェクトに効き、チームの共有設定は汚さない。' },
            { id: 'project', labelJa: 'project の ./CLAUDE.md', whyJa: '×: コミットすればチーム全員に強制してしまう。' },
            { id: 'managed', labelJa: 'managed スコープ', whyJa: '×: 組織全体への配布。個人の好みには過剰。' },
            { id: 'none', labelJa: 'どこにも書かず毎回意識する', whyJa: '×: 徹底できず属人的。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '~/.claude 配下のユーザー CLAUDE.md に書く', correct: true, whyJa: '正解。自分の全プロジェクト共通の好みになる。' },
            { textJa: 'プロジェクトの ./CLAUDE.md に書いてコミット', whyJa: '×: チームに共有・強制されてしまう。' },
            { textJa: '.gitignore に書く', whyJa: '×: 無視設定であり指示ではない。' },
            { textJa: 'managed-settings に書く', whyJa: '×: 組織配布用で個人向けではない。' },
          ],
        },
        rewardJa: '個人の流儀は自分の書庫へ。チームの掟は汚さず、ひそかに徹底された。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't2-path-scoped',
    tier: 't2',
    order: 3,
    title: 'Path-Scoped Rules',
    titleJa: 'パス別ルール（ネストCLAUDE.md）',
    icon: '🧭',
    requires: ['t2-claude-md'],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'サブディレクトリに置いた CLAUDE.md は、その配下を触るときに文脈として効く。frontend と backend で違う作法を持たせられる。',
      blocks: [
        { type: 'lead', textJa: '城の区画ごとに掟が違う。台所の作法を兵舎に持ち込む必要はない。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: 'frontend/CLAUDE.md', descJa: 'UI 側の規約（コンポーネント命名やスタイル）。' },
            { term: 'backend/CLAUDE.md', descJa: 'API 側の規約（エラー処理や DB 方針）。' },
            { term: '上位の ./CLAUDE.md', descJa: '全体共通。各ディレクトリの指示と重ねて効く。' },
          ],
        },
        {
          type: 'code',
          caption: '配置イメージ',
          lang: 'text',
          code: 'CLAUDE.md            # 全体共通\nfrontend/CLAUDE.md   # UI 用\nbackend/CLAUDE.md    # API 用',
        },
        { type: 'tip', textJa: 'モノレポで領域ごとに作法が違うときに特に有効。' },
      ],
      links: [{ labelJa: '公式: パス別の指示', url: DOC }],
    },
    quiz: [
      {
        id: 't2-path-scoped-q1',
        type: 'mcq',
        promptJa: 'frontend と backend で異なるコーディング規約を、領域ごとに自動で効かせたい。最適なのは？',
        options: [
          { textJa: '各ディレクトリに CLAUDE.md を置く', whyJa: '正解。配下を触るときその指示が文脈になる。' },
          { textJa: 'ルートの CLAUDE.md に両方の規約を全部書く', whyJa: '△: 動くが混在して読みにくく、領域の切り分けが弱い。' },
          { textJa: '毎回どちらの規約か口頭で伝える', whyJa: '×: 手間で忘れやすい。' },
          { textJa: 'settings.json に書く', whyJa: '×: 規約テキストの置き場ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't2-path-scoped-q2',
        type: 'mcq',
        promptJa: 'サブディレクトリの CLAUDE.md と上位の CLAUDE.md の関係は？',
        options: [
          { textJa: '重なって効く（両方が文脈になる）', whyJa: '正解。全体共通＋領域固有が重なる。' },
          { textJa: 'サブの存在で上位は完全に無効化される', whyJa: '×: 上位も引き続き効く。' },
          { textJa: 'サブの CLAUDE.md は読まれない', whyJa: '×: その配下を触るときに読まれる。' },
          { textJa: 'どちらか一方しか置けない', whyJa: '×: 複数階層に置ける。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't2-path-scoped-case1',
        type: 'case',
        scenarioJa:
          'モノレポで、UI 側は「styled-components を使う」、API 側は「例外より Result 型」を徹底させたい。領域ごとに自動適用したい。',
        tags: ['path-scoped', 'memory'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'nested', labelJa: '各領域にネストした CLAUDE.md を置く', correct: true, whyJa: '配下を触るときだけその規約が効き、領域を取り違えない。' },
            { id: 'root', labelJa: 'ルートに全部まとめて書く', whyJa: '△: 効くが混在し、誤適用や肥大化を招く。' },
            { id: 'hooks', labelJa: 'Hooks で強制', whyJa: '×: Hooks はイベント駆動の自動実行で、文脈的な規約共有とは別。' },
            { id: 'manual', labelJa: '毎回指示する', whyJa: '×: 自動化されず属人的。' },
          ],
        },
        invoke: {
          promptJa: '具体的な配置は？',
          options: [
            { textJa: 'frontend/CLAUDE.md と backend/CLAUDE.md を作る', correct: true, whyJa: '正解。領域ごとに作法を分けて自動適用できる。' },
            { textJa: 'CLAUDE.md を1つだけルートに置く', whyJa: '×: 領域別の自動切り分けにならない。' },
            { textJa: 'frontend.json / backend.json を作る', whyJa: '×: 指示は CLAUDE.md。JSON 設定とは別物。' },
            { textJa: '~/.claude に両方書く', whyJa: '×: 個人の全プロジェクト共通になり領域別にならない。' },
          ],
        },
        rewardJa: 'UI 区画と API 区画、それぞれの掟が自動で効く。モノレポが整然と動き出した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't2-auto-memory',
    tier: 't2',
    order: 4,
    title: 'Auto Memory',
    titleJa: '自動メモリ',
    icon: '🧠',
    requires: ['t2-scope-hierarchy'],
    mapPos: { col: 3, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Claude は学んだ事実を ~/.claude/projects/<project>/memory/ に1ファイル1事実で保存し、MEMORY.md を索引として参照する。',
      blocks: [
        { type: 'lead', textJa: '相棒は冒険の中で得た知見を、自分の手帳に書き留めていく。次の旅で活きる記憶だ。' },
        {
          type: 'list',
          titleJa: '仕組み',
          items: [
            { term: 'memory/ ディレクトリ', descJa: '~/.claude/projects/<project>/memory/ に保存。' },
            { term: '1ファイル1事実', descJa: '事実ごとにファイルを分け、frontmatter で種類を持つ。' },
            { term: 'MEMORY.md', descJa: '全メモリの索引。セッション開始時に読み込まれる。' },
          ],
        },
        { type: 'tip', textJa: 'ユーザーの好み・プロジェクトの制約など「コードからは分からない事実」を残すのに向く。' },
        { type: 'warn', textJa: 'コードや git 履歴で分かることは重複保存しない。古くなった記憶は更新・削除する。' },
      ],
      links: [{ labelJa: '公式: 自動メモリ', url: DOC }],
    },
    quiz: [
      {
        id: 't2-auto-memory-q1',
        type: 'mcq',
        promptJa: '自動メモリの索引として、セッション開始時に読み込まれるファイルは？',
        options: [
          { textJa: 'MEMORY.md', whyJa: '正解。全メモリの索引として読み込まれる。' },
          { textJa: 'README.md', whyJa: '×: 人間向けのプロジェクト説明。' },
          { textJa: 'settings.json', whyJa: '×: 設定ファイルで記憶索引ではない。' },
          { textJa: 'INDEX.txt', whyJa: '×: そのような規定ファイルは無い。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't2-auto-memory-q2',
        type: 'mcq',
        promptJa: '自動メモリに保存する価値が高いのは？',
        options: [
          { textJa: 'コードからは分からない、ユーザーの好みやプロジェクト制約', whyJa: '正解。非自明な事実こそ記憶の価値が高い。' },
          { textJa: '関数のシグネチャ（コードを見れば分かる）', whyJa: '×: コードで分かることは重複保存しない。' },
          { textJa: '直近の git コミット内容', whyJa: '×: git 履歴で確認できる。' },
          { textJa: 'その場限りの会話のメモ', whyJa: '×: 永続化する価値が低い。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't2-auto-memory-case1',
        type: 'case',
        scenarioJa:
          '「このプロジェクトでは外部 API のレート制限が厳しい」という、コードに書かれていない重要な事実を、次回以降も Claude に覚えていてほしい。',
        tags: ['auto-memory', 'memory'],
        feature: {
          promptJa: 'どこに残すのが適切？',
          options: [
            { id: 'memory', labelJa: '自動メモリ（memory/）に保存', correct: true, whyJa: 'コードから読み取れない事実を、次セッション以降も参照できる形で残せる。' },
            { id: 'comment', labelJa: 'ソースのコメントに書くだけ', whyJa: '△: 残るが、該当ファイルを開かない限り想起されにくい。' },
            { id: 'chat', labelJa: '今の会話で伝えるだけ', whyJa: '×: セッションが終われば失われる。' },
            { id: 'permissions', labelJa: '権限ルールに書く', whyJa: '×: 権限は実行可否の制御で、事実の記憶ではない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'memory/ に1事実1ファイルで保存し MEMORY.md に索引を追加', correct: true, whyJa: '正解。索引経由で次回も想起される。' },
            { textJa: 'settings.json に書く', whyJa: '×: 設定の置き場で記憶ではない。' },
            { textJa: '.env に書く', whyJa: '×: 環境変数で事実の記憶ではない。' },
            { textJa: 'コミットメッセージに書く', whyJa: '×: 履歴に埋もれ索引化されない。' },
          ],
        },
        rewardJa: 'レート制限の知見は手帳に刻まれた。次の旅でも相棒は無謀を避ける。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't2-memory-command',
    tier: 't2',
    order: 5,
    title: '/memory',
    titleJa: '/memory コマンド',
    icon: '🔖',
    requires: ['t2-claude-md'],
    mapPos: { col: 1, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '/memory は、読み込まれている CLAUDE.md や自動メモリの中身を一覧・編集するためのコマンド。記憶の棚卸しに使う。',
      blocks: [
        { type: 'lead', textJa: '書庫の中身を確かめたいとき、扉を開く呪文が /memory だ。' },
        {
          type: 'list',
          titleJa: 'できること',
          items: [
            { term: '一覧表示', descJa: '今どの CLAUDE.md / メモリが効いているか確認する。' },
            { term: '編集', descJa: '内容をその場で見直し・修正する。' },
            { term: '棚卸し', descJa: '古い記憶や矛盾を見つけて整理する。' },
          ],
        },
        { type: 'kbd', keys: '/memory', descJa: '記憶ファイルの一覧・編集を開く。' },
        { type: 'tip', textJa: '「なぜか変な前提で動く」ときは /memory で効いている指示を疑うとよい。' },
      ],
      links: [{ labelJa: '公式: /memory', url: DOC }],
    },
    quiz: [
      {
        id: 't2-memory-command-q1',
        type: 'mcq',
        promptJa: '今どの CLAUDE.md やメモリが読み込まれているか確認・編集するコマンドは？',
        options: [
          { textJa: '/memory', whyJa: '正解。記憶ファイルの一覧・編集ができる。' },
          { textJa: '/context', whyJa: '△: トークンの内訳確認で、記憶ファイルの編集が主目的ではない。' },
          { textJa: '/clear', whyJa: '×: 会話のリセット。' },
          { textJa: '/help', whyJa: '×: コマンド一覧であり記憶の確認ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't2-memory-command-q2',
        type: 'mcq',
        promptJa: 'Claude が「なぜか古い前提」で動くとき、まず疑うべきは？',
        options: [
          { textJa: '/memory で効いている指示を確認する', whyJa: '正解。古い CLAUDE.md / メモリが原因のことが多い。' },
          { textJa: 'すぐ再インストールする', whyJa: '×: 過剰。原因は記憶の可能性が高い。' },
          { textJa: 'ターミナルを変える', whyJa: '×: 無関係。' },
          { textJa: '何もできない', whyJa: '×: /memory で棚卸しできる。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't2-memory-command-case1',
        type: 'case',
        scenarioJa:
          'Claude がもう使っていない古いライブラリを前提に提案してくる。原因を突き止めて直したい。',
        tags: ['memory-command', 'debug'],
        feature: {
          promptJa: 'まず何をする？',
          options: [
            { id: 'memory', labelJa: '/memory で効いている記憶を点検する', correct: true, whyJa: '古い CLAUDE.md / メモリが残っていないかを確認・編集できる。' },
            { id: 'reinstall', labelJa: '再インストールする', whyJa: '×: 原因が記憶なら解決しない。過剰。' },
            { id: 'ignore', labelJa: '毎回手で訂正する', whyJa: '×: 根本原因が残り続ける。' },
            { id: 'newproject', labelJa: '別プロジェクトを作る', whyJa: '×: 大げさで本質的でない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '/memory を開き、古い記述を見つけて更新・削除する', correct: true, whyJa: '正解。古い前提を取り除けば提案が正される。' },
            { textJa: '/compact する', whyJa: '×: 会話の要約で記憶ファイルの修正ではない。' },
            { textJa: 'settings.json を消す', whyJa: '×: 設定であり記憶の修正ではない。' },
            { textJa: 'Esc を連打する', whyJa: '×: 中断であって原因解決にならない。' },
          ],
        },
        rewardJa: '古びた記憶を書き換えた。相棒は最新の前提で語り始めた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
