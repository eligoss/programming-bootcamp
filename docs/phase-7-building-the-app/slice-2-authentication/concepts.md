# Core Concepts: Authentication

> Understanding how to keep users safe and signed in

Before we build our login and register pages, let's understand the key concepts behind authentication. Authentication isn't magic — it's a series of patterns and tools working together to answer one question: "Are you really who you say you are?"

## What is Authentication?

**Authentication** is the process of verifying that a user is who they claim to be. It's like checking an ID at a restaurant — they say they're 21, so you ask for their license to verify.

**Authorization** is different: it's about what an authenticated user is allowed to do. A waiter can enter the kitchen, but a customer can't. Both are authenticated (the restaurant knows who they are), but their authorization levels differ.

In web apps, authentication typically works with passwords or third-party services: you prove who you are by providing credentials that only you know. Once authenticated, the app remembers you across different pages and sessions. Without authentication, every time you navigated to a new page, the app would ask "who are you?" all over again.

Apps need authentication because they store user data (emails, preferences, content), and you only want the right person accessing their own data. Imagine a banking app where anyone could see anyone else's account balance — that would be a disaster.

## What is Firebase Authentication?

**Firebase Authentication** is a backend service from Google that handles user sign-ups, logins, and password resets. Instead of building your own user database and password-hashing system (which is risky!), you use Firebase to manage all that complexity.

Firebase provides several authentication methods:
- **Email & Password** — Users sign up with an email and password
- **Google Sign-In** — "Sign in with Google" button
- **GitHub Sign-In** — "Sign in with GitHub" button
- And more (Apple, Facebook, anonymous, etc.)

When a user logs in, Firebase verifies their credentials, generates a token (a secure string that proves they're authenticated), and sends it back to your app. Your app then uses that token for all future requests: "Here's my token, let me see my data."

We use Firebase because it handles the hard parts: securely storing passwords (hashing and salting), preventing brute-force attacks, and managing sessions. You don't have to be a security expert to build a safe app.

## What is the Context API?

**The Context API** is React's built-in system for sharing state across many components without "prop drilling" (passing props through every component in between).

Imagine you have auth state (is the user logged in? what's their name?) that 15 different components need to know about. Without Context, you'd pass it as props through every parent component, even ones that don't care about it. That's messy.

With Context, you create an "Auth Context" at the top of your app. Any component can ask "what's the current auth state?" without passing props through every parent. Context solves this with two concepts:

**Provider** — A component that wraps your app and provides state. Like a store that hands out information.

**Consumer/Hook** — Components that request data from the Provider using the `useContext` hook. Like customers asking the store for information.

Context is perfect for authentication because:
- Auth state is needed in many places (navigation, protected routes, user profile)
- The auth state rarely changes (except on login/logout)
- It avoids passing `isLoggedIn` and `user` through every component

## What are React Hooks?

**React Hooks** are special functions that let components manage state and side effects. They're called "hooks" because they "hook into" React features.

The three hooks you need for authentication:

### `useState` — Manage Component State

`useState` lets a component remember things between renders.

```tsx
// Without useState: the count would always be 0
function Counter() {
  let count = 0;
  return <button onClick={() => count++}>{count}</button>;
}

// With useState: React remembers the count
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

For authentication, you'd use `useState` for form inputs:

```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

### `useEffect` — Run Side Effects

`useEffect` runs code when a component mounts (loads) or when dependencies change. Side effects are anything "outside" React: API calls, timers, subscriptions.

```tsx
// Run once when component mounts
useEffect(() => {
  console.log('Component mounted!');
}, []);

// Run when 'userId' changes
useEffect(() => {
  fetchUserData(userId);
}, [userId]);
```

For authentication, you'd use `useEffect` to check if the user is already logged in:

```tsx
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  return unsubscribe; // Cleanup
}, []);
```

### `useContext` — Access Shared State

`useContext` lets a component access data from a Context Provider.

```tsx
// Create context
const AuthContext = createContext();

// In a component far down the tree
const { user, isLoggedIn } = useContext(AuthContext);
```

This avoids prop drilling: you don't need to pass `user` through 5 parent components.

## What are Controlled Components?

**Controlled components** are form inputs whose values are controlled by React state. The input's value comes from state, and the state updates when the user types.

```tsx
// Uncontrolled: input manages its own value
<input type="email" />

// Controlled: React manages the value
const [email, setEmail] = useState('');
return <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />;
```

Controlled components are the React way because:
- **React knows the value** — You can validate or manipulate it instantly
- **Easy to reset** — Just `setEmail('')` to clear the form
- **Easy to pre-fill** — Set initial state to existing data
- **Real-time validation** — Show errors as users type

For a login form, controlled inputs let you enable/disable the submit button based on whether the email and password are valid:

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email.includes('@') && password.length >= 6;

  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={!isValid}>Login</button>
    </form>
  );
}
```

## What is Form Validation?

**Form validation** is checking that user input is correct before submitting it. There are two kinds:

**Client-side validation** (in the browser) gives instant feedback to the user: "Your email needs an @". It's fast and happens before any data leaves the browser.

```tsx
// Client-side: quick feedback
const isValidEmail = email.includes('@') && email.includes('.');
if (!isValidEmail) {
  setError('Please enter a valid email');
  return;
}
```

**Server-side validation** (on Firebase/backend) double-checks that data is safe before storing it. This is crucial because a malicious user could bypass client-side checks.

Think of it like a bouncer at a club:
- **Client-side** = The bouncer at the door asking "Do you look 21?" (quick, prevents most issues)
- **Server-side** = Checking the ID under a blacklight (thorough, the real verification)

You always need both because:
- Client-side makes the app feel responsive and user-friendly
- Server-side prevents malicious data from being stored

For authentication, validation might check:
- Email is properly formatted: `user@example.com`
- Password is strong enough: 8+ characters, uppercase, numbers
- Required fields aren't empty
- Passwords match when registering

## What are Protected Routes?

**Protected routes** are pages that only authenticated users can access. If someone tries to visit `/dashboard` without logging in, they get redirected to `/login`.

```tsx
// Regular route: anyone can access
<Route path="/login" element={<LoginPage />} />

// Protected route: only authenticated users
<Route path="/dashboard" element={
  currentUser ? <Dashboard /> : <Navigate to="/login" />
} />
```

Protected routes answer the question: "Should this user see this page?"

The pattern is simple:
1. Check if `currentUser` exists (they're logged in)
2. If yes: render the protected component
3. If no: redirect to login

You can also create a `<ProtectedRoute>` component that wraps this logic:

```tsx
function ProtectedRoute({ children, currentUser }) {
  return currentUser ? children : <Navigate to="/login" />;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute currentUser={currentUser}>
    <Dashboard />
  </ProtectedRoute>
} />
```

## How It All Fits Together

Here's how authentication works in our app:

1. **User visits the app** → App checks Firebase: "Are we logged in?"
2. **Firebase responds** → "Yes, here's the user" or "No one's logged in"
3. **State updates** → App's `AuthContext` stores the user
4. **Components access state** → Navigation shows "Hello, John!" if logged in, or "Sign Up" button if not
5. **User clicks login** → Form submits to Firebase
6. **Firebase authenticates** → Verifies email/password and sends back a token
7. **Token stored** → Firebase SDK keeps it automatically (securely)
8. **State updates** → AuthContext now has the user, components re-render
9. **Protected routes work** → Dashboard is now accessible because `currentUser` exists

All of this happens without the user thinking about it. They just sign in and see their dashboard.

### Component Structure

```tsx
// App.tsx - Root component
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// ProtectedRoute.tsx
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// LoginPage.tsx
import { useAuth } from './context/AuthContext';
import { useState } from 'react';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button type="submit">Log In</button>
    </form>
  );
}

// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

## Visual Diagrams

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User visits app for first time                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ Check localStorage   │
      │ for Firebase token   │
      └──────────┬───────────┘
                 │
         ┌───────┴────────┐
         │                │
    Token exists      No token
         │                │
         ▼                ▼
    ┌────────────┐   ┌──────────────┐
    │ Restore    │   │ Show Login   │
    │ user state │   │ /Register    │
    │ (logged in)│   │ (logged out) │
    └────────────┘   └──────────────┘
         │                │
         └────────┬───────┘
                  │
                  ▼
        ┌──────────────────┐
        │ User navigates   │
        │ to pages         │
        └──────────────────┘
                  │
         ┌────────┴─────────┐
         │                  │
    Public route       Protected route
         │                  │
         ▼                  ▼
    Show login page    currentUser?
    (no auth needed)    │
                   ┌────┴────┐
                   │          │
                  YES         NO
                   │          │
                   ▼          ▼
              Show page   Redirect to
              (protected)  /login
```

### Context API Pattern

```
┌─────────────────────────────────────────────────────────┐
│ App Component                                           │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <AuthProvider>  (wraps entire app)               │  │
│  │                                                  │  │
│  │  Manages:                                        │  │
│  │  - currentUser state                             │  │
│  │  - login() function                              │  │
│  │  - logout() function                             │  │
│  │  - register() function                           │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │ <BrowserRouter>                            │ │  │
│  │  │                                            │ │  │
│  │  │  ┌──────────────┐  ┌──────────────┐       │ │  │
│  │  │  │ LoginPage    │  │ Dashboard    │ ...   │ │  │
│  │  │  │              │  │              │       │ │  │
│  │  │  │ useAuth() ◄──┼──┼──► useAuth() │       │ │  │
│  │  │  │ gets user    │  │  gets user   │       │ │  │
│  │  │  └──────────────┘  └──────────────┘       │ │  │
│  │  │                                            │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

Any component can do: const { currentUser } = useAuth()
without passing props through every parent component
```

### Protected Route Decision Tree

```
User tries to access /dashboard
         │
         ▼
Is there a currentUser?
    (from AuthContext)
         │
    ┌────┴────┐
    │          │
   YES         NO
    │          │
    ▼          ▼
Render    Redirect to
Dashboard  /login page
component   (use Navigate)
    │          │
    └────┬─────┘
         │
    User can see
    dashboard OR
    prompted to login
```

### Form to Firebase Flow

```
User fills in login form
         │
         ▼
Clicks "Log In" button
         │
         ▼
  onSubmit handler
  (validate form)
         │
    ┌────┴────┐
    │          │
 Invalid    Valid
    │          │
    ▼          ▼
 Show error  Call login()
 message   (from AuthContext)
              │
              ▼
         Send email +
         password to
         Firebase
              │
         ┌────┴────┐
         │          │
     Success    Failed
         │          │
         ▼          ▼
  Firebase      Show
  generates     error
  token         message
         │
         ▼
  Token saved
  (automatically)
         │
         ▼
  currentUser
  updates
         │
         ▼
  Navigation re-renders
  (shows user's name)
  OR
  ProtectedRoute
  now allows access
```

## Why These Patterns Matter

Authentication is the foundation of personalized web apps. Without it, you'd need usernames in the URL like `/dashboard?user=john` — anyone could change it to see someone else's data. With proper authentication, you have trust:

- **Users trust you** — Their passwords are secure, their data is private
- **You trust users** — You know who's accessing what
- **Your app is useful** — Each user sees their own data, not everyone's

React's Context API + Firebase makes authentication approachable. You're not writing password-hashing algorithms or session management from scratch. You're using industry-standard tools that have been battle-tested by millions of apps.

## What You'll Build

In this slice, you'll create:

- ✅ An `AuthContext` that manages login state across the app
- ✅ A `RegisterPage` with form validation
- ✅ A `LoginPage` with email/password inputs
- ✅ A `ProtectedRoute` component that guards the dashboard
- ✅ Logout functionality in the navigation
- ✅ Error handling and success messages
- ✅ Auto-restore login state when the app refreshes

By the end, you'll have a complete authentication system. Users can sign up, log in, stay logged in across page refreshes, and access protected pages only when authenticated.

---

## Next Steps

Now that you understand the concepts, let's start building:

[Step 1: Setting Up Firebase →](./steps/01-setting-up-firebase)
