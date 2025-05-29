# Step 2: Implementing the MCP Server

First, install the MCP SDK as a dev dependency:

```bash
npm i -D @modelcontextprotocol/sdk
```

Then, replace the contents of `apps/mcp-server/src/main.ts` with:

```typescript
import { SpellcastingSDK } from '@astra-arcana/spellcasting-sdk';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'Astra Arcana',
  version: '1.0.0',
});
```

[Next step](03_adding_tools.md)
