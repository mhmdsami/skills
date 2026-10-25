# Administration

`/admin` manages private skills, access keys, the audit log, and the catalog's Recommended list.

## Authentication

Sign-in is Google only, through better-auth. Access is limited to the addresses in `ADMIN_EMAILS`:

```sh
npx wrangler secret put ADMIN_EMAILS
```

Google OAuth redirect URI:

```text
https://skills.sam1.space/api/auth/callback/google
```

For local development, set `LOCAL_PREVIEW=1` in `.dev.vars`. It signs you in as a local admin (`dev@localhost`) and is honored only when `BETTER_AUTH_URL` starts with `http://localhost`, so it cannot activate in production.

## Environment

| Name | Kind | Purpose |
|---|---|---|
| `BETTER_AUTH_SECRET` | secret | better-auth signing |
| `BETTER_AUTH_URL` | var | public origin, e.g. `https://skills.sam1.space` |
| `GOOGLE_CLIENT_ID` | secret | Google OAuth client |
| `GOOGLE_CLIENT_SECRET` | secret | Google OAuth client |
| `ADMIN_EMAILS` | secret | comma-separated admin allowlist |
| `SKILLS_TOKEN` | secret | upload script and private API bearer token |

Keep `ADMIN_EMAILS` a secret: it contains real addresses and this repo is public.

## Dashboard

- **Private skills**: create, edit as raw `SKILL.md`, inspect history, restore, delete. Each save writes a version to R2 and D1.
- **Keys**: scope a key to selected slugs, set an expiry, and revoke it. Tokens are shown once and stored hashed.
- **Logs**: key usage and admin changes, newest first, from the audit log.
- **Recommendations**: name, source, and description for the catalog's Recommended section.

See [Private skills](private-skills.md) for the storage and access-key mechanics.
