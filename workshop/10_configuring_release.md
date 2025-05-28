# Step 10: Configuring and Running the Release

Add this configuration to `nx.json`:

```json
{
  ...
  "release": {
    "projects": ["mcp-server"],
    "version": {
      "manifestRootsToUpdate": ["{projectRoot}", "{projectRoot}/dist"],
      "preVersionCommand": "npx nx run mcp-server:setup-publish"
    },
    "changelog": {
      "projectChangelogs": true,
      "workspaceChangelog": false
    }
  },
  ...
  "targetDefaults": {
    ...
    "nx-release-publish": {
      "options": {
        "packageRoot": "{projectRoot}/dist"
      }
    }
    ...
  }
}
```

Test the release process:

```bash
npx nx release --dry-run
```

If everything looks good, run the actual release:

```bash
npx nx release
```

Then publish to the local registry:

```bash
npx nx release publish
```

Visit http://localhost:4873 to see your published package.

[Next step](11_conclusion.md)
