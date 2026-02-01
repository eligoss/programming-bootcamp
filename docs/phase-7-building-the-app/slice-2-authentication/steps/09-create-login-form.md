# Step 9: Create Login Form

> **Time**: ~8 minutes | **Type**: Coding | **Concepts**: Login Flow, Firebase signIn, Error Handling

## What We're Building

A login form that authenticates existing users with email and password, handles Firebase errors gracefully, and redirects to the dashboard on success.

## Let's Build It

### Prompt: Create Login Form Component

```
Create a login form component for my React + TypeScript app.

Requirements:
1. File location: src/components/Auth/LoginForm.tsx
2. Form fields:
   - Email input (type="email")
   - Password input (type="password")
3. Validation:
   - Both fields required
   - Email must contain @
4. Use useAuth() hook to call signIn(email, password)
5. Use useNavigate() to redirect to /dashboard on success
6. Show error messages if validation fails or Firebase returns an error
7. Show loading state on submit button while logging in
8. Include a link to registration page for users without an account

After creating the code, explain:
- How this differs from the registration form
- What Firebase errors might occur for login
- How the error handling works
```

**What to expect:**
- New file `src/components/Auth/LoginForm.tsx`
- Two controlled inputs (email, password)
- Similar structure to RegisterForm but simpler (no password confirmation)
- Form submission handler with validation
- Error and loading states
- useAuth() and useNavigate() hooks

**Files you'll create:**
- `src/components/Auth/LoginForm.tsx`

### Prompt: Add Form to Login Page

```
Update src/pages/LoginPage.tsx to use the LoginForm component.

The page should:
- Import LoginForm
- Render it centered on the page
- Include a heading "Login" or "Sign In"
- Have some basic styling for layout

Show me the updated LoginPage.tsx code.
```

**What to expect:**
- Import statement for LoginForm
- Simple layout with heading and form
- Consistent styling with RegisterPage

**Files you'll modify:**
- `src/pages/LoginPage.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand the differences:

> **💡 Ask AI to Explain:**
>
> ```
> Compare the LoginForm to the RegisterForm:
>
> 1. What's different in the validation logic?
> 2. Why don't we need a confirmPassword field?
> 3. What Firebase errors are specific to login vs registration?
> 4. What happens if a user tries to log in with an email that doesn't exist?
> 5. What happens if the password is wrong?
> ```

**Key concepts to understand:**
- Login uses `signIn()`, register uses `signUp()`
- Login has fewer validation rules (no password confirmation needed)
- Firebase login errors: wrong-password, user-not-found, too-many-requests
- Both forms redirect to dashboard on success

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Navigate to login page:**
   - Go to `http://localhost:5173/login`
   - Should see login form with two fields

3. **Test validation:**

   **Empty fields:**
   - Click "Login" without filling anything
   - Should see error message

   **Invalid email:**
   - Enter "notanemail"
   - Enter any password
   - Submit
   - Should see error about invalid email

4. **Test with nonexistent user:**

   - Email: `nonexistent@example.com`
   - Password: `anything`
   - Click "Login"

   **What should happen:**
   - Button shows "Logging in..." or "Loading..."
   - After a moment, shows Firebase error
   - Error might say "user not found" or "invalid credentials"

5. **Test with wrong password:**

   - Email: `test@example.com` (the one you registered in Step 8)
   - Password: `wrongpassword`
   - Click "Login"

   **What should happen:**
   - Shows error: "Wrong password" or "Invalid credentials"

6. **Test successful login:**

   - Email: `test@example.com`
   - Password: `password123` (or whatever you used in Step 8)
   - Click "Login"

   **What should happen:**
   - Button shows "Logging in..."
   - No errors appear
   - **Redirects to `/dashboard`**
   - Navigation updates (should show different links for logged-in users)

7. **Check persistence:**

   - While logged in, **refresh the page** (F5)
   - Should still be logged in
   - Should still be on dashboard
   - This works because onAuthStateChanged in AuthContext restores session!

### Checklist:

- [ ] Form appears on `/login` page
- [ ] Both input fields work
- [ ] Empty form shows error
- [ ] Invalid email shows error
- [ ] Wrong credentials show Firebase error
- [ ] Correct credentials log in successfully
- [ ] Successful login redirects to dashboard
- [ ] Login persists on page refresh

## Common Issues

### "User not found" error doesn't show

**Problem:** Not catching Firebase error

**Fix:**
```typescript
try {
  await signIn(email, password);
  navigate('/dashboard');
} catch (error: any) {
  setError(error.message);  // This must be in catch block
}
```

### Logged in but nothing changes

**Problem:** Components not using useAuth to show/hide content

**Fix:** We'll add conditional rendering in the next step. For now, check:
- Console shows `user` object (not null)
- URL changed to `/dashboard`

### Login works but page refreshes immediately

**Problem:** Missing `e.preventDefault()`

**Fix:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();  // Prevents page reload!
  // ...
};
```

### "Wrong password" error shows immediately

**Problem:** Validation firing before submission

**Fix:** Make sure validation only happens in `handleSubmit`, not on every keystroke

### Firebase error shows raw code

**Problem:** Displaying `error.code` instead of friendly message

**Fix:** Create error message helper:
```typescript
const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Login failed. Please try again.';
  }
};
```

### Login succeeds but dashboard is blank

**Problem:** Dashboard page doesn't have content yet

**Fix:** This is expected! We'll build the dashboard in the next slice. For now, just verify:
- URL changed to `/dashboard`
- Console shows `user` object with email
- No errors in console

## Code Example

Your `LoginForm.tsx` should look roughly like this:

```typescript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    // Submit
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging In...' : 'Log In'}
      </button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
```

## What You Learned

At this point you should understand:
- ✅ How login differs from registration
- ✅ How to use Firebase signIn function
- ✅ Common Firebase authentication errors
- ✅ How auth state persists across page refreshes
- ✅ How to navigate after successful authentication

## Next Step

Login and registration work! Now let's add a logout button:

[Step 10: Add Logout →](./10-add-logout)
