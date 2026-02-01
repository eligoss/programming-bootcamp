# Step 7: Improve Error Messages

> **Time**: ~8 minutes | **Type**: UX | **Concepts**: Error handling, user-friendly messages

## What We're Building

Creating a helper to convert technical Firebase errors into friendly, user-understandable messages:
- Map Firebase error codes to friendly text
- Provide helpful guidance
- Show specific field errors when possible

## The Prompt for AI

> **💡 Ask AI to help you create error message helper:**
>
> ```
> I need to improve error messages from Firebase Firestore and Auth.
>
> Current problem: Firebase errors look like "FirebaseError: permission-denied" or "auth/invalid-email"
>
> I need:
> 1. A helper function that maps Firebase error codes to friendly messages
> 2. Cover common errors:
>    - permission-denied (security rules)
>    - not-found (document doesn't exist)
>    - unauthenticated (user not logged in)
>    - auth/invalid-email
>    - auth/user-not-found
>    - auth/wrong-password
>    - network errors
> 3. Default fallback message for unknown errors
>
> Can you create src/utils/errorMessages.ts with a function like:
> getFriendlyErrorMessage(error: unknown): string
> ```

**Wait for AI's response, then create the file.**

## Part 1: Create Error Message Helper

**Create file:** `src/utils/errorMessages.ts`

**AI should give you something like this:**

```typescript
// src/utils/errorMessages.ts

export function getFriendlyErrorMessage(error: unknown): string {
  // Handle non-Error objects
  if (!(error instanceof Error)) {
    return 'An unexpected error occurred. Please try again.';
  }

  const message = error.message.toLowerCase();
  const code = getErrorCode(error);

  // Firestore errors
  if (code === 'permission-denied') {
    return "You don't have permission to do that.";
  }

  if (code === 'not-found') {
    return "The item you're looking for doesn't exist.";
  }

  if (code === 'unauthenticated') {
    return 'Please log in to continue.';
  }

  if (code === 'already-exists') {
    return 'This item already exists.';
  }

  // Auth errors
  if (code === 'auth/invalid-email') {
    return 'Please enter a valid email address.';
  }

  if (code === 'auth/user-not-found') {
    return 'No account found with this email.';
  }

  if (code === 'auth/wrong-password') {
    return 'Incorrect password. Please try again.';
  }

  if (code === 'auth/email-already-in-use') {
    return 'An account with this email already exists.';
  }

  if (code === 'auth/weak-password') {
    return 'Password must be at least 6 characters.';
  }

  if (code === 'auth/too-many-requests') {
    return 'Too many failed attempts. Please try again later.';
  }

  // Network errors
  if (message.includes('network') || message.includes('offline')) {
    return 'Network error. Please check your internet connection.';
  }

  // Validation errors (from your client-side validation)
  if (message.includes('required') || message.includes('empty')) {
    return 'Please fill in all required fields.';
  }

  // Default fallback
  return 'Something went wrong. Please try again.';
}

// Helper to extract error code from Firebase errors
function getErrorCode(error: Error): string {
  // Firebase errors have a 'code' property
  if ('code' in error) {
    return (error as any).code;
  }
  return '';
}
```

## Part 2: Use Helper in Forms

**Update CreateTodoPage to use friendly errors:**

### Before (shows technical error):
```tsx
try {
  await addDoc(collection(db, 'todos'), todoData);
  showToast('Todo created!', 'success');
} catch (error) {
  console.error('Failed to create todo:', error);
  showToast('Could not create todo. Please try again.', 'error');
}
```

### After (shows friendly error):
```tsx
import { getFriendlyErrorMessage } from '../utils/errorMessages';

try {
  await addDoc(collection(db, 'todos'), todoData);
  showToast('Todo created!', 'success');
} catch (error) {
  console.error('Failed to create todo:', error);
  const friendlyMessage = getFriendlyErrorMessage(error);
  showToast(friendlyMessage, 'error');
}
```

## Part 3: Update All Error Handlers

Apply the same pattern to all your async operations:

### EditTodoPage
```tsx
import { getFriendlyErrorMessage } from '../utils/errorMessages';

try {
  await updateDoc(doc(db, 'todos', todoId), updateData);
  showToast('Changes saved!', 'success');
} catch (error) {
  console.error('Failed to update todo:', error);
  showToast(getFriendlyErrorMessage(error), 'error');
}
```

### Delete Function
```tsx
try {
  await deleteDoc(doc(db, 'todos', todoId));
  showToast('Todo deleted!', 'success');
} catch (error) {
  console.error('Failed to delete todo:', error);
  showToast(getFriendlyErrorMessage(error), 'error');
}
```

### Login Page
```tsx
try {
  await signInWithEmailAndPassword(auth, email, password);
  router.push('/todos');
} catch (error) {
  console.error('Login failed:', error);
  showToast(getFriendlyErrorMessage(error), 'error');
}
```

### Register Page
```tsx
try {
  await createUserWithEmailAndPassword(auth, email, password);
  router.push('/todos');
} catch (error) {
  console.error('Registration failed:', error);
  showToast(getFriendlyErrorMessage(error), 'error');
}
```

## Part 4: Add Client-Side Validation Errors (Optional)

**For immediate feedback before submitting:**

```tsx
function handleSubmit(e: FormEvent) {
  e.preventDefault();

  // Client-side validation
  if (!title.trim()) {
    showToast('Title is required', 'error');
    return;
  }

  if (title.length > 200) {
    showToast('Title must be 200 characters or less', 'error');
    return;
  }

  // Proceed with submission
  createTodo();
}
```

**This provides instant feedback before even calling Firestore.**

## Verification

**Test different error scenarios:**

### Test 1: Permission Denied
1. Create a security rule violation (if possible)
2. Try to create/update a todo
3. **Expected:**
   - [ ] Red toast appears
   - [ ] Message: "You don't have permission to do that."
   - [ ] NOT: "FirebaseError: permission-denied"

### Test 2: Network Error
1. Turn off Wi-Fi
2. Try to create a todo
3. **Expected:**
   - [ ] Red toast: "Network error. Please check your internet connection."
   - [ ] NOT: "Failed to fetch" or raw error

### Test 3: Validation Error
1. Try to submit form with empty title
2. **Expected:**
   - [ ] Red toast: "Title is required"
   - [ ] Form doesn't submit
   - [ ] Error shows immediately (client-side)

### Test 4: Auth Errors (If you have login)

**Invalid email:**
1. Try to log in with "notanemail"
2. **Expected:** "Please enter a valid email address."

**Wrong password:**
1. Try to log in with wrong password
2. **Expected:** "Incorrect password. Please try again."

**User not found:**
1. Try to log in with email that doesn't exist
2. **Expected:** "No account found with this email."

### Test 5: Default Fallback
1. Trigger an unexpected error (throw new Error('test'))
2. **Expected:**
   - [ ] Red toast: "Something went wrong. Please try again."
   - [ ] Graceful handling (app doesn't crash)

## Example: Complete Error Handling Flow

**Here's what a fully polished form looks like:**

```tsx
import { useState, FormEvent } from 'react';
import { useToast } from '../hooks/useToast';
import { getFriendlyErrorMessage } from '../utils/errorMessages';
import { Spinner } from '../components/Spinner';

export function CreateTodoPage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Client-side validation (instant feedback)
    if (!title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (title.length > 200) {
      showToast('Title must be 200 characters or less', 'error');
      return;
    }

    // Submit to Firestore
    setLoading(true);
    try {
      await addDoc(collection(db, 'todos'), {
        title: title.trim(),
        completed: false,
        userId: currentUser.uid,
        createdAt: Timestamp.now()
      });
      showToast('Todo created!', 'success');
      router.push('/todos');
    } catch (error) {
      console.error('Failed to create todo:', error);
      showToast(getFriendlyErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
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
}
```

**What makes this polished:**
- ✅ Client-side validation (instant feedback)
- ✅ Loading states (spinner, disabled inputs)
- ✅ Success toast (user confirmation)
- ✅ Friendly error messages (user-understandable)
- ✅ Try/catch/finally (robust error handling)
- ✅ Professional UX (no technical jargon)

## Common Issues

### Still Seeing Technical Errors

**Problem:** Not using `getFriendlyErrorMessage()`.

**Fix:** Import and use everywhere:
```tsx
import { getFriendlyErrorMessage } from '../utils/errorMessages';

catch (error) {
  showToast(getFriendlyErrorMessage(error), 'error');
}
```

### Generic "Something went wrong" Always Shows

**Problem:** Error code not being extracted properly.

**Fix:** Check that `getErrorCode` function works. Log the error:
```tsx
catch (error) {
  console.log('Error object:', error);
  console.log('Error code:', (error as any).code);
  showToast(getFriendlyErrorMessage(error), 'error');
}
```

### Custom Errors Not Friendly

**Problem:** Your custom validation uses `throw new Error()`.

**Fix:** Either:
1. Add handling in `getFriendlyErrorMessage`:
```tsx
if (message.includes('your custom message')) {
  return 'Friendly version';
}
```

2. Or show toast directly instead of throwing:
```tsx
if (!title) {
  showToast('Title is required', 'error');
  return;  // Don't throw, just return
}
```

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **Why convert Firebase errors to friendly messages?** (Users don't understand technical jargon)
> 2. **Where should I use getFriendlyErrorMessage()?** (In every catch block)
> 3. **What's the fallback message for unknown errors?** ("Something went wrong. Please try again.")
> 4. **Should I show technical errors to users?** (No, only in console.error for debugging)
> 5. **When should I do client-side validation?** (Before submitting, for instant feedback)

## What You Learned

At this point you should have:
- ✅ Error message helper created (errorMessages.ts)
- ✅ Friendly messages for Firebase errors
- ✅ Friendly messages for Auth errors
- ✅ Network error handling
- ✅ Default fallback for unknown errors
- ✅ Used in all catch blocks
- ✅ Client-side validation for instant feedback
- ✅ Professional error handling throughout app

## Next Step

Now let's add confirmation dialogs before destructive actions like deleting:

[Step 8: Add Confirmation Dialog →](./08-add-confirmation-dialog)
