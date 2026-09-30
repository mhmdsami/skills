# skills

Public skills for coding agents, with a catalog at [skills.sam1.space](https://skills.sam1.space). Public and unlisted private skills are served from the same Worker.

## Layout

- `skills/<name>/SKILL.md` — public skills, one per folder, in the [`npx skills`](https://github.com/vercel-labs/skills) format.
- `src/` — the catalog site.
- Private skills are not in this repo. They live in R2 with metadata in D1 and are served at `/internal/<name>`.

## Public skills

Listed on the catalog. A skill with `internal: true` in its frontmatter is hidden from the catalog and from Skills CLI discovery, but stays reachable by direct URL. Because this repo is public, `internal: true` only hides it from listings; the file is still public in the git history. Keep anything confidential out of this repo and upload it as a private skill instead.

## Private skills

Private skills are stored in R2 (content) and D1 (metadata) and served unlisted at `/internal/<name>`, not linked anywhere and marked `noindex`.

Upload one with the script, using the Worker's `SKILLS_TOKEN` secret:

```sh
SKILLS_TOKEN=... node scripts/upload.mjs ~/.agents/skills/with-payload-api
# or: npm run upload -- ~/.agents/skills/with-payload-api
```

Install it from a machine that has the link:

```sh
npx skills add https://skills.sam1.space/internal/<name>
```

Manage the index with the token:

```sh
curl https://skills.sam1.space/api/private -H "Authorization: Bearer $SKILLS_TOKEN"
curl -X DELETE https://skills.sam1.space/api/private/<name> -H "Authorization: Bearer $SKILLS_TOKEN"
```

## Admin dashboard

`/admin` manages private skills and the catalog's Recommended list. Sign-in is Google only, through better-auth, and limited to the emails in `ADMIN_EMAILS`. Private skills are edited as raw `SKILL.md`; recommendations are name, source, and description, edited in a modal. Every private-skill save is kept as a version in R2, listed under History, and restorable; a restore writes a new version.

Env (Worker secrets and vars):

- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — better-auth.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth client.
- `ADMIN_EMAILS` (secret) — comma-separated allowlist of admin emails.
- `SKILLS_TOKEN` — bearer token for the upload script and private API.
- Access keys: created in `/admin`, each with a scope of allowed slugs, an expiry, and revocation. They gate `/internal/<slug>` reads, `?key=sk_...` on the install URL, and every use is recorded in the audit log. The token is shown once and stored hashed.

Google OAuth redirect URI: `https://skills.sam1.space/api/auth/callback/google` (and `http://localhost:8787/api/auth/callback/google` for local preview).

## Install public skills

One skill:

```sh
npx skills add https://skills.sam1.space/skills/<name>
```

## Develop

```sh
npm install
npm run db:local        # apply D1 migrations to the local database
npm run dev             # next dev (catalog only; no R2/D1 bindings)
npm run preview         # opennextjs-cloudflare build && preview (full Worker)
npm run gate            # types, tests, build
```

`npm run dev` serves the catalog but not the private routes, because it has no Cloudflare bindings. Use `npm run preview` to exercise `/admin` and `/internal`. Local secrets go in `.dev.vars`; set `LOCAL_PREVIEW=1` there to treat the local preview as a signed-in admin and skip Google OAuth.

## Deploy

The GitHub Actions workflow deploys to Cloudflare Workers on push to `main`. Before the first deploy, create the resources and fill in `wrangler.jsonc`:

```sh
npx wrangler d1 create skills
npx wrangler r2 bucket create skills
npx wrangler secret put SKILLS_TOKEN
npx wrangler secret put BETTER_AUTH_SECRET
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
```

Set `BETTER_AUTH_URL` as a var. Keep `ADMIN_EMAILS` as a Worker secret (`npx wrangler secret put ADMIN_EMAILS`) alongside `SKILLS_TOKEN`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`, so the allowlisted addresses are not committed to this public repo. Set the `CLOUDFLARE_API_TOKEN` secret plus `CLOUDFLARE_ACCOUNT_ID` repository variable for CI.
