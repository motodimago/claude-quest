import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 13: Team & Sharing（冒険者ギルド）=====
export const TIER13: Topic[] = [
  {
    id: 't13-shared-settings',
    tier: 't13',
    order: 1,
    title: 'Shared Settings',
    titleJa: '設定の共有',
    icon: '📂',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'チーム共通の設定は `.claude/settings.json` をリポジトリにコミットして共有する。個人差を埋め、全員が同じルール・MCP・Hooks で動ける。',
      blocks: [
        { type: 'lead', textJa: 'ギルドの掟は全員で共有する。設定もまた、コミットして仲間に配るのだ。' },
        {
          type: 'list',
          titleJa: '設定ファイルの住み分け',
          items: [
            { term: '.claude/settings.json', descJa: 'チーム共有。コミットして全員に配布する。' },
            { term: '.claude/settings.local.json', descJa: '個人専用。gitignore され共有されない。' },
            { term: '~/.claude/settings.json', descJa: 'ユーザー全体の個人設定。' },
          ],
        },
        {
          type: 'code',
          caption: '共有 settings.json（権限・モデル等）',
          lang: 'json',
          code: '{\n  "permissions": {\n    "allow": ["Bash(npm run test:*)"]\n  },\n  "model": "claude-sonnet-4-6"\n}',
        },
        { type: 'tip', textJa: '個人の好みや秘密は settings.local.json へ。共有用にはチーム全員に効く設定だけを置く。' },
        { type: 'warn', textJa: 'API キーなどの秘密情報を共有 settings.json に直接書かない。環境変数を使う。' },
      ],
      links: [{ labelJa: '公式: 設定の共有', url: DOC }],
    },
    quiz: [
      {
        id: 't13-shared-settings-q1',
        type: 'mcq',
        promptJa: 'チーム全員に同じ権限ルールや MCP を効かせたい。どこに書く？',
        options: [
          { textJa: '.claude/settings.json をコミットする', whyJa: '正解。共有設定としてリポジトリに含まれ全員に配られる。' },
          { textJa: '.claude/settings.local.json', whyJa: '×: gitignore され個人専用。共有されない。' },
          { textJa: '~/.claude/settings.json', whyJa: '×: 自分のマシンだけの個人設定。' },
          { textJa: 'README に文章で書く', whyJa: '×: 設定として効かない。ただのメモ。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't13-shared-settings-q2',
        type: 'mcq',
        promptJa: '自分だけの好みの設定を、チームに影響させずに持ちたい。使うファイルは？',
        options: [
          { textJa: '.claude/settings.local.json', whyJa: '正解。gitignore される個人専用の上書き。' },
          { textJa: '.claude/settings.json', whyJa: '×: コミットすると全員に影響する。' },
          { textJa: 'managed-settings.json', whyJa: '×: 組織管理者が配る強制設定。個人用ではない。' },
          { textJa: '.env だけ', whyJa: '×: 環境変数用で設定全般の置き場ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't13-shared-settings-case1',
        type: 'case',
        scenarioJa:
          '新メンバーが参加するたびに権限や許可コマンドの設定がバラバラで困っている。全員の足並みを揃えたい。',
        tags: ['team', 'settings'],
        feature: {
          promptJa: 'どうやって揃える？',
          options: [
            {
              id: 'shared',
              labelJa: '共有設定をリポジトリにコミットする',
              correct: true,
              whyJa: 'clone するだけで全員に同じ設定が適用され、足並みが揃う。これが最適。',
            },
            { id: 'local', labelJa: '各自に settings.local.json を作らせる', whyJa: '×: 個人専用で共有されず、結局バラバラのまま。' },
            { id: 'verbal', labelJa: '口頭・チャットで設定手順を伝える', whyJa: '△: 伝わるが手作業で抜け漏れが起きる。自動共有が確実。' },
            { id: 'managed', labelJa: '全員の ~/.claude を手で編集する', whyJa: '×: 非現実的でメンテ不能。' },
          ],
        },
        invoke: {
          promptJa: 'どのファイルをコミットする？',
          options: [
            { textJa: '.claude/settings.json', correct: true, whyJa: '正解。共有設定としてリポジトリに含める。' },
            { textJa: '.claude/settings.local.json', whyJa: '×: gitignore され共有されない。' },
            { textJa: '~/.claude/settings.json', whyJa: '×: 個人のホーム配下でリポジトリ外。' },
            { textJa: '.gitignore', whyJa: '×: 無視リストであって設定ではない。' },
          ],
        },
        rewardJa: '新メンバーも clone した瞬間に同じ装備。ギルドの足並みが揃った。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't13-shared-skills',
    tier: 't13',
    order: 2,
    title: 'Shared Skills',
    titleJa: 'Skillの共有',
    icon: '🛠️',
    requires: ['t13-shared-settings'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        '`.claude/skills/` をコミットすると、チーム全員が同じ Skill（/review や /deploy など）を呼べるようになる。手順がコマンド一発で再現できる。',
      blocks: [
        { type: 'lead', textJa: '秘伝の技は巻物にして共有する。Skill をコミットすれば、誰もが同じ一手を放てる。' },
        {
          type: 'list',
          titleJa: '共有の流れ',
          items: [
            { term: '.claude/skills/<name>/SKILL.md', descJa: 'Skill の定義。ここに手順を書く。' },
            { term: 'git commit', descJa: 'リポジトリに含めてチームへ配布。' },
            { term: '/<name>', descJa: '全員が同じスラッシュコマンドで呼べる。' },
          ],
        },
        {
          type: 'code',
          caption: '共有 Skill の置き場所',
          lang: 'text',
          code: '.claude/skills/deploy/SKILL.md   → /deploy として全員が利用',
        },
        { type: 'tip', textJa: 'レビュー・デプロイ・リリース手順など、属人化しがちな作業ほど Skill 化の効果が大きい。' },
      ],
      links: [{ labelJa: '公式: Skills の共有', url: DOC }],
    },
    quiz: [
      {
        id: 't13-shared-skills-q1',
        type: 'mcq',
        promptJa: 'チーム全員が同じ /deploy コマンドを使えるようにするには？',
        options: [
          { textJa: '.claude/skills/deploy/SKILL.md をコミットする', whyJa: '正解。共有 Skill として全員が /deploy を呼べる。' },
          { textJa: '各自に手順を口頭で教える', whyJa: '×: 再現性がなく属人化する。' },
          { textJa: 'settings.local.json に書く', whyJa: '×: 個人設定で Skill の定義場所でもない。' },
          { textJa: 'CLAUDE.md に手順を書くだけ', whyJa: '△: 指示にはなるがコマンド化された再現実行にはならない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't13-shared-skills-q2',
        type: 'mcq',
        promptJa: '共有 Skill を置くディレクトリは？',
        options: [
          { textJa: '.claude/skills/', whyJa: '正解。ここに置いた Skill が共有される。' },
          { textJa: '.github/skills/', whyJa: '×: Claude Code の Skill 置き場ではない。' },
          { textJa: 'node_modules/', whyJa: '×: 依存パッケージ用。' },
          { textJa: 'src/skills/', whyJa: '×: 規定の Skill ディレクトリではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't13-shared-skills-case1',
        type: 'case',
        scenarioJa:
          'リリース手順がベテラン1人の頭の中にしかなく、その人が休むと誰もリリースできない。属人化を解消したい。',
        tags: ['team', 'skills'],
        feature: {
          promptJa: 'どう解決する？',
          options: [
            {
              id: 'skill',
              labelJa: '手順を Skill 化して共有する',
              correct: true,
              whyJa: '手順をコマンド一発に固め、コミットすれば誰でも同じリリースを再現できる。',
            },
            { id: 'doc', labelJa: '長い手順書を書く', whyJa: '△: 読めば分かるが実行は手作業で、抜け漏れが残る。' },
            { id: 'mcp', labelJa: 'MCP サーバを追加する', whyJa: '×: 外部ツール連携用で、社内手順の再現には過剰・別目的。' },
            { id: 'hook', labelJa: 'Hooks を仕込む', whyJa: '×: イベント自動実行用。任意手順の共有コマンド化には不向き。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '.claude/skills/release/SKILL.md を作りコミット', correct: true, whyJa: '正解。/release として全員が同じ手順を実行できる。' },
            { textJa: 'settings.json に手順を書く', whyJa: '×: 設定ファイルは手順スクリプトの置き場ではない。' },
            { textJa: 'README にだけ書く', whyJa: '×: 実行可能なコマンドにならない。' },
            { textJa: '~/.claude/skills に各自で作る', whyJa: '×: 個人ごとでバラつき、共有にならない。' },
          ],
        },
        rewardJa: 'リリースは /release の一声で誰でも実行可能に。属人化が消えた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't13-code-review',
    tier: 't13',
    order: 3,
    title: 'Code Review Integration',
    titleJa: 'コードレビュー連携',
    icon: '🔍',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        '`/review` を使うと、変更内容をレビューし PR に詳細なコメントを残せる。人手のレビューを補い、指摘の取りこぼしを減らす。',
      blocks: [
        { type: 'lead', textJa: '仲間のコードを鋭くチェックする目利き役。それが /review だ。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: '/review', descJa: '現在の差分や PR をレビューし指摘を出す。' },
            { term: 'PR コメント', descJa: '指摘をプルリクにインラインで投稿できる。' },
            { term: 'CI 連携', descJa: 'GitHub Actions と組み合わせて自動レビューにも。' },
          ],
        },
        { type: 'tip', textJa: 'まず /review で自己レビューしてから人にお願いすると、レビュー往復が減る。' },
      ],
      links: [{ labelJa: '公式: コードレビュー', url: DOC }],
    },
    quiz: [
      {
        id: 't13-code-review-q1',
        type: 'mcq',
        promptJa: '変更をレビューして PR に指摘コメントを残すコマンドは？',
        options: [
          { textJa: '/review', whyJa: '正解。レビューして指摘を出し、PR にコメントできる。' },
          { textJa: '/commit', whyJa: '×: コミット用で別物。' },
          { textJa: '/debug', whyJa: '×: 詳細ログ出力でレビューではない。' },
          { textJa: '/clear', whyJa: '×: 会話リセット。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't13-code-review-q2',
        type: 'mcq',
        promptJa: '/review の使い方として最も効果的なのは？',
        options: [
          { textJa: '人にレビュー依頼する前に自己レビューに使う', whyJa: '正解。先に指摘を潰せばレビュー往復が減る。' },
          { textJa: 'コードを書かずに /review だけ回す', whyJa: '×: レビュー対象の変更が要る。' },
          { textJa: 'マージ後に初めて使う', whyJa: '△: 使えるが、マージ前に使う方が手戻りを防げる。' },
          { textJa: 'テストの代わりにする', whyJa: '×: レビューはテストの代替ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't13-code-review-case1',
        type: 'case',
        scenarioJa:
          'レビュー待ちの PR が滞留し、レビュアーの負担が大きい。指摘の一次振り分けを自動化して負担を減らしたい。',
        tags: ['team', 'review'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            {
              id: 'review',
              labelJa: 'コードレビュー連携で自動レビュー',
              correct: true,
              whyJa: '機械的な指摘を先に拾わせれば、人は重要な判断に集中でき負担が減る。',
            },
            { id: 'skill-only', labelJa: 'デプロイ Skill を作る', whyJa: '×: デプロイはレビュー滞留の解決にならない。' },
            { id: 'ignore', labelJa: 'レビューを省略する', whyJa: '×: 品質リスクが上がる。解決ではない。' },
            { id: 'mcp', labelJa: '無関係な MCP を追加', whyJa: '×: 目的に合わない。' },
          ],
        },
        invoke: {
          promptJa: 'どう仕込む？',
          options: [
            { textJa: '/review を CI（GitHub Actions）で PR に走らせる', correct: true, whyJa: '正解。PR ごとに自動でレビュー指摘を投稿できる。' },
            { textJa: '/clear を CI で実行', whyJa: '×: 会話リセットでレビューにならない。' },
            { textJa: 'settings.local.json に書く', whyJa: '×: 個人設定で CI 連携の仕組みではない。' },
            { textJa: '手作業で毎回 /review', whyJa: '△: 効果はあるが自動化の要件を満たさない。' },
          ],
        },
        rewardJa: '一次レビューは自動化。レビュアーは本質的な判断に集中できるようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't13-remote-control',
    tier: 't13',
    order: 4,
    title: 'Remote Control',
    titleJa: 'リモート操作',
    icon: '📱',
    requires: ['t13-shared-settings'],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        'セッションはデスクトップ・スマホ・ブラウザ間でアクセスできる。外出先で確認し、戻ってターミナルで続きを進められる。',
      blocks: [
        { type: 'lead', textJa: '冒険は場所を選ばない。手元の端末を変えても、旅は途切れない。' },
        {
          type: 'list',
          titleJa: '行き来できる場所',
          items: [
            { term: 'デスクトップ', descJa: 'メインの作業環境。' },
            { term: 'スマホ/ブラウザ', descJa: '外出先で進捗確認や軽い指示。' },
            { term: 'ターミナル', descJa: '腰を据えた実装はここへ戻して続行。' },
          ],
        },
        { type: 'tip', textJa: '移動中はスマホで状況を見て、席に着いたらターミナルで本格作業、と使い分けると無駄がない。' },
      ],
      links: [{ labelJa: '公式: リモート操作', url: DOC }],
    },
    quiz: [
      {
        id: 't13-remote-control-q1',
        type: 'mcq',
        promptJa: 'リモート操作で正しいのは？',
        options: [
          { textJa: 'デスクトップ・スマホ・ブラウザ間でセッションにアクセスできる', whyJa: '正解。端末をまたいで作業を引き継げる。' },
          { textJa: 'ターミナルでしか使えない', whyJa: '×: 複数の入口がある。' },
          { textJa: 'セッションは端末ごとに完全に別物', whyJa: '×: 同じセッションにアクセスできる。' },
          { textJa: 'スマホでは閲覧すら不可', whyJa: '×: スマホからもアクセスできる。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't13-remote-control-q2',
        type: 'mcq',
        promptJa: '外出中にスマホで状況だけ確認し、帰社後に本格実装したい。賢い使い方は？',
        options: [
          { textJa: 'スマホで確認し、ターミナルに戻って続行する', whyJa: '正解。端末をまたいでスムーズに引き継げる。' },
          { textJa: 'スマホで全部やり切る', whyJa: '△: 可能だが重い実装はターミナル向き。' },
          { textJa: '帰社まで何も見ない', whyJa: '×: リモートの利点を活かせていない。' },
          { textJa: '毎回新規セッションを立て直す', whyJa: '×: 文脈が途切れて非効率。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't13-remote-control-case1',
        type: 'case',
        scenarioJa:
          '移動中にスマホで長時間タスクの進捗を確認し、オフィスに着いたらそのまま続きを実装したい。',
        tags: ['team', 'remote'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            {
              id: 'remote',
              labelJa: 'リモート操作（端末間のセッション共有）',
              correct: true,
              whyJa: 'スマホで確認し、同じセッションをターミナルで引き継げる。これが最適。',
            },
            { id: 'new', labelJa: '毎回新しいセッションを作る', whyJa: '×: 文脈が途切れ、引き継ぎにならない。' },
            { id: 'screenshot', labelJa: 'スクショを送り合う', whyJa: '×: 手作業で非効率。継続作業にならない。' },
            { id: 'wait', labelJa: 'オフィスに着くまで待つ', whyJa: '×: 移動時間を活かせない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'スマホ/ブラウザでセッションを開き、後でターミナルへ引き継ぐ', correct: true, whyJa: '正解。端末をまたいで同じセッションを続けられる。' },
            { textJa: '/clear してから移動', whyJa: '×: 文脈を消してしまう。' },
            { textJa: 'settings.local.json を書き換える', whyJa: '×: リモート引き継ぎの手段ではない。' },
            { textJa: 'ターミナルを閉じておく', whyJa: '×: 引き継ぎとは無関係。' },
          ],
        },
        rewardJa: '移動中も無駄なし。席に着けば、続きはターミナルでそのまま。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't13-dispatch',
    tier: 't13',
    order: 5,
    title: 'Dispatch',
    titleJa: 'ディスパッチ',
    icon: '📨',
    requires: ['t13-shared-settings'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'Slack や iMessage などのメッセージから Claude にタスクを依頼できる。チャットの流れのまま作業を投げられる。',
      blocks: [
        { type: 'lead', textJa: '伝令を飛ばすように、チャットから一言でタスクを送り込む。' },
        {
          type: 'list',
          titleJa: '依頼の入口',
          items: [
            { term: 'Slack', descJa: 'チャンネルやDMからタスクを依頼。' },
            { term: 'iMessage', descJa: 'メッセージから手軽に指示を送る。' },
            { term: '結果通知', descJa: '進捗や結果がチャットに返ってくる。' },
          ],
        },
        { type: 'tip', textJa: 'バグ報告が来た Slack スレッドから、そのまま調査タスクを投げると流れが切れない。' },
      ],
      links: [{ labelJa: '公式: ディスパッチ', url: DOC }],
    },
    quiz: [
      {
        id: 't13-dispatch-q1',
        type: 'mcq',
        promptJa: 'ディスパッチの説明として正しいのは？',
        options: [
          { textJa: 'Slack や iMessage から Claude にタスクを依頼できる', whyJa: '正解。チャット経由でタスクを投げられる。' },
          { textJa: 'ターミナルからしか起動できない', whyJa: '×: チャットからの入口がある。' },
          { textJa: 'メールでのみ依頼できる', whyJa: '×: Slack/iMessage 等が入口。' },
          { textJa: 'コードを書かせることはできない', whyJa: '×: タスクとして実作業を依頼できる。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't13-dispatch-q2',
        type: 'mcq',
        promptJa: 'Slack にバグ報告が来た。流れを切らずに調査を始める良い方法は？',
        options: [
          { textJa: 'そのスレッドからディスパッチで調査タスクを依頼する', whyJa: '正解。文脈を保ったままタスク化できる。' },
          { textJa: '内容を手でターミナルに転記する', whyJa: '△: できるが手間で転記ミスのもと。' },
          { textJa: '報告を無視する', whyJa: '×: 解決しない。' },
          { textJa: '新しいメールスレッドを立てる', whyJa: '×: 流れが分断され非効率。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't13-dispatch-case1',
        type: 'case',
        scenarioJa:
          'Slack のサポートチャンネルに不具合報告が頻繁に来る。ターミナルを開かずに、その場から初期調査を走らせたい。',
        tags: ['team', 'dispatch'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            {
              id: 'dispatch',
              labelJa: 'ディスパッチ（チャットからタスク依頼）',
              correct: true,
              whyJa: 'Slack スレッドからそのまま Claude にタスクを投げられる。文脈も切れない。',
            },
            { id: 'routine', labelJa: 'ルーティンで定期実行', whyJa: '×: スケジュール実行で、その場の即時依頼には向かない。' },
            { id: 'review', labelJa: '/review を回す', whyJa: '×: コードレビュー用で不具合報告の調査依頼とは別。' },
            { id: 'manual', labelJa: '毎回ターミナルを開いて手入力', whyJa: '△: できるが、その場で投げたい要件を満たさない。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'Slack のスレッドから Claude にメッセージでタスクを依頼', correct: true, whyJa: '正解。チャット経由でディスパッチできる。' },
            { textJa: 'settings.json に報告内容を書く', whyJa: '×: 設定ファイルはタスク依頼の場ではない。' },
            { textJa: '/compact を実行', whyJa: '×: 文脈圧縮で無関係。' },
            { textJa: 'CLAUDE.md に貼り付ける', whyJa: '×: 記憶用でタスク起動の手段ではない。' },
          ],
        },
        rewardJa: '報告が来たその場から調査が走る。対応の初速が上がった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
