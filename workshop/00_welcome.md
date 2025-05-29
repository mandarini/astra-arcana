# Building an MCP Server with Nx

Welcome to this hands-on workshop where we'll explore the Model Context Protocol (MCP) and build our own MCP server using Nx!

## What You'll Learn

In this workshop, we'll:

1. Set up a new Node application in an Nx monorepo
2. Implement an MCP server using the official TypeScript SDK
3. Create tools that expose functionality to AI agents
4. Test our implementation using the MCP Inspector
5. Make our server executable and publish it to `npm`

## Prerequisites

- A code editor (VS Code or Cursor recommended)
- Node.js installed on your machine

## Workshop Structure

1. **Introduction to MCP** - Understanding the protocol and its importance
2. **Setting Up the Project** - Creating a new Node application in Nx
3. **Building the Server** - Implementing the MCP server with basic tools
4. **Testing with Inspector** - Using the MCP Inspector to test our implementation
5. **Adding Action Tools** - Implementing tools that can take actions
6. **Publishing to npm** - Making our server available to others

## Getting Started

The workshop uses a fictional startup called Astra Arcana as an example - a magical SaaS company that lets users cast spells through their API. We'll build an MCP server that allows AI agents to browse ingredients, learn incantations, and even cast spells!

To get started, clone the workshop repository:

```bash
git clone https://github.com/MaxKless/astra-arcana
cd astra-arcana
```

Then follow along with the exercises in each section. Each step includes detailed instructions and explanations to help you understand what we're building and why.

## Workshop Steps

1. [Welcome](00_welcome.md) - Introduction to MCP and workshop overview
2. [First Step](01_first_step.md) - Creating the MCP Server
3. [Implementing Server](02_implementing_server.md) - Setting up the MCP server instance
4. [Adding Tools](03_adding_tools.md) - Implementing basic MCP tools
5. [Implementing Transport](04_implementing_transport.md) - Setting up the transport layer
6. [Testing with Inspector](05_testing_with_inspector.md) - Using the MCP Inspector
7. [Adding Action Tools](06_adding_action_tools.md) - Implementing tools that can take actions
8. [Testing with VS Code](07_testing_with_vscode.md) - Testing with VS Code and GitHub Copilot
9. [Preparing for npm](08_publishing_to_npm.md) - Making the package publishable
10. [Setting up Local Publishing](09_release_configuration.md) - Configuring Verdaccio
11. [Configuring Release](10_configuring_release.md) - Setting up the release process

## Bonus Steps

12. [Connect to Nx Cloud](12_connect_to_nx_cloud.md) - Enable remote caching and distributed task execution
13. [Generate CI Workflow](13_generate_ci_workflow.md) - Create an optimized GitHub Actions workflow
14. [Protect Cache](14_protect_cache.md) - Secure your Nx Cloud cache with proper access tokens
15. [Setup CI Release](15_setup_ci_release.md) - Automate package publishing in CI
16. [Bonus Conclusion](16_bonus_conclusion.md) - Summary of bonus steps and next steps

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Nx Documentation](https://nx.dev)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

Let's begin our journey into making AI agents more powerful with MCP! 🚀

[goto first step](01_first_step.md)
