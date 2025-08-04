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
