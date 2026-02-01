# Step 8: Add Confirmation Dialog

> **Time**: ~8 minutes | **Type**: Component | **Concepts**: Modal dialogs, preventing accidental deletion

## What We're Building

A reusable ConfirmDialog component that:
- Shows before destructive actions (delete)
- Has clear Yes/No buttons
- Can be dismissed with Escape key or backdrop click
- Prevents accidental deletions

## The Prompt for AI

> **💡 Ask AI to help you create a confirmation dialog:**
>
> ```
> I need a confirmation dialog component for React + TypeScript.
>
> Requirements:
> 1. Modal overlay with backdrop
> 2. Dialog with title, message, and two buttons (Cancel, Confirm)
> 3. Escape key closes dialog
> 4. Clicking backdrop closes dialog
> 5. Confirm button is red for destructive actions
> 6. Takes props: title, message, onConfirm, onCancel
> 7. Simple CSS (centered modal, dark backdrop)
>
> Can you provide:
> 1. src/components/ConfirmDialog.tsx component
> 2. CSS for modal styling
> 3. Example usage for delete confirmation
> ```

**Wait for AI's response, then create the component.**

## Part 1: Create ConfirmDialog Component

**Create file:** `src/components/ConfirmDialog.tsx`

**AI should give you something like this:**

```tsx
// src/components/ConfirmDialog.tsx
import { useEffect } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCancel();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button onClick={onCancel} className="button-secondary">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="button-danger">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Part 2: Add Modal CSS

**Add to your main CSS file:**

```css
/* Modal Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Modal Dialog */
.modal-dialog {
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Modal Title */
.modal-title {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

/* Modal Message */
.modal-message {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Button Styles */
.button-secondary {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.button-secondary:hover {
  background: #f9fafb;
}

.button-danger {
  padding: 8px 16px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.button-danger:hover {
  background: #dc2626;
}
```

## Part 3: Use Dialog for Delete Confirmation

**Update your delete function to use the dialog:**

### Before (uses browser confirm):
```tsx
async function handleDelete(todoId: string) {
  if (confirm('Delete this todo?')) {  // Browser confirm (ugly)
    try {
      await deleteDoc(doc(db, 'todos', todoId));
      showToast('Todo deleted!', 'success');
    } catch (error) {
      showToast(getFriendlyErrorMessage(error), 'error');
    }
  }
}
```

### After (uses custom dialog):
```tsx
import { useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

function TodosPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  function openDeleteDialog(todoId: string) {
    setTodoToDelete(todoId);
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  }

  async function confirmDelete() {
    if (!todoToDelete) return;

    try {
      await deleteDoc(doc(db, 'todos', todoToDelete));
      showToast('Todo deleted!', 'success');
      closeDeleteDialog();
      // Refresh list
    } catch (error) {
      showToast(getFriendlyErrorMessage(error), 'error');
    }
  }

  return (
    <div>
      {/* Your todos list */}
      {todos.map(todo => (
        <div key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => openDeleteDialog(todo.id)}>
            Delete
          </button>
        </div>
      ))}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Todo"
        message="Are you sure you want to delete this todo? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </div>
  );
}
```

## Part 4: Understanding the Implementation

Ask AI to explain the key parts:

> **💡 Ask AI:**
>
> ```
> Can you explain how the ConfirmDialog works?
> 1. How does the Escape key handler work?
> 2. What does e.stopPropagation() do when clicking the dialog?
> 3. Why close the dialog on backdrop click?
> 4. How does the component prevent closing when clicking the dialog itself?
> 5. Why use state to track which todo to delete?
> ```

**What you should understand:**
- `useEffect` listens for Escape key when dialog is open
- `stopPropagation()` prevents backdrop click when clicking dialog
- Clicking backdrop triggers `onCancel`
- Need to track which todo to delete (can't pass it directly to delete function)
- Dialog is controlled by `isOpen` prop

## Verification

**Test the confirmation dialog:**

### Test 1: Show Dialog
1. Click "Delete" on a todo
2. **Expected:**
   - [ ] Dialog appears with backdrop
   - [ ] Title: "Delete Todo"
   - [ ] Message explains action
   - [ ] Two buttons: Cancel (gray), Delete (red)
   - [ ] Backdrop is semi-transparent black

### Test 2: Confirm Delete
1. Open delete dialog
2. Click "Delete" button
3. **Expected:**
   - [ ] Todo deleted from Firestore
   - [ ] Success toast: "Todo deleted!"
   - [ ] Dialog closes
   - [ ] Todo disappears from list

### Test 3: Cancel via Button
1. Open delete dialog
2. Click "Cancel" button
3. **Expected:**
   - [ ] Dialog closes
   - [ ] Todo NOT deleted
   - [ ] No toast appears

### Test 4: Cancel via Backdrop
1. Open delete dialog
2. Click outside dialog (on dark backdrop)
3. **Expected:**
   - [ ] Dialog closes
   - [ ] Todo NOT deleted

### Test 5: Cancel via Escape
1. Open delete dialog
2. Press Escape key
3. **Expected:**
   - [ ] Dialog closes
   - [ ] Todo NOT deleted

### Test 6: Click Dialog (Should Stay Open)
1. Open delete dialog
2. Click inside dialog content (but not on buttons)
3. **Expected:**
   - [ ] Dialog stays open
   - [ ] No action taken

## Common Issues

### Dialog Doesn't Appear

**Problem:** `isOpen` not set to `true`.

**Fix:** Check that state is updated:
```tsx
function openDeleteDialog(todoId: string) {
  setTodoToDelete(todoId);
  setDeleteDialogOpen(true);  // Must be true!
}
```

### Backdrop Click Doesn't Close

**Problem:** `onClick` not wired to `onCancel`.

**Fix:**
```tsx
<div className="modal-backdrop" onClick={onCancel}>
```

### Clicking Dialog Closes It

**Problem:** Missing `stopPropagation()`.

**Fix:**
```tsx
<div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
```

**What this does:** Prevents click events inside dialog from bubbling up to backdrop.

### Escape Key Doesn't Work

**Problem:** Event listener not added or not cleaning up.

**Fix:** Check `useEffect` dependency array:
```tsx
useEffect(() => {
  // ... key handler
}, [isOpen, onCancel]);  // Must include dependencies
```

### Wrong Todo Gets Deleted

**Problem:** Not tracking which todo to delete.

**Fix:** Use state to store ID:
```tsx
const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

function openDeleteDialog(todoId: string) {
  setTodoToDelete(todoId);  // Store the ID
  setDeleteDialogOpen(true);
}
```

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **Why use a custom dialog instead of confirm()?** (Browser confirm is ugly and not customizable)
> 2. **How does Escape key close the dialog?** (useEffect adds keydown listener when open)
> 3. **What does stopPropagation() prevent?** (Dialog clicks from closing it via backdrop handler)
> 4. **Why track todoToDelete in state?** (Need to remember which one when user confirms)
> 5. **Should all destructive actions have confirmation?** (Yes, prevents accidental mistakes)

## What You Learned

At this point you should have:
- ✅ ConfirmDialog component created
- ✅ Modal with backdrop and styling
- ✅ Escape key to close
- ✅ Backdrop click to close
- ✅ Custom Yes/No buttons
- ✅ Used before delete operations
- ✅ Professional confirmation UX
- ✅ Prevents accidental deletions

## Next Step

Now let's improve the visual design with better spacing, hover states, and shadows:

[Step 9: Improve Visual Design →](./09-improve-visual-design)
