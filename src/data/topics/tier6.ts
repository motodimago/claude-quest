import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 6: Planning & Reasoning（思考の塔）=====
export const TIER6: Topic[] = [
  {
    id: 't6-plan-mode',
    tier: 't6',
    order: 1,
    title: 'Plan Mode',
    titleJa: 'プランモード',
    icon: '🧭',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'プランモードは、Claude をまず読み取り中心にして実装計画を立てさせ、承認してから実行に移す安全モード。大きな変更の前に有効。',
      blocks: [
        { type: 'lead', textJa: 'いきなり斬りかかるな。まず地図を引く。それがプランモードだ。' },
        {
          type: 'list',
          titleJa: 'プランモードの流れ',
          items: [
            { term: '調査', descJa: 'コードを読み込み、変更方針を組み立てる。' },
            { term: '計画提示', descJa: '何をどう変えるかを先に提案する。' },
            { term: '承認', descJa: '人が確認・修正してから実行に進む。' },
          ],
        },
        { type: 'kbd', keys: 'Shift+Tab', descJa: '権限モードを循環し、プランモードに合わせる。' },
        { type: 'tip', textJa: 'リファクタや影響範囲の広い作業は、まずプランモードで方針を固めると事故が減る。' },
        { type: 'warn', textJa: 'プランモード中は実行が制限される。計画を承認するまで本実装は進まない。' },
      ],
      links: [{ labelJa: '公式: プランモード', url: DOC }],
    },
    quiz: [
      {
        id: 't6-plan-mode-q1',
        type: 'mcq',
        promptJa: 'プランモードの主な目的は？',
        options: [
          { textJa: '実行前に計画を提示し、承認してから進める', whyJa: '正解。先に方針を固めて事故を防ぐ。' },
          { textJa: '確認なしで全自動実行する', whyJa: '×: それは bypassPermissions の発想で逆。' },
          { textJa: '会話を要約する', whyJa: '×: それは /compact の役割。' },
          { textJa: 'モデルを切り替える', whyJa: '×: モデル選択とは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't6-plan-mode-q2',
        type: 'mcq',
        promptJa: 'プランモードに切り替える操作は？',
        options: [
          { textJa: 'Shift+Tab で権限モードを循環', whyJa: '正解。モードを循環してプランに合わせる。' },
          { textJa: 'Ctrl+C', whyJa: '×: 中断。モード切替ではない。' },
          { textJa: '/compact', whyJa: '×: 文脈の圧縮で別物。' },
          { textJa: 'Esc を2回', whyJa: '×: 過去メッセージの編集で別機能。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't6-plan-mode-case1',
        type: 'case',
        scenarioJa:
          '影響範囲の広いリファクタを頼みたい。いきなりコードを書き換えられると困るので、先に方針を確認したい。',
        tags: ['plan', 'safety'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            { id: 'plan', labelJa: 'プランモード', correct: true, whyJa: '読み取り中心で計画を先に提示。承認後に実行できる。' },
            { id: 'fast', labelJa: '高速モード', whyJa: '×: 速度優先で、方針確認の目的に合わない。' },
            { id: 'bypass', labelJa: 'bypassPermissions', whyJa: '×: 全自動で勝手に書き換える。最も危険。' },
            { id: 'compact', labelJa: '/compact', whyJa: '×: 文脈の圧縮であって計画立案ではない。' },
          ],
        },
        invoke: {
          promptJa: 'どう切り替える？',
          options: [
            { textJa: 'Shift+Tab でプランモードへ循環', correct: true, whyJa: '正解。承認まで実装は進まない。' },
            { textJa: 'Ctrl+B でバックグラウンド化', whyJa: '×: タスクを背面へ送るだけ。' },
            { textJa: '/clear で会話リセット', whyJa: '×: 文脈を失うだけで無関係。' },
            { textJa: 'モデルを Haiku に変更', whyJa: '×: モデル変更は計画提示と無関係。' },
          ],
        },
        rewardJa: '計画を見てから GO。安全に大改修を進められた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't6-extended-thinking',
    tier: 't6',
    order: 2,
    title: 'Extended Thinking',
    titleJa: '拡張思考',
    icon: '🧠',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '拡張思考は、難しい問題に対して Claude により多くの推論時間を割かせる仕組み。複雑な設計やデバッグで精度が上がる。',
      blocks: [
        { type: 'lead', textJa: '強敵には深い読みを。じっくり考えさせれば、難所を抜けられる。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: '複雑な設計', descJa: '選択肢が多くトレードオフを要する場面。' },
            { term: '難解なバグ', descJa: '原因が絡み合っていて切り分けが難しいとき。' },
            { term: 'アルゴリズム', descJa: '正しさの検討に手間がかかる問題。' },
          ],
        },
        { type: 'tip', textJa: '「もっとよく考えて」と促したり、effort（努力度）を上げると思考を深められる。' },
        { type: 'warn', textJa: '深く考えるほど時間とトークンを消費する。簡単な作業には使いすぎない。' },
      ],
      links: [{ labelJa: '公式: 拡張思考', url: DOC }],
    },
    quiz: [
      {
        id: 't6-extended-thinking-q1',
        type: 'mcq',
        promptJa: '拡張思考が最も役立つ場面は？',
        options: [
          { textJa: '原因が複雑に絡んだ難バグの切り分け', whyJa: '正解。深い推論が効く典型。' },
          { textJa: 'タイポの修正', whyJa: '×: 単純作業には過剰でコストだけ増える。' },
          { textJa: 'ファイルの削除', whyJa: '×: 推論を深める必要がない。' },
          { textJa: '会話の要約', whyJa: '×: それは /compact の領分。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't6-extended-thinking-q2',
        type: 'mcq',
        promptJa: '拡張思考の代償（トレードオフ）は？',
        options: [
          { textJa: '時間とトークンを多く消費する', whyJa: '正解。深く考えるほどコストが増える。' },
          { textJa: 'ファイルが消える', whyJa: '×: そんな副作用はない。' },
          { textJa: '権限が変わる', whyJa: '×: 権限とは無関係。' },
          { textJa: '履歴が消える', whyJa: '×: 履歴は消えない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't6-extended-thinking-case1',
        type: 'case',
        scenarioJa:
          '再現条件が不明な厄介なバグに数時間ハマっている。Claude にじっくり腰を据えて原因を突き止めてほしい。',
        tags: ['thinking', 'debug'],
        feature: {
          promptJa: 'どうアプローチする？',
          options: [
            { id: 'think', labelJa: '拡張思考で深く推論させる', correct: true, whyJa: '複雑な切り分けに推論時間を割くのが最適。' },
            { id: 'fast', labelJa: '高速モードで素早く回す', whyJa: '×: 速度優先は難バグの精度を下げる。' },
            { id: 'compact', labelJa: '/compact で要約', whyJa: '×: 文脈整理であって推論強化ではない。' },
            { id: 'clear', labelJa: '/clear でやり直す', whyJa: '×: 文脈を捨てると手がかりまで失う。' },
          ],
        },
        invoke: {
          promptJa: '具体的にどうする？',
          options: [
            { textJa: '「もっと深く考えて」と促す／effort を上げる', correct: true, whyJa: '正解。思考を深める指示・設定を使う。' },
            { textJa: 'Ctrl+C を押す', whyJa: '×: 中断するだけ。' },
            { textJa: 'モデルを最速設定にする', whyJa: '×: 速度優先で逆効果。' },
            { textJa: 'ターミナルを再起動', whyJa: '×: 推論の深さとは無関係。' },
          ],
        },
        rewardJa: 'じっくり読んだ末に根本原因を特定。難所を突破した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't6-compact',
    tier: 't6',
    order: 3,
    title: '/compact',
    titleJa: '/compact（文脈の圧縮）',
    icon: '🗜️',
    requires: [],
    mapPos: { col: 2, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '/compact は会話を要約して文脈（コンテキスト）を圧縮し、要点を保ちながらトークンを節約して続行できるコマンド。',
      blocks: [
        { type: 'lead', textJa: '長旅で荷が重くなったら、要点だけ残して身軽になる。それが /compact。' },
        {
          type: 'list',
          titleJa: '/compact と /clear の違い',
          items: [
            { term: '/compact', descJa: '要約して文脈を圧縮。要点は保持したまま続行できる。' },
            { term: '/clear', descJa: '会話を全消去。文脈もまっさらになる。' },
          ],
        },
        { type: 'tip', textJa: '上限に近づくと自動圧縮（auto-compact）が走ることもある。手動で先に整えると安定する。' },
        { type: 'warn', textJa: '文脈を保ちたいなら /clear ではなく /compact を選ぶ。' },
      ],
      links: [{ labelJa: '公式: コンテキスト管理', url: DOC }],
    },
    quiz: [
      {
        id: 't6-compact-q1',
        type: 'mcq',
        promptJa: '会話が長くなりトークンを圧迫。要点は保ちつつ節約したい。使うのは？',
        options: [
          { textJa: '/compact', whyJa: '正解。要約して文脈を圧縮する。' },
          { textJa: '/clear', whyJa: '×: 全消去で文脈まで失う。' },
          { textJa: '/debug', whyJa: '×: デバッグ用で無関係。' },
          { textJa: '/model', whyJa: '×: モデル切替で無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't6-compact-q2',
        type: 'mcq',
        promptJa: '/compact と /clear の違いとして正しいのは？',
        options: [
          { textJa: '/compact は要点を保ち、/clear は全消去', whyJa: '正解。保持か消去かが本質的な差。' },
          { textJa: '両方とも全消去', whyJa: '×: /compact は要点を残す。' },
          { textJa: '両方とも要約', whyJa: '×: /clear は要約しない。' },
          { textJa: '違いはない', whyJa: '×: 目的が異なる。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't6-compact-case1',
        type: 'case',
        scenarioJa:
          '長時間の作業で会話が膨らみ、コンテキストが残り少ない。でもこれまでの設計判断は引き継ぎたい。',
        tags: ['context'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'compact', labelJa: '会話を要約して圧縮する', correct: true, whyJa: '要点を残して文脈を節約できる。継続に最適。' },
            { id: 'clear', labelJa: '会話を全消去する', whyJa: '×: 設計判断ごと失ってしまう。' },
            { id: 'ignore', labelJa: '何もしない', whyJa: '×: 圧迫が続き、いずれ破綻する。' },
            { id: 'restart', labelJa: 'ターミナルを再起動', whyJa: '×: セッションごと失う。' },
          ],
        },
        invoke: {
          promptJa: 'どのコマンド？',
          options: [
            { textJa: '/compact', correct: true, whyJa: '正解。要約して文脈を圧縮する。' },
            { textJa: '/clear', whyJa: '×: 全消去になる。' },
            { textJa: '/usage', whyJa: '×: 使用量の確認で別物。' },
            { textJa: '/context', whyJa: '△: 内訳の可視化はできるが圧縮はしない。' },
          ],
        },
        rewardJa: '要点を残して身軽に。設計判断を保ったまま作業を続けられた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't6-fast-mode',
    tier: 't6',
    order: 4,
    title: 'Fast Mode',
    titleJa: '高速モード',
    icon: '⚡',
    requires: ['t6-extended-thinking'],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '高速モード（/fast）は、単純で見通しの良い作業に対して出力を速くするモード。深い推論より速度を優先したいときに使う。',
      blocks: [
        { type: 'lead', textJa: '雑魚敵には一閃を。考え込まず、速さで押し切る場面もある。' },
        {
          type: 'list',
          titleJa: '高速モードが向く作業',
          items: [
            { term: '定型的な修正', descJa: '手順が明確で迷いの少ない変更。' },
            { term: '小さな調整', descJa: '文言修正やリネームなど軽い作業。' },
          ],
        },
        { type: 'kbd', keys: '/fast', descJa: '高速モードのオン/オフを切り替える。' },
        { type: 'tip', textJa: '難所では拡張思考、軽作業では高速モード、と場面で使い分けるのがコツ。' },
      ],
      links: [{ labelJa: '公式: 速度とコスト', url: DOC }],
    },
    quiz: [
      {
        id: 't6-fast-mode-q1',
        type: 'mcq',
        promptJa: '高速モードが向いている作業は？',
        options: [
          { textJa: '手順が明確な定型的・軽量な修正', whyJa: '正解。速度優先が活きる場面。' },
          { textJa: '原因不明の難バグの調査', whyJa: '×: 深い推論が要る場面で逆効果。' },
          { textJa: '大規模アーキテクチャ設計', whyJa: '×: 拡張思考向き。' },
          { textJa: 'セキュリティ監査', whyJa: '×: 慎重さが要り速度優先は不適。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't6-fast-mode-q2',
        type: 'mcq',
        promptJa: '高速モードを切り替えるコマンドは？',
        options: [
          { textJa: '/fast', whyJa: '正解。高速モードをトグルする。' },
          { textJa: '/slow', whyJa: '×: そのようなコマンドはない。' },
          { textJa: '/compact', whyJa: '×: 文脈圧縮で別物。' },
          { textJa: '/clear', whyJa: '×: 会話リセットで無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't6-fast-mode-case1',
        type: 'case',
        scenarioJa:
          '大量の単純な文言修正をテンポよく片付けたい。1件ずつ深く考えさせると遅くて仕方ない。',
        tags: ['fast', 'productivity'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'fast', labelJa: '高速モードに切り替える', correct: true, whyJa: '軽作業の連続では速度優先が最適。' },
            { id: 'think', labelJa: '拡張思考を有効にする', whyJa: '×: 単純作業に深い推論は不要で遅くなる。' },
            { id: 'plan', labelJa: 'プランモードにする', whyJa: '×: 計画立案が要る作業ではない。' },
            { id: 'effortmax', labelJa: 'effort を max にする', whyJa: '×: 努力度を上げると遅くなる。逆。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '/fast でオンにする', correct: true, whyJa: '正解。高速モードをオンにする。' },
            { textJa: '/compact する', whyJa: '×: 文脈圧縮で速度設定ではない。' },
            { textJa: 'Shift+Tab を押す', whyJa: '×: 権限モードの循環で別物。' },
            { textJa: '/usage を見る', whyJa: '×: 使用量確認で無関係。' },
          ],
        },
        rewardJa: 'テンポよく大量の修正を完了。軽作業は速さが正義だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't6-effort',
    tier: 't6',
    order: 5,
    title: 'Effort Level',
    titleJa: '努力度（effort）',
    icon: '🎚️',
    requires: ['t6-extended-thinking'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'effort（努力度）は、Claude がどれだけ推論に手間をかけるかの予算。low（安く速い）〜 high/xhigh/max（徹底的）で調整する。',
      blocks: [
        { type: 'lead', textJa: '力の入れ加減を決める。流すか、全力か。effort はその目盛りだ。' },
        {
          type: 'list',
          titleJa: '目安',
          items: [
            { term: 'low', descJa: '安く速い。軽作業向け。' },
            { term: 'medium', descJa: '標準的なバランス。' },
            { term: 'high / xhigh', descJa: '難問や品質重視の作業向け。' },
            { term: 'max', descJa: '最も徹底的。時間とコストは増える。' },
          ],
        },
        { type: 'tip', textJa: '作業の難易度に合わせて上げ下げすると、コストと品質のバランスが取りやすい。' },
        { type: 'warn', textJa: 'effort を上げるほど推論コスト（時間・トークン）が増える。' },
      ],
      links: [{ labelJa: '公式: 努力度の設定', url: DOC }],
    },
    quiz: [
      {
        id: 't6-effort-q1',
        type: 'mcq',
        promptJa: 'effort を high〜max に上げると一般にどうなる？',
        options: [
          { textJa: 'より徹底的に推論するが時間・コストは増える', whyJa: '正解。品質とコストはトレードオフ。' },
          { textJa: '必ず速くなる', whyJa: '×: 上げると遅くなりがち。' },
          { textJa: 'ファイルが消える', whyJa: '×: そんな副作用はない。' },
          { textJa: '権限が緩む', whyJa: '×: 権限とは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't6-effort-q2',
        type: 'mcq',
        promptJa: '軽い定型作業でコストを抑えたい。適切な effort は？',
        options: [
          { textJa: 'low', whyJa: '正解。安く速く済ませられる。' },
          { textJa: 'max', whyJa: '×: 過剰でコストが膨らむ。' },
          { textJa: 'xhigh', whyJa: '×: 軽作業には不要。' },
          { textJa: 'high', whyJa: '×: 軽作業には強すぎる。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't6-effort-case1',
        type: 'case',
        scenarioJa:
          '難度の高い設計タスクで、多少コストがかかっても質の高い検討をしてほしい。',
        tags: ['effort', 'quality'],
        feature: {
          promptJa: 'どう調整する？',
          options: [
            { id: 'raise', labelJa: 'effort（努力度）を上げる', correct: true, whyJa: '難タスクには推論予算を増やすのが最適。' },
            { id: 'fast', labelJa: '高速モードにする', whyJa: '×: 速度優先で質が下がる。' },
            { id: 'lower', labelJa: 'effort を low にする', whyJa: '×: 努力を下げると検討が浅くなる。' },
            { id: 'compact', labelJa: '/compact する', whyJa: '×: 文脈圧縮で推論強化ではない。' },
          ],
        },
        invoke: {
          promptJa: '具体的にはどの設定？',
          options: [
            { textJa: 'effort を high / xhigh / max に設定', correct: true, whyJa: '正解。徹底的に推論させる。' },
            { textJa: 'effort を low に設定', whyJa: '×: 逆方向で浅くなる。' },
            { textJa: '/fast をオンにする', whyJa: '×: 速度優先で質が落ちる。' },
            { textJa: '/clear する', whyJa: '×: 文脈を捨てるだけ。' },
          ],
        },
        rewardJa: '腰を据えた検討で、設計の穴を事前に潰せた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
