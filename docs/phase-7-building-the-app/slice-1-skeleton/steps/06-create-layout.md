# Step 6: Create Layout Component

> **Time**: ~8 minutes | **Type**: Coding | **Concepts**: Component composition, Children prop, DRY principle

## What We're Building

A Layout component that wraps all pages with Navigation, so we don't have to add `<Navigation />` to every single page file.

## Before You Code: Understanding Component Composition

> **💡 Ask AI to Explain:**
>
> ```
> What is the "children" prop in React?
> What does "component composition" mean?
> Why is it better to have a Layout component instead of copying <Navigation /> to every page?
> Give me a simple example of a component that uses children.
> ```

**What you should learn:**
- `children` is a special prop containing whatever is nested inside a component
- Component composition = building UIs by nesting components
- DRY (Don't Repeat Yourself) = write once, use everywhere
- Layout is a "wrapper" component that adds structure around content

## Let's Build It

### Prompt: Create Layout Component

```
Create a Layout component that:
1. Wraps all page content with consistent structure
2. Includes the Navigation component at the top
3. Has a main content area for page-specific content
4. Uses the children prop to render page content

File location: src/components/Layout/Layout.tsx

Then update App.tsx to wrap all routes with this Layout component.

After creating it, explain:
- How the children prop works
- Why this is better than adding Navigation to each page
- How the Layout wraps routes in App.tsx
```

**What to expect:**
- New file `src/components/Layout/Layout.tsx`
- Layout component with Navigation + children
- Updated `App.tsx` with Layout wrapping Routes
- Explanation of component composition pattern

**Files you'll create:**
- `src/components/Layout/Layout.tsx`

**Files you'll modify:**
- `src/App.tsx`

## Understanding What You Built

> **💡 Ask AI to Teach:**
>
> ```
> Explain the Layout component you created:
>
> 1. Show me where the children prop is defined
> 2. Show me where children is rendered in the JSX
> 3. In App.tsx, what becomes the "children" prop?
> 4. Why does this approach scale better than copying Navigation everywhere?
> ```

**Key concepts:**
- `children` is everything between `<Layout>` and `</Layout>`
- Layout provides structure, children provide content
- Now adding a new page doesn't require adding Navigation
- If we change Navigation, it updates everywhere automatically

## Clean Up Pages

Now that Layout handles Navigation, we should remove Navigation from individual page files.

### Prompt: Remove Navigation from Pages

```
Now that Layout handles Navigation, I don't need Navigation in my page files anymore.

Update all four page files to:
1. Remove the Navigation import
2. Remove the <Navigation /> component
3. Keep the page-specific content (headings, etc.)

Show me the cleaned-up HomePage.tsx as an example.
```

**What to expect:**
- Simpler page files
- Just the page-specific content
- No more duplicate Navigation imports

**Files you'll modify:**
- All four page files in `src/pages/`

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Verify Layout appears:**
   - Navigation should still show on all pages
   - Even though pages don't import Navigation directly
   - This proves Layout is wrapping everything

3. **Test navigation:**
   - Click between pages
   - Navigation stays visible
   - URLs change
   - Content changes
   - No page reload

4. **Check structure:**
   - View page source or inspect element
   - Should see: Layout → Navigation + page content

### Checklist:

- [ ] Layout component exists
- [ ] Layout imports and renders Navigation
- [ ] Layout uses children prop
- [ ] App.tsx wraps routes with Layout
- [ ] Page files no longer import Navigation
- [ ] Navigation still appears on all pages
- [ ] All links work
- [ ] No console errors

## Common Issues

### "children is not defined"

**Problem:** Forgot to destructure children from props

**Fix:**
```typescript
// Wrong
export default function Layout() {
  return <div>{children}</div>; // children not defined!
}

// Right
export default function Layout({ children }) {
  return <div>{children}</div>;
}

// Even better (with TypeScript)
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

### Navigation disappeared

**Problem:** Layout not wrapping routes in App.tsx

**Fix:**
```typescript
// Wrong
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</BrowserRouter>

// Right
<BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Layout>
</BrowserRouter>
```

### Navigation shows twice

**Problem:** Forgot to remove Navigation from page files

**Fix:** Go through each page file and remove:
```typescript
import Navigation from '...'; // Remove this
<Navigation />  // Remove this
```

### TypeScript error about children type

**Problem:** TypeScript doesn't know what type children is

**Fix:**
```typescript
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
```

## Code Example

Layout component:

```typescript
// src/components/Layout/Layout.tsx
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
```

Updated App.tsx:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

Cleaned-up page:

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

## What You Learned

At this point you should understand:
- ✅ How the children prop works
- ✅ Component composition patterns
- ✅ Why Layout components are useful
- ✅ The DRY principle (Don't Repeat Yourself)

## Next Step

Almost done! Let's add some basic styling to make the app look presentable:

[Step 7: Add Basic Styling →](./07-add-styling)
