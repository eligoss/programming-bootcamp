# Slice 1 Prompts

> Example prompts for building the app skeleton

## Before You Start

Make sure:
- [ ] Your dev server runs (`npm run dev`)
- [ ] react-router-dom is installed
- [ ] You have the folder structure from Phase 5

## Prompt 1: Set Up React Router

```
Set up React Router in my React + TypeScript app.

I need these routes:
- / → HomePage
- /login → LoginPage
- /register → RegisterPage
- /dashboard → DashboardPage

Create:
1. Update App.tsx to use BrowserRouter and Routes
2. Create placeholder page components in src/pages/

Each page should just show a heading with the page name for now.

Show me the full code for App.tsx and the page components.
```

### What to Expect

AI will provide:
- Modified `App.tsx` with router setup
- Four page component files
- Basic structure for each

### After Running

Verify:
- No errors in console
- Can manually change URL to each route
- Each shows different content

---

## Prompt 2: Add Navigation Component

```
Create a Navigation component for my React app.

Requirements:
- Links to: Home (/), Login (/login), Register (/register), Dashboard (/dashboard)
- Use React Router's Link component, not <a> tags
- Simple horizontal layout
- Show current page somehow (different styling for active link)

Put it in src/components/Layout/Navigation.tsx

Then show me how to include it in each page (or in a layout).
```

### What to Expect

AI will provide:
- Navigation component with Links
- Styling for active state
- Instructions to add to pages

### After Running

Verify:
- Navigation appears on every page
- Clicking links changes URL and content
- No page reload on navigation

---

## Prompt 3: Add Basic Layout

```
Create a Layout component that wraps all pages with:
1. The Navigation at the top
2. A main content area
3. Simple CSS for basic spacing

Put it in src/components/Layout/Layout.tsx

Then update App.tsx to wrap all routes with this Layout.
```

### What to Expect

- Layout component with children prop
- CSS for basic structure
- Updated App.tsx

### After Running

Verify:
- Consistent layout across all pages
- Navigation always visible
- Content area properly spaced

---

## Prompt 4: Add Basic Styling

```
Add basic CSS styling to my app:

1. Reset default margins/padding
2. Set a system font
3. Style the navigation (horizontal, clean)
4. Style the main content area (centered, max-width)
5. Use CSS variables for colors so they're easy to change

Put styles in src/index.css
```

### What to Expect

- Clean CSS with variables
- Reasonable default styling
- Nothing fancy, just professional basics

---

## Common Issues and Fixes

### "Module not found: react-router-dom"

```
npm install react-router-dom
```

### "Link is not defined"

Make sure you import it:
```typescript
import { Link } from 'react-router-dom';
```

### Routes don't match

Check that:
- BrowserRouter wraps everything
- Routes are inside Routes component
- Paths start with `/`

### Page shows blank

Check the console for errors. Usually:
- Missing export
- Typo in component name
- Missing return statement

---

## Verification Checklist

Before committing:

- [ ] `npm run dev` shows no errors
- [ ] Home page loads at `/`
- [ ] All four pages accessible
- [ ] Navigation links work
- [ ] URL changes when clicking links
- [ ] No console errors
- [ ] `npm run lint` passes

---

## Commit

```bash
git add .
git commit -m "Add app skeleton with routing and navigation"
git push
```

---

[Start Slice 2: Authentication →](../slice-2-authentication/)
