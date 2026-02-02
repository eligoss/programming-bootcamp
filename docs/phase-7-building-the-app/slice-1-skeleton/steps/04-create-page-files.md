# Step 4: Create Page Files

> **Time**: ~7 minutes | **Type**: Coding | **Concepts**: File organization, Exports, Imports

## What We're Building

Moving page components out of `App.tsx` into their own files in a `src/pages/` directory. This keeps code organized and maintainable.

## Before You Code: Understanding File Organization

> **💡 Ask AI:**
>
> ```
> Why do we split components into separate files instead of keeping everything in App.tsx?
> What's the difference between "export default" and "export"?
> How do imports work in JavaScript/TypeScript?
> ```

**What you should learn:**
- One component per file = easier to find and maintain
- File names match component names (HomePage.tsx contains HomePage)
- `export default` lets you import the component elsewhere
- `import` brings components from other files

## Let's Build It

### Prompt: Create Page Component Files

```
I currently have inline page components in App.tsx.

Create separate files for each page in src/pages/:
- HomePage.tsx
- LoginPage.tsx
- RegisterPage.tsx
- DashboardPage.tsx

Each page should:
- Export a default function component
- Return JSX with a heading showing the page name
- Use TypeScript (with .tsx extension)

Then update App.tsx to:
- Import these components
- Add routes for all four pages:
  - / → HomePage
  - /login → LoginPage
  - /register → RegisterPage
  - /dashboard → DashboardPage

After creating the code, explain the import/export pattern you used.
```

**What to expect:**
- Four new files in `src/pages/`
- Updated `App.tsx` with imports and all routes
- Explanation of how imports/exports work

**Files you'll create:**
- `src/pages/HomePage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/DashboardPage.tsx`

**Files you'll modify:**
- `src/App.tsx`

## Understanding What You Built

After AI creates the files, make sure you understand the structure:

> **💡 Ask AI to Explain:**
>
> ```
> Explain the file organization you just created:
>
> 1. Why do we put pages in a pages/ folder?
> 2. Show me the export statement in one of the page files — what does "export default" mean?
> 3. Show me the import statement in App.tsx — how does it find the file?
> 4. What happens if I rename HomePage.tsx to Home.tsx? What breaks?
> ```

**Key concepts:**
- **File paths in imports:** `'./pages/HomePage'` means "look in the pages folder"
- **Default exports:** Each file exports one main thing
- **Import names:** `import HomePage from './pages/HomePage'` — the name on the left must match the component
- **Extensions optional:** You can write `'./pages/HomePage'` or `'./pages/HomePage.tsx'` — both work

## Verify It Works

### Manual Testing:

1. **Check file structure:**
   ```bash
   ls src/pages/
   ```
   Should see: `HomePage.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `DashboardPage.tsx`

2. **Run the app:**
   ```bash
   npm run dev
   ```

3. **Test all routes:**
   - `/` → Shows "Home" or "Home Page"
   - `/login` → Shows "Login" or "Login Page"
   - `/register` → Shows "Register" or "Register Page"
   - `/dashboard` → Shows "Dashboard" or "Dashboard Page"

4. **Check console:**
   - No errors
   - No warnings about missing imports

### Checklist:

- [ ] All four page files exist in `src/pages/`
- [ ] Each file exports a default component
- [ ] App.tsx imports all four pages
- [ ] All four routes work
- [ ] No console errors

## Common Issues

### "Module not found: Can't resolve './pages/HomePage'"

**Problem:** File doesn't exist or path is wrong

**Fix:**
- Check file exists: `ls src/pages/HomePage.tsx`
- Check import path: should be `'./pages/HomePage'` (relative to App.tsx)
- Check spelling: imports are case-sensitive

### "HomePage is not a function"

**Problem:** Missing `export default` in the page file

**Fix:** Make sure each page file has:
```typescript
export default function HomePage() {
  return <h1>Home Page</h1>;
}
```

### "Expected an assignment or function call"

**Problem:** Forgot to return JSX from component

**Fix:**
```typescript
// Wrong
function HomePage() {
  <h1>Home Page</h1>; // Missing return!
}

// Right
function HomePage() {
  return <h1>Home Page</h1>;
}
```

### TypeScript error: "Cannot find module"

**Problem:** TypeScript can't find the file

**Fix:**
- Make sure file extension is `.tsx` (not `.ts`)
- Restart your dev server (`Ctrl+C`, then `npm run dev`)
- Check `tsconfig.json` exists

## Code Example

Your folder structure should now look like this:

```
src/
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── App.tsx
└── main.tsx
```

A page file looks like:

```typescript
// src/pages/HomePage.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the app!</p>
    </div>
  );
}
```

App.tsx now imports them:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## What You Learned

At this point you should understand:
- ✅ How to organize components into separate files
- ✅ How `export default` works
- ✅ How `import` finds files
- ✅ Why file organization matters

## Next Step

Pages exist, but there's no way to navigate between them without manually typing URLs. Let's add navigation:

[Step 5: Create Navigation Component →](./05-create-navigation.md)
