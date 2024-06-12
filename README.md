`Devcontainer`を使った開発環境の練習

## env

|frontend|backend(api)|db|
|--|--|--|
|React,Vite,TypeScript|Go|PostgreSQL|

## my opinions
- コード編集も実行環境もコンテナを想定
- コード編集は開発用のフロント・サーバーなど環境ごとに用意した`compose.yaml`をもとにDevcontainerで行う
- イメージのビルドは本番用の`compose.prod.yaml`(TODO: 仮)とDockerfileで行う（予定）
- モノレポ
- 開発用はfrontend,backend,dbの3つのコンテナを動かす
  - 開発時はDockerネットワーク名を明示的に作成・指名している
  - フロント(vite開発サーバー)のプロキシに明示的に設定
  - とりあえずスタンダードからという理由で3層にしているだけ
- 本番用のビルドではfrontendコードをビルドしたものをbackendのイメージに同梱しAppとする（frontend用にnginxを立てるとかはしない）（予定）
  - なので、本番用ではDBとAppの2つのイメージがある（予定）

## (my own claims, NOT :todo)
- docker設定ファイル(Dockerfile, composeファイル)を置く場所
  - 同じ場所にある必要がないが
  - 開発用と本番用とその他などで局所的な設定だけ変えられたらいいが
- `.env`を置く場所と設定の方針

## TODO
- dev env(devcontainer)の場合にはvite devサーバーからproxyしてGoのAPIとコネクションする
- prodの場合にはビルド済のフロントエンドコードをembedし、staticファイルとして扱う
- ということをしたいので、Go側では「プロダクションビルドの場合はFSから読む」「dev環境ではGoはAPIサーバーに徹する（フロントの確認はviteサーバーに任せる）」をする
  - Goビルド時にオプションで読ませる・デフォルトは`dev`とする、でいい
- production build用のcompose.yamlは不要だと思われる
  - ルートからDockerfile一枚でよさそう
  - envをなにがしかで渡す
    - 主にdata source
- ローカル・本番両方とも同じ設定のアプリが必要
  - となるとfrontend側でも環境変数の切り替えが必要
    - viteでいける（えらい）
- 一元管理したさ
  - やりながら考える

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