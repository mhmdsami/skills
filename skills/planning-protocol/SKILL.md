---
name: planning-protocol
description: Plan, track and hand off non-trivial work using structured plan, ledger, and handoff files.
tags: planning, workflow
---

# Planning and session management

## Dependencies

This protocol invokes `grilling` and `domain-modeling` during plan mode. If either skill is not installed, say which one is missing and ask whether to proceed without it.

## Scope

Use this protocol for work spanning multiple phases or sessions. Skip it for single-step edits, quick fixes, or work touching only a couple files.

## Vault paths

- Plans: `$VAULT/plans/<YYYY-MM-DD>-<plan-name>.md`
- Ledger: `$VAULT/sessions/<YYYY-MM-DD>-<plan-name>/ledger.md`
- Handoffs: `$VAULT/sessions/<YYYY-MM-DD>-<plan-name>/handoffs/phase-<N>-<slug>.md`

`$VAULT` resolves to the `VAULT` environment variable. If unset, use `~/vault`.

Use a kebab-case plan name derived from the title, such as `add-retry-logic`.

## Resume existing work

Before continuing implementation:

1. Look for a matching plan under `$VAULT/plans/` by topic, not only filename. If several plans could match, ask which one applies.
2. If a plan exists, read the plan, full ledger, and latest handoff.
3. Continue from the handoff's `next-phase`.

## Plan mode

Use plan mode when the user wants a plan, design, or spec before implementation.

1. Run a `grilling` session to resolve open decisions. Ask one question at a time and use no emoji.
2. Use `domain-modeling` when the discussion changes terminology, boundaries, relationships, or an ADR-worthy decision.
3. Write `$VAULT/plans/<YYYY-MM-DD>-<plan-name>.md` using this template:

```markdown
---
title: <title>
status: draft
created: <date>
---

## Problem

## Approach

## Phases
- [ ] Phase 1: <name>: <one-line description>

## Files touched

## Open questions

## Out of scope
```

4. Keep open questions close to empty by resolving them during grilling.
5. Do not write implementation code in plan mode. After writing the plan, ask the user to reply `approved` before starting.
6. On approval, change the plan status from `draft` to `approved` before any other work.

## Implementation mode

Use implementation mode after plan approval, when resuming an active plan, or for a direct implementation request.

### Start the ledger

Create `$VAULT/sessions/<YYYY-MM-DD>-<plan-name>/ledger.md` and change the plan status to `in-progress`:

```markdown
---
plan: $VAULT/plans/<YYYY-MM-DD>-<plan-name>.md
started: <date>
---

## Log

### <date> <time>
- <what was done>
- Blocked on: <issue or "nothing">
```

Append to the ledger at the start and after each meaningful action. Never rewrite existing entries. If genuinely blocked, stop, record the issue, write a blocked handoff, and tell the user.

### End each phase

Write `$VAULT/sessions/<YYYY-MM-DD>-<plan-name>/handoffs/phase-<N>-<slug>.md` and check off the phase in the plan:

```markdown
---
phase: <N>
name: <slug>
status: complete | partial | blocked
next-phase: <N+1>: <name>
---

## What was done

## Files changed

## State of the system

## What comes next

## Decisions made

## Known issues / tech debt
```

For the final phase, change the plan status to `done`.

## Rules

- Never write implementation code in plan mode.
- Never skip a phase handoff.
- Use the plan, ledger, and latest handoff as the source of truth when resuming.
