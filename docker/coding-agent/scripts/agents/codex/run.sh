#!/bin/bash
# Run Codex CLI headlessly with the given PROMPT
# Sets AGENT_EXIT for downstream scripts (commit, push, etc.)

CODEX_ARGS=(exec "$PROMPT" --json --full-auto)

if [ -n "$LLM_MODEL" ]; then
    CODEX_ARGS+=(--model "$LLM_MODEL")
fi

if [ "$CONTINUE_SESSION" = "1" ]; then
    CODEX_ARGS=(exec resume --last "$PROMPT" --json --full-auto)
    if [ -n "$LLM_MODEL" ]; then
        CODEX_ARGS+=(--model "$LLM_MODEL")
    fi
fi

set +e
codex "${CODEX_ARGS[@]}"
AGENT_EXIT=$?
set -e
