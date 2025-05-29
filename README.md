# Astra Arcana MCP Server

Astra Arcana is a magical SaaS company that lets you cast spells from anywhere with a few simple clicks. This repository contains an MCP (Model Context Protocol) server implementation that allows AI agents to interact with the Astra Arcana spellcasting system.

## Features

- Browse available spell ingredients
- Learn ancient incantations
- Discover spell recipes
- Cast spells directly through AI agents

## Getting Started

Install the package:

```bash
npm install @astra-arcana/mcp-server
```

Or use it directly with npx:

```bash
npx @astra-arcana/mcp-server
```

## Usage with VS Code

Add this configuration to `.vscode/mcp.json`:

```json
{
  "servers": {
    "astra-arcana": {
      "command": "node",
      "args": ["${workspaceFolder}/node_modules/@astra-arcana/mcp-server/main.js"]
    }
  }
}
```

Then open GitHub Copilot Chat in VS Code and enable Agent mode to start casting spells!

## Try it Out

Visit https://astra-arcana.pages.dev to see the web interface and check your spell logs.

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Workshop

This repository is also used as an example in the workshop about building MCP servers. If you're interested in learning how to build your own MCP server, check out the [workshop instructions](workshop/00_welcome.md)!
