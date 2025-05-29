# Step 9: Setting up Local Publishing

Add Verdaccio to the workspace:

```bash
npx nx g @nx/js:setup-verdaccio
```

Start the local registry:

```bash
npx nx run @astra-arcana/source:local-registry
```

Visit http://localhost:4873 to see your local npm registry.

[Next step](10_configuring_release.md)
