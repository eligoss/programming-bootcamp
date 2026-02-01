# Step 7: Test & Deploy Rules

> **Time**: ~10 minutes | **Type**: Testing & Deployment | **Concepts**: Rules Playground, deployment, security testing

## What We're Doing

Testing security rules in the Firebase Rules Playground before deploying, then deploying them to production and verifying your app still works.

## Part 1: Test in Rules Playground

**IMPORTANT:** Always test rules before deploying to avoid breaking your app!

### Open Rules Playground

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Firestore Database** in sidebar
4. Click **Rules** tab
5. Click **Rules Playground** (top right)

**You should see:**
- A simulator where you can test operations
- Options to set authentication
- Ability to specify paths and data

### Test Scenario 1: Authenticated User Reads Own Todo

**Setup:**
1. **Operation:** `get`
2. **Path:** `/todos/test123`
3. **Authenticated:** ✅ Checked
4. **Firebase UID:** `user123`
5. **Simulate existing document:**
   - Click "Run" first without this to see current rules
   - Then click "Simulate read" and add:
   ```json
   {
     "title": "Test todo",
     "userId": "user123",
     "completed": false,
     "createdAt": "2024-01-15T10:00:00Z"
   }
   ```

**Click "Run"**

**Expected result:**
```
✅ Access granted
Allowed by: match /todos/{todoId}, allow read
```

**Why:** User is authenticated and owns the todo (`userId` matches).

### Test Scenario 2: Authenticated User Reads Someone Else's Todo

**Setup:**
1. **Operation:** `get`
2. **Path:** `/todos/test456`
3. **Authenticated:** ✅ Checked
4. **Firebase UID:** `user123` (same user)
5. **Simulate existing document:**
   ```json
   {
     "title": "Someone else's todo",
     "userId": "user456",
     "completed": false,
     "createdAt": "2024-01-15T10:00:00Z"
   }
   ```

**Click "Run"**

**Expected result:**
```
❌ Access denied
Simulated read denied
```

**Why:** User doesn't own this todo (`userId` doesn't match).

### Test Scenario 3: Unauthenticated User Tries to Read

**Setup:**
1. **Operation:** `get`
2. **Path:** `/todos/test123`
3. **Authenticated:** ❌ Unchecked
4. **Simulate existing document:** (same as Scenario 1)

**Click "Run"**

**Expected result:**
```
❌ Access denied
Simulated read denied
```

**Why:** User is not authenticated (`request.auth` is null).

### Test Scenario 4: Create Todo with Valid Data

**Setup:**
1. **Operation:** `create`
2. **Path:** `/todos/newTodo123`
3. **Authenticated:** ✅ Checked
4. **Firebase UID:** `user123`
5. **Data to write:**
   ```json
   {
     "title": "New todo",
     "description": "Test description",
     "completed": false,
     "userId": "user123",
     "createdAt": "2024-01-15T10:00:00Z"
   }
   ```

**Click "Run"**

**Expected result:**
```
✅ Access granted
Allowed by: match /todos/{todoId}, allow create
```

**Why:** User is authenticated, all fields are valid, `userId` matches.

### Test Scenario 5: Create Todo with Invalid Data

**Setup:**
1. **Operation:** `create`
2. **Path:** `/todos/newTodo456`
3. **Authenticated:** ✅ Checked
4. **Firebase UID:** `user123`
5. **Data to write:**
   ```json
   {
     "title": "",
     "completed": false,
     "userId": "user123",
     "createdAt": "2024-01-15T10:00:00Z"
   }
   ```
   (Note: Empty title)

**Click "Run"**

**Expected result:**
```
❌ Access denied
Simulated create denied
```

**Why:** Title is empty, fails validation (`title.size() > 0`).

### Test Scenario 6: Create Todo for Another User

**Setup:**
1. **Operation:** `create`
2. **Path:** `/todos/newTodo789`
3. **Authenticated:** ✅ Checked
4. **Firebase UID:** `user123`
5. **Data to write:**
   ```json
   {
     "title": "Spam todo",
     "completed": false,
     "userId": "user456",
     "createdAt": "2024-01-15T10:00:00Z"
   }
   ```
   (Note: userId doesn't match authenticated user)

**Click "Run"**

**Expected result:**
```
❌ Access denied
Simulated create denied
```

**Why:** `userId` doesn't match `request.auth.uid`, fails validation.

### Verify All Tests Pass

**You should have:**
- ✅ Scenario 1: Granted (own data)
- ❌ Scenario 2: Denied (others' data)
- ❌ Scenario 3: Denied (not logged in)
- ✅ Scenario 4: Granted (valid create)
- ❌ Scenario 5: Denied (invalid data)
- ❌ Scenario 6: Denied (wrong userId)

**If all match expected results:** ✅ Rules are working correctly!

**If any fail unexpectedly:**
- Check your `firestore.rules` file
- Make sure helper functions are defined correctly
- Ask AI: "My rules test failed. Expected [X], got [Y]. Here are my rules: [paste rules]"

## Part 2: Deploy Rules to Firestore

Now that rules are tested, let's deploy them!

### Deploy Command

```bash
firebase deploy --only firestore:rules
```

**What this does:**
- Uploads `firestore.rules` to your Firebase project
- Replaces current rules
- Takes effect immediately

**Output you'll see:**
```
=== Deploying to 'your-project'...

i  deploying firestore
i  firestore: checking firestore.rules for compilation errors...
✔  firestore: rules file firestore.rules compiled successfully
i  firestore: uploading rules firestore.rules...
✔  firestore: released rules firestore.rules to cloud.firestore

✔  Deploy complete!
```

**If you see "Deploy complete":** ✅ Rules are live!

### Verify Deployment

Check that rules are active in Firebase Console:

1. Go to Firebase Console → Firestore → Rules
2. You should see your new rules
3. Top of page shows "Published" with timestamp

**Your rules should match your local `firestore.rules` file.**

## Part 3: Test Your App with New Rules

**CRITICAL:** Test your app to make sure rules don't break functionality.

### Start Dev Server

```bash
npm run dev
```

### Test: Read Your Own Todos

1. Log in to your app
2. Go to `/todos`
3. **Expected:** Your todos appear
4. **Check browser console (F12):** No "Permission denied" errors

**If todos appear:** ✅ Read rules working!

**If "Permission denied" error:**
- Check that todos have `userId` field matching your user ID
- Check Firebase Console → Firestore → todos collection
- Verify `userId` matches your `request.auth.uid`

### Test: Create New Todo

1. Go to `/todos/new`
2. Fill in title and description
3. Click submit
4. **Expected:** Todo created successfully
5. **Check Firebase Console:** New todo appears with `userId`, `createdAt`

**If todo created:** ✅ Create rules working!

**If "Permission denied":**
- Check that your code sets `userId: currentUser.uid`
- Check that your code sets `createdAt: Timestamp.now()`
- Check browser console for exact error

### Test: Update Your Todo

1. On `/todos`, click "Edit" on a todo
2. Change title or description
3. Click save
4. **Expected:** Todo updates successfully

**If update works:** ✅ Update rules working!

**If "Permission denied":**
- Check that you're not trying to change `userId`
- Check that you're not trying to change `createdAt`
- Verify you own the todo (userId matches)

### Test: Delete Your Todo

1. On `/todos`, click "Delete" on a todo
2. Confirm deletion
3. **Expected:** Todo deleted

**If delete works:** ✅ Delete rules working!

### Test: User Isolation (Advanced)

**Optional but recommended:**

1. Log out
2. Create a second user account (different email)
3. Go to `/todos`
4. **Expected:** Empty list (don't see first user's todos)

5. Create a todo as second user
6. Log out and log in as first user
7. **Expected:** See only first user's todos, not second user's

**If users can't see each other's data:** ✅ Isolation working!

## Part 4: Test Security (Optional but Recommended)

### Try to Access Others' Data (Should Fail)

Open browser console (F12) and try:

```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/lib/firebase';

// Try to get all todos (no filter)
const allTodos = await getDocs(collection(db, 'todos'));
console.log('Todos fetched:', allTodos.size);
```

**Expected:** Only returns your own todos, even though we didn't filter by userId!

**Why:** Firestore automatically filters based on rules. Even if your query doesn't filter, the server does.

### Try to Create Invalid Todo (Should Fail)

```javascript
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from './src/lib/firebase';

// Try to create todo with empty title
await addDoc(collection(db, 'todos'), {
  title: '',  // Invalid!
  completed: false,
  userId: 'user123',
  createdAt: Timestamp.now()
});
```

**Expected:** Error: `Missing or insufficient permissions`

**Why:** Rules validate `title.size() > 0`, empty title fails.

## Common Issues

### "Permission denied" when reading own todos

**Problem:** Todos missing `userId` field or userId doesn't match.

**Fix:**
1. Check Firebase Console → Firestore → todos
2. Click on a todo document
3. Verify it has `userId` field
4. Verify `userId` value matches your user ID (check Firebase Authentication for your UID)
5. If missing, manually add `userId` field or recreate todos

### "Permission denied" when creating todos

**Problem:** Code not setting required fields.

**Fix:** Check your create code:
```typescript
await addDoc(collection(db, 'todos'), {
  title,
  description,
  completed: false,
  userId: currentUser.uid,  // Must match authenticated user!
  createdAt: Timestamp.now()  // Must be Timestamp!
});
```

### "Permission denied" when updating

**Problem:** Trying to change userId or createdAt.

**Fix:** Check your update code doesn't include:
```typescript
// ❌ Don't update these
await updateDoc(todoRef, {
  userId: 'something',      // Immutable!
  createdAt: Timestamp.now() // Immutable!
});

// ✅ Only update mutable fields
await updateDoc(todoRef, {
  title,
  description,
  completed
});
```

### Still having permission errors?

**Debug steps:**

1. **Check browser console** for exact error
2. **Check Firebase Console → Firestore → Rules → Logs** for denied requests
3. **Verify userId** in your document matches your authenticated user
4. **Ask AI:**
   ```
   I'm getting "Permission denied" when [creating/reading/updating/deleting] todos.

   My code does:
   [paste your Firestore code]

   My rules are:
   [paste your firestore.rules]

   Error message:
   [paste error from console]

   What's wrong?
   ```

## Understanding What You Did

> **💡 Ask yourself:**
>
> 1. **Why test rules in the Playground first?** (Catch errors before deploying, avoid breaking production)
> 2. **What happens when you deploy rules?** (Uploaded to Firebase, enforced immediately)
> 3. **Can users bypass rules by modifying client code?** (No — rules run on server)
> 4. **If a rule denies a request, what error does the user see?** ("Missing or insufficient permissions")
> 5. **Do rules affect existing data?** (No — only control access to data)

## What You Learned

At this point you should have:
- ✅ Tested rules in Rules Playground
- ✅ Verified all test scenarios pass
- ✅ Deployed rules to production
- ✅ Tested app with new rules (all CRUD works)
- ✅ Verified user data isolation
- ✅ Understanding that rules are now enforced server-side

## Next Step

Rules are deployed and tested! Now let's do comprehensive verification and commit your work:

[Step 8: Verification & Commit →](./08-verification-commit)
