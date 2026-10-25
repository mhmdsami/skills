# Development

## Requirements

- Node.js `>=24.22.1`
- npm

## Setup

```sh
npm install
npm run db:local    # apply D1 migrations to the local database
npm run dev
```

Create `.dev.vars` for local secrets. For the admin without Google sign-in:

```sh
LOCAL_PREVIEW=1
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=local-dev-secret
GOOGLE_CLIENT_ID=local-dev-client-id
GOOGLE_CLIENT_SECRET=local-dev-client-secret
ADMIN_EMAILS=dev@localhost
```

`initOpenNextCloudflareForDev` provides the D1 and R2 bindings in `next dev`, so `/admin` and `/internal/<name>` work locally with the migrations applied.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | generate public skills, then `next dev` |
| `npm run build` | generate public skills, then `next build` |
| `npm run preview` | build the OpenNext Worker and preview it |
| `npm run deploy` | build and deploy to Cloudflare |
| `npm run db:local` | apply D1 migrations locally |
| `npm run db:remote` | apply D1 migrations remotely |
| `npm run upload -- <dir>` | upload a private skill |
| `npm run types` | `tsc --noEmit` |
| `npm test` | node test runner over `src/lib/*.test.ts` |
| `npm run gate` | generate, types, tests, build |

## Generated files

- `src/lib/public-skills.generated.ts`: built from `skills/*/SKILL.md`. Ignored by git; regenerate with `npm run generate:skills`.
- `next-env.d.ts`: managed by Next.js.

## Notes

- Next.js 16 is configured with `agentRules: false`, so `next dev` does not write a managed block into `AGENTS.md`.
- Parse and access logic is covered by tests in `src/lib/*.test.ts`; run `npm test` before pushing.
