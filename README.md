# KNZN-CleanArchitecture

## ディレクトリ構成

```
KNZN-CleanArchitecture/
├── apps/
│   ├── frontend/         # Vue.js/Nuxt.js（フロントエンドアプリ）
│   └── backend/          # Node.js + TypeScript（バックエンドAPI）
│       ├── src/
│       │   ├── application/    # アプリケーションサービス層（ユースケース）
│       │   ├── domain/         # ドメイン層（エンティティ・値オブジェクト・インターフェース）
│       │   └── infrastructure/ # インフラ層（DB, 外部API, 実装）
│       ├── test/               # テストコード
│       └── ...（設定ファイル等）
├── packages/
│   ├── shared/           # 型定義・共通ユーティリティ
│   └── ...
├── .github/              # CI/CDワークフロー
├── package.json          # ルート依存管理
├── pnpm-workspace.yaml   # (pnpmの場合)
├── turbo.json            # (Turborepoの場合)
└── README.md
```

- backendは`src/`配下でDDD+Clean Architectureのレイヤー分離を徹底
- 共通ロジックや型は`packages/`で管理し、フロント・バックで再利用
- モノレポ管理にはpnpm/yarn workspacesやTurborepo推奨

## TODO

このプロジェクトの要件をもとに、Clean Architectureを実践しつつ、Vue、Next.js、TypeScriptを使った開発を進めるためのガイドラインとシステム構成を提案します。

### システム構成

**フロントエンド**
- **技術選定**: Vue 3、Next.js（Nuxt.jsも検討可能）
- **機能**
  - Google CalendarのAPIを通じてスケジュールを取得し、日別のスケジュール一覧を表示。
  - スケジュールイベントをドラッグアンドドロップで実績に入力できるUIの作成。
  - タイムカードの表示は、時間グリッド（0時～24時）を作成し、時間帯に応じて背景色を変えたり、ドラッグアンドドロップで編集可能にする。
  - 各タイムカードには、名前と属性（カテゴリやタグなど）をつけられる入力フォームを提供。

**バックエンド**
- **技術選定**: TypeScript、Node.js（ExpressまたはNestJS）
- **機能**
  - Google APIを使ったOAuth2認証とイベント取得。
  - フロントエンドからの実績データの受付と、データベースへの保存。
  - Restful APIまたはGraphQLで、必要なデータを提供。

**データベース**
- **技術選定**: PostgreSQL、MongoDBなど
- **データモデル**
  - ユーザー情報モデル（OAuthトークン情報含む）
  - スケジュールイベントモデル（Google Calendarからのデータ）
  - 実績タイムカードモデル（ユーザーの入力した実績データ）

### Clean Architectureの設計

**主要なレイヤー**
1. **プレゼンテーション（Presentation Layer）**
   - VueとNext.jsで構成されるUI層。API呼び出し部分はREST/GraphQLクライアントを利用して外部化。

2. **アプリケーション（Application Layer）**
   - ユースケースとインタラクションを制御。例として、タイムカードの更新やスケジュールの一覧取得用のサービスを提供。

3. **ドメイン（Domain Layer）**
   - 業務ロジックとルールを管理し、エンティティや値オブジェクトを定義。

4. **インフラストラクチャー（Infrastructure Layer）**
   - 外部システムとの接続（APIクライアント、データベースアクセスなど）。データベースの操作や外部APIとの通信はこの層で扱う。

### 実装指針

- **OAuth2の導入**: Google Calendar APIの認証にはOAuth2を使用。ユーザーのカレンダーへのアクセスには、APIクライアント設定が必要になります。

- **ドラッグアンドドロップの実装**: Vue.jsのライブラリ（例えばVueDraggable）を用いて、イベントのドラッグアンドドロップ機能を実装します。

- **依存性の制御**: 各レイヤー間の依存関係はインターフェースを使って分離します。依存性注入を利用し、テストしやすい設計を心掛けます。

- **テスト戦略**: 統合テストや単体テストを充実させ、特にドメイン層のテストに力を入れることで、ビジネスロジックの安定性を確保します。

これらを組み合わせることによって、Clean Architectureを効果的に活用しつつ、現実的な業務に役立つ、使いやすいサービスの開発ができるでしょう。これらのガイドラインの下でプロジェクトを進めることで、アーキテクチャの理解を深めることができます。