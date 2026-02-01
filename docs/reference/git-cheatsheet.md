# Git Cheatsheet

> **Print-friendly reference for essential Git commands**

## Setup

| Command | Description |
|---------|-------------|
| `git config --global user.name "Name"` | Set your name |
| `git config --global user.email "email"` | Set your email |
| `git init` | Initialize new repository |
| `git clone url` | Clone existing repository |

## Daily Workflow

### Check Status

```bash
git status          # See what's changed
git diff            # See unstaged changes
git diff --staged   # See staged changes
git log --oneline   # See commit history
```

### Make Changes

```bash
git add file        # Stage specific file
git add .           # Stage all changes
git reset file      # Unstage file
git commit -m "msg" # Commit with message
```

### Sync with Remote

```bash
git pull            # Get latest changes
git push            # Upload your commits
git push -u origin branch  # First push of new branch
```

## Branches

| Command | Description |
|---------|-------------|
| `git branch` | List branches |
| `git branch name` | Create branch |
| `git checkout name` | Switch to branch |
| `git checkout -b name` | Create and switch |
| `git merge name` | Merge branch into current |
| `git branch -d name` | Delete branch |

## Common Scenarios

### Start New Feature

```bash
git checkout -b feature/new-thing
# make changes
git add .
git commit -m "Add new thing"
git push -u origin feature/new-thing
```

### Fix Mistake Before Commit

```bash
# Forgot a file
git add forgotten.txt
git commit --amend --no-edit

# Wrong commit message
git commit --amend -m "New message"
```

### Undo Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1
```

### Discard All Local Changes

```bash
git checkout .       # Discard file changes
git clean -fd        # Remove untracked files
```

### See What Happened

```bash
git log --oneline -10     # Last 10 commits
git log --oneline --graph # Visual history
git show abc123           # Show specific commit
git blame file            # Who changed each line
```

## Remote Operations

| Command | Description |
|---------|-------------|
| `git remote -v` | Show remotes |
| `git fetch` | Download remote changes |
| `git pull` | Fetch + merge |
| `git push` | Upload commits |

## Stashing

```bash
git stash           # Save work temporarily
git stash pop       # Restore and remove stash
git stash list      # See all stashes
git stash drop      # Delete stash
```

## Commit Message Format

```
Short summary (50 chars or less)

Longer explanation if needed. Wrap at 72 characters.
Explain the why, not the what.

- Use bullet points for lists
- Start with verb (Add, Fix, Update, Remove)
```

## Good Commit Messages

```bash
# Good
git commit -m "Add email validation to login form"
git commit -m "Fix crash when user has no profile photo"
git commit -m "Remove deprecated API calls"

# Bad
git commit -m "fix"
git commit -m "WIP"
git commit -m "stuff"
```

## .gitignore Essentials

```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment
.env
.env.local

# IDE
.idea/
.vscode/

# OS
.DS_Store
Thumbs.db
```

## Emergency Commands

```bash
# Undo public commit (creates new commit)
git revert abc123

# Go back in time (dangerous!)
git reset --hard abc123

# See what you've done recently
git reflog
```

::: warning
Commands with `--hard` or `--force` can lose work. Use carefully!
:::

---

*Print this page for quick reference!*
