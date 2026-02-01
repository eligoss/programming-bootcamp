# Step 4: Initialize Firebase

> **Time**: ~5 minutes | **Type**: Coding | **Concepts**: Firebase initialization, Configuration, Exports

## What We're Building

Creating a `src/lib/firebase.ts` file that initializes Firebase with your project config and exports an `auth` object for use throughout your app.

## Before You Code: Understanding Configuration

> **💡 Ask AI to Explain:**
>
> ```
> What does it mean to "initialize" Firebase?
> Why do we put Firebase config in a separate file instead of directly in components?
> What is the "auth" object and how will we use it?
> ```

**What you should learn:**
- Initialization connects your app to your Firebase project
- Config in a separate file = reusable, maintainable, single source of truth
- The `auth` object provides functions like `signIn()`, `signOut()`, etc.
- We export `auth` so any component can import and use it

## Let's Build It

### Prompt: Create Firebase Initialization File

```
Create a Firebase initialization file for my React + TypeScript app.

Requirements:
1. File location: src/lib/firebase.ts
2. Import firebase/app and firebase/auth
3. Use this Firebase config:

[PASTE YOUR CONFIG FROM STEP 2 HERE]

4. Initialize Firebase with the config
5. Export the auth object so I can use it in components

After creating the file, explain:
- What each line does
- Why we export auth
- How other files will import it
```

**IMPORTANT:** Replace `[PASTE YOUR CONFIG FROM STEP 2 HERE]` with the actual config object you copied from the Firebase Console in Step 2!

**What to expect:**
- New file `src/lib/firebase.ts`
- Imports from `firebase/app` and `firebase/auth`
- Your Firebase config as a constant
- `initializeApp()` call
- `export const auth` statement

**Files you'll create:**
- `src/lib/firebase.ts` (create the `lib/` folder if it doesn't exist)

## Understanding What You Built

After AI creates the file, make sure you understand each part:

> **💡 Ask AI to Explain:**
>
> ```
> Walk me through the firebase.ts file line by line:
>
> 1. What does initializeApp() do?
> 2. What does getAuth() return and why do we export it?
> 3. Why is firebaseConfig a separate constant?
> 4. Could I initialize Firebase directly in a component? Why don't we?
> ```

**Key concepts:**
- `initializeApp(config)` — Tells Firebase SDK which project to connect to
- `getAuth(app)` — Creates authentication handler for that project
- Exporting `auth` — Makes it available to import elsewhere
- Single initialization — Firebase only needs to be initialized once

## Verify It Works

### Manual Testing:

1. **Check file exists:**
   ```bash
   ls src/lib/firebase.ts
   ```
   Should show the file

2. **Verify no syntax errors:**
   ```bash
   npm run dev
   ```
   App should compile without errors

3. **Test import (temporary):**

   Add this line to the top of `src/App.tsx`:
   ```typescript
   import { auth } from './lib/firebase';
   ```

   **What to expect:**
   - No TypeScript errors
   - No import errors in console
   - App still runs

   **Remove the import** after verifying (we'll use it properly later)

### Checklist:

- [ ] `src/lib/firebase.ts` file exists
- [ ] Contains your Firebase config (with your project's values)
- [ ] No TypeScript errors
- [ ] Can import `auth` from the file
- [ ] Dev server runs without errors

## Common Issues

### "Module not found: Can't resolve 'firebase/app'"

**Problem:** Firebase package not installed

**Fix:**
```bash
npm install firebase
```

### TypeScript error: "Cannot find module 'firebase/auth'"

**Problem:** Missing import or wrong path

**Fix:**
- Make sure import is exactly: `import { getAuth } from 'firebase/auth';`
- Check that firebase is in `package.json`
- Try restarting dev server

### "FirebaseError: Firebase: No Firebase App '[DEFAULT]'"

**Problem:** Trying to use auth before initializing Firebase

**Fix:**
- Make sure `initializeApp(firebaseConfig)` happens BEFORE `getAuth()`
- Order matters:
  ```typescript
  const app = initializeApp(firebaseConfig);  // First
  export const auth = getAuth(app);            // Then
  ```

### Config has placeholder values

**Problem:** Forgot to replace with your actual Firebase config

**Fix:**
- Go back to Firebase Console → Project Settings → Your apps
- Copy your actual config
- Replace the entire `firebaseConfig` object

### "auth is not exported"

**Problem:** Missing `export` keyword

**Fix:**
```typescript
export const auth = getAuth(app); // Must have 'export'
```

## Code Example

Your `src/lib/firebase.ts` should look roughly like this:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "todo-app-12345.firebaseapp.com",
  projectId: "todo-app-12345",
  storageBucket: "todo-app-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export auth
export const auth = getAuth(app);
```

**Important notes:**
- Your config values will be different (don't copy these)
- File extension is `.ts` (not `.tsx` — no React components here)
- This file runs once when imported, initializing Firebase globally

## What You Learned

At this point you should understand:
- ✅ How to initialize Firebase with your project config
- ✅ Why Firebase config goes in a separate file
- ✅ What the `auth` object provides
- ✅ How to export and import modules in TypeScript
- ✅ Why Firebase only needs to be initialized once

## Next Step

Firebase is initialized! But before we build auth features, we need to understand React Context API:

[Step 5: Understanding Context API →](./05-understanding-context-api)
