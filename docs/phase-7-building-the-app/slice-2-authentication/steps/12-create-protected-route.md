# Step 12: Create Protected Route

> **Time**: ~8 minutes | **Type**: Coding | **Concepts**: Route Guards, Navigate Component, Children Prop

## What We're Building

A `ProtectedRoute` component that checks authentication status before allowing access to protected pages, with proper loading states and redirects.

## Let's Build It

### Prompt: Create ProtectedRoute Component

```
Create a ProtectedRoute component for my React + TypeScript app.

Requirements:
1. File location: src/components/Auth/ProtectedRoute.tsx
2. Accept children prop (the page component to protect)
3. Use useAuth() hook to get user and loading state
4. Logic:
   - If loading is true, show a loading message or spinner
   - If user is null (not logged in), redirect to /login using Navigate from react-router-dom
   - If user exists (logged in), render the children
5. Use TypeScript with proper types for the children prop

After creating the code, explain:
- What the children prop is and how it works
- Why we check loading before checking user
- What Navigate component does
- How this differs from useNavigate hook
```

**What to expect:**
- New file `src/components/Auth/ProtectedRoute.tsx`
- Component accepting children prop
- useAuth hook usage
- Conditional rendering: loading → redirect → children
- Import Navigate from react-router-dom
- TypeScript interface for props

**Files you'll create:**
- `src/components/Auth/ProtectedRoute.tsx`

### Prompt: Wrap Dashboard Route

```
Update App.tsx to protect the Dashboard route with ProtectedRoute.

The /dashboard route should:
1. Import ProtectedRoute component
2. Wrap <DashboardPage /> with <ProtectedRoute>
3. Keep other routes public (Home, Login, Register)

Show me the updated Routes section of App.tsx.
```

**What to expect:**
- Import statement for ProtectedRoute
- Dashboard route wrapped: `<ProtectedRoute><DashboardPage /></ProtectedRoute>`
- Other routes unchanged

**Files you'll modify:**
- `src/App.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand the pattern:

> **💡 Ask AI to Explain:**
>
> ```
> Walk me through the ProtectedRoute component:
>
> 1. What is the children prop and what does it contain?
> 2. Why do we check loading BEFORE checking user?
> 3. What's the difference between <Navigate> and useNavigate()?
> 4. What happens when Navigate renders?
> 5. How does this component protect routes from unauthorized access?
> ```

**Key concepts to understand:**
- `children` prop — Whatever is wrapped inside ProtectedRoute
- Check loading first — Prevents redirect flash during auth check
- `<Navigate>` — Component that redirects when rendered
- `useNavigate()` — Hook that returns function to navigate programmatically
- ProtectedRoute renders BEFORE the page, so it can block access

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Test protected route while logged out:**

   - Make sure you're logged out (clear cookies or use incognito)
   - Manually go to: `http://localhost:5173/dashboard`

   **What should happen:**
   - **Brief** "Loading..." message (might be too fast to see)
   - **Redirects to** `/login`
   - URL changes to `http://localhost:5173/login`
   - Dashboard does NOT render

3. **Test public routes while logged out:**

   - Go to `/` → Should work (no redirect)
   - Go to `/login` → Should work
   - Go to `/register` → Should work

4. **Test protected route while logged in:**

   - Log in with `test@example.com` / `password123`
   - Should redirect to `/dashboard` after login
   - Dashboard page should show (not redirect to login)
   - **Stay on dashboard page** (no redirect loop)

5. **Test direct navigation while logged in:**

   - While logged in, go to `/` (home)
   - Click "Dashboard" in nav
   - Should navigate to dashboard
   - No loading flash
   - Dashboard renders

6. **Test auth persistence:**

   - While logged in and on dashboard
   - **Refresh the page** (F5)

   **What should happen:**
   - Brief "Loading..." (while Firebase checks session)
   - Dashboard stays rendered (no redirect)
   - You're still logged in

7. **Test logout from protected route:**

   - While on dashboard
   - Click "Logout"
   - Should redirect to `/` (home)
   - If you manually go to `/dashboard` → redirects to `/login`

### Checklist:

- [ ] Logged out + visit `/dashboard` → redirects to `/login`
- [ ] Logged in + visit `/dashboard` → shows dashboard
- [ ] Public routes work when logged out
- [ ] No redirect loop (dashboard doesn't keep redirecting)
- [ ] Loading state shows briefly on page refresh
- [ ] Auth persists on refresh

## Common Issues

### Infinite redirect loop

**Problem:** Login or Register page wrapped in ProtectedRoute

**Fix:** Only protect routes that require auth:
```typescript
// Right:
<Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

// Wrong - don't protect these!
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
```

### Dashboard shows for a moment before redirect

**Problem:** Not checking loading state

**Fix:**
```typescript
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {  // Must check loading FIRST
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

### "Navigate is not defined"

**Problem:** Wrong import

**Fix:**
```typescript
import { Navigate } from 'react-router-dom';
```

### "children is not assignable to type"

**Problem:** Missing TypeScript type

**Fix:**
```typescript
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // ...
}
```

### Redirect works but console shows error

**Problem:** Trying to render after redirect

**Fix:** Make sure Navigate is the ONLY thing returned:
```typescript
if (!user) {
  return <Navigate to="/login" />;  // Return immediately!
}
```

### Loading shows forever

**Problem:** Loading state never becomes false

**Fix:** Check AuthContext's useEffect:
```typescript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);  // Must set this!
  });
  return unsubscribe;
}, []);
```

## Code Example

Your `ProtectedRoute.tsx` should look roughly like this:

```typescript
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
```

Your `App.tsx` routes should look like:

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
</Routes>
```

## What You Learned

At this point you should understand:
- ✅ How to create a route guard component
- ✅ How the children prop works
- ✅ The difference between Navigate component and useNavigate hook
- ✅ Why loading state is critical for protected routes
- ✅ How to wrap routes for conditional access
- ✅ The difference between UX (hiding links) and security (protecting routes)

## Next Step

Authentication is complete! Let's verify everything works together:

[Step 13: Verification & Commit →](./13-verification-commit)
