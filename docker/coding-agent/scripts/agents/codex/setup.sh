#!/bin/bash
# Codex CLI setup — system prompt + Playwright MCP

WORKSPACE_DIR=$(pwd)

# Write system prompt to AGENTS.md (Codex reads this automatically)
if [ -n "$SYSTEM_PROMPT" ]; then
    echo "$SYSTEM_PROMPT" > "${WORKSPACE_DIR}/AGENTS.md"
else
    rm -f "${WORKSPACE_DIR}/AGENTS.md"
fi

# Register Playwright MCP server for browser automation
codex mcp add playwright -- npx -y @playwright/mcp@latest --headless --browser chromium 2>/dev/null || true
