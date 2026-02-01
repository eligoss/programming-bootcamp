# Your Development Tools

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What each tool does and why we need it

## The Core Tools

### 1. Code Editor: VS Code

**What it is:** Where you write code — like Word, but for programming.

**Why VS Code:**
- Free and open source
- Works on Mac, Windows, Linux
- Massive ecosystem of extensions
- Most popular editor in the industry

**What it does for you:**
- Colors your code for readability
- Catches errors as you type
- Suggests completions
- Integrates with everything else

### 2. Runtime: Node.js

**What it is:** Lets you run JavaScript outside the browser.

**Why you need it:**
- Runs your development server
- Runs build tools and tests
- Powers your toolchain

You won't write Node.js code directly, but everything depends on it.

### 3. Package Manager: npm

**What it is:** Downloads and manages code libraries — like an app store for code.

**Comes with Node.js** — install Node, get npm free.

**Why you need it:**
- Install React, Firebase, and other libraries
- Run project commands (`npm start`, `npm test`)
- Share your project settings with others

### 4. Version Control: Git

**What it is:** Tracks changes to your code over time — like save points in a video game.

**Why you need it:**
- Go back to any previous version
- See what changed and when
- Collaborate without conflicts

### 5. Code Hosting: GitHub

**What it is:** Stores your Git repositories online — like Dropbox for code, but smarter.

**Why you need it:**
- Backup in the cloud
- Share with others
- Deploy to production

### 6. Terminal

**What it is:** Text-based interface to your computer.

**Why you need it:**
- Run commands (`npm install`, `git commit`)
- More powerful than clicking
- Essential for development

## The Tool Stack Diagram

```
┌────────────────────────────────────────────────┐
│                    VS Code                      │
│  ┌─────────────┐  ┌─────────────┐              │
│  │   Editor    │  │   Terminal  │              │
│  │             │  │             │              │
│  │  Your code  │  │  Commands   │              │
│  └─────────────┘  └─────────────┘              │
└────────────────────────────────────────────────┘
         │                  │
         ▼                  ▼
┌─────────────┐    ┌─────────────────────────────┐
│    Git      │    │         Node.js             │
│  (saves     │    │  ┌─────────────────────┐   │
│  versions)  │    │  │        npm          │   │
└─────────────┘    │  │   (gets packages)   │   │
         │         │  └─────────────────────┘   │
         ▼         └─────────────────────────────┘
┌─────────────┐
│   GitHub    │
│  (backup +  │
│   deploy)   │
└─────────────┘
```

---

[Continue: Setting Up Environment →](./04-setting-up-environment)
