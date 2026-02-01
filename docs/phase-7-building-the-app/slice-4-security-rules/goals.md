# Slice 4 Goals

> **Time**: ~15 minutes | **Outcome**: Secured database

## What "Done" Looks Like

When this slice is complete:

1. **Rules deployed** — Live on Firebase
2. **Read protected** — Only owner can read their data
3. **Write protected** — Only owner can write their data
4. **Tested** — Confirmed rules work

## Acceptance Criteria

### Rules Structure
- [ ] Rules file exists (firestore.rules)
- [ ] Rules syntax is valid
- [ ] Rules cover your collection

### Read Protection
- [ ] Logged in user can read own items
- [ ] Cannot read other users' items
- [ ] Cannot read without being logged in

### Write Protection
- [ ] Logged in user can create items with their userId
- [ ] Cannot create items with different userId
- [ ] Cannot modify other users' items
- [ ] Cannot delete other users' items

### Validation
- [ ] Required fields must be present
- [ ] userId must match authenticated user

## The Security Rules File

Create `firestore.rules` in your project root:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Notes collection (replace with your collection)
    match /notes/{noteId} {
      // Can read if logged in AND you own the document
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.userId;

      // Can create if logged in AND setting userId to yourself
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.userId
                    && request.resource.data.title is string
                    && request.resource.data.content is string;

      // Can update if logged in AND you own it AND not changing userId
      allow update: if request.auth != null
                    && request.auth.uid == resource.data.userId
                    && request.auth.uid == request.resource.data.userId;

      // Can delete if logged in AND you own it
      allow delete: if request.auth != null
                    && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Understanding the Rules

### Key Concepts

| Term | Meaning |
|------|---------|
| `request.auth` | The currently logged-in user (null if not logged in) |
| `request.auth.uid` | The user's unique ID |
| `resource.data` | The existing document in the database |
| `request.resource.data` | The new data being written |

### Rule Logic

```javascript
// "User must be logged in AND be the owner"
request.auth != null && request.auth.uid == resource.data.userId
```

This ensures:
1. Someone is logged in (`request.auth != null`)
2. Their ID matches the document's owner (`request.auth.uid == resource.data.userId`)

## Testing Rules

### In Firebase Console

1. Go to Firestore
2. Click "Rules"
3. Click "Rules playground"
4. Simulate requests

### What to Test

| Test | Expected |
|------|----------|
| Read own note (logged in) | ✅ Allowed |
| Read own note (logged out) | ❌ Denied |
| Read other's note | ❌ Denied |
| Create note with own userId | ✅ Allowed |
| Create note with fake userId | ❌ Denied |
| Delete own note | ✅ Allowed |
| Delete other's note | ❌ Denied |

## NOT in This Slice

- ❌ Complex role-based rules
- ❌ Admin access
- ❌ Rate limiting
- ❌ Data size limits

Basic owner-only access is sufficient.

## Commit Message

When done:
```
Add Firestore security rules
```

---

[View Prompts →](./prompts)
