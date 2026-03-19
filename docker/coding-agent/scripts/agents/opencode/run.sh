#!/bin/bash
# Run OpenCode headlessly with the given PROMPT
# Sets AGENT_EXIT for downstream scripts (commit, push, etc.)

OPENCODE_ARGS=(run --format json)

if [ -n "$LLM_MODEL" ]; then
    OPENCODE_ARGS+=(--model "$LLM_MODEL")
fi

if [ "$CONTINUE_SESSION" = "1" ]; then
    OPENCODE_ARGS+=(--continue)
fi

# Prompt is positional (must come last)
OPENCODE_ARGS+=("$PROMPT")

set +e
opencode "${OPENCODE_ARGS[@]}"
AGENT_EXIT=$?
set -e
