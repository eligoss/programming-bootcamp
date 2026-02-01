# Slice 5 Verification Checklist

> **Use this checklist before moving to Phase 8**

This is your final quality check for app polish and UX. Work through each section carefully. This determines whether your app feels professional or like a student project.

## Quick Links

If you find issues, these steps can help:
- [Step 1: Understanding UX](./steps/01-understanding-ux) — UX concepts
- [Step 2: Create Spinner](./steps/02-create-spinner) — Loading indicator
- [Step 3: Add Loading States](./steps/03-add-loading-states) — Loading UX
- [Step 4: Understanding Feedback](./steps/04-understanding-feedback) — User feedback concepts
- [Step 5: Create Toast System](./steps/05-create-toast-system) — Toast notifications
- [Step 6: Add Success Feedback](./steps/06-add-success-feedback) — Success messages
- [Step 7: Improve Error Messages](./steps/07-improve-error-messages) — Friendly errors
- [Step 8: Add Confirmation Dialog](./steps/08-add-confirmation-dialog) — Delete confirmation
- [Step 9: Improve Visual Design](./steps/09-improve-visual-design) — Styling and responsiveness
- [Step 10: Add Accessibility](./steps/10-add-accessibility) — A11y features

---

## 1. File Structure

```
src/
├── components/
│   ├── Spinner.tsx
│   ├── Toast.tsx
│   └── ConfirmDialog.tsx
├── contexts/
│   └── ToastContext.tsx
├── hooks/
│   └── useToast.ts
├── utils/
│   └── errorMessages.ts
└── (existing files)
```

**Verify:**
- [ ] Spinner component exists
- [ ] Toast components exist (Toast.tsx, ToastContext.tsx)
- [ ] ConfirmDialog component exists
- [ ] useToast hook exists
- [ ] errorMessages helper exists

---

## 2. Spinner Component

**Check Spinner.tsx:**
- [ ] Component accepts size and color props
- [ ] Uses CSS animation for rotation
- [ ] Default size is ~20px
- [ ] Works inline (doesn't take full width)

**Test spinner:**
```bash
npm run dev
```

**Verify:**
- [ ] Spinner appears and rotates smoothly
- [ ] Can use in buttons: `<button><Spinner /> Loading...</button>`
- [ ] Animation is smooth (not choppy)
- [ ] No console errors

---

## 3. Loading States

### List Loading
1. Go to `/todos`
2. Refresh page

**Verify:**
- [ ] Spinner appears immediately
- [ ] "Loading todos..." text shows
- [ ] Then todos list appears
- [ ] No flicker or layout shift
- [ ] No errors in console

### Create Form Loading
1. Go to `/todos/new`
2. Fill form
3. Click submit

**Verify:**
- [ ] Button shows spinner + "Creating..."
- [ ] Button disabled (can't click again)
- [ ] Form inputs disabled
- [ ] After success: redirects to list
- [ ] No double-submission possible

### Update Form Loading
1. Edit a todo
2. Change title
3. Click save

**Verify:**
- [ ] Button shows spinner + "Saving..."
- [ ] Button and inputs disabled
- [ ] After success: redirects to list
- [ ] Changes saved correctly

---

## 4. Toast Notification System

### Component Check
**Verify ToastContext.tsx:**
- [ ] Creates React Context
- [ ] ToastProvider wraps app
- [ ] Manages toast state (array)
- [ ] showToast function adds toast
- [ ] dismissToast function removes toast
- [ ] Auto-dismiss after 3-5 seconds

**Verify Toast.tsx:**
- [ ] ToastContainer renders all toasts
- [ ] Each toast has icon, message
- [ ] Different colors for success/error/info
- [ ] Click to dismiss
- [ ] Positioned top-right or top-center

**Verify useToast.ts:**
- [ ] Hook provides showToast and dismissToast
- [ ] Throws error if used outside ToastProvider

### Visual Check
**Open your app:**
- [ ] ToastProvider wraps entire app in App.tsx/main.tsx
- [ ] ToastContainer rendered inside provider
- [ ] Toasts positioned correctly (top-right or top-center)

### Functional Test

**Test success toast:**
1. Create a todo
2. **Verify:**
   - [ ] Green toast appears
   - [ ] Shows ✅ icon
   - [ ] Message: "Todo created!"
   - [ ] Auto-dismisses after ~3 seconds
   - [ ] Can click to dismiss early

**Test error toast:**
1. Turn off internet
2. Try to create todo
3. **Verify:**
   - [ ] Red toast appears
   - [ ] Shows ❌ icon
   - [ ] Message is user-friendly
   - [ ] Auto-dismisses after ~5 seconds

**Test multiple toasts:**
1. Trigger 3-4 toasts quickly
2. **Verify:**
   - [ ] All appear
   - [ ] Stack vertically
   - [ ] Don't overlap
   - [ ] Dismiss in order

---

## 5. Success Feedback

**Test all CRUD operations:**

### Create
1. Create a new todo
2. **Verify:**
   - [ ] Loading state shows
   - [ ] Green toast: "Todo created!"
   - [ ] Redirects to list
   - [ ] New todo appears

### Update
1. Edit a todo
2. Save changes
3. **Verify:**
   - [ ] Loading state shows
   - [ ] Green toast: "Changes saved!"
   - [ ] Redirects to list
   - [ ] Changes visible

### Delete
1. Delete a todo
2. Confirm deletion
3. **Verify:**
   - [ ] Green toast: "Todo deleted!"
   - [ ] Todo removed from list
   - [ ] No errors

---

## 6. Error Messages

**Check errorMessages.ts:**
- [ ] File exists in src/utils/
- [ ] Exports getFriendlyErrorMessage function
- [ ] Maps Firebase errors to friendly messages
- [ ] Handles permission-denied, not-found, network errors
- [ ] Handles Auth errors (invalid-email, wrong-password, etc.)
- [ ] Has default fallback message

### Test Friendly Errors

**Validation error:**
1. Submit form with empty title
2. **Verify:**
   - [ ] Error: "Title is required" (not technical)

**Network error:**
1. Turn off internet
2. Try to create todo
3. **Verify:**
   - [ ] Error: "Network error. Please check your internet connection."
   - [ ] NOT: "Failed to fetch" or error code

**General errors:**
- [ ] All errors shown in toasts
- [ ] All errors user-friendly
- [ ] No technical jargon shown to users
- [ ] Technical details only in console.error

---

## 7. Confirmation Dialog

**Check ConfirmDialog.tsx:**
- [ ] Component exists
- [ ] Shows modal with backdrop
- [ ] Has title, message, two buttons
- [ ] Escape key closes dialog
- [ ] Backdrop click closes dialog
- [ ] Click inside dialog keeps it open

### Functional Test

**Test dialog appearance:**
1. Click "Delete" on a todo
2. **Verify:**
   - [ ] Dialog appears
   - [ ] Dark backdrop behind it
   - [ ] Title: "Delete Todo"
   - [ ] Clear message
   - [ ] Cancel button (gray)
   - [ ] Delete button (red)

**Test cancel (button):**
1. Open dialog
2. Click "Cancel"
3. **Verify:**
   - [ ] Dialog closes
   - [ ] Todo NOT deleted

**Test cancel (backdrop):**
1. Open dialog
2. Click outside dialog (on backdrop)
3. **Verify:**
   - [ ] Dialog closes
   - [ ] Todo NOT deleted

**Test cancel (Escape):**
1. Open dialog
2. Press Escape key
3. **Verify:**
   - [ ] Dialog closes
   - [ ] Todo NOT deleted

**Test confirm:**
1. Open dialog
2. Click "Delete"
3. **Verify:**
   - [ ] Dialog closes
   - [ ] Todo deleted
   - [ ] Success toast appears

---

## 8. Visual Design

### Spacing
**Check your app layout:**
- [ ] Consistent spacing between elements
- [ ] Forms have even gaps
- [ ] Cards have consistent padding
- [ ] Page margins look professional
- [ ] No cramped or overly-spaced areas

### Hover States

**Test buttons:**
1. Hover over buttons
2. **Verify:**
   - [ ] Button lifts slightly (translateY)
   - [ ] Shadow appears or darkens
   - [ ] Color changes
   - [ ] Smooth transition (~0.2s)

**Test links:**
1. Hover over links
2. **Verify:**
   - [ ] Color changes
   - [ ] Underline appears
   - [ ] Smooth transition

**Test cards:**
1. Hover over todo cards
2. **Verify:**
   - [ ] Shadow appears
   - [ ] Border color changes
   - [ ] Smooth transition

### Shadows
**Check cards, buttons, modals:**
- [ ] Subtle shadows visible
- [ ] Not too harsh or dark
- [ ] Creates sense of depth
- [ ] Shadows darken on hover (for interactive elements)

### Typography
**Check text throughout app:**
- [ ] Headings have clear hierarchy (h1 > h2 > h3)
- [ ] Body text readable (14-16px)
- [ ] Line height comfortable (not cramped)
- [ ] Font family is professional
- [ ] Text colors have good contrast

---

## 9. Mobile Responsiveness

**Open DevTools (F12) → Toggle device toolbar (Ctrl/Cmd+Shift+M)**

### iPhone SE (375px width)
1. Set viewport to iPhone SE
2. **Verify:**
   - [ ] No horizontal scroll
   - [ ] All content visible
   - [ ] Buttons stack vertically (if multi-button forms)
   - [ ] Text readable (not too small)
   - [ ] Touch targets ≥ 44px
   - [ ] Form inputs full width
   - [ ] Spacing appropriate (not too cramped)
   - [ ] Toast notifications fit screen

### iPad (768px width)
1. Set viewport to iPad
2. **Verify:**
   - [ ] Layout adapts nicely
   - [ ] Content not too stretched
   - [ ] Spacing looks good

### Desktop (1920px width)
1. Set viewport to desktop
2. **Verify:**
   - [ ] Content centered (max-width applied)
   - [ ] Not stretched to edges
   - [ ] Looks professional

### Rotate (Portrait ↔ Landscape)
1. Test both orientations
2. **Verify:**
   - [ ] Layout adapts
   - [ ] No broken layouts
   - [ ] No overflow

---

## 10. Accessibility

### Keyboard Navigation
**Close mouse/trackpad, use only keyboard:**

1. Press Tab to navigate
2. **Verify:**
   - [ ] Can Tab to all interactive elements
   - [ ] Tab order logical (top→bottom, left→right)
   - [ ] Current focus visible (blue outline)
   - [ ] Enter activates buttons
   - [ ] Escape closes modals
   - [ ] Can navigate entire app without mouse

### Form Labels
**Check all forms:**
- [ ] All inputs have `<label>` elements
- [ ] Labels use htmlFor/id to connect to inputs
- [ ] Click label focuses input
- [ ] Labels are descriptive

### ARIA Labels
**Check icon buttons:**
- [ ] Delete button has aria-label="Delete todo"
- [ ] Edit button has aria-label="Edit todo"
- [ ] Close buttons have aria-label="Close"
- [ ] All icon-only buttons have descriptive labels

### Modal Focus
**Test ConfirmDialog:**
1. Open delete dialog
2. **Verify:**
   - [ ] Focus moves to dialog
   - [ ] Tab cycles through dialog buttons
   - [ ] Can't Tab outside dialog while open
   - [ ] Escape closes dialog
   - [ ] Focus returns to trigger button after close

### Toast Accessibility
**Check ToastContainer:**
- [ ] Has aria-live="polite" or "assertive"
- [ ] Has role="status" or "alert"
- [ ] Icons have aria-hidden="true"
- [ ] Messages announced by screen readers

### Semantic HTML
**Check page structure:**
- [ ] Uses `<main>` for main content
- [ ] Uses `<header>` for page/section headers
- [ ] Uses `<section>` for thematic grouping
- [ ] Uses `<button>` not `<div onClick>`
- [ ] Uses `<a>` for links, `<button>` for actions

### Heading Hierarchy
**Check headings:**
- [ ] h1 for page title
- [ ] h2 for major sections
- [ ] h3 for subsections
- [ ] No skipped levels (h1 → h3)
- [ ] Logical document outline

---

## 11. Browser Console

**Open DevTools Console (F12):**
- [ ] No red errors
- [ ] No yellow warnings (or only expected ones)
- [ ] No "Failed to fetch" during normal operation
- [ ] No "Permission denied" errors
- [ ] No React warnings about keys or props

---

## 12. Code Quality

### Lint
```bash
npm run lint
```

**Verify:**
- [ ] No errors
- [ ] No serious warnings
- [ ] Code formatted consistently

### TypeScript
```bash
npx tsc --noEmit
```

**Verify:**
- [ ] No type errors
- [ ] All imports resolve correctly
- [ ] No `any` types (unless necessary)

---

## 13. Understanding Check

Before moving on, make sure you understand:

- [ ] **Why loading states matter?** (Prevent confusion, double-submissions)
- [ ] **What are toast notifications?** (Non-blocking, temporary feedback)
- [ ] **Why friendly error messages?** (Users don't understand technical jargon)
- [ ] **Why confirmation dialogs?** (Prevent accidental destructive actions)
- [ ] **What makes design responsive?** (Works on all screen sizes)
- [ ] **Why accessibility matters?** (Everyone should be able to use your app)
- [ ] **What is keyboard navigation?** (Using app without mouse)
- [ ] **Why use semantic HTML?** (Provides meaning for screen readers)

If you can't answer these, review:
- [Concepts](./concepts) — UX and polish explained
- [Step 1: Understanding UX](./steps/01-understanding-ux)
- [Step 4: Understanding Feedback](./steps/04-understanding-feedback)

---

## 14. Git Commit

**Before committing:**
- [ ] All checks above pass
- [ ] App works as expected
- [ ] No console errors
- [ ] Looks professional
- [ ] Mobile responsive
- [ ] Accessible

**Check status:**
```bash
git status
```

**Stage all changes:**
```bash
git add -A
```

**Commit:**
```bash
git commit -m "Add polish and UX improvements to todo app

- Create Spinner component for loading states
- Add loading states to all async operations
- Implement toast notification system
- Add success feedback for all CRUD operations
- Create error message helper for user-friendly errors
- Add ConfirmDialog component for delete confirmations
- Improve visual design (spacing, hover states, shadows)
- Add mobile responsive layout
- Implement accessibility features (ARIA, keyboard nav, focus management)
- Ensure semantic HTML and heading hierarchy

UX improvements:
- Users always know when app is processing
- Users get confirmation for all actions
- Users see friendly errors (not technical jargon)
- Users can't accidentally delete
- App works on all screen sizes
- App is keyboard accessible
- Professional visual design"
```

**Verify commit:**
```bash
git log -1
```

---

## 15. Final Checks

**You're ready for Phase 8 if:**
- [ ] ✅ Spinner component working
- [ ] ✅ Loading states on all async operations
- [ ] ✅ Toast notification system implemented
- [ ] ✅ Success feedback for all actions
- [ ] ✅ User-friendly error messages
- [ ] ✅ Confirmation dialog before delete
- [ ] ✅ Professional visual design
- [ ] ✅ Consistent spacing and hover states
- [ ] ✅ Subtle shadows for depth
- [ ] ✅ Mobile responsive (works on phones and tablets)
- [ ] ✅ Keyboard navigation works
- [ ] ✅ ARIA labels on all interactive elements
- [ ] ✅ Focus management in modals
- [ ] ✅ Semantic HTML throughout
- [ ] ✅ No console errors
- [ ] ✅ All code committed to Git
- [ ] ✅ You understand the polish concepts

---

## 🎉 Phase 7 Complete! 🎉

**Congratulations!** You've completed all 5 slices of Phase 7: Building the App!

### What You Built

**Your app now has:**
- ✅ Complete authentication system
- ✅ Full CRUD operations
- ✅ Firestore security rules
- ✅ Professional UX with loading states
- ✅ Toast notifications
- ✅ User-friendly error handling
- ✅ Confirmation dialogs
- ✅ Beautiful visual design
- ✅ Mobile responsiveness
- ✅ Accessibility features

**This is a production-ready web application!**

### Skills Mastered

- React components and hooks
- TypeScript
- Firebase Authentication & Firestore
- Security rules
- Context API
- Custom hooks
- Error handling
- User experience design
- Responsive design
- Accessibility

### What's Next?

**Phase 8: Testing & Deploy**

Time to take your app live! You'll:
- Test thoroughly
- Deploy to Firebase Hosting
- Get a live URL
- Share with the world

**Time:** ~25 minutes

[Continue to Phase 8: Testing & Deploy →](../../phase-8-testing-and-deploy/)

---

## Troubleshooting

### Spinner Not Rotating

**Problem:** CSS animation not applied.

**Fix:**
```css
.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Toasts Not Showing

**Problem:** ToastProvider not wrapping app or ToastContainer not rendered.

**Fix:**
```tsx
<ToastProvider>
  <App />
  <ToastContainer />
</ToastProvider>
```

### "useToast must be used within ToastProvider"

**Problem:** Component using useToast is outside ToastProvider.

**Fix:** Make sure ToastProvider is at the root level, wrapping your entire app.

### Dialog Backdrop Click Closes Dialog Content Too

**Problem:** Missing `stopPropagation()`.

**Fix:**
```tsx
<div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
```

### Mobile Layout Broken

**Problem:** Missing viewport meta tag or max-width.

**Fix:**

1. Add to HTML:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

2. Add to CSS:
```css
.container {
  max-width: 100%;
}
```

### Focus Outline Not Visible

**Problem:** Using `:focus` instead of `:focus-visible`.

**Fix:**
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Ready for Deployment!

Your app is polished and ready to go live.

[Start Phase 8: Testing & Deploy →](../../phase-8-testing-and-deploy/)
