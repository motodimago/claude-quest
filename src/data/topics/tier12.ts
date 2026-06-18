import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 12: Customization（仕立て屋）=====
export const TIER12: Topic[] = [
  {
    id: 't12-keybindings',
    tier: 't12',
    order: 1,
    title: 'Keybindings',
    titleJa: 'キーバインド',
    icon: '⌨️',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'ショートカットは `~/.claude/keybindings.json` で再割当できる。手に馴染む操作系に仕立て直そう。',
      blocks: [
        { type: 'lead', textJa: '名工は道具を自分の手に合わせる。キーバインドは君の手綱だ。' },
        {
          type: 'list',
          titleJa: 'できること',
          items: [
            { term: '~/.claude/keybindings.json', descJa: '個人のキー割当を定義するファイル。' },
            { term: '再割当', descJa: '既定のショートカットを好みのキーへ変更。' },
            { term: 'チョード', descJa: '複数キーの連続押し（chord）も設定可能。' },
          ],
        },
        {
          type: 'code',
          caption: 'keybindings.json の一例',
          lang: 'json',
          code: '{\n  "keybindings": {\n    "submit": "ctrl+enter"\n  }\n}',
        },
        { type: 'tip', textJa: '迷ったら既定のまま。よく使う操作だけ少しずつ仕立て直すのがコツ。' },
      ],
      links: [{ labelJa: '公式: キーバインド', url: DOC }],
    },
    quiz: [
      {
        id: 't12-keybindings-q1',
        type: 'mcq',
        promptJa: 'キーバインドを個人用に再割当するファイルはどれ？',
        options: [
          { textJa: '~/.claude/keybindings.json', whyJa: '正解。個人のキー割当を定義する。' },
          { textJa: 'settings.json の permissions', whyJa: '×: 権限の定義で、キー割当ではない。' },
          { textJa: 'CLAUDE.md', whyJa: '×: 指示の記憶用で、キー設定の場所ではない。' },
          { textJa: '.env', whyJa: '×: 環境変数用。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't12-keybindings-q2',
        type: 'mcq',
        promptJa: 'キーバインドのカスタマイズ方針として最も無難なのは？',
        options: [
          { textJa: 'よく使う操作だけ少しずつ変更する', whyJa: '正解。混乱を避けつつ手に馴染ませられる。' },
          { textJa: '全ショートカットを一度に作り替える', whyJa: '△: 覚え直しの負担が大きく事故りやすい。' },
          { textJa: 'キー設定は変えてはいけない', whyJa: '×: 再割当は公式に用意された機能。' },
          { textJa: 'OS のキーマップだけで対応する', whyJa: '×: アプリ内の割当はアプリ側で行うのが確実。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't12-keybindings-case1',
        type: 'case',
        scenarioJa:
          '誤って Enter で送信してしまうことが多い。送信を「Ctrl+Enter」に変えて事故を減らしたい。',
        tags: ['keybindings', 'customize'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            {
              id: 'keybindings',
              labelJa: 'キーバインドの再割当',
              correct: true,
              whyJa: '送信などの操作キーを自分の好みに変更できる。まさにこの用途。',
            },
            { id: 'perm', labelJa: '権限ルール', whyJa: '×: ツール実行の許可制御で、キー操作とは無関係。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に書く', whyJa: '×: 指示の記憶であってキー割当は変えられない。' },
            { id: 'hook', labelJa: 'Hooks', whyJa: '×: イベント時のコマンド実行で、入力キーの割当ではない。' },
          ],
        },
        invoke: {
          promptJa: 'どこで設定する？',
          options: [
            {
              textJa: '~/.claude/keybindings.json で submit を ctrl+enter に',
              correct: true,
              whyJa: '正解。個人のキーバインド設定ファイルで送信キーを変更する。',
            },
            { textJa: 'settings.json の hooks', whyJa: '×: Hooks 設定でキー割当はできない。' },
            { textJa: 'OS のキーボード設定', whyJa: '×: アプリ内の送信操作はアプリ側で割り当てる。' },
            { textJa: 'package.json の scripts', whyJa: '×: 無関係。' },
          ],
        },
        rewardJa: '誤送信が止まり、落ち着いて入力できるようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't12-vim',
    tier: 't12',
    order: 2,
    title: 'Vim Mode',
    titleJa: 'Vimモード',
    icon: '📝',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '入力欄を Vim キーバインドで操作できる。Vim 使いなら h/j/k/l や dd で素早く編集できる。',
      blocks: [
        { type: 'lead', textJa: '手が Vim を覚えているなら、その記憶をそのまま武器にできる。' },
        {
          type: 'list',
          titleJa: 'ポイント',
          items: [
            { term: 'Vim モード', descJa: '入力テキストを Vim 流（ノーマル/挿入）で編集。' },
            { term: 'h j k l', descJa: 'カーソル移動など Vim の基本操作が効く。' },
            { term: '有効化', descJa: '設定からオン/オフを切り替える。' },
          ],
        },
        { type: 'tip', textJa: 'Vim に不慣れなら無理に使わなくてよい。慣れた人だけの時短機能。' },
      ],
      links: [{ labelJa: '公式: 入力とエディタ', url: DOC }],
    },
    quiz: [
      {
        id: 't12-vim-q1',
        type: 'mcq',
        promptJa: 'Vim モードは何を Vim 風に操作できるようにする？',
        options: [
          { textJa: 'プロンプト入力欄のテキスト編集', whyJa: '正解。入力のカーソル移動・編集が Vim 流になる。' },
          { textJa: 'git のコミット履歴', whyJa: '×: 履歴操作とは別物。' },
          { textJa: 'ファイルの権限', whyJa: '×: 権限とは無関係。' },
          { textJa: 'モデルの選択', whyJa: '×: モデル選択とは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't12-vim-q2',
        type: 'mcq',
        promptJa: 'Vim モードを使うべき人は？',
        options: [
          { textJa: '普段から Vim 操作に慣れている人', whyJa: '正解。慣れた操作で素早く編集でき時短になる。' },
          { textJa: 'Vim を全く知らない人にも必須', whyJa: '×: 不慣れならむしろ非効率。任意機能。' },
          { textJa: 'CI 上の無人実行で必須', whyJa: '×: 入力編集の話で無人実行とは無関係。' },
          { textJa: '権限を強化したい人', whyJa: '×: セキュリティ機能ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't12-vim-case1',
        type: 'case',
        scenarioJa: '長いプロンプトの途中を Vim 流（単語削除・行移動）でサッと直したい。',
        tags: ['vim', 'editing'],
        feature: {
          promptJa: 'どの機能を有効にする？',
          options: [
            { id: 'vim', labelJa: 'Vim モード', correct: true, whyJa: '入力欄で Vim の編集操作が使え、素早く直せる。' },
            { id: 'fast', labelJa: '高速モード', whyJa: '×: 推論を省く設定で、テキスト編集とは無関係。' },
            { id: 'keyb', labelJa: '送信キーの再割当', whyJa: '△: 送信キーは変えられるが Vim 流の編集操作は得られない。' },
            { id: 'output', labelJa: '出力形式の変更', whyJa: '×: 出力の話で入力編集とは別。' },
          ],
        },
        invoke: {
          promptJa: 'どう使い始める？',
          options: [
            { textJa: '設定で Vim モードを有効化する', correct: true, whyJa: '正解。オンにすれば入力欄が Vim 流になる。' },
            { textJa: 'CLAUDE.md に「Vim を使え」と書く', whyJa: '×: 指示では入力モードは切り替わらない。' },
            { textJa: '.env に VIM=1 を書く', whyJa: '×: そのような環境変数で切り替わらない。' },
            { textJa: 'Shift+Tab を押す', whyJa: '×: それは権限モードの循環切替。' },
          ],
        },
        rewardJa: '手癖のままに編集が進み、入力が一気に速くなった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't12-output-styles',
    tier: 't12',
    order: 3,
    title: 'Output Styles / Formats',
    titleJa: '出力スタイル/形式',
    icon: '🖨️',
    requires: [],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        '出力の形式は用途で切り替えられる。対話は streaming、スクリプト連携は json/print が便利。',
      blocks: [
        { type: 'lead', textJa: '同じ言葉も、見せ方ひとつで使い勝手が変わる。' },
        {
          type: 'list',
          titleJa: '主な形式',
          items: [
            { term: 'streaming', descJa: '対話向け。逐次表示される既定の見え方。' },
            { term: 'json', descJa: '機械処理向け。出力を構造化データで受け取る。' },
            { term: 'print', descJa: '一括出力。スクリプトやパイプ連携に向く。' },
          ],
        },
        {
          type: 'code',
          caption: 'CI でJSON出力を得る例',
          lang: 'bash',
          code: 'claude --headless --output-format json',
        },
        { type: 'tip', textJa: '他コマンドへ渡すなら json、人が読むなら streaming が基本。' },
      ],
      links: [{ labelJa: '公式: 出力形式', url: DOC }],
    },
    quiz: [
      {
        id: 't12-output-styles-q1',
        type: 'mcq',
        promptJa: '出力を別のスクリプトで機械的に処理したい。最適な出力形式は？',
        options: [
          { textJa: 'json', whyJa: '正解。構造化データとして安全にパースできる。' },
          { textJa: 'streaming', whyJa: '×: 人が読む逐次表示向けで機械処理に不向き。' },
          { textJa: '音声', whyJa: '×: そんな出力形式は機械処理に使えない。' },
          { textJa: 'スクリーンショット', whyJa: '×: 形式の選択肢ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't12-output-styles-q2',
        type: 'mcq',
        promptJa: '人と対話しながら作業する通常時に向く出力は？',
        options: [
          { textJa: 'streaming（逐次表示）', whyJa: '正解。応答が順次見えて対話に向く。' },
          { textJa: 'json', whyJa: '△: 機械処理向けで、対話では読みづらい。' },
          { textJa: 'print 一括のみ', whyJa: '△: 一括は連携向き。対話の体験は streaming が上。' },
          { textJa: '出力しない', whyJa: '×: 何も見えないのは論外。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't12-output-styles-case1',
        type: 'case',
        scenarioJa:
          'シェルスクリプトから Claude を呼び、その結果を別ツールに渡して自動処理したい。',
        tags: ['output', 'automation'],
        feature: {
          promptJa: 'どうする？',
          options: [
            {
              id: 'json',
              labelJa: '出力形式を JSON にする',
              correct: true,
              whyJa: '構造化データで受け取れ、後続ツールで確実にパースできる。',
            },
            { id: 'streaming', labelJa: 'streaming のまま受ける', whyJa: '×: 逐次表示は機械処理に向かず壊れやすい。' },
            { id: 'screenshot', labelJa: '画面をスクショして渡す', whyJa: '×: 自動処理に使えない。' },
            { id: 'copy', labelJa: '手でコピペする', whyJa: '×: 自動化にならない。' },
          ],
        },
        invoke: {
          promptJa: '具体的なコマンドは？',
          options: [
            { textJa: 'claude --headless --output-format json', correct: true, whyJa: '正解。無人実行＋JSON 出力で連携できる。' },
            { textJa: 'claude --output-format gif', whyJa: '×: そのような形式は無い。' },
            { textJa: 'claude --pretty', whyJa: '×: 機械処理向けの構造化にはならない。' },
            { textJa: 'claude serve', whyJa: '×: そのようなコマンドは無い。' },
          ],
        },
        rewardJa: '出力はきれいな JSON で流れ、後続処理がピタリと噛み合った。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't12-statusline',
    tier: 't12',
    order: 4,
    title: 'Status Line',
    titleJa: 'ステータスライン',
    icon: '📊',
    requires: ['t12-keybindings'],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '画面下部のステータスラインは、表示内容を自分好みにカスタマイズできる。今の状態を一目で把握。',
      blocks: [
        { type: 'lead', textJa: '良い装備には良い計器がある。ステータスラインは君の計器盤だ。' },
        {
          type: 'list',
          titleJa: '表示できる例',
          items: [
            { term: 'モデル', descJa: '現在使っているモデル名。' },
            { term: 'ブランチ', descJa: '作業中の git ブランチ。' },
            { term: '使用量', descJa: 'コンテキストやコストの目安。' },
          ],
        },
        { type: 'tip', textJa: '情報を盛りすぎると見づらい。本当に必要なものだけ並べよう。' },
      ],
      links: [{ labelJa: '公式: ステータスライン', url: DOC }],
    },
    quiz: [
      {
        id: 't12-statusline-q1',
        type: 'mcq',
        promptJa: 'ステータスラインの役割として正しいのは？',
        options: [
          { textJa: '現在の状態（モデルやブランチ等）を一目で示す', whyJa: '正解。状況把握のための計器盤。' },
          { textJa: 'ファイルを自動でフォーマットする', whyJa: '×: それは Hooks の役割。' },
          { textJa: '権限を強制する', whyJa: '×: 権限制御とは別物。' },
          { textJa: 'モデルを自動で切り替える', whyJa: '×: 表示であって切替機能ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't12-statusline-q2',
        type: 'mcq',
        promptJa: 'ステータスラインを仕立てるコツは？',
        options: [
          { textJa: '必要な情報だけに絞る', whyJa: '正解。盛りすぎは見づらい。要点だけ表示。' },
          { textJa: 'できる限り多くの項目を詰め込む', whyJa: '△: 視認性が落ち本末転倒。' },
          { textJa: '常に空にしておく', whyJa: '△: 計器が無いと状況が掴めない。' },
          { textJa: '毎分内容を入れ替える', whyJa: '×: 安定しないと逆に分かりにくい。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't12-statusline-case1',
        type: 'case',
        scenarioJa:
          '今どのモデルで、どのブランチで作業しているかを常に画面で確認できるようにしたい。',
        tags: ['statusline', 'customize'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'statusline', labelJa: 'ステータスラインのカスタマイズ', correct: true, whyJa: 'モデルやブランチを常時表示でき、まさにこの用途。' },
            { id: 'context', labelJa: '/context', whyJa: '△: トークンの内訳確認用。常時表示の計器ではない。' },
            { id: 'usage', labelJa: '/usage', whyJa: '△: 使用量の確認用で、常時のモデル/ブランチ表示ではない。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md', whyJa: '×: 指示の記憶で、画面表示の設定ではない。' },
          ],
        },
        invoke: {
          promptJa: 'どう設定する？',
          options: [
            { textJa: 'ステータスライン設定でモデルとブランチを表示項目に加える', correct: true, whyJa: '正解。表示項目を選んで計器盤を仕立てる。' },
            { textJa: 'permissions.allow に追加', whyJa: '×: 権限で表示は変わらない。' },
            { textJa: '.env にブランチ名を書く', whyJa: '×: 表示の設定場所ではない。' },
            { textJa: 'Esc を2回押す', whyJa: '×: メッセージの遡り操作で無関係。' },
          ],
        },
        rewardJa: '計器盤に状態が灯り、迷わず作業できるようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't12-voice',
    tier: 't12',
    order: 5,
    title: 'Voice Dictation',
    titleJa: '音声入力',
    icon: '🎙️',
    requires: [],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        'タイプの代わりに音声でプロンプトを入力できる。長い指示や手がふさがっている時に便利。',
      blocks: [
        { type: 'lead', textJa: '声もまた入力だ。手を止めずに指示を飛ばせる。' },
        {
          type: 'list',
          titleJa: 'ポイント',
          items: [
            { term: '音声入力', descJa: '話した内容をプロンプトとして入力。' },
            { term: 'スペース長押し', descJa: '押している間だけ録音する操作が基本。' },
            { term: '用途', descJa: '長文の口述や、タイピングしづらい状況で活躍。' },
          ],
        },
        { type: 'kbd', keys: 'Space 長押し', descJa: '押している間だけ音声を録音する。' },
        { type: 'tip', textJa: '専門用語や記号は誤認識しやすい。要所は後でテキストで補おう。' },
      ],
      links: [{ labelJa: '公式: 音声入力', url: DOC }],
    },
    quiz: [
      {
        id: 't12-voice-q1',
        type: 'mcq',
        promptJa: '音声入力の基本操作として説明されるのは？',
        options: [
          { textJa: 'スペースを長押ししている間だけ録音する', whyJa: '正解。押している間だけ音声を取り込む。' },
          { textJa: '常時録音し続ける', whyJa: '×: 押している間だけが基本で、常時録音ではない。' },
          { textJa: 'Enter を押すと録音開始', whyJa: '×: Enter は送信寄りの操作。' },
          { textJa: 'マウスでドラッグする', whyJa: '×: 音声録音の操作ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't12-voice-q2',
        type: 'mcq',
        promptJa: '音声入力を使うと特に便利な場面は？',
        options: [
          { textJa: '長い指示を口述したい・手がふさがっている時', whyJa: '正解。タイプの負担を減らせる。' },
          { textJa: '機密の API キーを読み上げたい時', whyJa: '×: 機密情報の読み上げは避けるべき。' },
          { textJa: 'CI の無人実行', whyJa: '×: 無人実行に音声入力は使わない。' },
          { textJa: '権限を強化したい時', whyJa: '×: セキュリティ機能ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't12-voice-case1',
        type: 'case',
        scenarioJa:
          '両手で資料を持ったまま、長めの実装方針を Claude に口頭で伝えたい。',
        tags: ['voice', 'input'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            { id: 'voice', labelJa: '音声入力', correct: true, whyJa: 'タイプせず話すだけで長い指示を入力できる。まさにこの用途。' },
            { id: 'vim', labelJa: 'Vim モード', whyJa: '×: テキスト編集の効率化で、音声入力ではない。' },
            { id: 'paste', labelJa: 'クリップボード貼り付け', whyJa: '△: 結局タイプ/コピーが要り、手がふさがる状況に不向き。' },
            { id: 'output', labelJa: '出力形式の変更', whyJa: '×: 出力の話で入力手段とは別。' },
          ],
        },
        invoke: {
          promptJa: 'どう操作する？',
          options: [
            { textJa: 'スペースを長押しして話す', correct: true, whyJa: '正解。押している間だけ録音して音声で入力する。' },
            { textJa: 'Ctrl+B を押す', whyJa: '×: バックグラウンド化で無関係。' },
            { textJa: '/voice on と打つ', whyJa: '×: タイプが必要で、確立した基本操作はスペース長押し。' },
            { textJa: 'Shift+Tab を押す', whyJa: '×: 権限モードの切替で無関係。' },
          ],
        },
        rewardJa: '手を止めずに方針を伝えきった。声もまた立派な武器だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
