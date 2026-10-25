# Deployment

The GitHub Actions workflow deploys to Cloudflare Workers on every push to `main`.

## Provision once

```sh
npx wrangler d1 create skills
npx wrangler r2 bucket create skills
```

Fill the D1 and R2 bindings into `wrangler.jsonc`, then set the secrets:

```sh
npx wrangler secret put BETTER_AUTH_SECRET
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put ADMIN_EMAILS
npx wrangler secret put SKILLS_TOKEN
```

`BETTER_AUTH_URL` is a var in `wrangler.jsonc`:

```text
https://skills.sam1.space
```

Google OAuth redirect URI: `https://skills.sam1.space/api/auth/callback/google`.

## CI

The deploy workflow runs:

1. `npm ci`
2. `npm audit --audit-level=low`
3. `npm run generate:skills`
4. `npm run types`
5. `npm test`
6. D1 migrations (`wrangler d1 migrations apply skills --remote`)
7. `npm run deploy`

Configure `CLOUDFLARE_API_TOKEN` as a repository secret and `CLOUDFLARE_ACCOUNT_ID` as a repository variable.

## Manual deploy

```sh
npm run deploy
```

Use this only when the workflow cannot run; migrations are applied by CI before the Worker deploy.
