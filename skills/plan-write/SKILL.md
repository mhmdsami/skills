---
name: plan-write
description: Investigate a task, triage findings, resolve design decisions, and write a bounded plan with acceptance checks. Use for planning or preparing work for another agent, not for implementing it.
---

# Prepare executable work

Read `plan-spec` from the sibling source directory or installed skills. If it is unavailable, request the dependency before writing.

1. Resolve the owner and search for existing work. Read a matching plan, its current ledger, and latest handoff before revising it. For an active execution, preserve its history and distinguish the requested revision from settled scope.
2. Inspect relevant code, existing patterns, documents, and available evidence. Separate facts, hypotheses, and user decisions. For bugs or review findings, establish the behavior and disposition before prescribing fixes. Preserve previously rejected findings unless new evidence changes them.
3. Use the user's grilling skill when genuine decisions need their input. Look up facts yourself; do not ask questions already answered in the conversation or records. Use domain-modeling only when terminology, relationships, or consequential architectural decisions need work. If a needed skill is missing, disclose it and ask whether to proceed without it.
4. Write or revise the plan using the shared format. Keep scope and phases proportional to the task. Include dependencies across repositories, observable acceptance checks, a clear completion condition, and remaining questions. An investigation may conclude no change is needed; preserve its evidence rather than inventing implementation work.
5. Present the concrete plan and any unresolved decisions. If execution has already been explicitly authorized and the scope is settled, record that authorization and continue through plan-execute. Otherwise leave implementation plans draft and wait for authorization. An investigation with evidenced no-change findings can finish under its completion criterion, or await acceptance if required. Do not ask for implementation approval when no implementation is proposed, or require the literal word approved.

During a planning-only request, change planning documents and explicitly authorized supporting material only. Do not implement, commit, or publish the proposed change. If revising active work materially expands scope, record the proposed addition separately from the prior authorization.
