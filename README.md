# lambda-blueprint

[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![d](https://api.dependabot.com/badges/status?host=github&repo=Syy0n/lambda-blueprint)](https://dependabot.com)

ddd-driven blueprint of a lambda-based REST-/CRUD-backend secured with OAuth, written in js/ts.

### 1. Prerequisites

- [node.js](https://nodejs.org/en/download)
- [aws-cli](https://docs.aws.amazon.com/cli/index.html)
- [aws-cdk](https://docs.aws.amazon.com/cdk/index.html)

---

### 2. How to create the APIs?

```
fyi: lerna is used to execute most of the commands below across all the domains.

1. npm install
2. npm run build
3. npm run test:unit (optional, have a look at the ci.yaml)
4. npm run test:intr (optional, have a look at the ci.yaml)
5. npm run bundle
6. cdk -a "npx ts-node cdk/src/resources/app.ts" bootstrap (only once)
7. cdk -a "npx ts-node cdk/src/functions/app.ts" bootstrap (only once)
8. ENV=<dev|qa|prod|...> cdk -a "npx ts-node cdk/src/resources/app.ts" deploy  "*" (splitted, will not be modified that often)
x. ENV=<dev|qa|prod|...> cdk -a "npx ts-node cdk/src/resources/app.ts" destroy "*" (splitted, will not be modified that often)
9. ENV=<dev|qa|prod|...> cdk -a "npx ts-node cdk/src/functions/app.ts" deploy  "*"
x. ENV=<dev|qa|prod|...> cdk -a "npx ts-node cdk/src/functions/app.ts" destroy "*"
x. npm run clean
...
```

### 3. How to invoke the APIs?

```
WORK IN PROGRESS ...

1. Get access_token (M2M-Communication)
curl -X POST --user <CLIENT_ID>:<CLIENT_SECRET> "https://<AUTH_DOMAIN>/oauth2/token?grant_type=client_credentials" -H "Content-Type: application/x-www-form-urlencoded"

2. Use access_token (M2M-Communication)
curl -X POST   "https://<API_DOMAIN>/v1/<resource>"      -H "Authorization:<access_token>" -H "Content-Type: application/json" -d "<body>" (domains/<domain>/src/dtos/create-dto.ts)
curl -X DELETE "https://<API_DOMAIN>/v1/<resource>/<ID>" -H "Authorization:<access_token>"
curl -X PUT    "https://<API_DOMAIN>/v1/<resource>/<ID>" -H "Authorization:<access_token>" -H "Content-Type: application/json" -d "<body>" (domains/<domain>/src/dtos/update-dto.ts)
curl -X GET    "https://<API_DOMAIN>/v1/<resource>/<ID>" -H "Authorization:<access_token>"
...
```

### 4. Resources

- https://serverless-stack.com/

### 5. Todos

...
