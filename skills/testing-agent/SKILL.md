---
name: testing-agent
description: Run an OpenCode testing agent in a shared workdir for smoke tests, browser verification, and end-to-end checks. Use when a task needs a separate agent to exercise a running app rather than inspect code.
tags: testing, browser, opencode
---

# Testing agent

`testing-agent` wraps `opencode run --auto` so smoke sessions share one workdir and model.

## Start

```sh
mkdir -p ~/.local/state/testing-agent/runs
testing-agent --new --title "smoke-<task>" "prompt" > ~/.local/state/testing-agent/runs/<task>.log 2>&1 &
```

`--new` prints the session ID to stderr. Keep it.

The wrapper adds `--auto`. When `TESTING_MODEL_PROVIDER` and `TESTING_MODEL` are set, it also adds `--model "$TESTING_MODEL_PROVIDER/$TESTING_MODEL"`. Pass `-m` to override.

## Follow up

```sh
testing-agent --session ses_... "next instruction"
```

## Workdir

Default: `~/.local/state/testing-agent/workdir`. Override with `--workdir <path>` or `TESTING_WORKDIR`.

The default is outside the repo. Use absolute paths for code, or pass a checkout path if the agent must run project commands.

## Read and clean up

Read the log with the Read tool. Delete the session when done:

```sh
cd ~/.local/state/testing-agent/workdir && opencode session delete ses_...
```

## Rules

- One agent at a time unless the task needs parallel runs.
- Local and dev only. `--auto` approves every tool call the nested agent makes.
- Give it a narrow prompt: what to open, what to click, what to report.
- Do not call `opencode run --auto` directly.
