# Slice 2 Verification Checklist

> **Use this checklist before moving to Slice 3**

This is your final quality check for authentication. Work through each section carefully. If anything fails, go back and fix it before proceeding.

## Quick Links

If you find issues, these steps can help:
- [Step 1: Firebase Setup](./steps/01-firebase-setup) — Firebase configuration
- [Step 2: AuthContext](./steps/02-create-auth-context) — Authentication context
- [Step 3: Registration Form](./steps/03-registration-form) — Sign up form
- [Step 4: Login Form](./steps/04-login-form) — Sign in form
- [Step 5: Protected Routes](./steps/05-protected-routes) — Route protection
- [Step 6: Logout](./steps/06-logout-functionality) — Sign out logic

---

## 1. File Structure

```
src/
├── lib/
│   └── firebase.ts
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   └── Navigation.tsx
│   ├── ProtectedRoute.tsx
│   └── forms/
│       ├── RegistrationForm.tsx
│       └── LoginForm.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

**Verify:**
- [ ] All files exist in correct locations
- [ ] Folders named exactly as shown (case-sensitive)
- [ ] All React components use `.tsx` extension
- [ ] Firebase config file is `lib/firebase.ts`
- [ ] Context file is `context/AuthContext.tsx`
- [ ] Custom hook is `hooks/useAuth.ts`
- [ ] ProtectedRoute component exists

---

## 2. Development Server

```bash
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] Terminal shows "Local: http://localhost:5173/"
- [ ] No red error messages in terminal
- [ ] Opening browser to localhost:5173 loads the app
- [ ] Browser console (F12) shows no errors related to auth

**Common error:** If server won't start, try:
```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 3. Firebase Configuration

**Verify in your code:**

Check `src/lib/firebase.ts`:
- [ ] Contains Firebase import statements
- [ ] Has `initializeApp()` function call
- [ ] Has `getAuth()` call to initialize auth
- [ ] Exports auth instance
- [ ] Uses environment variables for config (not hardcoded)

**Verify in browser:**
- [ ] No Firebase API key errors in console
- [ ] No "config is not defined" errors
- [ ] No "Firebase initialization failed" messages

**Check Firebase Console:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** > **Users**
4. [ ] Users tab loads without errors
5. [ ] You can see the Users list (even if empty)

---

## 4. Registration Flow

### Form Validation

**Verify form appears:**
- [ ] Navigate to `/register`
- [ ] Registration form loads without errors
- [ ] Form has email input field
- [ ] Form has password input field
- [ ] Form has confirm password input field
- [ ] Form has submit button labeled "Register" or "Sign Up"

**Email validation:**
- [ ] Enter invalid email (like "notanemail")
- [ ] Click submit or leave field
- [ ] Form shows error message about email format
- [ ] Submit button is disabled or shows error
- [ ] Error disappears when valid email entered

**Password length validation:**
- [ ] Enter password shorter than 6 characters (like "abc")
- [ ] Form shows error message about password length
- [ ] Submit button is disabled or shows error
- [ ] Error disappears when password is 6+ characters

**Password match validation:**
- [ ] Enter password in first field (like "password123")
- [ ] Enter different password in confirm field (like "password456")
- [ ] Click submit or leave field
- [ ] Form shows error message about passwords not matching
- [ ] Error disappears when passwords match

### Account Creation

**Create new account:**
- [ ] Enter valid email
- [ ] Enter valid password (6+ characters)
- [ ] Enter matching confirm password
- [ ] Click submit button
- [ ] Page shows loading state (spinner, disabled button, etc.)
- [ ] After 2-3 seconds, redirects to dashboard
- [ ] URL changes to `/dashboard`

**Check Firebase Console:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** > **Users**
4. [ ] Your new account appears in the users list
5. [ ] Shows the email you registered
6. [ ] Shows creation date and time

**Error handling:**
- [ ] Go back to register page
- [ ] Try registering with same email again
- [ ] Form shows Firebase error message (like "Email already in use")
- [ ] Error is user-friendly and clear
- [ ] Not a raw Firebase error code

---

## 5. Login Flow

### Login Form

**Verify form appears:**
- [ ] Navigate to `/login`
- [ ] Login form loads without errors
- [ ] Form has email input field
- [ ] Form has password input field
- [ ] Form has submit button labeled "Login" or "Sign In"
- [ ] Form does NOT have confirm password field

### Successful Login

**Login with registered account:**
- [ ] Enter email you registered with
- [ ] Enter correct password
- [ ] Click submit button
- [ ] Page shows loading state (spinner, disabled button, etc.)
- [ ] After 2-3 seconds, redirects to dashboard
- [ ] URL changes to `/dashboard`
- [ ] Dashboard shows content (not login form)

### Error Handling

**Wrong password:**
- [ ] Navigate to `/login`
- [ ] Enter registered email
- [ ] Enter wrong password
- [ ] Click submit
- [ ] Form shows error message (like "Incorrect password")
- [ ] Stays on login page (doesn't redirect)
- [ ] Can try again

**Non-existent user:**
- [ ] Navigate to `/login`
- [ ] Enter email that was never registered
- [ ] Enter any password
- [ ] Click submit
- [ ] Form shows error message (like "User not found")
- [ ] Stays on login page
- [ ] Can try again

**Empty fields:**
- [ ] Navigate to `/login`
- [ ] Leave email field empty
- [ ] Click submit
- [ ] Form shows error or doesn't allow submission
- [ ] Leave password field empty
- [ ] Click submit
- [ ] Form shows error or doesn't allow submission

---

## 6. Logout Flow

**Logout button visibility:**
- [ ] Logged in: Login and Register links in navigation hidden
- [ ] Logged in: Logout button visible in navigation
- [ ] Logged out: Login and Register links visible
- [ ] Logged out: Logout button hidden

**Test logout:**
- [ ] Go to dashboard (or any page while logged in)
- [ ] Click Logout button
- [ ] Page shows loading state briefly
- [ ] User session ends
- [ ] Redirects to login page or home page
- [ ] URL changes appropriately

**Verify logout worked:**
- [ ] Go to `/dashboard` directly
- [ ] Should be redirected (not able to access protected page)
- [ ] Can navigate to `/login` to log back in

---

## 7. Protected Routes

### Dashboard Route Protection

**Test without authentication:**
- [ ] Open browser and clear cookies/storage
- [ ] Navigate directly to `/dashboard`
- [ ] Should NOT see dashboard content
- [ ] Redirects to `/login`
- [ ] Shows login form

**Test with authentication:**
- [ ] Log in with valid credentials
- [ ] Navigate to `/dashboard`
- [ ] Shows dashboard content
- [ ] Can see content without redirect
- [ ] URL is `/dashboard`

### Auth Check Loading State

**Verify loading state works:**
- [ ] Open browser console (F12)
- [ ] Clear all cookies and storage
- [ ] Navigate to `/dashboard`
- [ ] Should see brief loading state (spinner or message)
- [ ] After auth check completes, redirects to `/login`
- [ ] No console errors during redirect

### Other Routes Accessibility

**Verify unprotected routes:**
- [ ] Navigate to `/` (home) without logging in
- [ ] HomePage loads normally
- [ ] Navigate to `/login` without logging in
- [ ] LoginPage loads normally
- [ ] Navigate to `/register` without logging in
- [ ] RegisterPage loads normally

---

## 8. Auth Persistence

### Page Refresh While Logged In

**Test auth state persists:**
1. Log in with valid credentials
2. Navigate to dashboard or any page
3. Press F5 or Cmd+R to refresh page
4. [ ] Page does NOT kick you to login
5. [ ] Content loads normally
6. [ ] Still logged in
7. [ ] User session maintained

**Test with multiple page reloads:**
- [ ] Refresh on `/dashboard` multiple times
- [ ] Still logged in each time
- [ ] No redirect to login
- [ ] Session stable

### Page Refresh After Logout

**Test logout persists:**
1. Log in to dashboard
2. Click logout button
3. Press F5 to refresh
4. [ ] Still logged out
5. [ ] Cannot access `/dashboard`
6. [ ] Login form shows when attempting to access protected route

### Close and Reopen Browser

**Test session restoration:**
1. Log in to account
2. Go to dashboard
3. Close browser completely
4. Reopen browser
5. Go to `http://localhost:5173/dashboard`
6. [ ] Should be redirected to `/login` (session ended)
7. OR [ ] If using persistent auth, should still be logged in

Note: This depends on your Firebase session configuration.

---

## 9. Code Quality

### Lint Check

Run linter:
```bash
npm run lint
```

**Verify:**
- [ ] No errors
- [ ] No warnings in auth files (minor warnings okay)
- [ ] Specific files to check:
  - [ ] `src/lib/firebase.ts` — No errors
  - [ ] `src/context/AuthContext.tsx` — No errors
  - [ ] `src/hooks/useAuth.ts` — No errors
  - [ ] `src/components/ProtectedRoute.tsx` — No errors

### Console Check

**Open browser console (F12):**
- [ ] No red errors during registration flow
- [ ] No red errors during login flow
- [ ] No red errors on dashboard
- [ ] No errors on page refresh

**Specific things to avoid:**
- ❌ "Cannot read properties of undefined"
- ❌ "Module not found"
- ❌ "Auth is not defined"
- ❌ "AuthProvider is not a function"
- ❌ Firebase API key errors

---

## 10. TypeScript Types

### Check Auth Context Types

In `src/context/AuthContext.tsx`:
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  // Add any other properties
}
```

**Verify:**
- [ ] AuthContextType interface defined
- [ ] `user` property typed as `User | null`
- [ ] `loading` property typed as `boolean`
- [ ] `logout` method has return type
- [ ] No `any` types used

### Check useAuth Hook Types

In `src/hooks/useAuth.ts`:
```typescript
export function useAuth(): AuthContextType {
  // ...
}
```

**Verify:**
- [ ] Hook has return type specified
- [ ] Return type matches AuthContextType
- [ ] Proper error handling if context missing

### Type Check Entire Project

```bash
npx tsc --noEmit
```

**Verify:**
- [ ] No TypeScript errors
- [ ] All imports are correct
- [ ] All props are properly typed

---

## 11. Understanding Check

Before moving on, make sure you can answer these:

- [ ] **What is Firebase Authentication?** (Service that manages user login/signup)
- [ ] **Why not store passwords yourself?** (Security risk; Firebase handles encryption)
- [ ] **What does `createUserWithEmailAndPassword()` do?** (Creates new user account in Firebase)
- [ ] **What does `signInWithEmailAndPassword()` do?** (Signs in existing user)
- [ ] **What is Context API?** (React feature for sharing state across components)
- [ ] **Why use AuthContext?** (Avoid prop drilling; share auth state everywhere)
- [ ] **What is a controlled component?** (Form where React controls input values)
- [ ] **Why validate before submitting?** (Provide better user experience and data quality)
- [ ] **What are protected routes?** (Routes only accessible to authenticated users)
- [ ] **Why show loading state?** (Tell user app is working; prevent duplicate submissions)

If you can't answer these, review:
- [Concepts](./concepts) — Core authentication explanations
- [Step 1](./steps/01-firebase-setup) — Firebase setup fundamentals
- [Step 2](./steps/02-create-auth-context) — Context API deep dive

---

## 12. Feature Completeness

### Registration Features

- [ ] Email validation (format check)
- [ ] Password validation (length check)
- [ ] Password confirmation validation
- [ ] Submit button disabled during loading
- [ ] Loading indicator shows during submission
- [ ] Success redirects to dashboard
- [ ] Firebase error messages displayed
- [ ] Form clears on successful registration

### Login Features

- [ ] Email and password fields
- [ ] Submit button disabled during loading
- [ ] Loading indicator shows during submission
- [ ] Success redirects to dashboard
- [ ] Firebase error messages displayed
- [ ] Stays on form if error
- [ ] Form doesn't clear on error (user can retry)

### Logout Features

- [ ] Logout button visible when logged in
- [ ] Logout button hidden when logged out
- [ ] Clicking logout signs user out
- [ ] Redirects after logout
- [ ] Protects routes after logout

### Auth Persistence

- [ ] Auth state preserved on refresh
- [ ] User stays logged in after refresh
- [ ] Logout state persists after refresh

---

## 13. Git Commit

**Before committing:**
- [ ] All checks above pass
- [ ] App runs without errors
- [ ] All auth features work as expected
- [ ] No console errors

**Check status:**
```bash
git status
```

**Stage changes:**
```bash
git add src/
```

**Commit:**
```bash
git commit -m "Add Firebase authentication with registration and login

- Set up Firebase config in lib/firebase.ts
- Create AuthContext for global auth state management
- Add useAuth custom hook for accessing auth state
- Create RegistrationForm with email/password validation
- Create LoginForm with error handling
- Implement ProtectedRoute component for auth-only pages
- Add logout functionality to Navigation
- Persist auth state across page refreshes
- Show loading states during auth operations
- Handle Firebase errors gracefully"
```

**Verify commit:**
```bash
git log -1
```

Should show your commit message.

---

## 14. Final Checks

**You're ready for Slice 3 if:**
- [ ] ✅ Registration form validates input
- [ ] ✅ Can create new account
- [ ] ✅ User appears in Firebase console
- [ ] ✅ Login works with registered account
- [ ] ✅ Wrong password shows error
- [ ] ✅ Non-existent user shows error
- [ ] ✅ Logout button works
- [ ] ✅ Dashboard protected from unauthorized access
- [ ] ✅ Auth state persists on refresh
- [ ] ✅ Loading states appear during auth operations
- [ ] ✅ No console errors
- [ ] ✅ No linting errors
- [ ] ✅ All code committed to Git
- [ ] ✅ You understand how authentication works

---

## Troubleshooting

### "Firebase is not defined" Error

**Problem:** AuthContext or firebase.ts file not set up correctly.

**Fix:**
1. Check `src/lib/firebase.ts` exists
2. Verify it exports `auth`:
   ```typescript
   export const auth = getAuth(app);
   ```
3. Check import in AuthContext:
   ```typescript
   import { auth } from '../lib/firebase';
   ```

### "useAuth() must be used inside AuthProvider" Error

**Problem:** Component using useAuth() but not wrapped by AuthProvider.

**Check in `App.tsx`:**
```typescript
<BrowserRouter>
  <AuthProvider>
    <Layout>
      <Routes>
        {/* routes */}
      </Routes>
    </Layout>
  </AuthProvider>
</BrowserRouter>
```

**Verify:**
- [ ] AuthProvider wraps all components that use auth
- [ ] AuthProvider imported from context
- [ ] Inside BrowserRouter but outside Routes

### Firebase Errors: "PERMISSION_DENIED"

**Problem:** Firebase security rules blocking read/write.

**Fix:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project → **Rules**
3. Ensure rules allow authenticated users:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

### Form Doesn't Submit

**Problem:** Submit button disabled or form not handling submission.

**Check:**
- [ ] Form has `onSubmit` handler
- [ ] Button type is `"submit"` not `"button"`
- [ ] Handler calls `e.preventDefault()` to prevent page reload
- [ ] Loading state doesn't disable button before submission

**Fix:**
```typescript
<form onSubmit={handleSubmit}>
  {/* inputs */}
  <button type="submit" disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

### Password Validation Too Strict

**Problem:** Form won't accept valid passwords.

**Check:**
- [ ] Minimum length is 6 characters (or lower)
- [ ] No complex character requirements unless specified
- [ ] Regex pattern is correct

**Standard validation:**
```typescript
const isValidPassword = (pwd: string) => pwd.length >= 6;
```

### Auth Doesn't Persist After Refresh

**Problem:** User logged out after page refresh.

**Check:**
1. Make sure you're listening to Firebase auth state changes
2. In AuthContext:
   ```typescript
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       setUser(user);
       setLoading(false);
     });
     return unsubscribe;
   }, []);
   ```

**Verify:**
- [ ] `onAuthStateChanged` imported from Firebase
- [ ] Called in `useEffect` without dependency array (or with empty array)
- [ ] Unsubscribe cleanup returned

### Protected Route Always Redirects

**Problem:** Logged in users redirected from dashboard.

**Check ProtectedRoute.tsx:**
```typescript
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}
```

**Verify:**
- [ ] Returns children if `user` exists
- [ ] Shows loading state while checking auth
- [ ] Only redirects if loading complete AND no user

### Navigation Button Visibility Wrong

**Problem:** Logout button always visible or always hidden.

**Check Navigation.tsx:**
```typescript
const { user, logout } = useAuth();

return (
  <nav>
    {user ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </nav>
);
```

**Verify:**
- [ ] `user` from useAuth
- [ ] Conditional rendering based on user existence
- [ ] Logout button only shows when `user` is truthy

### "email is not a valid email address" Despite Valid Email

**Problem:** Email validation regex too strict.

**Check your validation:**
```typescript
// Good: Allows most valid emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Bad: Too strict or incorrect
const emailRegex = /^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)*$/;
```

**Consider:** Use built-in HTML5 validation first, add stricter checks only if needed.

### Multiple Redirects or Infinite Loop

**Problem:** App redirects constantly; browser history issues.

**Check:**
- [ ] ProtectedRoute uses `<Navigate>` not redirect function
- [ ] No redirects in loops or circular logic
- [ ] Component doesn't call logout on mount
- [ ] No useEffect running auth check every render

**Fix:**
```typescript
// Good: Check once with useEffect
useEffect(() => {
  checkAuth();
}, []);

// Bad: Check every render
checkAuth();
```

---

## Next Steps

If all checks pass, you're ready to move on!

**What you accomplished:**
- ✅ Set up Firebase Authentication
- ✅ Created global auth state with Context API
- ✅ Built registration form with validation
- ✅ Built login form with error handling
- ✅ Implemented protected routes
- ✅ Added logout functionality
- ✅ Persisted auth state across sessions
- ✅ Handled loading states properly

**Next slice:**

[Slice 3: CRUD Operations →](../../slice-3-crud-operations/)

In Slice 3, you'll add the ability to create, read, update, and delete data in Firestore so authenticated users can manage their own content.
