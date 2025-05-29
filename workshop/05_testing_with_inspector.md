# Step 5: Testing with the MCP Inspector

Replace the `serve` target in `apps/mcp-server/package.json` with:

```json
"serve": {
  "command": "npx -y @modelcontextprotocol/inspector node ./apps/mcp-server/dist/main.js",
  "dependsOn": ["build"],
  "continuous": true
}
```

Then run the server:

```bash
npx nx serve mcp-server
```

Visit http://localhost:6274 to see the MCP Inspector interface.

[Next step](06_adding_action_tools.md)
