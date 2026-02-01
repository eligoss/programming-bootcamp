# Step 13: Verification & Commit

> **Time**: ~10 minutes | **Type**: Testing | **Concepts**: Quality Assurance, Git Workflow

## What This Step Is About

Before moving to the next slice, we need to **thoroughly test all authentication flows** and **commit our code**. Authentication is critical — bugs here affect security and user experience.

## Full Verification Checklist

Work through this list carefully. Test every scenario!

### File Structure

Verify your project has these new files:

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   └── Layout/
│       ├── Layout.tsx
│       └── Navigation.tsx (updated)
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   └── firebase.ts
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx (updated)
│   ├── RegisterPage.tsx (updated)
│   └── DashboardPage.tsx
└── App.tsx (updated)
```

**Check:**
- [ ] All files exist in correct locations
- [ ] No typos in file names
- [ ] All imports resolve (no red squiggles in IDE)

### App Runs Without Errors

```bash
npm run dev
```

**Check:**
- [ ] Dev server starts successfully
- [ ] No errors in terminal
- [ ] Browser console shows no errors on initial load
- [ ] App loads at `http://localhost:5173`

### Registration Flow

**Test 1: Successful registration**

1. Go to `/register`
2. Email: `newuser@example.com`
3. Password: `password123`
4. Confirm: `password123`
5. Click "Register"

**Expected:**
- [ ] Button shows "Creating Account..." or "Loading..."
- [ ] No error messages
- [ ] Redirects to `/dashboard`
- [ ] Navigation shows Logout button (not Login/Register)
- [ ] Firebase Console → Authentication → Users shows `newuser@example.com`

**Test 2: Validation errors**

- [ ] Empty form → Shows "Please fill in all fields"
- [ ] Email without @ → Shows "Please enter a valid email"
- [ ] Password < 6 chars → Shows "Password must be at least 6 characters"
- [ ] Passwords don't match → Shows "Passwords do not match"

**Test 3: Duplicate email**

- [ ] Try registering `newuser@example.com` again
- [ ] Shows Firebase error: "Email already in use" or similar

### Login Flow

**Test 1: Successful login**

1. **Log out first** (if logged in)
2. Go to `/login`
3. Email: `newuser@example.com`
4. Password: `password123`
5. Click "Login"

**Expected:**
- [ ] Button shows "Logging In..." or "Loading..."
- [ ] No error messages
- [ ] Redirects to `/dashboard`
- [ ] Navigation shows Logout button

**Test 2: Wrong credentials**

- [ ] Email: `wrong@example.com` → Shows error (user not found)
- [ ] Email: `newuser@example.com`, Password: `wrong` → Shows error (wrong password)

**Test 3: Validation errors**

- [ ] Empty form → Shows "Please fill in all fields"
- [ ] Invalid email → Shows "Please enter a valid email"

### Logout Flow

**Test 1: Logout from dashboard**

1. Make sure you're logged in
2. Go to `/dashboard`
3. Click "Logout" button

**Expected:**
- [ ] Redirects to `/` (home page)
- [ ] Navigation shows Login/Register (not Logout)
- [ ] If you try to visit `/dashboard` → redirects to `/login`

**Test 2: Logout from home page**

1. Log in
2. Go to `/` (home)
3. Click "Logout"

**Expected:**
- [ ] Stays on `/` (home)
- [ ] Navigation updates to show Login/Register

### Protected Routes

**Test 1: Access while logged out**

1. Make sure you're logged out
2. Manually navigate to `http://localhost:5173/dashboard`

**Expected:**
- [ ] Brief "Loading..." (might be too fast to see)
- [ ] Redirects to `/login`
- [ ] Dashboard does NOT render

**Test 2: Access while logged in**

1. Log in
2. Navigate to `/dashboard` (via nav or URL)

**Expected:**
- [ ] Dashboard renders
- [ ] No redirect
- [ ] No infinite loading

### Navigation Conditional Rendering

**When logged out:**
- [ ] Shows: Home, Login, Register
- [ ] Does NOT show: Dashboard, Logout

**When logged in:**
- [ ] Shows: Home, Dashboard, Logout
- [ ] Does NOT show: Login, Register

### Auth Persistence

**Test 1: Refresh while logged in**

1. Log in
2. Go to `/dashboard`
3. **Refresh page** (F5)

**Expected:**
- [ ] Brief "Loading..." on page load
- [ ] Stays on `/dashboard` (no redirect)
- [ ] Still logged in (check console for user object)

**Test 2: Refresh while logged out**

1. Log out
2. Go to `/login`
3. Refresh page

**Expected:**
- [ ] Stays on `/login`
- [ ] Still logged out

**Test 3: Close and reopen browser**

1. Log in
2. Close browser entirely
3. Reopen and go to `http://localhost:5173/dashboard`

**Expected:**
- [ ] Still logged in (Firebase persists session)
- [ ] Dashboard accessible without login

### Code Quality

Run the linter:

```bash
npm run lint
```

**Check:**
- [ ] No linting errors
- [ ] No unused imports
- [ ] No TypeScript errors

If linter shows errors, fix them now before committing.

## Common Issues Found During Verification

### Registration works but doesn't redirect

**Problem:** Not using `await` before `signUp()`

**Fix:** In `RegisterForm.tsx`:
```typescript
await signUp(email, password);  // Must await!
navigate('/dashboard');
```

### Login redirects but navigation doesn't update

**Problem:** AuthProvider not wrapping app correctly

**Fix:** In `App.tsx`:
```typescript
<AuthProvider>  {/* Must wrap everything */}
  <BrowserRouter>
    {/* All routes */}
  </BrowserRouter>
</AuthProvider>
```

### Protected route redirects in a loop

**Problem:** Login page wrapped in ProtectedRoute

**Fix:** Only protect routes that need auth:
```typescript
// Right:
<Route path="/dashboard" element={<ProtectedRoute>...</ProtectedRoute>} />

// Wrong:
<Route path="/login" element={<ProtectedRoute>...</ProtectedRoute>} />
```

### Auth doesn't persist on refresh

**Problem:** onAuthStateChanged not set up correctly

**Fix:** In `AuthContext.tsx`:
```typescript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  });
  return unsubscribe;  // Cleanup function
}, []);
```

### Firebase errors show as raw codes

**Problem:** Displaying `error.code` instead of friendly message

**Fix:** Create error message helper or just show `error.message`

## Understanding Your Work

Before committing, make sure you understand what you built:

> **💡 Final Understanding Check:**
>
> Ask yourself (or ask AI if you're unsure):
>
> 1. **What does Firebase Authentication provide?**
> 2. **How does the AuthContext make user state available everywhere?**
> 3. **What's the difference between controlled and uncontrolled components?**
> 4. **Why do we need both hidden links AND protected routes?**
> 5. **How does onAuthStateChanged keep auth state in sync?**
> 6. **What happens when a user refreshes the page while logged in?**

If you can't answer these, review the earlier steps or ask AI to explain again.

## Commit Your Work

**IMPORTANT:** Only commit if all verification passes!

### Check Git Status

```bash
git status
```

You should see new/modified files like:
- `src/components/Auth/LoginForm.tsx` (new)
- `src/components/Auth/RegisterForm.tsx` (new)
- `src/components/Auth/ProtectedRoute.tsx` (new)
- `src/contexts/AuthContext.tsx` (new)
- `src/lib/firebase.ts` (new)
- `src/components/Layout/Navigation.tsx` (modified)
- `src/pages/LoginPage.tsx` (modified)
- `src/pages/RegisterPage.tsx` (modified)
- `src/App.tsx` (modified)

### Stage Changes

```bash
git add src/
```

### Commit

```bash
git commit -m "Add authentication with Firebase

- Set up Firebase Authentication with email/password
- Create AuthContext with useAuth hook for global auth state
- Add registration form with validation
- Add login form with error handling
- Implement logout functionality
- Add ProtectedRoute component for route guards
- Update Navigation to show/hide links based on auth state
- Add auth persistence across page refreshes"
```

**Why this commit message?**
- First line summarizes the feature (< 50 chars)
- Blank line separates subject from body
- Bullet points detail all major changes
- Focuses on "what" was added, not implementation details

### Verify Commit

```bash
git log -1
```

Should show your commit with the message above.

## What You Accomplished

Congratulations! You now have:

✅ Firebase Authentication integrated
✅ User registration with validation
✅ User login with error handling
✅ Logout functionality
✅ Protected routes that require authentication
✅ Navigation that updates based on auth state
✅ Auth persistence across page refreshes
✅ All auth state managed through Context API
✅ All code committed to Git

## Skills You Learned

**Firebase:**
- Setting up Firebase project
- Installing and initializing Firebase SDK
- Using Firebase Authentication methods
- Handling Firebase error codes

**React Patterns:**
- Creating and using Context API
- Building custom hooks (`useAuth`)
- Controlled components for forms
- Conditional rendering based on state
- Route guards with ProtectedRoute

**TypeScript:**
- Typing Firebase User objects
- Interface definitions for Context
- Proper typing for form events
- ReactNode type for children prop

**Security:**
- Difference between authentication and authorization
- Client-side validation before API calls
- Protected routes vs hidden links
- Error handling for auth failures

## Next Slice

Authentication is complete! Users can now sign up, log in, and log out. Protected routes ensure security.

Next, we'll build the **protected feature** — a CRUD todo list that each user can manage:

[Continue to Slice 3: Protected Feature (CRUD) →](../../slice-3-protected-feature/)
