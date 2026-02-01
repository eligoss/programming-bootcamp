# Step 11: Verification & Commit

> **Time**: ~10 minutes | **Type**: Testing | **Concepts**: Quality Assurance, Git Workflow, CRUD Testing

## What This Step Is About

Before moving to the next slice, we need to **thoroughly test all CRUD operations** and **commit our code**. Data management is critical — bugs here mean lost or corrupted user data.

## Full Verification Checklist

Work through this list carefully. Test every scenario!

### File Structure

Verify your project has these new files:

```
src/
├── components/
│   └── Todos/
│       ├── AddTodoForm.tsx (new)
│       ├── EditTodoForm.tsx (new)
│       └── TodosList.tsx (new)
├── lib/
│   └── firebase.ts (updated)
├── pages/
│   ├── AddTodoPage.tsx (new)
│   ├── EditTodoPage.tsx (new)
│   └── TodosPage.tsx (new)
├── types/
│   └── todo.ts (new)
├── App.tsx (updated)
└── components/Layout/Navigation.tsx (updated)
```

**Check:**
- [ ] All new files exist in correct locations
- [ ] No typos in file names
- [ ] All imports resolve (no red squiggles in IDE)

### App Runs Without Errors

```bash
npm run dev
```

**Check:**
- [ ] Dev server starts successfully
- [ ] No errors in terminal
- [ ] Browser console shows no errors on initial load
- [ ] App loads at `http://localhost:5173`
- [ ] Authentication still works (can log in)

### Firestore Initialization

**Check code:**
- [ ] `src/lib/firebase.ts` exports `db`
- [ ] `src/types/todo.ts` exports `Todo` interface
- [ ] Firebase Console → Firestore shows your database

### Create (Add) Flow

**Test 1: Successful creation**

1. Navigate to `/todos/new` (or click "Add" link)
2. Title: `Test todo 1`
3. Description: `Testing create operation`
4. Click submit

**Expected:**
- [ ] Button shows "Adding..." or "Creating..."
- [ ] No error messages
- [ ] Redirects to `/todos`
- [ ] New todo appears in list
- [ ] Firebase Console → Firestore → todos shows new document with:
  - title: "Test todo 1"
  - description: "Testing create operation"
  - completed: false
  - userId: (your user ID)
  - createdAt: (timestamp)

**Test 2: Validation**

- [ ] Empty title → Shows error "Please enter a title"
- [ ] Form doesn't submit if validation fails

**Test 3: Multiple creates**

- [ ] Create 3-4 more todos with different titles
- [ ] All appear in Firestore
- [ ] All appear in `/todos` list

### Read (List) Flow

**Test 1: View todos list**

1. Go to `/todos`

**Expected:**
- [ ] Brief loading state ("Loading...")
- [ ] All your todos appear
- [ ] Sorted by creation date (newest first)
- [ ] Each todo shows:
  - Title
  - Description (if present)
  - Completed checkbox
  - Creation date
  - Edit link
  - Delete button

**Test 2: User isolation**

1. Log out
2. Create a new user account (different email)
3. Go to `/todos`

**Expected:**
- [ ] Empty state appears ("No tasks yet!")
- [ ] Don't see the first user's todos
- [ ] Link to add first task works

4. Add a todo as this new user
5. Log out and log back in as first user

**Expected:**
- [ ] See only first user's todos
- [ ] Don't see second user's todos

**Test 3: Empty state**

1. Log in as user with no todos (or delete all todos)
2. Go to `/todos`

**Expected:**
- [ ] Shows "No tasks yet!" or similar message
- [ ] Shows link to add first task
- [ ] Link works (navigates to `/todos/new`)

### Update (Edit) Flow

**Test 1: Successful update**

1. On `/todos`, click "Edit" next to a todo
2. Should navigate to `/todos/edit/[id]`
3. Form should pre-fill with todo data
4. Change title to "Updated title"
5. Change description to "Updated description"
6. Toggle completed checkbox
7. Click "Update" or "Save"

**Expected:**
- [ ] Form pre-fills correctly
- [ ] Button shows "Saving..." or "Updating..."
- [ ] No errors
- [ ] Redirects to `/todos`
- [ ] Updated todo shows new values
- [ ] Firebase Console shows updated document
- [ ] userId and createdAt did NOT change

**Test 2: Validation**

- [ ] Clear title field → Shows error
- [ ] Form doesn't submit if validation fails

**Test 3: Edit multiple todos**

- [ ] Edit 2-3 different todos
- [ ] All updates persist correctly

### Delete Flow

**Test 1: Cancel delete**

1. On `/todos`, click "Delete" on a todo
2. Confirmation dialog appears
3. Click "Cancel"

**Expected:**
- [ ] Dialog closes
- [ ] Todo remains in list
- [ ] Todo still in Firestore

**Test 2: Successful delete**

1. Click "Delete" on a todo
2. Confirm deletion

**Expected:**
- [ ] Dialog appears asking for confirmation
- [ ] After confirming, todo disappears from list
- [ ] Todo removed from Firestore
- [ ] No errors in console

**Test 3: Delete multiple todos**

- [ ] Delete 2-3 todos
- [ ] Each deletes successfully
- [ ] List updates after each delete

**Test 4: Delete last todo**

1. Delete all todos until list is empty

**Expected:**
- [ ] After last delete, empty state appears
- [ ] "No tasks yet!" message shows
- [ ] Link to add first task works

### Loading States

**Check all loading indicators:**

- [ ] `/todos` shows loading while fetching
- [ ] `/todos/new` shows loading on submit button
- [ ] `/todos/edit/:id` shows loading while fetching todo
- [ ] `/todos/edit/:id` shows loading on submit button
- [ ] Delete button shows loading while deleting
- [ ] Loading prevents double-submissions

### Navigation

**When logged in:**
- [ ] Shows: Home, Todos, Dashboard, Logout
- [ ] Todos link navigates to `/todos`

**When logged out:**
- [ ] Shows: Home, Login, Register
- [ ] Does NOT show: Todos, Dashboard, Logout
- [ ] Trying to access `/todos` redirects to `/login`

### Data Persistence

**Test 1: Refresh while viewing list**

1. Go to `/todos` (with todos)
2. Refresh page (F5)

**Expected:**
- [ ] Todos still appear
- [ ] No data loss
- [ ] No errors

**Test 2: Close and reopen browser**

1. View todos
2. Close browser entirely
3. Reopen and navigate to `/todos`

**Expected:**
- [ ] Still logged in (if persistence enabled)
- [ ] Todos still present
- [ ] Data intact

### Code Quality

Run the linter:

```bash
npm run lint
```

**Check:**
- [ ] No linting errors
- [ ] No unused imports
- [ ] No TypeScript errors

If errors exist, fix them now before committing.

### TypeScript Check

```bash
npx tsc --noEmit
```

**Check:**
- [ ] No TypeScript compilation errors
- [ ] All types properly defined
- [ ] No `any` types (or minimal, well-justified)

## Common Issues Found During Verification

### Todos don't appear after creation

**Problem:** Not redirecting or not refetching after create.

**Fix:**
- Verify `navigate('/todos')` after successful addDoc
- Make sure TodosList fetches on mount with useEffect

### User sees other users' todos

**Problem:** Missing userId filter in query.

**Fix:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser!.uid),  // Must have this!
  orderBy('createdAt', 'desc')
);
```

### Edit doesn't save changes

**Problem:** Not awaiting updateDoc or wrong field names.

**Fix:**
```typescript
await updateDoc(todoRef, {
  title,           // Field names must match Firestore
  description,
  completed
});
```

### Delete removes from UI but not Firestore

**Problem:** Updating state before Firestore delete completes.

**Fix:**
```typescript
await deleteDoc(todoRef);  // Delete from Firestore first
setTodos(prev => prev.filter(t => t.id !== todoId));  // Then update UI
```

### Security rules blocking operations

**Problem:** Firestore rules deny read/write.

**Fix:** Firebase Console → Firestore → Rules (temporary for development):
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

## Understanding Your Work

Before committing, make sure you understand what you built:

> **💡 Final Understanding Check:**
>
> Ask yourself (or ask AI if you're unsure):
>
> 1. **What does CRUD stand for and what Firestore function does each?**
> 2. **Why do we need a userId field on every document?**
> 3. **What's the difference between getDocs() and getDoc()?**
> 4. **How does useEffect with empty dependency array work for data fetching?**
> 5. **Why use updateDoc() instead of setDoc()?**
> 6. **What happens to deleted Firestore documents (can we undo)?**
> 7. **Why show loading states during async operations?**
> 8. **How do Firestore queries improve security and performance?**

If you can't answer these, review the earlier steps or ask AI to explain again.

## Commit Your Work

**IMPORTANT:** Only commit if all verification passes!

### Check Git Status

```bash
git status
```

You should see new/modified files like:
- `src/components/Todos/AddTodoForm.tsx` (new)
- `src/components/Todos/EditTodoForm.tsx` (new)
- `src/components/Todos/TodosList.tsx` (new)
- `src/pages/AddTodoPage.tsx` (new)
- `src/pages/EditTodoPage.tsx` (new)
- `src/pages/TodosPage.tsx` (new)
- `src/types/todo.ts` (new)
- `src/lib/firebase.ts` (modified)
- `src/App.tsx` (modified)
- `src/components/Layout/Navigation.tsx` (modified)

### Stage Changes

```bash
git add src/
```

### Commit

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

**Why this commit message?**
- First line summarizes the feature (< 50 chars)
- Blank line separates subject from body
- Bullet points detail all major changes
- Focuses on "what" was added, not implementation details

### Verify Commit

```bash
git log -1
```

Should show your commit with the message above.

## What You Accomplished

Congratulations! You now have:

✅ Firestore database integrated
✅ TypeScript data model defined
✅ Create operation (add new todos)
✅ Read operation (list todos with queries)
✅ Update operation (edit existing todos)
✅ Delete operation (remove todos with confirmation)
✅ Loading states for all async operations
✅ Empty state for first-time users
✅ User-specific data (privacy via userId filtering)
✅ All CRUD flows tested and verified
✅ All code committed to Git

## Skills You Learned

**Firestore:**
- Initializing Firestore in a React app
- Collections and documents structure
- CRUD operations: addDoc, getDocs, getDoc, updateDoc, deleteDoc
- Queries with where and orderBy
- Timestamps for creation dates
- Document references

**React Patterns:**
- Fetching data with useEffect
- Managing loading states
- Conditional rendering (loading → empty → list)
- Form handling with controlled components
- URL parameters with useParams
- State updates after async operations

**TypeScript:**
- Defining data models with interfaces
- Typing Firestore Timestamps
- Optional fields with `?`
- Typing component props
- Generic types for state

**UX:**
- Loading indicators
- Empty states with calls-to-action
- Confirmation dialogs for destructive actions
- Form validation and error messages
- Redirects after successful operations

## Next Slice

CRUD operations are complete! Users can now create, view, edit, and delete their own todos. Data persists in Firestore and is private to each user.

Next, we'll add **security rules** to ensure users can only access their own data, even if they try to bypass the UI:

[Continue to Slice 4: Security Rules →](../../slice-4-security-rules/)
