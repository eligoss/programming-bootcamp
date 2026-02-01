# Step 5: Create Navigation Component

> **Time**: ~7 minutes | **Type**: Coding | **Concepts**: Link component, Component composition

## What We're Building

A reusable Navigation component with links to all pages. This lets users click between pages instead of manually typing URLs.

## Before You Code: Understanding Links

> **💡 Ask AI to Explain:**
>
> ```
> What's the difference between <Link> from React Router and a regular <a> tag?
> Why would using <a href="/login"> cause problems in a React app?
> What does "component composition" mean?
> ```

**What you should learn:**
- `<a>` tags cause full page reloads (bad for SPAs)
- `<Link>` components change routes without reloading (good!)
- Navigation is a component that can be reused across pages
- We'll import and use Navigation like any other component

## Let's Build It

### Prompt: Create Navigation Component

```
Create a Navigation component for my React app.

Requirements:
- File location: src/components/Layout/Navigation.tsx
- Use React Router's Link component (not <a> tags)
- Links to all four pages:
  - Home (/)
  - Login (/login)
  - Register (/register)
  - Dashboard (/dashboard)
- Simple horizontal layout with some spacing
- Each link should have readable text

After creating it, explain:
1. Why we use Link instead of <a>
2. How the "to" prop works
3. Where we'll use this component
```

**What to expect:**
- New file `src/components/Layout/Navigation.tsx`
- Component with four Link elements
- Some basic inline styling or className for layout
- Explanation of how Link works

**Files you'll create:**
- `src/components/Layout/Navigation.tsx` (and its parent folders)

## Understanding What You Built

> **💡 Ask AI to Explain:**
>
> ```
> Show me the Navigation component you created.
>
> Explain:
> 1. What does the Link component do when clicked?
> 2. How does Link know where to navigate?
> 3. Why don't we see a page reload when clicking links?
> 4. What would happen if we used <a href="/login"> instead?
> ```

**Key concepts to understand:**
- `<Link to="/login">` creates a clickable link
- React Router intercepts Link clicks to prevent page reload
- The `to` prop tells React Router which route to navigate to
- Links work like buttons that change the URL

## Let's Use It

Now we have a Navigation component, but it's not showing up anywhere. Let's add it to our pages.

### Prompt: Add Navigation to Pages

```
I have a Navigation component at src/components/Layout/Navigation.tsx.

Update all four page files to include this navigation at the top:
- HomePage.tsx
- LoginPage.tsx
- RegisterPage.tsx
- DashboardPage.tsx

Each page should:
1. Import the Navigation component
2. Render <Navigation /> at the top
3. Keep the existing page content below it

Show me the updated code for one page as an example.
```

**What to expect:**
- Import statement added to each page
- `<Navigation />` rendered at the top of each page's JSX
- Page content still displays

**Files you'll modify:**
- All four page files in `src/pages/`

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Check navigation appears:**
   - Load any page
   - Should see links for: Home, Login, Register, Dashboard
   - Links should be horizontal (side by side)

3. **Test link clicks:**
   - Start at `/`
   - Click "Login" link
   - URL changes to `/login`
   - Page content changes to LoginPage
   - **Key:** Page did NOT reload (no white flash)

4. **Test all links:**
   - Click each link
   - Verify URL changes
   - Verify content changes
   - Navigation should stay visible on every page

### Checklist:

- [ ] Navigation component file exists
- [ ] All pages import Navigation
- [ ] Navigation renders on all pages
- [ ] All four links are clickable
- [ ] Clicking links changes routes
- [ ] No page reload when clicking links
- [ ] No console errors

## Common Issues

### "Link is not defined"

**Problem:** Forgot to import Link in Navigation.tsx

**Fix:**
```typescript
import { Link } from 'react-router-dom';
```

### "Navigation is not defined" (in page files)

**Problem:** Forgot to import Navigation component

**Fix:**
```typescript
import Navigation from '../components/Layout/Navigation';
```

### Clicking links reloads page

**Problem:** Used `<a>` tags instead of `<Link>`

**Fix:** Replace all `<a href="...">` with `<Link to="...">`

### Navigation shows four times on one page

**Problem:** Accidentally added Navigation four times

**Fix:** Each page should have Navigation exactly once:
```typescript
export default function HomePage() {
  return (
    <div>
      <Navigation />  {/* Once at the top */}
      <h1>Home Page</h1>
    </div>
  );
}
```

### Links don't work (nothing happens)

**Problem:** Link "to" prop doesn't match any routes

**Fix:**
- Check routes in App.tsx: `<Route path="/login" ...>`
- Check Link in Navigation: `<Link to="/login">`
- They must match exactly (case-sensitive)

## Code Example

Navigation component:

```typescript
// src/components/Layout/Navigation.tsx
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}
```

Using it in a page:

```typescript
// src/pages/HomePage.tsx
import Navigation from '../components/Layout/Navigation';

export default function HomePage() {
  return (
    <div>
      <Navigation />
      <h1>Home Page</h1>
      <p>Welcome to the app!</p>
    </div>
  );
}
```

## What You Learned

At this point you should understand:
- ✅ The difference between `<Link>` and `<a>`
- ✅ How to create reusable components
- ✅ How to import and use components in other files
- ✅ Why SPAs don't reload between pages

## Next Step

Navigation works, but we're duplicating it on every page. Let's create a Layout component to avoid repetition:

[Step 6: Create Layout Component →](./06-create-layout)
