# Step 8: Verification & Commit

> **Time**: ~8 minutes | **Type**: Testing | **Concepts**: Security verification, Git workflow

## What This Step Is About

Before moving to the next slice, we need to **thoroughly test security rules** and **commit our code**. Security is critical — bugs here mean data breaches.

## Full Verification Checklist

Work through this list carefully. Security matters!

### File Structure

Verify your project has these new files:

```
.firebaserc (new)
firebase.json (new)
firestore.rules (new)
firestore.indexes.json (new)
```

**Check:**
- [ ] All files exist in project root
- [ ] `.firebaserc` contains your project ID
- [ ] `firebase.json` has firestore and hosting config
- [ ] `firestore.rules` contains your security rules
- [ ] No syntax errors in any files

### Firebase CLI Setup

```bash
firebase --version
```

**Check:**
- [ ] Command works (shows version number)
- [ ] Version is 12.x or 13.x

```bash
firebase projects:list
```

**Check:**
- [ ] Your project appears in list
- [ ] Project ID matches Firebase Console

### Rules Deployed

```bash
firebase deploy --only firestore:rules --dry-run
```

**Check:**
- [ ] Shows "rules syntax is valid"
- [ ] No compilation errors

Check Firebase Console → Firestore → Rules:
- [ ] Rules match your local `firestore.rules` file
- [ ] "Published" timestamp is recent (within last 10 minutes)

### App Functionality

```bash
npm run dev
```

**Check:**
- [ ] Server starts without errors
- [ ] App loads at `http://localhost:5173`
- [ ] Can log in successfully
- [ ] No errors in browser console (F12)

### Security: Authentication Required

**Test 1: Logged out access**

1. Make sure you're logged out
2. Open browser console (F12)
3. Try to read todos:
   ```javascript
   import { collection, getDocs } from 'firebase/firestore';
   import { db } from './src/lib/firebase';

   await getDocs(collection(db, 'todos'));
   ```

**Expected:**
- [ ] Error: "Missing or insufficient permissions"
- [ ] Can't access data when not logged in

### Security: User Data Isolation

**Test 2: Can only read own data**

1. Log in as User A
2. Note how many todos you have
3. Check browser console (F12)
4. Try to read all todos (no filter):
   ```javascript
   import { collection, getDocs } from 'firebase/firestore';
   import { db } from './src/lib/firebase';

   const snapshot = await getDocs(collection(db, 'todos'));
   console.log('Todos:', snapshot.size);
   ```

**Expected:**
- [ ] Returns only your todos (not all users' todos)
- [ ] Count matches what you see in UI
- [ ] Even without userId filter, Firestore enforces rules

**Test 3: Can't access others' data**

1. Log in as User A
2. Get a todo ID from another user (check Firebase Console)
3. Try to read it:
   ```javascript
   import { doc, getDoc } from 'firebase/firestore';
   import { db } from './src/lib/firebase';

   const todoRef = doc(db, 'todos', 'other-users-todo-id');
   await getDoc(todoRef);
   ```

**Expected:**
- [ ] Returns empty (no data)
- [ ] Or error: "Missing or insufficient permissions"
- [ ] Can't access other users' todos

### Security: Create Validation

**Test 4: Can't create invalid todos**

Open browser console, try to create todo with empty title:

```javascript
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from './src/lib/firebase';
import { auth } from './src/lib/firebase';

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

**Test 5: Can't create todos for other users**

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

### Security: Update Validation

**Test 6: Can't change userId**

1. Get one of your todo IDs from Firebase Console
2. Try to update userId:
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
- [ ] Can't change userId (immutable field)

**Test 7: Can't change createdAt**

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
- [ ] Can't change createdAt (immutable field)

### App CRUD Operations Still Work

**Test 8: Create todo (UI)**

1. Go to `/todos/new`
2. Title: "Security test todo"
3. Description: "Testing with rules"
4. Submit

**Expected:**
- [ ] Todo created successfully
- [ ] Appears in `/todos` list
- [ ] Appears in Firebase Console with all fields

**Test 9: Read todos (UI)**

1. Go to `/todos`

**Expected:**
- [ ] All your todos appear
- [ ] Loading state shows briefly
- [ ] No permission errors in console

**Test 10: Update todo (UI)**

1. Click "Edit" on a todo
2. Change title to "Updated with rules"
3. Save

**Expected:**
- [ ] Todo updates successfully
- [ ] New title appears in list
- [ ] No errors

**Test 11: Delete todo (UI)**

1. Click "Delete" on a todo
2. Confirm

**Expected:**
- [ ] Todo deleted successfully
- [ ] Disappears from list
- [ ] Removed from Firebase Console

### Multi-User Isolation

**Test 12: Second user can't see first user's data**

1. Log out
2. Create a new user account (different email)
3. Go to `/todos`

**Expected:**
- [ ] Empty state appears
- [ ] Don't see first user's todos
- [ ] Can create own todos

4. Create a todo as second user
5. Check Firebase Console — second user's todo has different userId

6. Log out and log back in as first user
7. Go to `/todos`

**Expected:**
- [ ] See only first user's todos
- [ ] Don't see second user's todos

### Rules Playground Tests

Check Firebase Console → Firestore → Rules → Rules Playground:

- [ ] Authenticated user reading own todo: ✅ Granted
- [ ] Authenticated user reading others' todo: ❌ Denied
- [ ] Unauthenticated reading: ❌ Denied
- [ ] Create with valid data: ✅ Granted
- [ ] Create with empty title: ❌ Denied
- [ ] Create with wrong userId: ❌ Denied

## Common Issues Found During Verification

### All operations get "Permission denied"

**Problem:** Rules too restrictive or wrong collection name.

**Fix:**
- Check that collection name in rules matches your code (`todos`)
- Verify `request.auth != null` (are you logged in?)
- Check browser console for exact error

### Can see other users' todos

**Problem:** Rules not enforcing userId check.

**Fix:**
```javascript
// In firestore.rules, make sure you have:
allow read: if request.auth != null
  && resource.data.userId == request.auth.uid;
```

### Can create todos with invalid data

**Problem:** Validation not strict enough.

**Fix:** Check `isValidTodo()` function includes all validations:
```javascript
function isValidTodo() {
  let data = request.resource.data;
  return data.title is string
    && data.title.size() > 0
    && data.title.size() <= 200
    && data.completed is bool
    && data.userId == request.auth.uid
    && data.createdAt is timestamp;
}
```

### Can change userId or createdAt

**Problem:** Update rule missing immutability check.

**Fix:**
```javascript
allow update: if isAuthenticated()
  && isOwner()
  && isValidTodo()
  && request.resource.data.userId == resource.data.userId
  && request.resource.data.createdAt == resource.data.createdAt;
```

## Understanding Check

Before moving on, make sure you can answer these:

> **💡 Ask yourself:**
>
> 1. **Can a logged-out user read any todos?** (No — authentication required)
> 2. **Can User A read User B's todos, even with DevTools?** (No — server-side rules block it)
> 3. **What happens if I try to create a todo with empty title?** (Rejected by rules, permission denied)
> 4. **Can I change a todo's userId after creation?** (No — immutable field)
> 5. **Where do security rules run?** (Google's servers, not the browser)
> 6. **Can rules be bypassed by modifying React code?** (No — server enforces them)
> 7. **What error message appears when rules deny a request?** ("Missing or insufficient permissions")

If you can't answer these, review:
- [Concepts](../concepts) — Security rules explained
- [Step 1: Understanding Security](./01-understanding-security)
- [Step 4: Understanding Rules Syntax](./04-understanding-rules-syntax)

## Commit Your Work

**IMPORTANT:** Only commit if all verification passes!

### Check Git Status

```bash
git status
```

You should see new files:
- `.firebaserc` (new)
- `firebase.json` (new)
- `firestore.rules` (new)
- `firestore.indexes.json` (new)

### Stage Changes

```bash
git add .firebaserc firebase.json firestore.rules firestore.indexes.json
```

### Commit

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

**Why this commit message?**
- First line summarizes the feature (< 50 chars)
- Blank line separates subject from body
- Bullet points detail all security measures added
- Focuses on "what" security we added

### Verify Commit

```bash
git log -1
```

Should show your commit with the message above.

## What You Accomplished

Congratulations! You now have:

✅ Firebase CLI installed and configured
✅ Firebase project initialized locally
✅ Comprehensive Firestore security rules
✅ Authentication required for all operations
✅ User data isolation enforced server-side
✅ Field validation (types, required fields, length limits)
✅ Immutability rules (userId, createdAt can't change)
✅ Rules tested in Playground
✅ Rules deployed to production
✅ App tested with rules enabled
✅ All CRUD operations still work
✅ Multi-user isolation verified
✅ All code committed to Git

## Skills You Learned

**Security Concepts:**
- Client-side vs server-side validation
- Principle of least privilege
- User data isolation
- Attack scenarios and how to prevent them
- Testing security before deployment

**Firestore Rules:**
- Rules syntax (`match`, `allow`, `if`)
- Helper functions for DRY rules
- `request` vs `resource` objects
- Authentication checks
- Ownership validation
- Data type validation
- Immutability enforcement

**Firebase CLI:**
- Installing and logging in
- Initializing Firebase in a project
- Deploying rules
- Validating rules syntax
- Testing with `--dry-run`

**Testing:**
- Rules Playground for pre-deployment testing
- Security testing in browser console
- Multi-user testing
- Verification checklists

## Next Slice

Security rules are deployed! Your app now has server-side protection. Users can only access their own data, even if they try to bypass the UI.

Next, we'll add polish to make the app production-ready:

[Continue to Slice 5: Polish →](../../slice-5-polish/)

In Slice 5, you'll add:
- Loading states and error handling
- Input validation and user feedback
- Responsive design
- Accessibility improvements
- Performance optimizations
