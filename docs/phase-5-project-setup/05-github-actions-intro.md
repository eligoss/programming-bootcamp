# GitHub Actions Intro

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What CI/CD means
- How GitHub Actions works
- Setting up basic checks

## The Big Idea

GitHub Actions automatically runs tasks when you push code:
- **Lint your code** — Find problems
- **Build the project** — Make sure it compiles
- **Run tests** — Verify features work

This is called **CI** (Continuous Integration).

## Why Automate Checks?

Without automation:
> "It works on my machine!"
> (But breaks when deployed)

With automation:
> Every push is checked the same way.
> Problems found before they reach production.

## How GitHub Actions Works

```
You push code
    ↓
GitHub sees the push
    ↓
GitHub runs your workflow
    ↓
Workflow runs steps (lint, build, test)
    ↓
✅ Pass or ❌ Fail
```

Workflows are defined in YAML files in `.github/workflows/`.

## Step 1: Create the Workflow File

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build
```

## Step 2: Understand the Workflow

### Triggers

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

"Run when code is pushed to main OR when a PR is opened against main"

### Jobs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

"Create a virtual machine running Ubuntu Linux"

### Steps

Each step is one task:

| Step | What It Does |
|------|-------------|
| Checkout | Downloads your code |
| Setup Node | Installs Node.js |
| Install dependencies | Runs `npm ci` |
| Lint | Runs ESLint |
| Type check | Runs TypeScript compiler |
| Build | Builds the production app |

## Step 3: Add Type Check Script

Update `package.json` scripts if needed:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "type-check": "tsc --noEmit",
    "preview": "vite preview"
  }
}
```

## Step 4: Commit and Push

```bash
git add .
git commit -m "Add GitHub Actions CI workflow"
git push
```

## Step 5: Watch It Run

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see your workflow running
4. Click on it to see details

### What You'll See

```
✅ Checkout code         (2s)
✅ Setup Node.js         (5s)
✅ Install dependencies  (15s)
✅ Lint                  (3s)
✅ Type check            (2s)
✅ Build                 (8s)
```

All green = everything passed!

If something fails, click on the step to see error details.

## Status Badge (Optional)

Add a badge to your README showing CI status:

```markdown
# My Notes App

![CI](https://github.com/YOUR-USERNAME/YOUR-REPO/actions/workflows/ci.yml/badge.svg)
```

This shows ✅ or ❌ at a glance.

## When Things Fail

If the workflow fails:

1. **Click on the failed job** to see logs
2. **Find the error message** — it's usually clear
3. **Fix the issue locally**
4. **Push again** — a new run starts

Common failures:
- ESLint errors (fix with `npm run lint:fix`)
- TypeScript errors (fix the type issues)
- Missing dependencies (check imports)

## Check Your Understanding

- [ ] CI automatically runs checks on push
- [ ] Workflows are YAML files in `.github/workflows/`
- [ ] I can see results in the Actions tab
- [ ] Green = good, Red = something to fix

## Next Up

Let's create a CLAUDE.md file to help AI understand your project.

[Continue: CLAUDE.md for Your Project →](./06-claude-md-for-your-project)
