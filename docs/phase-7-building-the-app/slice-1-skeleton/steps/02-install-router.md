# Step 2: Install React Router

> **Time**: ~3 minutes | **Type**: Setup | **Concepts**: NPM packages, Dependencies

## What We're Building

Adding the `react-router-dom` package to our project so we can use routing features.

## Before You Code: Understanding Dependencies

> **💡 Ask AI First:**
>
> ```
> What is npm and what does it mean to "install a package"?
> What is react-router-dom and why do React apps need it?
> What's the difference between a dependency and a devDependency?
> ```

**What you should learn:**
- NPM is a package manager (like an app store for code)
- Packages are libraries written by other developers
- Installing adds the package to `node_modules/` and `package.json`
- react-router-dom provides routing components for React

## Let's Build It

### Prompt: Install the Package

```
Install react-router-dom for my React + TypeScript project.

After installing:
1. Confirm it was added to package.json
2. Explain what this package provides
3. Explain why single-page apps need it
```

**What to expect:**
- AI will run `npm install react-router-dom`
- Package appears in `package.json` under "dependencies"
- Explanation of what the package does

**Verify:**
- [ ] No errors during installation
- [ ] Open `package.json` and see `"react-router-dom"` listed
- [ ] `node_modules/` folder contains `react-router-dom/`

## Common Issues

### "npm: command not found"

**Problem:** Node.js not installed

**Fix:**
- You should have installed Node.js in Phase 5
- Verify with `node --version`
- If missing, install from [nodejs.org](https://nodejs.org/)

### "EACCES: permission denied"

**Problem:** NPM trying to install globally without permissions

**Fix:**
- Make sure you're in your project directory
- Never use `sudo` with npm (security risk)
- Run `npm install react-router-dom` (no `-g` flag)

### Installation hangs

**Problem:** Network issue or corrupted cache

**Fix:**
```bash
# Stop the process (Ctrl+C)
# Clear npm cache
npm cache clean --force
# Try again
npm install react-router-dom
```

## What You Learned

At this point you should understand:
- ✅ What NPM packages are
- ✅ How to install a package
- ✅ What react-router-dom provides
- ✅ Where installed packages live

## Verify It Worked

Run this command to confirm installation:

```bash
npm list react-router-dom
```

You should see the version number (something like `react-router-dom@6.x.x`).

## Next Step

Package installed! Now let's set up basic routing:

[Step 3: Set Up Routes →](./03-setup-routes)
