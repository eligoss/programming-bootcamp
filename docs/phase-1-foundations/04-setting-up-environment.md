# Setting Up Environment

> **Time**: ~15 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to install Node.js, VS Code, and verify everything works

## Quick Check — Already Installed?

```bash
node --version    # Should show v18+ or v20+
npm --version     # Should show 9+ or 10+
code --version    # Should show VS Code version
git --version     # Should show git version
```

If all four work, skip to [Terminal Survival Guide](./05-terminal-survival-guide).

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

Extensions add features to VS Code. Let's install the essentials.

Open Extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows) and install:

| Extension | Publisher | What It Does |
|-----------|-----------|--------------|
| **ESLint** | Microsoft | Finds errors in your code |
| **Prettier** | Prettier | Formats your code beautifully |
| **Error Lens** | Alexander | Shows errors inline |

## Step 4: Enable Terminal Integration (Mac)

Open VS Code, then:
- Press `Cmd+Shift+P`
- Type "shell command"
- Select "Install 'code' command in PATH"

Now you can type `code .` to open any folder in VS Code.

## Step 5: Your First Test

Let's make sure everything works together.

```bash
# Create a test folder
cd ~/Desktop
mkdir hello-world
cd hello-world

# Open in VS Code
code .
```

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

```bash
cd ~/Desktop
rm -rf hello-world
```

---

[Continue: Terminal Survival Guide →](./05-terminal-survival-guide)
