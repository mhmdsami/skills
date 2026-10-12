---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

Interview the user until you reach a shared understanding. Map the idea as a design tree: every decision branches into the decisions that depend on it.

Ask one question per turn and wait for the answer before asking another. Do not bundle independent questions into a message, form, or tool call. Use no emoji.

Choose the next question from decisions whose prerequisites are settled. Prioritize the decision that most affects the remaining design. Give a concise recommendation and the reason for it alongside the question. Offer choices when they make the decision easier. Phrase the question so a short answer clearly identifies a choice.

After each answer, update the tree. Settled decisions unblock dependent questions; changed answers may reopen earlier decisions. Do not ask a question whose answer depends on an unresolved decision.

Finding facts is your job. Inspect available files, tools, and documentation rather than asking the user for information you can look up. Delegate fact-finding when sub-agents are available and permitted. While research runs, you can ask a question that does not depend on its findings. Leave decisions to the user and wait for their answers.

Finish when every relevant branch is resolved. Summarize the agreed decisions and ask the user to confirm the shared understanding before acting on the design.
