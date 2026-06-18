import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 9: Context & Cost（魔力の泉）=====
export const TIER9: Topic[] = [
  {
    id: 't9-context',
    tier: 't9',
    order: 1,
    title: '/context',
    titleJa: '/context（文脈の可視化）',
    icon: '🔮',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '/context は、いまコンテキストウィンドウのどこにトークンが使われているかを可視化するコマンド。魔力（トークン）の残量を見極める水晶玉だ。',
      blocks: [
        { type: 'lead', textJa: '魔力は有限。何にどれだけ注がれているかを知らずして、長い冒険は戦えない。' },
        {
          type: 'list',
          titleJa: '/context で分かること',
          items: [
            { term: 'システム/ツール', descJa: 'システムプロンプトやツール定義が占める量。' },
            { term: 'CLAUDE.md', descJa: '読み込まれた記憶ファイルの量。' },
            { term: '会話履歴', descJa: 'これまでのやり取りが占める量。' },
            { term: '空き', descJa: 'あと何トークン使えるか。' },
          ],
        },
        { type: 'kbd', keys: '/context', descJa: '内訳を表示する。' },
        { type: 'tip', textJa: '応答が鈍い・話が抜ける、と感じたらまず /context で内訳を確認しよう。' },
      ],
      links: [{ labelJa: '公式: コンテキスト管理', url: DOC }],
    },
    quiz: [
      {
        id: 't9-context-q1',
        type: 'mcq',
        promptJa: 'いまトークンが何に消費されているか内訳を見たい。打つコマンドは？',
        options: [
          { textJa: '/context', whyJa: '正解。コンテキストの内訳を可視化する。' },
          { textJa: '/usage', whyJa: '△: こちらは使用量(コスト)寄り。今知りたい「内訳」は /context。' },
          { textJa: '/clear', whyJa: '×: 会話をリセットするだけで内訳は見えない。' },
          { textJa: '/help', whyJa: '×: コマンド一覧。内訳は出ない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't9-context-q2',
        type: 'mcq',
        promptJa: '/context を確認すると役立つ典型的な場面は？',
        options: [
          { textJa: '会話が長くなり応答が鈍ってきたとき', whyJa: '正解。文脈の圧迫を内訳で把握できる。' },
          { textJa: 'インストール直後の初回起動時', whyJa: '×: まだ文脈はほぼ空。確認の必要は薄い。' },
          { textJa: 'git のコンフリクト解消中だけ', whyJa: '×: 文脈管理とは無関係な場面。' },
          { textJa: '色テーマを変えたいとき', whyJa: '×: 全く別の設定。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't9-context-case1',
        type: 'case',
        scenarioJa:
          '長時間のセッションで Claude の応答が的外れになってきた。原因が文脈の圧迫かを切り分けたい。',
        tags: ['context'],
        feature: {
          promptJa: 'まず何をする？',
          options: [
            { id: 'ctx', labelJa: 'コンテキストの内訳を可視化する', correct: true, whyJa: '何がトークンを食っているかを見れば、圧迫が原因かを切り分けられる。' },
            { id: 'restart', labelJa: 'とりあえず再起動する', whyJa: '×: 原因不明のまま文脈を全て失う。切り分けにならない。' },
            { id: 'model', labelJa: 'モデルを変える', whyJa: '×: 文脈圧迫が原因なら解決しない。先に切り分けるべき。' },
            { id: 'wait', labelJa: '何もせず続ける', whyJa: '×: 悪化するだけ。' },
          ],
        },
        invoke: {
          promptJa: '具体的なコマンドは？',
          options: [
            { textJa: '/context', correct: true, whyJa: '正解。内訳を表示して圧迫箇所を特定する。' },
            { textJa: '/compact', whyJa: '△: 切り分け後の対処。まず内訳を見るのが先。' },
            { textJa: '/clear', whyJa: '×: いきなり全消去では切り分けにならない。' },
            { textJa: '/doctor', whyJa: '×: 文脈内訳の表示用ではない。' },
          ],
        },
        rewardJa: '内訳が見えた。肥大した履歴が原因と判明。次の一手が打てる。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't9-caching',
    tier: 't9',
    order: 2,
    title: 'Prompt Caching',
    titleJa: 'プロンプトキャッシュ',
    icon: '💎',
    requires: ['t9-context'],
    mapPos: { col: 2, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'プロンプトキャッシュは、CLAUDE.md や変化しない静的な文脈を自動的に再利用してコストと遅延を下げる仕組み。同じ前提を毎回作り直さない節約の魔法だ。',
      blocks: [
        { type: 'lead', textJa: '同じ呪文を毎回ゼロから詠唱するのは無駄。一度組んだ前提は使い回せ。' },
        {
          type: 'list',
          titleJa: 'ポイント',
          items: [
            { term: '自動', descJa: '基本は自動。安定した先頭の文脈（CLAUDE.md 等）がキャッシュされる。' },
            { term: 'コスト減', descJa: 'キャッシュヒットしたトークンは大幅に安くなる。' },
            { term: '安定が鍵', descJa: '文脈の先頭をむやみに変えるとヒット率が落ちる。' },
          ],
        },
        { type: 'tip', textJa: 'CLAUDE.md など共通前提を安定させるほどキャッシュが効きやすい。' },
        { type: 'warn', textJa: '会話の途中で前提を頻繁に書き換えると、キャッシュが効きにくくなる。' },
      ],
      links: [{ labelJa: '公式: プロンプトキャッシュ', url: DOC }],
    },
    quiz: [
      {
        id: 't9-caching-q1',
        type: 'mcq',
        promptJa: 'プロンプトキャッシュが主に節約してくれるのは？',
        options: [
          { textJa: '繰り返し使われる安定した前提（CLAUDE.md 等）の再処理コスト', whyJa: '正解。先頭の安定文脈を再利用して安く・速くする。' },
          { textJa: 'ディスクの空き容量', whyJa: '×: ストレージではなくトークン処理の話。' },
          { textJa: 'git のコミット数', whyJa: '×: 無関係。' },
          { textJa: '画面の描画速度', whyJa: '×: UI 描画とは別。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't9-caching-q2',
        type: 'mcq',
        promptJa: 'キャッシュのヒット率を保つコツは？',
        options: [
          { textJa: '共通前提（CLAUDE.md 等）をなるべく安定させる', whyJa: '正解。先頭が安定するほど再利用が効く。' },
          { textJa: '毎回 CLAUDE.md を大きく書き換える', whyJa: '×: 先頭が変わりヒット率が落ちる。' },
          { textJa: 'こまめに /clear する', whyJa: '×: 文脈ごと消えキャッシュも活かせない。' },
          { textJa: 'モデルを毎回変える', whyJa: '×: 安定とは逆方向。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't9-caching-case1',
        type: 'case',
        scenarioJa:
          '同じ大きな前提（設計方針を書いた CLAUDE.md）を抱えたセッションを何度も回す。コストと待ち時間を抑えたい。',
        tags: ['caching', 'cost'],
        feature: {
          promptJa: 'どの仕組みを活かす？',
          options: [
            { id: 'cache', labelJa: 'プロンプトキャッシュを効かせる', correct: true, whyJa: '安定した前提は再利用され、コストと遅延が下がる。狙いどおり。' },
            { id: 'shrink', labelJa: 'CLAUDE.md を毎回削って小さくする', whyJa: '△: 小さくはなるが前提が揺れてキャッシュは効きにくい。' },
            { id: 'newmodel', labelJa: '毎回モデルを切り替える', whyJa: '×: 安定性を崩しむしろ非効率。' },
            { id: 'ignore', labelJa: '気にしない', whyJa: '×: 節約の機会を逃す。' },
          ],
        },
        invoke: {
          promptJa: '実践として正しいのは？',
          options: [
            { textJa: '共通前提を安定させ、先頭をむやみに書き換えない', correct: true, whyJa: '正解。安定した先頭文脈がキャッシュされ再利用される。' },
            { textJa: '会話のたびに CLAUDE.md を全面改稿する', whyJa: '×: 先頭が変わりキャッシュが無効化されやすい。' },
            { textJa: 'セッション開始ごとに /clear を連打する', whyJa: '×: 文脈を捨てては再利用できない。' },
            { textJa: 'キャッシュを手動で削除し続ける', whyJa: '×: 節約効果を自ら捨てている。' },
          ],
        },
        rewardJa: '前提は使い回され、待ち時間もコストも軽くなった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't9-usage',
    tier: 't9',
    order: 3,
    title: '/usage',
    titleJa: '/usage（使用量）',
    icon: '📊',
    requires: ['t9-context'],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '/usage は、トークン使用量の内訳を skill・subagent・MCP サーバなどの単位で見せてくれるコマンド。どこが魔力を食う竜なのかを暴く。',
      blocks: [
        { type: 'lead', textJa: '無駄な魔力消費の犯人探しには、消費の内訳を突きつけるのが一番だ。' },
        {
          type: 'list',
          titleJa: '/usage で分かること',
          items: [
            { term: 'skill 別', descJa: 'どの Skill がどれだけ使ったか。' },
            { term: 'subagent 別', descJa: 'サブエージェントごとの消費。' },
            { term: 'MCP 別', descJa: 'どの MCP サーバが重いか。' },
          ],
        },
        { type: 'kbd', keys: '/usage', descJa: '使用量の内訳を表示する。' },
        { type: 'tip', textJa: 'コストが想定より高いときは /usage で「重い要素」を特定して対処する。' },
      ],
      links: [{ labelJa: '公式: 使用量の確認', url: DOC }],
    },
    quiz: [
      {
        id: 't9-usage-q1',
        type: 'mcq',
        promptJa: 'どの Skill / サブエージェント / MCP がトークンを多く使っているか調べるには？',
        options: [
          { textJa: '/usage', whyJa: '正解。要素別の使用量内訳を表示する。' },
          { textJa: '/context', whyJa: '△: 現在の文脈構成は見えるが、要素別の使用量内訳は /usage。' },
          { textJa: '/model', whyJa: '×: モデル選択用。' },
          { textJa: '/compact', whyJa: '×: 文脈の要約。内訳は出ない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't9-usage-q2',
        type: 'mcq',
        promptJa: '/context と /usage の役割の違いとして正しいのは？',
        options: [
          { textJa: '/context は今の文脈構成、/usage は要素別の使用量内訳', whyJa: '正解。見る軸が異なる。' },
          { textJa: 'どちらも全く同じ', whyJa: '×: 目的が違う。' },
          { textJa: '/usage は会話を消す', whyJa: '×: 消去はしない。' },
          { textJa: '/context は課金を止める', whyJa: '×: そんな機能はない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't9-usage-case1',
        type: 'case',
        scenarioJa: '今月のトークン消費が想定より多い。どの要素が重いのかを特定して削りたい。',
        tags: ['usage', 'cost'],
        feature: {
          promptJa: 'どう調べる？',
          options: [
            { id: 'usage', labelJa: '要素別の使用量内訳を確認する', correct: true, whyJa: 'skill/subagent/MCP 別に見れば重い犯人を特定できる。' },
            { id: 'guess', labelJa: '勘で MCP を全部消す', whyJa: '×: 必要なものまで失う。まず計測。' },
            { id: 'model', labelJa: 'いきなり全部 Haiku にする', whyJa: '△: 品質を落としかねない。原因特定が先。' },
            { id: 'nothing', labelJa: '様子を見る', whyJa: '×: 消費は続く。' },
          ],
        },
        invoke: {
          promptJa: '使うコマンドは？',
          options: [
            { textJa: '/usage', correct: true, whyJa: '正解。要素別の使用量を表示する。' },
            { textJa: '/context', whyJa: '△: 文脈構成は見えるが要素別コストは /usage。' },
            { textJa: '/cost-reset', whyJa: '×: そのようなコマンドは無い。' },
            { textJa: '/clear', whyJa: '×: 会話消去であって計測ではない。' },
          ],
        },
        rewardJa: '重い MCP を特定。狙い撃ちで消費を削れた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't9-model-routing',
    tier: 't9',
    order: 4,
    title: 'Model Routing',
    titleJa: 'モデル使い分け',
    icon: '⚖️',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'タスクの重さに応じてモデルを使い分けると、品質とコストのバランスが取れる。軽作業は Haiku、深い推論は Opus、その中間は Sonnet が目安。',
      blocks: [
        { type: 'lead', textJa: '小鬼退治に伝説の剣は要らない。敵に応じて武器を選べ。' },
        {
          type: 'list',
          titleJa: '目安',
          items: [
            { term: 'Haiku', descJa: '速くて安い。定型・軽作業向き。' },
            { term: 'Sonnet', descJa: 'バランス型。日常の開発に。' },
            { term: 'Opus', descJa: '最も賢い。難しい設計・調査向き。' },
          ],
        },
        { type: 'kbd', keys: '/model', descJa: 'セッション中にモデルを切り替える。' },
        { type: 'tip', textJa: '迷ったら Sonnet。重い問題に当たったら Opus へ上げる。' },
      ],
      links: [{ labelJa: '公式: モデル選択', url: DOC }],
    },
    quiz: [
      {
        id: 't9-model-routing-q1',
        type: 'mcq',
        promptJa: '単純で大量の定型作業を安く速く回したい。目安のモデルは？',
        options: [
          { textJa: 'Haiku', whyJa: '正解。軽量・低コストで定型向き。' },
          { textJa: 'Opus', whyJa: '×: 高性能だが過剰でコスト高。' },
          { textJa: 'モデルは関係ない', whyJa: '×: 用途で選ぶとコストが変わる。' },
          { textJa: 'GPT に切り替える', whyJa: '×: ここでの選択肢は Claude のモデル。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't9-model-routing-q2',
        type: 'mcq',
        promptJa: 'セッションの途中でモデルを切り替えるコマンドは？',
        options: [
          { textJa: '/model', whyJa: '正解。モデルを選び直せる。' },
          { textJa: '/switch', whyJa: '×: そのようなコマンドは無い。' },
          { textJa: '/context', whyJa: '×: 文脈内訳の表示用。' },
          { textJa: '/usage', whyJa: '×: 使用量表示用。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't9-model-routing-q3',
        type: 'mcq',
        promptJa: '難しいアーキテクチャ設計で精度を最優先したい。目安は？',
        options: [
          { textJa: 'Opus', whyJa: '正解。最も賢く難問向き。' },
          { textJa: 'Haiku', whyJa: '×: 速いが難問では力不足になりやすい。' },
          { textJa: 'どれでも同じ', whyJa: '×: 難易度で適性が変わる。' },
          { textJa: 'モデルを使わない', whyJa: '×: 非現実的。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't9-model-routing-case1',
        type: 'case',
        scenarioJa:
          '100 ファイルの機械的なリネームと、その後の難しい設計判断を、コストを抑えつつ品質も確保して進めたい。',
        tags: ['model', 'cost'],
        feature: {
          promptJa: 'どう進める？',
          options: [
            { id: 'route', labelJa: 'タスクごとにモデルを使い分ける', correct: true, whyJa: '機械作業は安いモデル、難所は賢いモデル、が最もバランス良い。' },
            { id: 'allopus', labelJa: '全部 Opus でやる', whyJa: '△: 品質は出るが機械作業まで高コスト。' },
            { id: 'allhaiku', labelJa: '全部 Haiku でやる', whyJa: '×: 難しい設計で品質が不足しがち。' },
            { id: 'random', labelJa: 'その都度ランダムに選ぶ', whyJa: '×: 一貫性が無く非効率。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'リネームは Haiku、設計は /model で Opus に上げる', correct: true, whyJa: '正解。軽作業を安く、難所を賢く。' },
            { textJa: '設計を Haiku、リネームを Opus', whyJa: '×: 逆。難所が弱く軽作業が高コスト。' },
            { textJa: 'モデルは触らず放置', whyJa: '×: 最適化の機会を逃す。' },
            { textJa: '/clear で毎回リセット', whyJa: '×: モデル選択とは無関係。' },
          ],
        },
        rewardJa: '軽作業はサクサク、難所は的確。コストと品質を両取りした。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't9-large-codebase',
    tier: 't9',
    order: 5,
    title: 'Large Codebase Context',
    titleJa: '大規模リポジトリの文脈管理',
    icon: '🗄️',
    requires: ['t9-context'],
    mapPos: { col: 3, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        '巨大なリポジトリでは、すべてを読ませず「必要な範囲だけ」を渡し、長くなったら要約して文脈を健全に保つのがコツ。',
      blocks: [
        { type: 'lead', textJa: '大樹海を一度に踏破しようとするな。進む先だけを照らせ。' },
        {
          type: 'list',
          titleJa: '健全に保つ手立て',
          items: [
            { term: '@ で範囲指定', descJa: '関係するファイルだけを明示参照する。' },
            { term: '/compact', descJa: '会話が長くなったら要約して圧縮する。' },
            { term: 'CLAUDE.md', descJa: '常用の前提は記憶に逃がし、毎回貼らない。' },
            { term: '/context', descJa: '定期的に内訳を確認し肥大を察知する。' },
          ],
        },
        { type: 'tip', textJa: '「全部読ませる」より「要る所だけ渡す」。精度もコストも改善する。' },
        { type: 'warn', textJa: '無関係なファイルを大量に貼ると、文脈が薄まり的外れになりやすい。' },
      ],
      links: [{ labelJa: '公式: 大規模コードベース', url: DOC }],
    },
    quiz: [
      {
        id: 't9-large-codebase-q1',
        type: 'mcq',
        promptJa: '巨大リポジトリで精度とコストを両立する基本姿勢は？',
        options: [
          { textJa: '必要な範囲だけを渡し、長くなれば要約する', whyJa: '正解。スコープを絞り文脈を健全に保つ。' },
          { textJa: '毎回リポジトリ全体を貼る', whyJa: '×: 文脈が薄まりコストも増える。' },
          { textJa: '何も渡さず想像に任せる', whyJa: '×: 的外れになりやすい。' },
          { textJa: 'ファイルを全部削除する', whyJa: '×: 本末転倒。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't9-large-codebase-q2',
        type: 'mcq',
        promptJa: '会話が膨らみ文脈が圧迫されてきた。要点を保ちつつ縮める手段は？',
        options: [
          { textJa: '/compact で要約する', whyJa: '正解。要点を残して圧縮できる。' },
          { textJa: '無関係ファイルを追加で貼る', whyJa: '×: さらに圧迫する。' },
          { textJa: '/model を切り替える', whyJa: '×: 文脈量は減らない。' },
          { textJa: '放置する', whyJa: '×: 悪化する。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't9-large-codebase-case1',
        type: 'case',
        scenarioJa:
          '巨大モノレポで認証周りだけを直したい。リポジトリ全体を貼ったら応答が的外れで遅い。',
        tags: ['context', 'large-repo'],
        feature: {
          promptJa: 'どう立て直す？',
          options: [
            { id: 'scope', labelJa: '関係する範囲だけに絞って渡す', correct: true, whyJa: '必要なファイルに集中させれば精度も速度も上がる。' },
            { id: 'more', labelJa: 'さらに多くのファイルを貼る', whyJa: '×: 文脈が薄まり悪化する。' },
            { id: 'opus', labelJa: 'モデルを Opus に上げるだけ', whyJa: '△: 賢くはなるが文脈過多は解消しない。' },
            { id: 'restart', labelJa: '毎回再起動する', whyJa: '×: 根本対処にならない。' },
          ],
        },
        invoke: {
          promptJa: '具体的な手は？',
          options: [
            { textJa: '@ で認証関連ファイルを明示参照し、長くなれば /compact', correct: true, whyJa: '正解。範囲を絞り、肥大したら要約する。' },
            { textJa: 'リポジトリ全体を毎回貼り直す', whyJa: '×: 圧迫の原因そのもの。' },
            { textJa: '無関係ディレクトリも全部 @ で渡す', whyJa: '×: スコープが広がり逆効果。' },
            { textJa: '.env に設定を書く', whyJa: '×: 文脈スコープ管理とは無関係。' },
          ],
        },
        rewardJa: '認証周りに集中し、応答は速く的確になった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
