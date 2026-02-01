# Step 3: Install Firebase SDK

> **Time**: ~3 minutes | **Type**: Setup | **Concepts**: NPM packages, Firebase SDK

## What We're Building

Adding the `firebase` package to our project so we can use Firebase Authentication and Firestore.

## Before You Code: Understanding the Firebase SDK

> **💡 Ask AI First:**
>
> ```
> What is an SDK and what does "SDK" stand for?
> What is the firebase npm package and what does it include?
> Why do I need to install it if I already created a Firebase project?
> ```

**What you should learn:**
- SDK = Software Development Kit (tools to integrate with a service)
- The `firebase` package contains code to connect your app to Firebase
- Creating a project in Firebase Console ≠ installing code in your app
- The SDK lets your JavaScript code talk to Firebase servers

## Let's Build It

### Prompt: Install the Package

```
Install the firebase package for my React + TypeScript project.

After installing:
1. Confirm it was added to package.json
2. Explain what the firebase package provides
3. Explain the difference between the Firebase Console and the Firebase SDK
```

**What to expect:**
- AI will run `npm install firebase`
- Package appears in `package.json` under "dependencies"
- Explanation of what the package does

**Verify:**
- [ ] No errors during installation
- [ ] Open `package.json` and see `"firebase"` listed
- [ ] `node_modules/` folder contains `firebase/`

## Understanding What You Installed

After AI installs the package, ask for clarification:

> **💡 Ask AI to Explain:**
>
> ```
> What modules does the firebase package include?
> Which modules will we use for authentication?
> Which modules will we use for the database (Firestore)?
> ```

**Key things to understand:**
- `firebase/auth` — Authentication functions (signIn, signOut, etc.)
- `firebase/firestore` — Database functions (we'll use later)
- `firebase/app` — Core initialization code
- All modules are "tree-shakeable" (unused code won't be in final build)

## Verify It Works

### Manual Testing:

1. **Check package.json:**
   ```bash
   cat package.json | grep firebase
   ```
   Should show: `"firebase": "^10.x.x"` or similar

2. **Verify installation:**
   ```bash
   npm list firebase
   ```
   Should show version number without errors

3. **Check no errors:**
   ```bash
   npm run dev
   ```
   App should still run (we haven't used Firebase yet, just installed it)

### Checklist:

- [ ] `firebase` appears in `package.json` dependencies
- [ ] `node_modules/firebase/` folder exists
- [ ] Dev server still runs without errors
- [ ] No TypeScript errors in terminal

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
- Make sure you're in your project directory (`cd todo-app`)
- Never use `sudo` with npm (security risk)
- Run `npm install firebase` (no `-g` flag)

### Installation hangs or is very slow

**Problem:** Network issue or npm cache problem

**Fix:**
```bash
# Stop the process (Ctrl+C)
# Clear npm cache
npm cache clean --force
# Try again
npm install firebase
```

### Wrong version installed

**Problem:** Old version of npm might install old Firebase

**Fix:**
```bash
# Check npm version
npm --version
# Should be 8.x or higher
# Update npm if needed
npm install -g npm@latest
```

## What the Package Contains

Understanding Firebase modules:

```javascript
// Core initialization
import { initializeApp } from 'firebase/app';

// Authentication
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firestore database (we'll use later)
import { getFirestore, collection, addDoc } from 'firebase/firestore';
```

**Why separate imports?**
- Modern bundlers only include what you use
- Keeps your app size small
- You only import what you need for each feature

## What You Learned

At this point you should understand:
- ✅ What an SDK is and why apps need them
- ✅ How to install npm packages
- ✅ What the firebase package provides
- ✅ The difference between Firebase Console and Firebase SDK
- ✅ That Firebase has modular imports for different features

## Next Step

Package installed! Now let's initialize Firebase in your app with the config from Step 2:

[Step 4: Initialize Firebase →](./04-initialize-firebase)
