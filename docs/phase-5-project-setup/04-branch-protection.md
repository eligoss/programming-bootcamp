# Branch Protection

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- What branches are
- Why protect the main branch
- How to set up basic protection

## The Big Idea

Branches let you work on features without affecting the main code. Branch protection prevents accidental damage to your production code.

## Git Branches Explained

```
main ──●──●──●──●──●──●────────────────●
              \                       /
               ●──●──●──●────────────  feature branch
                     feature work
```

- **main:** The stable, production-ready code
- **feature branches:** Where you experiment and develop

When the feature is ready, you **merge** it back to main.

## Why Protect Main?

Without protection:
- You might accidentally push broken code
- Force pushes can overwrite history
- No review before code goes live

With protection:
- Changes must go through pull requests
- Required checks must pass
- History is preserved

## For This Bootcamp

For a solo learning project, we'll set up light protection:

### What We'll Enable
- ✅ Require pull request before merging
- ✅ Block force pushes

### What We'll Skip (for now)
- ❌ Required reviews (solo project)
- ❌ Required status checks (we'll add CI later)

## Setting Up Protection

### Step 1: Go to Repository Settings

1. Open your repository on GitHub
2. Click **Settings** tab
3. In sidebar, click **Branches**

### Step 2: Add Rule

1. Click **Add branch ruleset** (or "Add rule" if using older interface)
2. Name: `main protection`
3. Enforcement status: **Active**

### Step 3: Configure Rules

#### Under "Target branches"
- Add target: `main`

#### Under "Rules"
- ✅ Restrict deletions
- ✅ Block force pushes
- ✅ Require a pull request before merging
  - Required approvals: 0 (solo project)

### Step 4: Save

Click **Create** or **Save changes**

## Working with Branches

Now that main is protected, here's the workflow:

### Create a Feature Branch

```bash
# Create and switch to new branch
git checkout -b feature/add-login

# Do your work...
git add .
git commit -m "Add login form"

# Push the branch
git push -u origin feature/add-login
```

### Create Pull Request

1. Go to GitHub
2. You'll see a prompt to create a PR
3. Click **Compare & pull request**
4. Add a title and description
5. Click **Create pull request**

### Merge (After Review)

1. Review the changes
2. Click **Merge pull request**
3. Click **Confirm merge**
4. Delete the branch (optional but clean)

### Update Local Main

```bash
git checkout main
git pull
```

## Simplified Workflow for Learning

For this bootcamp, a simpler approach:

1. **Work directly on main** for initial setup
2. **Use feature branches** for larger features
3. **Pull requests** for important changes

We won't enforce strict branch workflow since you're learning. The protection prevents accidents, not normal work.

## Quick Reference

```bash
# Create branch
git checkout -b feature/name

# Push branch first time
git push -u origin feature/name

# Switch back to main
git checkout main

# Update main from GitHub
git pull

# Delete local branch after merging
git branch -d feature/name
```

## Check Your Understanding

- [ ] Branches let you work without affecting main
- [ ] Protection prevents accidental damage
- [ ] Pull requests are how you merge to main
- [ ] I've set up basic protection rules

## Next Up

Let's add GitHub Actions to automatically check your code.

[Continue: GitHub Actions Intro →](./05-github-actions-intro)
