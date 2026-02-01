# Slice 3 Prompts

> Example prompts for building your protected feature

**Note:** These prompts use "notes" as the example. Replace with your chosen feature.

## Before You Start: Enable Firestore

Do this in Firebase console:

1. Go to your Firebase project
2. Click "Firestore Database"
3. Click "Create database"
4. Select "Start in test mode" (we'll add security rules later)
5. Choose a location close to you
6. Click "Done"

---

## Prompt 1: Set Up Firestore

```
Add Firestore to my existing Firebase configuration.

Update src/lib/firebase.ts to:
1. Import and initialize Firestore
2. Export the db instance

Also create src/types/index.ts with my Note interface:
- id: string
- title: string
- content: string
- userId: string
- createdAt: Timestamp
- updatedAt: Timestamp
```

### Verify

- No import errors
- App still runs

---

## Prompt 2: Create Note Form

```
Create a form to add new notes in my React app.

Requirements:
1. Title input (required)
2. Content textarea (required)
3. Validation - show errors if empty
4. On submit:
   - Get current user from useAuth
   - Add document to 'notes' collection with userId, title, content, createdAt, updatedAt
   - Redirect to /dashboard on success
   - Show error on failure
5. Cancel button that goes back to dashboard

Create:
- src/components/notes/NoteForm.tsx
- src/pages/NewNotePage.tsx

Add route for /notes/new in App.tsx
```

### Verify

1. Navigate to /notes/new
2. Fill out form and submit
3. Check Firebase console → note appears in Firestore

---

## Prompt 3: List Notes

```
Create a notes list for the dashboard.

Requirements:
1. Fetch all notes where userId matches current user
2. Order by createdAt descending (newest first)
3. Show loading state while fetching
4. Show empty state when no notes ("No notes yet. Create your first one!")
5. Display each note as a card showing title and preview of content
6. Link to "Add new note" button

Create:
- src/components/notes/NoteCard.tsx (single note display)
- src/components/notes/NoteList.tsx (fetches and displays all)

Update DashboardPage.tsx to include NoteList
```

### Verify

1. Dashboard shows your note(s)
2. Empty state shows when no notes
3. Loading state visible briefly

---

## Prompt 4: Edit Note

```
Add the ability to edit existing notes.

Requirements:
1. Create edit page at /notes/:id/edit
2. Fetch the note by ID
3. Verify the note belongs to current user
4. Pre-fill form with existing data
5. On submit, update the document (change title, content, updatedAt)
6. Redirect to dashboard on success
7. Handle note not found

Create:
- src/pages/EditNotePage.tsx

Update:
- Add route in App.tsx
- Add edit button/link to NoteCard.tsx

Use the same NoteForm component if possible, or create a shared form.
```

### Verify

1. Click edit on a note
2. See form with existing data
3. Make changes and save
4. See updated note in list

---

## Prompt 5: Delete Note

```
Add the ability to delete notes.

Requirements:
1. Add delete button to NoteCard
2. Show confirmation dialog before deleting
3. Delete document from Firestore
4. Remove from list (or refresh list)
5. Show error if delete fails

Update src/components/notes/NoteCard.tsx
```

### Verify

1. Click delete on a note
2. See confirmation dialog
3. Confirm → note removed
4. Refresh → note still gone

---

## Alternative: Task-Specific Prompts

If you're building tasks instead of notes:

### Create Task
```
Create a task form with:
- Name input (required)
- Submit creates task with completed: false

Show tasks with checkboxes. Clicking checkbox toggles completed status.
```

### Toggle Task
```
Add ability to toggle task completion:
1. Checkbox on each task
2. Clicking updates completed field in Firestore
3. Completed tasks show with strikethrough
```

---

## Common Issues and Fixes

### "Missing or insufficient permissions"

You're in test mode but still having issues? Check:
- userId is being set correctly
- You're logged in when making requests

### "No notes showing"

Check:
- userId filter matches auth.currentUser.uid
- Documents exist in Firestore console
- No console errors

### Form not clearing after submit

```typescript
// Reset form state after submit
setTitle('');
setContent('');
```

### Timestamps not working

```typescript
import { Timestamp, serverTimestamp } from 'firebase/firestore';

// Use serverTimestamp() when writing
await addDoc(collection(db, 'notes'), {
  ...data,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});
```

---

## Verification Checklist

Before committing:

- [ ] Can create new items
- [ ] Items appear in list
- [ ] Items only show for logged-in user
- [ ] Can edit items
- [ ] Edits persist after refresh
- [ ] Can delete items
- [ ] Deletion is permanent
- [ ] Empty state displays correctly
- [ ] No console errors
- [ ] `npm run lint` passes

---

## Commit

```bash
git add .
git commit -m "Add notes CRUD functionality"
git push
```

---

[Start Slice 4: Security Rules →](../slice-4-security-rules/)
