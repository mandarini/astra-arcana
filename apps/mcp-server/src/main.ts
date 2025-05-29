import { SpellcastingSDK } from '@astra-arcana/spellcasting-sdk';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { z } from 'zod';

const server = new McpServer({
  name: 'astra arcana',
  version: '0.1.0',
});

const sdk = new SpellcastingSDK();

server.tool('get-ingredients', async () => {
  const ingredients = await sdk.getIngredients();
  return {
    content: [{ type: 'text', text: JSON.stringify(ingredients, null, 2) }],
  };
});

server.tool('get-incantations', async () => {
  const incantations = await sdk.getIncantations();
  return {
    content: [{ type: 'text', text: JSON.stringify(incantations) }],
  };
});

server.tool('get-recipes', async () => {
  const recipes = await sdk.getRecipes();
  return {
    content: [{ type: 'text', text: JSON.stringify(recipes) }],
  };
});

server.tool(
  'cast-spell',
  'lets you cast a spell using the astra arcana api',
  { ingredients: z.array(z.string()), incantations: z.array(z.string()) },
  async ({ ingredients, incantations }) => {
    const result = await sdk.castSpell(ingredients, incantations);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  }
);

const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
})();
