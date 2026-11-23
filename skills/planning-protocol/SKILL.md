---
name: planning-protocol
description: Capture, investigate, plan, execute, resume, and report multi-phase work, including backlog entries and audits. Skip this for trivial code edits outside the documentation workflow.
tags: planning, workflow
---

# Planning protocol

Use the mode matching the request. Capturing or investigating work does not require an implementation plan.

## Skills

Load `grilling` for every unresolved user decision. When installed, load `domain-modeling` for unsettled terminology, schema, or architecture. If `domain-modeling` is unavailable, resolve the ambiguity directly and disclose the gap. Do not paraphrase either skill or continue around an open decision.

## Storage

Resolve the root from `$WORKLOG`, the project's `AGENTS.md` or `INDEX.md`, or ask. Do not infer it from other Markdown. The shared documentation repository is the worklog checkout. Task-specific paths and formats take precedence.

`INDEX.md` lists workstreams, projects/services, and short scopes. Match purpose and service, and reuse existing ownership or ask if ambiguous. New workstreams get a kebab-case name and one index row. Keep plans out of the index. Create no workstream indexes or agent instruction files.

```text
<workstream>/plans/<NN>-<slug>/
  plan.md
  sessions/<NN>-<slug>/
    ledger.md
    handoffs/phase-<N>-<slug>.md
    evidence/
```

Number plans within each workstream and sessions within each plan as 01-, 02-, and so on. Allocate one above the highest existing number, not the folder count. Do not reuse deleted numbers or renumber existing work. Check for collisions before writing. Keep numeric padding consistent. A resumed chat or tool keeps its session. Distinct or concurrent runs get separate sessions and follow repository worktree conventions. Update an unimplemented phase in place instead of creating a replacement plan.

Keep dates in metadata and rely on Git history. Preserve legacy records without inventing missing plans or ledgers. Use relative links and root-relative metadata paths. Shared docs, learnings, audits, artifacts, and backlogs sit under the workstream, created as needed. Write artifacts to durable locations, never temp directories, so other agents and people can read them.

## Authorization and sync

Documentation commits and pushes are authorized only when the user or project instructions say so. Without that authorization, ask before each commit or push. This covers documentation only. Code, messages, reviews, and other publishing need their own authorization. Status alone is not authorization, and a read-only status request does not authorize writes.

When documentation sync is authorized, sync in every mode, including drafts, investigation, plans, status, ledgers, handoffs, and evidence. Do not wait for plan acceptance or ask again for routine documentation commits. Pull before editing and immediately before every push. Use the configured remote and upstream branch. If upstream tracking is unset, use the matching existing remote branch explicitly. `git pull --no-rebase --no-edit <remote> <branch>` preserves commits other agents may share.

Inspect status and the staged diff, stage only this task's documentation, and commit at meaningful checkpoints. Use one-line Conventional Commits such as `docs(<scope>): <what>`. Never include another agent's uncommitted or staged work. Never reset, force-push, rewrite shared commits, or stash the whole checkout to make a pull succeed. After committing, pull again, then push. If a push is rejected, pull again, reconcile while preserving both agents' work, and retry. Resolve routine documentation conflicts when ownership and intent are clear. If unrelated work blocks integration or a conflict is ambiguous, preserve it and report the blocker. Do not initialize a repository or invent a remote. If sync fails or no remote exists, retain local changes and report the gap.

A self-contained change (one PR, no cross-session or phase continuation) keeps its plan in the PR description and is not recorded in `WORKLOG`. Worklog records are for durable, multi-phase workstreams only.

When a plan is mirrored as a Slack canvas, update the canvas and the worklog record in the same sync checkpoint. The canvas is the shareable mirror, and the record is the source of truth.

## Modes

**Capture:** Search existing plans by topic. Save a draft with the problem, supplied context and links, constraints, and unanswered questions. No interview, phases, approval, or session is needed. Adding context preserves active status and history. New work following a completed plan gets a linked draft.

**Investigate and plan:** Read existing plan and session records. Inspect code and evidence. Separate facts, hypotheses, and decisions. Verify findings before prescribing fixes. Load skills as described above. Write bounded phases, dependencies, acceptance checks, completion, and open questions. Planning-only requests allow planning documents and explicitly authorized supporting material. Investigations can finish with evidenced no-change findings.

**Resume:** Read the plan, full ledger, latest handoff, and relevant evidence. Recover decisions, rejected findings, authorization, blockers, and unfinished checks. Verify repositories, worktrees, changes, and revisions. Reconcile discrepancies without resetting unrelated work. Missing chat history alone is not a blocker. Continue the next authorized action in the same session without reinterviewing settled decisions. A summary or handoff request stops at delivery.

**Execute:** Resolve open decisions before dependent edits. Load skills as described above. Verify the working directory, preserve unrelated changes, and record authorization. Mark execution in-progress. Implement the agreed scope, including callers and configuration. Use generators for generated files. Run acceptance checks and record passed, failed, and unrun checks. Append results and write phase or transfer handoffs. Continue authorized phases without routine reconfirmation. Record blockers and pursue independent work.

**Status:** Read plans at `<workstream>/plans/*/plan.md` and session-only records at that level. Exclude nested fixtures and evidence plans. Scope service reports through the index and each plan's repositories. Compare recorded status with evidence. Verify PR or delivery state when accessible, otherwise label it unverified. Show the plan link, status, next action or blocker, and verification gap. Include drafts. Reports are read-only. Requested reconciliation updates only evidenced statuses and preserves history.

## Records

Plan frontmatter: title, status, created, updated, project (workstream). Update `updated` when editing and preserve `created`. Executable plans contain Problem, Decisions and evidence, Approach, Phases, Acceptance checks, Completion, Open questions, and Out of scope. Write for the decided end state: concise, not implementation prose, with code in fenced blocks and readable phases. Do not add "corrected/updated on <date>" annotations. Capture needs only frontmatter and supplied context. Acceptance checks use observable outcomes and verified commands. Completion states whether delivered findings, a verified local change, acceptance, or merge is required.

Ledger frontmatter: plan (root-relative path), project, started. Append short timestamped actions, decisions, checks, and blockers. Link bulky evidence. Retain rejected findings and reasons, reopening only with new evidence.

Handoff frontmatter: phase, name, status (complete/partial/blocked), date, next-phase. Record verified state, decisions, unfinished checks and blockers, and next action, with repository, worktree, branch, immutable SHA or uncommitted state, and check results. Check off evidenced phases. Preserve historical evidence. Never claim unrun checks passed or treat historical commands as authorization. Exclude credentials and unnecessary transcripts.

## Lifecycle

- draft: captured, investigating, or awaiting authorization.
- approved: executable scope authorized by the user.
- in-progress: execution started.
- blocked: required input or external dependency missing.
- awaiting-review: implementation finished, with required acceptance or merge outstanding.
- done: checks and the stated completion are evidenced.
- discarded/superseded: retain the reason and replacement link where applicable.

An implementation request authorizes settled scope without another approval ritual. Preserve authorization across agents. Resolve material scope additions separately. Never bypass required checks. Completed phases alone do not mean done.
