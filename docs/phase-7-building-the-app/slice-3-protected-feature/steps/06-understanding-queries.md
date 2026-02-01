# Step 6: Understanding Queries

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Firestore Queries, Filtering, Sorting

## What We're Learning

Before we build the list view, we need to understand how to query Firestore to fetch only the data we need — not everything in the database.

## Before You Code: Ask AI First

> **💡 Interactive Learning:**
>
> ```
> What is a Firestore query?
> Why not just fetch all documents and filter in JavaScript?
> What does the where() clause do in Firestore queries?
> How do I fetch only todos that belong to the current user?
> What does orderBy() do and why would I use it?
> Can I combine multiple where() clauses?
> What's the difference between fetching with and without a query?
> ```

**What you should learn:**
- Queries filter data server-side (faster, more secure)
- `where()` filters by field value
- `orderBy()` sorts results
- You can combine multiple conditions
- Queries prevent users from seeing others' data
- Always query by userId to ensure privacy

## Understanding Firestore Queries

After asking AI, make sure you understand these concepts:

### Basic Query Structure

```typescript
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

// Without query: fetch EVERYTHING (bad!)
const allTodos = await getDocs(collection(db, 'todos'));

// With query: fetch only what you need (good!)
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid),
  orderBy('createdAt', 'desc')
);
const myTodos = await getDocs(q);
```

### Common Query Operations

| Operation | Purpose | Example |
|-----------|---------|---------|
| `where()` | Filter by field value | `where('completed', '==', false)` |
| `where()` | Filter by userId | `where('userId', '==', currentUser.uid)` |
| `orderBy()` | Sort results | `orderBy('createdAt', 'desc')` |
| `limit()` | Limit results | `limit(10)` |

### Real-World Examples

**Get only my todos:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid)
);
```

**Get only incomplete todos:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid),
  where('completed', '==', false)
);
```

**Get todos sorted by newest first:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid),
  orderBy('createdAt', 'desc')
);
```

**Get only my incomplete todos, sorted by date:**
```typescript
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid),
  where('completed', '==', false),
  orderBy('createdAt', 'desc')
);
```

## Why Queries Matter for Security

Imagine fetching all todos without a query:

```typescript
// BAD: Fetches EVERYONE's todos
const allTodos = await getDocs(collection(db, 'todos'));
// Returns: [
//   { title: "Alice's task", userId: "alice123" },
//   { title: "Bob's task", userId: "bob456" },
//   { title: "My task", userId: "me789" }
// ]

// Then filter in JavaScript:
const myTodos = allTodos.filter(todo => todo.userId === currentUser.uid);
```

**Problems:**
- ❌ Downloaded everyone's data (privacy violation!)
- ❌ Slow (fetched unnecessary data)
- ❌ Expensive (Firestore charges per document read)
- ❌ Security rules can't enforce this (already sent the data)

**Better: Query server-side**
```typescript
// GOOD: Firestore only sends your todos
const q = query(
  collection(db, 'todos'),
  where('userId', '==', currentUser.uid)
);
const myTodos = await getDocs(q);
// Returns: [
//   { title: "My task", userId: "me789" }
// ]
```

**Benefits:**
- ✅ Only fetches your data (private)
- ✅ Fast (smaller payload)
- ✅ Cheaper (fewer reads)
- ✅ Security rules can enforce this

## Query Flow Diagram

```
User loads todos page
        │
        ▼
Component mounts, useEffect runs
        │
        ▼
Build query:
  collection(db, 'todos')
  where('userId', '==', currentUser.uid)
  orderBy('createdAt', 'desc')
        │
        ▼
Send query to Firestore
        │
        ▼
Firestore filters on server
  (only returns matching docs)
        │
        ▼
Receive QuerySnapshot
        │
        ▼
Convert to array:
  snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
        │
        ▼
Update state: setTodos(data)
        │
        ▼
React re-renders with todos
```

## Understanding Check

Before moving on, make sure you can answer these:

> **💡 Ask yourself (or ask AI if unsure):**
>
> 1. **What does `where('userId', '==', currentUser.uid)` do?** (Filters to only current user's docs)
> 2. **Why query instead of fetching everything?** (Performance, security, cost)
> 3. **What does `orderBy('createdAt', 'desc')` do?** (Sorts by creation date, newest first)
> 4. **Can I use multiple where() clauses?** (Yes!)
> 5. **What does getDocs() return?** (QuerySnapshot with docs array)
> 6. **How do I convert QuerySnapshot to an array of objects?** (snapshot.docs.map(...))

**Expected answers:**
1. Filters documents to only those where userId matches current user
2. Queries are faster, more secure, and cheaper than fetching everything
3. Sorts by createdAt field in descending order (newest first)
4. Yes, you can chain multiple conditions
5. A QuerySnapshot object containing an array of documents
6. `snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))`

## What You Learned

At this point you should understand:
- ✅ What Firestore queries are and why they're important
- ✅ How to filter data with `where()`
- ✅ How to sort data with `orderBy()`
- ✅ Why querying server-side is better than filtering in JavaScript
- ✅ How to combine multiple query conditions
- ✅ The security implications of queries (privacy)
- ✅ How to convert QuerySnapshot to a usable array

## Next Step

Now that you understand queries, let's build the READ operation — a list view that fetches and displays todos:

[Step 7: List Items with Loading →](./07-list-items-loading)
