# Slice 3 Verification Checklist

> **Use this checklist before moving to Slice 4**

This is your final quality check for CRUD operations and Firestore integration. Work through each section carefully. If anything fails, go back and fix it before proceeding.

## Quick Links

If you find issues, these steps can help:
- [Step 1: Understanding Databases](./steps/01-understanding-databases) — Database concepts
- [Step 2: Enable Firestore](./steps/02-enable-install-firestore) — Firebase Console setup
- [Step 3: Initialize Firestore](./steps/03-initialize-firestore-types) — Config and types
- [Step 4: Understanding CRUD](./steps/04-understanding-crud) — CRUD concepts
- [Step 5: Create Form](./steps/05-create-add-form) — Add operation
- [Step 6: Understanding Queries](./steps/06-understanding-queries) — Query concepts
- [Step 7: List Items](./steps/07-list-items-loading) — Read operation
- [Step 8: Empty State](./steps/08-add-empty-state) — UX when no data
- [Step 9: Edit Item](./steps/09-edit-item) — Update operation
- [Step 10: Delete Item](./steps/10-delete-item) — Delete operation

---

## 1. File Structure

```
src/
├── components/
│   └── Todos/
│       ├── AddTodoForm.tsx
│       ├── EditTodoForm.tsx
│       └── TodosList.tsx
├── lib/
│   └── firebase.ts (updated with db export)
├── pages/
│   ├── AddTodoPage.tsx
│   ├── EditTodoPage.tsx
│   └── TodosPage.tsx
├── types/
│   └── todo.ts
├── App.tsx (updated with todo routes)
└── components/Layout/Navigation.tsx (updated)
```

**Verify:**
- [ ] All files exist in correct locations
- [ ] `src/types/` directory exists
- [ ] `src/components/Todos/` directory exists
- [ ] All React components use `.tsx` extension
- [ ] Todo interface file is `types/todo.ts`

---

## 2. Development Server

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

## 3. Firestore Configuration

**Verify in Firebase Console:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database**
4. [ ] Database exists and is active
5. [ ] Can see "Data" tab
6. [ ] Can see "todos" collection (if you created any todos)

**Verify in code:**

Check `src/lib/firebase.ts`:
- [ ] Contains `import { getFirestore } from 'firebase/firestore'`
- [ ] Has `const db = getFirestore(app);` or similar
- [ ] Exports db: `export const db = ...` or `export { db }`

Check `src/types/todo.ts`:
- [ ] Contains `import { Timestamp } from 'firebase/firestore'`
- [ ] Exports Todo interface
- [ ] Interface has: id, title, description?, completed, userId, createdAt
- [ ] createdAt typed as Timestamp

---

## 4. Create (Add) Operation

### Form Accessibility

**Verify form appears:**
- [ ] Navigate to `/todos/new`
- [ ] Add form loads without errors
- [ ] Form has title input field
- [ ] Form has description textarea field
- [ ] Form has submit button ("Add" or "Create")

### Validation

**Empty title:**
- [ ] Leave title blank
- [ ] Click submit
- [ ] Shows error message
- [ ] Form doesn't submit to Firestore

### Successful Creation

**Create new todo:**
- [ ] Enter title: "Test todo"
- [ ] Enter description: "Test description"
- [ ] Click submit
- [ ] Page shows loading state (button disabled/text changes)
- [ ] After 2-3 seconds, redirects to `/todos`
- [ ] URL changes to `/todos`

**Check Firestore Console:**
1. Go to Firebase Console → Firestore → Data
2. [ ] `todos` collection exists
3. [ ] New document appears with auto-generated ID
4. [ ] Document has fields:
   - title: "Test todo"
   - description: "Test description"
   - completed: false
   - userId: (your user ID string)
   - createdAt: (Firestore Timestamp)

### Multiple Creates

- [ ] Create 3-4 more todos with different titles
- [ ] All appear in Firestore
- [ ] No duplicate IDs
- [ ] All have correct userId

---

## 5. Read (List) Operation

### List Display

**View todos:**
- [ ] Navigate to `/todos`
- [ ] Brief loading state appears ("Loading...")
- [ ] List of todos appears after loading
- [ ] Each todo shows:
  - Title
  - Description (if provided)
  - Completed checkbox
  - Creation date
  - Edit link/button
  - Delete button

### Sorting

- [ ] Todos are sorted by creation date (newest first)
- [ ] Most recently created todo is at the top

### User Isolation

**Test with different users:**
1. Note current todos count
2. Log out
3. Create new user account
4. Go to `/todos`
5. [ ] Empty state appears (no todos)
6. [ ] Don't see first user's todos

7. Create a todo as second user
8. Log out and log back in as first user
9. [ ] See only first user's todos
10. [ ] Don't see second user's todo

### Query Verification

**Check browser DevTools:**
- [ ] Open Network tab
- [ ] Refresh `/todos` page
- [ ] See Firestore API request
- [ ] Request includes userId filter

---

## 6. Empty State

### Display Conditions

**With todos:**
- [ ] Go to `/todos` with existing todos
- [ ] Empty state does NOT appear
- [ ] List is shown instead

**Without todos:**
1. Delete all todos or log in as user with no todos
2. [ ] Shows "No tasks yet!" or similar message
3. [ ] Shows link to add first task
4. [ ] Link text is clear ("Add your first task")

### Link Functionality

- [ ] Click "Add your first task" link
- [ ] Navigates to `/todos/new`
- [ ] Add form appears

### Loading Transition

- [ ] Slow down network (DevTools → Network → Slow 3G)
- [ ] Refresh `/todos` with no todos
- [ ] Shows loading state first
- [ ] Then shows empty state (not both simultaneously)

---

## 7. Update (Edit) Operation

### Edit Form Access

**From list:**
- [ ] On `/todos`, click "Edit" next to a todo
- [ ] URL changes to `/todos/edit/[id]`
- [ ] Edit page loads

### Form Pre-filling

**Verify form loads data:**
- [ ] Brief loading state while fetching
- [ ] Form appears with fields pre-filled:
  - Title matches todo's title
  - Description matches (if todo had one)
  - Completed checkbox matches status
- [ ] All fields are editable

### Successful Update

**Edit and save:**
1. Change title to "Updated todo"
2. Change description to "Updated description"
3. Toggle completed checkbox
4. Click "Update" or "Save"

**Expected:**
- [ ] Button shows "Saving..." or "Updating..."
- [ ] No error messages
- [ ] Redirects to `/todos`
- [ ] Updated todo shows new values in list
- [ ] Creation date didn't change

**Check Firestore:**
- [ ] Firebase Console → todos → find document
- [ ] title updated
- [ ] description updated
- [ ] completed updated
- [ ] userId unchanged
- [ ] createdAt unchanged

### Validation

- [ ] Clear title field
- [ ] Click save
- [ ] Shows error message
- [ ] Doesn't save to Firestore

### Multiple Edits

- [ ] Edit 2-3 different todos
- [ ] All updates save correctly
- [ ] No cross-contamination (editing todo A doesn't change todo B)

---

## 8. Delete Operation

### Delete Confirmation

**Cancel delete:**
1. On `/todos`, click "Delete"
2. [ ] Confirmation dialog appears
3. [ ] Message asks "Are you sure?"
4. Click "Cancel"
5. [ ] Dialog closes
6. [ ] Todo remains in list
7. [ ] Todo still in Firestore

### Successful Delete

**Confirm delete:**
1. Click "Delete" again
2. Click "OK" or confirm

**Expected:**
- [ ] Todo disappears from list immediately
- [ ] No errors in console
- [ ] Todo removed from Firestore (check Console)
- [ ] Other todos remain unaffected

### Multiple Deletes

- [ ] Delete 2-3 todos
- [ ] Each deletion works correctly
- [ ] List updates after each delete

### Delete Last Todo

1. Delete all todos until list is empty

**Expected:**
- [ ] After last delete, empty state appears
- [ ] Shows "No tasks yet!"
- [ ] Link to add first task works

### Delete Loading State

- [ ] Click delete
- [ ] During deletion, button shows "Deleting..."
- [ ] Button is disabled during deletion
- [ ] Can't click delete multiple times

---

## 9. Loading States

**Verify all loading indicators:**

- [ ] `/todos` — Shows "Loading..." while fetching
- [ ] `/todos` — Loading disappears after fetch completes
- [ ] `/todos/new` — Submit button shows loading state
- [ ] `/todos/new` — Button disabled while creating
- [ ] `/todos/edit/:id` — Shows loading while fetching todo
- [ ] `/todos/edit/:id` — Submit button shows loading while saving
- [ ] Delete button shows "Deleting..." during delete
- [ ] Loading states prevent double-submission

---

## 10. Navigation

### Logged In Navigation

**When logged in:**
- [ ] Navigation shows: Home, Todos, Dashboard, Logout
- [ ] "Todos" link navigates to `/todos`
- [ ] All links work without errors

### Logged Out Navigation

**When logged out:**
- [ ] Navigation shows: Home, Login, Register
- [ ] Does NOT show: Todos link
- [ ] Trying to access `/todos` redirects to `/login`
- [ ] Trying to access `/todos/new` redirects to `/login`

---

## 11. Data Persistence

### Page Refresh

**Refresh with todos:**
1. Go to `/todos` (with todos present)
2. Press F5 or Cmd+R to refresh

**Expected:**
- [ ] Brief loading state
- [ ] Todos reappear
- [ ] No data loss
- [ ] Same sort order

**Refresh while editing:**
1. Go to `/todos/edit/[id]`
2. Don't save, just refresh

**Expected:**
- [ ] Form pre-fills again with original data
- [ ] Changes lost (expected behavior without auto-save)

### Browser Close/Reopen

1. View todos list
2. Close browser entirely
3. Reopen browser
4. Navigate to `http://localhost:5173/todos`

**Expected:**
- [ ] Still logged in (if Firebase persistence enabled)
- [ ] All todos still present
- [ ] Data intact in Firestore

---

## 12. Code Quality

### Lint Check

```bash
npm run lint
```

**Verify:**
- [ ] No errors
- [ ] No warnings in todo files (minor warnings elsewhere okay)
- [ ] Specific files to check:
  - [ ] `src/lib/firebase.ts` — No errors
  - [ ] `src/types/todo.ts` — No errors
  - [ ] All components in `src/components/Todos/` — No errors

### TypeScript Check

```bash
npx tsc --noEmit
```

**Verify:**
- [ ] No TypeScript compilation errors
- [ ] All types properly defined
- [ ] No `any` types (or minimal, well-justified)

### Console Check

**Open browser console (F12):**
- [ ] No red errors on `/todos` page load
- [ ] No errors during create flow
- [ ] No errors during edit flow
- [ ] No errors during delete flow
- [ ] No errors on page refresh

**Specific things to avoid:**
- ❌ "Cannot read properties of undefined"
- ❌ "Missing or insufficient permissions"
- ❌ "Document not found"
- ❌ "Collection not found"
- ❌ Firestore API errors

---

## 13. TypeScript Types

### Check Todo Interface

In `src/types/todo.ts`:

```typescript
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

**Verify:**
- [ ] Todo interface exported
- [ ] All fields present
- [ ] `description` is optional (marked with `?`)
- [ ] `createdAt` typed as Firestore Timestamp
- [ ] `id` typed as string

### Check Component Types

**In TodosList.tsx:**
- [ ] State typed: `useState<Todo[]>([])`
- [ ] Uses Todo type from `../../types/todo`

**In EditTodoForm.tsx:**
- [ ] Props interface defines todoId: string
- [ ] Component typed properly

---

## 14. Understanding Check

Before moving on, make sure you can answer these:

- [ ] **What does CRUD stand for?** (Create, Read, Update, Delete)
- [ ] **What Firestore function creates a document?** (`addDoc()`)
- [ ] **What's the difference between getDocs() and getDoc()?** (Multiple vs single document)
- [ ] **Why do we need userId on every todo?** (Privacy, user isolation)
- [ ] **What does updateDoc() do?** (Updates specific fields in existing document)
- [ ] **Can you undo a Firestore delete?** (No, data is permanently gone)
- [ ] **Why use queries instead of fetching all documents?** (Performance, security, cost)
- [ ] **What does useEffect with [] do?** (Runs once on component mount)
- [ ] **What's the difference between updateDoc and setDoc?** (updateDoc modifies fields, setDoc replaces entire document)
- [ ] **Why show loading states?** (UX feedback, prevent double-submission)

If you can't answer these, review:
- [Concepts](./concepts) — Core CRUD explanations
- [Step 4: Understanding CRUD](./steps/04-understanding-crud)
- [Step 6: Understanding Queries](./steps/06-understanding-queries)

---

## 15. Feature Completeness

### Create Features

- [ ] Form with title and description fields
- [ ] Title validation (required)
- [ ] Submit button with loading state
- [ ] Success redirects to todos list
- [ ] Document includes all required fields
- [ ] Auto-generated document ID
- [ ] Firestore Timestamp for createdAt

### Read Features

- [ ] Fetch todos on page load with useEffect
- [ ] Query filters by userId
- [ ] Sort by creation date (newest first)
- [ ] Loading state during fetch
- [ ] Display all todo fields
- [ ] Empty state when no todos
- [ ] Link to add new todo in empty state

### Update Features

- [ ] Edit link in todo list
- [ ] URL parameter for todo ID
- [ ] Fetch todo data on edit page load
- [ ] Pre-fill form with fetched data
- [ ] Update only specific fields
- [ ] Validation before save
- [ ] Loading state during save
- [ ] Success redirects to list

### Delete Features

- [ ] Delete button in todo list
- [ ] Confirmation dialog before delete
- [ ] Actual deletion from Firestore
- [ ] UI update after delete
- [ ] Loading state during delete
- [ ] Empty state after deleting last todo

---

## 16. Git Commit

**Before committing:**
- [ ] All checks above pass
- [ ] App runs without errors
- [ ] All CRUD features work as expected
- [ ] No console errors
- [ ] TypeScript compiles without errors

**Check status:**
```bash
git status
```

**Stage changes:**
```bash
git add src/
```

**Commit:**
```bash
git commit -m "Add CRUD operations with Firestore

- Initialize Firestore in firebase config
- Create Todo interface with TypeScript types
- Add create operation: form to add new todos
- Add read operation: list view with queries and loading states
- Add update operation: edit form with pre-filled data
- Add delete operation: delete button with confirmation
- Implement empty state when no todos exist
- Add routes for todos list, add, and edit pages
- Update navigation to include todos link
- Filter todos by userId for user privacy"
```

**Verify commit:**
```bash
git log -1
```

Should show your commit message.

---

## 17. Final Checks

**You're ready for Slice 4 if:**
- [ ] ✅ Can create new todos
- [ ] ✅ Todos appear in Firestore
- [ ] ✅ Can view list of todos
- [ ] ✅ List filtered by userId (user isolation works)
- [ ] ✅ Empty state appears when no todos
- [ ] ✅ Can edit existing todos
- [ ] ✅ Updates persist to Firestore
- [ ] ✅ Can delete todos with confirmation
- [ ] ✅ All loading states work correctly
- [ ] ✅ No console errors
- [ ] ✅ No linting errors
- [ ] ✅ All code committed to Git
- [ ] ✅ You understand how CRUD operations work

---

## Troubleshooting

### "Firestore is not initialized"

**Problem:** Missing db export from firebase.ts

**Check `src/lib/firebase.ts`:**
```typescript
import { getFirestore } from 'firebase/firestore';
const db = getFirestore(app);
export { db };  // Must export!
```

### "Cannot read property 'uid' of null"

**Problem:** Trying to use currentUser before auth loads

**Fix:** Add null check:
```typescript
if (!currentUser) return <p>Loading...</p>;
```

### User sees other users' todos

**Problem:** Missing userId filter in query

**Fix:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser!.uid)  // Must filter!
);
```

### "Missing or insufficient permissions"

**Problem:** Firestore security rules blocking access

**Temporary fix (development only):**

Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click "Publish".

### Form doesn't submit

**Problem:** Missing `e.preventDefault()` or button type wrong

**Fix:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();  // Must have this!
  // ...
};

<button type="submit">Submit</button>  // type="submit", not "button"
```

### Updates don't persist

**Problem:** Not awaiting updateDoc or wrong document reference

**Fix:**
```typescript
const todoRef = doc(db, 'todos', todoId);
await updateDoc(todoRef, { /* updates */ });  // Must await!
```

### Infinite loading loop

**Problem:** useEffect missing dependency array

**Fix:**
```typescript
useEffect(() => {
  fetchTodos();
}, []);  // Empty array = run once on mount
```

### Todos disappear after page refresh

**Problem:** Not fetching on component mount

**Fix:** Make sure useEffect runs on mount:
```typescript
useEffect(() => {
  // Fetch code here
}, []);  // Empty dependency array
```

---

## Next Steps

If all checks pass, you're ready to move on!

**What you accomplished:**
- ✅ Integrated Firestore with your React app
- ✅ Created complete CRUD operations
- ✅ Implemented user-specific data filtering
- ✅ Added loading and empty states
- ✅ Built forms with validation
- ✅ Persisted data to cloud database
- ✅ Understood NoSQL data modeling

**Next slice:**

[Slice 4: Security Rules →](../../slice-4-security-rules/)

In Slice 4, you'll add Firestore security rules to ensure users can only access their own data, even if they try to bypass the UI. Security rules are the server-side enforcement of privacy.
