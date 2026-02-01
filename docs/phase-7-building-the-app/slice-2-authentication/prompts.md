# Slice 2 Prompts

> Example prompts for building authentication

## Before You Start: Create Firebase Project

Do this in the browser (not with AI):

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it (e.g., "my-notes-app")
4. Disable Google Analytics (not needed)
5. Wait for creation

### Enable Authentication

1. In Firebase console, click "Authentication"
2. Click "Get started"
3. Click "Email/Password"
4. Enable first toggle ("Email/Password")
5. Click "Save"

### Get Web Config

1. Click the gear icon → "Project settings"
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Name it (e.g., "web")
5. Copy the firebaseConfig object

---

## Prompt 1: Set Up Firebase

```
Set up Firebase in my React + TypeScript app.

Here's my Firebase config:
[PASTE YOUR CONFIG HERE]

Create:
1. src/lib/firebase.ts - Initialize Firebase app and export auth

Make sure to:
- Use proper TypeScript types
- Export what other files need
```

### What to Expect

- Firebase initialization file
- Exported auth instance

### Verify

- No errors on import
- App still runs

---

## Prompt 2: Create Auth Context

```
Create an authentication context for my React app using Firebase Auth.

Requirements:
1. Create AuthContext with:
   - user (Firebase User or null)
   - loading (boolean, true while checking auth)
   - signIn(email, password)
   - signUp(email, password)
   - signOut()

2. Create useAuth hook to access the context

3. Listen to auth state changes with onAuthStateChanged

Put it in:
- src/context/AuthContext.tsx
- src/hooks/useAuth.ts

Show me how to wrap my app with the AuthProvider.
```

### What to Expect

- AuthContext with provider
- useAuth hook
- Instructions to wrap App

### After Running

- No errors
- Can import useAuth (though user will be null)

---

## Prompt 3: Create Registration Form

```
Create a registration form component for my React app.

Requirements:
1. Email input with validation (must be valid email format)
2. Password input with validation (minimum 6 characters)
3. Confirm password input (must match)
4. Submit button
5. Show validation errors inline
6. Use the useAuth hook for signUp
7. After successful registration, redirect to /dashboard
8. Show Firebase errors (like "email already in use")
9. Link to login page for existing users

Put it in src/components/forms/RegisterForm.tsx

Then show me how to use it in RegisterPage.tsx
```

### What to Expect

- Form with validation
- Error handling
- Navigation on success

### Verify

1. Go to /register
2. Try invalid inputs → see errors
3. Register with valid data → account created
4. Check Firebase console → user appears

---

## Prompt 4: Create Login Form

```
Create a login form component for my React app.

Requirements:
1. Email input
2. Password input
3. Submit button
4. Show errors from Firebase (wrong password, user not found)
5. Use the useAuth hook for signIn
6. After successful login, redirect to /dashboard
7. Link to registration page for new users

Put it in src/components/forms/LoginForm.tsx

Then show me how to use it in LoginPage.tsx
```

### Verify

1. Go to /login
2. Use credentials from registration
3. Should redirect to dashboard
4. Try wrong password → see error

---

## Prompt 5: Add Logout

```
Add a logout button to my app.

Requirements:
1. Only show when user is logged in
2. Use the useAuth hook for signOut
3. After logout, redirect to home page
4. Add to the Navigation component

Update src/components/Layout/Navigation.tsx
```

### Verify

1. When logged in, see Logout button
2. Click Logout → redirected to home
3. Try accessing /dashboard → should work (we'll protect next)

---

## Prompt 6: Create Protected Route

```
Create a ProtectedRoute component that:
1. Shows a loading spinner while checking auth
2. Redirects to /login if not authenticated
3. Renders children if authenticated

Put it in src/components/ProtectedRoute.tsx

Then show me how to use it to protect the Dashboard route in App.tsx
```

### Verify

1. Log out
2. Try to go to /dashboard
3. Should redirect to /login
4. Log in
5. Should access /dashboard

---

## Common Issues and Fixes

### "Firebase: Error (auth/invalid-api-key)"

Your config is wrong. Check that you pasted it correctly.

### "Firebase: Error (auth/email-already-in-use)"

That email is registered. Use a different one or log in.

### "Firebase: Error (auth/weak-password)"

Password needs at least 6 characters.

### Context errors

Make sure AuthProvider wraps your app in main.tsx or App.tsx.

### Redirect not working

Import `useNavigate` from react-router-dom:
```typescript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard');
```

---

## Verification Checklist

Before committing:

- [ ] Can register new account
- [ ] Can log in with registered account
- [ ] Can log out
- [ ] Dashboard protected
- [ ] Errors display properly
- [ ] Auth persists on refresh
- [ ] No console errors
- [ ] `npm run lint` passes

---

## Commit

```bash
git add .
git commit -m "Add user authentication with Firebase"
git push
```

---

[Start Slice 3: Protected Feature →](../slice-3-protected-feature/)
