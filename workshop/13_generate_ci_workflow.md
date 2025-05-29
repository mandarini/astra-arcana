# Bonus: Generate CI Workflow

In this bonus step, we'll create an optimized GitHub Actions workflow for our project using Nx Cloud. This workflow will help us automate our build, test, and deployment processes.

## Prerequisites

Before we begin, make sure you have:

1. Completed the [Nx Cloud connection step](12_connect_to_nx_cloud.md)
2. Pushed your code to GitHub

## Steps

1. Generate the CI workflow by running:

```bash
npx nx g ci-workflow
```

This command will:

- Create a new GitHub Actions workflow file
- Configure it to use Nx Cloud for caching and distribution

1. The generated workflow will be placed in `.github/workflows/ci.yml`. It includes:

   - Automatic caching of build artifacts
   - Parallel task execution
   - Integration with Nx Cloud
   - Proper handling of PRs and main branch

2. Commit and push the new workflow file:

```bash
git add .github/workflows/ci.yml
git commit -m "chore: add GitHub Actions workflow"
git push
```

## What's Next?

Your CI pipeline is now set up! When you push changes to GitHub:

- The workflow will automatically run
- Tasks will be distributed across Nx Cloud agents
- Build artifacts will be cached for faster subsequent runs
- You can monitor the build progress in the GitHub Actions tab

## Resources

- [GitHub Actions with Nx](https://nx.dev/using-nx/ci-with-nx/github-actions)
- [Nx Cloud CI Features](https://nx.dev/using-nx/ci-with-nx)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
