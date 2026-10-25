# Public skills

Public skills live in this repo and are listed on the catalog at [skills.sam1.space](https://skills.sam1.space).

## Authoring

Create `skills/<name>/SKILL.md`:

```md
---
name: pr-review
description: Review a remote GitHub pull request and triage comments.
tags: review, git
---

# PR review

Instructions for the agent.
```

- `name` is the display name.
- `description` is shown in the catalog and used by discovery.
- `tags` are comma-separated and drive the catalog filters.
- `internal: true` hides the skill from the catalog and Skills CLI discovery. It stays reachable by direct URL, and it stays in the git history because this repo is public. Use a private skill for anything confidential.

`npm run dev` and `npm run build` regenerate `src/lib/public-skills.generated.ts` from these folders. The generated file is ignored by git.

## Installing

One skill:

```sh
npx skills add https://skills.sam1.space/skills/<name>
```

The catalog lists every public skill with its install command and source link.

## Parsing

Frontmatter parsing and validation live in `src/lib/catalog.ts` and are covered by `src/lib/catalog.test.ts`. The catalog page only reads the generated map; it does not parse files at request time.
