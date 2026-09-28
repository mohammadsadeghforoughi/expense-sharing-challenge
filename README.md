# Settle — Expense Sharing Challenge

A deliberately small full-stack expense-sharing application. Seeded users can record a directional expense and see the simplest final payments across the group.

## Run with Docker

Docker Compose is the deployment path and starts the complete stack:

```bash
docker compose up --build
```

Then open:

- Application: [http://localhost:3000](http://localhost:3000)
- About page: [http://localhost:3000/about](http://localhost:3000/about)
- Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

SQLite data is kept in the named `expense_data` volume, so records survive container restarts. To stop the stack, run `docker compose down`. Add `-v` only when you intentionally want to remove the stored data too.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

The web app runs at `http://localhost:3000`; the API and its direct Swagger UI run at `http://localhost:3001` and `http://localhost:3001/docs`.

## Useful commands

```bash
npm run build   # production builds for both applications
npm run lint    # TypeScript checks for both applications
npm run test    # API balance-netting test
```

## Architecture

```text
Browser → Next.js web (:3000) → /api reverse proxy → NestJS API (:3001) → SQLite
```

- `apps/web` — Next.js 16, React 19, Tailwind CSS, English/Persian UI, light/dark themes.
- `apps/api` — NestJS REST API, validation, Swagger, SQLite access, and balance netting.
- `data` — local SQLite location; Docker uses a named volume instead.
- `docs` — architecture, API, and deployment notes.

Money is stored as integer cents. Each expense means the beneficiary owes the payer. Balances are netted within each unordered pair of users; no cross-person debt simplification is attempted because the brief asks for net balances between users.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/users` | List seeded users |
| `GET` | `/expenses` | List expenses newest first |
| `POST` | `/expenses` | Create a directional expense |
| `GET` | `/balances` | Return simplified final payments across all users |
| `GET` | `/health` | Container health check |

The repository includes illustrative seed expenses on a fresh database. The Anjoman Max webfont came from the archive supplied with the task; its license copy is preserved in `docs/anjoman-license.pdf`.

## Project notes

See [docs/architecture.md](docs/architecture.md), [docs/api.md](docs/api.md), and [docs/deployment.md](docs/deployment.md). Product decisions are recorded in [PRODUCT.md](PRODUCT.md), and contributor guidance lives in [agent.md](agent.md).
