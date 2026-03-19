#!/bin/bash
# Start Codex CLI in tmux, serve via ttyd (workspace runtime only)

tmux -u new-session -d -s codex 'codex'
exec ttyd --writable -p "${PORT:-7681}" tmux attach -t codex
