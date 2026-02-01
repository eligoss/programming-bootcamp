# Step 9: Edit Item

> **Time**: ~10 minutes | **Type**: Coding | **Concepts**: Update Operation, updateDoc, Document References, URL Parameters

## What We're Building

An edit page that fetches a specific todo by ID, pre-fills a form with its data, and updates the document when submitted.

## Before You Code: Understanding Updates

> **💡 Ask AI First:**
>
> ```
> How do I update an existing Firestore document?
> What's the difference between updateDoc() and setDoc()?
> How do I get a reference to a specific document by ID?
> How do I pass the todo ID through the URL (like /todos/edit/abc123)?
> How do I access URL parameters in React Router?
> Should I fetch the document data before showing the edit form?
> What happens if I try to update a document that doesn't exist?
> ```

**What you should learn:**
- `updateDoc()` updates specific fields (keeps others unchanged)
- `setDoc()` replaces entire document (we don't want this)
- `doc(db, 'todos', id)` creates a document reference
- URL params: `/todos/edit/:id` and `useParams()`
- Yes, fetch the document to pre-fill the form
- updateDoc on non-existent doc throws error

## Let's Build It

### Prompt: Create Edit Form Component

```
Create an edit form component for updating existing todos.

Requirements:
1. File location: src/components/Todos/EditTodoForm.tsx
2. Accept a "todoId" prop (string)
3. On component mount:
   - Fetch the todo document by ID using getDoc()
   - Pre-fill form fields with fetched data
   - Show loading state while fetching
4. Form fields (pre-filled):
   - Title input
   - Description textarea
   - Completed checkbox
5. On submit:
   - Validate title not empty
   - Update document using updateDoc()
   - Only update title, description, and completed fields (don't change userId or createdAt)
6. Use useNavigate() to redirect to /todos after success
7. Show loading state on submit button
8. Handle errors (document not found, permission denied, etc.)

After creating the code, explain:
- How getDoc() differs from getDocs()
- How to pre-fill form inputs with fetched data
- Why we don't update userId or createdAt
- What doc() function returns
```

**What to expect:**
- New file: `src/components/Todos/EditTodoForm.tsx`
- Two useEffects: one for fetching, one for any other side effect
- getDoc() to fetch single document
- Pre-filled controlled inputs
- updateDoc() on submit
- Loading states for both fetch and submit

**Files you'll create:**
- `src/components/Todos/EditTodoForm.tsx`

### Prompt: Create Edit Page with URL Parameter

```
Create a page that uses the EditTodoForm component.

File: src/pages/EditTodoPage.tsx

Requirements:
- Use useParams() from react-router-dom to get the todo ID from the URL
- Pass the ID to EditTodoForm as a prop
- Include heading "Edit Task"
- The route will be /todos/edit/:id (we'll add the route next)

After showing the code, explain:
- How useParams() extracts the ID from /todos/edit/abc123
- What the ":id" syntax means in routes
```

**What to expect:**
- New file: `src/pages/EditTodoPage.tsx`
- Import and use of useParams
- Pass `id` param to EditTodoForm
- Simple layout

**Files you'll create:**
- `src/pages/EditTodoPage.tsx`

### Prompt: Add Route and Edit Links

```
Make two updates:

1. Add route in App.tsx:
   - Path: /todos/edit/:id
   - Element: <EditTodoPage />
   - Protected (use ProtectedRoute)

2. Update TodosList component:
   - Add an "Edit" link next to each todo
   - Link to: /todos/edit/{todo.id}
   - Use React Router's Link component

Show me both updated files.
```

**What to expect:**
- New route in App.tsx with `:id` parameter
- Edit links in TodosList.tsx using `<Link to={`/todos/edit/${todo.id}`}>`

**Files you'll modify:**
- `src/App.tsx`
- `src/components/Todos/TodosList.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand it:

> **💡 Ask AI to Explain:**
>
> ```
> In the EditTodoForm:
> 1. Walk me through the flow: mount → fetch → display → edit → update
> 2. Why do we need two loading states (fetching vs submitting)?
> 3. How does doc(db, 'todos', todoId) create a document reference?
> 4. What's the difference between updateDoc() and just calling addDoc()?
> 5. Why don't we update userId or createdAt?
> 6. What happens if the document with the given ID doesn't exist?
>
> In the EditTodoPage:
> 1. How does useParams() get the ID from /todos/edit/abc123?
> 2. What if the ID in the URL is invalid or empty?
> ```

**Key concepts to understand:**
- Flow: mount → useEffect → getDoc → set form state → user edits → submit → updateDoc
- Two loading states: `fetchLoading` (initial load), `submitLoading` (save)
- `doc()` returns a DocumentReference (pointer to a document)
- `updateDoc()` modifies existing doc; `addDoc()` creates new one
- userId and createdAt shouldn't change (they're set on creation)
- Non-existent document throws error (handle in catch block)
- `useParams()` extracts `:id` from URL path

## Verify It Works

### Manual Testing:

1. **Make sure you have a todo:**
   - Go to `/todos`
   - If empty, create one first

2. **Test edit link:**
   - On `/todos` page, click "Edit" next to a todo
   - Should navigate to `/todos/edit/[some-id]`
   - URL should include the document ID

3. **Verify form pre-fills:**
   - Edit page should show loading briefly
   - Form should appear with:
     - Title field pre-filled with todo's title
     - Description pre-filled (if todo had one)
     - Completed checkbox checked/unchecked based on todo status
   - All fields should be editable

4. **Test update:**
   - Change the title to "Updated task"
   - Change the description
   - Toggle the completed checkbox
   - Click "Save" or "Update"

   **What should happen:**
   - Button shows "Saving..." or "Updating..."
   - No errors appear
   - Redirects to `/todos`
   - Updated todo appears in the list with new values

5. **Verify in Firebase Console:**
   - Firebase Console → Firestore → todos
   - Find the updated document
   - Check that title, description, and completed changed
   - Verify userId and createdAt did NOT change

6. **Test validation:**
   - Edit a todo
   - Clear the title field (leave it empty)
   - Click "Save"
   - Should see error "Title is required" or similar
   - Should NOT update the document

7. **Test with invalid ID:**
   - Manually navigate to `/todos/edit/invalid-id-12345`
   - Should show error message or redirect
   - Should NOT crash the app

### Checklist:

- [ ] Edit link appears next to each todo
- [ ] Clicking edit navigates to correct URL
- [ ] Form shows loading while fetching
- [ ] Form pre-fills with todo data
- [ ] All fields are editable
- [ ] Empty title shows validation error
- [ ] Valid update succeeds
- [ ] Updates appear in Firestore
- [ ] userId and createdAt don't change
- [ ] Redirects to /todos after update
- [ ] Invalid ID handled gracefully

## Common Issues

### Form fields are empty (not pre-filling)

**Problem:** State not updated after fetch completes.

**Fix:** Make sure you set state after getDoc():
```typescript
useEffect(() => {
  const fetchTodo = async () => {
    const docRef = doc(db, 'todos', todoId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTitle(data.title);        // Update state!
      setDescription(data.description || '');
      setCompleted(data.completed);
    }
  };
  fetchTodo();
}, [todoId]);
```

### "Document not found" error

**Problem:** Invalid ID or document was deleted.

**Fix:** Check if document exists before accessing data:
```typescript
const docSnap = await getDoc(docRef);
if (!docSnap.exists()) {
  setError('Todo not found');
  return;
}
const data = docSnap.data();
```

### Updates don't save

**Problem:** Not awaiting updateDoc() or wrong document reference.

**Fix:**
```typescript
const todoRef = doc(db, 'todos', todoId);  // Correct reference
await updateDoc(todoRef, {                 // Must await!
  title,
  description,
  completed
});
```

### TypeScript error: "Property 'id' does not exist on type 'Readonly<{}>'"

**Problem:** Missing route param type.

**Fix:**
```typescript
import { useParams } from 'react-router-dom';

const { id } = useParams<{ id: string }>();  // Type the param
```

### Edit link doesn't navigate

**Problem:** Using `<a>` tag instead of `<Link>`.

**Fix:**
```typescript
import { Link } from 'react-router-dom';

// Right
<Link to={`/todos/edit/${todo.id}`}>Edit</Link>

// Wrong
<a href={`/todos/edit/${todo.id}`}>Edit</a>
```

### userId or createdAt gets overwritten

**Problem:** Updating entire document instead of specific fields.

**Fix:** Only update fields you want to change:
```typescript
// Right: only updates these fields
await updateDoc(todoRef, {
  title,
  description,
  completed
});

// Wrong: replaces entire document
await setDoc(todoRef, {
  title,
  description,
  completed
  // userId and createdAt are now gone!
});
```

### Form submits but list doesn't update

**Problem:** Not refetching after redirect.

**Fix:** TodosList should refetch when component mounts. If not working, you can force refresh by passing a key or using state management (advanced).

Temporary fix: Hard refresh after edit (browser refresh button).

## Code Example

Your `EditTodoForm.tsx` should look roughly like this:

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface EditTodoFormProps {
  todoId: string;
}

export default function EditTodoForm({ todoId }: EditTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch todo data on mount
  useEffect(() => {
    const fetchTodo = async () => {
      setFetchLoading(true);
      try {
        const docRef = doc(db, 'todos', todoId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('Todo not found');
          return;
        }

        const data = docSnap.data();
        setTitle(data.title);
        setDescription(data.description || '');
        setCompleted(data.completed);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSubmitLoading(true);
    try {
      const todoRef = doc(db, 'todos', todoId);
      await updateDoc(todoRef, {
        title: title.trim(),
        description: description.trim() || undefined,
        completed
      });

      navigate('/todos');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) {
    return <p>Loading todo...</p>;
  }

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
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>

      <button type="submit" disabled={submitLoading}>
        {submitLoading ? 'Saving...' : 'Update Todo'}
      </button>
    </form>
  );
}
```

## What You Learned

At this point you should understand:
- ✅ How to fetch a single document with getDoc()
- ✅ How to update specific fields with updateDoc()
- ✅ How to use URL parameters with React Router
- ✅ How to pre-fill form inputs with fetched data
- ✅ Why we have separate loading states for fetch and submit
- ✅ The difference between updateDoc and setDoc
- ✅ Why userId and createdAt shouldn't be updated

## Next Step

Update works! Now let's build the DELETE operation — removing todos with confirmation:

[Step 10: Delete Item →](./10-delete-item)
