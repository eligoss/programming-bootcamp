# Step 7: Add Basic Styling

> **Time**: ~6 minutes | **Type**: Styling | **Concepts**: CSS, CSS variables, Global styles

## What We're Building

Clean, professional styling for the app skeleton. Nothing fancy — just making it look less like a raw HTML page.

## Before You Code: Understanding CSS in React

> **💡 Ask AI to Explain:**
>
> ```
> What's the difference between inline styles (style={{ }}) and CSS files?
> What are CSS variables and why are they useful?
> Where should global styles go in a React app?
> ```

**What you should learn:**
- Inline styles = `style={{ color: 'red' }}` (JavaScript object)
- CSS files = traditional `.css` files imported into components
- CSS variables = reusable values defined once, used everywhere
- Global styles typically go in `src/index.css`

## Let's Build It

### Prompt: Add Global Styles

```
Add professional-looking base styles to my React app.

In src/index.css, add:
1. CSS reset (remove default margins/padding)
2. Set a clean system font stack
3. Define CSS variables for colors (so they're easy to change later)
4. Style the navigation (horizontal layout, good spacing, hover effects)
5. Style the main content area (centered, max-width, good padding)

Keep it simple and clean — nothing overly fancy.

After adding styles, explain:
- Why we use CSS variables
- How the navigation styles work
- Why a max-width on content is good UX
```

**What to expect:**
- Updated `src/index.css` with base styles
- CSS variables for colors
- Navigation styling
- Content area styling
- Explanation of styling choices

**Files you'll modify:**
- `src/index.css`

## Understanding What You Built

> **💡 Ask AI to Explain:**
>
> ```
> Walk me through the CSS you added:
>
> 1. What does the CSS reset do and why is it needed?
> 2. Explain the CSS variables — how do I use them?
> 3. What do the navigation styles accomplish?
> 4. Why limit content width with max-width?
> ```

**Key concepts:**
- CSS reset = removes browser default styles for consistency
- CSS variables = `--color-primary: blue` defined once, used with `var(--color-primary)`
- Navigation styles = flexbox for horizontal layout, hover states for feedback
- Max-width = prevents super-wide text lines on large screens (better readability)

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Check base styles:**
   - No weird margins/padding around edges
   - Font looks clean and readable
   - Overall appearance is professional

3. **Test navigation:**
   - Links are horizontal (side by side)
   - Good spacing between links
   - Hover over links — should see some visual change
   - Links look clickable (cursor changes)

4. **Check content area:**
   - Content is not stretched edge-to-edge
   - Has reasonable max-width on wide screens
   - Good padding around text

5. **Test on different screen sizes:**
   - Resize browser window
   - Should look reasonable at different widths
   - Navigation should not break

### Checklist:

- [ ] CSS reset applied (no default margins)
- [ ] Font looks clean and professional
- [ ] Navigation styled horizontally
- [ ] Links have hover effects
- [ ] Content has max-width and centering
- [ ] No visual glitches
- [ ] App looks presentable

## Common Issues

### Styles not applying

**Problem:** CSS file not imported

**Fix:** Check `src/main.tsx` has:
```typescript
import './index.css';
```

### Navigation still vertical (stacked)

**Problem:** Missing flexbox or incorrect CSS selector

**Fix:**
```css
nav {
  display: flex;
  gap: 1rem;
}
```

### CSS variables not working

**Problem:** Forgot to define in `:root` or wrong syntax

**Fix:**
```css
/* Define in :root */
:root {
  --color-primary: #007bff;
}

/* Use with var() */
a {
  color: var(--color-primary);
}
```

### Content still edge-to-edge

**Problem:** Missing max-width or centering

**Fix:**
```css
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
```

### Styles look different in different browsers

**Problem:** This is normal without a CSS reset

**Fix:** Make sure your CSS starts with:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## Code Example

Your `src/index.css` might look like:

```css
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* CSS Variables */
:root {
  --color-primary: #007bff;
  --color-text: #333;
  --color-background: #fff;
  --color-border: #ddd;
}

/* Base Styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--color-text);
  background-color: var(--color-background);
}

/* Navigation */
nav {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: var(--color-primary);
}

/* Main Content */
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Headings */
h1 {
  margin-bottom: 1rem;
  color: var(--color-text);
}
```

## What You Learned

At this point you should understand:
- ✅ How to add global styles in React
- ✅ What CSS variables are and why they're useful
- ✅ Basic layout patterns (flexbox, centering, max-width)
- ✅ Why CSS resets are important

## Next Step

App skeleton complete! Let's verify everything works and commit our progress:

[Step 8: Verification & Commit →](./08-verification-commit)
