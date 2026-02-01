# Step 11: Understanding Protected Routes

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Route Guards, Authorization, Security

## What This Step Is About

You have authentication working, but there's a **critical security gap**: anyone can visit `/dashboard` by typing the URL directly, even when logged out! Let's understand how to fix this with **protected routes**.

## Interactive Learning

> **💡 Ask AI to Teach You:**
>
> Copy this prompt into Claude and read the response carefully:
>
> ```
> I have authentication working in my React app, but users can access protected pages by typing URLs directly.
>
> Explain:
> 1. What is a protected route (also called a route guard)?
> 2. What's the difference between hiding a link vs protecting a route?
> 3. How do protected routes work in React Router?
> 4. What should happen when a logged-out user tries to access a protected route?
>
> Use simple examples — I'm a beginner.
> ```

## What You Should Learn

After AI explains, you should be able to answer these questions:

- **What is a protected route?** (A route that requires authentication to access)
- **Hiding links vs protecting routes?** (Hiding is UX, protection is security)
- **What happens to unauthenticated users?** (Redirect to login page)
- **Why can't we just hide the Dashboard link?** (Users can type URLs directly)

If AI's explanation didn't cover these points, ask follow-up questions like:
- "Can you show what happens without route protection?"
- "What's the difference between authentication and authorization?"

## The Problem: Security Through Obscurity Doesn't Work

**What we have now:**

```typescript
// Navigation.tsx - Link is hidden when logged out
{user && <Link to="/dashboard">Dashboard</Link>}
```

**Why this isn't enough:**

```
User not logged in
  → Navigation hides Dashboard link ✅ (Good UX)
  → User types "/dashboard" in address bar
  → Route shows Dashboard page ❌ (Security hole!)
```

**Hiding the link is UX, not security!**

## The Solution: Protected Route Component

We'll create a `ProtectedRoute` component that:

1. **Checks auth state** — Is user logged in?
2. **Shows loading** — While checking (don't flash wrong content)
3. **Allows access** — If authenticated, show the route
4. **Redirects to login** — If not authenticated

**How it works:**

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

**Decision flow:**

```
User visits /dashboard
  ↓
ProtectedRoute checks auth state
  ↓
Is loading? → Show loading spinner
  ↓
Is authenticated? → Show <DashboardPage />
  ↓
Not authenticated? → Redirect to /login
```

## Visual: The Protection Flow

```
┌─────────────────────────────────────────┐
│ User navigates to /dashboard            │
└───────────────┬─────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│ ProtectedRoute component renders        │
└───────────────┬─────────────────────────┘
                ↓
┌─────────────────────────────────────────┐
│ Call useAuth() to get:                  │
│ - user (User | null)                    │
│ - loading (boolean)                     │
└───────────────┬─────────────────────────┘
                ↓
         ┌──────┴──────┐
         │             │
    loading === true?  │
         │             │
         YES           NO
         │             │
         ↓             ↓
┌────────────┐  ┌──────┴──────┐
│ Show:      │  │ user exists?│
│ Loading... │  └──────┬──────┘
└────────────┘         │
                  YES  │  NO
                   │   │
                   ↓   ↓
            ┌──────┐ ┌───────────────┐
            │ Show │ │ Redirect to:  │
            │ Page │ │ /login        │
            └──────┘ └───────────────┘
```

## Why Loading State Matters

**Without loading state:**

```typescript
// Bad - causes flash of wrong content
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;  // Fires immediately!
  }

  return children;
}
```

**Problem:** When app loads, `user` is `null` for a brief moment while Firebase checks auth. This causes:
- Flash of login page
- Then redirect back to dashboard
- Bad UX, confusing to users

**With loading state:**

```typescript
// Good - waits for auth check
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Wait for auth check
  }

  if (!user) {
    return <Navigate to="/login" />;  // Only redirect if truly not logged in
  }

  return children;  // User is authenticated
}
```

**Result:**
- Shows loading spinner while Firebase checks session
- Only redirects if user is actually not logged in
- Smooth UX, no flashing

## Real-World Analogy

Think of a protected route like a bouncer at a VIP area:

**Navigation hiding links:**
- Sign at the entrance says "VIP Only"
- Regular guests see the sign and don't try to enter
- **But:** Someone could ignore the sign and walk in anyway

**Protected route:**
- Actual bouncer checking IDs at the door
- Sees you approaching, checks your ID (loading state)
- Either lets you in (authenticated) or turns you away (redirect to login)
- Can't bypass by ignoring a sign!

**The sign (hiding links)** improves UX — guests don't waste time trying.
**The bouncer (route protection)** is security — enforces the rule.

**You need both!**

## Common Protected Route Patterns

### Pattern 1: Redirect to Login

```typescript
// User not logged in → go to login page
if (!user) {
  return <Navigate to="/login" />;
}
```

### Pattern 2: Redirect to Previous Page After Login

```typescript
// Save where user was trying to go
if (!user) {
  return <Navigate to="/login" state={{ from: location }} />;
}

// After login, redirect back:
navigate(location.state?.from || '/dashboard');
```

### Pattern 3: Role-Based Protection

```typescript
// Check not just auth, but specific permissions
if (!user) {
  return <Navigate to="/login" />;
}

if (user.role !== 'admin') {
  return <Navigate to="/forbidden" />;
}
```

**For this bootcamp, we'll use Pattern 1** (simple redirect to login).

## Check Your Understanding

Before moving to the next step, you should be able to explain:

- [ ] What a protected route is and why we need it
- [ ] The difference between hiding links and protecting routes
- [ ] Why we need a loading state in ProtectedRoute
- [ ] What `<Navigate to="/login" />` does
- [ ] Where ProtectedRoute will wrap routes in our app

## What We'll Protect

In our app, these routes need protection:

**Protected (require login):**
- `/dashboard` — Only logged-in users should see their dashboard

**Public (anyone can access):**
- `/` — Home page
- `/login` — Login page (in fact, should redirect if ALREADY logged in)
- `/register` — Registration page

## Next Step

Now that you understand the "why," let's build the ProtectedRoute component:

[Step 12: Create Protected Route →](./12-create-protected-route)
