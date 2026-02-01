# Step 3: Initialize Firestore and Types

> **Time**: ~8 minutes | **Type**: Coding | **Concepts**: Firebase Config, Data Modeling, TypeScript Interfaces

## What We're Building

Adding Firestore to your Firebase configuration and creating TypeScript types that define the shape of your data.

## Before You Code: Understanding Data Models

> **💡 Ask AI First:**
>
> ```
> What is a data model in programming?
> For a todo app, what fields should each todo item have?
> Why use TypeScript interfaces to define data structure?
> What is a Timestamp in Firestore and why use it instead of a regular Date?
> What does the "?" symbol mean in TypeScript interfaces (like "description?:")?
> ```

**What you should learn:**
- Data models define the structure of your data
- Each todo needs: id, title, completed status, userId, timestamp
- TypeScript interfaces provide type safety
- Firestore Timestamps handle timezones and server time correctly
- `?` means optional field

## Let's Build It

### Prompt: Add Firestore to Firebase Config

```
Update my Firebase configuration to include Firestore.

File: src/lib/firebase.ts

Add:
1. Import getFirestore from firebase/firestore
2. Initialize Firestore with getFirestore(app)
3. Export the db instance so other files can use it

Show me the complete updated firebase.ts file.
After showing the code, explain what getFirestore() does.
```

**What to expect:**
- Import statement for `getFirestore`
- `const db = getFirestore(app);`
- Export statement: `export { db };`

**Files you'll modify:**
- `src/lib/firebase.ts`

### Prompt: Create TypeScript Data Model

```
Create a TypeScript interface for my todo items.

Create a new file: src/types/todo.ts

The Todo interface should have:
- id: string (the document ID from Firestore)
- title: string (required)
- description: string (optional)
- completed: boolean (required)
- userId: string (required, links to the owner)
- createdAt: Timestamp from firebase/firestore (required)

Export the interface so other files can import it.
After showing the code, explain why we need each field.
```

**What to expect:**
- New directory: `src/types/`
- New file: `src/types/todo.ts`
- Interface definition with all fields
- Import for Timestamp from firebase/firestore

**Files you'll create:**
- `src/types/todo.ts`

## Understanding What You Built

After AI creates the code, make sure you understand it:

> **💡 Ask AI to Explain:**
>
> ```
> In the firebase.ts file:
> 1. What does getFirestore(app) return?
> 2. Why do we export "db"?
> 3. What will other files import this for?
>
> In the todo.ts interface:
> 1. Why is "id" a string and not a number?
> 2. Why do we need "userId" on every todo?
> 3. What's the difference between "description: string" and "description?: string"?
> 4. Why use Firestore's Timestamp instead of JavaScript Date?
> ```

**Key concepts to understand:**
- `db` is your connection to Firestore
- Firestore IDs are auto-generated strings
- `userId` links data to the authenticated user
- `?` makes a field optional (can be undefined)
- Timestamps handle timezones and server-side time

## Verify It Works

### Check Firebase Config

1. **Open `src/lib/firebase.ts`:**
   - [ ] Has `import { getFirestore } from 'firebase/firestore';`
   - [ ] Has `const db = getFirestore(app);`
   - [ ] Has `export { db };` or `export const db = ...`

2. **Run the app:**
   ```bash
   npm run dev
   ```
   - [ ] No errors about Firestore
   - [ ] App loads successfully
   - [ ] Can still log in (authentication still works)

### Check TypeScript Types

1. **Open `src/types/todo.ts`:**
   - [ ] Has `import { Timestamp } from 'firebase/firestore';`
   - [ ] Has `export interface Todo { ... }`
   - [ ] All fields present: id, title, description, completed, userId, createdAt
   - [ ] `description` is optional (marked with `?`)
   - [ ] `createdAt` is typed as `Timestamp`

2. **No TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```
   - [ ] Should compile without errors
   - [ ] If you see errors, fix them before continuing

## Common Issues

### "Cannot find module 'firebase/firestore'"

**Problem:** Firebase package not installed or wrong import path.

**Fix:**
```bash
# Reinstall Firebase
npm install firebase
```

Verify import:
```typescript
import { getFirestore } from 'firebase/firestore';  // Correct
// NOT: import { getFirestore } from 'firebase';
```

### "Property 'db' does not exist on module"

**Problem:** Forgot to export `db` from firebase.ts.

**Fix:** In `src/lib/firebase.ts`:
```typescript
export const db = getFirestore(app);
// OR
const db = getFirestore(app);
export { db };
```

### "Timestamp is not defined" in todo.ts

**Problem:** Missing import.

**Fix:** In `src/types/todo.ts`:
```typescript
import { Timestamp } from 'firebase/firestore';

export interface Todo {
  // ...
  createdAt: Timestamp;  // Now TypeScript knows what Timestamp is
}
```

### TypeScript error: "Type 'string | undefined' is not assignable"

**Problem:** Confused about optional (`?`) vs required fields.

**Fix:**
```typescript
// Optional field (can be undefined)
description?: string;

// Required field (must always have a value)
title: string;
```

## Code Examples

Your `firebase.ts` should look like this:

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your config from Slice 2
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // ← New!
```

Your `todo.ts` should look like this:

```typescript
// src/types/todo.ts
import { Timestamp } from 'firebase/firestore';

export interface Todo {
  id: string;
  title: string;
  description?: string;  // Optional
  completed: boolean;
  userId: string;
  createdAt: Timestamp;
}
```

## What You Learned

At this point you should understand:
- ✅ How to initialize Firestore in your app (`getFirestore`)
- ✅ How to export the Firestore instance for use in other files
- ✅ How to define data models with TypeScript interfaces
- ✅ The difference between required and optional fields
- ✅ Why Firestore Timestamps are better than JavaScript Dates
- ✅ Why every document needs a userId (data privacy)

## Next Step

Firebase is configured and your data model is defined! Now let's learn about CRUD operations:

[Step 4: Understanding CRUD →](./04-understanding-crud)
