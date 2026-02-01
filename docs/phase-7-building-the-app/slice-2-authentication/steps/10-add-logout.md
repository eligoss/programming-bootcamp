# Step 10: Add Logout

> **Time**: ~5 minutes | **Type**: Coding | **Concepts**: Conditional Rendering, Logout Flow

## What We're Building

Adding a logout button to the Navigation component that only shows when a user is logged in, and redirects to home page after signing out.

## Let's Build It

### Prompt: Add Logout to Navigation

```
Update the Navigation component to show/hide links based on authentication status.

Requirements:
1. Import useAuth hook
2. When user is logged in, show:
   - Home link
   - Dashboard link
   - Logout button (not a link, an actual button that calls signOut)
3. When user is logged out, show:
   - Home link
   - Login link
   - Register link
4. Use useNavigate to redirect to / (home) after logout
5. Style the logout button to look like the other nav links

After updating the code, explain:
- How conditional rendering works with &&
- Why we use a button instead of a Link for logout
- What happens when signOut() is called
```

**What to expect:**
- Navigation.tsx imports useAuth and useNavigate
- Conditional rendering with `user ? ... : ...` or `user &&`
- Logout button calls signOut function
- Navigate to home after successful logout

**Files you'll modify:**
- `src/components/Layout/Navigation.tsx`

## Understanding What You Built

After AI updates the code, make sure you understand conditional rendering:

> **💡 Ask AI to Explain:**
>
> ```
> Explain the Navigation component's conditional rendering:
>
> 1. What does {user && <Link to="/dashboard">Dashboard</Link>} do?
> 2. What does {!user && <Link to="/login">Login</Link>} do?
> 3. Why is logout a button, not a Link?
> 4. What happens to the AuthContext when signOut() is called?
> 5. How do all components know to re-render when auth state changes?
> ```

**Key concepts to understand:**
- `user && <Component />` — Only render if user exists (truthy)
- `!user && <Component />` — Only render if user is null (falsy)
- `user ? <A /> : <B />` — Render A if logged in, B if logged out
- Logout button calls async function, Link just navigates
- When auth changes, Context updates, all consumers re-render

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Test logged out state:**

   - Make sure you're logged out (or open in incognito mode)
   - Go to home page: `http://localhost:5173/`

   **Navigation should show:**
   - [ ] Home
   - [ ] Login
   - [ ] Register
   - [ ] **NO** Dashboard link
   - [ ] **NO** Logout button

3. **Log in:**

   - Click "Login" in nav
   - Log in with `test@example.com` / `password123`
   - Should redirect to dashboard

   **Navigation should now show:**
   - [ ] Home
   - [ ] Dashboard
   - [ ] Logout button
   - [ ] **NO** Login link
   - [ ] **NO** Register link

4. **Test logout:**

   - Click "Logout" button
   - **What should happen:**
     - Redirects to home page (`/`)
     - Navigation updates to show Login/Register again
     - Dashboard link disappears
     - Console shows `user: null`

5. **Test logout from different pages:**

   - Log in again
   - Go to dashboard
   - Click logout → should redirect to home
   - Log in again
   - Stay on home page
   - Click logout → should stay on home

6. **Test protected navigation:**

   - While logged out, manually go to `/dashboard`
   - Should see dashboard page (we'll fix this with protected routes next!)
   - But navigation should show Login/Register (correct)

### Checklist:

- [ ] Logged out: shows Home, Login, Register
- [ ] Logged in: shows Home, Dashboard, Logout
- [ ] Logout button clickable
- [ ] Logout redirects to home
- [ ] Logout updates navigation immediately
- [ ] No console errors

## Common Issues

### Navigation doesn't change after logout

**Problem:** Not using auth state in conditional rendering

**Fix:**
```typescript
const { user, signOut } = useAuth();

// Then use user for conditions:
{user && <Link to="/dashboard">Dashboard</Link>}
{!user && <Link to="/login">Login</Link>}
```

### "useAuth must be used within AuthProvider"

**Problem:** Navigation rendered outside AuthProvider

**Fix:** Make sure App.tsx has:
```typescript
<AuthProvider>
  <BrowserRouter>
    <Layout>  {/* Navigation is inside here */}
      {/* ... */}
    </Layout>
  </BrowserRouter>
</AuthProvider>
```

### Logout button doesn't do anything

**Problem:** Button not calling signOut function

**Fix:**
```typescript
const handleLogout = async () => {
  await signOut();
  navigate('/');
};

<button onClick={handleLogout}>Logout</button>
```

### "Cannot read properties of null (reading 'email')"

**Problem:** Trying to display user.email before checking if user exists

**Fix:**
```typescript
// Wrong:
<p>Welcome, {user.email}</p>

// Right:
{user && <p>Welcome, {user.email}</p>}
```

### Logout works but doesn't redirect

**Problem:** Not calling navigate after signOut

**Fix:**
```typescript
const handleLogout = async () => {
  await signOut();
  navigate('/');  // Don't forget this!
};
```

### All links show all the time

**Problem:** Forgot conditional rendering

**Fix:**
```typescript
// Show ONLY when logged in:
{user && (
  <>
    <Link to="/dashboard">Dashboard</Link>
    <button onClick={handleLogout}>Logout</button>
  </>
)}

// Show ONLY when logged out:
{!user && (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
)}
```

## Code Example

Your `Navigation.tsx` should look roughly like this:

```typescript
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">Home</Link>

      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
```

**Note:** Your actual code might have different styling or structure, but the conditional logic should be similar.

## What You Learned

At this point you should understand:
- ✅ How conditional rendering works in React
- ✅ The difference between `&&` and ternary operators for rendering
- ✅ Why logout is a button, not a Link
- ✅ How auth state changes trigger re-renders
- ✅ How to navigate programmatically after state changes

## Next Step

Authentication works, but there's a problem: logged-out users can still access `/dashboard` by typing the URL directly! Let's learn about protected routes:

[Step 11: Understanding Protected Routes →](./11-understanding-protected-routes)
