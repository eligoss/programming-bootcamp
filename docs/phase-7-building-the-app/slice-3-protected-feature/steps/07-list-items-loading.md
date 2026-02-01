# Step 7: List Items with Loading

> **Time**: ~12 minutes | **Type**: Coding | **Concepts**: Read Operation, Queries, Loading States, useEffect

## What We're Building

A page that fetches todos from Firestore using a query, displays them in a list, and shows a loading state while fetching.

## Before You Code: Understanding useEffect for Data Fetching

> **💡 Ask AI First:**
>
> ```
> Why do we use useEffect to fetch data in React?
> What happens if I fetch data directly in the component body (not in useEffect)?
> What is the dependency array in useEffect and why does it matter?
> How do I show a loading state while data is being fetched?
> What should I do with the QuerySnapshot returned by getDocs()?
> How do I convert Firestore documents to JavaScript objects?
> ```

**What you should learn:**
- useEffect runs after component mounts (perfect for fetching)
- Fetching in component body causes infinite loops
- Empty dependency array `[]` means "run once on mount"
- Set loading state before fetch, clear after
- QuerySnapshot has a `docs` array
- Use `doc.id` and `doc.data()` to get document data

## Let's Build It

### Prompt: Create Todos List Component

```
Create a component that fetches and displays todos from Firestore.

Requirements:
1. File location: src/components/Todos/TodosList.tsx
2. Fetch todos on component mount using useEffect
3. Query Firestore:
   - Collection: "todos"
   - Filter: where('userId', '==', currentUser.uid)
   - Sort: orderBy('createdAt', 'desc')
4. Show loading state while fetching:
   - Set loading: true before fetch
   - Set loading: false after fetch completes
   - Display "Loading..." text while loading
5. Store fetched todos in state
6. Convert Firestore documents to Todo objects:
   - Include document ID as "id" field
   - Spread document data
7. Display todos in a list:
   - Show title
   - Show description (if exists)
   - Show completed status (checkbox)
   - Show creation date formatted nicely
8. Handle errors gracefully

After creating the code, explain:
- Why we use useEffect with empty dependency array
- How the query filters to only the current user's todos
- What snapshot.docs.map() does
- How to convert Firestore Timestamp to readable date
```

**What to expect:**
- New file: `src/components/Todos/TodosList.tsx`
- useState for todos array and loading boolean
- useEffect with data fetching logic
- Firestore query with where and orderBy
- Loading state UI
- List rendering with map
- Error handling

**Files you'll create:**
- `src/components/Todos/TodosList.tsx`

### Prompt: Create Todos Page

```
Create a page that displays the TodosList component.

File: src/pages/TodosPage.tsx

The page should:
- Import TodosList
- Render it with a heading "My Tasks" or "Todos"
- Include a link/button to add new todo (goes to /todos/new)
- Basic layout/styling

Show me the complete page code.
```

**What to expect:**
- New file: `src/pages/TodosPage.tsx`
- Heading and TodosList component
- Link to /todos/new
- Simple layout

**Files you'll create:**
- `src/pages/TodosPage.tsx`

### Prompt: Add Route for Todos Page

```
Update App.tsx to add a route for TodosPage.

The route should:
- Path: /todos
- Element: <TodosPage />
- Be protected (require authentication)
- Use ProtectedRoute component

Also update Navigation to include a link to /todos (when logged in).

Show me the updated Routes and Navigation code.
```

**What to expect:**
- Import TodosPage in App.tsx
- New Route for /todos with ProtectedRoute
- Updated Navigation.tsx with link to /todos

**Files you'll modify:**
- `src/App.tsx`
- `src/components/Layout/Navigation.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand it:

> **💡 Ask AI to Explain:**
>
> ```
> In the TodosList component:
> 1. Why is the useEffect dependency array empty []?
> 2. What would happen if I removed the dependency array entirely?
> 3. Walk me through the data fetching flow step by step.
> 4. What does snapshot.docs.map() do exactly?
> 5. How do I access the document ID vs the document data?
> 6. What does toDate() do on a Firestore Timestamp?
> 7. Why do we need both loading state and error handling?
> ```

**Key concepts to understand:**
- `useEffect(() => {...}, [])` runs once on mount
- Without `[]`, it runs on every render (infinite loop!)
- `snapshot.docs` is an array of DocumentSnapshot objects
- `doc.id` is the document ID, `doc.data()` is the fields
- `timestamp.toDate()` converts to JavaScript Date
- Loading prevents showing stale data; errors handle failures

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Make sure you have todos:**
   - If you created todos in Step 5, you should have some
   - If not, go to `/todos/new` and create 2-3 todos first

3. **Navigate to todos list:**
   - Go to `http://localhost:5173/todos`
   - OR click "Todos" link in navigation

4. **Verify loading state:**
   - When page loads, you should briefly see "Loading..." or spinner
   - (Might be too fast to notice if Firestore is quick)
   - Then the list appears

5. **Verify todos display:**
   - [ ] All your todos are shown
   - [ ] Newest todo appears first (sorted by creation date)
   - [ ] Each todo shows title
   - [ ] Each todo shows description (if you added one)
   - [ ] Each todo shows completed checkbox
   - [ ] Creation date is formatted nicely

6. **Verify filtering:**
   - Log in as a different user (create new account if needed)
   - Go to `/todos`
   - Should see EMPTY list (different user's view)
   - Create a todo as this user
   - Should see ONLY this user's todo (not the other user's)

7. **Check browser console:**
   - Open DevTools (F12) → Console
   - Should see no errors
   - No "Missing permissions" errors
   - No infinite loop (loading message doesn't repeat)

8. **Verify Firestore query:**
   - In browser DevTools → Network tab
   - Refresh `/todos` page
   - Look for Firestore API call
   - Should see query with userId filter

### Checklist:

- [ ] `/todos` page loads without errors
- [ ] Brief loading state appears
- [ ] Todos list displays after loading
- [ ] Todos are sorted newest first
- [ ] Each todo shows all fields correctly
- [ ] Only current user's todos appear
- [ ] Different users see different todos
- [ ] Link to "Add New" works
- [ ] No console errors
- [ ] No infinite loading

## Common Issues

### Todos don't appear (empty list)

**Problem 1:** No todos in Firestore yet.

**Fix:** Go to `/todos/new` and create some todos first.

**Problem 2:** Query filtering out all todos.

**Fix:** Check userId in Firebase Console:
1. Go to Firestore → Data → todos
2. Click on a document
3. Check the `userId` field value
4. Compare to `currentUser.uid` (log it: `console.log(currentUser.uid)`)
5. If they don't match, the query is working correctly (filtering to wrong user)

**Problem 3:** Security rules blocking read.

**Fix:** Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Loading state never disappears

**Problem:** Fetch is failing silently or never completing.

**Fix:** Add better error logging:
```typescript
useEffect(() => {
  const fetchTodos = async () => {
    setLoading(true);
    try {
      console.log('Fetching todos for user:', currentUser.uid);
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      console.log('Fetched', snapshot.docs.length, 'todos');
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);  // See the error!
    } finally {
      setLoading(false);  // Always clear loading
    }
  };

  fetchTodos();
}, [currentUser]);
```

### Infinite loop (loading repeats forever)

**Problem:** Missing or wrong dependency array.

**Fix:**
```typescript
// Wrong: no dependency array (runs every render)
useEffect(() => {
  fetchTodos();
});

// Wrong: todos in array (changes every fetch, triggers re-fetch)
useEffect(() => {
  fetchTodos();
}, [todos]);

// Right: empty array (run once on mount)
useEffect(() => {
  fetchTodos();
}, []);

// Also right: depend on currentUser (if it might change)
useEffect(() => {
  fetchTodos();
}, [currentUser]);
```

### "Timestamp.toDate is not a function"

**Problem:** createdAt is not a Firestore Timestamp (might be plain object after Firestore fetch).

**Fix:** Convert to Timestamp when displaying:
```typescript
// In your component
import { Timestamp } from 'firebase/firestore';

// When rendering
{todos.map(todo => (
  <li key={todo.id}>
    {todo.title}
    <span>
      {todo.createdAt instanceof Timestamp
        ? todo.createdAt.toDate().toLocaleDateString()
        : 'Unknown date'}
    </span>
  </li>
))}
```

### TypeScript error: "Property 'title' does not exist on type 'DocumentData'"

**Problem:** Missing type annotation.

**Fix:**
```typescript
import { Todo } from '../../types/todo';

const [todos, setTodos] = useState<Todo[]>([]);

// When mapping
const data: Todo[] = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
} as Todo));
```

### Todos appear but in wrong order

**Problem:** Missing orderBy or wrong field.

**Fix:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid),
  orderBy('createdAt', 'desc')  // Make sure this is here
);
```

If error "Requires an index", see Firebase Console error message link to create the index automatically.

## Code Example

Your `TodosList.tsx` should look roughly like this:

```typescript
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Todo } from '../../types/todo';

export default function TodosList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'todos'),
          where('userId', '==', currentUser!.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data: Todo[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Todo));
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [currentUser]);

  if (loading) {
    return <p>Loading your tasks...</p>;
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} readOnly />
          <div>
            <h3>{todo.title}</h3>
            {todo.description && <p>{todo.description}</p>}
            <small>{todo.createdAt.toDate().toLocaleDateString()}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

## What You Learned

At this point you should understand:
- ✅ How to use useEffect to fetch data on component mount
- ✅ How to build Firestore queries with where and orderBy
- ✅ How to convert QuerySnapshot to an array of objects
- ✅ How to show loading states during async operations
- ✅ Why dependency arrays matter in useEffect
- ✅ How to access document IDs and data
- ✅ How to filter data by userId for privacy

## Next Step

Read works! Now let's add an empty state for when there are no todos:

[Step 8: Add Empty State →](./08-add-empty-state)
