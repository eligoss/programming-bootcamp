# Step 3: Set Up Routes

> **Time**: ~8 minutes | **Type**: Coding | **Concepts**: BrowserRouter, Routes, Route

## What We're Building

Setting up the routing infrastructure in `App.tsx` with two simple routes to start with.

## Before You Code: Understanding Router Components

> **💡 Ask AI to Explain:**
>
> ```
> I'm about to use BrowserRouter, Routes, and Route from react-router-dom.
>
> Explain:
> 1. What does BrowserRouter do and where does it go?
> 2. What does Routes do and what goes inside it?
> 3. What does Route do and what props does it need?
> 4. How do these three components work together?
>
> Use an analogy if it helps.
> ```

**What you should learn:**
- `BrowserRouter` wraps your app and provides routing context
- `Routes` is a container for all route definitions
- `Route` maps a URL path to a component
- They nest: BrowserRouter → Routes → Route(s)

## Let's Build It

### Prompt: Create Basic Router Setup

```
Set up React Router in my App.tsx file.

Create two routes to start:
- / → HomePage component
- /login → LoginPage component

Structure:
1. Import BrowserRouter, Routes, Route from react-router-dom
2. Wrap everything in BrowserRouter
3. Create Routes with two Route components
4. Create placeholder page components (just a heading for now)

After you create the code, explain:
- What each component does
- Why BrowserRouter wraps everything
- What the path and element props do
```

**What to expect:**
- Updated `App.tsx` with router setup
- Two simple page components (HomePage, LoginPage)
- Imports from react-router-dom
- Explanation of how routing works

**File you'll modify:**
- `src/App.tsx`

## Understanding What You Built

After AI generates the code, **don't just copy it**. Ask AI to walk you through it:

> **💡 Ask AI to Teach:**
>
> ```
> Walk me through the App.tsx code you just created line by line.
>
> For each part, explain:
> 1. BrowserRouter - why it wraps everything
> 2. Routes - what it contains
> 3. Each Route - how path and element props work
> 4. The page components - what makes them components
> ```

**Key things to understand:**
- `<BrowserRouter>` provides routing capabilities to everything inside it
- `<Routes>` looks at current URL and picks which route to render
- `<Route path="/login" element={<LoginPage />}>` means "when URL is /login, show LoginPage"
- Only ONE route's element renders at a time

## Verify It Works

### Manual Testing:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test the home route:**
   - Open browser to `http://localhost:5173/`
   - Should see HomePage content (probably just a heading)
   - Check console — no errors

3. **Test the login route:**
   - Manually change URL to `http://localhost:5173/login`
   - Should see LoginPage content
   - Check console — no errors

4. **Test invalid route:**
   - Try `http://localhost:5173/invalid`
   - What happens? (Probably shows nothing — we haven't added a 404 handler yet)

### Checklist:

- [ ] App runs without errors
- [ ] Can navigate to `/`
- [ ] Can navigate to `/login`
- [ ] Each route shows different content
- [ ] Browser URL changes

## Common Issues

### "BrowserRouter is not defined"

**Problem:** Forgot to import

**Fix:** Add to top of `App.tsx`:
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

### "Uncaught TypeError: Cannot read properties of undefined"

**Problem:** Importing wrong thing or react-router-dom not installed

**Fix:**
- Verify import statement matches exactly: `react-router-dom` (not `react-router`)
- Check `package.json` has `react-router-dom` listed
- Try `npm install` again

### Routes don't work (blank page)

**Problem:** Route path doesn't match URL

**Fix:**
- Paths must start with `/`
- Check for typos: `/login` not `/Login`
- Make sure Routes wraps Route components

### Page shows "export default was not found"

**Problem:** Component not exported

**Fix:** Make sure component has:
```typescript
export default function HomePage() {
  // ...
}
```

## Code Example

Your `App.tsx` should look roughly like this:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function HomePage() {
  return <h1>Home Page</h1>;
}

function LoginPage() {
  return <h1>Login Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

(Your actual code might have different styling or structure, but the pattern should be similar)

## What You Learned

At this point you should be able to:
- ✅ Set up BrowserRouter in a React app
- ✅ Create route definitions with Routes and Route
- ✅ Map URLs to components
- ✅ Test routes manually by changing the URL

## Next Step

Routes work, but the page components are inline in App.tsx. Let's organize them into proper files:

[Step 4: Create Page Files →](./04-create-page-files.md)
