import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 11: Debugging（迷宮の灯）=====
export const TIER11: Topic[] = [
  {
    id: 't11-debug',
    tier: 't11',
    order: 1,
    title: '/debug',
    titleJa: '/debug（詳細ログ）',
    icon: '🔦',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '/debug は詳細ログを有効化し、Claude が裏で何をしているか（ツール呼び出し・読み込んだ設定など）を可視化する。迷宮で手にする灯火だ。',
      blocks: [
        { type: 'lead', textJa: '原因が見えない時は、まず灯りをともす。/debug が暗闇を照らす。' },
        {
          type: 'list',
          titleJa: '見えるようになるもの',
          items: [
            { term: 'ツール呼び出し', descJa: 'どのツールをどんな引数で実行したか。' },
            { term: '読み込んだ設定', descJa: 'どの設定・ルールが効いているか。' },
            { term: 'エラーの詳細', descJa: '失敗時の生のメッセージ。' },
          ],
        },
        { type: 'code', caption: 'REPL内で有効化', lang: 'text', code: '/debug' },
        { type: 'tip', textJa: '「なぜか期待通り動かない」時の最初の一手にすると早い。' },
      ],
      links: [{ labelJa: '公式: デバッグ', url: DOC }],
    },
    quiz: [
      {
        id: 't11-debug-q1',
        type: 'mcq',
        promptJa: 'Claude の挙動が不可解。何が起きているか詳細を見るには？',
        options: [
          { textJa: '/debug で詳細ログを有効化', whyJa: '正解。内部の動作が見えるようになる。' },
          { textJa: 'ターミナルを再起動', whyJa: '×: 状況は見えないまま。' },
          { textJa: '/clear で会話を消す', whyJa: '×: 原因の手がかりも消えてしまう。' },
          { textJa: '何もせず待つ', whyJa: '×: 可視化しないと原因に近づけない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't11-debug-q2',
        type: 'mcq',
        promptJa: '/debug を使う主な目的は？',
        options: [
          { textJa: 'ツール呼び出しや読み込まれた設定など内部動作を可視化する', whyJa: '正解。挙動の根拠が見える。' },
          { textJa: 'モデルを高速モードに切り替える', whyJa: '×: それは別機能。' },
          { textJa: '権限をすべて許可する', whyJa: '×: デバッグは権限変更ではない。' },
          { textJa: '会話を要約する', whyJa: '×: それは /compact の役割。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't11-debug-case1',
        type: 'case',
        scenarioJa:
          'あるコマンドが意図せずスキップされている気がする。本当に実行されたのか、何が効いているのかを突き止めたい。',
        tags: ['debug', 'logging'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            { id: 'debug', labelJa: '/debug で詳細ログを見る', correct: true, whyJa: '実際のツール呼び出しと効いている設定が見え、原因に直結する。' },
            { id: 'guess', labelJa: '勘で設定をいじる', whyJa: '×: 当てずっぽうは遠回り。まず可視化が先。' },
            { id: 'reinstall', labelJa: '再インストールする', whyJa: '×: 過剰。原因が分からないままやり直すだけ。' },
            { id: 'clear', labelJa: '/clear する', whyJa: '×: 手がかりごと消える。' },
          ],
        },
        invoke: {
          promptJa: '具体的な操作は？',
          options: [
            { textJa: 'REPLで /debug を実行してから再現させる', correct: true, whyJa: '正解。ログを有効化して同じ操作を再現すれば差分が見える。' },
            { textJa: 'settings.json に debug: true と書くだけ', whyJa: '×: REPLコマンドで有効化するのが基本。' },
            { textJa: 'Ctrl+B を押す', whyJa: '×: バックグラウンド化でデバッグとは無関係。' },
            { textJa: 'Esc を連打する', whyJa: '×: 中断するだけ。' },
          ],
        },
        rewardJa: '灯りに照らされ、スキップの原因がはっきり見えた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't11-memory-inspect',
    tier: 't11',
    order: 2,
    title: '/memory',
    titleJa: '/memory で確認',
    icon: '📖',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '/memory は、いま読み込まれている CLAUDE.md や各種ルールを一覧・点検するためのコマンド。「指示が効いていない」時の確認に使う。',
      blocks: [
        { type: 'lead', textJa: '指示したはずなのに従わない——その時はまず、書庫に何が並んでいるか見に行く。' },
        {
          type: 'list',
          titleJa: '/memory で分かること',
          items: [
            { term: 'CLAUDE.md', descJa: 'どのスコープのものが読み込まれているか。' },
            { term: 'パス別ルール', descJa: 'ネストした指示が効いているか。' },
            { term: '自動メモリ', descJa: '保存された学びの内容。' },
          ],
        },
        { type: 'code', caption: 'REPL内で確認・編集', lang: 'text', code: '/memory' },
        { type: 'warn', textJa: '指示が無視される時、そもそも読み込まれていないことが多い。まず /memory で確認。' },
      ],
      links: [{ labelJa: '公式: メモリ', url: DOC }],
    },
    quiz: [
      {
        id: 't11-memory-inspect-q1',
        type: 'mcq',
        promptJa: 'CLAUDE.md に書いた指示が効いていないか確認したい。最初に使うのは？',
        options: [
          { textJa: '/memory で読み込み状況を点検', whyJa: '正解。何が読み込まれているか一覧できる。' },
          { textJa: '/debug でモデルを変える', whyJa: '×: /debug はモデル変更ではない。' },
          { textJa: 'ファイルを削除する', whyJa: '×: 確認前の削除は危険。' },
          { textJa: 'CLAUDE.md をもう一度書き直す', whyJa: '△: まず読み込まれているか確認する方が先。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't11-memory-inspect-q2',
        type: 'mcq',
        promptJa: '/memory コマンドの役割として正しいのは？',
        options: [
          { textJa: '読み込まれた CLAUDE.md やルールを一覧・編集する', whyJa: '正解。記憶の中身を点検できる。' },
          { textJa: '会話を圧縮する', whyJa: '×: それは /compact。' },
          { textJa: 'トークン使用量を表示する', whyJa: '×: それは /usage。' },
          { textJa: 'ターミナルのキー設定を直す', whyJa: '×: それは /terminal-setup。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't11-memory-inspect-case1',
        type: 'case',
        scenarioJa:
          'チームの CLAUDE.md に「2スペースインデント」と書いたのに守られない。原因を切り分けたい。',
        tags: ['memory', 'rules'],
        feature: {
          promptJa: 'どの機能で切り分ける？',
          options: [
            { id: 'memory', labelJa: '/memory で読み込み状況を確認', correct: true, whyJa: 'そもそも該当 CLAUDE.md が読み込まれているかが一目で分かり、切り分けが進む。' },
            { id: 'rewrite', labelJa: 'とりあえず書き直す', whyJa: '△: 読み込まれていないなら何度書いても無駄。確認が先。' },
            { id: 'permission', labelJa: '権限を変更する', whyJa: '×: 権限の問題ではない。' },
            { id: 'restart', labelJa: 'PCを再起動する', whyJa: '×: 無関係。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '/memory を実行し、対象の CLAUDE.md が一覧にあるか見る', correct: true, whyJa: '正解。読み込まれていなければスコープや配置場所を疑う。' },
            { textJa: '/usage を実行する', whyJa: '×: 使用量表示で目的外。' },
            { textJa: '/debug でモデルを変える', whyJa: '×: /debug はログ可視化でモデル変更ではない。' },
            { textJa: '.env を確認する', whyJa: '×: CLAUDE.md の読み込みは .env では分からない。' },
          ],
        },
        rewardJa: '読み込まれていなかったと判明。配置場所を直したら指示が効いた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't11-hooks-debug',
    tier: 't11',
    order: 3,
    title: 'Hooks Debugging',
    titleJa: 'Hooksのデバッグ',
    icon: '🪝',
    requires: ['t11-debug'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'Hooks（自動実行）が思い通りに発火しない時は、どのフックが・いつ・どんな結果で動いたかをログで確認する。/debug と組み合わせると追いやすい。',
      blocks: [
        { type: 'lead', textJa: '仕掛けた罠（フック）が作動しない。なら、作動ログをたどればいい。' },
        {
          type: 'list',
          titleJa: '確認のポイント',
          items: [
            { term: 'イベント種別', descJa: 'PreToolUse / PostToolUse など、想定のイベントか。' },
            { term: 'マッチ条件', descJa: '対象ツールやパターンに一致しているか。' },
            { term: '終了コード', descJa: 'コマンドが失敗していないか。' },
          ],
        },
        { type: 'kbd', keys: '/debug', descJa: 'フックの発火と結果がログに出るようになる。' },
        { type: 'tip', textJa: 'まず /debug で発火の有無を確認 → 次に settings.json のマッチ条件を見直す。' },
      ],
      links: [{ labelJa: '公式: Hooks', url: DOC }],
    },
    quiz: [
      {
        id: 't11-hooks-debug-q1',
        type: 'mcq',
        promptJa: '設定した Hook が発火しているか確認する近道は？',
        options: [
          { textJa: '/debug を有効にしてフックの発火ログを見る', whyJa: '正解。発火の有無と結果が見える。' },
          { textJa: 'CLAUDE.md に「フックを動かして」と書く', whyJa: '×: フックは指示文では制御しない。' },
          { textJa: 'モデルを Opus に変える', whyJa: '×: 無関係。' },
          { textJa: 'ブラウザの開発者ツールを開く', whyJa: '×: CLI のフックには使えない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't11-hooks-debug-q2',
        type: 'mcq',
        promptJa: 'PostToolUse フックが「動かない」。まず疑うべきは？',
        options: [
          { textJa: 'イベント種別やマッチ条件が対象に一致しているか', whyJa: '正解。条件不一致が最も多い原因。' },
          { textJa: 'パソコンの電源', whyJa: '×: 関係ない。' },
          { textJa: '画面の明るさ', whyJa: '×: 関係ない。' },
          { textJa: 'ネット回線速度', whyJa: '×: フック発火の条件とは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't11-hooks-debug-case1',
        type: 'case',
        scenarioJa:
          '編集後に prettier を走らせる PostToolUse フックを設定したのに整形されない。原因を特定したい。',
        tags: ['hooks', 'debug'],
        feature: {
          promptJa: 'どう進める？',
          options: [
            { id: 'debug', labelJa: '/debug でフックの発火ログを確認', correct: true, whyJa: '発火しているか/失敗しているかが分かり、設定とコマンドのどちらが原因か切り分けられる。' },
            { id: 'reinstall', labelJa: 'prettier を入れ直す', whyJa: '△: 発火していないなら入れ直しても無意味。まず可視化。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に整形指示を書く', whyJa: '×: 自動実行の検証にはならない。' },
            { id: 'ignore', labelJa: '手で整形する', whyJa: '×: 自動化の目的を放棄している。' },
          ],
        },
        invoke: {
          promptJa: '確認の手順は？',
          options: [
            { textJa: '/debug を有効化→編集を再現→発火とコマンド終了コードを見る', correct: true, whyJa: '正解。発火していなければマッチ条件、発火しても失敗ならコマンドを疑う。' },
            { textJa: 'settings.json を消す', whyJa: '×: 設定ごと失うだけ。' },
            { textJa: 'Ctrl+C を押す', whyJa: '×: 中断で原因は分からない。' },
            { textJa: 'モデルを変える', whyJa: '×: フックの問題はモデルとは無関係。' },
          ],
        },
        rewardJa: 'ログでマッチ条件のズレを発見。条件を直すと自動整形が復活した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't11-terminal-setup',
    tier: 't11',
    order: 4,
    title: '/terminal-setup',
    titleJa: '/terminal-setup',
    icon: '⌨️',
    requires: [],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        '/terminal-setup は、ターミナルのキーバインドが効かない・改行できない等の不具合を直すためのセットアップコマンド。',
      blocks: [
        { type: 'lead', textJa: '入力がうまく通らない時は、扉（ターミナル）の建て付けを直そう。' },
        {
          type: 'list',
          titleJa: 'よくある症状',
          items: [
            { term: 'Shift+Enter で改行できない', descJa: '複数行入力がしづらい。' },
            { term: 'キーが効かない', descJa: '特定のショートカットが無反応。' },
          ],
        },
        { type: 'code', caption: 'REPL内で実行', lang: 'text', code: '/terminal-setup' },
        { type: 'tip', textJa: '導入直後に一度走らせておくと、入力周りのトラブルを未然に防げる。' },
      ],
      links: [{ labelJa: '公式: ターミナル設定', url: DOC }],
    },
    quiz: [
      {
        id: 't11-terminal-setup-q1',
        type: 'mcq',
        promptJa: 'ターミナルで Shift+Enter の改行が効かない。直すには？',
        options: [
          { textJa: '/terminal-setup を実行する', whyJa: '正解。キーバインド周りを整える。' },
          { textJa: '/debug を実行する', whyJa: '×: ログ可視化で入力設定は直らない。' },
          { textJa: 'CLAUDE.md に書く', whyJa: '×: ターミナル設定は指示文では直らない。' },
          { textJa: 'モデルを変える', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't11-terminal-setup-q2',
        type: 'mcq',
        promptJa: '/terminal-setup はいつ走らせると良い？',
        options: [
          { textJa: '導入直後や入力の不具合が出た時', whyJa: '正解。トラブル予防・解消に有効。' },
          { textJa: 'コミットのたびに毎回', whyJa: '×: 毎回必要なものではない。' },
          { textJa: '本番デプロイ時のみ', whyJa: '×: デプロイとは無関係。' },
          { textJa: '使ってはいけない', whyJa: '×: 入力不具合の解消に使う正規コマンド。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't11-terminal-setup-case1',
        type: 'case',
        scenarioJa:
          '複数行のプロンプトを書きたいのに Shift+Enter が改行にならず、送信されてしまう。',
        tags: ['terminal', 'keybindings'],
        feature: {
          promptJa: 'どう解決する？',
          options: [
            { id: 'setup', labelJa: '/terminal-setup でキーバインドを整える', correct: true, whyJa: 'ターミナル側のキー設定を整え、改行などの入力不具合を解消できる。' },
            { id: 'keybind-json', labelJa: 'いきなり keybindings.json を手書き', whyJa: '△: まず公式の整備コマンドを試す方が確実で早い。' },
            { id: 'debug', labelJa: '/debug を使う', whyJa: '×: ログ可視化で入力は直らない。' },
            { id: 'newterm', labelJa: '別のターミナルアプリに乗り換える', whyJa: '×: 過剰。設定で直ることが多い。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: 'REPLで /terminal-setup を実行する', correct: true, whyJa: '正解。案内に従えば改行などのキー設定が整う。' },
            { textJa: '/compact を実行する', whyJa: '×: 会話圧縮で無関係。' },
            { textJa: 'Esc を連打する', whyJa: '×: 中断するだけ。' },
            { textJa: 'settings.json に terminal: true と書く', whyJa: '×: そのような設定で直るわけではない。' },
          ],
        },
        rewardJa: '扉の建て付けが直り、複数行プロンプトが快適に書けるようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't11-permission-dialog',
    tier: 't11',
    order: 5,
    title: 'Permission Dialog',
    titleJa: '権限ダイアログの読み方',
    icon: '🔐',
    requires: ['t11-debug'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '操作のたびに確認ダイアログが出るのは、その操作が許可ルールに無い（または要確認）から。理由を読み取れば、許可するか・ルール化するか判断できる。',
      blocks: [
        { type: 'lead', textJa: '門番が立ち止まるのには理由がある。問いを読めば、進む道が見える。' },
        {
          type: 'list',
          titleJa: 'ダイアログが出る主な理由',
          items: [
            { term: '未許可の操作', descJa: 'allow に無いコマンド/ファイル操作。' },
            { term: '要確認の操作', descJa: '既定で確認が必要な重要操作。' },
            { term: 'deny との関係', descJa: '拒否ルールに触れていないかも確認。' },
          ],
        },
        { type: 'tip', textJa: '毎回出て煩わしいなら、安全な操作だけ permissions.allow に追加すると確認を省ける。' },
        { type: 'warn', textJa: '理由を読まずに何でも許可しないこと。危険な操作はその場で止めるのが安全。' },
      ],
      links: [{ labelJa: '公式: 権限', url: DOC }],
    },
    quiz: [
      {
        id: 't11-permission-dialog-q1',
        type: 'mcq',
        promptJa: '同じ安全なコマンドで毎回確認ダイアログが出る。煩わしさを減らす正しい方法は？',
        options: [
          { textJa: 'そのコマンドを permissions.allow に追加する', whyJa: '正解。安全な操作だけ許可すれば確認を省ける。' },
          { textJa: '全操作を bypass にする', whyJa: '×: 危険な操作まで無確認になる。やり過ぎ。' },
          { textJa: 'ダイアログを無視して待つ', whyJa: '×: 進まない。' },
          { textJa: 'CLAUDE.md に「確認しないで」と書く', whyJa: '△: 確認の制御は権限ルールの役目。確実ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't11-permission-dialog-q2',
        type: 'mcq',
        promptJa: '権限ダイアログが出る根本的な理由は？',
        options: [
          { textJa: 'その操作が許可ルールに無い、または要確認だから', whyJa: '正解。許可状況が理由になる。' },
          { textJa: 'ネットワークが遅いから', whyJa: '×: 通信速度とは無関係。' },
          { textJa: 'モデルが古いから', whyJa: '×: モデルの新旧とは無関係。' },
          { textJa: '画面が小さいから', whyJa: '×: 表示サイズとは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't11-permission-dialog-case1',
        type: 'case',
        scenarioJa:
          'テストコマンド `npm test` のたびに確認ダイアログが出て作業が止まる。安全なので確認を省きたいが、他の危険操作は確認を残したい。',
        tags: ['permissions', 'workflow'],
        feature: {
          promptJa: 'どう対処する？',
          options: [
            { id: 'allow', labelJa: '権限の allow に該当コマンドだけ追加', correct: true, whyJa: '安全な操作だけ無確認にでき、危険操作の確認は残せる。狙い通り。' },
            { id: 'bypass', labelJa: 'bypassPermissions モードにする', whyJa: '×: すべて無確認になり危険操作も素通り。' },
            { id: 'ignore', labelJa: '毎回ポチポチ承認し続ける', whyJa: '△: 動くが非効率。許可ルール化が本筋。' },
            { id: 'deny', labelJa: 'deny に npm test を入れる', whyJa: '×: 逆に実行できなくなる。' },
          ],
        },
        invoke: {
          promptJa: 'どう設定する？',
          options: [
            { textJa: 'permissions.allow に "Bash(npm test:*)" を追加', correct: true, whyJa: '正解。そのパターンのみ無確認で許可される。' },
            { textJa: 'permissions.deny に "Bash(npm test:*)"', whyJa: '×: 拒否になってしまう。' },
            { textJa: 'permissions.allow に "Bash(*)"', whyJa: '×: 全 Bash 許可は範囲が広すぎて危険。' },
            { textJa: '/terminal-setup を実行', whyJa: '×: キー設定の修正で権限とは無関係。' },
          ],
        },
        rewardJa: '門番は安全なコマンドを通し、危険な操作だけ確認するように。流れが取り戻せた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
