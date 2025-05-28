# Bonus: Protect the Cache

In this bonus step, we'll set up proper cache protection for our Nx Cloud setup. This ensures that only trusted environments can write to the shared cache.

## Steps

1. First, create two different access tokens in Nx Cloud:

   - A read-write token for protected branches (main)
   - A read-only token for all other branches

2. In your GitHub repository:

   - Go to Settings > Environments
   - Create a new environment called "production"
   - Add branch protection rules to only allow the main branch
   - Add the read-write token as a secret named `NX_CLOUD_ACCESS_TOKEN`

3. In your repository's Settings > Secrets and variables > Actions:

   - Add the read-only token as a repository secret named `NX_CLOUD_ACCESS_TOKEN`

4. Update your CI workflow file (`.github/workflows/ci.yml`) by adding this at the top:

```yaml
env:
  NX_CLOUD_ACCESS_TOKEN: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}
```

This setup ensures that:

- Only the main branch can write to the shared cache
- All other branches use a read-only token
- Cache access is properly secured

## Resources

- [Nx Cloud Security](https://nx.dev/using-nx/ci-with-nx/security)
- [GitHub Actions Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
