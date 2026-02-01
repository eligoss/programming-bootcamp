# Slice 5 Prompts

> Example prompts for adding polish

## Prompt 1: Add Loading States

```
Add loading states to my React app.

Requirements:
1. Create a simple Spinner component (CSS only, no libraries)
2. Show spinner in NoteList while fetching
3. Show spinner/loading text in forms while submitting
4. Disable form inputs during submission
5. Button text changes to "Saving..." during submit

Update:
- Create src/components/ui/Spinner.tsx
- Update NoteList.tsx
- Update NoteForm.tsx (or whichever form you have)
```

### What to Expect

- Simple spinner component
- Loading state integration
- Disabled states during async operations

---

## Prompt 2: Add Toast Notifications

```
Create a simple toast notification system for my React app.

Requirements:
1. Create ToastContext and ToastProvider
2. Create useToast hook
3. Toast component that:
   - Appears in corner of screen
   - Auto-dismisses after 3 seconds
   - Has close button
   - Supports success and error styles
4. Show toast after:
   - Creating a note: "Note created!"
   - Updating a note: "Note updated!"
   - Deleting a note: "Note deleted!"

Create:
- src/context/ToastContext.tsx
- src/components/ui/Toast.tsx
```

### What to Expect

- Toast system
- Integration with existing actions
- CSS for positioning and styling

---

## Prompt 3: Improve Error Messages

```
Improve error handling in my React app.

Current problem: Firebase errors like "Firebase: Error (auth/wrong-password)"
show directly to users.

Requirements:
1. Create a helper function to translate Firebase error codes to friendly messages
2. Handle these auth errors:
   - auth/wrong-password → "Incorrect password"
   - auth/user-not-found → "No account found with this email"
   - auth/email-already-in-use → "An account already exists with this email"
   - auth/weak-password → "Password must be at least 6 characters"
   - auth/invalid-email → "Please enter a valid email address"
3. Handle network/generic errors:
   - Default → "Something went wrong. Please try again."
4. Update login and registration forms to use this helper

Create src/lib/errorMessages.ts
Update forms to use it
```

---

## Prompt 4: Add Confirmation Dialog

```
Create a confirmation dialog for delete actions.

Requirements:
1. Modal that appears over content
2. Message explaining what will be deleted
3. "Cancel" and "Delete" buttons
4. Delete button is red/danger colored
5. Clicking outside closes modal
6. Escape key closes modal
7. Use it before deleting notes

Create:
- src/components/ui/ConfirmDialog.tsx

Update:
- NoteCard.tsx to use confirmation before delete
```

---

## Prompt 5: Clean Up Styling

```
Review and clean up the CSS in my app.

Current styles are basic. Please:
1. Add consistent spacing (use 4px/8px/16px/24px scale)
2. Add subtle hover states to buttons and links
3. Add focus states for accessibility
4. Improve empty state appearance
5. Make basic mobile responsive (stack layouts on small screens)
6. Add subtle shadows and borders where appropriate

Update src/index.css with improved styles.
Don't add any external libraries.
```

---

## Prompt 6: Final Review

```
Review my app for any obvious polish issues.

Look for:
1. Places where loading state is missing
2. Unhandled error scenarios
3. UI inconsistencies
4. Missing feedback
5. Accessibility issues (like missing labels)

Give me a checklist of items to fix, prioritized by importance.
```

---

## CSS Quick Wins

If you want to add polish quickly, here's some CSS:

```css
/* Smooth transitions */
button, a {
  transition: all 0.2s ease;
}

/* Hover states */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Focus states */
input:focus, button:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Loading skeleton */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Verification Checklist

Before committing:

- [ ] No operations happen without feedback
- [ ] All errors show user-friendly messages
- [ ] Delete has confirmation
- [ ] Success shows toast/message
- [ ] UI looks consistent
- [ ] Works on mobile (basically)
- [ ] No console errors
- [ ] `npm run lint` passes

---

## Commit

```bash
git add .
git commit -m "Add loading states and error handling polish"
git push
```

---

## Phase 7 Complete! 🎉

You've built a complete application with:
- Navigation and routing
- User authentication
- CRUD functionality
- Security rules
- Polish and feedback

**Total time for Phase 7:** ~90 minutes

Almost there! Time to test and deploy.

---

[Start Phase 8: Testing & Deploy →](../../phase-8-testing-and-deploy/)
