# Step 3: Add Loading States

> **Time**: ~8 minutes | **Type**: UX | **Concepts**: Loading state management, user feedback

## What We're Building

Adding loading states to all async operations in your app:
- Loading spinner while fetching todos list
- Loading button state during form submissions
- Disabled inputs during loading to prevent changes

## The Prompt for AI

> **💡 Ask AI to help you add loading states:**
>
> ```
> I need to add loading states to my todo app.
>
> Current operations that need loading states:
> 1. Fetching todos list (useEffect in TodosPage)
> 2. Creating new todo (form submission in CreateTodoPage)
> 3. Updating todo (form submission in EditTodoPage)
>
> For each operation:
> - Show Spinner component while loading
> - Disable form inputs/buttons during loading
> - Show "Loading..." or "Saving..." text
> - Prevent double-submissions
>
> Can you show me how to:
> 1. Add loading state with useState
> 2. Show spinner during list fetch
> 3. Show "Creating..." / "Saving..." on submit buttons
> 4. Disable buttons and inputs during loading
> ```

**Wait for AI's response, then apply the changes.**

## Part 1: Add Loading to Todos List

**Find your TodosPage component** (likely `src/pages/TodosPage.tsx`):

### Before (no loading state):
```tsx
export function TodosPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', currentUser.uid)
      );
      const snapshot = await getDocs(q);
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchTodos();
  }, []);

  return <div>{/* List todos */}</div>;
}
```

### After (with loading state):
```tsx
import { Spinner } from '../components/Spinner';

export function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);  // Start loading
      try {
        const q = query(
          collection(db, 'todos'),
          where('userId', '==', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        setTodos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);  // Stop loading
      }
    }
    fetchTodos();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spinner size={40} />
        <p>Loading todos...</p>
      </div>
    );
  }

  return <div>{/* List todos */}</div>;
}
```

**Key changes:**
- Added `loading` state
- Set `loading: true` before fetch
- Set `loading: false` in finally block
- Show spinner while loading
- Use try/catch for error handling

## Part 2: Add Loading to Create Form

**Find your CreateTodoPage component:**

### Before (no loading state):
```tsx
async function handleSubmit(e) {
  e.preventDefault();
  await addDoc(collection(db, 'todos'), {
    title,
    completed: false,
    userId: currentUser.uid,
    createdAt: Timestamp.now()
  });
  router.push('/todos');
}

return (
  <form onSubmit={handleSubmit}>
    <input value={title} onChange={e => setTitle(e.target.value)} />
    <button type="submit">Create Todo</button>
  </form>
);
```

### After (with loading state):
```tsx
import { Spinner } from '../components/Spinner';

const [loading, setLoading] = useState(false);  // Add loading state

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);  // Start loading
  try {
    await addDoc(collection(db, 'todos'), {
      title,
      completed: false,
      userId: currentUser.uid,
      createdAt: Timestamp.now()
    });
    router.push('/todos');
  } catch (error) {
    console.error('Failed to create todo:', error);
    // Error handling will be improved in later steps
  } finally {
    setLoading(false);  // Stop loading
  }
}

return (
  <form onSubmit={handleSubmit}>
    <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      disabled={loading}  // Disable during loading
    />
    <button type="submit" disabled={loading}>
      {loading ? (
        <>
          <Spinner /> Creating...
        </>
      ) : (
        'Create Todo'
      )}
    </button>
  </form>
);
```

**Key changes:**
- Added `loading` state
- Set `loading: true` before submit
- Disabled input and button during loading
- Show spinner + "Creating..." text on button
- Use try/catch/finally

## Part 3: Add Loading to Edit Form

**Same pattern for EditTodoPage:**

```tsx
import { Spinner } from '../components/Spinner';

const [loading, setLoading] = useState(false);

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  try {
    await updateDoc(doc(db, 'todos', todoId), {
      title,
      completed
    });
    router.push('/todos');
  } catch (error) {
    console.error('Failed to update todo:', error);
  } finally {
    setLoading(false);
  }
}

return (
  <form onSubmit={handleSubmit}>
    <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      disabled={loading}
    />
    <button type="submit" disabled={loading}>
      {loading ? (
        <>
          <Spinner /> Saving...
        </>
      ) : (
        'Save Changes'
      )}
    </button>
  </form>
);
```

## Part 4: Style Loading Buttons (Optional)

**Add CSS to align spinner and text:**

```css
/* Button with spinner */
button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**What this does:**
- `display: flex` aligns spinner and text horizontally
- `gap: 8px` adds space between spinner and text
- `button:disabled` shows button is not clickable

## Verification

**Test each loading state:**

### Test 1: List Loading
1. Go to `/todos`
2. Refresh page
3. **Expected:**
   - [ ] Spinner appears briefly
   - [ ] "Loading todos..." text shows
   - [ ] Then todos list appears
   - [ ] No flicker or errors

### Test 2: Create Loading
1. Go to `/todos/new`
2. Fill form
3. Click "Create Todo"
4. **Expected:**
   - [ ] Button shows spinner + "Creating..."
   - [ ] Button is disabled (can't click again)
   - [ ] Input is disabled (can't type)
   - [ ] After success: redirects to list
   - [ ] New todo appears

### Test 3: Update Loading
1. Go to `/todos/edit/:id`
2. Change title
3. Click "Save Changes"
4. **Expected:**
   - [ ] Button shows spinner + "Saving..."
   - [ ] Button and input disabled
   - [ ] After success: redirects to list
   - [ ] Changes saved

### Test 4: Double-Click Prevention
1. Fill create form
2. Click submit TWICE quickly
3. **Expected:**
   - [ ] Second click does nothing (button disabled)
   - [ ] Only one todo created (no duplicate)

## Common Issues

### Spinner Not Showing

**Problem:** Loading state not updating or component not imported.

**Fix:**
- Check `import { Spinner } from '../components/Spinner'`
- Verify `setLoading(true)` is called before async operation
- Check browser console for import errors

### Button Not Disabled

**Problem:** `disabled` prop not applied.

**Fix:**
```tsx
<button type="submit" disabled={loading}>
  {/* Make sure disabled={loading} is here */}
</button>
```

### Loading Never Stops

**Problem:** `setLoading(false)` not in finally block.

**Fix:**
```tsx
try {
  // async operation
} catch (error) {
  // handle error
} finally {
  setLoading(false);  // MUST be in finally
}
```

**Why finally?** Ensures loading stops even if there's an error.

### Input Stays Disabled

**Problem:** Loading state stuck at `true`.

**Fix:** Check that finally block runs and sets `loading: false`.

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **Why set loading: true before async operations?** (To show spinner immediately)
> 2. **Why use try/catch/finally?** (Handle errors, ensure loading stops)
> 3. **Why disable button during loading?** (Prevent double-submissions)
> 4. **Why disable inputs during loading?** (Prevent changes mid-submission)
> 5. **What happens if I don't use finally block?** (Loading might never stop if error occurs)

## What You Learned

At this point you should have:
- ✅ Loading spinner while fetching todos list
- ✅ "Creating..." state on create form
- ✅ "Saving..." state on edit form
- ✅ Disabled buttons during loading (prevents double-click)
- ✅ Disabled inputs during loading
- ✅ Better error handling with try/catch/finally
- ✅ Understanding of loading state patterns

## Next Step

Now that we have loading states, let's understand user feedback and toast notifications:

[Step 4: Understanding Feedback →](./04-understanding-feedback)
