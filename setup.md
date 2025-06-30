# セットアップ手順

## backend
nodeディレクトリの初期化

```
npm init -y
```

TypeScript関連パッケージのインストール（devDependencies）

```
npm install --save-dev typescript ts-node @types/node
```

TypeScript設定ファイルの作成
```
npx tsc --init
```

Lint/Formatツールの導入
```
npm install --save-dev eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
npx eslint --init
```

JestとTypeScript用型定義・トランスパイラのインストール
```
npm install --save-dev jest ts-jest @types/jest
```

Jest初期化（TypeScript用設定）
```
npx ts-jest config:init
```

## frontend