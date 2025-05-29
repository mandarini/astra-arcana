# Bonus: Set Up Automated Releases

In this final bonus step, we'll set up automated package publishing in CI using GitHub Actions and Nx Release.

## Prerequisites

Before we begin, make sure you have:

1. An npm account (create one at [npmjs.com](https://www.npmjs.com) if you don't have one)
2. Completed the previous bonus steps for Nx Cloud and CI setup

## Steps

1. Create an npm access token:

   - Go to npmjs.com and log in
   - Click your profile icon → Access Tokens
   - Create a new "Granular Access Token"
   - Enable read and write access for packages
   - Copy the generated token

2. Add the token to GitHub:

   - Go to your repository's Settings → Secrets and variables → Actions
   - Create a new repository secret named `NPM_ACCESS_TOKEN`
   - Paste your npm token as the value

3. Create a new workflow file `.github/workflows/publish.yml`:

```yaml
name: Publish

on:
  push:
    tags:
      - v*.*.*

jobs:
  publish:
    name: Publish
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/

      - run: npm install

      - name: Publish packages
        run: npx nx release publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_ACCESS_TOKEN }}
          NPM_CONFIG_PROVENANCE: true
```

4. To create a new release:

   ```bash
   # Create version updates and changelog
   npx nx release --skip-publish

   # Push changes and tags
   git push && git push --tags
   ```

The workflow will automatically publish your package when you push a new version tag.

## Resources

- [Nx Release Documentation](https://nx.dev/recipes/nx-release/publish-in-ci-cd)
- [npm Access Tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
