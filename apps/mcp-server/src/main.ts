import { SpellcastingSDK } from '@astra-arcana/spellcasting-sdk';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'Astra Arcana',
  version: '1.0.0',
});
