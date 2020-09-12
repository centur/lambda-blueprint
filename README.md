# lambda-blueprint

[![Code-Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Dependabot-Status](https://api.dependabot.com/badges/status?host=github&repo=Syy0n/lambda-blueprint)](https://dependabot.com)

ddd-driven blueprint of a lambda-based http-backend, written in javascript/typescript.

### 1. Prerequisites

- [node.js](https://nodejs.org/en/download)
- [aws-cli](https://docs.aws.amazon.com/cli/index.html)

---

- [Bootstrapping the aws-cdk:](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)
```
cdk bootstrap
```

### 2. How to create the API?

```
1. npm install
2. npm run build
3. npm run test:unit (optional, have a look at the ci.yaml)
4. npm run test:intr (optional, have a look at the ci.yaml)
5. npm run bundle
6. npm run deploy:<env> (env = qa | prod)
7. npm run remove:<env> (env = qa | prod)
...
```

### 3. How to invoke the API?

```
1. Get access_token (m2m-communication)
curl -X POST --user <clientId>:<clientSecret> "https://<domain>.auth.<region>.amazoncognito.com/oauth2/token?grant_type=client_credentials" -H "Content-Type: application/x-www-form-urlencoded"

2. Use access_token (m2m-communication)
curl -X POST   "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>"        -H "Authorization:<access_token>" -H "Content-Type: application/json" -d "{<payload>}" (domains/<domain>/src/dtos/create-dto.ts)
curl -X DELETE "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/<uuid>" -H "Authorization:<access_token>"
curl -X PUT    "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/<uuid>" -H "Authorization:<access_token>" -H "Content-Type: application/json" -d "{<payload>}" (domains/<domain>/src/dtos/update-dto.ts)
curl -X GET    "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/<uuid>" -H "Authorization:<access_token>"
```

### 4. Resources

- https://serverless-stack.com/

### 5. Todos

...
