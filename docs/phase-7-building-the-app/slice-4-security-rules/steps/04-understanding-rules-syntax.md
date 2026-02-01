# Step 4: Understanding Rules Syntax

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Rules language, match, allow, request, resource

## What We're Learning

Before writing security rules, we need to understand the special syntax Firestore uses: `match`, `allow`, `if`, `request`, and `resource`.

## Before You Code: Ask AI First

> **💡 Interactive Learning:**
>
> Open your AI assistant and ask these questions. Really read the answers!
>
> ```
> What does "match" do in Firestore security rules?
> What's the difference between "allow read" and "allow write"?
> In Firestore rules, what is "request" and what is "resource"?
> What does "request.auth" tell me?
> What does "request.resource.data" contain?
> When do I use "resource.data" vs "request.resource.data"?
> Can you show me a simple example of a Firestore security rule?
> ```

**What you should learn:**
- `match` targets specific document paths
- `allow read/write` defines permissions
- `if` conditions determine when to allow access
- `request` is the incoming request (who's asking, what they're writing)
- `resource` is the existing document in Firestore
- `request.auth.uid` is the current user's ID

## Understanding the Syntax

After asking AI, make sure you understand these pieces:

### 1. Basic Structure

Every Firestore rules file has this structure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Your rules go here
  }
}
```

- `rules_version = '2'` — Use latest rules syntax
- `service cloud.firestore` — These are Firestore rules
- `match /databases/{database}/documents` — Apply to all documents

### 2. Match — Target Specific Paths

`match` defines which documents the rule applies to:

```javascript
// Match all documents in "todos" collection
match /todos/{todoId} {
  // Rules for todos
}

// Match a specific user's profile
match /users/{userId} {
  // Rules for users
}
```

**Wildcards:**
- `{todoId}` — Captures the document ID into a variable
- Can use the variable in conditions

### 3. Allow — Define Permissions

`allow` specifies what operations are permitted:

```javascript
// Allow reading
allow read: if <condition>;

// Allow writing
allow write: if <condition>;

// Allow specific operations
allow get, list: if <condition>;     // Read = get + list
allow create, update, delete: if <condition>;  // Write = create + update + delete
```

**Operations:**
- `read` = `get` (single doc) + `list` (query)
- `write` = `create` + `update` + `delete`

### 4. If — Conditions

`if` defines when to allow the operation:

```javascript
// Anyone (no condition)
allow read: if true;

// Must be logged in
allow write: if request.auth != null;

// Must own the document
allow read: if resource.data.userId == request.auth.uid;
```

### 5. Request — The Incoming Request

`request` contains information about the request being made:

**Common properties:**

```javascript
request.auth           // Authentication info (null if not logged in)
request.auth.uid       // Current user's ID
request.auth.token.email  // User's email

request.resource.data  // Data being written (for create/update)
request.time           // Server timestamp of request
```

**Use cases:**
- Check if user is logged in: `request.auth != null`
- Validate userId: `request.resource.data.userId == request.auth.uid`
- Check field types: `request.resource.data.title is string`

### 6. Resource — The Existing Document

`resource` contains the current document in Firestore (for read/update/delete):

**Common properties:**

```javascript
resource.data          // Current document's fields
resource.data.userId   // Document's userId field
resource.id            // Document's ID
```

**Use cases:**
- Check ownership: `resource.data.userId == request.auth.uid`
- Prevent changing immutable fields: `request.resource.data.userId == resource.data.userId`

### When to Use Request vs Resource

| Operation | Use `request` | Use `resource` |
|-----------|---------------|----------------|
| **Create** | ✅ `request.resource.data` (new data) | ❌ No `resource` (doesn't exist yet) |
| **Read** | ✅ `request.auth` (who?) | ✅ `resource.data` (what document?) |
| **Update** | ✅ `request.resource.data` (new data) | ✅ `resource.data` (old data) |
| **Delete** | ✅ `request.auth` (who?) | ✅ `resource.data` (what document?) |

## Complete Example

Here's a complete rule for todos:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules for todos collection
    match /todos/{todoId} {
      // Read: Must be logged in AND own the todo
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;

      // Create: Must be logged in AND set userId to own ID
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;

      // Update: Must own the todo
      allow update: if request.auth != null
        && resource.data.userId == request.auth.uid;

      // Delete: Must own the todo
      allow delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

**What this does:**
- ✅ Users must be logged in for all operations
- ✅ Users can only read their own todos
- ✅ Users can only create todos with their own userId
- ✅ Users can only update/delete their own todos
- ❌ Can't access others' data
- ❌ Can't create todos for other users

## Understanding Check

Before moving on, make sure you can answer these:

> **💡 Ask yourself (or ask AI if unsure):**
>
> 1. **What does `match /todos/{todoId}` do?** (Targets all documents in todos collection)
> 2. **What's the difference between `allow read` and `allow get`?** (read = get + list; get is single document only)
> 3. **When would I use `request.resource.data`?** (Create/update — data being written)
> 4. **When would I use `resource.data`?** (Read/update/delete — existing document data)
> 5. **What does `request.auth.uid` contain?** (Current user's unique ID)
> 6. **If `request.auth` is null, what does that mean?** (User is not logged in)
> 7. **Can I combine multiple conditions with `&&`?** (Yes! Both must be true)

**Expected answers:**
1. Applies rules to all documents in the todos collection
2. `read` includes both getting single docs and listing multiple; `get` is only single doc
3. When creating or updating, to check what data is being written
4. When accessing existing document fields (ownership, validation)
5. The logged-in user's unique ID string
6. User is not authenticated
7. Yes, use `&&` for AND, `||` for OR

## What You Learned

At this point you should understand:
- ✅ Basic rules file structure
- ✅ `match` targets specific paths
- ✅ `allow` defines permissions
- ✅ `if` adds conditions
- ✅ `request` contains incoming request info
- ✅ `resource` contains existing document data
- ✅ When to use `request.resource.data` vs `resource.data`

## Next Step

Now that you understand the syntax, let's write actual security rules for your todos app:

[Step 5: Create Security Rules →](./05-create-security-rules)
