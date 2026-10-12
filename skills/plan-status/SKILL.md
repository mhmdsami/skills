---
name: plan-status
description: Report ready, active, blocked, awaiting-review, and completed work from recorded plans and evidence. Use for progress or workstream overviews; reporting is read-only unless reconciliation is requested.
---

# Report work status

Read `plan-spec` from the sibling source directory or installed skills. If unavailable, disclose that limitation rather than guessing the format.

1. Resolve the requested workstream, project/service, or documentation root. For a project/service overview, use the index to find owning workstreams and check each plan's relevant repositories to keep the report scoped. Enumerate `<workstream>/plans/*/plan.md` and imported session-only folders at that same level. Exclude nested evidence and fixture plans from the work queue. Read relevant frontmatter, phases, current ledger entries, and handoffs. Keep the scope to the user's request.
2. For each relevant item, distinguish recorded status from observed evidence. Report approved/ready work, active work and its next action, blockers and their owner, and work awaiting acceptance or merge. Mention completed work when useful; do not dump its entire history.
3. Verify linked PR or delivery state when access is available and material to the question, using read-only tools. If access is unavailable, say that status is unverified. Do not treat a checked phase list, missing transcript, or old timestamp as proof that work is done or abandoned.
4. Present a compact table with plan link, status, next action or blocker, and any material verification gap. Flag contradictory records and suggest the specific reconciliation needed.

Do not modify plans, dispatch agents, poll indefinitely, or contact others as part of a status report. If the user requests reconciliation, update only statuses supported by evidence, preserve history, and explain what changed. The root index remains a workstream directory, not a task dashboard.
