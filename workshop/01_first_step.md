# Step 1: Creating the MCP Server

Let's create our MCP server using Nx generators. Copy and paste these commands:

## Add the Nx Node plugin

```bash
npx nx add @nx/node
```

## Generate a new Node application

```bash
npx nx generate @nx/node:application --directory=apps/mcp-server --framework=none --bundler=webpack --no-interactive
```

This will create a new Node application in the `apps/mcp-server` directory with all the necessary configuration.

[Next step](02_implementing_server.md)
