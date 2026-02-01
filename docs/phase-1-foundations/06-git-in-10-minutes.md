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

::: tip Our Preferred Workflow
While learning git commands is important, we **recommend using Fork** (the GUI client) for daily work. It makes branches, commits, and history much easier to visualize. We'll show both command-line and Fork approaches in this guide.
:::

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
- **Mac**: `xcode-select --install` or download from [git-scm.com](https://git-scm.com)
- **Windows**: Download **Git for Windows** from [git-scm.com](https://git-scm.com) (includes Git Bash)

::: tip Windows Users
Use **Git Bash** (installed with Git for Windows) for the best experience. All commands in this guide work in Git Bash.
:::

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

::: code-group

```bash [Mac/Linux/Git Bash]
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

```powershell [Windows PowerShell]
# Create a project folder
mkdir git-practice
cd git-practice

# Initialize Git
git init

# Create a file
"Hello Git" | Out-File readme.txt

# Check status (see untracked file)
git status

# Stage the file
git add readme.txt

# Commit
git commit -m "Add readme file"

# Make a change
"Learning Git today" | Out-File -Append readme.txt

# See what changed
git diff

# Stage and commit
git add readme.txt
git commit -m "Update readme with learning note"

# View history
git log --oneline

# Clean up
cd ..
rm -r -Force git-practice
```

:::

## Using Fork GUI (Recommended)

While the command line is powerful, **Fork makes git visual and easier**.

### Opening Your Project in Fork

1. Open Fork
2. Click **File → Add Local Repository**
3. Navigate to your project folder
4. Click **Open**

### The Fork Interface

```
┌─────────────────────────────────────────┐
│ Left Sidebar:                           │
│ • Branches (see all branches)           │
│ • Stashes (temporary saves)             │
│ • Tags (version markers)                │
│                                         │
│ Main Area:                              │
│ • Commit history (visual tree)          │
│ • Each commit shows who, when, what     │
│                                         │
│ Bottom Panel:                           │
│ • Changed files                         │
│ • Diff view (see what changed)          │
│                                         │
│ Stage & Commit:                         │
│ • Checkbox files to stage               │
│ • Write message + description           │
│ • Click "Commit" button                 │
└─────────────────────────────────────────┘
```

### Making a Commit in Fork

1. **See what changed** - Changed files appear at bottom
2. **Review changes** - Click a file to see the diff
3. **Stage files** - Check the boxes next to files you want to commit
4. **Write message:**
   - **Message field:** Short title (Fork shows character count)
   - **Description field:** Bullet points explaining why
5. **Click "Commit"**

### Why Fork is Better for Learning

| Task | Command Line | Fork |
|------|--------------|------|
| See history | `git log --oneline` | Visual tree with branches |
| See what changed | `git diff` | Color-coded side-by-side diff |
| Stage files | `git add file1 file2` | Checkbox each file |
| Write commit | Remember format | Fields guide you |
| Understand branches | Hard to visualize | See the tree structure |

::: tip Best Practice
- **Learn** both command line AND Fork
- **Use** Fork for daily commits and branch management
- **Know** command line for when Fork isn't available (servers, CI/CD)
:::

## Writing Good Commit Messages

Follow the **50/72 rule** for professional commits:

### The Format

```
Short title (50 chars max, imperative mood)

- Bullet point explaining what changed
- Another detail if needed
- Keep body lines under 72 characters
```

### Good Examples

**Simple commit (title only):**
```
Add email validation to signup form
```

**Complex commit (title + body):**
```
Fix crash when user has no profile photo

- Add null check before accessing user.avatar
- Set default avatar if none exists
- Add test for missing profile data
```

**Another example:**
```
Remove unused CSS styles

- Delete old button styles from legacy design
- Remove commented-out code
- Reduces bundle size by 5KB
```

### Bad Examples (Don't Do This)

```
"fixed stuff"           ❌ Too vague
"updates"               ❌ Meaningless
"asdfasdf"              ❌ Not descriptive
"Fixed the bug where the user login sometimes doesn't work properly and causes errors" ❌ Too long
```

### The Rules

1. **Title:** Start with a verb (Add, Fix, Remove, Update)
2. **Title:** Keep under 50 characters
3. **Title:** No period at the end
4. **Body:** Blank line after title
5. **Body:** Use bullet points (with `-` or `•`)
6. **Body:** Explain *why* not *what* (code shows what)

::: tip Using Fork
Fork has a commit dialog that makes this easy:
- **Message field** → Title
- **Description field** → Body with bullet points
- It shows character count and warns if title is too long
:::

## Key Commands Summary

| Command | What It Does | Fork Equivalent |
|---------|--------------|-----------------|
| `git init` | Create new repository | File → Create New Repository |
| `git status` | Show what's changed | Bottom panel (always visible) |
| `git add` | Stage files | Check boxes next to files |
| `git commit -m "..."` | Save checkpoint | Fill message + click Commit |
| `git log` | View history | Main area (visual tree) |
| `git diff` | Show changes | Click any file to see diff |

::: tip
Know the commands, but don't feel bad about using Fork. Professional developers use GUI clients too!
:::

## What About GitHub?

Git is local (on your computer).
GitHub is remote (on the internet).

You'll:
1. Make commits locally with Git
2. Push them to GitHub for backup and sharing

We'll set up GitHub in Phase 5.

## Next Steps

::: tip Homework Before Phase 2
1. **Install Fork** if you haven't already ([git-fork.com](https://git-fork.com))
2. **Try the practice session** above in Fork:
   - Create a repository
   - Make some commits with proper messages (title + bullet points)
   - Explore the visual history
3. **Get comfortable** switching between command line and Fork

During the bootcamp, you'll use Fork for most git operations, but knowing the commands helps you understand what's happening.
:::

---

**Phase 1 Complete!** You have Node, VS Code, terminal skills, Git basics, and Fork installed.

[Start Phase 2: Requirements →](../phase-2-requirements/)
