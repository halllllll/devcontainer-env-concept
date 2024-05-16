`Devcontainer`を使った開発環境の練習

## my opinions
- コード編集も実行環境もコンテナを想定
- コード編集は開発用のフロント・サーバーなど環境ごとに用意した`compose.yaml`をもとにDevcontainerで行う
- イメージのビルドは本番用の`compose.prod.yaml`(TODO: 仮)とDockerfileで行う（予定）
- モノレポ
- 開発用はfrontend,backend,dbの3つのコンテナを動かす
  - 開発時はDockerネットワーク名を明示的に作成・指名している
  - フロント(vite開発サーバー)のプロキシに明示的に設定
  - とりあえずスタンダードからという理由で3層にしているだけ
- 本番用のビルドではfrontendコードをビルドしたものをbackendのイメージに同梱しAppとする（予定）
  - なので、本番用ではDBとAppの2つのイメージがある（予定）

## (my own claims, NOT :todo)
- docker設定ファイル(Dockerfile, composeファイル)を置く場所
  - 同じ場所にある必要がないが
  - 開発用と本番用とその他などで局所的な設定だけ変えられたらいいが
- `.env`を置く場所と設定の方針


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
├── client
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   └── vite.config.ts
├── docker
│   └── dev
│       ├── Dockerfile.dev.front
│       ├── Dockerfile.dev.server
│       ├── compose.dev.front.yaml
│       └── compose.dev.server.yaml
└── server
    ├── go.mod
    ├── go.sum
    └── main.go
```