# Step 4: Understanding CRUD

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: CRUD Operations, Firestore Functions

## What We're Learning

Before writing code that interacts with Firestore, we need to understand the four fundamental database operations: Create, Read, Update, and Delete.

## Before You Code: Ask AI First

> **💡 Interactive Learning:**
>
> ```
> What does CRUD stand for?
> Give me real-world examples of each CRUD operation in a todo app.
> In Firestore, what function do I use to CREATE a new document?
> What's the difference between getDocs() and getDoc() in Firestore?
> What function do I use to UPDATE an existing document?
> What function do I use to DELETE a document?
> Why is CRUD important in web development?
> ```

**What you should learn:**
- CRUD = Create, Read, Update, Delete
- Create → Add new todo with `addDoc()`
- Read → Fetch todos with `getDocs()` or one todo with `getDoc()`
- Update → Modify existing todo with `updateDoc()`
- Delete → Remove todo with `deleteDoc()`
- Every data-driven app is built on CRUD operations

## Understanding CRUD Operations

After asking AI, make sure you understand this mapping:

| Operation | User Action | Firestore Function | What It Does |
|-----------|-------------|-------------------|--------------|
| **Create** | "Add new task" | `addDoc()` | Adds a new document to a collection |
| **Read** | "Show all tasks" | `getDocs()` | Fetches all documents from a collection |
| **Read** | "Show one task" | `getDoc()` | Fetches a single document by ID |
| **Update** | "Mark as complete" | `updateDoc()` | Changes fields in an existing document |
| **Delete** | "Remove task" | `deleteDoc()` | Deletes a document from the collection |

## Real-World Flow Examples

### Create Flow
```
User types "Buy groceries" and clicks "Add"
                ↓
Form submits with title
                ↓
Call addDoc(collection(db, 'todos'), { title, userId, completed: false, createdAt: Timestamp.now() })
                ↓
Firestore creates new document with auto-generated ID
                ↓
Document saved: { id: "abc123", title: "Buy groceries", completed: false, ... }
                ↓
UI updates to show the new task
```

### Read Flow
```
User opens the todos page
                ↓
Component mounts, useEffect runs
                ↓
Call getDocs(query(collection(db, 'todos'), where('userId', '==', currentUser.uid)))
                ↓
Firestore returns all matching documents
                ↓
Convert to array: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                ↓
Update state: setTodos(data)
                ↓
UI renders the list of tasks
```

### Update Flow
```
User clicks checkbox to mark task complete
                ↓
Get document reference: doc(db, 'todos', todoId)
                ↓
Call updateDoc(todoRef, { completed: true })
                ↓
Firestore updates the document
                ↓
Re-fetch todos or update state locally
                ↓
UI shows task as completed (checkbox checked)
```

### Delete Flow
```
User clicks "Delete" button
                ↓
Show confirmation: "Are you sure?"
                ↓
User confirms
                ↓
Get document reference: doc(db, 'todos', todoId)
                ↓
Call deleteDoc(todoRef)
                ↓
Firestore removes the document
                ↓
Re-fetch todos or update state locally
                ↓
UI removes the task from the list
```

## Firestore Functions Quick Reference

```typescript
import {
  collection,    // Reference to a collection
  doc,          // Reference to a specific document
  addDoc,       // Create new document
  getDoc,       // Read single document
  getDocs,      // Read multiple documents
  updateDoc,    // Update existing document
  deleteDoc,    // Delete document
  query,        // Build a query
  where         // Filter condition
} from 'firebase/firestore';

// CREATE
await addDoc(collection(db, 'todos'), {
  title: 'Buy milk',
  completed: false
});

// READ (all)
const snapshot = await getDocs(collection(db, 'todos'));
const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// READ (one)
const docSnap = await getDoc(doc(db, 'todos', 'abc123'));
const todo = { id: docSnap.id, ...docSnap.data() };

// UPDATE
await updateDoc(doc(db, 'todos', 'abc123'), {
  completed: true
});

// DELETE
await deleteDoc(doc(db, 'todos', 'abc123'));
```

## Understanding Check

Before moving on, make sure you can answer these:

> **💡 Ask yourself (or ask AI if unsure):**
>
> 1. **What CRUD operation creates a new document?** (Create with `addDoc`)
> 2. **What's the difference between `getDoc()` and `getDocs()`?** (One doc vs multiple docs)
> 3. **If I want to mark a task complete, which operation is that?** (Update)
> 4. **What function removes a document from Firestore?** (`deleteDoc`)
> 5. **Do I need the document ID to update or delete it?** (Yes!)
> 6. **What does `collection(db, 'todos')` return?** (A reference to the todos collection)

**Expected answers:**
1. Create with `addDoc()`
2. `getDoc()` fetches one document by ID, `getDocs()` fetches multiple
3. Update (changing the `completed` field)
4. `deleteDoc()`
5. Yes, you need the ID to reference the specific document
6. A CollectionReference you can use with `addDoc()` or queries

## What You Learned

At this point you should understand:
- ✅ What CRUD stands for (Create, Read, Update, Delete)
- ✅ Which Firestore function performs each operation
- ✅ The difference between `getDoc()` and `getDocs()`
- ✅ That you need a document ID to update or delete
- ✅ How user actions map to CRUD operations
- ✅ That CRUD is the foundation of all data-driven apps

## Next Step

Now that you understand CRUD, let's build the CREATE operation — a form to add new todos:

[Step 5: Create Add Form →](./05-create-add-form)
