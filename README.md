`Devcontainer`を使った開発環境の練習

## env

| frontend              | backend(api) | db         |
| --------------------- | ------------ | ---------- |
| React,Vite,TypeScript | Go           | PostgreSQL |

## goal
- コード編集も実行環境もコンテナを想定
- コード編集は開発用のフロント・サーバーなど環境ごとに用意した`compose.yaml`をもとにDevcontainerで行う
- 本番用イメージのビルドは`Dockerfile.prod`で行う
  - イメージを作るだけ。実際に運用するときは専用の`compose.yaml`で行う（予定）
- モノレポ
- 開発用はfrontend,backend,dbの3つのコンテナを動かす
  - 開発時はDockerネットワーク名を明示的に作成・指名している
  - フロント(vite開発サーバー)のプロキシに明示的に設定
  - とりあえずスタンダードからという理由で3層にしているだけ
- 本番用のビルドではfrontendコードをビルドしたものをbackendのイメージに同梱しAppとする（frontend用にnginxを立てるとかはしない）
  - なので、本番用ではDBとAppの2つのイメージがある（予定）

## (my own claims, NOT :todo)
- アプリ自体は特になにもしないもので、UIなどにはこだわらない
- docker設定ファイル(Dockerfile, composeファイル, dev or prod)を置く場所
  - 同じ場所にある必要がないが
- `.env`を置く場所と設定の方針
  - とりあえずルートに置いてすべて一元管理している

## TODO
- DBをからめたイメージの作成
  - おそらく`Dockerfile.prod`の場所が関わってくる
    - 今はDB用のSQLは`_tools`に置いているので


# 雰囲気
```
.
├── .devcontainer
│   ├── client
│   │   └── devcontainer.json
│   └── server
│       └── devcontainer.json
├── .dockerignore
├── .env
├── .gitignore
├── README.md
├── Makefile
├── client
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   └── vite.config.ts
├── docker
│   ├── Dockerfile.prod
│   └── dev
│       ├── Dockerfile.dev.front
│       ├── Dockerfile.dev.server
│       ├── _tools
│       ├── compose.dev.front.yaml
│       └── compose.dev.server.yaml
└── server
    ├── go.mod
    ├── go.sum
    ├── main.go
    └── static
        └── index.html
```