---
name: pr-review
description: Review a remote GitHub pull request and triage comments into a pending review.
tags: review, git
---

# PR review

Use for a remote PR identified by URL, number, or current branch. Local diffs use the normal local review workflow.

Follow `voice` if available for tone and prose quality. The rules below cover review-specific form.

Reviews are always read-only: never checkout, edit, or post. When a baseline is given, pin head and baseline SHAs and exclude work merged from main. Report only verified issues with exact lines, and state what you could not verify.

1. Read the diff, full changed files, repository conventions, and related implementations. Verify findings before drafting.
2. Review both static issues (reuse, types, naming, dead code, stale references, untranslated strings/placeholders) and runtime behavior (awkward inputs, error-state handling, concurrency, performance). Search existing helpers before claiming one is missing. Also flag docs that restate code (auth requirements, function names, exact values). They go stale fast. Prefer behavior-level wording. When the PR touches docs, search the repo for the same pattern and report every occurrence.
3. Draft one issue per comment, usually one or two sentences, in the user's configured style. Explain the behavior and consequence. Ask when intent or evidence is uncertain. Preserve useful identifiers. Keep location, severity, and investigation notes outside the comment.
4. Present one exact comment at a time with add/modify/drop/discuss. Wait for each decision. Do not post during triage.
5. Pull the PR's active draft review before making any update: list the PR's reviews and comments and check whether a draft review already exists. If one does, reuse it and merge into it rather than creating a fresh one, since the user may have edited it or added more comments since it was last pulled.
6. Batch accepted comments into that one pending review, omitting the API event field. Tell the user to review and submit it manually.

## Comment form

Length follows intent:

| Intent | Usual words | Form |
| --- | --- | --- |
| Mechanical fix | 1-5 | Imperative or nit plus replacement |
| Probe intent | 1-8 | One question |
| Nit with a reason | 6-14 | Fix and brief reason |
| Grounded finding | 15-35 | Behavior, consequence, question |
| Reply on own PR | 20-60 | Answer first, then reason |

Examples:

- is this export necessary?
- lets use the shared type
- nit: redundant check, the caller already validates this
- two updates can finish out of order. could the older result overwrite the newer one?
- nope, the validation happens before the callback

Use `nit:` for optional changes. Suggestion blocks contain only replacement lines. Brief acknowledgements such as valid, intended, yup, or nope need no thanks or explanation unless useful.

PR descriptions follow the repository template: one clause per change, relevant issue links, and actual validation. No narration.

Severity is private triage information: nit (optional), default (resolve before merge), real bug (request changes for state corruption/security/unverifiable code), out of scope (defer), cannot verify cheaply (ask for evidence).
