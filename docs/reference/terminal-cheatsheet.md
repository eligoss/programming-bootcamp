# Terminal Cheatsheet

> **Print-friendly reference for essential terminal commands**

## Navigation

| Command | Description | Example |
|---------|-------------|---------|
| `pwd` | Print working directory | `pwd` |
| `ls` | List files and folders | `ls` |
| `ls -la` | List with details + hidden | `ls -la` |
| `cd folder` | Change directory | `cd Documents` |
| `cd ..` | Go up one level | `cd ..` |
| `cd ~` | Go to home directory | `cd ~` |
| `cd -` | Go to previous directory | `cd -` |

## File Operations

| Command | Description | Example |
|---------|-------------|---------|
| `touch file` | Create empty file | `touch index.js` |
| `mkdir folder` | Create directory | `mkdir src` |
| `cp source dest` | Copy file | `cp a.txt b.txt` |
| `cp -r src dest` | Copy folder | `cp -r old new` |
| `mv old new` | Move or rename | `mv old.txt new.txt` |
| `rm file` | Delete file | `rm temp.txt` |
| `rm -rf folder` | Delete folder | `rm -rf node_modules` |

::: danger
`rm` is permanent! There is no trash can.
:::

## Viewing Files

| Command | Description | Example |
|---------|-------------|---------|
| `cat file` | Show file contents | `cat package.json` |
| `head file` | Show first lines | `head -20 file.txt` |
| `tail file` | Show last lines | `tail -20 file.txt` |
| `less file` | Scrollable view | `less log.txt` |

## Searching

| Command | Description | Example |
|---------|-------------|---------|
| `grep pattern file` | Find in file | `grep "error" log.txt` |
| `grep -r pattern dir` | Find in folder | `grep -r "TODO" src` |
| `find . -name "*.js"` | Find files | `find . -name "*.tsx"` |

## Utilities

| Command | Description | Example |
|---------|-------------|---------|
| `clear` | Clear screen | `clear` |
| `history` | Show command history | `history` |
| `which cmd` | Find command location | `which node` |
| `echo text` | Print text | `echo "Hello"` |

## npm Commands

| Command | Description |
|---------|-------------|
| `npm init` | Initialize new project |
| `npm install` | Install dependencies |
| `npm install pkg` | Add a package |
| `npm run script` | Run a script |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run linter |

## Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Autocomplete |
| `Tab Tab` | Show all options |
| `↑ / ↓` | Previous/next command |
| `Ctrl + C` | Cancel current command |
| `Ctrl + L` | Clear screen |
| `Ctrl + R` | Search history |
| `Ctrl + A` | Go to line start |
| `Ctrl + E` | Go to line end |

## Special Paths

| Path | Meaning |
|------|---------|
| `.` | Current directory |
| `..` | Parent directory |
| `~` | Home directory |
| `/` | Root directory |

## Combining Commands

```bash
# Run if previous succeeds
cmd1 && cmd2

# Run regardless
cmd1 ; cmd2

# Pipe output
cmd1 | cmd2
```

---

*Print this page for quick reference!*
