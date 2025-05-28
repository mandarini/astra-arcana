# Step 6: Adding Action Tools

First, install zod:

```bash
npm install zod
```

Then add this tool to `apps/mcp-server/src/main.ts` after the previous tools:

```typescript
import { z } from 'zod';

server.tool('cast-spell', 'Lets the user cast a spell via the Astra Arcana API.', { ingredients: z.array(z.string()), incantations: z.array(z.string()) }, async ({ ingredients, incantations }) => {
  const result = await sdk.castSpell(ingredients, incantations);
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
  };
});
```

[Next step](07_testing_with_vscode.md)
