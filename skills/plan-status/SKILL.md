---
name: plan-status
description: Report draft, ready, active, blocked, and awaiting-review plans. Read-only unless reconciliation is requested.
---

# Report status

Read plan-spec from sibling or installed skills. Ask for it if missing.

1. Resolve the requested workstream/project/service through the index. Check multi-repository plans against the requested service.
2. Read `<workstream>/plans/*/plan.md` and session-only records at that level, with relevant ledger/handoff evidence. Exclude nested fixtures/evidence plans.
3. Compare recorded status with observed evidence. Verify relevant PR/delivery state when accessible; otherwise label it unverified. Old timestamps or checked phases do not establish completion.
4. Show a compact table: plan link, status, next action/blocker, verification gap. Include drafts; mention completed work when useful. Flag contradictions.

Reports do not change files or dispatch work. Requested reconciliation updates only evidenced statuses and preserves history. The root index remains an ownership directory.
