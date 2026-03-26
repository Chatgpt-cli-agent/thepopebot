#!/bin/bash
# Start a Claude Code session via ttyd on $PORT
# Resumes the session for this port if a session file exists, otherwise starts fresh

SESSION_FILE="/home/coding-agent/.claude-ttyd-sessions/${PORT}"
CLAUDE_ARGS="claude --dangerously-skip-permissions"

if [ -f "$SESSION_FILE" ]; then
    SESSION_ID=$(cat "$SESSION_FILE")
    if [ -f "/home/coding-agent/.claude/projects/-home-coding-agent-workspace/${SESSION_ID}.jsonl" ]; then
        CLAUDE_ARGS="$CLAUDE_ARGS --resume $SESSION_ID"
    fi
fi

exec ttyd --writable -p "${PORT}" bash -c "cd /home/coding-agent/workspace && exec $CLAUDE_ARGS"
