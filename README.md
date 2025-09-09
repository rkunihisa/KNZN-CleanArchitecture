# KNZN-CleanArchitecture

## ディレクトリ構成

```
KNZN-CleanArchitecture/
├── apps/
│   └── backend/          # Node.js + TypeScript（バックエンドAPI）
│       ├── src/
│       │   ├── adapter/        # アダプタ層
│       │   ├── application/    # アプリケーション層（ユースケース）
│       │   ├── commmon/        # ドメイン層（エンティティ・値オブジェクト・インターフェース）
│       │   └── infrastructure/ # インフラ層（DB, 外部API, 実装）
│       ├── test/               # テストコード
│       └── ...（設定ファイル等）
├── .github/              # CI/CDワークフロー
└── README.md
```

- backendは`src/`配下でDDD+Clean Architectureのレイヤー分離を徹底
