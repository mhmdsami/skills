---
name: pr-review
description: Review a remote GitHub pull request and triage comments into a pending review.
tags: review, git
---

# PR review

Use for a remote PR identified by URL, number, or current branch. Local diffs use the normal local review workflow.

1. Read the diff, full changed files, repository conventions, and related implementations. Verify findings before drafting.
2. Review both static issues (reuse, types, naming, dead code, stale references, untranslated strings/placeholders) and runtime behavior (awkward inputs, error-state handling, concurrency, performance). Search existing helpers before claiming one is missing.
3. Draft one issue per comment, usually one or two sentences, in the user's configured style. Explain behavior/consequence; ask when intent or evidence is uncertain. Preserve useful identifiers. Keep location, severity, and investigation notes outside the comment.
4. Present one exact comment at a time with add/modify/drop/discuss. Wait for each decision; do not post during triage.
5. Pull the PR's active draft review before making any update: list the PR's reviews and comments and check whether a draft review already exists. If one does, reuse it and merge into it rather than creating a fresh one, since the user may have edited it or added more comments since it was last pulled.
6. Batch accepted comments into that one pending review, omitting the API event field. Tell the user to review and submit it manually.

Severity is private triage information: nit (optional), default (resolve before merge), real bug (request changes for state corruption/security/unverifiable code), out of scope (defer), cannot verify cheaply (ask for evidence).
