# Step 3: Adding MCP Tools

Add these tools to `apps/mcp-server/src/main.ts` after the server initialization:

```typescript
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
```

[Next step](04_implementing_transport.md)
