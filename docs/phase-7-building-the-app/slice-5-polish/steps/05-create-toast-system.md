# Step 5: Create Toast System

> **Time**: ~10 minutes | **Type**: Component | **Concepts**: React Context, custom hooks, toast notifications

## What We're Building

A complete toast notification system with:
- ToastContext and ToastProvider for global state
- Toast component with auto-dismiss
- useToast hook for easy usage
- Support for success, error, and info messages

## The Prompt for AI

> **💡 Ask AI to help you create the toast system:**
>
> ```
> I need a complete toast notification system for React + TypeScript.
>
> Requirements:
> 1. ToastContext with React Context API
> 2. ToastProvider component to wrap the app
> 3. Toast component that displays messages
> 4. useToast hook for easy usage: showToast(message, type)
> 5. Support for success, error, info types
> 6. Auto-dismiss after 3-5 seconds
> 7. Toasts stack vertically
> 8. Click to dismiss early
> 9. Simple CSS styling (green for success, red for error, blue for info)
>
> Can you provide:
> 1. src/contexts/ToastContext.tsx (context + provider)
> 2. src/components/Toast.tsx (toast component)
> 3. src/hooks/useToast.ts (custom hook)
> 4. CSS for toast styling
> 5. How to wrap my app with ToastProvider
> ```

**Wait for AI's response, then implement the files.**

## Part 1: Create Toast Context

**Create file:** `src/contexts/ToastContext.tsx`

**AI should give you something like this:**

```tsx
// src/contexts/ToastContext.tsx
import { createContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  dismissToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-dismiss after delay
    const duration = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}
```

## Part 2: Create Toast Component

**Create file:** `src/components/Toast.tsx`

```tsx
// src/components/Toast.tsx
import { useContext } from 'react';
import { ToastContext, Toast as ToastType } from '../contexts/ToastContext';

export function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');

  const { toasts, dismissToast } = context;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => dismissToast(toast.id)}
        >
          <span className="toast-icon">
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

## Part 3: Create useToast Hook

**Create file:** `src/hooks/useToast.ts`

```tsx
// src/hooks/useToast.ts
import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
```

## Part 4: Add Toast CSS

**Add to your main CSS file** (e.g., `src/index.css`):

```css
/* Toast Container */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

/* Individual Toast */
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  max-width: 400px;
  cursor: pointer;
  pointer-events: auto;
  animation: slideIn 0.3s ease-out;
}

/* Toast Types */
.toast-success {
  border-left: 4px solid #10b981;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

/* Toast Icon */
.toast-icon {
  font-size: 20px;
  flex-shrink: 0;
}

/* Toast Message */
.toast-message {
  flex: 1;
  font-size: 14px;
  color: #1f2937;
}

/* Slide-in Animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## Part 5: Wrap App with ToastProvider

**Update your main App file** (e.g., `src/App.tsx` or `src/main.tsx`):

```tsx
// src/App.tsx
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      {/* Your existing app content */}
      <Router>
        {/* Routes... */}
      </Router>

      {/* Add ToastContainer at the end */}
      <ToastContainer />
    </ToastProvider>
  );
}
```

**Key points:**
- Wrap entire app with `<ToastProvider>`
- Add `<ToastContainer />` inside provider (renders toasts)
- ToastContainer should be outside Router so it's always visible

## Part 6: Test the Toast System

**Create a test page or add to any component:**

```tsx
import { useToast } from '../hooks/useToast';

function TestPage() {
  const { showToast } = useToast();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Toast Test</h2>

      <button onClick={() => showToast('Todo created!', 'success')}>
        Show Success
      </button>

      <button onClick={() => showToast('Title is required', 'error')}>
        Show Error
      </button>

      <button onClick={() => showToast('Changes saved automatically', 'info')}>
        Show Info
      </button>
    </div>
  );
}
```

## Verification

**Test each toast type:**

### Test 1: Success Toast
1. Click "Show Success"
2. **Expected:**
   - [ ] Green toast appears top-right
   - [ ] Shows ✅ icon
   - [ ] Message: "Todo created!"
   - [ ] Auto-dismisses after ~3 seconds
   - [ ] Can click to dismiss early

### Test 2: Error Toast
1. Click "Show Error"
2. **Expected:**
   - [ ] Red toast appears
   - [ ] Shows ❌ icon
   - [ ] Message: "Title is required"
   - [ ] Auto-dismisses after ~5 seconds

### Test 3: Info Toast
1. Click "Show Info"
2. **Expected:**
   - [ ] Blue toast appears
   - [ ] Shows ℹ️ icon
   - [ ] Auto-dismisses after ~3 seconds

### Test 4: Multiple Toasts
1. Click all three buttons quickly
2. **Expected:**
   - [ ] All three toasts appear
   - [ ] Stack vertically
   - [ ] Dismiss in order they appeared
   - [ ] No overlap

### Test 5: Click to Dismiss
1. Show a toast
2. Click on it before auto-dismiss
3. **Expected:**
   - [ ] Toast disappears immediately
   - [ ] No errors in console

## Common Issues

### "useToast must be used within ToastProvider"

**Problem:** Component using `useToast` is outside ToastProvider.

**Fix:** Make sure ToastProvider wraps your entire app:
```tsx
<ToastProvider>
  <App />
  <ToastContainer />
</ToastProvider>
```

### Toasts Not Appearing

**Problem:** ToastContainer not rendered or CSS not loaded.

**Fix:**
- Check `<ToastContainer />` is inside ToastProvider
- Check CSS is imported
- Check browser DevTools for positioning

### Toasts Not Auto-Dismissing

**Problem:** setTimeout not working.

**Fix:** Check the `showToast` function has setTimeout:
```tsx
setTimeout(() => {
  dismissToast(id);
}, duration);
```

### Toasts Overlapping

**Problem:** CSS gap not working.

**Fix:** Make sure `.toast-container` has:
```css
display: flex;
flex-direction: column;
gap: 10px;
```

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **Why use React Context for toasts?** (Global access, any component can show toasts)
> 2. **How does auto-dismiss work?** (setTimeout in showToast)
> 3. **Why different durations for error vs success?** (Errors need more time to read)
> 4. **How do toasts stack vertically?** (flex-direction: column with gap)
> 5. **Why wrap entire app with ToastProvider?** (So all components can access useToast)

## What You Learned

At this point you should have:
- ✅ ToastContext created (global toast state)
- ✅ ToastProvider wrapping your app
- ✅ Toast component rendering notifications
- ✅ useToast hook for easy access
- ✅ Support for success, error, info types
- ✅ Auto-dismiss functionality
- ✅ Click-to-dismiss functionality
- ✅ Styled toasts with different colors
- ✅ Working toast system tested

## Next Step

Now that we have a toast system, let's add success feedback to all CRUD operations:

[Step 6: Add Success Feedback →](./06-add-success-feedback)
