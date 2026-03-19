#!/bin/bash
# Run Gemini CLI headlessly with the given PROMPT
# Sets AGENT_EXIT for downstream scripts (commit, push, etc.)

GEMINI_ARGS=(-p "$PROMPT" --output-format stream-json --approval-mode yolo)

if [ -n "$LLM_MODEL" ]; then
    GEMINI_ARGS+=(--model "$LLM_MODEL")
fi

if [ "$PERMISSION" = "plan" ]; then
    GEMINI_ARGS+=(--approval-mode plan)
fi

if [ "$CONTINUE_SESSION" = "1" ]; then
    GEMINI_ARGS+=(--resume)
fi

set +e
gemini "${GEMINI_ARGS[@]}"
AGENT_EXIT=$?
set -e
