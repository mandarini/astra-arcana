# Step 7: Testing with VS Code

Create a new file `.vscode/mcp.json` with:

```json
{
  "servers": {
    "astra-arcana": {
      "command": "node",
      "args": ["${workspaceFolder}/apps/mcp-server/dist/main.js"]
    }
  }
}
```

Then:

1. Open VS Code
2. Open the GitHub Copilot Chat
3. Enable Agent mode
4. The MCP server will start automatically
5. You should see all four tools available in the chat

[Next step](08_publishing_to_npm.md)
