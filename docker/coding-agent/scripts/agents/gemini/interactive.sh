#!/bin/bash
# Start Gemini CLI in tmux, serve via ttyd (workspace runtime only)

tmux -u new-session -d -s gemini 'gemini --approval-mode yolo'
exec ttyd --writable -p "${PORT:-7681}" tmux attach -t gemini
