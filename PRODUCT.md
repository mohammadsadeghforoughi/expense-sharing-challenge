# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js and Tailwind CSS for the web application, NestJS for the API, SQLite for persistence, and Docker Compose for one-command deployment in a monorepo.

## Users

The primary audience is a technical interview reviewer evaluating a small full-stack application. The product itself is for a small group of people who need to record directional shared expenses and understand who currently owes whom.

## Product Purpose

Make a shared-expense ledger easy to inspect and update. Success means a reviewer can start the complete system with one command, add an expense, and immediately see both the expense history and correctly netted balances.

## Positioning

The application reduces shared-expense tracking to one explicit relationship: the payer is owed a stated amount by one beneficiary. Repeated and reciprocal transactions are netted into a single readable balance.

## Operating Context

Users move between an expense ledger and a balances view on one responsive page. Adding an expense is a short modal task. A separate About page explains the implementation, architecture, API documentation, and deployment context.

## Capabilities and Constraints

- Users are seeded; there is no authentication, registration, or user management.
- Every expense has one payer, one beneficiary, an amount, a description, and a date.
- The API lists users and expenses, creates expenses, and computes pairwise net balances.
- English and Persian interfaces are required, including correct right-to-left behavior.
- Light and dark themes are required.
- Swagger API documentation is required.
- The repository must include Docker, Docker Compose, setup documentation, an agent guide, a product document, and a docs directory.
- The implementation should stay intentionally small and avoid speculative features.

## Brand Commitments

The interface is minimal and Apple-like: calm hierarchy, generous space, direct language, restrained color, and native-feeling interaction. The user-provided Anjoman Max font is the primary typeface.

## Evidence on Hand

- The complete application brief is supplied in the task request.
- The licensed Anjoman Max Super font archive is supplied at `/Users/mohammadforoughi/Downloads/Anjoman Max Super.zip`.
- Deployment details for the About page are supplied by the user: Cloudflare, Docker Compose, and Codex sol-5.6.
- All financial records shipped with the app are illustrative seed data.

## Product Principles

- Prefer an obvious flow over feature breadth.
- Keep debt direction and amount unambiguous.
- Make system behavior inspectable through documentation and Swagger.
- Treat responsive, bilingual, and theme behavior as first-class states.
- Keep local and deployed operation reproducible.

## Accessibility & Inclusion

The interface must support keyboard navigation, visible focus, reduced motion, readable contrast, semantic labels, responsive layouts, and both left-to-right and right-to-left languages.
