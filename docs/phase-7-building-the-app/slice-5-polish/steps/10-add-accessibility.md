# Step 10: Add Accessibility

> **Time**: ~5 minutes | **Type**: A11y | **Concepts**: ARIA labels, keyboard navigation, screen readers

## What We're Building

Basic accessibility improvements so your app works for everyone:
- ARIA labels for screen readers
- Proper heading hierarchy
- Keyboard navigation support
- Focus management
- Semantic HTML

## The Prompt for AI

> **💡 Ask AI to help you improve accessibility:**
>
> ```
> I want to make my todo app more accessible for people using screen readers and keyboard navigation.
>
> Current issues:
> - Some buttons have no text (just icons)
> - Form inputs missing labels
> - No ARIA labels where needed
> - Modals don't trap focus
> - Headings might not have proper hierarchy
>
> Can you show me:
> 1. Where to add ARIA labels (aria-label, aria-labelledby)
> 2. How to ensure all inputs have labels
> 3. How to manage focus when opening/closing modals
> 4. How to make icon buttons accessible
> 5. How to test with keyboard navigation
>
> Specific components to check:
> - Delete button (might be just an "X")
> - Form inputs
> - ConfirmDialog modal
> - Toast notifications
> ```

**Wait for AI's response, then apply the changes.**

## Part 1: Add Labels to Form Inputs

**Every input needs a label:**

### Before (missing labels):
```tsx
<input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter title"
/>
```

### After (with label):
```tsx
<label htmlFor="title-input">
  Title
</label>
<input
  id="title-input"
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter title"
  aria-required="true"
/>
```

**Why:**
- Screen readers announce: "Title, required, edit text"
- Clicking label focuses input
- `htmlFor` connects label to input

**Apply to all inputs in your forms.**

## Part 2: Add ARIA Labels to Icon Buttons

**Buttons with just icons need text alternatives:**

### Before (screen reader says nothing useful):
```tsx
<button onClick={handleDelete}>
  X
</button>
```

### After (screen reader says "Delete todo"):
```tsx
<button
  onClick={handleDelete}
  aria-label="Delete todo"
>
  X
</button>
```

**For all icon buttons:**
- Edit button: `aria-label="Edit todo"`
- Delete button: `aria-label="Delete todo"`
- Close button: `aria-label="Close"`
- Menu button: `aria-label="Open menu"`

## Part 3: Improve Modal Focus Management

**When modal opens, focus should move to it:**

### Update ConfirmDialog Component:

```tsx
import { useEffect, useRef } from 'react';

export function ConfirmDialog({ isOpen, onConfirm, onCancel, ... }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Manage focus when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus dialog
      dialogRef.current?.focus();

      return () => {
        // Restore focus when closing
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 id="dialog-title" className="modal-title">
          {title}
        </h2>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button onClick={onCancel} aria-label="Cancel deletion">
            {cancelText}
          </button>
          <button onClick={onConfirm} aria-label="Confirm deletion">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Key accessibility features:**
- `role="dialog"` — Tells screen readers it's a dialog
- `aria-modal="true"` — Indicates modal behavior
- `aria-labelledby` — Connects title to dialog
- Focus management — Moves focus in/out properly

## Part 4: Add Heading Hierarchy

**Ensure headings follow proper order (h1 → h2 → h3):**

```tsx
// Page structure should be:
<main>
  <h1>My Todos</h1>          {/* Page title */}

  <section>
    <h2>Active Todos</h2>     {/* Section heading */}
    {/* Todo list */}
  </section>

  <section>
    <h2>Completed</h2>
    {/* Completed todos */}
  </section>
</main>
```

**Don't skip heading levels:**
- ❌ h1 → h3 (skips h2)
- ✅ h1 → h2 → h3

## Part 5: Add ARIA Live Regions for Toasts

**Make toast announcements accessible:**

### Update ToastContainer:

```tsx
export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => dismissToast(toast.id)}
          role="alert"
          aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
        >
          <span className="toast-icon" aria-hidden="true">
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
```

**What this does:**
- `aria-live="polite"` — Screen reader announces when not busy
- `aria-live="assertive"` — Screen reader announces errors immediately
- `role="alert"` — Indicates important message
- `aria-hidden="true"` — Hides icon emoji from screen reader (message is enough)

## Part 6: Semantic HTML

**Use semantic elements instead of divs:**

### Before (all divs):
```tsx
<div className="page">
  <div className="header">
    <div className="title">My Todos</div>
  </div>
  <div className="content">
    {/* Todos */}
  </div>
</div>
```

### After (semantic):
```tsx
<main className="page">
  <header className="header">
    <h1>My Todos</h1>
  </header>
  <section className="content">
    {/* Todos */}
  </section>
</main>
```

**Semantic elements:**
- `<main>` — Main content
- `<header>` — Page/section header
- `<nav>` — Navigation links
- `<section>` — Thematic grouping
- `<article>` — Independent content
- `<aside>` — Sidebar content
- `<footer>` — Page/section footer

## Verification Checklist

**Test accessibility improvements:**

### Test 1: Keyboard Navigation
1. Close mouse/trackpad
2. Use only Tab, Enter, Escape, Arrow keys
3. **Expected:**
   - [ ] Can navigate to all interactive elements
   - [ ] Tab order makes sense (top to bottom, left to right)
   - [ ] Enter activates buttons
   - [ ] Escape closes modals
   - [ ] Current focus always visible (blue outline)

### Test 2: Form Labels
1. Click on a form label
2. **Expected:**
   - [ ] Input focuses
   - [ ] Label and input clearly connected

3. Navigate to input with Tab
4. **Expected:**
   - [ ] Screen reader (if available) announces label

### Test 3: Icon Button Labels
1. Tab to delete button (X)
2. **Expected:**
   - [ ] Screen reader announces: "Delete todo, button"
   - [ ] Not just: "X, button"

### Test 4: Modal Focus
1. Open delete confirmation dialog
2. **Expected:**
   - [ ] Focus moves to dialog
   - [ ] Can Tab through dialog buttons
   - [ ] Tab doesn't escape dialog while open
   - [ ] Escape closes dialog
   - [ ] Focus returns to delete button after closing

### Test 5: Heading Hierarchy
1. Use browser extension (e.g., HeadingsMap)
2. Or inspect with DevTools
3. **Expected:**
   - [ ] h1 at page level
   - [ ] h2 for major sections
   - [ ] No skipped levels
   - [ ] Logical document outline

### Test 6: Screen Reader Test (Optional)
If you have access to a screen reader:

**Windows:** NVDA (free)
**Mac:** VoiceOver (built-in, Cmd+F5)

1. Turn on screen reader
2. Navigate your app with Tab
3. **Expected:**
   - [ ] All content announced
   - [ ] Button labels clear
   - [ ] Form inputs have labels
   - [ ] Headings announced with level
   - [ ] Toast messages announced

## Quick Accessibility Checklist

**Before moving on, verify:**

- [ ] All inputs have `<label>` elements
- [ ] Icon buttons have `aria-label`
- [ ] Modals have `role="dialog"` and `aria-modal="true"`
- [ ] Modals manage focus (move focus in, restore on close)
- [ ] Headings follow h1 → h2 → h3 order
- [ ] Toast notifications have `aria-live`
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible (blue outline)
- [ ] Semantic HTML used (`<main>`, `<section>`, etc.)
- [ ] Color not sole indicator of meaning (have icons/text too)

## Common Issues

### Can't Tab to Element

**Problem:** Element not focusable.

**Fix:** Use semantic elements (`<button>`, `<a>`, `<input>`), not `<div>` with `onClick`.

```tsx
// NOT accessible
<div onClick={handleClick}>Click me</div>

// ACCESSIBLE
<button onClick={handleClick}>Click me</button>
```

### Focus Not Visible

**Problem:** Missing focus styles.

**Fix:** Add focus-visible styles:
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Screen Reader Not Announcing

**Problem:** Missing ARIA label or label element.

**Fix:**
```tsx
// For buttons with just icons
<button aria-label="Delete todo">X</button>

// For inputs
<label htmlFor="title">Title</label>
<input id="title" />
```

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **Why do inputs need labels?** (Screen readers announce them, improves UX)
> 2. **What does aria-label do?** (Provides text alternative for screen readers)
> 3. **Why manage focus in modals?** (Screen reader users need to know where they are)
> 4. **What's the purpose of semantic HTML?** (Provides meaning, helps screen readers)
> 5. **Why use role="alert" for toasts?** (Announces important messages to screen readers)
> 6. **Can I test accessibility without a screen reader?** (Yes, with keyboard-only navigation)

## What You Learned

At this point you should have:
- ✅ Labels on all form inputs
- ✅ ARIA labels on icon buttons
- ✅ Focus management in modals
- ✅ Proper heading hierarchy
- ✅ ARIA live regions for toasts
- ✅ Semantic HTML elements
- ✅ Full keyboard navigation support
- ✅ Visible focus indicators
- ✅ Basic accessibility compliance

## Next Step

Final step! Let's do comprehensive verification and commit all your polish work:

[Step 11: Verification & Commit →](./11-verification-commit)
