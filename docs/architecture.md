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
- Nets reciprocal expenses per unordered pair.
- Generates OpenAPI documentation through Nest Swagger.

### Database

SQLite is initialized on application startup. Schema creation is idempotent, users are inserted with `INSERT OR IGNORE`, and example expenses are added only when the expense table is empty.

## Balance algorithm

For each unordered user pair, expenses paid by the first user increase the amount owed to that user; expenses paid by the second decrease it. A zero total is omitted. The sign identifies the creditor and debtor, and the absolute value is returned as the amount.

This is pairwise netting, not graph-wide debt simplification. It preserves the requirement that balances describe the current net relationship between specific users.
