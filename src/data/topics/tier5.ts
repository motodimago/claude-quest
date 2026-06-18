import type { Topic } from '../../types';

const DOC = 'https://code.claude.com/docs/ja';

// ===== Tier 5: Agents & Teams（サブエージェント軍団）=====
export const TIER5: Topic[] = [
  {
    id: 't5-subagents',
    tier: 't5',
    order: 1,
    title: 'Subagents',
    titleJa: 'サブエージェント',
    icon: '🤝',
    requires: [],
    mapPos: { col: 1, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'サブエージェントは、調査やデバッグなどの専門タスクを別のエージェントに任せる仕組み。結果だけが返るので、メインの会話文脈を汚さずに済む。',
      blocks: [
        { type: 'lead', textJa: '一人で抱え込むな。専門の仲間を呼び、任せて、要点だけ受け取れ。' },
        {
          type: 'list',
          titleJa: 'サブエージェントの強み',
          items: [
            { term: 'context 節約', descJa: '大量のファイル探索などを別文脈で行い、本体は要約だけ受け取る。' },
            { term: '専門化', descJa: '探索特化(Explore)・計画特化(Plan)など役割を分けられる。' },
            { term: '並列化', descJa: '独立した調査を複数同時に走らせられる。' },
          ],
        },
        { type: 'tip', textJa: 'キーワード検索や広い探索など「読むだけで結論が欲しい」作業はサブエージェント向き。' },
        { type: 'warn', textJa: '逆に1ファイルの単純確認など軽い作業は、直接やる方が速い。' },
      ],
      links: [{ labelJa: '公式: サブエージェント', url: DOC }],
    },
    quiz: [
      {
        id: 't5-subagents-q1',
        type: 'mcq',
        promptJa: 'サブエージェントを使う最大の利点は？',
        options: [
          { textJa: '大量の探索を別文脈で行い、本体の文脈を汚さない', whyJa: '正解。結果の要約だけが返り、メイン会話が軽く保たれる。' },
          { textJa: 'モデルの料金が必ず無料になる', whyJa: '×: 料金が無料になるわけではない。' },
          { textJa: 'コードが自動でデプロイされる', whyJa: '×: デプロイ機能ではない。' },
          { textJa: 'ネットワークが高速化する', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't5-subagents-q2',
        type: 'mcq',
        promptJa: 'サブエージェントに任せるのが「不向き」なのはどれ？',
        options: [
          { textJa: '既に開いている1ファイルの1行を確認する', whyJa: '正解。軽い作業は直接やる方が速い。' },
          { textJa: '命名規則を横断的に調べる広い探索', whyJa: '×: 広い探索は向いている。' },
          { textJa: '複数ディレクトリにまたがる調査', whyJa: '×: まさに得意分野。' },
          { textJa: '独立した複数テーマの同時調査', whyJa: '×: 並列化に向いている。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't5-subagents-case1',
        type: 'case',
        scenarioJa:
          '巨大なモノレポで「認証まわりの実装がどこにあるか」を、本体の会話を膨らませずに突き止めたい。',
        tags: ['subagents', 'context'],
        feature: {
          promptJa: 'どの機能を使う？',
          options: [
            { id: 'sub', labelJa: '探索用サブエージェントに調査を任せる', correct: true, whyJa: '探索は別文脈で行い、要点だけ返るので本体の文脈を節約できる。最適。' },
            { id: 'grep-all', labelJa: '自分で全ファイルを開いて読む', whyJa: '△: 可能だが本体の文脈を大量に消費し非効率。' },
            { id: 'compact', labelJa: 'とりあえず /compact する', whyJa: '×: 文脈圧縮であって調査の手段ではない。' },
            { id: 'mcp', labelJa: 'MCP サーバを追加する', whyJa: '×: 外部連携用。コード探索の本筋ではない。' },
          ],
        },
        invoke: {
          promptJa: '具体的にはどうする？',
          options: [
            { textJa: 'Explore 等の探索サブエージェントを起動して調査を委譲する', correct: true, whyJa: '正解。探索特化エージェントに任せ、結論を受け取る。' },
            { textJa: 'Esc を連打する', whyJa: '×: 中断であって調査ではない。' },
            { textJa: 'settings.json を編集する', whyJa: '×: 設定変更は調査の手段ではない。' },
            { textJa: 'git worktree を作る', whyJa: '×: 並列作業の隔離用で、探索そのものではない。' },
          ],
        },
        rewardJa: '仲間が要点だけ持ち帰った。本体の頭はクリアなまま核心へ。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't5-subagent-config',
    tier: 't5',
    order: 2,
    title: 'Subagent Config',
    titleJa: 'サブエージェントの定義',
    icon: '🛠️',
    requires: ['t5-subagents'],
    mapPos: { col: 2, row: 1 },
    estMin: 4,
    study: {
      summaryJa:
        'サブエージェントは .claude/agents/ に定義できる。使えるツール・モデル・役割（システムプロンプト）を指定し、繰り返し使える専門家を作る。',
      blocks: [
        { type: 'lead', textJa: '仲間の性格と装備を決めるのは君だ。役割・道具・モデルを仕立てよう。' },
        {
          type: 'code',
          caption: '.claude/agents/reviewer.md（例）',
          lang: 'markdown',
          code: '---\nname: reviewer\ndescription: コードレビュー専門\ntools: Read, Grep, Bash\nmodel: sonnet\n---\nあなたは厳密なコードレビュアーです。差分のバグだけを指摘してください。',
        },
        {
          type: 'list',
          titleJa: '指定できる主な項目',
          items: [
            { term: 'description', descJa: 'いつ呼ぶかの説明（自動選択にも使われる）。' },
            { term: 'tools', descJa: 'そのエージェントが使えるツールを絞る。' },
            { term: 'model', descJa: '軽い作業は haiku、難所は opus など使い分け。' },
          ],
        },
        { type: 'tip', textJa: 'description を具体的に書くほど、適切な場面で自動的に呼ばれやすくなる。' },
      ],
      links: [{ labelJa: '公式: サブエージェント設定', url: DOC }],
    },
    quiz: [
      {
        id: 't5-subagent-config-q1',
        type: 'mcq',
        promptJa: 'プロジェクト用のサブエージェントを定義する場所は？',
        options: [
          { textJa: '.claude/agents/ にファイルを置く', whyJa: '正解。ここに定義したエージェントが使えるようになる。' },
          { textJa: '.env に書く', whyJa: '×: 環境変数用で定義場所ではない。' },
          { textJa: 'package.json の scripts', whyJa: '×: npm スクリプト用。' },
          { textJa: 'README.md', whyJa: '×: ドキュメントであり定義場所ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't5-subagent-config-q2',
        type: 'mcq',
        promptJa: 'サブエージェント定義で「使えるツールを限定」したい。指定するのは？',
        options: [
          { textJa: 'tools フィールド', whyJa: '正解。許可するツールを列挙して権限を絞れる。' },
          { textJa: 'permissions.allow にエージェント名', whyJa: '×: ツール権限の一般設定で、エージェント定義のツール限定とは別。' },
          { textJa: 'CLAUDE.md に「ツール限定」と書く', whyJa: '△: 指示はできるが定義としての強制力は tools が確実。' },
          { textJa: 'model フィールド', whyJa: '×: モデル選択であってツール限定ではない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't5-subagent-config-case1',
        type: 'case',
        scenarioJa:
          'レビュー専門のサブエージェントを作り、安全のため「読み取りと検索だけ」できるようにしたい。',
        tags: ['subagent', 'config'],
        feature: {
          promptJa: 'どこで実現する？',
          options: [
            { id: 'agentmd', labelJa: '.claude/agents の定義でツールを絞る', correct: true, whyJa: 'tools に Read/Grep だけ書けば、そのエージェントは編集できない。最適。' },
            { id: 'deny', labelJa: '全体の権限 deny に Edit を入れる', whyJa: '△: 全エージェント/本体にも効いてしまい範囲が広すぎる。' },
            { id: 'claudemd', labelJa: 'CLAUDE.md に「編集禁止」と書く', whyJa: '×: 指示止まりで確実性が低い。' },
            { id: 'hook', labelJa: 'Hooks で編集を弾く', whyJa: '△: 可能だが回りくどい。定義で絞るのが素直。' },
          ],
        },
        invoke: {
          promptJa: '定義ファイルにどう書く？',
          options: [
            { textJa: 'frontmatter の tools に Read, Grep を指定', correct: true, whyJa: '正解。使えるツールを読み取り系に限定できる。' },
            { textJa: 'model に opus を指定', whyJa: '×: モデル指定でツール限定にはならない。' },
            { textJa: 'name を reviewer にするだけ', whyJa: '×: 名前だけではツールは絞れない。' },
            { textJa: '.gitignore に追記', whyJa: '×: 無関係。' },
          ],
        },
        rewardJa: '読むだけのレビュアーが完成。安心して差分を見せられる。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't5-agent-teams',
    tier: 't5',
    order: 3,
    title: 'Agent Teams',
    titleJa: 'エージェントチーム',
    icon: '🧑‍🤝‍🧑',
    requires: ['t5-subagents'],
    mapPos: { col: 2, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        '独立したサブタスクは複数のエージェントに同時に割り当て、まとめ役が結果を統合できる。並列化で全体の所要時間を短縮する。',
      blocks: [
        { type: 'lead', textJa: '一騎当千より、適材適所の軍団。独立タスクは同時に進めろ。' },
        {
          type: 'list',
          titleJa: 'チーム化が効く場面',
          items: [
            { term: '独立した複数調査', descJa: '互いに依存しないテーマを並行で。' },
            { term: '横断的な一括変更', descJa: '多数ファイルへ同じ変更を分担。' },
            { term: '多観点レビュー', descJa: 'バグ/性能/セキュリティを別々の視点で。' },
          ],
        },
        { type: 'tip', textJa: '依存関係がある作業を無理に並列化しても混乱するだけ。独立性が鍵。' },
      ],
      links: [{ labelJa: '公式: エージェントチーム', url: DOC }],
    },
    quiz: [
      {
        id: 't5-agent-teams-q1',
        type: 'mcq',
        promptJa: '複数エージェントの並列化が最も効くのは？',
        options: [
          { textJa: '互いに独立した複数の調査を同時に行うとき', whyJa: '正解。独立タスクの並列化で所要時間を短縮できる。' },
          { textJa: '前の結果に強く依存する逐次処理', whyJa: '×: 依存が強いと並列化は混乱を生む。' },
          { textJa: '1行の修正', whyJa: '×: 並列化する意味がない。' },
          { textJa: 'ログを1件読むだけ', whyJa: '×: 軽すぎる。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't5-agent-teams-q2',
        type: 'mcq',
        promptJa: 'チーム化で気をつけることは？',
        options: [
          { textJa: 'タスク同士の独立性を確保する', whyJa: '正解。依存があると並列化はかえって非効率。' },
          { textJa: 'できるだけ依存を増やす', whyJa: '×: 逆効果。' },
          { textJa: '必ず1体だけで進める', whyJa: '×: それでは並列化にならない。' },
          { textJa: '結果は統合しない', whyJa: '×: まとめ役が統合してこそ価値が出る。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't5-agent-teams-case1',
        type: 'case',
        scenarioJa:
          '5つのモジュールそれぞれに、互いに無関係な同種のリファクタを行いたい。最短で終わらせたい。',
        tags: ['teams', 'parallel'],
        feature: {
          promptJa: 'どう進める？',
          options: [
            { id: 'team', labelJa: 'モジュールごとにエージェントを割り当て並列実行', correct: true, whyJa: '独立タスクなので並列化が最短。最適。' },
            { id: 'serial', labelJa: '1体で5モジュールを順番に処理', whyJa: '△: 確実だが時間がかかる。独立なら並列が有利。' },
            { id: 'one-prompt', labelJa: '全部まとめて1プロンプトに詰め込む', whyJa: '×: 文脈が膨らみ精度も落ちやすい。' },
            { id: 'skip', labelJa: '手作業でやる', whyJa: '×: 自動化の利点を捨てている。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '独立タスクをそれぞれのエージェントに分担し同時に走らせる', correct: true, whyJa: '正解。並列で実行し、結果を統合する。' },
            { textJa: '1体に直列で依頼し続ける', whyJa: '×: 並列化していない。' },
            { textJa: '依存関係をわざと作る', whyJa: '×: 並列化を阻害する。' },
            { textJa: 'worktree を使わず同一ファイルを全員で同時編集', whyJa: '×: 競合の元。独立なら問題ないが同一ファイル同時編集は危険。' },
          ],
        },
        rewardJa: '5方面同時進撃。半分以下の時間で片が付いた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't5-worktrees',
    tier: 't5',
    order: 4,
    title: 'Worktrees',
    titleJa: 'worktree（並列作業）',
    icon: '🌿',
    requires: [],
    mapPos: { col: 1, row: 2 },
    estMin: 4,
    study: {
      summaryJa:
        'git worktree は、同じリポジトリから隔離された作業ツリー（別ブランチ）を作る仕組み。複数エージェントがファイル競合せずに並列作業できる。',
      blocks: [
        { type: 'lead', textJa: '同じ机を取り合うな。各自に専用の作業台（worktree）を与えよ。' },
        {
          type: 'list',
          titleJa: 'worktree が解決すること',
          items: [
            { term: 'ファイル競合', descJa: '別ツリーで作業するので同一ファイルの衝突を避けられる。' },
            { term: '並列ブランチ', descJa: '機能Aと機能Bを同時並行で進められる。' },
            { term: '隔離', descJa: '実験的変更を本体ツリーから切り離せる。' },
          ],
        },
        { type: 'tip', textJa: '並列エージェントがそれぞれファイルを書き換えるなら worktree で隔離するのが定石。' },
        { type: 'warn', textJa: '隔離は便利だがセットアップのコストもある。単一の逐次作業には不要。' },
      ],
      links: [{ labelJa: '公式: worktree', url: DOC }],
    },
    quiz: [
      {
        id: 't5-worktrees-q1',
        type: 'mcq',
        promptJa: 'git worktree を使う主な理由は？',
        options: [
          { textJa: '隔離された作業ツリーで並列作業し、ファイル競合を避ける', whyJa: '正解。別ツリーなので衝突しない。' },
          { textJa: 'コミット履歴を消すため', whyJa: '×: 履歴を消す機能ではない。' },
          { textJa: 'ネットワークを速くするため', whyJa: '×: 無関係。' },
          { textJa: 'テストを自動生成するため', whyJa: '×: 無関係。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't5-worktrees-q2',
        type: 'mcq',
        promptJa: 'worktree が「不要」なのはどんなとき？',
        options: [
          { textJa: '単一の作業を1体で順番に進めるだけのとき', whyJa: '正解。隔離の必要がなくセットアップが無駄になる。' },
          { textJa: '複数エージェントが別々のファイルを同時に書き換えるとき', whyJa: '×: まさに使いどころ。' },
          { textJa: '実験的な大改造を本体から隔離したいとき', whyJa: '×: 隔離に向く。' },
          { textJa: '機能Aと機能Bを並行開発するとき', whyJa: '×: 並列に有効。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't5-worktrees-case1',
        type: 'case',
        scenarioJa:
          '3体のエージェントに、それぞれ別機能の実装を同時に任せたい。だが同じファイルを触って衝突するのが心配。',
        tags: ['worktree', 'parallel'],
        feature: {
          promptJa: 'どうやって競合を防ぐ？',
          options: [
            { id: 'worktree', labelJa: 'エージェントごとに git worktree を割り当てる', correct: true, whyJa: '隔離ツリーで作業すれば互いのファイル変更が衝突しない。最適。' },
            { id: 'lock', labelJa: '手動でファイルをロックして回す', whyJa: '△: 運用が煩雑でミスの元。' },
            { id: 'serial', labelJa: '結局1体ずつ順番にやる', whyJa: '×: 並列化の利点を捨てている。' },
            { id: 'ignore', labelJa: '気にせず全員同じツリーで編集', whyJa: '×: 競合・上書きが起きやすく危険。' },
          ],
        },
        invoke: {
          promptJa: '具体的には？',
          options: [
            { textJa: '各エージェントを別々の worktree（隔離ブランチ）で実行する', correct: true, whyJa: '正解。隔離により並列でも衝突しない。' },
            { textJa: '全員に bypassPermissions を付与', whyJa: '×: 権限の話で競合は防げない。' },
            { textJa: '.gitignore に全ファイルを足す', whyJa: '×: 追跡対象を外すだけで解決にならない。' },
            { textJa: '/compact する', whyJa: '×: 文脈圧縮で無関係。' },
          ],
        },
        rewardJa: '三者三様、別々の作業台で衝突なし。並列開発が回り始めた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },

  {
    id: 't5-background-agents',
    tier: 't5',
    order: 5,
    title: 'Background Agents',
    titleJa: 'バックグラウンド実行',
    icon: '🌙',
    requires: ['t5-subagents'],
    mapPos: { col: 3, row: 1 },
    estMin: 3,
    study: {
      summaryJa:
        '長時間タスクは Ctrl+B でバックグラウンドへ送れる。タスクは裏で進み続け、ターミナルはすぐ手元に戻る。完了時には通知される。',
      blocks: [
        { type: 'lead', textJa: '待つ時間がもったいない。重い仕事は裏に回し、君は次へ進め。' },
        { type: 'kbd', keys: 'Ctrl+B', descJa: '実行中タスクをバックグラウンドへ送る。' },
        {
          type: 'list',
          titleJa: '向いている作業',
          items: [
            { term: '長いビルド/テスト', descJa: '完了まで端末を占有させない。' },
            { term: '大規模な探索', descJa: '裏で走らせ、終わったら結果を確認。' },
          ],
        },
        { type: 'tip', textJa: 'バックグラウンドのタスクは完了すると自動で知らせてくれる。' },
      ],
      links: [{ labelJa: '公式: バックグラウンド実行', url: DOC }],
    },
    quiz: [
      {
        id: 't5-background-agents-q1',
        type: 'mcq',
        promptJa: '実行中タスクをバックグラウンドへ送るキーは？',
        options: [
          { textJa: 'Ctrl+B', whyJa: '正解。タスクを背面に送りターミナルを解放する。' },
          { textJa: 'Ctrl+C', whyJa: '×: 中断（キャンセル）になる。' },
          { textJa: 'Esc', whyJa: '×: 生成・実行の中断。' },
          { textJa: 'Shift+Tab', whyJa: '×: 権限モード切替で別物。' },
        ],
        correct: 0,
        xp: 10,
      },
      {
        id: 't5-background-agents-q2',
        type: 'mcq',
        promptJa: 'バックグラウンドに送ったタスクはどうなる？',
        options: [
          { textJa: '裏で実行が続き、完了時に通知される', whyJa: '正解。止まらずに進み、終われば知らせてくれる。' },
          { textJa: '即座にキャンセルされる', whyJa: '×: それは Ctrl+C の挙動。' },
          { textJa: '永久に止まったままになる', whyJa: '×: 進行は続く。' },
          { textJa: '会話履歴が消える', whyJa: '×: 履歴は消えない。' },
        ],
        correct: 0,
        xp: 10,
      },
    ],
    cases: [
      {
        id: 't5-background-agents-case1',
        type: 'case',
        scenarioJa:
          'テストスイートの実行に10分かかる。待っている間に別のファイルを自分で確認したい。',
        tags: ['background', 'productivity'],
        feature: {
          promptJa: 'どうする？',
          options: [
            { id: 'bg', labelJa: 'タスクをバックグラウンドへ送る', correct: true, whyJa: 'テストは裏で進み、ターミナルはすぐ使える。最適。' },
            { id: 'cancel', labelJa: 'テストを止めて後でやり直す', whyJa: '×: 進行が無駄になる。' },
            { id: 'wait', labelJa: '10分待つ', whyJa: '×: 時間を浪費している。' },
            { id: 'newterm', labelJa: '別ターミナルを開く', whyJa: '△: 可能だが同一セッションのタスク管理が分断される。' },
          ],
        },
        invoke: {
          promptJa: 'その操作は？',
          options: [
            { textJa: 'Ctrl+B でバックグラウンドへ', correct: true, whyJa: '正解。実行を続けたまま端末を解放する。' },
            { textJa: 'Ctrl+C で中断', whyJa: '×: テストが止まる。' },
            { textJa: 'Ctrl+Z でサスペンド', whyJa: '×: シェルのサスペンドで Claude のタスク管理とは別。' },
            { textJa: '/background と入力', whyJa: '×: そのようなコマンドは無い。' },
          ],
        },
        rewardJa: 'テストは裏で進行中。君は次の調査へ。時間を二重に使えた。+25 XP',
        xp: 25,
        bonusFirstTry: 10,
      },
    ],
  },
];
