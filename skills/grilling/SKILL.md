---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or when planning has unresolved decisions.
tags: planning, decisions
credit: Matt Pocock's grilling
credit-url: https://github.com/mattpocock/skills
---

Map decisions and their dependencies. Ask one question per turn, wait for the answer, and use no emoji. Give a concise recommendation with its reason. Offer choices when useful.

## Format

Number questions sequentially across the session. List choices, then name the chosen letter in the recommendation.

```md
1. Which cache key should we use?

a. Tenant-scoped
b. Global

(recommended) a - The same record id can exist under two tenants.
```

Choose the highest-impact decision whose prerequisites are settled. After each answer, update dependent decisions and reopen earlier ones if needed. Never bundle questions or ask downstream questions before their prerequisites are resolved.

Look up facts yourself and delegate when permitted. While research runs, ask only questions independent of it. Leave decisions to the user.

When the relevant decisions are resolved, summarize and confirm shared understanding before acting on the design.
