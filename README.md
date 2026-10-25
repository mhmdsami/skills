# skills

Public skills for coding agents, with a catalog at [skills.sam1.space](https://skills.sam1.space). One Worker serves the catalog, unlisted private skills, and the admin dashboard.

```sh
npx skills add https://skills.sam1.space/skills/<name>
```

## Quick start

```sh
npm install
npm run db:local
npm run dev
```

Set `LOCAL_PREVIEW=1` in `.dev.vars` to use `/admin` locally without Google sign-in.

```sh
npm run gate   # types, tests, build
```

## Layout

- `skills/<name>/SKILL.md`: public skills, one folder per skill, in the [`npx skills`](https://github.com/vercel-labs/skills) format.
- `src/app`: catalog, admin dashboard, private API, and skill routes.
- `src/lib`: catalog parsing, private storage, access keys, auth, audit.
- `migrations/d1`: D1 schema.
- `scripts`: upload and catalog generation.

## Docs

- [Public skills](docs/public-skills.md): authoring, frontmatter, installation.
- [Private skills](docs/private-skills.md): storage, uploads, access keys, API.
- [Administration](docs/administration.md): dashboard, auth, environment, secrets.
- [Development](docs/development.md): local setup, scripts, bindings, tests.
- [Deployment](docs/deployment.md): Cloudflare resources, secrets, CI.
