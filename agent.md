# Agent Guide

## Purpose

Keep this repository a focused interview exercise. Prefer a complete, readable vertical slice over abstractions intended for hypothetical features.

## Boundaries

- Preserve the monorepo split: `apps/web` owns presentation; `apps/api` owns validation, persistence, and financial rules.
- Store money as integer cents in SQLite and expose currency units at the API boundary.
- An expense is directional: `beneficiaryId` owes `payerId`.
- Pairwise balances must net reciprocal transactions. Do not introduce group simplification unless the product brief changes.
- Users remain seeded; do not add authentication or user management without an explicit requirement.
- Keep English and Persian copy in sync and check both LTR and RTL layouts.
- Preserve keyboard access, reduced-motion behavior, visible focus, and both themes.

## Verification

Before handing off changes, run:

```bash
npm run test
npm run build
npm run lint
docker compose config
```

For UI changes, inspect the home and About pages at desktop and mobile widths in light and dark themes.

## Documentation

Update the README and relevant file under `docs/` when commands, endpoints, architecture, or deployment behavior changes. Keep Swagger decorators aligned with API behavior.
