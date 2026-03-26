#!/bin/bash
# Start Claude Code in tmux, serve via ttyd (interactive runtime only)
# CONTINUE_SESSION: 1 = resume session for this port if session file exists

CLAUDE_ARGS="claude --dangerously-skip-permissions"
SESSION_FILE="/home/coding-agent/.claude-ttyd-sessions/${PORT:-7681}"
if [ "$CONTINUE_SESSION" = "1" ] && [ -f "$SESSION_FILE" ]; then
    CLAUDE_ARGS="$CLAUDE_ARGS --resume $(cat $SESSION_FILE)"
fi

tmux -u new-session -d -s claude -e PORT="${PORT:-7681}" $CLAUDE_ARGS
exec ttyd --writable -p "${PORT:-7681}" tmux attach -t claude
