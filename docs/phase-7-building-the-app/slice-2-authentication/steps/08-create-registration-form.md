# Step 8: Create Registration Form

> **Time**: ~10 minutes | **Type**: Coding | **Concepts**: Forms, Validation, Firebase Registration

## What We're Building

A registration form that lets users create an account with email and password, validates inputs, and redirects to the dashboard on success.

## Before You Code: Understanding Form Validation

> **💡 Ask AI First:**
>
> ```
> For a registration form, what validations should I do before submitting to Firebase?
> What happens if I try to register with an email that already exists?
> Why do we need to confirm the password?
> What password requirements does Firebase have?
> ```

**What you should learn:**
- Firebase requires passwords to be at least 6 characters
- Firebase returns specific error codes (auth/email-already-in-use, etc.)
- Password confirmation prevents typos
- Client-side validation improves UX (catch errors before Firebase)

## Let's Build It

### Prompt: Create Registration Form Component

```
Create a registration form component for my React + TypeScript app.

Requirements:
1. File location: src/components/Auth/RegisterForm.tsx
2. Form fields:
   - Email input (type="email")
   - Password input (type="password")
   - Confirm Password input (type="password")
3. Validation:
   - All fields required
   - Email must contain @
   - Password must be at least 6 characters
   - Password and confirm password must match
4. Use useAuth() hook to call signUp(email, password)
5. Use useNavigate() from react-router-dom to redirect to /dashboard on success
6. Show error messages if validation fails or Firebase returns an error
7. Show loading state on submit button while creating account
8. Include a link to login page for users who already have an account

After creating the code, explain:
- How the validation works
- What happens when signUp() succeeds
- What Firebase errors might occur
- How useNavigate() works
```

**What to expect:**
- New file `src/components/Auth/RegisterForm.tsx`
- Three controlled inputs (email, password, confirmPassword)
- Form submission handler with validation
- Error state for displaying messages
- Loading state for button
- useAuth() and useNavigate() hooks
- Try/catch for Firebase errors

**Files you'll create:**
- `src/components/Auth/RegisterForm.tsx`

### Prompt: Add Form to Register Page

```
Update src/pages/RegisterPage.tsx to use the RegisterForm component.

The page should:
- Import RegisterForm
- Render it centered on the page
- Include a heading "Create Account" or "Register"
- Have some basic styling for layout

Show me the updated RegisterPage.tsx code.
```

**What to expect:**
- Import statement for RegisterForm
- Simple layout with heading and form
- Basic centering styles

**Files you'll modify:**
- `src/pages/RegisterPage.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand the flow:

> **💡 Ask AI to Explain:**
>
> ```
> Walk me through the RegisterForm component:
>
> 1. What happens when a user types in the email field?
> 2. What validations run when they click "Register"?
> 3. If validation passes, what happens next?
> 4. If signUp() succeeds, how does the user get redirected?
> 5. What errors might come from Firebase and how do we show them?
> 6. Why do we need both password and confirmPassword fields?
> ```

**Key concepts to understand:**
- onChange updates state for each keystroke
- onSubmit validates before calling Firebase
- signUp() from context handles Firebase API call
- useNavigate() changes route programmatically
- Firebase errors have .code and .message properties
- Controlled components make validation easy

## Verify It Works

### Manual Testing:

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Navigate to register page:**
   - Go to `http://localhost:5173/register`
   - Should see registration form with three fields

3. **Test validation:**

   **Empty fields:**
   - Click "Register" without filling anything
   - Should see error message "Please fill in all fields" or similar

   **Invalid email:**
   - Enter "notanemail" in email field
   - Fill password fields
   - Submit
   - Should see error about invalid email

   **Password too short:**
   - Enter valid email
   - Enter "12345" (only 5 characters)
   - Submit
   - Should see error about password length

   **Passwords don't match:**
   - Enter valid email
   - Password: "password123"
   - Confirm: "password456"
   - Submit
   - Should see error "Passwords do not match"

4. **Test successful registration:**

   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
   - Click "Register"

   **What should happen:**
   - Button shows "Creating account..." or "Loading..."
   - No errors appear
   - **Redirects to `/dashboard`**
   - Check Firebase Console → Authentication → Users
   - Should see `test@example.com` in the user list!

5. **Test duplicate email:**

   - Try registering again with `test@example.com`
   - Should see Firebase error: "Email already in use" or similar

### Checklist:

- [ ] Form appears on `/register` page
- [ ] All three input fields work (can type)
- [ ] Empty form shows validation error
- [ ] Invalid email shows error
- [ ] Short password shows error
- [ ] Mismatched passwords show error
- [ ] Valid form creates account
- [ ] Successful registration redirects to dashboard
- [ ] Duplicate email shows Firebase error
- [ ] User appears in Firebase Console

## Common Issues

### Form submits but nothing happens

**Problem:** Missing `e.preventDefault()`

**Fix:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();  // Must be first!
  // ...
};
```

### "useAuth must be used within AuthProvider"

**Problem:** RegisterForm used outside AuthProvider

**Fix:** Make sure App.tsx has:
```typescript
<AuthProvider>
  {/* RegisterPage must be inside here */}
</AuthProvider>
```

### "useNavigate() may be used only in the context of a Router"

**Problem:** RegisterForm used outside BrowserRouter

**Fix:** Make sure App.tsx has:
```typescript
<BrowserRouter>
  {/* RegisterPage must be inside here */}
</BrowserRouter>
```

### Password validation doesn't work

**Problem:** Wrong comparison or logic

**Fix:**
```typescript
if (password !== confirmPassword) {
  setError('Passwords do not match');
  return;
}

if (password.length < 6) {
  setError('Password must be at least 6 characters');
  return;
}
```

### Firebase error: "auth/invalid-email"

**Problem:** Email format invalid

**Fix:** Firebase validates email server-side too. Show the error:
```typescript
catch (error: any) {
  setError(error.message);  // Will show "Firebase: Error (auth/invalid-email)"
}
```

### Redirects before account created

**Problem:** Not awaiting signUp()

**Fix:**
```typescript
await signUp(email, password);  // Must await!
navigate('/dashboard');
```

### User sees raw error codes

**Problem:** Showing `error.code` instead of user-friendly message

**Fix:**
```typescript
const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/invalid-email':
      return 'Please enter a valid email';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    default:
      return 'An error occurred. Please try again.';
  }
};
```

## Code Example

Your `RegisterForm.tsx` should look roughly like this:

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Submit
    setLoading(true);
    try {
      await signUp(email, password);
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

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Register'}
      </button>
    </form>
  );
}
```

## What You Learned

At this point you should understand:
- ✅ How to create controlled form inputs
- ✅ How to validate form data before submission
- ✅ How to use the useAuth hook in components
- ✅ How to handle async operations in forms
- ✅ How to navigate programmatically with useNavigate
- ✅ How to display Firebase error messages

## Next Step

Registration works! Now let's create the login form:

[Step 9: Create Login Form →](./09-create-login-form)
