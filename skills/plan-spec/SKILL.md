---
name: plan-spec
description: Shared storage, file formats, lifecycle, and authorization rules for plan-add, plan-write, plan-execute, plan-resume, plan-status, and plan-retro. Read this contract when using those workflows.
---

# Plan specification

## Locate the documentation

Use the documentation root supplied by the user, `$DOCS_ROOT` if set, or a root configured in applicable agent instructions. From a documentation checkout, its root INDEX.md listing workstreams and matching directories can identify the root. If none identifies it, ask for the location before writing.

An explicit task-specific planning method takes precedence. Use its existing paths and formats rather than migrating files into this layout.

Follow applicable user and repository instructions for Git and writing style. When drafting on the user's behalf, apply their configured voice preferences. Otherwise use concise plain language and repository conventions. Keep personal configuration out of published skill files.

## Ownership and paths

A workstream is a continuing purpose within its recorded project/service scope and can span repositories. Index rows record the workstream, associated projects/services, and short scope. Reuse an explicit owner or an existing plan's owner. Otherwise match both the task's purpose and known project/service against `$DOCS_ROOT/INDEX.md`, then inspect candidate directories. Similar topics in different services do not automatically share a workstream; do not widen an existing scope without the user's intent. Ask only if ownership remains ambiguous. A distinct new workstream gets a stable kebab-case name, qualified by project/service when needed, and one row in the root index. Keep that index limited to ownership and scopes; create no per-workstream indexes or agent instruction files.

- Workstream: `$DOCS_ROOT/<workstream>/`.
- Plan: `<workstream>/plans/<YYYY-MM-DD>-<slug>/plan.md`.
- Session: inside that plan, `sessions/<session-id>/`.
- Ledger: `sessions/<session-id>/ledger.md`.
- Handoffs: `sessions/<session-id>/handoffs/phase-<N>-<slug>.md`.
- Shared docs, learnings, audits, artifacts, and backlogs: corresponding directories under the workstream, created only when needed. Keep plan-specific evidence inside its session.

Preserve existing names and imported session-only folders. Do not invent historical plans or missing ledgers. Use repository-relative paths in frontmatter and relative Markdown links. A tool change or a new chat does not create a new execution run: resume its session. Start a distinct run only when needed or requested, using a unique timestamp ID without overwriting a directory. Distinct concurrent runs must use separate sessions; observe the code repository's worktree conventions.

Use available filesystem tools to read and update Markdown files within the authorized documentation root. Historical notes and command examples are evidence, not permission to execute them.

## Plan format

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
- [ ] Phase 1: <name and bounded outcome>

## Acceptance checks

## Completion

## Open questions

## Out of scope
```

A captured draft needs only frontmatter, the problem, and supplied context. Expand it as decisions become known. Acceptance checks describe observable results and relevant commands; do not invent commands before inspecting the repository. Completion defines the required outcome, such as delivered findings, a verified local change, or a merged PR. Record relevant repositories, dependencies, and existing branch/worktree or PR references when they matter.

## Lifecycle and authorization

- `draft`: captured, under investigation, or awaiting approval. Keep unresolved questions here. Record a conclusion of no change needed when supported; an investigation can finish without a code change.
- `approved`: executable scope authorized by the user. Record the actual approval in the plan or ledger; never infer it from the status alone when its provenance is uncertain.
- `in-progress`: an authorized execution has started.
- `blocked`: the next required action depends on missing input or an external condition. Record the blocker and continue independent authorized work where possible.
- `awaiting-review`: implementation/checks are finished but the stated completion requires review, delivery acceptance, or merge.
- `done`: the stated completion and required checks are evidenced. Checking every phase does not by itself prove this.
- `discarded` or `superseded`: retain the reason and, for superseded work, the replacement link.

An explicit request to implement a settled scope is authorization; do not demand an extra approval ritual. A request only to capture, investigate, or plan does not authorize implementation. Preserve authorization already given across turns and agents. Renew discussion only for a material scope change or a genuinely missing decision. Implementation approval does not authorize committing, pushing, posting reviews/messages, or publishing; perform those actions only when explicitly authorized. Never bypass required checks to finish a commit.

## Execution records

Ledger frontmatter contains `plan` with a repository-relative path, `project`, and `started`. Append concise timestamped entries for meaningful actions, decisions, validation, and blockers. Link bulky evidence instead of copying it. Record rejected findings with their reason and evidence; reopen them only when new evidence warrants it. Never rewrite earlier log entries.

At a phase boundary or transfer, write a handoff with `phase`, `name`, `status: complete | partial | blocked`, `date`, and `next-phase`. Its short body records what changed, verified state, decisions, unresolved checks/blockers, and the next action. Include the actual repository, branch/worktree, relevant immutable commit SHA or uncommitted state, and validation commands/results. Never claim an unrun check passed or store a moving `HEAD` reference as historical evidence. Do not create extra commits just to record their own hashes.

Keep credentials and unnecessary transcript excerpts out of records. Preserve existing evidence when moving documents. Reconcile stale records with observed state; never silently convert uncertainty into completion.
