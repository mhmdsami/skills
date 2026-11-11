---
name: test-with-agents
description: Run a separate testing agent in a shared workdir for smoke tests, browser verification, and end-to-end checks.
disable-model-invocation: true
tags: testing, browser
---

# Test with agents

`test-with-agents` wraps the OpenCode CLI so smoke sessions share one workdir and model.

## Run

The script is bundled at `scripts/test-with-agents`. Run it directly:

```sh
mkdir -p ~/.local/state/test-with-agents/runs
~/.agents/skills/test-with-agents/scripts/test-with-agents --new --title "smoke-<task>" "prompt" > ~/.local/state/test-with-agents/runs/<task>.log 2>&1 &
```

`--new` prints the session ID to stderr. Keep it.

The script adds `--auto` and always uses `AGENT_TESTING_PROVIDER/AGENT_TESTING_MODEL` as the model. Both are required. `-m` and `--model` are rejected.

## Follow up

```sh
~/.agents/skills/test-with-agents/scripts/test-with-agents --session ses_... "next instruction"
```

## Workdir

Default: `~/.local/state/test-with-agents/workdir`. Override with `--workdir <path>` or `TESTING_WORKDIR`.

The default is outside the repo. Use absolute paths for code, or pass a checkout path if the agent must run project commands.

## Read and clean up

Read the log with the Read tool. Delete the session when done:

```sh
cd ~/.local/state/test-with-agents/workdir && opencode session delete ses_...
```

## Rules

- One agent at a time unless the task needs parallel runs.
- Local and dev only. `--auto` approves every tool call the nested agent makes.
- Give it a narrow prompt: what to open, what to click, what to report.
- Do not call `opencode run --auto` directly.

## Standalone install

If your installer only copies `SKILL.md`, save this as `~/.local/bin/test-with-agents` and make it executable:

```sh
#!/usr/bin/env bash
set -euo pipefail

workdir="${TESTING_WORKDIR:-$HOME/.local/state/test-with-agents/workdir}"
new_session=0

while [ $# -gt 0 ]; do
  case "$1" in
    --workdir) workdir="${2:?--workdir needs a path}"; shift 2 ;;
    --new) new_session=1; shift ;;
    *) break ;;
  esac
done

provider="${AGENT_TESTING_PROVIDER:-}"
model="${AGENT_TESTING_MODEL:-}"
if [ -z "$provider" ] || [ -z "$model" ]; then
  echo "AGENT_TESTING_PROVIDER and AGENT_TESTING_MODEL must be set" >&2
  exit 2
fi

for arg in "$@"; do
  case "$arg" in
    -m|--model|--model=*)
      echo "model is fixed by AGENT_TESTING_PROVIDER/AGENT_TESTING_MODEL" >&2
      exit 2
      ;;
  esac
done

opencode_bin="${OPENCODE_BIN:-$(command -v opencode || true)}"
if [ -z "$opencode_bin" ]; then
  opencode_bin="$HOME/.opencode/bin/opencode"
fi

mkdir -p "$workdir"
cd "$workdir"

if [ "$new_session" = 1 ]; then
  session_id="ses_$(node -e 'process.stdout.write(crypto.randomUUID().replace(/-/g, ""))' 2>/dev/null || openssl rand -hex 16)"
  printf 'session: %s\n' "$session_id" >&2
  set -- --session "$session_id" "$@"
fi

exec "$opencode_bin" run --auto --model "$provider/$model" "$@"
```
