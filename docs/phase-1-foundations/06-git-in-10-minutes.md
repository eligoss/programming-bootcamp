# Git in 10 Minutes

> **Time**: ~10 minutes | **Difficulty**: Beginner

## What You'll Learn

- Why version control matters
- The basic Git workflow
- Essential commands

## Why Git?

### Without Git
```
project_final.js
project_final_v2.js
project_final_v2_FIXED.js
project_final_v2_FIXED_actually_final.js
```

### With Git
```
project.js  ← Always the current version

History:
• "Add login feature" (2 hours ago)
• "Fix button color" (yesterday)
• "Initial setup" (3 days ago)
```

You can go back to any of those points anytime.

## The Mental Model

```
Your Folder        Staging Area         Repository (History)
(Working Dir)        (Index)              (.git folder)
    │                   │                       │
    │    git add        │    git commit         │
    ├──────────────────►├──────────────────────►│
    │                   │                       │
    │   Edit files      │   Prepare changes     │  Save permanently
```

1. **Working Directory** — Your actual files
2. **Staging Area** — Changes you're preparing to save
3. **Repository** — The saved history

## Setting Up Git

### Check If Installed

```bash
git --version
```

If not installed:
- **Mac**: `xcode-select --install`
- **Windows**: Download from [git-scm.com](https://git-scm.com)

### Configure Your Identity

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the email you'll use for GitHub.

## The Basic Workflow

```bash
# 1. Check what's changed
git status

# 2. Stage changes
git add filename.js     # Stage one file
git add .               # Stage all changed files

# 3. Commit (save checkpoint)
git commit -m "Add login feature"

# 4. View history
git log --oneline
```

## Practice: Your First Commits

```bash
# Create a project folder
mkdir git-practice
cd git-practice

# Initialize Git
git init

# Create a file
echo "Hello Git" > readme.txt

# Check status (see untracked file)
git status

# Stage the file
git add readme.txt

# Commit
git commit -m "Add readme file"

# Make a change
echo "Learning Git today" >> readme.txt

# See what changed
git diff

# Stage and commit
git add readme.txt
git commit -m "Update readme with learning note"

# View history
git log --oneline

# Clean up
cd ..
rm -rf git-practice
```

## Writing Good Commit Messages

**Good — verb + what changed:**
```
"Add email validation to signup form"
"Fix crash when user has no profile photo"
"Remove unused CSS styles"
```

**Bad — vague or meaningless:**
```
"fixed stuff"
"updates"
"asdfasdf"
```

## Key Commands Summary

| Command | What It Does | When to Use |
|---------|--------------|-------------|
| `git init` | Create new repository | Once per project |
| `git status` | Show what's changed | Constantly |
| `git add` | Stage files | Before committing |
| `git commit -m "..."` | Save checkpoint | After completing something |
| `git log` | View history | See past work |
| `git diff` | Show changes | Before staging |

## What About GitHub?

Git is local (on your computer).
GitHub is remote (on the internet).

You'll:
1. Make commits locally with Git
2. Push them to GitHub for backup and sharing

We'll set up GitHub in Phase 5.

---

**Phase 1 Complete!** You have Node, VS Code, terminal skills, and Git basics.

[Start Phase 2: Requirements →](../phase-2-requirements/)
