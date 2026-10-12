---
name: plan-execute
description: Implement authorized multi-phase work from a plan, validate outcomes, and maintain its session ledger and handoffs. Use after implementation is authorized; skip formal bookkeeping for trivial edits.
---

# Execute planned work

Read `plan-spec` from the sibling source directory or installed skills. If unavailable, request the dependency before writing records.

1. Locate the relevant plan and authorization. For continuing work whose state has not yet been recovered, use plan-resume before modifying files. Once recovery is complete, continue below without invoking it again in the same run. If no plan exists and substantial implementation is directly requested, use plan-write to record the settled scope; do not restart approval for work already authorized. Resolve genuinely open decisions before dependent implementation.
2. Inspect the affected code and required repository guidance. Preserve unrelated changes. Use the repository's worktree conventions and verify the actual working directory before editing. `git status --short`, `git branch --show-current`, and `git rev-parse HEAD` provide context when this is a Git checkout.
3. Reuse the current execution session or create a unique one for a distinct run. Start an append-only ledger and record actual authorization if needed. Mark the plan in-progress when execution starts; log actions after they happen.
4. Implement the smallest complete change, including affected callers, configuration, and generated files. Use the repository's generators instead of hand-editing generated output. Keep optional cleanup outside the agreed scope.
5. Run checks appropriate to the changed behavior and stated acceptance criteria. Reproduce user-visible problems where possible. Distinguish checks that passed, failed, or were not run. Record existing failures without hiding them or bypassing required hooks. A finding is not a bug merely because an agent reported it.
6. At each phase boundary, append concise results, write the handoff, and check off evidenced outcomes. On a blocker, record it and continue independent authorized work when useful. At transfer, leave enough repository and validation context for another tool to resume.
7. Assess the plan's completion condition. Use awaiting-review when acceptance or merge remains required; use done only when completion is evidenced. Report the result, evidence, and remaining work.

Do not stop midway through already authorized phases for routine confirmation. A partial implementation is not completion. Committing, pushing, posting, or publishing still requires the corresponding explicit authorization.
