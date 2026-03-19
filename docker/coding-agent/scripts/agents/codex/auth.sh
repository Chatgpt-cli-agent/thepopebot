#!/bin/bash
# Codex CLI auth — write OAuth token to auth.json or use API key
if [ -n "$CODEX_OAUTH_TOKEN" ]; then
    mkdir -p ~/.codex
    echo "$CODEX_OAUTH_TOKEN" > ~/.codex/auth.json
    unset CODEX_API_KEY
fi
# Otherwise CODEX_API_KEY stays in env and Codex uses it directly
