# Step 5: Create Security Rules

> **Time**: ~10 minutes | **Type**: Coding | **Concepts**: Writing rules, validation, ownership

## What We're Building

Writing comprehensive Firestore security rules that:
- Require authentication for all operations
- Enforce user data isolation (userId-based ownership)
- Validate required fields and data types
- Prevent changing immutable fields (userId, createdAt)

## The Prompt for AI

> **💡 Ask AI to help you write the rules:**
>
> ```
> I need Firestore security rules for a todos collection. Each todo has:
> - title (string, required, 1-200 characters)
> - description (string, optional)
> - completed (boolean, required)
> - userId (string, required, must match authenticated user's ID)
> - createdAt (timestamp, required)
>
> Rules should:
> 1. Require authentication for all operations
> 2. Users can only read their own todos (where userId matches request.auth.uid)
> 3. Users can only create todos with their own userId
> 4. Users can only update/delete their own todos
> 5. Validate that title is a non-empty string (1-200 chars)
> 6. Validate that completed is a boolean
> 7. Prevent changing userId or createdAt after creation
> 8. Use helper functions to keep rules DRY
>
> Can you write complete Firestore security rules for this?
> ```

**Wait for AI's response, then read through the rules to understand them.**

## Expected Rules Structure

AI should give you something like this (your version may vary):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todos collection rules
    match /todos/{todoId} {
      // Helper function: Check if user is authenticated
      function isAuthenticated() {
        return request.auth != null;
      }

      // Helper function: Check if user owns this todo
      function isOwner() {
        return resource.data.userId == request.auth.uid;
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

      // Helper function: Check that immutable fields haven't changed
      function immutableFieldsUnchanged() {
        return request.resource.data.userId == resource.data.userId
          && request.resource.data.createdAt == resource.data.createdAt;
      }

      // Read: Must be authenticated and own the todo
      allow read: if isAuthenticated() && isOwner();

      // Create: Must be authenticated and provide valid data
      allow create: if isAuthenticated() && isValidTodo();

      // Update: Must own the todo, provide valid data, and not change immutable fields
      allow update: if isAuthenticated()
        && isOwner()
        && isValidTodo()
        && immutableFieldsUnchanged();

      // Delete: Must own the todo
      allow delete: if isAuthenticated() && isOwner();
    }
  }
}
```

## Part 1: Replace Default Rules

**Open `firestore.rules` in your project:**

```bash
# Open in your editor
code firestore.rules
# or
nano firestore.rules
```

**Delete everything and paste your rules from AI.**

**Save the file.**

## Part 2: Understanding What You Built

Before proceeding, ask AI to explain each part:

> **💡 Ask AI:**
>
> ```
> Can you explain what each part of these security rules does?
> 1. What does the isAuthenticated() function check?
> 2. What does the isOwner() function check?
> 3. What validations does isValidTodo() perform?
> 4. Why do we check immutableFieldsUnchanged() on update?
> 5. What happens if a user tries to read someone else's todo?
> 6. What happens if I try to create a todo with an empty title?
> 7. What happens if I try to change the userId when updating a todo?
> ```

**Read AI's explanations carefully. Make sure you understand each rule.**

## Part 3: Breaking Down the Rules

### Helper Functions (Keep Rules DRY)

```javascript
function isAuthenticated() {
  return request.auth != null;
}
```

**What it does:** Checks if user is logged in.

**Why:** Every operation requires authentication. Writing `request.auth != null` repeatedly is verbose.

---

```javascript
function isOwner() {
  return resource.data.userId == request.auth.uid;
}
```

**What it does:** Checks if the current user owns the existing document.

**Why:** Users should only access their own data.

**Note:** Only works for read/update/delete (requires existing `resource`).

---

```javascript
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
```

**What it does:** Validates the data being written.

**Checks:**
- `title` is a string (not number, not boolean)
- `title` is not empty (`size() > 0`)
- `title` is max 200 characters
- `completed` is a boolean
- `userId` is a string
- `userId` matches authenticated user's ID
- `createdAt` is a Firestore Timestamp

**Why:** Prevents invalid data from being saved.

---

```javascript
function immutableFieldsUnchanged() {
  return request.resource.data.userId == resource.data.userId
    && request.resource.data.createdAt == resource.data.createdAt;
}
```

**What it does:** Ensures `userId` and `createdAt` cannot be changed during updates.

**Why:** These fields should never change after creation. Prevents users from reassigning todos to others or tampering with creation dates.

### Operation Rules

```javascript
allow read: if isAuthenticated() && isOwner();
```

**Read operations:** `get` (single doc) + `list` (query)

**Requires:**
- User is logged in
- User owns the document (userId matches)

**Result:** Users can only read their own todos, not others'.

---

```javascript
allow create: if isAuthenticated() && isValidTodo();
```

**Create operation:** Adding new document

**Requires:**
- User is logged in
- Data passes validation (title, completed, userId, createdAt all valid)

**Result:** Can't create todos with missing/invalid fields or wrong userId.

---

```javascript
allow update: if isAuthenticated()
  && isOwner()
  && isValidTodo()
  && immutableFieldsUnchanged();
```

**Update operation:** Modifying existing document

**Requires:**
- User is logged in
- User owns the document
- New data passes validation
- userId and createdAt haven't changed

**Result:** Can only update own todos, and can't change ownership or creation date.

---

```javascript
allow delete: if isAuthenticated() && isOwner();
```

**Delete operation:** Removing document

**Requires:**
- User is logged in
- User owns the document

**Result:** Can only delete own todos.

## Part 4: Verify Rules Syntax

Check that your rules file is valid:

```bash
firebase deploy --only firestore:rules --dry-run
```

**What this does:**
- Validates rules syntax without deploying
- Shows any errors in your rules

**Expected output:**
```
=== Firestore Rules ===
✔  firestore: rules syntax is valid
```

**If you see "syntax is valid":** ✅ Rules are correctly written!

**If you see errors:**
- Read the error message carefully
- Check for typos (missing semicolons, brackets)
- Make sure all functions are defined
- Ask AI: "I'm getting this error in my Firestore rules: [paste error]. How do I fix it?"

## Common Issues

### "Unexpected token" or "Syntax error"

**Problem:** Typo or missing bracket/semicolon.

**Fix:**
- Check that all `{` have matching `}`
- Check that function definitions end with `}`
- Check that conditions end with `;`
- Use a code editor with syntax highlighting

### "Function not defined"

**Problem:** Calling a function before it's defined.

**Fix:**
- Define helper functions INSIDE the `match` block
- Functions must be defined before they're used

### "Unknown property"

**Problem:** Using wrong property name.

**Fix:**
- It's `request.auth.uid` not `request.user.id`
- It's `request.resource.data` not `request.data`
- It's `resource.data` not `document.data`

### Still having issues?

**Ask AI:**
```
I'm getting this error when validating my Firestore rules:
[paste full error message]

Here are my rules:
[paste your firestore.rules file]

What's wrong?
```

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **What happens if a logged-out user tries to read todos?** (Denied — `request.auth` is null)
> 2. **Can User A read User B's todos?** (No — `isOwner()` fails)
> 3. **Can I create a todo with an empty title?** (No — `title.size() > 0` fails)
> 4. **Can I update a todo to change its userId?** (No — `immutableFieldsUnchanged()` fails)
> 5. **Why use helper functions instead of writing conditions inline?** (DRY, easier to read, reusable)
> 6. **Do these rules run in my React app or on Google's servers?** (Google's servers)

## What You Learned

At this point you should have:
- ✅ Complete Firestore security rules in `firestore.rules`
- ✅ Helper functions for authentication, ownership, validation
- ✅ Rules enforcing user data isolation
- ✅ Rules validating required fields and types
- ✅ Rules preventing changes to immutable fields
- ✅ Syntax validated with `--dry-run`
- ✅ Understanding of what each rule does

## Next Step

Rules are written! Now let's create a firebase.json config to tell Firebase where to find your rules:

[Step 6: Create Firebase Config →](./06-create-firebase-config)
