# GitHub Quickstart

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to create a GitHub account
- Creating your first repository
- Cloning to your computer

## The Big Idea

GitHub is where your code lives online. It's:
- **Backup** — Your code is safe in the cloud
- **Portfolio** — Show your work to others
- **Collaboration** — Work with teammates
- **Deployment** — Deploy directly from GitHub

## Step 1: Create GitHub Account

If you don't have an account:

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Choose a username (this will be public!)
4. Use your real email (needed for commits)
5. Create a password
6. Complete verification

**Good username tips:**
- Professional-ish (you'll show this to employers)
- Easy to remember
- Avoid numbers like birth year

## Step 2: Create a Repository

A repository (repo) is a project folder that Git tracks.

### Through GitHub Website

1. Click the "+" icon in the top right
2. Select "New repository"
3. Fill in:
   - **Repository name:** `my-notes-app` (or your feature name)
   - **Description:** "Personal notes app with authentication"
   - **Public/Private:** Your choice (public is fine for learning)
   - **Add README:** Check this box
   - **Add .gitignore:** Select "Node"
4. Click "Create repository"

### What You'll See

```
your-username/my-notes-app

├── README.md        # Project description
└── .gitignore       # Files Git should ignore
```

## Step 3: Clone to Your Computer

"Cloning" downloads the repository to your machine.

### Get the URL

1. On your repository page, click the green "Code" button
2. Copy the HTTPS URL (looks like `https://github.com/username/repo.git`)

### Clone with Terminal

Open VS Code's terminal and run:

```bash
# Navigate to where you want your projects
cd ~/Desktop

# Clone the repository
git clone https://github.com/YOUR-USERNAME/my-notes-app.git

# Enter the folder
cd my-notes-app

# Open in VS Code
code .
```

You should see your project in VS Code with the README.md file.

## Step 4: Verify It Works

Let's make sure everything is connected:

```bash
# Check Git is tracking
git status

# See the remote connection
git remote -v
```

You should see your GitHub URL listed.

## Making Your First Change

Let's edit the README and push:

1. Open README.md in VS Code
2. Change the content:

```markdown
# My Notes App

A personal notes application with user authentication.

## Tech Stack
- React + TypeScript
- Firebase (Auth, Firestore, Hosting)

## Status
🚧 Under construction
```

3. Save the file

4. In terminal:

```bash
# Stage the change
git add README.md

# Commit
git commit -m "Update README with project description"

# Push to GitHub
git push
```

5. Refresh your GitHub page — you should see the updated README!

## Git Authentication

If prompted for credentials when pushing:

### Option A: GitHub CLI (Recommended)
```bash
# Install GitHub CLI (Mac)
brew install gh

# Login
gh auth login
# Follow the prompts to authenticate via browser
```

### Option B: Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Use token as password when prompted

## Check Your Understanding

- [ ] I have a GitHub account
- [ ] I created a repository
- [ ] I cloned it to my computer
- [ ] I pushed a change to GitHub

## Common Problems

### "Permission denied"
You need to authenticate. Use `gh auth login` or set up SSH keys.

### "Repository not found"
Check the URL. Make sure it matches your actual repository.

### "Git not found"
Install Git (covered in Phase 1).

## Next Up

Let's set up the project structure with React and TypeScript.

[Continue: Project Structure →](./02-project-structure)
