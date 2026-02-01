# Core Concepts: Security Rules

> Understanding Firestore security rules and why they're critical

Before we implement security rules, let's understand why client-side validation isn't enough and how Firestore security rules protect your data. This isn't optional — without proper rules, your app's data is vulnerable to attacks.

## What Are Firestore Security Rules?

**Firestore security rules** are server-side rules that control who can read and write data in your Firestore database. They're written in a special rules language and run on Google's servers, not in your app.

Think of security rules as a **bouncer at a club**:
- Your React app is like a person trying to enter
- Security rules check ID and permissions
- If rules allow it, the operation proceeds
- If rules deny it, Firestore rejects the request

**Where rules live:**
- Not in your React code
- Not in your browser
- On Google's servers, protecting your Firestore database

**What rules control:**
- Who can read documents (get, list)
- Who can write documents (create, update, delete)
- What data is valid (field validation)

## Why Security Rules Matter

### The Problem: Client-Side Code is NOT Secure

Here's a critical truth: **Anything in your React app can be bypassed.**

Your app might have:
- Login requirements
- Protected routes
- UserId filters in queries
- Form validation

**But all of this runs in the browser, which users control.**

A malicious user can:
1. Open browser DevTools
2. Inspect your code
3. Find your Firebase config
4. Write their own JavaScript to access Firestore directly
5. Read/write/delete ANY data if you don't have rules

**Example attack without security rules:**

```javascript
// Your app's query (trying to be secure):
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid)  // Client-side filter
);

// Attacker's code (bypasses your app entirely):
const q = query(collection(db, 'todos'));  // No filter!
const allTodos = await getDocs(q);  // Gets EVERYONE's todos
```

Without security rules, the attacker's code works. They can read all users' data.

### What Could Go Wrong

**Real-world scenarios without security rules:**

**Privacy breach:**
- User A reads User B's personal todos
- Leaked email addresses, private notes, sensitive data
- GDPR violations, lawsuits, reputation damage

**Data manipulation:**
- Attacker modifies other users' data
- Deletes competitors' content
- Changes account balances (in a financial app)

**Spam and abuse:**
- Automated scripts flood your database
- Millions of fake documents created
- Firestore bill skyrockets (pay per read/write)

**Complete data loss:**
- Malicious script deletes all documents
- No undo, no recovery
- Your app's data is gone

**Example from the real world:**

In 2019, a fitness app left Firestore rules wide open. Within hours:
- Attackers scraped 100,000+ user profiles
- Personal health data, locations, workout routines exposed
- Company faced fines, lawsuits, and shut down

**This is why security rules are NOT optional.**

## Server-Side vs Client-Side Validation

### Client-Side (Your React App)

**What it does:**
- Improves user experience
- Provides instant feedback
- Prevents accidental errors
- Makes app feel responsive

**What it CANNOT do:**
- Stop malicious users
- Enforce security
- Protect data from direct API access
- Prevent bypassing via DevTools

**Example (client-side):**
```typescript
// In your React component
if (!title) {
  setError('Please enter a title');
  return;  // Stops submission
}

await addDoc(collection(db, 'todos'), { title, userId });
```

**Problem:** A user can skip your component entirely and call `addDoc()` from the browser console with no validation.

### Server-Side (Firestore Security Rules)

**What it does:**
- Enforces security on Google's servers
- Cannot be bypassed by users
- Validates every single Firestore request
- Protects against direct API access

**What it checks:**
- Is the user authenticated?
- Do they own this data?
- Are required fields present?
- Are field values valid types?

**Example (server-side):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

**Result:** Even if attacker calls Firestore API directly, server checks rules first. No authentication or wrong userId? Request rejected.

### Visual Diagram: Client vs Server Validation

```
CLIENT-SIDE (Can be bypassed)
┌─────────────────────────────────────────────────┐
│ React Component                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ if (!title) return;                         │ │
│ │ ❌ User opens DevTools                      │ │
│ │ ❌ Calls addDoc() directly                  │ │
│ │ ❌ Skips validation                         │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │ Firestore API            │
        │ (Accepts anything if     │
        │  no security rules)      │
        └──────────────────────────┘


SERVER-SIDE (Cannot be bypassed)
┌─────────────────────────────────────────────────┐
│ Any Request (from app, DevTools, scripts)      │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────────┐
        │ Firestore Security Rules │
        │ (Runs on Google servers) │
        └──────────┬───────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
    ✅ Allowed          ❌ Denied
  (Rules pass)      (Rules fail)
         │                   │
         ▼                   ▼
    Executes           Returns error
   Operation       "Permission denied"
```

## Principle of Least Privilege

**Least privilege** means: Give users the minimum permissions they need, nothing more.

**Bad (too permissive):**
```javascript
// Allow all authenticated users to read/write everything
allow read, write: if request.auth != null;
```

**Problem:** User A can read and modify User B's todos. Everyone can access everything.

**Good (least privilege):**
```javascript
// Allow users to only read/write their own data
allow read, write: if request.auth != null
  && resource.data.userId == request.auth.uid;
```

**Result:** User A can only access their own todos. User B's data is private.

**Why this matters:**
- Limits damage from compromised accounts
- Prevents accidental data corruption
- Reduces attack surface
- Meets privacy regulations (GDPR, CCPA)

**Real-world analogy:**

Imagine a hospital:
- **Bad:** Every doctor can access every patient's records
- **Good:** Doctors can only access their own patients' records

If a doctor's account is hacked, the attacker only gets access to that doctor's patients, not the entire hospital.

## Request vs Resource in Rules

Firestore security rules give you two key objects:

### `request`

**What it is:** The incoming request trying to access Firestore

**Available properties:**
- `request.auth` — User's authentication info
  - `request.auth.uid` — User's unique ID
  - `request.auth.token.email` — User's email
- `request.resource.data` — Data being written (for create/update)
- `request.time` — Server timestamp of request

**Use cases:**
- Check if user is logged in: `request.auth != null`
- Validate userId matches: `request.resource.data.userId == request.auth.uid`
- Ensure required fields: `request.resource.data.title is string`

### `resource`

**What it is:** The existing document in Firestore (for read/update/delete)

**Available properties:**
- `resource.data` — Current document's fields
  - `resource.data.userId` — Who owns this document
  - `resource.data.completed` — Document's current status
- `resource.id` — Document ID

**Use cases:**
- Check ownership before read: `resource.data.userId == request.auth.uid`
- Prevent changing userId: `request.resource.data.userId == resource.data.userId`

### When to Use Which

| Operation | `request` | `resource` |
|-----------|-----------|------------|
| **Create** | ✅ Use `request.resource.data` (new data being written) | ❌ No `resource` (document doesn't exist yet) |
| **Read** | ✅ Use `request.auth` (who's reading?) | ✅ Use `resource.data` (what are they reading?) |
| **Update** | ✅ Use `request.resource.data` (new data) | ✅ Use `resource.data` (old data) |
| **Delete** | ✅ Use `request.auth` (who's deleting?) | ✅ Use `resource.data` (what are they deleting?) |

### Visual Diagram: Request vs Resource

```
CREATE (new document)
┌─────────────────────────────────────────────────────────┐
│ request.auth.uid: "user123"                             │
│ request.resource.data: {                                │
│   title: "New todo",                                    │
│   userId: "user123",                                    │
│   completed: false                                      │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
          │
          ▼ Check: request.resource.data.userId == request.auth.uid
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│ Firestore                                               │
│ (No existing resource)                                  │
└─────────────────────────────────────────────────────────┘


READ / UPDATE / DELETE (existing document)
┌─────────────────────────────────────────────────────────┐
│ request.auth.uid: "user123"                             │
│ request.resource.data: { ... new data ... }             │
└─────────────────────────────────────────────────────────┘
          │
          ▼ Check: resource.data.userId == request.auth.uid
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│ resource (existing document)                            │
│ resource.data: {                                        │
│   title: "Existing todo",                               │
│   userId: "user123",                                    │
│   completed: true                                       │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
```

## Rule Syntax: allow, match, if

Firestore rules use a specific syntax:

### Basic Structure

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules go here
  }
}
```

- `rules_version = '2'` — Use latest rules syntax
- `service cloud.firestore` — Defines Firestore rules
- `match /databases/{database}/documents` — Matches all documents

### `match` — Target Specific Paths

`match` defines which documents the rule applies to.

**Examples:**

```javascript
// Match all documents in todos collection
match /todos/{todoId} {
  // Rules for todos
}

// Match specific user's profile
match /users/{userId} {
  // Rules for user profiles
}

// Match subcollections
match /users/{userId}/posts/{postId} {
  // Rules for posts inside user documents
}
```

**Wildcards:**
- `{todoId}` — Captures the document ID into a variable
- Can use the variable: `{todoId}` becomes accessible as `todoId`

### `allow` — Define Permissions

`allow` specifies what operations are permitted.

**Operations:**
- `read` — Includes `get` (single document) and `list` (query)
- `write` — Includes `create`, `update`, `delete`
- Can specify individually: `allow get, list, create, update, delete`

**Examples:**

```javascript
// Allow all authenticated users to read
allow read: if request.auth != null;

// Allow all authenticated users to write
allow write: if request.auth != null;

// Separate read/write
allow read: if true;  // Anyone can read
allow write: if request.auth != null;  // Only logged-in users can write
```

### `if` — Conditions

`if` defines the condition that must be true for the rule to allow access.

**Common conditions:**

```javascript
// User must be logged in
if request.auth != null

// User must own the data
if request.resource.data.userId == request.auth.uid

// For existing documents, check ownership
if resource.data.userId == request.auth.uid

// Combine conditions
if request.auth != null
  && request.resource.data.userId == request.auth.uid
```

### Complete Example

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todos collection
    match /todos/{todoId} {
      // Read: User must be logged in AND own the todo
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;

      // Create: User must be logged in AND set userId to their own
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;

      // Update: User must own the todo AND not change userId
      allow update: if request.auth != null
        && resource.data.userId == request.auth.uid
        && request.resource.data.userId == resource.data.userId;

      // Delete: User must own the todo
      allow delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

## Testing Rules Safely

Firestore provides a **Rules Playground** to test your rules before deploying.

### Why Test First

**Without testing:**
- Deploy rules
- Break production app
- Users can't access data
- Panic, roll back, debug

**With testing:**
- Write rules
- Test in playground
- Fix issues
- Deploy confidently
- Users happy

### Rules Playground

Firebase Console → Firestore → Rules → Rules Playground

**What you can test:**
1. Choose operation (get, list, create, update, delete)
2. Specify collection path
3. Set authenticated user (simulate login)
4. Provide data for create/update
5. Click "Run" to simulate request

**Test scenarios:**

**Scenario 1: Logged-in user reads their own todo**
- Operation: get
- Path: `/todos/abc123`
- Auth: Authenticated as `user123`
- Simulate: `resource.data.userId = "user123"`
- **Expected:** ✅ Allowed

**Scenario 2: Logged-in user reads someone else's todo**
- Operation: get
- Path: `/todos/xyz789`
- Auth: Authenticated as `user123`
- Simulate: `resource.data.userId = "user456"`
- **Expected:** ❌ Denied

**Scenario 3: Not logged in**
- Operation: get
- Path: `/todos/abc123`
- Auth: Unauthenticated
- **Expected:** ❌ Denied

### Testing in Your App

After deploying rules, test in your actual app:

1. **Read your own data** — Should work
2. **Try to read others' data** — Should fail (check browser console for "Permission denied")
3. **Create new data** — Should work
4. **Update your data** — Should work
5. **Delete your data** — Should work
6. **Log out and try to access** — Should fail

## How It All Fits Together: Complete Security Rules Example

Let's see a complete example for a todo app with validation.

### The Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todos collection rules
    match /todos/{todoId} {
      // Helper function: Check if user owns this todo
      function isOwner() {
        return request.auth != null
          && resource.data.userId == request.auth.uid;
      }

      // Helper function: Validate todo data
      function isValidTodo() {
        let data = request.resource.data;
        return data.title is string
          && data.title.size() > 0
          && data.title.size() <= 200
          && data.completed is bool
          && data.userId is string
          && data.userId == request.auth.uid
          && data.createdAt is timestamp;
      }

      // Read: Must be logged in and own the todo
      allow read: if isOwner();

      // Create: Must be logged in and provide valid data
      allow create: if request.auth != null
        && isValidTodo();

      // Update: Must own the todo, provide valid data, and not change userId or createdAt
      allow update: if isOwner()
        && isValidTodo()
        && request.resource.data.userId == resource.data.userId
        && request.resource.data.createdAt == resource.data.createdAt;

      // Delete: Must own the todo
      allow delete: if isOwner();
    }
  }
}
```

### What These Rules Enforce

**Authentication:**
- ✅ All operations require login (`request.auth != null`)
- ❌ Unauthenticated users blocked completely

**Ownership:**
- ✅ Users can only read their own todos
- ✅ Users can only update/delete their own todos
- ❌ Can't read, modify, or delete others' data

**Data Validation:**
- ✅ Title required (non-empty string)
- ✅ Title max 200 characters
- ✅ Completed must be boolean
- ✅ UserId must match authenticated user
- ✅ CreatedAt must be timestamp

**Immutability:**
- ✅ UserId cannot be changed after creation
- ✅ CreatedAt cannot be changed after creation
- ❌ Can't reassign todos to other users
- ❌ Can't tamper with creation date

### Attack Scenarios (All Blocked)

**Attack 1: Read others' data**
```javascript
// Attacker tries to query all todos
const q = query(collection(db, 'todos'));
const docs = await getDocs(q);
// BLOCKED: Firestore returns only attacker's todos, not others'
```

**Attack 2: Create todo for another user**
```javascript
await addDoc(collection(db, 'todos'), {
  title: 'Spam',
  userId: 'victim123',  // Try to attribute to someone else
  completed: false,
  createdAt: Timestamp.now()
});
// DENIED: userId must match request.auth.uid
```

**Attack 3: Modify someone else's todo**
```javascript
const todoRef = doc(db, 'todos', 'victim-todo-id');
await updateDoc(todoRef, { completed: true });
// DENIED: resource.data.userId doesn't match request.auth.uid
```

**Attack 4: Delete someone else's todo**
```javascript
const todoRef = doc(db, 'todos', 'victim-todo-id');
await deleteDoc(todoRef);
// DENIED: resource.data.userId doesn't match request.auth.uid
```

**Attack 5: Create invalid data**
```javascript
await addDoc(collection(db, 'todos'), {
  title: '',  // Empty title
  completed: 'yes',  // String instead of boolean
  userId: currentUser.uid
});
// DENIED: title.size() must be > 0, completed must be bool
```

### Visual Diagram: Security Flow

```
┌───────────────────────────────────────────────────────────┐
│ User Action: Update todo                                  │
└──────────────────┬────────────────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ React Component      │
        │ updateDoc(todoRef,   │
        │   { completed: true })│
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Firestore API        │
        │ (Google's servers)   │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────────────────────┐
        │ Security Rules Check                 │
        │                                      │
        │ 1. Is user logged in?                │
        │    → Check request.auth != null      │
        │                                      │
        │ 2. Does user own this todo?          │
        │    → Check resource.data.userId      │
        │       == request.auth.uid            │
        │                                      │
        │ 3. Is update data valid?             │
        │    → Check field types               │
        │                                      │
        │ 4. Are immutable fields unchanged?   │
        │    → Check userId, createdAt         │
        └──────────┬───────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
    ✅ All Pass         ❌ Any Fail
         │                   │
         ▼                   ▼
  ┌────────────┐      ┌────────────┐
  │ Execute    │      │ Reject     │
  │ Update     │      │ Request    │
  └────────────┘      └────────────┘
         │                   │
         ▼                   ▼
  Success Response   Error: "Missing or
                     insufficient permissions"
```

## Why These Patterns Matter

Security rules are the difference between a hobby project and a production-ready app.

**Without rules:**
- ❌ Anyone can access any data
- ❌ Data can be corrupted
- ❌ Privacy violations
- ❌ Spam and abuse
- ❌ Massive Firestore bills
- ❌ Legal liability

**With proper rules:**
- ✅ Users can only access their own data
- ✅ Data integrity enforced server-side
- ✅ Privacy protected by default
- ✅ Abuse limited
- ✅ Predictable costs
- ✅ Compliant with regulations

**Real-world impact:**

Good security rules mean:
- Users trust your app with personal data
- No embarrassing breaches in the news
- No panicked 3am alerts about deleted data
- No lawsuits
- Sleep peacefully

**This is not optional for any app that stores user data.**

## What You'll Build

In this slice, you'll create:

- ✅ Firebase CLI installed and configured
- ✅ Firebase project initialized locally
- ✅ `firestore.rules` file with security rules
- ✅ Rules for todos collection (read, create, update, delete)
- ✅ User data isolation (userId-based ownership)
- ✅ Field validation (required fields, types)
- ✅ Immutability rules (userId, createdAt can't change)
- ✅ Rules tested in Playground
- ✅ Rules deployed to Firestore
- ✅ App tested with rules enabled

By the end, your app will be secure. Users can only access their own data, and all data is validated server-side. No attacker can bypass your security, even if they try.

---

## Next Steps

Now that you understand the concepts, let's start building:

[Step 1: Understanding Security →](./steps/01-understanding-security)
