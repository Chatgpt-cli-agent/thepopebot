#!/bin/bash
# Gemini CLI setup — system prompt + Playwright MCP

WORKSPACE_DIR=$(pwd)

mkdir -p ~/.gemini

# Write system prompt if provided
if [ -n "$SYSTEM_PROMPT" ]; then
    echo "$SYSTEM_PROMPT" > ~/.gemini/SYSTEM.md
    export GEMINI_SYSTEM_MD=~/.gemini/SYSTEM.md
else
    rm -f ~/.gemini/SYSTEM.md
fi

# Register Playwright MCP server for browser automation
gemini mcp add playwright -- npx -y @playwright/mcp@latest --headless --browser chromium 2>/dev/null || true
