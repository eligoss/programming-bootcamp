# Slice 1 Verification Checklist

> **Use this checklist before moving to Slice 2**

This is your final quality check. Work through each section carefully. If anything fails, go back and fix it before proceeding.

## Quick Links

If you find issues, these steps can help:
- [Step 3: Setup Routes](./steps/03-setup-routes) — Route configuration
- [Step 5: Create Navigation](./steps/05-create-navigation) — Navigation component
- [Step 6: Create Layout](./steps/06-create-layout) — Layout structure
- [Step 7: Add Styling](./steps/07-add-styling) — CSS styling

---

## 1. File Structure

```
src/
├── components/
│   └── Layout/
│       ├── Layout.tsx
│       └── Navigation.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

**Verify:**
- [ ] All files exist in correct locations
- [ ] Folders named exactly as shown (case-sensitive)
- [ ] All React components use `.tsx` extension

---

## 2. Development Server

```bash
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] Terminal shows "Local: http://localhost:5173/"
- [ ] No red error messages in terminal
- [ ] Opening browser to localhost:5173 loads the app
- [ ] Browser console (F12) shows no errors

**Common error:** If server won't start, try:
```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 3. All Routes Load

Manually type these URLs into your browser:

**`http://localhost:5173/`**
- [ ] HomePage loads
- [ ] Shows heading like "Home" or "Home Page"
- [ ] Navigation visible at top
- [ ] No console errors

**`http://localhost:5173/login`**
- [ ] LoginPage loads
- [ ] Shows heading like "Login" or "Login Page"
- [ ] Navigation visible at top
- [ ] No console errors

**`http://localhost:5173/register`**
- [ ] RegisterPage loads
- [ ] Shows heading like "Register" or "Register Page"
- [ ] Navigation visible at top
- [ ] No console errors

**`http://localhost:5173/dashboard`**
- [ ] DashboardPage loads
- [ ] Shows heading like "Dashboard" or "Dashboard Page"
- [ ] Navigation visible at top
- [ ] No console errors

---

## 4. Navigation Component

**Verify:**
- [ ] Navigation appears on **every** page
- [ ] Shows four links: Home, Login, Register, Dashboard
- [ ] Links are horizontal (side by side, not stacked)
- [ ] Links have good spacing between them
- [ ] Hovering over links shows visual feedback (color change, underline, etc.)
- [ ] Cursor changes to pointer on hover

**Common issue:** If navigation is vertical (stacked), check CSS:
```css
nav {
  display: flex;
  gap: 1rem;
}
```

---

## 5. Link Clicks Work

Start at home page (`/`), then click each link:

**Click "Home" link:**
- [ ] URL changes to `/`
- [ ] HomePage content shows
- [ ] Page did NOT reload (no white flash)

**Click "Login" link:**
- [ ] URL changes to `/login`
- [ ] LoginPage content shows
- [ ] Page did NOT reload

**Click "Register" link:**
- [ ] URL changes to `/register`
- [ ] RegisterPage content shows
- [ ] Page did NOT reload

**Click "Dashboard" link:**
- [ ] URL changes to `/dashboard`
- [ ] DashboardPage content shows
- [ ] Page did NOT reload

**Critical:** If the page reloads (white flash), you're using `<a>` tags instead of `<Link>`. Fix this!

---

## 6. Component Structure

**Layout wraps Routes:**

In `App.tsx`, structure should be:
```typescript
<BrowserRouter>
  <Layout>
    <Routes>
      <Route ... />
    </Routes>
  </Layout>
</BrowserRouter>
```

**Verify:**
- [ ] BrowserRouter is the outermost component
- [ ] Layout wraps Routes
- [ ] All Route components are inside Routes
- [ ] Each Route has `path` and `element` props

**Layout uses children:**

In `Layout.tsx`, should render:
```typescript
<div>
  <Navigation />
  <main>{children}</main>
</div>
```

**Verify:**
- [ ] Layout imports Navigation
- [ ] Layout renders Navigation
- [ ] Layout renders {children}
- [ ] Layout accepts children prop with type `React.ReactNode`

**Pages are clean:**

Page files should NOT import Navigation directly:

```typescript
// Bad - don't do this
import Navigation from '../components/Layout/Navigation';

// Good - just the page content
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
```

**Verify:**
- [ ] Page files don't import Navigation
- [ ] Page files only contain page-specific content
- [ ] Each page exports a default function component

---

## 7. Styling

**Verify:**
- [ ] No default browser margins (page content not touching edges)
- [ ] Font is clean and readable (not Times New Roman)
- [ ] Navigation has background or border styling
- [ ] Navigation links have hover effects
- [ ] Main content has padding
- [ ] Content has max-width (not stretched on wide screens)
- [ ] Overall appearance is professional

**Test responsive behavior:**
- [ ] Resize browser to narrow width
- [ ] Navigation still works
- [ ] Content remains readable
- [ ] Nothing breaks or overlaps

---

## 8. Code Quality

Run linter:

```bash
npm run lint
```

**Verify:**
- [ ] No errors
- [ ] No warnings (or only minor warnings you can ignore)

**Common linting errors to fix:**
- Unused imports -> remove them
- Missing semicolons -> add them
- `any` types -> replace with specific types

---

## 9. TypeScript Types

**Verify Layout props:**

```typescript
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // ...
}
```

**Check:**
- [ ] Layout component has typed props
- [ ] children is typed as `React.ReactNode`
- [ ] No TypeScript errors in any file

Run type check:
```bash
npx tsc --noEmit
```

Should show no errors.

---

## 10. Understanding Check

Before moving on, make sure you can answer these:

- [ ] **What is React Router?** (Library for client-side routing in SPAs)
- [ ] **What does BrowserRouter do?** (Provides routing context to the app)
- [ ] **Why use Link instead of `<a>`?** (Prevents page reload, keeps app state)
- [ ] **What is the children prop?** (Content passed between opening and closing tags)
- [ ] **Why create a Layout component?** (Avoid repeating Navigation on every page)
- [ ] **What is component composition?** (Building UIs by nesting components)

If you can't answer these, review:
- [Concepts](./concepts) — Core explanations
- [Step 1](./steps/01-understanding-routing) — Routing fundamentals

---

## 11. Git Commit

**Before committing:**
- [ ] All checks above pass
- [ ] App runs without errors
- [ ] All features work as expected

**Check status:**
```bash
git status
```

**Stage changes:**
```bash
git add src/
```

**Commit:**
```bash
git commit -m "Add app skeleton with routing and navigation

- Set up React Router with BrowserRouter
- Create four pages: Home, Login, Register, Dashboard
- Add Navigation component with Links
- Create Layout component for consistent structure
- Add base CSS styling"
```

**Verify commit:**
```bash
git log -1
```

Should show your commit message.

---

## 12. Final Checks

**You're ready for Slice 2 if:**
- [ ] ✅ All routes work
- [ ] ✅ Navigation works on all pages
- [ ] ✅ No page reloads when clicking links
- [ ] ✅ App looks styled and professional
- [ ] ✅ No console errors
- [ ] ✅ No linting errors
- [ ] ✅ All code committed to Git
- [ ] ✅ You understand what you built

---

## Troubleshooting

### Everything is broken after making changes

**Quick fix:**
1. Stop dev server (Ctrl+C)
2. Delete `node_modules/` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Restart server:
   ```bash
   npm run dev
   ```

### Routes work but navigation doesn't show

**Check:**
- Layout component renders Navigation
- Layout wraps Routes in App.tsx
- Navigation component exports default

### Links reload the page

**Fix:** Replace all `<a href="...">` with:
```typescript
import { Link } from 'react-router-dom';

<Link to="/path">Text</Link>
```

### TypeScript errors everywhere

**Check:**
- All component files use `.tsx` extension
- Props are properly typed
- Imports are correct

Run:
```bash
npx tsc --noEmit
```

To see all type errors.

---

## Next Steps

If all checks pass, you're ready to move on!

**What you accomplished:**
- ✅ Built a working React app skeleton
- ✅ Implemented client-side routing
- ✅ Created reusable components
- ✅ Applied professional styling
- ✅ Organized code properly
- ✅ Committed to Git

**Next slice:**

[Slice 2: Authentication ->](../../slice-2-authentication/)

In Slice 2, you'll add Firebase Authentication so users can sign up, log in, and log out.
