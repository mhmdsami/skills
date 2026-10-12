---
name: plan-execute
description: Implement authorized multi-phase work, validate it, and maintain session records. Skip formal bookkeeping for trivial edits.
tags: planning
---

# Execute work

Read plan-spec from sibling or installed skills. Ask for it if missing.

1. Find the plan and authorization. Use plan-resume only if continuing state has not already been recovered. For substantial directly requested work without a plan, use plan-write to record settled scope; resolve open decisions before dependent implementation.
2. Verify the repository/worktree and preserve unrelated edits. Reuse the execution session, record authorization, and mark execution in-progress.
3. Implement complete agreed scope, including callers/configuration. Use generators for generated files; omit unrelated cleanup.
4. Run acceptance checks. Record passed, failed, and unrun checks, including existing failures. Do not skip required hooks.
5. Append results, save phase/transfer handoffs, and check off evidenced outcomes. Continue authorized phases without routine reconfirmation; record blockers and pursue independent work.
6. Assess the completion criterion. Report the result, evidence, and remaining work; acceptance or merge still required means awaiting-review.
