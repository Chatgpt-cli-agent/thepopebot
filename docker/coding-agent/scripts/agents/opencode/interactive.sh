#!/bin/bash
# Start OpenCode in tmux, serve via ttyd (workspace runtime only)

tmux -u new-session -d -s opencode 'opencode'
exec ttyd --writable -p "${PORT:-7681}" tmux attach -t opencode
