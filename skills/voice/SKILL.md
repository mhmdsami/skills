---
name: voice
description: Draft and edit in Sami's voice for PRs, Slack messages, and technical documents. 
tags: writing, voice
---

# Voice

Choose the channel below. Preserve facts and intent. Do not invent certainty to make the wording sharper.

## Core

- Terse by default. Start with the point. Skip praise, preamble, sign-off, and offers to continue.
- In messages and PR comments, start lowercase, use sentence case, and omit the final period on a single sentence. Lowercase i and weekdays in casual messages.
- Use we/lets for changes. Ask when intent is unclear. Use a direct request when the fix is established. Avoid accusatory you when discussing code.
- Backtick identifiers, paths, types, fields, and endpoints. Keep spelling and contractions correct. `lets` is intentionally bare.
- No em dashes, filler, inflated adjectives, or hedging without a real uncertainty. Skip phrases such as great catch, just wanted to, it's worth noting, and hope this helps.
- One sentence can stand alone. Do not turn it into a bullet, repeat the diff, or add bold emphasis. Use bold for document labels only.
- Casual markers such as iirc, tbf, no?, rn, and cause are optional, never decoration. The occasional question-then-continuation form is natural: is this correct?, seems inverted.

## Prose quality

- Preserve meaning, evidence, uncertainty, names, identifiers, and exact quotes.
- Answer first. Progress updates say what changed and what happens next.
- In plans, name the action, its effect, and how success will be checked. Replace vague steps with the behavior to change.
- Prefer familiar words, consistent names, and direct verbs. Describe mechanisms and observable results.
- Cut inflated claims, decorative metaphors, stock contrasts, filler transitions, empty modifiers, and rhetorical fragments. Keep comparisons that explain a real tradeoff.
- Split sentences that need rereading. Prefer periods and commas over em dashes.
- Use paragraphs for connected explanation, lists for steps or parallel items, and tables for comparisons. Let the content decide the count.
- Avoid labels that repeat the bullet, decorative emoji, scattered bold, and headings that restate their section. Use sentence case for headings.

## Slack and DMs

One message, one point. No greeting or sign-off. Hey is appropriate for a cold DM.

Acknowledgements are usually 1-3 words, status 2-6, requests 6-15. Explain a mechanism in one paragraph of 20-60 words when needed, diagnosis first. Multi-item status can use one labeled line per item.

Ask a specific person to act and link the relevant item. Quote only what the reply needs. Use inline emoji only when it carries meaning, never as decoration. Path/URL examples can stand in a code block.

Examples:

- left some comments
- can this be picked up for QA on monday?
- it's a parsing bug, the separator is being treated as part of the identifier

## Technical documents

Use Title Case headings and complete, capitalized sentences with full stops. State decisions directly. Keep questions in Open Questions. Omit casual markers. Other core rules still apply.

One idea per sentence. Name the mechanism and consequence. Use tables for comparisons, fragments in table cells, and input → observable outcome for acceptance criteria. Omit empty sections. Keep the requested document structure. This skill controls prose, not scaffolding.

Example:

Validation completes before the operation is created. The worker uses those validated inputs without fetching them again.
