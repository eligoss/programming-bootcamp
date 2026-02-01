# Step 6: Create Auth Context

> **Time**: ~10 minutes | **Type**: Coding | **Concepts**: React Context, Custom Hooks, Firebase Auth

## What We're Building

Creating an `AuthContext` that:
- Tracks current user state
- Provides `signIn`, `signUp`, and `signOut` functions
- Includes a custom `useAuth()` hook for easy access
- Wraps our app to make auth available everywhere

## Before You Code: Understanding Custom Hooks

> **💡 Ask AI First:**
>
> ```
> What is a custom hook in React?
> Why do we create a useAuth() hook instead of using Context directly?
> What does createContext() do?
> What is a Provider component and how do we use it?
> ```

**What you should learn:**
- Custom hooks start with `use` and can use other hooks
- `useAuth()` is cleaner than `useContext(AuthContext)` in every component
- `createContext()` creates the tunnel for sharing data
- Provider wraps components that need access to the context

## Let's Build It

### Prompt: Create Auth Context and Provider

```
Create an authentication context for my React + TypeScript app.

Requirements:
1. File location: src/contexts/AuthContext.tsx
2. Create AuthContext with createContext
3. Create AuthProvider component that:
   - Tracks user state (null when logged out, User object when logged in)
   - Tracks loading state (true while checking auth status)
   - Provides signIn(email, password) function using Firebase
   - Provides signUp(email, password) function using Firebase
   - Provides signOut() function using Firebase
   - Listens to Firebase auth state changes with onAuthStateChanged
4. Create useAuth() custom hook that returns the context
5. Export both AuthProvider and useAuth

Use:
- import { auth } from '../lib/firebase'
- import Firebase auth functions: createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
- TypeScript types for proper type safety

After creating the code, explain:
- What onAuthStateChanged does
- Why we need a loading state
- How useAuth() simplifies using the context
- Where we'll wrap our app with AuthProvider
```

**What to expect:**
- New file `src/contexts/AuthContext.tsx`
- AuthContext created with createContext
- AuthProvider component with useState for user and loading
- useEffect with onAuthStateChanged listener
- Three async functions: signIn, signUp, signOut
- useAuth custom hook
- TypeScript types for User and AuthContextType

**Files you'll create:**
- `src/contexts/AuthContext.tsx`

## Understanding What You Built

After AI creates the code, make sure you understand each part:

> **💡 Ask AI to Explain:**
>
> ```
> Walk me through the AuthContext.tsx file:
>
> 1. What does createContext() create and why do we give it undefined as initial value?
> 2. What does onAuthStateChanged() do and when does it fire?
> 3. Why do we return a cleanup function from useEffect?
> 4. What happens when signIn() is called? Walk me through the flow.
> 5. Why does useAuth() throw an error if used outside AuthProvider?
> 6. What TypeScript types were created and why?
> ```

**Key concepts to understand:**
- `createContext()` — Creates the context object (the tunnel)
- `onAuthStateChanged()` — Firebase listener that fires whenever auth state changes
- `loading` state — Prevents flashing wrong content while checking auth
- `useAuth()` throws error — Prevents using context in wrong places
- Type safety — TypeScript ensures you use auth correctly

## Let's Use It

Now wrap your app with the AuthProvider:

### Prompt: Wrap App with AuthProvider

```
Update App.tsx to wrap the entire app with AuthProvider.

Structure should be:
<AuthProvider>
  <BrowserRouter>
    {/* existing routes and layout */}
  </BrowserRouter>
</AuthProvider>

Show me the updated App.tsx code.
```

**What to expect:**
- Import statement: `import { AuthProvider } from './contexts/AuthContext';`
- AuthProvider wraps everything
- Existing router and routes stay inside

**Files you'll modify:**
- `src/App.tsx`

## Verify It Works

### Manual Testing:

1. **Check file exists:**
   ```bash
   ls src/contexts/AuthContext.tsx
   ```

2. **Run the app:**
   ```bash
   npm run dev
   ```

3. **Check console:**
   - Should see no errors
   - App should load normally
   - You won't see auth working yet (we haven't built forms)

4. **Test useAuth hook (temporary):**

   Add this to any page (e.g., `HomePage.tsx`):
   ```typescript
   import { useAuth } from '../contexts/AuthContext';

   export default function HomePage() {
     const { user, loading } = useAuth();
     console.log('Auth state:', { user, loading });

     return <h1>Home Page</h1>;
   }
   ```

   **What to expect in console:**
   - First: `{ user: null, loading: true }`
   - Then: `{ user: null, loading: false }`

   **Remove the console.log** after verifying!

### Checklist:

- [ ] `src/contexts/AuthContext.tsx` file exists
- [ ] No TypeScript errors
- [ ] App wrapped with AuthProvider in App.tsx
- [ ] useAuth() hook can be imported
- [ ] Console shows loading changes from true to false
- [ ] No Firebase errors in console

## Common Issues

### "AuthContext is undefined"

**Problem:** Trying to use useAuth() outside of AuthProvider

**Fix:**
- Make sure AuthProvider wraps your entire app in App.tsx
- Provider must be ABOVE any component that calls useAuth()

### "Cannot read properties of undefined (reading 'user')"

**Problem:** createContext() default value is undefined

**Fix:** This is fine! The error should only happen if you use useAuth() outside AuthProvider, which the custom hook prevents:
```typescript
if (!context) {
  throw new Error('useAuth must be used within AuthProvider');
}
```

### "onAuthStateChanged is not a function"

**Problem:** Wrong import from Firebase

**Fix:**
```typescript
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

// Use it like this:
onAuthStateChanged(auth, (user) => {
  // ...
});
```

### App shows "Loading..." forever

**Problem:** Loading state never set to false

**Fix:** Make sure onAuthStateChanged callback sets loading:
```typescript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false); // Must set this!
  });
  return unsubscribe;
}, []);
```

### TypeScript error: "Type 'User | null' is not assignable"

**Problem:** Missing TypeScript types

**Fix:**
```typescript
import { User } from 'firebase/auth';

const [user, setUser] = useState<User | null>(null);
```

## Code Example

Your `AuthContext.tsx` should look roughly like this:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## What You Learned

At this point you should understand:
- ✅ How to create a React Context
- ✅ How to create a Provider component
- ✅ How to create a custom hook for context
- ✅ How onAuthStateChanged tracks Firebase auth state
- ✅ Why we need a loading state during auth checks
- ✅ How to wrap an app with a Provider

## Next Step

Auth context is ready! But before we build forms, let's understand how React forms work:

[Step 7: Understanding Forms →](./07-understanding-forms)
