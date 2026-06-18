import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 7: Automation（自動化の歯車）=====
export const TIER7: Topic[] = [
  {
    id: 't7-routines',
    tier: 't7',
    order: 1,
    title: 'Routines',
    titleJa: 'ルーティン（定期実行）',
    icon: '⏰',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Routines は、クラウド上でスケジュール実行されるエージェント。毎朝のPRレビューや夜間のCIログ分析など、定期タスクを無人で回せる。',
      blocks: [
        { type: 'lead', textJa: '歯車は君が眠る間も回り続ける。決まった刻みで自動的に働く相棒だ。' },
        {
          type: 'list',
          titleJa: '主な使い道',
          items: [
            { term: '毎朝のPRレビュー', descJa: '出社前にレビュー結果が揃っている。' },
            { term: '夜間のCIログ分析', descJa: '失敗ログを要約して翌朝に報告。' },
            { term: '定期的な依存更新チェック', descJa: '古い依存を検知して提案。' },
          ],
        },
        { type: 'code', caption: 'スケジュールの考え方', lang: 'text', code: '毎日 09:00 → 「open な PR をレビューして要約」' },
        { type: 'tip', textJa: 'ローカルの常駐ではなくクラウドで走るので、PCを閉じても実行される。' },
        { type: 'tip', textJa: '一度きりの予約実行（「明日15時に1回」）にも使える。' },
      ],
      links: [{ labelJa: '公式: Routines', url: DOC }],
    },
    quiz: [
      {
        id: 't7-routines-q1',
        type: 'mcq',
        promptJa: 'PCを閉じていても毎朝決まった時刻に自動でタスクを走らせたい。最適なのは？',
        options: [
          { textJa: 'Routines（クラウド定期実行）', whyJa: '正解。クラウドで走るのでローカルの起動状態に依存しない。' },
          { textJa: 'ターミナルを開きっぱなしにする', whyJa: '×: PCを閉じると止まる。脆い。' },
          { textJa: '毎朝手動で実行する', whyJa: '×: 自動化になっていない。' },
          { textJa: 'CLAUDE.md に時刻を書く', whyJa: '×: CLAUDE.md はスケジュール実行の仕組みではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't7-routines-q2',
        type: 'mcq',
        promptJa: 'Routines の特徴として正しいものは？',
        options: [
          { textJa: 'クラウドでスケジュール実行される', whyJa: '正解。定期・予約のエージェント実行。' },
          { textJa: 'ローカルでしか動かない', whyJa: '×: クラウド実行が特徴。' },
          { textJa: '会話を要約するだけの機能', whyJa: '×: それは /compact。別物。' },
          { textJa: '権限を昇格させる機能', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't7-routines-case1',
        type: 'case',
        scenarioJa: '毎営業日の朝、open な PR をまとめてレビューさせ、出社時には結果が揃っているようにしたい。',
        tags: ['routines', 'automation'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'routine', labelJa: 'Routines（定期実行）', correct: true, whyJa: '決まった時刻にクラウドで自動実行できる。定番の使い方。' },
            { id: 'loop', labelJa: '/loop で回し続ける', whyJa: '△: ローカルで端末を開き続ける必要があり朝の定時実行には不向き。' },
            { id: 'manual', labelJa: '毎朝手動で頼む', whyJa: '×: 自動化にならない。' },
            { id: 'hook', labelJa: 'Hooks で実行', whyJa: '×: Hooks はイベント駆動で、時刻スケジュールではない。' },
          ],
        },
        invoke: {
          promptJa: 'どう設定する？',
          options: [
            { textJa: '毎営業日 09:00 のスケジュールで「PRをレビュー」を登録', correct: true, whyJa: '正解。時刻スケジュールに定期タスクを割り当てる。' },
            { textJa: 'settings.json の permissions に書く', whyJa: '×: 権限設定でありスケジュールではない。' },
            { textJa: 'Esc を毎朝押す', whyJa: '×: 無関係。' },
            { textJa: '.env に時刻を書く', whyJa: '×: 環境変数でスケジュールは組めない。' },
          ],
        },
        rewardJa: '出社するとレビュー結果が揃っている。歯車は静かに回り続けた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't7-loop',
    tier: 't7',
    order: 2,
    title: '/loop',
    titleJa: '/loop（繰り返し）',
    icon: '🔁',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '/loop は、プロンプトやスラッシュコマンドを一定間隔でローカルに繰り返し実行する。デプロイ監視やステータスのポーリングに向く。',
      blocks: [
        { type: 'lead', textJa: '同じ問いを刻み続ける小さな歯車。状況が変わるまで見張らせよう。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: 'デプロイ監視', descJa: '完了するまで一定間隔で状態を確認。' },
            { term: 'CIのポーリング', descJa: 'ビルドが終わるまで繰り返しチェック。' },
            { term: '定型作業の反復', descJa: '同じ手順を一定間隔で実行。' },
          ],
        },
        { type: 'code', caption: '5分ごとに繰り返す', lang: 'text', code: '/loop 5m /babysit-prs' },
        { type: 'tip', textJa: '間隔を省くとモデルが自分でペース配分する（自己ペース）。' },
        { type: 'warn', textJa: 'Routines と違いローカルのセッションで動く。端末を閉じると止まる。' },
      ],
      links: [{ labelJa: '公式: /loop', url: DOC }],
    },
    quiz: [
      {
        id: 't7-loop-q1',
        type: 'mcq',
        promptJa: 'デプロイが終わるまで5分ごとに状態を確認させたい。最適なのは？',
        options: [
          { textJa: '/loop 5m <確認コマンド>', whyJa: '正解。一定間隔でローカルに繰り返し実行できる。' },
          { textJa: 'Routines を毎日に設定', whyJa: '×: 日次スケジュール向き。今だけ監視したい用途に過剰。' },
          { textJa: '/compact', whyJa: '×: 会話の要約で無関係。' },
          { textJa: 'Ctrl+B', whyJa: '×: バックグラウンド化であり繰り返し実行ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't7-loop-q2',
        type: 'mcq',
        promptJa: '/loop と Routines の違いとして正しいものは？',
        options: [
          { textJa: '/loop はローカル、Routines はクラウドで実行', whyJa: '正解。実行場所と常駐性が異なる。' },
          { textJa: 'どちらも完全に同じ', whyJa: '×: 実行環境が異なる。' },
          { textJa: '/loop はクラウド、Routines はローカル', whyJa: '×: 逆。' },
          { textJa: '/loop は権限設定の一種', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't7-loop-case1',
        type: 'case',
        scenarioJa: 'いま走っているデプロイが完了するまで、数分おきにステータスを確認し続けたい（今回だけ）。',
        tags: ['loop', 'polling'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'loop', labelJa: '/loop（一定間隔の繰り返し）', correct: true, whyJa: 'その場の監視・ポーリングに最適。完了したら止めればよい。' },
            { id: 'routine', labelJa: 'Routines を登録', whyJa: '△: 定期スケジュール向き。一度きりの監視には大げさ。' },
            { id: 'wait', labelJa: 'ひたすら手で再確認', whyJa: '×: 非効率で見落とす。' },
            { id: 'hook', labelJa: 'Hooks を設定', whyJa: '×: イベント駆動で時間間隔のポーリングには不向き。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '/loop 3m <ステータス確認コマンド>', correct: true, whyJa: '正解。3分間隔で繰り返し確認する。' },
            { textJa: '/compact 3m', whyJa: '×: /compact に間隔指定はなく用途も違う。' },
            { textJa: 'claude --headless', whyJa: '×: 無人実行用で繰り返し監視の手段ではない。' },
            { textJa: 'Shift+Tab', whyJa: '×: 権限モード切替で無関係。' },
          ],
        },
        rewardJa: '完了の瞬間を逃さず捉えた。小さな歯車がよく見張った。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't7-github-actions',
    tier: 't7',
    order: 3,
    title: 'GitHub Actions',
    titleJa: 'GitHub Actions連携',
    icon: '🤖',
    requires: [],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Claude Code は GitHub Actions に組み込める。PR や Issue で @claude とメンションすると、CI 上で自動レビューやトリアージを行う。',
      blocks: [
        { type: 'lead', textJa: 'リポジトリそのものに相棒を住まわせる。PRが立つたびに働く番人だ。' },
        {
          type: 'list',
          titleJa: 'できること',
          items: [
            { term: '自動PRレビュー', descJa: 'PR に対して指摘コメントを付ける。' },
            { term: 'Issue トリアージ', descJa: 'ラベル付けや要約を自動化。' },
            { term: '@claude メンション', descJa: 'コメントで呼ぶと CI 上で応答。' },
          ],
        },
        { type: 'code', caption: 'ワークフロー（概念）', lang: 'yaml', code: 'on: pull_request\njobs:\n  review:\n    # Claude Code Action が PR をレビュー' },
        { type: 'tip', textJa: 'GitHub App をインストールして連携を有効化する。' },
      ],
      links: [{ labelJa: '公式: GitHub Actions', url: DOC }],
    },
    quiz: [
      {
        id: 't7-github-actions-q1',
        type: 'mcq',
        promptJa: 'PR が作られるたびに CI 上で自動レビューさせたい。使うのは？',
        options: [
          { textJa: 'GitHub Actions 連携（Claude Code Action）', whyJa: '正解。CI のイベントで自動レビューできる。' },
          { textJa: 'ローカルの /loop', whyJa: '×: 各自の端末依存。チームのCIには不向き。' },
          { textJa: 'CLAUDE.md に「レビューして」と書く', whyJa: '×: 自動トリガにはならない。' },
          { textJa: 'Vim モードを有効化', whyJa: '×: 全く無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't7-github-actions-q2',
        type: 'mcq',
        promptJa: 'PR のコメントから Claude を呼び出す一般的な方法は？',
        options: [
          { textJa: '@claude とメンションする', whyJa: '正解。メンションがトリガになる。' },
          { textJa: '/summon と打つ', whyJa: '×: そのようなコマンドは無い。' },
          { textJa: 'PR を一度閉じる', whyJa: '×: 呼び出し手段ではない。' },
          { textJa: 'Esc を押す', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't7-github-actions-case1',
        type: 'case',
        scenarioJa: 'チーム全員の PR に対して、人手をかけず一次レビューを自動で付けたい。',
        tags: ['github', 'ci'],
        feature: {
          promptJa: 'どの仕組みが最適？',
          options: [
            { id: 'gha', labelJa: 'GitHub Actions 連携', correct: true, whyJa: 'CI 上で全員の PR に自動で一次レビューを付けられる。チーム規模に効く。' },
            { id: 'loop', labelJa: '各自が /loop で回す', whyJa: '×: 個人の端末依存でチーム全体には届かない。' },
            { id: 'routine', labelJa: 'Routines（時刻スケジュール）', whyJa: '△: 定期実行はできるが、PR 発生イベントに即応する用途には GHA が自然。' },
            { id: 'manual', labelJa: '当番が手動レビュー', whyJa: '×: 自動化の要件を満たさない。' },
          ],
        },
        invoke: {
          promptJa: 'どう導入する？',
          options: [
            { textJa: 'GitHub App を入れ、pull_request で動くワークフローを追加', correct: true, whyJa: '正解。CI イベントで Claude Code Action を走らせる。' },
            { textJa: '各自の ~/.claude にだけ設定', whyJa: '×: 個人設定ではチームCIに反映されない。' },
            { textJa: '.env に GITHUB=1 と書く', whyJa: '×: それだけでは連携しない。' },
            { textJa: '/terminal-setup を実行', whyJa: '×: キーバインド修正で無関係。' },
          ],
        },
        rewardJa: 'すべての PR に番人の目が届くようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't7-slack',
    tier: 't7',
    order: 4,
    title: 'Slack Integration',
    titleJa: 'Slack連携',
    icon: '💬',
    requires: ['t7-routines'],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        'Slack 連携を使うと、Slack のメッセージから Claude のセッションを起動できる。バグ報告や依頼をそのまま作業につなげられる。',
      blocks: [
        { type: 'lead', textJa: 'チームの会話が流れる場所から、そのまま相棒を呼び出す。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: 'バグ報告の即着手', descJa: 'Slack の報告から調査を開始。' },
            { term: 'チャットから依頼', descJa: 'メッセージで作業をトリガ。' },
            { term: '結果の通知', descJa: '完了をチャンネルへ返す。' },
          ],
        },
        { type: 'tip', textJa: 'チームのワークフローに溶け込ませるのがコツ。' },
      ],
      links: [{ labelJa: '公式: Slack 連携', url: DOC }],
    },
    quiz: [
      {
        id: 't7-slack-q1',
        type: 'mcq',
        promptJa: 'Slack に流れてきたバグ報告を、その場から Claude の作業につなげたい。使うのは？',
        options: [
          { textJa: 'Slack 連携', whyJa: '正解。Slack のメッセージからセッションを起動できる。' },
          { textJa: 'Vim モード', whyJa: '×: 入力方式で無関係。' },
          { textJa: '/compact', whyJa: '×: 会話要約で無関係。' },
          { textJa: 'permissions.deny', whyJa: '×: 権限設定で無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't7-slack-q2',
        type: 'mcq',
        promptJa: 'Slack 連携の主な価値は？',
        options: [
          { textJa: 'チームの会話の場から作業をトリガできる', whyJa: '正解。報告や依頼を即座に作業へつなげられる。' },
          { textJa: 'トークン課金が無料になる', whyJa: '×: 課金とは無関係。' },
          { textJa: 'ローカルのキーバインドを変える', whyJa: '×: 無関係。' },
          { textJa: 'モデルを自動で最上位に固定する', whyJa: '×: そのような機能ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't7-slack-case1',
        type: 'case',
        scenarioJa: 'サポートチャンネルに来たバグ報告を、毎回ターミナルに貼り直さず直接調査に移したい。',
        tags: ['slack', 'workflow'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'slack', labelJa: 'Slack 連携', correct: true, whyJa: 'Slack のメッセージからそのままセッションを起動でき、貼り直しが不要。' },
            { id: 'copy', labelJa: '毎回コピペする', whyJa: '×: 手間が残り自動化になっていない。' },
            { id: 'routine', labelJa: 'Routines を毎時実行', whyJa: '×: 時刻起動で、報告イベントへの即応にならない。' },
            { id: 'hook', labelJa: 'Hooks を設定', whyJa: '×: ローカルのツールイベント用で Slack 起点ではない。' },
          ],
        },
        invoke: {
          promptJa: 'どう運用する？',
          options: [
            { textJa: 'Slack 連携を設定し、メッセージから Claude を起動', correct: true, whyJa: '正解。チャットを起点にセッションを開始する。' },
            { textJa: '.env に SLACK=1 と書くだけ', whyJa: '×: それだけでは連携しない。' },
            { textJa: '/loop で Slack を監視', whyJa: '×: 正規の連携ではなく脆い。' },
            { textJa: 'CLAUDE.md に Slack URL を書く', whyJa: '×: 連携の設定場所ではない。' },
          ],
        },
        rewardJa: '報告がそのまま調査に化けた。会話と作業の境界が消えた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't7-web-teleport',
    tier: 't7',
    order: 5,
    title: 'Web/Desktop Sessions',
    titleJa: 'Web/デスクトップ連携',
    icon: '🛰️',
    requires: ['t7-routines'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'Claude Code は Web やデスクトップ、スマホでも使える。別デバイスで始めた作業を、ターミナルへ引き継ぐ（teleport）こともできる。',
      blocks: [
        { type: 'lead', textJa: '冒険はどこからでも始められる。途中から手元の端末に呼び寄せよう。' },
        {
          type: 'list',
          titleJa: '連携の形',
          items: [
            { term: 'Web/スマホで開始', descJa: '外出先で着手し、続きを手元で。' },
            { term: 'teleport', descJa: 'リモートのセッションをターミナルへ引き込む。' },
            { term: 'デスクトップアプリ', descJa: 'GUI で同じセッションを継続。' },
          ],
        },
        { type: 'code', caption: 'ターミナルへ引き継ぐ', lang: 'bash', code: 'claude --teleport' },
        { type: 'tip', textJa: '移動中はスマホ、腰を据えるときは端末、と切り替えられる。' },
      ],
      links: [{ labelJa: '公式: Web/デスクトップ', url: DOC }],
    },
    quiz: [
      {
        id: 't7-web-teleport-q1',
        type: 'mcq',
        promptJa: '外出先のスマホで始めた作業を、帰宅後にターミナルでそのまま続けたい。使うのは？',
        options: [
          { textJa: 'セッションを teleport でターミナルへ引き継ぐ', whyJa: '正解。別デバイスのセッションを手元に呼び込める。' },
          { textJa: '最初からやり直す', whyJa: '×: 続きを引き継げるのが利点。やり直しは無駄。' },
          { textJa: '/compact する', whyJa: '×: 要約で、デバイス間引き継ぎではない。' },
          { textJa: 'permissions を変える', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't7-web-teleport-q2',
        type: 'mcq',
        promptJa: 'Web/デスクトップ連携の利点として正しいものは？',
        options: [
          { textJa: 'デバイスをまたいで同じ作業を継続できる', whyJa: '正解。場所と端末を選ばず続けられる。' },
          { textJa: 'トークンが無制限になる', whyJa: '×: 無関係。' },
          { textJa: '自動でコミットされる', whyJa: '×: そのような機能ではない。' },
          { textJa: 'Vim モードが必須になる', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't7-web-teleport-case1',
        type: 'case',
        scenarioJa: '通勤中にスマホで調査を始めた。デスクに着いたら、その続きを手元のターミナルで進めたい。',
        tags: ['teleport', 'sessions'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'teleport', labelJa: 'セッションをターミナルへ引き継ぐ', correct: true, whyJa: '同じ文脈のまま端末で継続でき、やり直しが不要。' },
            { id: 'restart', labelJa: 'ターミナルで一から始め直す', whyJa: '×: 文脈を捨てることになり非効率。' },
            { id: 'copy', labelJa: '会話を手でコピーする', whyJa: '△: できなくはないが引き継ぎ機能の方が確実で速い。' },
            { id: 'routine', labelJa: 'Routines に登録', whyJa: '×: 定期実行で、継続引き継ぎとは別物。' },
          ],
        },
        invoke: {
          promptJa: '具体的な操作は？',
          options: [
            { textJa: 'claude --teleport で手元へ引き込む', correct: true, whyJa: '正解。リモートのセッションをターミナルに呼び込む。' },
            { textJa: 'claude --headless', whyJa: '×: 無人実行用で引き継ぎではない。' },
            { textJa: '/clear する', whyJa: '×: 文脈を消してしまう。' },
            { textJa: 'Ctrl+B を押す', whyJa: '×: バックグラウンド化で無関係。' },
          ],
        },
        rewardJa: '相棒が手元に降り立った。場所を選ばぬ冒険だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
