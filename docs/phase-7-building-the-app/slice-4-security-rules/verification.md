# Slice 4 Verification Checklist

> **Use this checklist before moving to Slice 5**

This is your final quality check for Firestore security rules. Work through each section carefully. Security bugs mean data breaches — don't skip this!

## Quick Links

If you find issues, these steps can help:
- [Step 1: Understanding Security](./steps/01-understanding-security) — Why rules matter
- [Step 2: Install Firebase CLI](./steps/02-install-firebase-cli) — CLI setup
- [Step 3: Initialize Firebase Project](./steps/03-initialize-firebase-project) — Project config
- [Step 4: Understanding Rules Syntax](./steps/04-understanding-rules-syntax) — Rules language
- [Step 5: Create Security Rules](./steps/05-create-security-rules) — Writing rules
- [Step 6: Create Firebase Config](./steps/06-create-firebase-config) — firebase.json
- [Step 7: Test & Deploy Rules](./steps/07-test-deploy-rules) — Testing and deployment

---

## 1. File Structure

```
project-root/
├── .firebaserc
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
└── src/
    └── (your app files)
```

**Verify:**
- [ ] All Firebase files exist in project root (not in `src/`)
- [ ] `.firebaserc` is present
- [ ] `firebase.json` is present
- [ ] `firestore.rules` is present
- [ ] `firestore.indexes.json` is present

---

## 2. Firebase CLI

### Installation

```bash
firebase --version
```

**Verify:**
- [ ] Command works (not "command not found")
- [ ] Version is 12.x or 13.x or higher
- [ ] No errors

### Authentication

```bash
firebase projects:list
```

**Verify:**
- [ ] Your project appears in list
- [ ] Project ID matches Firebase Console
- [ ] Project name is correct
- [ ] No authentication errors

### Project Configuration

```bash
firebase use
```

**Verify:**
- [ ] Shows "Active Project: your-project-id"
- [ ] Project ID matches your Firebase project

---

## 3. Firebase Configuration Files

### .firebaserc

```bash
cat .firebaserc
```

**Verify:**
- [ ] File contains JSON
- [ ] Has `"projects"` key
- [ ] Has `"default"` key with your project ID
- [ ] No syntax errors

**Expected structure:**
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### firebase.json

```bash
cat firebase.json
```

**Verify:**
- [ ] File contains JSON
- [ ] Has `"firestore"` section
- [ ] `"rules"` points to `"firestore.rules"`
- [ ] `"indexes"` points to `"firestore.indexes.json"`
- [ ] Optionally has `"hosting"` section
- [ ] No syntax errors

**Expected structure:**
```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "dist",
    "ignore": [...],
    "rewrites": [...]
  }
}
```

---

## 4. Security Rules File

### Rules Exist

```bash
cat firestore.rules
```

**Verify:**
- [ ] File is not empty
- [ ] Contains `rules_version = '2';`
- [ ] Contains `service cloud.firestore`
- [ ] Contains `match /todos/{todoId}`
- [ ] Has rules for read, create, update, delete
- [ ] No default `if false` rules

### Rules Syntax Valid

```bash
firebase deploy --only firestore:rules --dry-run
```

**Verify:**
- [ ] Shows "rules syntax is valid"
- [ ] Shows "rules file firestore.rules compiled successfully"
- [ ] No compilation errors
- [ ] No syntax errors

---

## 5. Rules Deployed

### Check Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database** → **Rules** tab

**Verify:**
- [ ] Rules are shown in the editor
- [ ] "Published" timestamp is recent (within last hour)
- [ ] Rules match your local `firestore.rules` file
- [ ] No "if false" default rules

### Check Deployment

```bash
firebase deploy --only firestore:rules
```

**Verify:**
- [ ] Shows "Deploy complete!"
- [ ] No errors
- [ ] Rules uploaded successfully
- [ ] Firebase Console updates immediately

---

## 6. Development Server

```bash
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] Terminal shows "Local: http://localhost:5173/"
- [ ] No red error messages in terminal
- [ ] Opening browser loads the app
- [ ] Browser console (F12) shows no errors
- [ ] Authentication still works (can log in)

---

## 7. App Functionality with Rules

### Authentication

**Logged out:**
- [ ] Can access home page
- [ ] Can access login page
- [ ] Can access register page
- [ ] Cannot access `/todos` (redirects to login)

**Logged in:**
- [ ] Can access `/todos`
- [ ] Can access `/todos/new`
- [ ] Can access `/todos/edit/:id`
- [ ] Dashboard works

### Create Operation

**Valid todo:**
1. Go to `/todos/new`
2. Enter title: "Test with rules"
3. Enter description: "Security rules active"
4. Click submit

**Expected:**
- [ ] Todo created successfully
- [ ] Redirects to `/todos`
- [ ] New todo appears in list
- [ ] No errors in browser console
- [ ] Firebase Console shows todo with all fields:
  - title
  - description
  - completed: false
  - userId: (your user ID)
  - createdAt: (timestamp)

**Invalid todo (empty title):**
- [ ] Try to submit with empty title
- [ ] Shows validation error
- [ ] Does not submit to Firestore

### Read Operation

**View todos:**
1. Go to `/todos`

**Expected:**
- [ ] Brief loading state
- [ ] Your todos appear
- [ ] All fields display correctly
- [ ] No "Permission denied" errors in console
- [ ] Only YOUR todos appear (not other users')

### Update Operation

**Valid update:**
1. Click "Edit" on a todo
2. Change title to "Updated with rules"
3. Save

**Expected:**
- [ ] Todo updates successfully
- [ ] New title appears in list
- [ ] No errors in console
- [ ] Firebase Console shows updated title
- [ ] userId and createdAt unchanged

### Delete Operation

**Valid delete:**
1. Click "Delete" on a todo
2. Confirm deletion

**Expected:**
- [ ] Todo deleted successfully
- [ ] Disappears from list
- [ ] Removed from Firebase Console
- [ ] No errors in console

---

## 8. Security: Authentication Required

### Logged Out Access Blocked

**Test in browser console (while logged out):**

```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/lib/firebase';

await getDocs(collection(db, 'todos'));
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Cannot access data when not authenticated
- [ ] Request rejected by Firestore

---

## 9. Security: User Data Isolation

### Can Only Read Own Data

**Test 1: Query without userId filter**

Log in and run in browser console:

```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/lib/firebase';

const snapshot = await getDocs(collection(db, 'todos'));
console.log('Todos count:', snapshot.size);
```

**Expected:**
- [ ] Returns only YOUR todos
- [ ] Count matches what you see in UI
- [ ] Even without userId filter, rules enforce isolation
- [ ] Can't access other users' data

### Can't Read Others' Data

**Test 2: Try to read another user's todo**

1. Get a todo ID from another user (check Firebase Console)
2. Run in browser console:

```javascript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './src/lib/firebase';

const todoRef = doc(db, 'todos', 'other-users-todo-id');
const snapshot = await getDoc(todoRef);
console.log('Data:', snapshot.exists());
```

**Expected:**
- [ ] `snapshot.exists()` is `false`
- [ ] Or error: "Missing or insufficient permissions"
- [ ] Cannot access other users' documents

### Multi-User Test

**Test 3: Second user can't see first user's data**

1. Log out
2. Create a new user account (different email)
3. Go to `/todos`

**Expected:**
- [ ] Empty state appears
- [ ] Don't see first user's todos

4. Create a todo as second user
5. Check Firebase Console:
   - [ ] Second user's todo has different userId
   - [ ] Both users' todos exist in database

6. Log out and log in as first user
7. Go to `/todos`

**Expected:**
- [ ] See only first user's todos
- [ ] Don't see second user's todos

---

## 10. Security: Create Validation

### Can't Create Invalid Todos

**Test 1: Empty title**

Run in browser console:

```javascript
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from './src/lib/firebase';

await addDoc(collection(db, 'todos'), {
  title: '',  // Empty!
  completed: false,
  userId: auth.currentUser.uid,
  createdAt: Timestamp.now()
});
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Empty title rejected by rules
- [ ] No document created in Firestore

**Test 2: Missing required fields**

```javascript
await addDoc(collection(db, 'todos'), {
  title: 'Test',
  completed: false
  // Missing userId and createdAt!
});
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Missing fields rejected by rules

**Test 3: Wrong userId**

```javascript
await addDoc(collection(db, 'todos'), {
  title: 'Spam',
  completed: false,
  userId: 'fake-user-id',  // Wrong userId!
  createdAt: Timestamp.now()
});
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Wrong userId rejected by rules
- [ ] Can't create todos for other users

**Test 4: Wrong data types**

```javascript
await addDoc(collection(db, 'todos'), {
  title: 123,  // Number instead of string!
  completed: 'yes',  // String instead of boolean!
  userId: auth.currentUser.uid,
  createdAt: Timestamp.now()
});
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Wrong types rejected by rules

---

## 11. Security: Update Validation

### Can't Change Immutable Fields

**Test 1: Can't change userId**

1. Get one of your todo IDs from Firebase Console
2. Run in browser console:

```javascript
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './src/lib/firebase';

const todoRef = doc(db, 'todos', 'your-todo-id');
await updateDoc(todoRef, {
  userId: 'different-user'  // Try to reassign!
});
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] userId cannot be changed (immutable)

**Test 2: Can't change createdAt**

```javascript
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './src/lib/firebase';

const todoRef = doc(db, 'todos', 'your-todo-id');
await updateDoc(todoRef, {
  createdAt: Timestamp.now()  // Try to change date!
});
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] createdAt cannot be changed (immutable)

### Can Update Mutable Fields

**Test 3: Can update title and completed**

```javascript
const todoRef = doc(db, 'todos', 'your-todo-id');
await updateDoc(todoRef, {
  title: 'Updated title',
  completed: true
});
```

**Expected:**
- [ ] Update succeeds
- [ ] Changes appear in Firebase Console
- [ ] No errors

---

## 12. Security: Delete Validation

### Can Only Delete Own Todos

**Test 1: Delete own todo**

```javascript
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './src/lib/firebase';

const todoRef = doc(db, 'todos', 'your-todo-id');
await deleteDoc(todoRef);
```

**Expected:**
- [ ] Delete succeeds
- [ ] Todo removed from Firestore
- [ ] No errors

**Test 2: Can't delete others' todos**

1. Get another user's todo ID from Firebase Console
2. Try to delete:

```javascript
const todoRef = doc(db, 'todos', 'other-users-todo-id');
await deleteDoc(todoRef);
```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Todo not deleted
- [ ] Still exists in Firestore

---

## 13. Rules Playground Tests

Check Firebase Console → Firestore → Rules → Rules Playground:

### Test 1: Read Own Todo

- **Operation:** `get`
- **Path:** `/todos/test123`
- **Authenticated:** ✅ Yes
- **Firebase UID:** `user123`
- **Simulate document:** `{"userId": "user123", "title": "Test"}`

**Expected:**
- [ ] ✅ Access granted

### Test 2: Read Others' Todo

- **Operation:** `get`
- **Path:** `/todos/test456`
- **Authenticated:** ✅ Yes
- **Firebase UID:** `user123`
- **Simulate document:** `{"userId": "user456", "title": "Test"}`

**Expected:**
- [ ] ❌ Access denied

### Test 3: Unauthenticated Read

- **Operation:** `get`
- **Path:** `/todos/test123`
- **Authenticated:** ❌ No

**Expected:**
- [ ] ❌ Access denied

### Test 4: Create Valid Todo

- **Operation:** `create`
- **Path:** `/todos/newTodo`
- **Authenticated:** ✅ Yes
- **Firebase UID:** `user123`
- **Data:** `{"title": "Test", "userId": "user123", "completed": false, "createdAt": "2024-01-15T10:00:00Z"}`

**Expected:**
- [ ] ✅ Access granted

### Test 5: Create Invalid Todo (Empty Title)

- **Operation:** `create`
- **Path:** `/todos/newTodo`
- **Authenticated:** ✅ Yes
- **Firebase UID:** `user123`
- **Data:** `{"title": "", "userId": "user123", "completed": false, "createdAt": "2024-01-15T10:00:00Z"}`

**Expected:**
- [ ] ❌ Access denied

### Test 6: Create with Wrong userId

- **Operation:** `create`
- **Path:** `/todos/newTodo`
- **Authenticated:** ✅ Yes
- **Firebase UID:** `user123`
- **Data:** `{"title": "Test", "userId": "user456", "completed": false, "createdAt": "2024-01-15T10:00:00Z"}`

**Expected:**
- [ ] ❌ Access denied

---

## 14. Code Quality

### Lint Check

```bash
npm run lint
```

**Verify:**
- [ ] No errors in Firebase config files
- [ ] No errors in app code
- [ ] Rules file is properly formatted

### TypeScript Check

```bash
npx tsc --noEmit
```

**Verify:**
- [ ] No TypeScript compilation errors
- [ ] All imports resolve correctly

### Console Check

**Open browser console (F12):**
- [ ] No red errors on page load
- [ ] No errors during CRUD operations
- [ ] No Firestore permission errors (unless expected)

**Specific things to avoid:**
- ❌ "Missing or insufficient permissions" (unless testing security)
- ❌ "Cannot read properties of undefined"
- ❌ "Collection not found"
- ❌ Unexpected errors

---

## 15. Understanding Check

Before moving on, make sure you can answer these:

- [ ] **Why can't I trust client-side validation?** (Users control the browser, can bypass it)
- [ ] **Where do Firestore security rules run?** (Google's servers, not the browser)
- [ ] **Can a user bypass rules with DevTools?** (No, rules are server-side)
- [ ] **What does `request.auth.uid` contain?** (Current user's unique ID)
- [ ] **What's the difference between `request.resource.data` and `resource.data`?** (New data vs existing data)
- [ ] **Can I change a todo's userId after creation?** (No, immutable field)
- [ ] **What happens if rules deny a request?** (Error: "Missing or insufficient permissions")
- [ ] **Why do we validate data in rules if we validate in React?** (Client-side can be bypassed, server-side can't)

If you can't answer these, review:
- [Concepts](./concepts) — Security explained
- [Step 1: Understanding Security](./steps/01-understanding-security)
- [Step 4: Understanding Rules Syntax](./steps/04-understanding-rules-syntax)

---

## 16. Git Commit

**Before committing:**
- [ ] All checks above pass
- [ ] Rules deployed and tested
- [ ] App works with rules enabled
- [ ] No console errors
- [ ] Security verified

**Check status:**
```bash
git status
```

**Stage changes:**
```bash
git add .firebaserc firebase.json firestore.rules firestore.indexes.json
```

**Commit:**
```bash
git commit -m "Add Firestore security rules

- Initialize Firebase CLI in project
- Create security rules for todos collection
- Require authentication for all operations
- Enforce user data isolation via userId checks
- Validate required fields and data types
- Prevent changing immutable fields (userId, createdAt)
- Test rules in Rules Playground
- Deploy rules to production
- Verify app functionality with rules enabled"
```

**Verify commit:**
```bash
git log -1
```

Should show your commit message.

---

## 17. Final Checks

**You're ready for Slice 5 if:**
- [ ] ✅ Firebase CLI installed and logged in
- [ ] ✅ Firebase project initialized locally
- [ ] ✅ Security rules written and deployed
- [ ] ✅ Authentication required for all operations
- [ ] ✅ User data isolation enforced (can't access others' data)
- [ ] ✅ Create validation (empty title, wrong userId blocked)
- [ ] ✅ Update validation (can't change userId or createdAt)
- [ ] ✅ Delete validation (can only delete own todos)
- [ ] ✅ Rules tested in Playground (all tests pass)
- [ ] ✅ App still works with rules enabled
- [ ] ✅ No console errors
- [ ] ✅ Multi-user testing passed
- [ ] ✅ All code committed to Git
- [ ] ✅ You understand how rules protect your data

---

## Troubleshooting

### "Missing or insufficient permissions" for valid operations

**Problem:** Rules too restrictive or data missing required fields.

**Check:**
1. Firebase Console → Firestore → Rules → **Logs**
2. See which rule is denying the request
3. Check if document has `userId` field
4. Check if `userId` matches current user

**Fix:**
```javascript
// Make sure your todos have userId
const todos = await getDocs(query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid)
));
```

### Rules allow access they shouldn't

**Problem:** Rules not restrictive enough.

**Check:**
1. Firebase Console → Firestore → Rules
2. Make sure you have `isOwner()` checks
3. Make sure you're checking `request.auth != null`

**Fix:**
```javascript
// Read rule should check ownership
allow read: if request.auth != null
  && resource.data.userId == request.auth.uid;
```

### Can't create todos at all

**Problem:** Validation too strict or missing fields.

**Check:**
1. Browser console for exact error
2. Make sure you're setting all required fields:
   - title (string, 1-200 chars)
   - completed (boolean)
   - userId (matches auth.currentUser.uid)
   - createdAt (Timestamp)

**Fix:**
```typescript
await addDoc(collection(db, 'todos'), {
  title,
  description,
  completed: false,
  userId: currentUser.uid,  // Must match!
  createdAt: Timestamp.now()  // Must be Timestamp!
});
```

### Syntax errors in rules

**Problem:** Typo or wrong syntax.

**Fix:**
```bash
# Check syntax
firebase deploy --only firestore:rules --dry-run

# Common issues:
# - Missing semicolons
# - Unmatched brackets {}
# - Using = instead of ==
# - Wrong property names (request.user instead of request.auth)
```

---

## Next Steps

If all checks pass, you're ready to move on!

**What you accomplished:**
- ✅ Installed and configured Firebase CLI
- ✅ Initialized Firebase in your project
- ✅ Created comprehensive security rules
- ✅ Enforced authentication and user isolation
- ✅ Validated data types and required fields
- ✅ Tested rules thoroughly
- ✅ Deployed rules to production
- ✅ Verified app works with security enabled

**Next slice:**

[Slice 5: Polish →](../../slice-5-polish/)

In Slice 5, you'll add:
- Better error handling and user feedback
- Loading states throughout the app
- Responsive design for mobile
- Accessibility improvements
- Performance optimizations
- Final touches before deployment
