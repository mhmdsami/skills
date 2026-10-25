---
name: planning-protocol
description: Capture, investigate, plan, execute, resume, and report multi-phase work using Markdown records, including backlog entries and audits. Skip this for trivial code edits outside the documentation workflow.
tags: planning, workflow
---

# Planning protocol

Use the mode matching the request. Capturing or investigating work does not require an implementation plan.

## Storage

Resolve the root from `$WORKLOG` before searching the filesystem or GitHub, then the user's instructions, agent configuration, or the current documentation checkout's INDEX.md. Ask if unresolved. Explicit task-specific paths/formats take precedence.

INDEX.md lists workstreams, projects/services, and short scopes. Match purpose and service; reuse existing ownership, ask if ambiguous. New workstreams get a kebab-case name and one index row. Keep plans out of the index; create no workstream indexes or agent instruction files.

```text
<workstream>/plans/<NN>-<slug>/
  plan.md
  sessions/<NN>-<slug>/
    ledger.md
    handoffs/phase-<N>-<slug>.md
    evidence/
```

Number plans within each workstream and sessions within each plan: 01-, 02-, and so on. Allocate one above the highest existing number, not the folder count; do not reuse deleted numbers or renumber existing work during routine creation. Check for collisions before writing. Keep numeric padding consistent. A resumed chat/tool keeps its session; distinct or concurrent runs get separate sessions and follow repository worktree conventions.

Keep dates in metadata and rely on Git history for versioning. Preserve legacy records without inventing missing plans or ledgers. Use relative links and root-relative metadata paths. Shared docs/, learnings/, audits/, artifacts/, and backlogs/ sit under the workstream, created as needed. Work with ordinary Markdown filesystem tools.

Once the user accepts a plan, commit and push its documentation to the documentation repository's configured remote. This is standing authorization for later plan edits, status changes, ledgers, handoffs, and related records. Batch related edits at meaningful checkpoints; stage only the relevant documentation, preserve unrelated changes, and follow repository Git conventions. Do not initialize a repository or invent a remote. If syncing fails or no remote exists, retain local changes and report the gap.

## Modes

**Capture:** Search existing plans by topic. Save a draft with the problem, supplied context/links, constraints, and unanswered questions. No interview, phases, approval, or session is needed. Adding context preserves active status/history; explicitly new work following a completed plan gets a linked draft.

**Investigate and plan:** Read existing plan/session records. Inspect code and evidence; separate facts, hypotheses, and decisions. Verify findings before prescribing fixes. Use grilling for unresolved user decisions and domain-modeling when terminology or architecture needs work. Disclose a missing required skill before substituting. Write bounded phases, dependencies, acceptance checks, completion, and open questions. Planning-only requests allow planning documents and explicitly authorized supporting material. Investigations can finish with evidenced no-change findings.

**Resume:** Read the plan, full current ledger, latest handoff, and relevant evidence. Recover decisions, rejected findings, authorization, blockers, and unfinished checks. Verify current repositories, worktrees, changes, and revisions; reconcile discrepancies without resetting unrelated work. Missing chat history alone is not a blocker. Continue the next authorized action in the same session, without reinterviewing settled decisions. A summary/handoff request stops at delivery.

**Execute:** Resolve open decisions before dependent edits. Verify the working directory, preserve unrelated changes, and record authorization. Mark execution in-progress. Implement complete agreed scope, including callers/configuration; use generators for generated files. Run acceptance checks, recording passed, failed, and unrun checks. Append results and write phase/transfer handoffs. Continue authorized phases without routine reconfirmation; record blockers and pursue independent work.

**Status:** Read plans at `<workstream>/plans/*/plan.md` and session-only records at that level; exclude nested fixtures/evidence plans. Scope service reports through the index and each plan's repositories. Compare recorded status with evidence; verify relevant PR/delivery state when accessible, otherwise label it unverified. Show plan link, status, next action/blocker, and verification gap. Include drafts. Reports are read-only; requested reconciliation updates only evidenced statuses and preserves history.

## Records

Plan frontmatter: title, status, created, updated, project (workstream). Update updated when editing the plan; preserve created. Executable plans contain Problem, Decisions and evidence, Approach, Phases, Acceptance checks, Completion, Open questions, and Out of scope. Capture needs only frontmatter and supplied context. Acceptance checks use observable outcomes and verified commands. Completion states whether delivered findings, a verified local change, acceptance, or merge is required.

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

Record actual authorization; status alone is insufficient. An implementation request authorizes settled scope without another approval ritual. Preserve authorization across agents; resolve material scope additions separately. Plan acceptance authorizes documentation commits and pushes as described above. Implementation commits and pushes, messages, reviews, and other publishing require their own authorization. Never bypass required checks. Completed phases alone do not mean done.
