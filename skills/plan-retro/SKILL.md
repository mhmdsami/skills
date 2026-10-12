---
name: plan-retro
description: Review completed or discarded work and user corrections to propose concrete improvements to planning skills. Use for retrospectives and recurring workflow failures, not automatic rewriting of agent instructions.
---

# Improve the workflow

Read `plan-spec` from the sibling source directory or installed skills. If unavailable, disclose that limitation before interpreting records.

1. Bound the review to the requested workstreams or period. Read relevant completed, discarded, and stalled plans, execution evidence, and available user/assistant exchanges. Separate user decisions from generated instructions, suggestions, and sub-agent output. Record coverage and missing sources.
2. Identify repeated misunderstandings, reopened findings, failed checks, unnecessary approval loops, and transfer failures. Compare what the plan promised with what was actually delivered. Do not infer a permanent preference from one task-specific exception.
3. Propose the smallest concrete edit to the skill that owns the behavior. Show the current wording, replacement, supporting examples, and expected effect. Existing Git, voice, review, and grilling rules belong in their owning skills rather than being copied into every planning workflow. Prefer removing contradictory instructions over adding another override.
4. Keep proposals distinct from applied changes. Apply only the edits the user authorizes, or the bounded edits already explicitly authorized by the review request. Use skill-creator when available for editing and meaningful validation; do not mutate private preferences or publish changes implicitly.
5. Keep retained lessons concise, link to their source plan/evidence, and exclude credentials and unnecessary personal transcript content. Store a requested retrospective under the owning workstream's learnings/ or audits/, not in the root index.

Report findings even when no skill edit is warranted. Missing evidence should narrow the conclusion, not become invented certainty.
