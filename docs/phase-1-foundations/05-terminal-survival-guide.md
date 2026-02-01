# Terminal Survival Guide

> **Time**: ~7 minutes | **Difficulty**: Beginner

## What You'll Learn

- The 10 commands you'll use daily
- Tab completion (your new superpower)

## The 10 Commands You Need

### Navigation

| Command | What It Does | Example |
|---------|--------------|---------|
| `pwd` | Print working directory (where am I?) | `pwd` → `/Users/you/projects` |
| `ls` | List files and folders | `ls -la` for details + hidden |
| `cd folder` | Change directory | `cd projects` |
| `cd ..` | Go up one level | `cd ..` |
| `cd ~` | Go to home folder | `cd ~` |

### File Operations

| Command | What It Does | Example |
|---------|--------------|---------|
| `mkdir name` | Make directory | `mkdir my-app` |
| `touch file` | Create empty file | `touch index.js` |
| `rm file` | Remove file | `rm temp.txt` |
| `rm -rf folder` | Remove folder and contents | `rm -rf old-project` |
| `mv old new` | Move or rename | `mv a.txt b.txt` |

::: warning Be Careful
`rm` is permanent. There's no trash can. Deleted = gone.
:::

## Tab Completion — Your Superpower

Start typing, then press `Tab`:

```bash
cd Desk<Tab>     # completes to: cd Desktop
cd Dow<Tab>      # completes to: cd Downloads
```

If multiple matches, press Tab twice to see options.

## Paths Explained

| Path | Meaning |
|------|---------|
| `~` | Your home folder (`/Users/yourname`) |
| `.` | Current folder |
| `..` | Parent folder (one level up) |
| `/` | Root of the filesystem |

**Absolute path:** `/Users/you/Desktop/project/file.txt`
**Relative path:** `./project/file.txt` (from current folder)

## Practice Session

```bash
# Where are you?
pwd

# Go to Desktop
cd ~/Desktop

# Create a practice folder
mkdir terminal-practice
cd terminal-practice

# Create some files
touch file1.txt
touch file2.txt

# See your files
ls

# Rename a file
mv file1.txt important.txt
ls

# Go up and clean up
cd ..
rm -rf terminal-practice
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Autocomplete |
| `↑ / ↓` | Previous/next command |
| `Ctrl+C` | Cancel current command |
| `Ctrl+L` or `clear` | Clear screen |
| `Ctrl+A` | Go to line start |
| `Ctrl+E` | Go to line end |

---

[Continue: Git in 10 Minutes →](./06-git-in-10-minutes)
