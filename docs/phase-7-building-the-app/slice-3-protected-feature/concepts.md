# Core Concepts: Protected Feature (CRUD)

> Understanding databases, Firestore, and CRUD operations

Before we build our protected feature, let's understand the key concepts behind databases and data management. This isn't just about storing information — it's about building a system where each user has their own private data that persists over time.

## What is a Database?

A **database** is a structured collection of data that's stored on a server and persists even when your app closes. Think of it as a filing cabinet for your application.

Without a database, all your app's data lives in JavaScript variables. When you refresh the page, everything vanishes. With a database, data lives on a server somewhere, and your app fetches it when needed.

**Why apps need databases:**
- **Persistence** — Data survives page refreshes and browser closes
- **Sharing** — Multiple users can access and modify the same data
- **Structure** — Data is organized logically, not scattered
- **Security** — You control who can read/write what data

Imagine a to-do list app without a database: you add tasks, refresh the page, and everything's gone. With a database, those tasks stay saved until you delete them.

## What is Firestore?

**Firestore** (Cloud Firestore) is Google's **NoSQL database** for web and mobile apps. It's part of Firebase and works seamlessly with Firebase Authentication.

### NoSQL vs SQL

There are two main types of databases:

**SQL databases** (like MySQL, PostgreSQL) organize data in tables with rows and columns:

```
users table:
id | name       | email
---+------------+------------------
1  | Alice      | alice@example.com
2  | Bob        | bob@example.com

todos table:
id | userId | title           | completed
---+--------+-----------------+----------
1  | 1      | Buy groceries   | false
2  | 1      | Walk dog        | true
3  | 2      | Study React     | false
```

**NoSQL databases** (like Firestore, MongoDB) organize data as documents and collections:

```
users/
  alice123/
    name: "Alice"
    email: "alice@example.com"
    todos/
      todo1/
        title: "Buy groceries"
        completed: false
      todo2/
        title: "Walk dog"
        completed: true
  bob456/
    name: "Bob"
    email: "bob@example.com"
    todos/
      todo1/
        title: "Study React"
        completed: false
```

**Key differences:**

| SQL | NoSQL (Firestore) |
|-----|-------------------|
| Tables with rows | Collections with documents |
| Fixed schema | Flexible schema |
| Relationships via foreign keys | Nested documents or references |
| Joins for complex queries | Denormalize or use subcollections |
| Great for complex relationships | Great for hierarchical data |

We use Firestore because:
- ✅ Integrates perfectly with Firebase Auth
- ✅ Real-time updates out of the box
- ✅ Scales automatically
- ✅ Simple JavaScript API
- ✅ Built-in security rules
- ✅ No server setup required

### Firestore Structure: Collections and Documents

Firestore organizes data in **collections** and **documents**:

**Collection** — A group of documents. Like a folder holding files. Collections don't store data themselves; they just contain documents.

**Document** — A single record. Like a JSON object with fields. Documents store actual data.

**Subcollection** — A collection inside a document. Used for nested data.

Here's the pattern:

```
Collection → Document → Fields
Collection → Document → Subcollection → Document → Fields
```

**Example: Todo app structure**

```
todos (collection)
├── todo1 (document)
│   ├── title: "Buy groceries"
│   ├── completed: false
│   ├── userId: "abc123"
│   └── createdAt: Timestamp
├── todo2 (document)
│   ├── title: "Walk dog"
│   ├── completed: true
│   ├── userId: "abc123"
│   └── createdAt: Timestamp
└── todo3 (document)
    ├── title: "Study React"
    ├── completed: false
    ├── userId: "def456"
    └── createdAt: Timestamp
```

Each document has:
- **A unique ID** (auto-generated or custom)
- **Fields** (key-value pairs, like `title: "Buy groceries"`)
- **Optionally, subcollections** (nested data)

### Visual Diagram: Firestore Data Structure

```
┌─────────────────────────────────────────────────────┐
│ Firestore Database                                  │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ todos (collection)                            │ │
│  │                                               │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │ todoABC123 (document)                   │ │ │
│  │  │ ┌─────────────────────────────────────┐ │ │ │
│  │  │ │ title: "Buy groceries"              │ │ │ │
│  │  │ │ completed: false                    │ │ │ │
│  │  │ │ userId: "user1"                     │ │ │ │
│  │  │ │ createdAt: Timestamp                │ │ │ │
│  │  │ └─────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │                                               │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │ todoXYZ789 (document)                   │ │ │
│  │  │ ┌─────────────────────────────────────┐ │ │ │
│  │  │ │ title: "Walk dog"                   │ │ │ │
│  │  │ │ completed: true                     │ │ │ │
│  │  │ │ userId: "user1"                     │ │ │ │
│  │  │ │ createdAt: Timestamp                │ │ │ │
│  │  │ └─────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## What is CRUD?

**CRUD** stands for the four basic operations you can perform on data:

- **C**reate — Add new data
- **R**ead — Retrieve existing data
- **U**pdate — Modify existing data
- **D**elete — Remove data

Every database-driven app is built on these operations. A to-do list app:
- **Create** — Add a new task
- **Read** — Show all tasks
- **Update** — Mark a task as complete
- **Delete** — Remove a task

In Firestore, these operations map to specific functions:

| Operation | Firestore Function | What It Does |
|-----------|-------------------|--------------|
| Create | `addDoc()` | Adds a new document to a collection |
| Read | `getDocs()`, `getDoc()` | Fetches documents from a collection |
| Update | `updateDoc()` | Modifies fields in an existing document |
| Delete | `deleteDoc()` | Removes a document from a collection |

### CRUD Flow Diagram

```
User Action             Firestore Operation        Database
     │                         │                        │
     ├─ Click "Add Task" ──────┼─► addDoc() ───────────►│
     │                         │                        │
     │                         │                   [New document
     │                         │                    created]
     │                         │                        │
     │◄──────────────────── Success ◄──────────────────┤
     │                         │                        │
     │                         │                        │
     ├─ View tasks ────────────┼─► getDocs() ──────────►│
     │                         │                        │
     │                         │                   [Fetch all
     │                         │                    documents]
     │                         │                        │
     │◄──────────────────── [Data] ◄───────────────────┤
     │                         │                        │
     │                         │                        │
     ├─ Mark complete ─────────┼─► updateDoc() ────────►│
     │                         │                        │
     │                         │                   [Update
     │                         │                    completed: true]
     │                         │                        │
     │◄──────────────────── Success ◄──────────────────┤
     │                         │                        │
     │                         │                        │
     └─ Delete task ───────────┼─► deleteDoc() ────────►│
                               │                        │
                               │                   [Document
                               │                    removed]
                               │                        │
                          Success ◄───────────────────┘
```

## What is Data Modeling?

**Data modeling** is deciding how to structure your data. For our to-do app, we need to answer:

- What fields does each todo have?
- What data types should we use?
- How do we connect todos to users?
- What information is required vs optional?

**Example data model for a todo:**

```typescript
interface Todo {
  id: string;              // Unique identifier (auto-generated)
  title: string;           // What the task is
  completed: boolean;      // Is it done?
  userId: string;          // Who owns this task?
  createdAt: Timestamp;    // When was it created?
  description?: string;    // Optional details
}
```

**Why this structure?**

- `id` — Every document needs a unique ID
- `title` — The core data (what the task is)
- `completed` — The status we need to track
- `userId` — Links the task to its owner (crucial for privacy!)
- `createdAt` — Helpful for sorting and displaying "when"
- `description` — Optional field (marked with `?` in TypeScript)

**Good data modeling:**
- ✅ Include all necessary fields
- ✅ Use appropriate data types (string, boolean, number, Timestamp)
- ✅ Link data to users for privacy
- ✅ Add timestamps for sorting/auditing
- ✅ Keep it simple (don't over-engineer)

**Bad data modeling:**
- ❌ Missing critical fields (like `userId`)
- ❌ Wrong data types (storing numbers as strings)
- ❌ Too much nesting (hard to query)
- ❌ Storing redundant data everywhere

## What are Firestore Queries?

**Queries** let you filter and sort data instead of fetching everything.

Without queries, you'd fetch all todos from all users, then filter in JavaScript:

```typescript
// Bad: Fetch everything, filter in JS
const allTodos = await getDocs(collection(db, 'todos'));
const myTodos = allTodos.filter(todo => todo.userId === currentUser.uid);
```

With queries, Firestore filters server-side and only sends what you need:

```typescript
// Good: Fetch only your todos
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid)
);
const myTodos = await getDocs(q);
```

**Common query operations:**

- `where()` — Filter documents by field value
- `orderBy()` — Sort results by a field
- `limit()` — Limit number of results

**Examples:**

```typescript
// Get only incomplete tasks
where('completed', '==', false)

// Get only my tasks
where('userId', '==', currentUser.uid)

// Sort by creation date (newest first)
orderBy('createdAt', 'desc')

// Combine: My incomplete tasks, sorted by date
query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid),
  where('completed', '==', false),
  orderBy('createdAt', 'desc')
)
```

**Why queries matter:**
- **Performance** — Don't fetch data you don't need
- **Security** — Combined with rules, users can't see others' data
- **UX** — Fast, filtered results

## What are Timestamps?

**Timestamps** are Firestore's way of storing dates and times. They're critical for sorting and showing "when" something happened.

```typescript
import { Timestamp } from 'firebase/firestore';

// Create a timestamp (current time)
const now = Timestamp.now();

// Use in a document
await addDoc(collection(db, 'todos'), {
  title: 'Buy groceries',
  createdAt: Timestamp.now(),
});

// Convert to JavaScript Date for display
const date = timestamp.toDate();
console.log(date.toLocaleDateString()); // "1/15/2024"
```

**Why use Firestore Timestamps instead of JavaScript Dates?**
- ✅ Server-side timestamps (accurate across timezones)
- ✅ Consistent format (no timezone issues)
- ✅ Sortable in queries
- ✅ Firestore understands them natively

**Common uses:**
- `createdAt` — When the item was created
- `updatedAt` — When it was last modified
- `completedAt` — When a task was finished

## What is Real-Time Data?

**Real-time data** means your UI updates automatically when the database changes, without refreshing the page.

Firestore supports real-time updates with `onSnapshot()`:

```typescript
// Regular read: fetch once
const todos = await getDocs(collection(db, 'todos'));

// Real-time: listen for changes
onSnapshot(collection(db, 'todos'), (snapshot) => {
  const todos = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setTodos(todos); // Update state automatically
});
```

**How it works:**

```
Your App              Firestore
   │                     │
   ├─► onSnapshot() ─────┤
   │                     │
   │   [Listening...]    │
   │                     │
   │                     │ [Another user adds a todo]
   │                     │
   │◄── Update ──────────┤
   │                     │
   │ [UI re-renders]     │
```

**Benefits:**
- ✅ No manual refreshing
- ✅ Multi-user apps stay in sync
- ✅ Feels instant and responsive

**Downsides:**
- ❌ More complex to manage
- ❌ More Firestore reads (can cost more)
- ❌ Need to handle cleanup

**For this bootcamp, we'll use regular reads** (fetch on page load) to keep it simple. Real-time is a powerful feature you can add later.

## What are Loading States?

**Loading states** tell users "the app is working, please wait." Without them, users wonder if their click worked.

When fetching data from Firestore, there's a delay (network request). During that time, show a loading indicator:

```typescript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'todos'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

**Loading states prevent:**
- ❌ Showing stale data
- ❌ Rendering broken UI (like empty lists)
- ❌ Users clicking buttons multiple times

**Best practices:**
- Show loading indicator during async operations
- Disable submit buttons while processing
- Clear loading state after success OR error
- Show meaningful messages ("Loading tasks..." not "Loading...")

## What are Empty States?

**Empty states** tell users what to do when there's no data.

Without an empty state:
```
┌──────────────────────┐
│ My Tasks             │
│                      │
│                      │  ← User sees nothing, confused
│                      │
└──────────────────────┘
```

With an empty state:
```
┌──────────────────────┐
│ My Tasks             │
│                      │
│  No tasks yet!       │
│  [Add your first]    │  ← Clear message + action
│                      │
└──────────────────────┘
```

**Example implementation:**

```typescript
function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div>
        <p>No tasks yet!</p>
        <Link to="/todos/new">Add your first task</Link>
      </div>
    );
  }

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

**Why empty states matter:**
- ✅ Guide users on what to do next
- ✅ Confirm the app is working (not broken)
- ✅ Reduce confusion
- ✅ Improve first-time user experience

## How It All Fits Together: Complete CRUD Example

Let's walk through a complete example: building a to-do list with CRUD operations.

### 1. Data Model (TypeScript Interface)

```typescript
// src/types/todo.ts
import { Timestamp } from 'firebase/firestore';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Timestamp;
}
```

### 2. Create (Add New Todo)

```typescript
// src/components/AddTodoForm.tsx
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

function AddTodoForm() {
  const [title, setTitle] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'todos'), {
      title,
      completed: false,
      userId: currentUser.uid,
      createdAt: Timestamp.now(),
    });

    setTitle(''); // Clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
```

### 3. Read (Fetch Todos)

```typescript
// src/pages/TodosPage.tsx
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);

      // Query: only my todos, sorted by creation date
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, [currentUser]);

  if (loading) return <p>Loading tasks...</p>;

  if (todos.length === 0) {
    return (
      <div>
        <p>No tasks yet!</p>
        <Link to="/todos/new">Add your first task</Link>
      </div>
    );
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### 4. Update (Mark as Complete)

```typescript
// src/components/TodoItem.tsx
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

function TodoItem({ todo }) {
  const toggleComplete = async () => {
    const todoRef = doc(db, 'todos', todo.id);
    await updateDoc(todoRef, {
      completed: !todo.completed,
    });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      {todo.title}
    </li>
  );
}
```

### 5. Delete (Remove Todo)

```typescript
// src/components/TodoItem.tsx
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

function TodoItem({ todo }) {
  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return;

    const todoRef = doc(db, 'todos', todo.id);
    await deleteDoc(todoRef);
  };

  return (
    <li>
      {todo.title}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
```

### Data Flow Diagram: User Action to UI Update

```
┌─────────────────────────────────────────────────────────────┐
│ User Action: "Add new task"                                │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
   ┌──────────────────────┐
   │ Form submission      │
   │ (handleSubmit)       │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ addDoc()             │
   │ (Firestore Create)   │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Firestore Database   │
   │ [New document saved] │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Success response     │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Re-fetch todos       │
   │ (or optimistic UI)   │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Update state         │
   │ setTodos([...])      │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ React re-renders     │
   │ UI shows new task    │
   └──────────────────────┘
```

## Visual Diagram: CRUD Operations

```
CREATE                READ                  UPDATE                DELETE
  │                     │                      │                     │
  ▼                     ▼                      ▼                     ▼
┌─────────┐       ┌─────────┐          ┌─────────┐           ┌─────────┐
│ addDoc()│       │getDocs()│          │updateDoc│           │deleteDoc│
└────┬────┘       └────┬────┘          └────┬────┘           └────┬────┘
     │                 │                    │                      │
     ▼                 ▼                    ▼                      ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      Firestore Database                              │
│                                                                      │
│  todos (collection)                                                  │
│  ├── todo1 { title: "Buy groceries", completed: false }             │
│  ├── todo2 { title: "Walk dog", completed: true }                   │
│  └── todo3 { title: "Study React", completed: false }               │
└──────────────────────────────────────────────────────────────────────┘
     │                 │                    │                      │
     └─────────────────┴────────────────────┴──────────────────────┘
                                  │
                                  ▼
                            ┌─────────────┐
                            │ React State │
                            │ (todos)     │
                            └──────┬──────┘
                                   │
                                   ▼
                            ┌─────────────┐
                            │     UI      │
                            │ (Todo List) │
                            └─────────────┘
```

## Why These Patterns Matter

CRUD operations are the foundation of data-driven apps. Once you understand Create, Read, Update, and Delete, you can build:

- Social media (posts, comments, likes)
- E-commerce (products, cart, orders)
- Note-taking apps
- Project management tools
- Basically any app that stores user data

Firestore makes these operations safe and scalable:
- **Authentication integration** — `userId` links data to users
- **Security rules** — Control who can read/write
- **Real-time capabilities** — Optional instant updates
- **Offline support** — Works without internet (advanced)

React + Firestore is a powerful combination:
- React handles UI and state
- Firestore handles data persistence
- Firebase Auth handles user identity
- Security rules handle permissions

## What You'll Build

In this slice, you'll create:

- ✅ Firestore integration with your app
- ✅ TypeScript types for your data model
- ✅ A form to add new items (Create)
- ✅ A list view with loading states (Read)
- ✅ Edit functionality for existing items (Update)
- ✅ Delete with confirmation (Delete)
- ✅ Empty states when there's no data
- ✅ User-specific data (each user sees only their items)

By the end, you'll have a fully functional CRUD feature that persists data to Firestore and keeps each user's data private.

---

## Next Steps

Now that you understand the concepts, let's start building:

[Step 1: Understanding Databases →](./steps/01-understanding-databases)
