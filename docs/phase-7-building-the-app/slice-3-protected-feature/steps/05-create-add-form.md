# Step 5: Create Add Form

> **Time**: ~10 minutes | **Type**: Coding | **Concepts**: Create Operation, addDoc, Form Handling

## What We're Building

A form that lets users add new todo items to Firestore, with proper validation and redirect on success.

## Before You Code: Understanding addDoc

> **💡 Ask AI First:**
>
> ```
> How does addDoc() work in Firestore?
> What parameters does addDoc() take?
> Does addDoc() auto-generate document IDs or do I provide them?
> How do I add the current user's ID to each new document?
> What should I do after successfully creating a document (UX-wise)?
> Should I show a loading state while the document is being created?
> ```

**What you should learn:**
- `addDoc(collectionRef, data)` creates a new document
- Firestore auto-generates unique IDs
- Use `currentUser.uid` for the userId field
- Redirect to list page after success (good UX)
- Show loading state to prevent duplicate submissions

## Let's Build It

### Prompt: Create Add Todo Form Component

```
Create a form component for adding new todo items to Firestore.

Requirements:
1. File location: src/components/Todos/AddTodoForm.tsx
2. Form fields:
   - Title input (required)
   - Description textarea (optional)
3. On submit:
   - Validate title is not empty
   - Create new document in "todos" collection using addDoc()
   - Include fields: title, description (if provided), completed: false, userId: currentUser.uid, createdAt: Timestamp.now()
4. Use useAuth() hook to get currentUser
5. Use useNavigate() to redirect to /todos after success
6. Show loading state on submit button while creating
7. Show error message if creation fails
8. Clear form after successful submission

After creating the code, explain:
- How addDoc() creates the document
- Why we set completed: false initially
- How Timestamp.now() works
- What happens if the user isn't logged in
```

**What to expect:**
- New file: `src/components/Todos/AddTodoForm.tsx`
- Controlled inputs for title and description
- Form submission handler with validation
- `addDoc()` call with all required fields
- Loading state (button disabled during submit)
- Error handling with try/catch
- useNavigate for redirect after success

**Files you'll create:**
- `src/components/Todos/AddTodoForm.tsx`

### Prompt: Create Add Todo Page

```
Create a page that uses the AddTodoForm component.

File: src/pages/AddTodoPage.tsx

The page should:
- Import AddTodoForm
- Render it with a heading "Add New Task" or "Create Todo"
- Include basic layout/styling
- This page should be at route /todos/new

Show me the complete page code.
```

**What to expect:**
- New file: `src/pages/AddTodoPage.tsx`
- Simple layout with heading and form
- Import and use of AddTodoForm component

**Files you'll create:**
- `src/pages/AddTodoPage.tsx`

### Prompt: Add Route for Add Todo Page

```
Update App.tsx to add a route for the AddTodoPage.

The route should:
- Path: /todos/new
- Element: <AddTodoPage />
- Be protected (require authentication)
- Use the ProtectedRoute component we built in Slice 2

Show me the updated Routes section of App.tsx.
```

**What to expect:**
- Import AddTodoPage
- New Route with path="/todos/new"
- Wrapped in ProtectedRoute

**Files you'll modify:**
- `src/App.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand it:

> **💡 Ask AI to Explain:**
>
> ```
> In the AddTodoForm component:
> 1. What happens when the user types in the title field?
> 2. Walk me through the submit flow step by step.
> 3. Why do we check if currentUser exists before calling addDoc()?
> 4. What does addDoc() return? Do we need the returned value?
> 5. Why redirect to /todos instead of staying on the form?
> 6. What would happen if we didn't include userId in the document?
> ```

**Key concepts to understand:**
- Controlled inputs update state on every keystroke
- Validation runs before calling Firestore
- `currentUser.uid` links the todo to the logged-in user
- `addDoc()` returns a DocumentReference (we can ignore it or use it)
- Redirecting shows the user their new todo (good UX)
- Without userId, todos wouldn't be private to users

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Navigate to add form:**
   - Go to `http://localhost:5173/todos/new`
   - Should see "Add New Task" heading and form
   - Form should have title input and description textarea

3. **Test validation:**

   **Empty title:**
   - Leave title blank
   - Click submit
   - Should see error message "Please enter a title" or similar
   - Form should NOT submit

4. **Test successful creation:**

   - Title: `Buy groceries`
   - Description: `Milk, eggs, bread` (optional)
   - Click submit

   **What should happen:**
   - Button shows "Adding..." or "Creating..."
   - No errors appear
   - **Redirects to `/todos`** (we'll build this page next)
   - Check Firebase Console → Firestore → Data → todos collection
   - **Should see new document with:**
     - title: "Buy groceries"
     - description: "Milk, eggs, bread"
     - completed: false
     - userId: (your user ID)
     - createdAt: (timestamp)

5. **Test multiple todos:**
   - Go back to `/todos/new`
   - Add another todo: "Walk dog"
   - Submit
   - Check Firebase Console
   - Should see TWO documents now

6. **Verify Firebase Console:**
   - Open [Firebase Console](https://console.firebase.google.com)
   - Select your project → Firestore Database → Data
   - Click on `todos` collection
   - Should see your created documents
   - Each should have auto-generated ID
   - Verify all fields are present and correct

### Checklist:

- [ ] Form appears at `/todos/new`
- [ ] Title and description fields work (can type)
- [ ] Empty title shows validation error
- [ ] Form doesn't submit if validation fails
- [ ] Valid form creates document in Firestore
- [ ] Loading state shows during submission
- [ ] Redirects to `/todos` after success
- [ ] Document appears in Firebase Console
- [ ] Document has all required fields
- [ ] userId matches current user
- [ ] createdAt is a Firestore Timestamp

## Common Issues

### "Cannot read properties of null (currentUser)"

**Problem:** User not logged in or AuthContext not accessible.

**Fix:**
- Make sure you're logged in
- Verify ProtectedRoute is wrapping the page
- Check AuthProvider wraps all routes in App.tsx

### "Missing or insufficient permissions"

**Problem:** Firestore security rules blocking write.

**Fix:** In Firebase Console → Firestore → Rules, temporarily set:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;  // Allows authenticated users
    }
  }
}
```

Click "Publish". Try again.

### Form submits but nothing in Firestore

**Problem:** `addDoc()` not being awaited or error silently caught.

**Fix:**
```typescript
try {
  await addDoc(collection(db, 'todos'), {  // Must await!
    title,
    description,
    completed: false,
    userId: currentUser.uid,
    createdAt: Timestamp.now(),
  });
  navigate('/todos');
} catch (error) {
  console.error('Error adding todo:', error);  // See the error!
  setError(error.message);
}
```

### "Timestamp is not defined"

**Problem:** Missing import.

**Fix:**
```typescript
import { collection, addDoc, Timestamp } from 'firebase/firestore';
```

### "useNavigate() may be used only in context of Router"

**Problem:** Component not inside BrowserRouter.

**Fix:** Make sure App.tsx has:
```typescript
<BrowserRouter>
  {/* AddTodoPage must be inside Routes */}
</BrowserRouter>
```

### Redirects but page is blank

**Problem:** `/todos` route doesn't exist yet.

**Fix:** This is expected! We'll create the todos list page in the next step. For now, redirect to `/dashboard` or `/` instead:
```typescript
navigate('/dashboard');  // Temporary until we build /todos
```

## Code Example

Your `AddTodoForm.tsx` should look roughly like this:

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    // Submit
    setLoading(true);
    try {
      await addDoc(collection(db, 'todos'), {
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        userId: currentUser!.uid,
        createdAt: Timestamp.now(),
      });

      navigate('/todos');  // Redirect to list (we'll build this next)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
      </div>

      <div>
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details..."
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}
```

## What You Learned

At this point you should understand:
- ✅ How to use `addDoc()` to create Firestore documents
- ✅ How to include the current user's ID in documents
- ✅ How to use Firestore Timestamps
- ✅ How to validate form data before submission
- ✅ How to handle async operations with loading states
- ✅ How to redirect after successful creation
- ✅ Why every document needs a userId (privacy)

## Next Step

Create works! Now let's learn about Firestore queries so we can READ todos from the database:

[Step 6: Understanding Queries →](./06-understanding-queries)
