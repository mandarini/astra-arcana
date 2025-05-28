# Step 4: Implementing the Transport Layer

Add this code at the end of `apps/mcp-server/src/main.ts`:

```typescript
const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
})();
```

[Next step](05_testing_with_inspector.md)
