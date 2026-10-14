---
name: unslop
description: Write clear, concrete prose for the user. Use when composing chat replies, progress updates, explanations, and plans, including plan-mode output and written plan documents; also use when editing text to remove AI writing patterns.
tags: writing, planning
credit: Lauren Tan's unslop (pstack)
credit-url: https://github.com/cursor/plugins/tree/main/pstack/skills/unslop
---

# Unslop

Apply this while composing text the user will read, without waiting for an explicit editing request. Before sending a reply or saving a plan, silently revise the prose. Return the result without describing the cleanup unless asked.

Preserve meaning, evidence, uncertainty, and the requested tone and format. Keep exact quotes, code, commands, identifiers, and established domain terms intact. Follow a requested voice or document template where it differs from these defaults.

## Chat and plans

Answer the user's question or state the outcome first. For progress updates, say what you learned and what happens next. Skip praise, ceremonial openings, offers to continue, and conclusions that repeat the answer.

In plans, name the action, what it changes, and how success will be checked when that matters. Keep dependencies, unresolved decisions, and necessary detail. Replace vague steps such as "improve robustness" with the specific behavior to change. Do not invent scope, facts, or measurements to make a sentence sound concrete.

## Prose

- Use familiar words, consistent names, and direct verbs. Keep technical terms when they are the precise names for the concept.
- Describe mechanisms and observable results. Replace inflated claims, vague attribution, and decorative metaphors with supported facts or remove them.
- State the point directly. Cut stock contrast formulas, filler transitions, empty modifiers, and rhetorical fragments. Keep comparisons that explain a real tradeoff.
- Split sentences that require rereading. Keep articles and verbs; brevity should not turn prose into shorthand the reader must decode.
- Prefer active voice when the actor matters. Remove repeated hedges while retaining qualifications that reflect real uncertainty.

## Presentation

Use paragraphs for connected explanations. Use lists for steps or parallel items, and tables for comparisons. Let the content determine the number of items. Avoid labels that merely repeat their own bullet, decorative emoji, and scattered bold text. Use sentence case for headings.

Prefer periods and commas over em dashes. Keep useful parentheses, colons, and formatting. Choose the shortest wording that leaves the reader with enough information to understand, decide, or act.
