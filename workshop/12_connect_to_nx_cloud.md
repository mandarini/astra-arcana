# Bonus: Connect to Nx Cloud

In this optional bonus step, we'll connect our project to Nx Cloud to enable remote caching and distributed task execution. This will make our builds faster and more efficient, especially as the project grows.

## Prerequisites

Before we begin, make sure you have:

1. Pushed your code to GitHub
2. Created an account on [Nx Cloud](https://cloud.nx.app)

## Steps

1. First, let's connect our repository to Nx Cloud:

```bash
npx nx connect
```

This command will:

- Guide you through the authentication process
- Create a new Nx Cloud project
- Update your `nx.json` file with the necessary configuration by making a PR on GitHub (which you'll have to merge)

2. After connecting, you'll see a new section in your `nx.json` file that looks like this:

```json
{
  "nxCloudAccessToken": "your-token-here"
}
```

3. Pull the updated code locally!

Now you can take advantage of Nx Cloud features

## Resources

- [Nx Cloud Documentation](https://nx.dev/using-nx/nx-cloud)
- [CI with Nx Cloud](https://nx.dev/using-nx/ci-with-nx)
- [Remote Caching](https://nx.dev/using-nx/remote-caching)
