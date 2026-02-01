# Step 2: Create Spinner

> **Time**: ~5 minutes | **Type**: Component | **Concepts**: CSS animations, loading indicators

## What We're Building

A reusable Spinner component using CSS animations. This spinner will show users that the app is working on their request.

## The Prompt for AI

> **💡 Ask AI to help you create the spinner:**
>
> ```
> I need a simple CSS-only Spinner component for React + TypeScript.
>
> Requirements:
> - A circular spinner with rotating animation
> - Accepts optional size prop (default: 20px)
> - Accepts optional color prop (default: current text color)
> - Uses CSS @keyframes for animation
> - Inline (doesn't take full width)
> - Smooth rotation animation
>
> Can you create:
> 1. src/components/Spinner.tsx component
> 2. CSS for the rotating animation
>
> Keep it simple and CSS-only (no SVG libraries).
> ```

**Wait for AI's response, then read through the code to understand it.**

## Part 1: Create Spinner Component

**Create file:** `src/components/Spinner.tsx`

**AI should give you something like this (your version may vary):**

```tsx
// src/components/Spinner.tsx
interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 20, color = 'currentColor' }: SpinnerProps) {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent transparent transparent`,
      }}
    />
  );
}
```

## Part 2: Add CSS Animation

**Add to your main CSS file** (e.g., `src/index.css` or `src/App.css`):

```css
/* Spinner animation */
.spinner {
  border: 2px solid;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

**What this does:**
- `.spinner` creates a circular border
- `border-radius: 50%` makes it a circle
- `animation: spin 0.8s linear infinite` rotates it continuously
- `@keyframes spin` defines the rotation from 0° to 360°

## Part 3: Understanding the Code

Ask AI to explain the implementation:

> **💡 Ask AI:**
>
> ```
> Can you explain how this spinner works?
> 1. How does the border create the spinner shape?
> 2. What does border-radius: 50% do?
> 3. How does the animation work?
> 4. What does 'currentColor' mean for the color prop?
> 5. Why use linear instead of ease for the animation timing?
> ```

**What you should understand:**
- Border creates the circular outline
- Three sides transparent, one side colored (creates the arc)
- `border-radius: 50%` makes square into circle
- `currentColor` inherits text color from parent
- `linear` timing makes constant rotation speed
- `infinite` makes it loop forever

## Part 4: Test the Spinner

Create a quick test page to see your spinner:

**Temporary test in your App.tsx or any page:**

```tsx
import { Spinner } from './components/Spinner';

// Add this temporarily to test
<div style={{ padding: '20px' }}>
  <h3>Spinner Test</h3>

  {/* Default spinner */}
  <div style={{ marginBottom: '10px' }}>
    Default: <Spinner />
  </div>

  {/* Large spinner */}
  <div style={{ marginBottom: '10px' }}>
    Large: <Spinner size={40} />
  </div>

  {/* Colored spinner */}
  <div style={{ marginBottom: '10px' }}>
    Blue: <Spinner size={30} color="blue" />
  </div>

  {/* In a button (shows currentColor) */}
  <button style={{ color: 'white', background: 'green', padding: '10px' }}>
    <Spinner /> Loading...
  </button>
</div>
```

## Verification

**Check that:**
- [ ] Spinner appears and rotates smoothly
- [ ] Default size is small (~20px)
- [ ] Large spinner is bigger
- [ ] Colored spinner shows in blue
- [ ] Spinner in button inherits button text color (white)
- [ ] Animation is smooth (not choppy)
- [ ] No console errors

**If spinner doesn't appear:**
- Check that CSS is imported
- Check browser DevTools for CSS errors
- Make sure component is exported correctly

**If animation is choppy:**
- Change animation timing to `0.6s` or `1s`
- Try `ease-in-out` instead of `linear`

## Common Issues

### Spinner Not Visible

**Problem:** CSS not imported or selector not matching.

**Fix:**
- Make sure you added CSS to your main stylesheet
- Check that className="spinner" matches .spinner in CSS
- Try adding `border-width: 3px` to make it more visible

### Animation Not Smooth

**Problem:** Browser performance or timing.

**Fix:**
```css
.spinner {
  /* Add these for better performance */
  will-change: transform;
  animation: spin 0.8s linear infinite;
}
```

### Spinner Too Big/Small

**Problem:** Size prop not working.

**Fix:** Make sure you're using inline style for size:
```tsx
style={{
  width: size,
  height: size,
}}
```

## Understanding Check

Before moving on, make sure you understand:

> **💡 Ask yourself:**
>
> 1. **How does CSS @keyframes create animation?** (Defines states from 0% to 100%)
> 2. **Why use infinite for animation?** (Makes it loop continuously)
> 3. **What makes the spinner a circle?** (border-radius: 50%)
> 4. **Why is one border side transparent?** (Creates the arc shape)
> 5. **Can I use this spinner in buttons?** (Yes, it's inline)

## What You Learned

At this point you should have:
- ✅ Spinner component created (src/components/Spinner.tsx)
- ✅ CSS animation keyframes added
- ✅ Tested spinner with different sizes and colors
- ✅ Understanding of how CSS animations work
- ✅ Reusable component ready to use in your app

## Next Step

Now that we have a spinner, let's add loading states to all async operations in your app:

[Step 3: Add Loading States →](./03-add-loading-states)
