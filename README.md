`Devcontainer`を使った開発環境

- コード編集も実行環境もコンテナを想定
- コード編集は開発用の`Dockerfile`をもとにDevcontainerで行う
- イメージのビルドは本番用のcompose.ymlとDockerfileで行う（予定）
- モノレポ


雰囲気
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
├── compose.dev.yml
├── compose.prod.yml
├── docker
│   ├── Dockerfile.front.dev
│   ├── Dockerfile.server.dev
│   └── Dockerfile.server.prod
└── server
    └── app
        ├── go.mod
        ├── go.sum
        └── main.go
```