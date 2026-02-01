# Slice 3 Goals

> **Time**: ~25 minutes | **Outcome**: Working CRUD feature

## What "Done" Looks Like

When this slice is complete:

1. **Firestore enabled** — Database ready
2. **Create works** — Can add new items
3. **Read works** — Can see list of items
4. **Update works** — Can edit existing items
5. **Delete works** — Can remove items
6. **Data persists** — Survives refresh
7. **User-scoped** — Only see your own items

## Acceptance Criteria

### Firestore Setup
- [ ] Firestore created in Firebase console
- [ ] Firestore imported in app
- [ ] Can write and read test data

### Create
- [ ] Form with required fields
- [ ] Validation (not empty, etc.)
- [ ] Saves to Firestore with userId
- [ ] Redirects to list on success
- [ ] Shows error on failure

### Read/List
- [ ] Shows all items for current user
- [ ] Shows empty state when no items
- [ ] Items display key information
- [ ] Loading state while fetching

### Update
- [ ] Can click to edit an item
- [ ] Form pre-filled with current data
- [ ] Can modify and save
- [ ] Returns to list on success

### Delete
- [ ] Delete button on each item
- [ ] Confirmation before deleting
- [ ] Item removed from list
- [ ] Item removed from database

## Data Models

Choose your feature:

### Notes
```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Tasks
```typescript
interface Task {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
  createdAt: Timestamp;
}
```

### Bookmarks
```typescript
interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Timestamp;
}
```

### Posts
```typescript
interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Technical Requirements

### New Files

```
src/
├── lib/
│   └── firebase.ts        # Add Firestore
├── types/
│   └── index.ts           # Your data types
├── components/
│   └── [feature]/
│       ├── ItemCard.tsx   # Display single item
│       ├── ItemForm.tsx   # Create/edit form
│       └── ItemList.tsx   # List of items
└── pages/
    ├── DashboardPage.tsx  # Updated with list
    ├── NewItemPage.tsx    # Create form
    └── EditItemPage.tsx   # Edit form
```

### Firestore Collection

Collection name: `notes`, `tasks`, `bookmarks`, or `posts`

Document structure matches your interface.

## Routes to Add

| Path | Component | Purpose |
|------|-----------|---------|
| `/dashboard` | DashboardPage | List items |
| `/notes/new` | NewNotePage | Create new |
| `/notes/:id/edit` | EditNotePage | Edit existing |

(Replace `notes` with your feature name)

## NOT in This Slice

- ❌ Search/filter
- ❌ Sorting options
- ❌ Tags/categories
- ❌ Rich text editing
- ❌ File attachments

Keep it simple!

## Commit Message

When done:
```
Add [feature] CRUD functionality
```

---

[View Prompts →](./prompts)
