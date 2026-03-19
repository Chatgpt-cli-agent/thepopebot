#!/bin/bash
# OpenCode setup — write system prompt

WORKSPACE_DIR=$(pwd)

# Write system prompt to AGENTS.md (OpenCode reads this automatically)
if [ -n "$SYSTEM_PROMPT" ]; then
    echo "$SYSTEM_PROMPT" > "${WORKSPACE_DIR}/AGENTS.md"
else
    rm -f "${WORKSPACE_DIR}/AGENTS.md"
fi
