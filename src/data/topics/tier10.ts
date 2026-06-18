import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 10: Security & Enterprise（王国の城壁）=====
export const TIER10: Topic[] = [
  {
    id: 't10-managed-settings',
    tier: 't10',
    order: 1,
    title: 'Managed Settings',
    titleJa: '管理者設定（managed-settings.json）',
    icon: '🏰',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 5,
    study: {
      summaryJa:
        'managed-settings.json は組織がマシンに配布する設定で、ユーザーやプロジェクト設定では上書きできない最優先のポリシー。城壁のように全体を守る。',
      blocks: [
        { type: 'lead', textJa: '王国を守る最も外側の城壁。誰も勝手には壊せない、組織の掟だ。' },
        {
          type: 'list',
          titleJa: '特徴',
          items: [
            { term: '最優先', descJa: 'user / project / local のどの設定よりも強い。' },
            { term: '上書き不可', descJa: '従業員が settings.json で緩めることはできない。' },
            { term: 'IT/管理者が配布', descJa: 'MDM などでマシンに配置する。' },
          ],
        },
        {
          type: 'code',
          caption: '配置場所（OS により異なる・例）',
          lang: 'text',
          code: 'macOS:  /Library/Application Support/ClaudeCode/managed-settings.json\nLinux:  /etc/claude-code/managed-settings.json',
        },
        {
          type: 'code',
          caption: '中身の例（curl を禁止）',
          lang: 'json',
          code: '{\n  "permissions": {\n    "deny": ["Bash(curl:*)"]\n  }\n}',
        },
        { type: 'warn', textJa: '強力ゆえ慎重に。配布前に最小限のポリシーで検証する。' },
      ],
      links: [{ labelJa: '公式: 管理者設定', url: DOC }],
    },
    quiz: [
      {
        id: 't10-managed-settings-q1',
        type: 'mcq',
        promptJa: '従業員が絶対に緩められない組織ポリシーを課すには、どの設定を使う？',
        options: [
          { textJa: 'managed-settings.json', whyJa: '正解。最優先で、ユーザー/プロジェクト設定では上書きできない。' },
          { textJa: 'settings.json（プロジェクト）', whyJa: '×: 個人や別設定で上書きされうる。' },
          { textJa: 'settings.local.json', whyJa: '×: 個人用の上書き設定。強制力は無い。' },
          { textJa: 'CLAUDE.md', whyJa: '×: 指示の記憶であり強制ポリシーではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't10-managed-settings-q2',
        type: 'mcq',
        promptJa: 'managed-settings.json と project の settings.json で設定が衝突したら？',
        options: [
          { textJa: 'managed-settings.json が勝つ', whyJa: '正解。管理者設定が最優先。' },
          { textJa: 'project が勝つ', whyJa: '×: 管理者設定の方が強い。' },
          { textJa: '後から読まれた方が勝つ', whyJa: '×: 読み込み順ではなく優先度で決まる。' },
          { textJa: 'エラーで起動しない', whyJa: '×: 衝突しても優先度で解決される。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't10-managed-settings-case1',
        type: 'case',
        scenarioJa:
          '全社で、どの開発者も `curl` を実行できないように強制したい。個人設定で勝手に解除されては困る。',
        tags: ['enterprise', 'policy'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            {
              id: 'managed',
              labelJa: 'managed-settings.json',
              correct: true,
              whyJa: '上書き不可の最優先設定。全社強制に最適。',
            },
            { id: 'project', labelJa: 'プロジェクトの settings.json', whyJa: '×: 個人設定で上書きされうる。' },
            { id: 'local', labelJa: 'settings.local.json', whyJa: '×: そもそも個人用で強制力が無い。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に「curl 禁止」と書く', whyJa: '△: 指示であり強制ではない。確実性に欠ける。' },
          ],
        },
        invoke: {
          promptJa: 'どう書く？',
          options: [
            { textJa: 'managed の permissions.deny に "Bash(curl:*)"', correct: true, whyJa: '正解。deny は最優先で拒否される。' },
            { textJa: 'permissions.allow に "Bash(curl:*)"', whyJa: '×: 逆に許可してしまう。' },
            { textJa: '.env に CURL=off と書く', whyJa: '×: 権限の定義場所ではない。' },
            { textJa: 'CLAUDE.md の先頭に書く', whyJa: '×: 強制ポリシーの置き場所ではない。' },
          ],
        },
        rewardJa: '城壁は固く、誰も掟を破れない。全社のセキュリティが一段上がった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't10-deny-rules',
    tier: 't10',
    order: 2,
    title: 'Permission Deny Rules',
    titleJa: '拒否ルール',
    icon: '🚫',
    requires: ['t10-managed-settings'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        '拒否ルール（permissions.deny）は、特定のツールやパスを明示的にブロックする仕組み。deny は allow より強く、確実に封じられる。',
      blocks: [
        { type: 'lead', textJa: '「これは絶対に通すな」を宣言する門番。allow と争えば deny が勝つ。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: '危険コマンド', descJa: 'rm・curl・本番デプロイなどを封じる。' },
            { term: '機密パス', descJa: '`Read(./secrets/**)` のように読み取りを禁止。' },
            { term: 'allow より優先', descJa: 'allow と重なっても deny が勝つ。' },
          ],
        },
        {
          type: 'code',
          caption: 'settings.json の例',
          lang: 'json',
          code: '{\n  "permissions": {\n    "deny": ["Bash(rm:*)", "Read(./.env)"]\n  }\n}',
        },
        { type: 'tip', textJa: '「許可は広く、危険だけ deny」より「必要だけ allow」の方が安全度は高い。' },
      ],
      links: [{ labelJa: '公式: 権限の拒否ルール', url: DOC }],
    },
    quiz: [
      {
        id: 't10-deny-rules-q1',
        type: 'mcq',
        promptJa: '同じコマンドが allow と deny の両方に該当した。どうなる？',
        options: [
          { textJa: 'deny が優先され拒否される', whyJa: '正解。deny は allow より強い。' },
          { textJa: 'allow が優先され許可される', whyJa: '×: 逆。安全側の deny が勝つ。' },
          { textJa: '毎回確認になる', whyJa: '×: deny に該当すれば確認なく拒否。' },
          { textJa: 'ランダムに決まる', whyJa: '×: 明確な優先順位がある。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't10-deny-rules-q2',
        type: 'mcq',
        promptJa: '`.env` ファイルを Claude に読ませたくない。最も確実な設定は？',
        options: [
          { textJa: 'permissions.deny に "Read(./.env)"', whyJa: '正解。読み取りツールをパス指定で拒否する。' },
          { textJa: 'CLAUDE.md に「.env を読まないで」と書く', whyJa: '△: 指示にはなるが強制ではない。' },
          { textJa: '.env をリネームする', whyJa: '×: 運用が壊れる。本質的な対策ではない。' },
          { textJa: 'permissions.allow に "Read(./.env)"', whyJa: '×: 逆に許可してしまう。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't10-deny-rules-case1',
        type: 'case',
        scenarioJa: '本番デプロイコマンド `npm run deploy:prod` だけは、何があっても自動実行させたくない。',
        tags: ['safety', 'permissions'],
        feature: {
          promptJa: 'どう守る？',
          options: [
            { id: 'deny', labelJa: '拒否ルール（deny）で封じる', correct: true, whyJa: 'パターン一致で確実に拒否でき、allow より優先される。' },
            { id: 'mode', labelJa: '権限モードを default にする', whyJa: '△: 確認は入るが「絶対不可」にはならない。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に注意書き', whyJa: '×: 指示であり強制力が無い。' },
            { id: 'allow', labelJa: 'allow から外すだけ', whyJa: '△: 確認は入るが明示拒否の方が確実。' },
          ],
        },
        invoke: {
          promptJa: 'どう書く？',
          options: [
            { textJa: 'permissions.deny に "Bash(npm run deploy:prod)"', correct: true, whyJa: '正解。その本番デプロイだけを確実に拒否。' },
            { textJa: 'permissions.deny に "Bash(npm:*)"', whyJa: '×: npm 全体を封じてしまい開発が止まる。' },
            { textJa: 'permissions.allow に "Bash(npm run deploy:prod)"', whyJa: '×: 逆に許可になる。' },
            { textJa: '.gitignore に追記', whyJa: '×: 権限とは無関係。' },
          ],
        },
        rewardJa: '本番への扉は固く閉ざされた。事故の芽を一つ摘んだ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't10-sandboxing',
    tier: 't10',
    order: 3,
    title: 'Sandboxing',
    titleJa: 'サンドボックス',
    icon: '📦',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'サンドボックスは、devcontainer や Docker の中で Claude を動かし、ファイルやネットワークのアクセス範囲を制限する隔離実行。',
      blocks: [
        { type: 'lead', textJa: '万一暴れても被害が外に出ない「結界」。隔離環境でこそ大胆に走らせられる。' },
        {
          type: 'list',
          titleJa: '守れるもの',
          items: [
            { term: 'ファイルシステム', descJa: 'コンテナ内に限定し、ホストを守る。' },
            { term: 'ネットワーク', descJa: '外部通信を制限・遮断できる。' },
            { term: '権限の自動承認', descJa: '隔離下なら bypass モードも比較的安全に使える。' },
          ],
        },
        {
          type: 'code',
          caption: 'devcontainer で開発',
          lang: 'text',
          code: '.devcontainer/ を用意し、コンテナ内で claude を起動する',
        },
        { type: 'tip', textJa: 'CI や無人実行は、サンドボックス＋限定権限の組み合わせが定石。' },
      ],
      links: [{ labelJa: '公式: サンドボックス', url: DOC }],
    },
    quiz: [
      {
        id: 't10-sandboxing-q1',
        type: 'mcq',
        promptJa: 'ホストを汚さずに、Claude のファイル/ネットワークアクセスを隔離したい。最適なのは？',
        options: [
          { textJa: 'devcontainer/Docker でサンドボックス実行', whyJa: '正解。コンテナ内に閉じ込めて被害を防ぐ。' },
          { textJa: '権限を全部 allow にする', whyJa: '×: 逆に危険。隔離にならない。' },
          { textJa: 'CLAUDE.md に「壊さないで」と書く', whyJa: '×: 指示であり隔離ではない。' },
          { textJa: 'ターミナルの色を変える', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't10-sandboxing-q2',
        type: 'mcq',
        promptJa: 'サンドボックス内での bypassPermissions（全自動）について正しいのは？',
        options: [
          { textJa: '隔離されているため比較的安全に使える', whyJa: '正解。被害がコンテナ内に留まる前提で許容しやすい。' },
          { textJa: 'サンドボックスでも絶対に使ってはいけない', whyJa: '×: 隔離下は代表的な使いどころ。' },
          { textJa: 'ホストで使うのが推奨', whyJa: '×: ホスト直は最も危険。' },
          { textJa: 'サンドボックスと無関係', whyJa: '×: 隔離はリスク低減に直結する。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't10-sandboxing-case1',
        type: 'case',
        scenarioJa:
          '信頼しきれない大規模リファクタを、ホスト環境を汚さず・必要なら全自動で走らせたい。',
        tags: ['sandbox', 'isolation'],
        feature: {
          promptJa: 'どう実行する？',
          options: [
            { id: 'sandbox', labelJa: 'サンドボックス（devcontainer/Docker）で実行', correct: true, whyJa: '隔離環境なら被害が外に出ず、思い切った自動実行も許容できる。' },
            { id: 'host-bypass', labelJa: 'ホストで bypass モード', whyJa: '×: 最も危険。ホストを直接壊しうる。' },
            { id: 'deny-all', labelJa: '全部 deny にして実行', whyJa: '×: 何もできず目的を果たせない。' },
            { id: 'ignore', labelJa: 'そのままホストで実行', whyJa: '△: 動くが事故時の被害が大きい。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '.devcontainer を用意しコンテナ内で claude を起動', correct: true, whyJa: '正解。隔離環境で安全に走らせられる。' },
            { textJa: 'ホストのシェルで claude --dangerously...', whyJa: '×: 隔離されておらず危険。' },
            { textJa: 'settings.local.json に deploy と書く', whyJa: '×: サンドボックスとは無関係。' },
            { textJa: '何も設定せず起動', whyJa: '×: 隔離されない。' },
          ],
        },
        rewardJa: '結界の中で相棒は全力疾走。ホストは無傷のまま改修が完了した。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't10-zdr',
    tier: 't10',
    order: 4,
    title: 'Zero Data Retention',
    titleJa: 'ゼロデータ保持（ZDR）',
    icon: '🛡️',
    requires: ['t10-managed-settings'],
    mapPos: { col: 2, row: 2 },
    estMin: 3,
    study: {
      summaryJa:
        'ゼロデータ保持（ZDR）は、会話データを保持しない運用形態。機密性・コンプライアンス要件の厳しい組織向け。',
      blocks: [
        { type: 'lead', textJa: '痕跡を残さぬ密偵のごとく。機密を扱う王国には欠かせぬ掟だ。' },
        {
          type: 'list',
          titleJa: 'ポイント',
          items: [
            { term: '会話を保持しない', descJa: 'セッション後にデータが残らない構成。' },
            { term: 'コンプライアンス', descJa: '規制の厳しい業界・組織で要件を満たしやすい。' },
            { term: 'エンタープライズ機能', descJa: '組織契約・管理者設定と組み合わせて運用する。' },
          ],
        },
        { type: 'warn', textJa: 'ZDR 下では履歴が残らないため、後から会話を振り返れない点に注意。' },
      ],
      links: [{ labelJa: '公式: データ保持ポリシー', url: DOC }],
    },
    quiz: [
      {
        id: 't10-zdr-q1',
        type: 'mcq',
        promptJa: '規制の厳しい業界で、会話データを残さない運用が求められた。該当するのは？',
        options: [
          { textJa: 'ゼロデータ保持（ZDR）', whyJa: '正解。会話を保持しない運用形態。' },
          { textJa: 'プロンプトキャッシュ', whyJa: '×: 文脈再利用の最適化でデータ保持の話ではない。' },
          { textJa: '/compact', whyJa: '×: 会話の要約でありデータ保持ポリシーではない。' },
          { textJa: 'acceptEdits モード', whyJa: '×: 権限モードで無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't10-zdr-q2',
        type: 'mcq',
        promptJa: 'ZDR を採用した場合のトレードオフとして正しいのは？',
        options: [
          { textJa: '会話履歴が残らず後から振り返れない', whyJa: '正解。保持しないため履歴参照ができない。' },
          { textJa: '推論が必ず速くなる', whyJa: '×: 速度の話ではない。' },
          { textJa: 'XP が増える', whyJa: '×: 無関係（このアプリのゲーム要素とは別）。' },
          { textJa: '権限が自動で全許可になる', whyJa: '×: 権限とは無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't10-zdr-case1',
        type: 'case',
        scenarioJa:
          '金融系の社内規定で「やり取りを一切保存しない」ことが必須。Claude Code をどう運用すべき？',
        tags: ['compliance', 'enterprise'],
        feature: {
          promptJa: 'どの方針を採る？',
          options: [
            { id: 'zdr', labelJa: 'ゼロデータ保持（ZDR）で運用', correct: true, whyJa: '会話を保持しない構成で規定要件を満たせる。' },
            { id: 'compact', labelJa: '毎回 /compact する', whyJa: '×: 要約であり「保存しない」要件は満たさない。' },
            { id: 'clear', labelJa: '毎回 /clear する', whyJa: '△: 文脈は消えるがデータ保持ポリシーの担保にはならない。' },
            { id: 'local', labelJa: 'settings.local.json で何とかする', whyJa: '×: 個人設定で保証できる話ではない。' },
          ],
        },
        invoke: {
          promptJa: 'どう実現する？',
          options: [
            { textJa: '組織のエンタープライズ契約＋管理者設定で ZDR を有効化', correct: true, whyJa: '正解。組織レベルのポリシーとして適用する。' },
            { textJa: 'CLAUDE.md に「保存しないで」と書く', whyJa: '×: 指示であり保証にならない。' },
            { textJa: 'ブラウザのキャッシュを消す', whyJa: '×: 無関係。' },
            { textJa: '権限を全部 deny にする', whyJa: '×: データ保持ポリシーとは別問題。' },
          ],
        },
        rewardJa: '痕跡なき運用が確立された。監査も安心だ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't10-managed-claudemd',
    tier: 't10',
    order: 5,
    title: 'Managed CLAUDE.md',
    titleJa: '管理CLAUDE.md',
    icon: '📜',
    requires: ['t10-managed-settings'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '管理CLAUDE.md は、組織が全マシンに配布する共通の指示。会社共通のコーディング規約や禁止事項を、誰のプロジェクトにも効かせられる。',
      blocks: [
        { type: 'lead', textJa: '王国全土に届く布告。全ての冒険者が同じ掟の下で動く。' },
        {
          type: 'list',
          titleJa: '使いどころ',
          items: [
            { term: '全社共通規約', descJa: 'インデントや命名、禁止ライブラリなどを統一。' },
            { term: 'セキュリティ指針', descJa: '機密の扱い方など組織方針を周知。' },
            { term: '管理者が配布', descJa: 'managed 設定と同様にマシンへ配置する。' },
          ],
        },
        { type: 'tip', textJa: '強制力が要るものは権限(deny)で、指針として伝えたいものは管理CLAUDE.md で。' },
      ],
      links: [{ labelJa: '公式: 管理CLAUDE.md', url: DOC }],
    },
    quiz: [
      {
        id: 't10-managed-claudemd-q1',
        type: 'mcq',
        promptJa: '全社の開発者に共通のコーディング指針を、各自のどのプロジェクトでも効かせたい。最適なのは？',
        options: [
          { textJa: '管理CLAUDE.md を配布する', whyJa: '正解。組織全体に共通指示を届けられる。' },
          { textJa: '各人がプロジェクトの CLAUDE.md に手書き', whyJa: '△: 統一・徹底が難しい。' },
          { textJa: 'Slack で一度告知する', whyJa: '×: Claude の挙動には反映されない。' },
          { textJa: 'permissions.allow に書く', whyJa: '×: 権限であり指針の配布ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't10-managed-claudemd-q2',
        type: 'mcq',
        promptJa: '「指針として伝える」管理CLAUDE.md と「強制する」拒否ルールの使い分けで正しいのは？',
        options: [
          { textJa: '強制が必要なものは deny、指針は管理CLAUDE.md', whyJa: '正解。強制力の有無で使い分ける。' },
          { textJa: 'どちらも全く同じ', whyJa: '×: 強制力が違う。' },
          { textJa: '管理CLAUDE.md の方が強制力が強い', whyJa: '×: 強制は権限ルールの役目。' },
          { textJa: 'deny は指針にしか使えない', whyJa: '×: deny は強制（実行拒否）。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't10-managed-claudemd-case1',
        type: 'case',
        scenarioJa:
          '全社で「ライブラリ追加は要相談」という方針を、各開発者のどのプロジェクトでも Claude に意識させたい（強制までは不要）。',
        tags: ['enterprise', 'memory'],
        feature: {
          promptJa: 'どの仕組みを使う？',
          options: [
            { id: 'managed-md', labelJa: '管理CLAUDE.md で全社配布', correct: true, whyJa: '組織共通の指針を全プロジェクトに届けられる。強制不要の方針に最適。' },
            { id: 'deny', labelJa: '拒否ルールで npm install を deny', whyJa: '△: 強制になりすぎて開発が止まる。方針止まりには過剰。' },
            { id: 'project-md', labelJa: '各自プロジェクトの CLAUDE.md に手書き', whyJa: '△: 徹底・統一が難しい。' },
            { id: 'skill', labelJa: 'Skill を作る', whyJa: '×: 能力追加であり方針の周知には不向き。' },
          ],
        },
        invoke: {
          promptJa: 'どう配布する？',
          options: [
            { textJa: '管理者がマシンに管理CLAUDE.md を配置する', correct: true, whyJa: '正解。managed 設定と同様に全マシンへ配る。' },
            { textJa: '各人が ~/.claude に手動コピー', whyJa: '△: 統一・更新の徹底が難しい。' },
            { textJa: '.env に方針を書く', whyJa: '×: 指示の配布先ではない。' },
            { textJa: 'README に書くだけ', whyJa: '×: Claude の挙動には反映されない。' },
          ],
        },
        rewardJa: '全土に布告が行き渡り、誰もが同じ掟で動くようになった。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
