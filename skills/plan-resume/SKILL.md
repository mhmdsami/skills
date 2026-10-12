---
name: plan-resume
description: Recover an existing plan's execution state across chats, tools, or agents, then continue the authorized next action. Use for handoffs, usage-limit switches, and resuming interrupted work.
---

# Resume work

Read `plan-spec` from the sibling source directory or installed skills. If unavailable, request the dependency before changing records.

1. Locate the plan from the user's reference, workstream, or task. Search by content as well as filename. If multiple candidates still fit, ask which one; do not create a replacement plan because the current tool lacks chat history.
2. Read the plan, full current ledger, and latest handoff. Follow linked evidence only as needed. Recover settled decisions, rejected findings, scope/authorization, completion criteria, unfinished checks, and blockers. For imported session-only folders, use their existing records without inventing a historical plan or missing ledger.
3. Locate the referenced repositories and verify branch/worktree, working-tree changes, and relevant immutable revisions. Read current repository instructions. When applicable use `git status --short`, `git branch --show-current`, `git rev-parse HEAD`, and `git worktree list`. Old paths, prior chat tool results, and plan status alone do not prove the current state. Do not check out a branch or reset files merely to make records appear correct.
4. Reconcile observed differences with the records. Preserve unrelated edits and retain disproved findings unless new evidence warrants reopening them. If ownership, concurrent writes, scope, or required authorization is genuinely unclear, resolve that issue before dependent work.
5. Briefly state the recovered next action. If the user asked to continue, keep the same plan and execution session and proceed through plan-execute under existing authorization. A tool switch is not a new execution run. If asked only for a handoff or summary, provide that and stop without implementation.

Do not reinterview the user about settled decisions, silently broaden permissions, or restart from phase one. Missing transcript history is not itself a blocker when durable records and observed state suffice.
