# lambda-blueprint

[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![d](https://api.dependabot.com/badges/status?host=github&repo=Syy0n/lambda-blueprint)](https://dependabot.com)

ddd-driven blueprint of a lambda-based backend, written in js/ts - which provides a **REST**-, a **WS**- and a **GraphQL**-API.

### 1. Prerequisites

- [node.js](https://nodejs.org/en/download)
- [aws-cli](https://docs.aws.amazon.com/cli/index.html)
- [aws-cdk](https://docs.aws.amazon.com/cdk/index.html)

---

### 2. How to create the APIs?

```
1. npm install
2. npm run build
3. npm run test:unit (optional, have a look at the ci.yaml)
4. npm run test:intr (optional, have a look at the ci.yaml)
5. npm run bundle
6. npm run deploy:<env> (env = qa | prod)
7. npm run remove:<env> (env = qa | prod)
x. npm run clean
...
```

### 3. How to invoke the APIs?

```
1. Get access_token (m2m-communication)
curl -X POST --user <clientId>:<clientSecret> "https://<domain>.auth.<region>.amazoncognito.com/oauth2/token?grant_type=client_credentials" -H "Content-Type: application/x-www-form-urlencoded"

2. Use access_token (m2m-communication)

2.1 WS:
TBD
...

2.2 REST:
curl -X POST   "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>"         -H "Authorization:<access_token>" -H "Content-Type: application/json" -d "<body>" (domains/<domain>/src/dtos/create-dto.ts)
curl -X DELETE "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/<Id>"    -H "Authorization:<access_token>"
curl -X PUT    "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/<Id>"    -H "Authorization:<access_token>" -H "Content-Type: application/json" -d "<body>" (domains/<domain>/src/dtos/update-dto.ts)
curl -X GET    "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/<Id>"    -H "Authorization:<access_token>"

2.3. GraphQL:
curl -X POST   "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/graphql" -H "Authorization:<access_token>" -H "Content-Type: application/json" -d '{"query": "query {<customer|handover>(id: \"<Id>\") { id }}"}'
curl -X POST   "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/graphql" -H "Authorization:<access_token>" -H "Content-Type: application/json" -d '{"query": "query {<customer|handover>(id: \"<Id>\") { id property1 }}"}'
curl -X POST   "https://<API-Id>.execute-api.<region>.amazonaws.com/v1/<resource>/graphql" -H "Authorization:<access_token>" -H "Content-Type: application/json" -d '{"query": "query {<customer|handover>(id: \"<Id>\") { id property1 property2 }}"}'
...
```

### 4. Resources

- https://serverless-stack.com/

### 5. Todos

...
