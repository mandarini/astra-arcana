import { SpellcastingSDK } from '@astra-arcana/spellcasting-sdk';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'Astra Arcana',
  version: '1.0.0',
});

const sdk = new SpellcastingSDK();

server.tool('get-ingredients', async () => {
  const ingredients = await sdk.getIngredients();
  return {
    content: [{ type: 'text', text: JSON.stringify(ingredients) }],
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

const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
})();

import { z } from 'zod';

server.tool(
  'cast-spell',
  'Lets the user cast a spell via the Astra Arcana API.',
  { ingredients: z.array(z.string()), incantations: z.array(z.string()) },
  async ({ ingredients, incantations }) => {
    const result = await sdk.castSpell(ingredients, incantations);
    return {
      content: [{ type: 'text', text: JSON.stringify(result) }],
    };
  }
);
