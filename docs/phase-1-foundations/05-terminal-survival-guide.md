# Terminal Survival Guide

> **Time**: ~7 minutes | **Difficulty**: Beginner

## What You'll Learn

- The 10 commands you'll use daily
- Tab completion (your new superpower)
- How commands differ between Mac/Linux and Windows

::: tip Windows Users
Use **PowerShell** (not Command Prompt) or **Git Bash** for the best experience. Git Bash gives you Unix-style commands on Windows.
:::

## The 10 Commands You Need

### Navigation

| Mac/Linux | Windows (PowerShell) | What It Does |
|-----------|---------------------|--------------|
| `pwd` | `pwd` or `Get-Location` | Print working directory (where am I?) |
| `ls` | `ls` or `dir` or `Get-ChildItem` | List files and folders |
| `ls -la` | `ls -Force` or `dir /a` | List all files (including hidden) |
| `cd folder` | `cd folder` | Change directory |
| `cd ..` | `cd ..` | Go up one level |
| `cd ~` | `cd ~` or `cd $HOME` | Go to home folder |

### File Operations

| Mac/Linux | Windows (PowerShell) | What It Does |
|-----------|---------------------|--------------|
| `mkdir name` | `mkdir name` or `New-Item -ItemType Directory name` | Create directory |
| `touch file` | `New-Item file` or `echo $null >> file` | Create empty file |
| `rm file` | `rm file` or `del file` | Remove file |
| `rm -rf folder` | `rm -r -Force folder` or `rmdir /s folder` | Remove folder and contents |
| `mv old new` | `mv old new` or `Move-Item old new` | Move or rename |
| `cp file copy` | `cp file copy` or `Copy-Item file copy` | Copy file |

::: tip For This Bootcamp
Most commands work the same if you use **Git Bash** on Windows. We recommend Git Bash for consistency.
:::

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

| Symbol | Mac/Linux | Windows |
|--------|-----------|---------|
| `~` | Your home folder (`/Users/yourname`) | Your home folder (`C:\Users\yourname`) |
| `.` | Current folder | Current folder |
| `..` | Parent folder (one level up) | Parent folder (one level up) |
| `/` | Root of filesystem | Use `\` or `/` (both work in PowerShell) |

**Examples:**

Mac/Linux:
- Absolute: `/Users/you/Desktop/project/file.txt`
- Relative: `./project/file.txt`

Windows:
- Absolute: `C:\Users\you\Desktop\project\file.txt`
- Relative: `.\project\file.txt` or `./project/file.txt`

## Practice Session

::: code-group

```bash [Mac/Linux/Git Bash]
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

```powershell [Windows PowerShell]
# Where are you?
pwd

# Go to Desktop
cd ~\Desktop

# Create a practice folder
mkdir terminal-practice
cd terminal-practice

# Create some files
New-Item file1.txt
New-Item file2.txt

# See your files
ls

# Rename a file
mv file1.txt important.txt
ls

# Go up and clean up
cd ..
rm -r -Force terminal-practice
```

:::

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
