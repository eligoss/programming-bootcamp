# Step 8: Verification & Commit

> **Time**: ~8 minutes | **Type**: Testing | **Concepts**: Quality assurance, Git workflow

## What This Step Is About

Before we move on to the next slice, we need to **verify everything works** and **commit our code**. This is crucial — catching bugs now prevents confusion later.

## Full Verification Checklist

Work through this list carefully. Don't skip items!

### File Structure

Verify your project has this structure:

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

**Check:**
- [ ] All files exist in correct locations
- [ ] File names match exactly (case-sensitive)
- [ ] All files use `.tsx` extension (not `.ts` or `.jsx`)

### App Runs Without Errors

```bash
npm run dev
```

**Check:**
- [ ] Dev server starts successfully
- [ ] No errors in terminal
- [ ] Browser console shows no errors
- [ ] App loads at `http://localhost:5173`

### Navigation Works

**Check:**
- [ ] Navigation appears on all pages
- [ ] Navigation is horizontal (links side by side)
- [ ] Navigation has hover effects

### All Routes Work

Manually test each route:

**Home page (`/`):**
- [ ] URL shows `http://localhost:5173/`
- [ ] Shows HomePage content
- [ ] Has heading "Home" or "Home Page"

**Login page (`/login`):**
- [ ] URL shows `http://localhost:5173/login`
- [ ] Shows LoginPage content
- [ ] Has heading "Login" or "Login Page"

**Register page (`/register`):**
- [ ] URL shows `http://localhost:5173/register`
- [ ] Shows RegisterPage content
- [ ] Has heading "Register" or "Register Page"

**Dashboard page (`/dashboard`):**
- [ ] URL shows `http://localhost:5173/dashboard`
- [ ] Shows DashboardPage content
- [ ] Has heading "Dashboard" or "Dashboard Page"

### Link Clicks Work

**Check:**
- [ ] Click "Home" in nav → goes to `/`
- [ ] Click "Login" in nav → goes to `/login`
- [ ] Click "Register" in nav → goes to `/register`
- [ ] Click "Dashboard" in nav → goes to `/dashboard`
- [ ] **Important:** No page reload when clicking (no white flash)

### Styling Looks Good

**Check:**
- [ ] Page has no default margins (CSS reset working)
- [ ] Font is clean and readable
- [ ] Navigation styled nicely
- [ ] Content has good padding
- [ ] Content not stretched edge-to-edge (max-width working)

### Code Quality

Run the linter:

```bash
npm run lint
```

**Check:**
- [ ] No linting errors
- [ ] No unused imports
- [ ] No TypeScript errors

If linter shows errors, fix them now before committing.

## Common Issues Found During Verification

### Routes don't work

**Problem:** BrowserRouter not wrapping Routes

**Fix:** In `App.tsx`:
```typescript
<BrowserRouter>
  <Layout>
    <Routes>
      {/* routes here */}
    </Routes>
  </Layout>
</BrowserRouter>
```

### Navigation not showing

**Problem:** Layout not rendering Navigation

**Fix:** In `Layout.tsx`:
```typescript
import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />  {/* Make sure this is here */}
      <main>{children}</main>
    </div>
  );
}
```

### Styles not applied

**Problem:** index.css not imported

**Fix:** In `main.tsx`:
```typescript
import './index.css'; // Must be here
```

### Page reload when clicking links

**Problem:** Used `<a>` instead of `<Link>`

**Fix:** Replace all `<a href="...">` with `<Link to="...">`

## Understanding Your Work

Before committing, make sure you understand what you built:

> **💡 Final Understanding Check:**
>
> Ask yourself (or ask AI if you're unsure):
>
> 1. **What is React Router and why do we use it?**
> 2. **What do BrowserRouter, Routes, and Route do?**
> 3. **Why do we use Link instead of <a> tags?**
> 4. **What does the Layout component do?**
> 5. **How does the children prop work?**
> 6. **Why did we create separate page files?**

If you can't answer these, review the earlier steps or ask AI to explain again.

## Commit Your Work

**IMPORTANT:** Only commit if everything above passes!

### Check Git Status

```bash
git status
```

You should see modified/new files like:
- `src/components/Layout/Layout.tsx`
- `src/components/Layout/Navigation.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/DashboardPage.tsx`
- `src/App.tsx`
- `src/index.css`

### Stage Changes

```bash
git add src/
```

### Commit

```bash
git commit -m "Add app skeleton with routing and navigation

- Set up React Router with BrowserRouter
- Create four pages: Home, Login, Register, Dashboard
- Add Navigation component with Links
- Create Layout component for consistent structure
- Add base CSS styling"
```

**Why this commit message?**
- First line summarizes what was added (< 50 chars)
- Blank line separates subject from body
- Bullet points detail specific changes
- Focuses on "what" not "how"

### Verify Commit

```bash
git log -1
```

Should show your commit with the message above.

## What You Accomplished

Congratulations! You now have:

✅ A working React app with TypeScript
✅ Four navigable pages
✅ Client-side routing with React Router
✅ Reusable Navigation component
✅ Layout component with children prop
✅ Clean, professional styling
✅ Organized file structure
✅ All code committed to Git

## Skills You Learned

- Setting up React Router
- Creating and organizing components
- Using the children prop
- Component composition patterns
- Basic CSS styling
- Import/export in TypeScript
- File organization best practices
- Git workflow

## Next Slice

The skeleton is complete! Next, we'll add **authentication** so users can sign up, log in, and log out.

[Continue to Slice 2: Authentication →](../../slice-2-authentication/)
