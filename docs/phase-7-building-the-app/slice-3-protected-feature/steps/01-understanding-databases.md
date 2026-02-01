# Step 1: Understanding Databases

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Databases, Firestore, NoSQL

## What We're Learning

Before we write any code, we need to understand what databases are and why Firestore works differently from traditional databases.

## Before You Code: Ask AI First

> **💡 Interactive Learning:**
>
> Open your AI assistant and ask these questions. Really read the answers!
>
> ```
> What is the difference between a database and regular JavaScript variables?
> Why does data in variables disappear when I refresh the page?
> What is Firestore and how is it different from MySQL or PostgreSQL?
> What does "NoSQL" mean and why would I use it?
> In Firestore, what are collections and documents?
> Can you show me an example of how a todo list would be structured in Firestore?
> ```

**What you should learn:**
- Variables live in memory (disappear on refresh)
- Databases persist data on servers
- Firestore is a NoSQL database (no tables, uses collections/documents)
- Collections contain documents (like folders contain files)
- Documents are JSON-like objects with fields
- Firestore integrates seamlessly with Firebase Auth

## Understanding Firestore Structure

After asking AI, make sure you understand this structure:

```
Collection: todos
├── Document: todo1
│   ├── title: "Buy groceries"
│   ├── completed: false
│   └── userId: "user123"
├── Document: todo2
│   ├── title: "Walk dog"
│   ├── completed: true
│   └── userId: "user123"
└── Document: todo3
    ├── title: "Study React"
    ├── completed: false
    └── userId: "user456"
```

**Key concepts:**
- **Collection** (`todos`) — Container for documents
- **Document** (`todo1`, `todo2`) — Individual records with unique IDs
- **Fields** (`title`, `completed`) — Data inside each document

## Understanding Check

Before moving on, make sure you can answer these:

> **💡 Ask yourself (or ask AI if unsure):**
>
> 1. **What happens to JavaScript variables when you refresh the page?**
> 2. **What's the difference between a SQL table and a Firestore collection?**
> 3. **In Firestore, what contains what? (collection → document → ?)**
> 4. **Why do we need a `userId` field in each todo?**
> 5. **What file format do Firestore documents look like?**

**Expected answers:**
1. Variables disappear (not persisted)
2. SQL uses rows in tables; Firestore uses documents in collections
3. Collection → Document → Fields
4. To link each todo to its owner (privacy)
5. JSON-like objects (key-value pairs)

## What You Learned

At this point you should understand:
- ✅ Why apps need databases (persistence)
- ✅ How Firestore differs from SQL databases
- ✅ The structure: collections contain documents contain fields
- ✅ Why NoSQL databases are good for hierarchical data
- ✅ How Firestore integrates with Firebase Auth

## Next Step

Now that you understand what Firestore is, let's enable it in your Firebase project:

[Step 2: Enable and Install Firestore →](./02-enable-install-firestore)
