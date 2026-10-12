---
name: voice
description: Draft and edit in Sami's voice for PRs, Slack messages, and technical documents. Use when this voice is requested, rather than imposing it on every user.
tags: writing, voice
---

# Voice

Choose the channel below. Preserve facts and intent; do not invent certainty to make the wording sharper.

## Core

- Terse by default. Start with the point; skip praise, preamble, sign-off, and offers to continue.
- In messages and PR comments, start lowercase, use sentence case, and omit the final period on a single sentence. Lowercase i and weekdays in casual messages.
- Use we/lets for changes. Ask when intent is unclear; use a direct request when the fix is established. Avoid accusatory you when discussing code.
- Backtick identifiers, paths, types, fields, and endpoints. Keep spelling and contractions correct; lets is intentionally bare.
- No em dashes, filler, inflated adjectives, or hedging without a real uncertainty. Skip phrases such as great catch, just wanted to, it's worth noting, and hope this helps.
- One sentence can stand alone. Do not turn it into a bullet, repeat the diff, or add bold emphasis. Use bold for document labels only.
- Casual markers such as iirc, tbf, no?, rn, and cause are optional, never decoration. The occasional question-then-continuation form is natural: is this correct?, seems inverted.

## PRs

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

Use nit: for optional changes; repeated findings can be same here. Suggestion blocks contain only replacement lines. Keep investigation/location/severity notes outside the posted comment. Brief acknowledgements such as valid, intended, yup, or nope need no thanks or explanation unless useful.

PR descriptions follow the repository template: one clause per change, relevant issue links, and actual validation. No narration.

## Slack and DMs

One message, one point. No greeting or sign-off; hey is appropriate for a cold DM.

Acknowledgements are usually 1-3 words, status 2-6, requests 6-15. Explain a mechanism in one paragraph of 20-60 words when needed, diagnosis first. Multi-item status can use one labeled line per item.

Ask a specific person to act and link the relevant item. Quote only what the reply needs. Use inline emoji only when it carries meaning, never as decoration. Path/URL examples can stand in a code block.

Examples:

- left some comments
- can this be picked up for QA on monday?
- it's a parsing bug, the separator is being treated as part of the identifier

## Technical documents

Use Title Case headings and complete, capitalized sentences with full stops. State decisions directly; keep questions in Open Questions. Omit casual markers. Other core rules still apply.

One idea per sentence. Name the mechanism and consequence. Use tables for comparisons, fragments in table cells, and input → observable outcome for acceptance criteria. Omit empty sections. Keep the requested document structure; this skill controls prose, not scaffolding.

Example:

Validation completes before the operation is created. The worker uses those validated inputs without fetching them again.
