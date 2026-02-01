# Setting Up Environment

> **Time**: ~20 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to install Node.js, VS Code, Git, and essential tools
- Optional modern tools (Warp terminal, Fork git client)
- Project-specific CLIs (Firebase, GitHub)

## Quick Check — Already Installed?

Open your terminal (Mac: Terminal, Windows: PowerShell or Git Bash) and run:

::: code-group

```bash [Mac/Linux]
node --version      # Should show v18+ or v20+
npm --version       # Should show 9+ or 10+
code --version      # Should show VS Code version
git --version       # Should show git version
firebase --version  # Should show Firebase CLI version (optional)
gh --version        # Should show GitHub CLI version (optional)
```

```powershell [Windows]
node --version      # Should show v18+ or v20+
npm --version       # Should show 9+ or 10+
code --version      # Should show VS Code version
git --version       # Should show git version
firebase --version  # Should show Firebase CLI version (optional)
gh --version        # Should show GitHub CLI version (optional)
```

:::

**Required:** node, npm, code, git
**Optional (install later):** firebase, gh

If the required four work, skip to [Terminal Survival Guide](./05-terminal-survival-guide).

## Step 1: Install Node.js

Node.js includes npm (the package manager).

### Option A: Direct Install (Simple)

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (Long Term Support)
3. Run the installer, accept defaults

### Option B: Using nvm (Recommended for Developers)

nvm (Node Version Manager) lets you switch between Node versions easily.

**Mac/Linux:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install --lts
nvm use --lts
```

**Windows:**
Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) and run the installer, then:
```bash
nvm install lts
nvm use lts
```

**Why nvm?** Different projects may need different Node versions. nvm makes switching easy.

### Verify Installation

Open your terminal and type:

```bash
node --version
```

You should see something like `v20.11.0`

Then check npm:

```bash
npm --version
```

You should see something like `10.2.4`

::: tip Troubleshooting
If you see "command not found":
- **Mac**: You may need to restart your terminal
- **Windows**: You may need to restart your computer
:::

## Step 2: Install VS Code

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download for your operating system
3. Run the installer

### On Mac
- Drag VS Code to your Applications folder
- Open it from Applications

### On Windows
- Run the installer
- Check "Add to PATH" when asked
- Click through the rest with defaults

## Step 3: Install VS Code Extensions

Extensions add features to VS Code. Let's install the essentials for TypeScript + React development.

Open Extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows) and install:

### Essential (Install These First)

| Extension | Publisher | What It Does |
|-----------|-----------|--------------|
| **ESLint** | Microsoft | Finds JavaScript/TypeScript errors |
| **Prettier** | Prettier | Auto-formats your code beautifully |
| **Error Lens** | Alexander | Shows errors inline (super helpful!) |

### TypeScript & React

| Extension | Publisher | What It Does |
|-----------|-----------|--------------|
| **TypeScript Vue Plugin (Volar)** | Vue | Better TypeScript support for modern frameworks |
| **ES7+ React/Redux/React-Native snippets** | dsznajder | Quick code snippets for React |
| **Auto Import** | steoates | Automatically imports missing modules |
| **Path Intellisense** | Christian Kohler | Autocompletes file paths |

### Git & Version Control

| Extension | Publisher | What It Does |
|-----------|-----------|--------------|
| **GitLens** | GitKraken | Shows who changed what and when |
| **Git Graph** | mhutchie | Visual git history |

### Productivity Boosters

| Extension | Publisher | What It Does |
|-----------|-----------|--------------|
| **Auto Rename Tag** | Jun Han | Rename paired HTML/JSX tags together |
| **Bracket Pair Colorizer** | CoenraadS | Makes nested brackets colorful |
| **TODO Highlight** | Wayou Liu | Highlights TODO/FIXME comments |
| **Code Spell Checker** | Street Side Software | Catches typos in your code |

### Firebase (Optional - Install When Needed)

| Extension | Publisher | What It Does |
|-----------|-----------|--------------|
| **Firebase** | Firebase | Firebase syntax highlighting and snippets |

::: tip Don't Install Everything at Once
Start with the **Essential** extensions. Add TypeScript & React extensions when you start building. You can always install more later!
:::

## Step 4: Install Git

Git is the version control system we'll use.

### Mac
**Option 1:** Install with Homebrew (if you have it)
```bash
brew install git
```

**Option 2:** Download from [git-scm.com](https://git-scm.com)

**Option 3:** Git might already be installed. Check with `git --version`

### Windows
Download **Git for Windows** from [git-scm.com](https://git-scm.com/download/win)

**Important setup options during installation:**
- ✅ Check "Git Bash Here" (gives you Unix-style terminal)
- ✅ Check "Add to PATH"
- ✅ Use "Checkout as-is, commit Unix-style line endings"

**Why Git Bash?** It gives you Unix commands on Windows, making tutorials and commands consistent across platforms.

### Verify Git Installation

```bash
git --version
```

You should see something like `git version 2.43.0`

## Step 5: Enable Terminal Integration

### Mac
Open VS Code, then:
- Press `Cmd+Shift+P`
- Type "shell command"
- Select "Install 'code' command in PATH"

Now you can type `code .` to open any folder in VS Code.

### Windows
If you checked "Add to PATH" during VS Code installation, `code .` should already work.

Test it:
```powershell
code --version
```

## Optional: Better Terminal (Recommended)

The default terminal works fine, but these modern alternatives make development more pleasant.

### Warp (Mac/Linux)

**Why Warp?**
- AI-powered command suggestions
- Better autocomplete
- Command history search
- Modern, beautiful interface

**Install:**
1. Go to [warp.dev](https://www.warp.dev)
2. Download and install
3. Set as default terminal (optional)

### Windows Terminal (Windows)

**Why Windows Terminal?**
- Tabs support
- Better fonts and colors
- Multiple shells in one window
- Free from Microsoft Store

**Install:**
```powershell
# Option 1: Microsoft Store (search "Windows Terminal")
# Option 2: winget
winget install Microsoft.WindowsTerminal
```

## Optional: Git GUI Client

Command-line git is powerful, but a visual tool helps understand what's happening.

### Fork (Mac/Windows) - Recommended

**Why Fork?**
- Clean, simple interface
- Visual branch history
- Easy merge conflict resolution
- Free for students

**Install:**
1. Go to [git-fork.com](https://git-fork.com)
2. Download for your OS
3. Install and set up with your git config

**Alternative:** GitHub Desktop ([desktop.github.com](https://desktop.github.com)) - simpler but less powerful

## Project-Specific CLI Tools

These CLIs are needed for our bootcamp project. Install them now or during Phase 5.

### Firebase CLI

For deploying your app to Firebase Hosting.

```bash
npm install -g firebase-tools
```

Verify:
```bash
firebase --version
```

### GitHub CLI (Optional but Useful)

For creating repos and PRs from the terminal.

**Mac:**
```bash
brew install gh
```

**Windows:**
```powershell
winget install GitHub.cli
```

**Linux:**
See [cli.github.com](https://cli.github.com) for your distro.

Verify:
```bash
gh --version
```

You'll authenticate with GitHub later:
```bash
gh auth login
```

## Step 6: Your First Test

Let's make sure everything works together.

::: code-group

```bash [Mac/Linux/Git Bash]
# Create a test folder
cd ~/Desktop
mkdir hello-world
cd hello-world

# Open in VS Code
code .
```

```powershell [Windows PowerShell]
# Create a test folder
cd ~\Desktop
mkdir hello-world
cd hello-world

# Open in VS Code
code .
```

:::

In VS Code:
1. Create a new file: `hello.js`
2. Type this code:

```javascript
console.log("Hello, World!");
console.log("I am learning to code!");
console.log("2 + 2 =", 2 + 2);
```

3. Open terminal in VS Code: `` Ctrl+` ``
4. Run it:

```bash
node hello.js
```

You should see:
```
Hello, World!
I am learning to code!
2 + 2 = 4
```

🎉 **You just ran your first program!**

## Clean Up

::: code-group

```bash [Mac/Linux/Git Bash]
cd ~/Desktop
rm -rf hello-world
```

```powershell [Windows PowerShell]
cd ~\Desktop
rm -r -Force hello-world
```

:::

---

[Continue: Terminal Survival Guide →](./05-terminal-survival-guide)
