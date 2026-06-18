import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 8: IDE Integrations（工匠のアトリエ）=====
export const TIER8: Topic[] = [
  {
    id: 't8-vscode',
    tier: 't8',
    order: 1,
    title: 'VS Code Extension',
    titleJa: 'VS Code拡張',
    icon: '🖥️',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'VS Code 拡張は、Claude Code をエディタの中で使うための GUI。インライン差分・プラン確認・@メンションが手元のエディタで完結する。',
      blocks: [
        { type: 'lead', textJa: 'ターミナルを離れ、エディタという工房で相棒と肩を並べて作業する。' },
        {
          type: 'list',
          titleJa: 'GUI で得られるもの',
          items: [
            { term: 'インライン差分', descJa: '変更点をエディタ上で差分表示し、その場で承認/却下できる。' },
            { term: 'プラン確認', descJa: 'Plan モードの計画をパネルで読み、承認してから実行。' },
            { term: '@メンション', descJa: 'ファイルや行を素早く文脈に追加できる（次のトピック）。' },
          ],
        },
        { type: 'tip', textJa: '拡張機能マーケットプレイスから Claude Code を入れ、サイドパネルから起動する。' },
        { type: 'warn', textJa: 'GUI でも裏側は同じ CLI。settings.json や権限の考え方はそのまま通用する。' },
      ],
      links: [{ labelJa: '公式: VS Code 連携', url: DOC }],
    },
    quiz: [
      {
        id: 't8-vscode-q1',
        type: 'mcq',
        promptJa: 'VS Code 拡張を使う主な利点は？',
        options: [
          { textJa: 'インライン差分で変更をその場で確認・承認できる', whyJa: '正解。エディタ上で差分を見ながら承認/却下できる。' },
          { textJa: 'CLI が一切不要になり別物になる', whyJa: '×: 裏側は同じ CLI。設定や権限の考え方は共通。' },
          { textJa: 'モデルが自動で賢くなる', whyJa: '×: UI とモデル性能は別物。' },
          { textJa: 'インターネット接続が不要になる', whyJa: '×: 推論はクラウドなので接続は必要。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't8-vscode-q2',
        type: 'mcq',
        promptJa: 'VS Code 拡張でも変わらず通用する考え方は？',
        options: [
          { textJa: 'settings.json や権限ルール', whyJa: '正解。裏側は同じ CLI なので設定は共通。' },
          { textJa: 'GUI 専用の独自設定言語', whyJa: '×: そんな独自言語は無い。' },
          { textJa: '権限の概念が消える', whyJa: '×: 権限はそのまま効く。' },
          { textJa: 'CLAUDE.md が読まれなくなる', whyJa: '×: CLAUDE.md は変わらず読まれる。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't8-vscode-case1',
        type: 'case',
        scenarioJa:
          'ターミナルの差分だと変更箇所が追いにくい。エディタ上で変更を見ながら一つずつ承認したい。',
        tags: ['vscode', 'diff'],
        feature: {
          promptJa: 'どれを使う？',
          options: [
            { id: 'vscode', labelJa: 'VS Code 拡張', correct: true, whyJa: 'インライン差分でエディタ上に変更を表示し、その場で承認/却下できる。' },
            { id: 'headless', labelJa: 'ヘッドレスモード', whyJa: '×: 無人実行用で、対話的な差分確認には向かない。' },
            { id: 'compact', labelJa: '/compact', whyJa: '×: 会話の圧縮で差分表示とは無関係。' },
            { id: 'screenshot', labelJa: 'スクリーンショットを撮る', whyJa: '×: 承認操作ができず非効率。' },
          ],
        },
        invoke: {
          promptJa: 'どう始める？',
          options: [
            { textJa: 'VS Code に拡張を入れ、サイドパネルから起動', correct: true, whyJa: '正解。拡張のパネルからインライン差分で作業できる。' },
            { textJa: 'ターミナルで claude --no-diff', whyJa: '×: そのようなフラグで GUI 差分にはならない。' },
            { textJa: 'settings.json に "ide": true を書く', whyJa: '×: 拡張導入が必要で、その設定では有効化されない。' },
            { textJa: 'git difftool を設定する', whyJa: '×: Claude の承認フローとは別物。' },
          ],
        },
        rewardJa: 'エディタ上で差分を一つずつ吟味。安心して変更を取り込めた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't8-mentions',
    tier: 't8',
    order: 2,
    title: '@-Mentions',
    titleJa: '@メンション参照',
    icon: '📎',
    requires: ['t8-vscode'],
    mapPos: { col: 2, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '@ でファイルや行範囲を文脈に追加できる。IDE 連携では行番号まで指定でき（例 @auth.ts#42-67）、ピンポイントで参照させられる。',
      blocks: [
        { type: 'lead', textJa: '「ここを見て」と地図に印をつける。それが @メンションだ。' },
        {
          type: 'list',
          titleJa: '参照のしかた',
          items: [
            { term: '@file', descJa: 'ファイル全体を文脈に追加。' },
            { term: '@auth.ts#42-67', descJa: '特定ファイルの行範囲を指定（IDE 連携時）。' },
          ],
        },
        { type: 'kbd', keys: '@', descJa: '入力中に @ を打つとファイル候補が出る。' },
        { type: 'tip', textJa: '大きなファイルは行範囲で絞ると、無駄な文脈を減らせる。' },
      ],
      links: [{ labelJa: '公式: @メンション', url: DOC }],
    },
    quiz: [
      {
        id: 't8-mentions-q1',
        type: 'mcq',
        promptJa: '`auth.ts` の 42〜67 行だけを参照させたい。正しい書き方は？',
        options: [
          { textJa: '@auth.ts#42-67', whyJa: '正解。# のあとに行範囲を指定する。' },
          { textJa: '#auth.ts@42-67', whyJa: '×: 記号の順序が逆で参照にならない。' },
          { textJa: 'auth.ts:42:67', whyJa: '×: それはエラー表示の記法。参照ではない。' },
          { textJa: '!auth.ts(42-67)', whyJa: '×: そのような記法は無い。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't8-mentions-q2',
        type: 'mcq',
        promptJa: '行範囲で参照する利点は？',
        options: [
          { textJa: '無駄な文脈を減らし、的を絞れる', whyJa: '正解。必要な箇所だけを渡せる。' },
          { textJa: 'モデルが高速化する設定だから', whyJa: '×: 速度設定ではない。' },
          { textJa: 'ファイルが自動修正される', whyJa: '×: 参照しただけでは修正されない。' },
          { textJa: '課金が無料になる', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't8-mentions-case1',
        type: 'case',
        scenarioJa:
          '巨大な `server.ts` のうち、認証ミドルウェアの一部分だけを見て直してほしい。全文は渡したくない。',
        tags: ['mentions', 'context'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'mention-range', labelJa: '@メンションで行範囲を参照', correct: true, whyJa: '該当行だけを文脈に追加でき、無駄を省ける。' },
            { id: 'paste-all', labelJa: '全文をコピペ', whyJa: '△: 動くが文脈が膨らみ非効率。' },
            { id: 'compact', labelJa: '/compact してから貼る', whyJa: '×: 会話圧縮であって部分参照の手段ではない。' },
            { id: 'rename', labelJa: 'ファイルを分割リネーム', whyJa: '×: 目的に対して過剰で副作用が大きい。' },
          ],
        },
        invoke: {
          promptJa: '具体的な記法は？',
          options: [
            { textJa: '@server.ts#120-160', correct: true, whyJa: '正解。# のあとに行範囲を指定する。' },
            { textJa: '@server.ts 全部', whyJa: '×: 全文参照になり目的に反する。' },
            { textJa: 'server.ts L120-160 と文章で書くだけ', whyJa: '△: 伝わる可能性はあるが確実な参照記法ではない。' },
            { textJa: 'grep だけ実行', whyJa: '×: 参照を渡したことにならない。' },
          ],
        },
        rewardJa: '必要な行だけを的確に渡し、修正は最小の文脈で決まった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't8-jetbrains',
    tier: 't8',
    order: 3,
    title: 'JetBrains',
    titleJa: 'JetBrains連携',
    icon: '🧠',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        'IntelliJ IDEA・PyCharm・WebStorm などの JetBrains IDE でも Claude Code を使え、ネイティブの差分ビューアで変更を確認できる。',
      blocks: [
        { type: 'lead', textJa: 'VS Code 派でなくとも安心。JetBrains の工房にも相棒は住める。' },
        {
          type: 'list',
          titleJa: '対応 IDE（例）',
          items: [
            { term: 'IntelliJ IDEA', descJa: 'Java/Kotlin など。' },
            { term: 'PyCharm', descJa: 'Python 開発向け。' },
            { term: 'WebStorm', descJa: 'JS/TS フロント開発向け。' },
          ],
        },
        { type: 'tip', textJa: 'プラグインを入れると、IDE のネイティブ差分ビューアで変更を確認できる。' },
      ],
      links: [{ labelJa: '公式: JetBrains 連携', url: DOC }],
    },
    quiz: [
      {
        id: 't8-jetbrains-q1',
        type: 'mcq',
        promptJa: 'JetBrains 連携の説明として正しいのは？',
        options: [
          { textJa: 'IntelliJ/PyCharm/WebStorm 等でネイティブ差分ビューアが使える', whyJa: '正解。JetBrains IDE のプラグインで利用できる。' },
          { textJa: 'VS Code でしか Claude Code は使えない', whyJa: '×: JetBrains にも対応している。' },
          { textJa: 'JetBrains 連携はモデルを変える', whyJa: '×: IDE 連携とモデルは別。' },
          { textJa: 'プラグイン不要で自動で有効', whyJa: '×: プラグイン導入が必要。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't8-jetbrains-q2',
        type: 'mcq',
        promptJa: 'PyCharm で Python プロジェクトを触っている。Claude Code は？',
        options: [
          { textJa: 'JetBrains プラグインで利用できる', whyJa: '正解。PyCharm も対応 IDE。' },
          { textJa: '使えないので VS Code に乗り換えるしかない', whyJa: '×: PyCharm でも使える。' },
          { textJa: 'ターミナルからも一切使えない', whyJa: '×: CLI はどこでも使える。' },
          { textJa: 'Web 版限定になる', whyJa: '×: そんな制限は無い。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't8-jetbrains-case1',
        type: 'case',
        scenarioJa:
          'チームは IntelliJ IDEA を標準にしている。VS Code には移りたくないが、IDE 内で差分を見ながら Claude を使いたい。',
        tags: ['jetbrains', 'ide'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'jetbrains', labelJa: 'JetBrains プラグイン連携', correct: true, whyJa: 'IntelliJ でもプラグインで Claude Code を使え、ネイティブ差分が見られる。' },
            { id: 'switch', labelJa: 'VS Code に乗り換える', whyJa: '×: 乗り換え不要。JetBrains に対応している。' },
            { id: 'web', labelJa: 'Web 版だけ使う', whyJa: '△: 使えるが IDE 内の差分体験は得られない。' },
            { id: 'giveup', labelJa: '諦めてターミナルのみ', whyJa: '△: 可能だが IDE 差分の利点を捨てている。' },
          ],
        },
        invoke: {
          promptJa: '導入は？',
          options: [
            { textJa: 'IntelliJ にプラグインを入れて連携する', correct: true, whyJa: '正解。プラグイン導入でネイティブ差分が使える。' },
            { textJa: 'IntelliJ をアンインストールする', whyJa: '×: 逆効果。' },
            { textJa: 'settings.json に "jetbrains": true', whyJa: '×: その設定では有効化されない。' },
            { textJa: 'VS Code 拡張を入れる', whyJa: '×: それは VS Code 用。IntelliJ には効かない。' },
          ],
        },
        rewardJa: '慣れた IntelliJ のまま、差分を見ながら相棒と作業できた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't8-checkpointing',
    tier: 't8',
    order: 4,
    title: 'Checkpointing & Rewind',
    titleJa: 'チェックポイント/巻き戻し',
    icon: '⏪',
    requires: [],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'チェックポイント機能は、ファイルを以前の状態へ巻き戻せる安全網。会話はそのまま保ちつつ、変更だけを取り消せる。',
      blocks: [
        { type: 'lead', textJa: '「しまった」を取り消せる。時を巻き戻す魔法、それがチェックポイント。' },
        {
          type: 'list',
          titleJa: 'ポイント',
          items: [
            { term: '巻き戻し', descJa: 'ファイルを直前のチェックポイント状態へ戻す。' },
            { term: '会話は保持', descJa: '巻き戻しても会話の文脈は失われない。' },
          ],
        },
        { type: 'warn', textJa: 'git のコミットとは別物。確実な保存は普段どおり git も併用する。' },
        { type: 'tip', textJa: '大きな自動変更の前後で活用すると、安心して試行錯誤できる。' },
      ],
      links: [{ labelJa: '公式: チェックポイント', url: DOC }],
    },
    quiz: [
      {
        id: 't8-checkpointing-q1',
        type: 'mcq',
        promptJa: 'チェックポイントで巻き戻すと、会話はどうなる？',
        options: [
          { textJa: '会話は保持され、ファイルだけが以前の状態に戻る', whyJa: '正解。文脈を保ったままファイルを復元できる。' },
          { textJa: '会話も全部消える', whyJa: '×: 会話は保持される。' },
          { textJa: 'git の履歴が書き換わる', whyJa: '×: git とは別の仕組み。' },
          { textJa: 'モデルが初期化される', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't8-checkpointing-q2',
        type: 'mcq',
        promptJa: 'チェックポイントと git の関係は？',
        options: [
          { textJa: '別物。確実な保存には git も併用するのが安全', whyJa: '正解。チェックポイントは手元の安全網で git の代替ではない。' },
          { textJa: 'git を完全に置き換える', whyJa: '×: 置き換えではない。' },
          { textJa: 'git が無いと動かない', whyJa: '×: 依存関係はそういう形ではない。' },
          { textJa: 'リモートに自動 push する', whyJa: '×: push はしない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't8-checkpointing-case1',
        type: 'case',
        scenarioJa:
          'Claude に大規模な自動リファクタをさせたが、結果が気に入らない。会話の流れは残したまま、ファイルだけ直前に戻したい。',
        tags: ['checkpoint', 'rewind'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            { id: 'rewind', labelJa: 'チェックポイント巻き戻し', correct: true, whyJa: '会話を保ったまま、ファイルを以前の状態へ復元できる。まさにこの用途。' },
            { id: 'clear', labelJa: '/clear で会話リセット', whyJa: '×: 会話が消え、ファイルも戻らない。' },
            { id: 'compact', labelJa: '/compact', whyJa: '×: 会話圧縮で、ファイル復元はできない。' },
            { id: 'undo-manual', labelJa: '手で全部書き戻す', whyJa: '△: 可能だが大規模だと手間と漏れのリスク。' },
          ],
        },
        invoke: {
          promptJa: '操作は？',
          options: [
            { textJa: 'チェックポイントから直前の状態へ巻き戻す', correct: true, whyJa: '正解。会話はそのまま、ファイルだけ復元される。' },
            { textJa: 'git reset --hard origin/main', whyJa: '×: 別物で、未コミットの状況次第では破壊的。' },
            { textJa: 'ターミナルを閉じて開き直す', whyJa: '×: 変更は戻らない。' },
            { textJa: '/clear する', whyJa: '×: 会話が消えるだけ。' },
          ],
        },
        rewardJa: '会話はそのまま、まずいリファクタだけを巻き戻せた。安全網に救われた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't8-terminal-pipes',
    tier: 't8',
    order: 5,
    title: 'Terminal & Pipes',
    titleJa: 'ターミナル連携/パイプ',
    icon: '🪈',
    requires: ['t8-vscode'],
    mapPos: { col: 3, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Claude Code は素の CLI なので、Unix パイプで他コマンドの出力を流し込める。ログ解析やワンライナー連携が自在になる。',
      blocks: [
        { type: 'lead', textJa: 'IDE だけが工房ではない。パイプ一本で、相棒は何でも食べる。' },
        {
          type: 'code',
          caption: 'ログの末尾を渡して解析させる',
          lang: 'bash',
          code: 'tail -200 app.log | claude -p "エラーの原因を要約して"',
        },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: 'ログ解析', descJa: 'tail / grep の出力をそのまま渡す。' },
            { term: 'スクリプト連携', descJa: '他コマンドの結果を文脈にして処理させる。' },
          ],
        },
        { type: 'tip', textJa: '`-p`（print/プロンプト）で一発実行に渡せる。CI やスクリプトと相性が良い。' },
      ],
      links: [{ labelJa: '公式: CLI とパイプ', url: DOC }],
    },
    quiz: [
      {
        id: 't8-terminal-pipes-q1',
        type: 'mcq',
        promptJa: 'アプリログの末尾 200 行を Claude に渡して原因を要約させたい。最も素直な方法は？',
        options: [
          { textJa: 'tail -200 app.log | claude -p "..."', whyJa: '正解。パイプで出力を流し込める。' },
          { textJa: 'ログを画像にして貼る', whyJa: '△: 可能だが手間で精度も落ちやすい。' },
          { textJa: 'ログ全体を手でコピペ', whyJa: '△: 動くが非効率。パイプの方が速い。' },
          { textJa: 'claude にログの場所を口頭で伝える', whyJa: '×: 中身を渡せていない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't8-terminal-pipes-q2',
        type: 'mcq',
        promptJa: 'パイプ連携が便利な理由は？',
        options: [
          { textJa: '素の CLI なので他コマンドの出力を直接流し込める', whyJa: '正解。Unix の流儀でつなげられる。' },
          { textJa: 'GUI でしか使えない機能だから', whyJa: '×: むしろ CLI の強み。' },
          { textJa: 'パイプを使うとモデルが変わる', whyJa: '×: モデルは変わらない。' },
          { textJa: 'ネット接続が不要になる', whyJa: '×: 推論はクラウド。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't8-terminal-pipes-case1',
        type: 'case',
        scenarioJa:
          '本番のエラーログ（数千行）から原因を素早く当たりたい。手でコピペはしたくない。',
        tags: ['cli', 'pipe', 'logs'],
        feature: {
          promptJa: 'どうやって渡す？',
          options: [
            { id: 'pipe', labelJa: 'Unix パイプで CLI に流し込む', correct: true, whyJa: 'tail/grep で絞った出力をそのまま claude に渡せる。最速で確実。' },
            { id: 'paste', labelJa: '全文コピペ', whyJa: '×: 数千行は非現実的。' },
            { id: 'mcp', labelJa: 'MCP サーバを自作する', whyJa: '×: 単発のログ解析には過剰。' },
            { id: 'screenshot', labelJa: 'スクショを撮る', whyJa: '×: 量も精度も不適。' },
          ],
        },
        invoke: {
          promptJa: '具体的なコマンドは？',
          options: [
            { textJa: 'grep ERROR app.log | tail -100 | claude -p "原因は？"', correct: true, whyJa: '正解。絞り込んでからパイプで渡すのが効率的。' },
            { textJa: 'claude app.log', whyJa: '×: ファイルを引数に渡してもパイプ連携の意図と異なる（中身を流していない）。' },
            { textJa: 'cat app.log > claude', whyJa: '×: リダイレクトはファイルへの書き込みで、起動にならない。' },
            { textJa: 'claude --headless だけ実行', whyJa: '×: ログを渡せていない。' },
          ],
        },
        rewardJa: 'パイプ一本でログを流し込み、原因に最短で迫れた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
