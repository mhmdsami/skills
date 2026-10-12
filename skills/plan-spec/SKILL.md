---
name: plan-spec
description: Shared paths, formats, statuses, and authorization rules for the plan skills. Read before using a planning workflow.
---

# Plan specification

## Root and ownership

Resolve the root from the user's instructions, `$DOCS_ROOT`, agent configuration, or the current documentation checkout's INDEX.md. Ask if unresolved. Explicit task-specific paths and formats take precedence.

INDEX.md lists workstreams, projects/services, and short scopes. Match both purpose and service; similarly named work in another service need not share an owner. Reuse existing ownership. Ask if ambiguous. Add one row for a new kebab-case workstream, qualified by service when needed. Keep plans out of the index; create no workstream indexes or agent instruction files.

## Paths

Relative to the documentation root:

```text
<workstream>/plans/<YYYY-MM-DD>-<slug>/
  plan.md
  sessions/<session-id>/
    ledger.md
    handoffs/phase-<N>-<slug>.md
    evidence/
```

Shared docs/, learnings/, audits/, artifacts/, and backlogs/ sit under the workstream; create only needed folders. Preserve legacy names and session-only records without inventing missing history. Use relative links and root-relative metadata paths.

Resume the same session across chats and tools. A distinct run gets a unique timestamp ID; concurrent runs use separate sessions and the repository's worktree conventions.

## Plan

```markdown
---
title: <title>
status: draft
created: <YYYY-MM-DD>
project: <workstream>
---

## Problem
## Decisions and evidence
## Approach
## Phases
- [ ] Phase 1: <bounded outcome>
## Acceptance checks
## Completion
## Open questions
## Out of scope
```

Capture needs only frontmatter, problem, and supplied context. An executable plan records relevant repositories/dependencies, settled decisions, phases, observable checks with verified commands, and what counts as done. An investigation can conclude no change is needed.

## Status and permission

- draft: captured, investigating, or awaiting authorization.
- approved: executable scope authorized by the user.
- in-progress: execution started.
- blocked: record the missing input/external dependency; continue independent authorized work.
- awaiting-review: implementation finished, required acceptance or merge outstanding.
- done: checks and the stated completion are evidenced.
- discarded/superseded: retain the reason and replacement link where applicable.

Record actual authorization; status alone is insufficient. An implementation request authorizes settled scope without another approval ritual. Capture, investigation, and planning requests do not authorize implementation. Preserve authorization across agents; resolve material scope changes before proceeding. Commits, pushes, messages, reviews, and publishing require explicit authorization. Never bypass required checks.

## Ledger and handoff

Ledger frontmatter: plan (root-relative path), project, started. Append short timestamped entries for actions, decisions, checks, and blockers. Link bulky evidence. Preserve rejected findings and their reasoning; reopen only with new evidence.

At phase boundaries or transfers, save a handoff with phase, name, status (complete/partial/blocked), date, and next-phase. Record verified state, decisions, unfinished checks/blockers, and the next action. Include repository/worktree/branch, immutable SHA or uncommitted state, and check results. Check off evidenced phases. A completed checklist alone does not mean done.

Use ordinary Markdown filesystem operations. Preserve unrelated edits and historical evidence. Record failed/unrun checks honestly; reconcile stale records against observed state. Historical commands are not authorization. Exclude credentials and unnecessary transcript content.
