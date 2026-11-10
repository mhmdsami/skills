# Private skills

Private skills are unlisted. Content lives in R2, metadata and versions live in D1, and the download URL is `/internal/<name>` with `noindex`.

## Upload

Use the Worker's `SKILLS_TOKEN` secret:

```sh
SKILLS_TOKEN=... node scripts/upload.mjs ~/.agents/skills/my-skill
# or
npm run upload -- ~/.agents/skills/my-skill
```

The script reads the folder's `SKILL.md`, stores it under `skills/<name>/SKILL.md`, and records the metadata in `private_skills`.

## Install

From a machine that has the link:

```sh
npx skills add https://skills.sam1.space/internal/<name>
```

Access keys can gate the request with `?key=sk_...`. A key can be limited to specific slugs, given an expiry, and revoked. Every use is written to the audit log. Keys are created and managed at `/admin/keys`; the token is shown once and stored hashed.

## API

```sh
curl https://skills.sam1.space/api/private \
  -H "Authorization: Bearer $SKILLS_TOKEN"

curl "https://skills.sam1.space/api/private?archived=1" \
  -H "Authorization: Bearer $SKILLS_TOKEN"

curl -X PATCH https://skills.sam1.space/api/private/<name> \
  -H "Authorization: Bearer $SKILLS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"archived": true}'

curl -X DELETE https://skills.sam1.space/api/private/<name> \
  -H "Authorization: Bearer $SKILLS_TOKEN"
```

The list only returns active skills unless you pass `archived=1`. `PATCH` sets the archive flag, and `DELETE` remains a permanent delete.

## Archive

Archiving keeps a private skill and its versions but takes it out of service. It leaves the dashboard's active list, disappears from key scope options, and `/internal/<name>` returns 404 even for a valid key. Restore it from the dashboard's Archived section to serve it again. Permanent delete is only offered there and removes the content and every version.

## Versions

Every save in the admin editor writes a new version to R2 and D1. The editor lists them under History; restoring a version writes a new version rather than deleting history. Deleting a private skill removes its content and every version.

Storage helpers: `src/lib/private-skills.ts`. Access-key logic: `src/lib/access-keys.ts`.
