---
name: test-with-agents
description: Run a separate testing agent in a shared workdir for smoke tests, browser verification, and end-to-end checks.
disable-model-invocation: true
tags: testing, browser
---

# Test with agents

`test-with-agents` starts and steers an OpenCode testing agent in a shared workdir.

## Install

```sh
mkdir -p ~/.local/bin
curl -fsSL https://raw.githubusercontent.com/mhmdsami/skills/main/skills/test-with-agents/scripts/test-with-agents -o ~/.local/bin/test-with-agents
chmod +x ~/.local/bin/test-with-agents
```

A repo install also has the script at `scripts/test-with-agents`.

## Start

```sh
~/.local/bin/test-with-agents start --title "smoke-<task>" --prompt-file prompt.md --json
```

Returns `session`, `log`, `workdir`, and `pid`. The prompt can also be passed with `--prompt` or as the last argument.

## Status and wait

```sh
~/.local/bin/test-with-agents status <session> --json
~/.local/bin/test-with-agents wait <session> --timeout 900 --json
```

`status` reports whether the agent is still running and its exit code. `wait` blocks until it finishes and returns the agent’s exit code, or 124 on timeout.

## Send

```sh
~/.local/bin/test-with-agents send <session> "check the cart page" --json
```

## Cleanup

```sh
~/.local/bin/test-with-agents cleanup <session>
```

Removes the OpenCode session and its run directory. Add `--keep-logs` to keep the logs.

## Workdir

Default: `~/.local/state/test-with-agents/workdir`. Override with `--workdir <path>` on `start` or `TESTING_WORKDIR`.

The default is outside the repo. Use absolute paths for code, or pass a checkout path when the agent must run project commands.

## Rules

- Set `AGENT_TESTING_PROVIDER` and `AGENT_TESTING_MODEL`. The script rejects per-run model overrides.
- One agent at a time unless the task needs parallel runs.
- Local and dev only. `--auto` approves every tool call the nested agent makes.
- Give it a narrow prompt: what to open, what to click, what to report.
- Do not call `opencode run --auto` directly.
