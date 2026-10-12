---
name: plan-resume
description: Recover an existing plan and session across chats or agents, then continue its authorized next action.
---

# Resume work

Read plan-spec from sibling or installed skills. Ask for it if missing.

1. Locate the referenced plan by topic/path; ask if multiple candidates fit. Read its full current ledger and latest handoff, including relevant evidence. Recover decisions, rejected findings, authorization, completion, blockers, and unfinished checks.
2. Verify current repositories/worktrees, changes, and revisions against those records. For Git use status --short, branch --show-current, rev-parse HEAD, and worktree list. Do not reset or check out files merely to match stale notes.
3. Resolve material discrepancies, concurrent ownership, or missing authorization before dependent edits. Missing chat history alone is not a blocker.
4. State the next action. For continuation, pass recovered state to plan-execute using the same session; do not repeat recovery or reinterview settled decisions. For a summary/handoff request, stop after delivering it.
