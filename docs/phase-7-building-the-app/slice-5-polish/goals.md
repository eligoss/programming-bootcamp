# Slice 5 Goals

> **Time**: ~10 minutes | **Outcome**: Polished user experience

## What "Done" Looks Like

When this slice is complete:

1. **Loading visible** — Users know when something is happening
2. **Success clear** — Users know when actions completed
3. **Errors helpful** — Users know what went wrong
4. **UI consistent** — Clean, professional look

## Acceptance Criteria

### Loading States
- [ ] Spinner shows while fetching notes list
- [ ] Button shows "Saving..." while form submits
- [ ] Disabled inputs during submission

### Success Feedback
- [ ] Toast/message after creating item
- [ ] Toast/message after updating item
- [ ] Toast/message after deleting item
- [ ] Messages auto-dismiss or have close button

### Error Handling
- [ ] Network errors show user-friendly message
- [ ] Form validation errors clear on input
- [ ] Errors don't crash the app
- [ ] "Try again" option where appropriate

### UI Polish
- [ ] Consistent spacing and alignment
- [ ] Buttons have hover states
- [ ] Inputs have focus states
- [ ] Empty states are inviting
- [ ] Responsive on mobile (basic)

## Examples of Polish

### Before Polish
```
- Form submits, nothing visible happens
- Error shows as: "Firebase: Error (auth/wrong-password)"
- List loads with no indication
- Delete happens immediately, no confirmation
```

### After Polish
```
- Form shows spinner, button says "Saving..."
- Error shows as: "Incorrect password. Please try again."
- List shows "Loading your notes..." with spinner
- Delete asks "Are you sure?" first
```

## Common Polish Patterns

### Loading Spinner

```tsx
{loading ? (
  <div className="spinner">Loading...</div>
) : (
  <NoteList notes={notes} />
)}
```

### Submit Button State

```tsx
<button disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save Note'}
</button>
```

### Error Message Translation

```typescript
function getErrorMessage(error: FirebaseError): string {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
```

### Toast Notification

```tsx
// After successful save
showToast('Note saved successfully!');

// Toast component
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <div className="toast">{message}</div>;
}
```

## NOT in This Slice

- ❌ Animation libraries
- ❌ Complex UI frameworks
- ❌ Dark mode
- ❌ Accessibility (important but out of scope)

Just the basics that make it feel complete.

## Commit Message

When done:
```
Add loading states and error handling polish
```

---

[View Prompts →](./prompts)
