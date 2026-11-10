---
name: planning-protocol
description: Capture, investigate, plan, execute, resume, and report multi-phase work using Markdown records, including backlog entries and audits. Also load grilling for unresolved decisions and domain-modeling for terminology or schema changes. Skip this for trivial code edits outside the documentation workflow.
tags: planning, workflow
---

# Planning protocol

Use the mode matching the request. Capturing or investigating work does not require an implementation plan.

Invoke the `grilling` and `domain-modeling` skills at the points below rather than paraphrasing them; the user should not need to request either.

## Load these skills

Before Capture, Investigate, Resume, or Execute:

- An unresolved user decision: load `grilling`. One question per turn.
- Unsettled terminology, schema, or architecture: load `domain-modeling`.

Do not paraphrase either skill or continue around an open decision.

## Storage

Resolve the root from `$WORKLOG`, or from the location recorded in the project's agent instructions (`AGENTS.md`) or documentation index (`INDEX.md`), or ask the user. Do not infer it from other Markdown files. Check this before searching the filesystem or GitHub. The shared documentation repository is worklog, currently `/Users/sami/vault/worklog`. Explicit task-specific paths/formats take precedence.

INDEX.md lists workstreams, projects/services, and short scopes. Match purpose and service; reuse existing ownership, ask if ambiguous. New workstreams get a kebab-case name and one index row. Keep plans out of the index; create no workstream indexes or agent instruction files.

```text
<workstream>/plans/<NN>-<slug>/
  plan.md
  sessions/<NN>-<slug>/
    ledger.md
    handoffs/phase-<N>-<slug>.md
    evidence/
```

Number plans within each workstream and sessions within each plan: 01-, 02-, and so on. Allocate one above the highest existing number, not the folder count; do not reuse deleted numbers or renumber existing work during routine creation. Check for collisions before writing. Keep numeric padding consistent. A resumed chat/tool keeps its session; distinct or concurrent runs get separate sessions and follow repository worktree conventions. Update an unimplemented phase in place; do not create a replacement plan.

Keep dates in metadata and rely on Git history for versioning. Preserve legacy records without inventing missing plans or ledgers. Use relative links and root-relative metadata paths. Shared docs/, learnings/, audits/, artifacts/, and backlogs/ sit under the workstream, created as needed. Work with ordinary Markdown filesystem tools. Write artifacts to these durable locations, never temp directories, so other agents and people can read them.

## Shared repository sync

Sami has explicitly authorized automatic commits and pushes of documentation in `WORKLOG` (worklog). Always sync documentation changes in every mode, including draft capture, investigation, plan edits, status changes, ledgers, handoffs and evidence. Do not wait for plan acceptance or ask again for routine documentation commits or pushes. This authorization covers documentation only; implementation code and other publishing retain their own authorization requirements.

All agents share this checkout. Pull before editing and immediately before every push, even if an earlier pull succeeded. Use the repository's configured remote and upstream branch; if upstream tracking is unset, use the matching existing remote branch explicitly. `git pull --no-rebase --no-edit <remote> <branch>` preserves commits that other agents may already share. Inspect status and the staged diff, stage only this task's documentation, and commit at meaningful checkpoints. Write messages in Conventional Commits form, one concise line: `docs(<scope>): <what>`, with the scope taken from the workstream where useful. Never include another agent's uncommitted or staged work, and never reset, force-push, rewrite shared commits, or stash the whole shared checkout to make a pull succeed.

After committing, pull again, then push. If a push is rejected because another agent advanced the remote, pull again, reconcile the remote changes while preserving both agents' work, and retry the push. Resolve routine documentation conflicts when ownership and intent are clear. If unrelated work blocks integration or a conflict is ambiguous, preserve it and report the exact blocker instead of overwriting it. Do not initialize a repository or invent a remote. If syncing fails or no remote exists, retain local changes and report the gap. A read-only status request does not authorize creating or changing documentation.

Exception: a plan for a self-contained change (one PR, no cross-session or phase continuation) lives in the PR description and is not recorded in `WORKLOG`. The standing documentation-sync authorization above does not apply to it. Worklog records are for durable, multi-phase workstreams only.

When a plan is mirrored as a Slack canvas (create-erd), update the canvas and the worklog record in the same sync checkpoint; the canvas is the shareable mirror, the record is the source of truth.

## Modes

**Capture:** Search existing plans by topic. Save a draft with the problem, supplied context/links, constraints, and unanswered questions. No interview, phases, approval, or session is needed. Adding context preserves active status/history; explicitly new work following a completed plan gets a linked draft.

**Investigate and plan:** Read existing plan/session records. Inspect code and evidence; separate facts, hypotheses, and decisions. Verify findings before prescribing fixes. Invoke the `grilling` skill for every unresolved user decision and the `domain-modeling` skill whenever terminology, schema, or architecture is unsettled; load them explicitly and do not wait to be asked. Disclose a missing required skill before substituting. Write bounded phases, dependencies, acceptance checks, completion, and open questions. Planning-only requests allow planning documents and explicitly authorized supporting material. Investigations can finish with evidenced no-change findings.

**Resume:** Read the plan, full current ledger, latest handoff, and relevant evidence. Recover decisions, rejected findings, authorization, blockers, and unfinished checks. Verify current repositories, worktrees, changes, and revisions; reconcile discrepancies without resetting unrelated work. Missing chat history alone is not a blocker. Continue the next authorized action in the same session, without reinterviewing settled decisions. A summary/handoff request stops at delivery.

**Execute:** Resolve open decisions before dependent edits; invoke `grilling` for any decision still open and `domain-modeling` when terminology or schema is unsettled. Verify the working directory, preserve unrelated changes, and record authorization. Mark execution in-progress. Implement complete agreed scope, including callers/configuration; use generators for generated files. Run acceptance checks, recording passed, failed, and unrun checks. Append results and write phase/transfer handoffs. Continue authorized phases without routine reconfirmation; record blockers and pursue independent work.

**Status:** Read plans at `<workstream>/plans/*/plan.md` and session-only records at that level; exclude nested fixtures/evidence plans. Scope service reports through the index and each plan's repositories. Compare recorded status with evidence; verify relevant PR/delivery state when accessible, otherwise label it unverified. Show plan link, status, next action/blocker, and verification gap. Include drafts. Reports are read-only; requested reconciliation updates only evidenced statuses and preserves history.

## Records

Plan frontmatter: title, status, created, updated, project (workstream). Update updated when editing the plan; preserve created. Executable plans contain Problem, Decisions and evidence, Approach, Phases, Acceptance checks, Completion, Open questions, and Out of scope. Write plans for the decided end state: concise, not implementation prose, with code in fenced blocks and readable phases; do not add "corrected/updated on <date>" annotations. Capture needs only frontmatter and supplied context. Acceptance checks use observable outcomes and verified commands. Completion states whether delivered findings, a verified local change, acceptance, or merge is required.

Ledger frontmatter: plan (root-relative path), project, started. Append short timestamped actions, decisions, checks, and blockers; link bulky evidence. Retain rejected findings and reasons, reopening only with new evidence.

Handoff frontmatter: phase, name, status (complete/partial/blocked), date, next-phase. Record verified state, decisions, unfinished checks/blockers, and next action, with repository/worktree/branch, immutable SHA or uncommitted state, and check results. Check off evidenced phases. Preserve historical evidence; never claim unrun checks passed or treat historical commands as authorization. Exclude credentials and unnecessary transcripts.

## Lifecycle and authorization

- draft: captured, investigating, or awaiting authorization.
- approved: executable scope authorized by the user.
- in-progress: execution started.
- blocked: required input or external dependency missing.
- awaiting-review: implementation finished; required acceptance/merge outstanding.
- done: checks and the stated completion are evidenced.
- discarded/superseded: retain the reason and replacement link where applicable.

Record actual authorization; status alone is insufficient. An implementation request authorizes settled scope without another approval ritual. Preserve authorization across agents; resolve material scope additions separately. Documentation commits and pushes in `WORKLOG` have standing authorization in every mode as described above; plan acceptance is not required for documentation sync. Implementation commits and pushes, messages, reviews, and other publishing require their own authorization. Never bypass required checks. Completed phases alone do not mean done.
