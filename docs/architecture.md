# Architecture

## Request path

```text
Browser
  └─ Next.js web container (public port 3000)
       └─ /api/* rewrite
            └─ NestJS API container (private port 3001)
                 └─ SQLite file in a named Docker volume
```

The browser uses relative `/api` URLs. This avoids environment-specific public API URLs and keeps production same-origin. The Next.js rewrite target is the Compose service name `api` in Docker and `localhost:3001` during local development.

## Responsibilities

### Web

- Renders the expense ledger, balances, modal, and About page.
- Owns language, direction, and theme preferences in local storage.
- Refetches the three small read models after an expense is created.
- Never calculates authoritative balances.

### API

- Validates create payloads and user relationships.
- Stores amounts as integer cents.
- Joins users into expense response objects.
- Calculates each user's net position and returns simplified settlements.
- Generates OpenAPI documentation through Nest Swagger.

### Database

SQLite is initialized on application startup. Schema creation is idempotent, users are inserted with `INSERT OR IGNORE`, and example expenses are added only when the expense table is empty.

## Balance algorithm

Every expense adds to the payer's position and subtracts from the beneficiary's position. The service then matches debtors with creditors. Reciprocal debts and closed loops therefore collapse into the smallest practical set of final payments.
