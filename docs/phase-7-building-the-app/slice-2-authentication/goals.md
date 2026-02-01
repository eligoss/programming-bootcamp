# Slice 2 Goals

> **Time**: ~25 minutes | **Outcome**: Working authentication

## What "Done" Looks Like

When this slice is complete:

1. **Firebase connected** — App talks to Firebase
2. **Registration works** — New users can create accounts
3. **Login works** — Existing users can sign in
4. **Logout works** — Users can sign out
5. **Route protection** — Dashboard requires login

## Acceptance Criteria

### Firebase Setup
- [ ] Firebase project created
- [ ] Firebase config in `src/lib/firebase.ts`
- [ ] No config errors on load

### Registration
- [ ] Form with email and password inputs
- [ ] Validation (email format, password length)
- [ ] Success → redirects to dashboard
- [ ] Error → shows error message
- [ ] Link to login page

### Login
- [ ] Form with email and password inputs
- [ ] Success → redirects to dashboard
- [ ] Error → shows error message
- [ ] Link to registration page

### Logout
- [ ] Button visible when logged in
- [ ] Clicking logs out user
- [ ] Redirects to home or login page

### Protected Routes
- [ ] Dashboard requires login
- [ ] Not logged in → redirect to login
- [ ] Logged in → dashboard accessible

### Auth State
- [ ] Auth state persists on refresh
- [ ] Loading state while checking auth
- [ ] User info available in context

## Technical Requirements

### New Files

```
src/
├── lib/
│   └── firebase.ts        # Firebase initialization
├── hooks/
│   └── useAuth.ts         # Auth hook
├── context/
│   └── AuthContext.tsx    # Auth state provider
├── components/
│   ├── ProtectedRoute.tsx # Route guard
│   └── forms/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
└── pages/
    ├── LoginPage.tsx      # Updated
    └── RegisterPage.tsx   # Updated
```

### Firebase Config Structure

```typescript
// src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### Auth Context Interface

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
```

## NOT in This Slice

- ❌ Password reset
- ❌ Email verification
- ❌ Social login (Google, etc.)
- ❌ User profile editing
- ❌ Remember me functionality

These are future enhancements.

## Commit Message

When done:
```
Add user authentication with Firebase
```

---

[View Prompts →](./prompts)
