---
name: pr-review
description: Review a remote GitHub pull request and draft one comment per issue.
tags: review, git
---

# PR review

## Scope

Use this skill for a remote GitHub pull request identified by a URL, number, or a branch with an open PR. For uncommitted changes or local diffs, use your normal local review workflow instead.

## Voice

Before drafting, read `~/.agents/shared/voice.md` and `~/.agents/shared/voice/pr.md` if they exist and follow them. Keep their contents private; never copy them into a comment, a commit, or this skill.

If either file is missing or unreadable, use these generic defaults and tell the user you used them:

- Write one issue per comment, one or two sentences.
- Start lowercase, use sentence case, and end without a trailing period on a single sentence.
- Prefer a question that checks intent, such as `is this export necessary?`, over a declaration.
- Skip praise, preamble, and sign-off.
- Do not restate the diff before making the point.
- Backtick identifiers, paths, and endpoints.
- Never use an em dash. Use a comma, a colon, a period, or parentheses.

## Workflow

1. Identify the PR from the URL, number, or current branch. If there is no remote PR, stop.
2. Gather context: read the diff and the full changed files, the repository conventions and lint config, and search for existing helpers, constants, and sibling implementations before flagging something as missing.
3. Draft comments, one issue each. Keep file, line, and severity notes private; GitHub already shows where a comment belongs.
4. Review one comment at a time. Present the exact comment text and offer: add, modify, drop, or discuss. Wait for a decision before the next.
5. Post one draft review after triage. Batch accepted comments in a single API call and omit the event field so GitHub creates a pending review.
6. Tell the user the draft is ready and they must submit it themselves.

## What to flag

Check each change twice.

Static pass:

- Reuse and duplication; constants and enums over repeated literals; types at the definition; naming and placement.
- Dead code, stale TODOs, commented code, redundant checks and fallbacks.
- Untranslated strings and placeholder mismatches.

Runtime pass:

- Try one awkward input: empty, null, missing key, or duplicate.
- For each error path, check the state left behind and whether an error is silently swallowed.
- Check whether two requests, retries, or messages can run out of order and overwrite each other.
- Check where the code runs and what it costs: bundle size, calls per render, query cost.

## Severity

Severity is private triage metadata. Do not print it in the comment.

- `nit`: the author's call, never blocking.
- `default`: resolves before merge.
- `real bug`: fix before merge; request changes only for state corruption, security, or unverifiable code.
- `out of scope`: can merge, suggest later or a TODO.
- `cannot verify cheaply`: ask the author to check locally or add evidence.
