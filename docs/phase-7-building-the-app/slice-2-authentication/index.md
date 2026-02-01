# Slice 2: Authentication

> **Time**: ~85 minutes | **Goal**: Working user registration, login, and logout with Firebase

## What We're Building

The security layer of your app:
- Firebase Authentication integration
- User registration with validation
- User login with error handling
- Logout functionality
- Protected routes (dashboard requires login)
- Auth state management with Context API

Real authentication that keeps your users' data secure.

## By the End

You'll have:
- [ ] Firebase project created and configured
- [ ] Auth Context managing user state across the app
- [ ] Registration form with email/password validation
- [ ] Login form with error handling
- [ ] Logout button (conditionally rendered)
- [ ] Protected routes that redirect unauthenticated users
- [ ] Auth state that persists on page refresh
- [ ] Deep understanding of authentication patterns

## Prerequisites

Before starting:
- [ ] Slice 1 complete (app skeleton with routes works)
- [ ] Google account (for Firebase Console access)
- [ ] Understanding of React components and props

## Learning Approach

This slice breaks authentication into **13 interactive steps**. Each step:
1. **Explains security concepts first** — Understand auth, Context API, form validation
2. **Prompts you to ask AI questions** — Active learning about Firebase and React patterns
3. **Builds one feature** — Never more than 10 minutes per step
4. **Verifies it works** — Test immediately
5. **Ensures understanding** — Can explain what you built

## Contents

1. **[Core Concepts](./concepts)** — Understanding authentication, Firebase, Context API, hooks, and forms
2. **[Goals](./goals)** — What "done" looks like for this slice
3. **Step-by-Step Guide:**
   - [Step 1: Understanding Authentication](./steps/01-understanding-authentication) — Learn why apps need auth
   - [Step 2: Create Firebase Project](./steps/02-create-firebase-project) — Manual Firebase Console setup
   - [Step 3: Install Firebase SDK](./steps/03-install-firebase-sdk) — Add Firebase package
   - [Step 4: Initialize Firebase](./steps/04-initialize-firebase) — Configure Firebase in your app
   - [Step 5: Understanding Context API](./steps/05-understanding-context-api) — Learn Context for global state
   - [Step 6: Create Auth Context](./steps/06-create-auth-context) — Build AuthContext and useAuth hook
   - [Step 7: Understanding Forms](./steps/07-understanding-forms) — Learn controlled components
   - [Step 8: Create Registration Form](./steps/08-create-registration-form) — Build signup with validation
   - [Step 9: Create Login Form](./steps/09-create-login-form) — Build login with error handling
   - [Step 10: Add Logout](./steps/10-add-logout) — Add logout button to navigation
   - [Step 11: Understanding Protected Routes](./steps/11-understanding-protected-routes) — Learn route guards
   - [Step 12: Create Protected Route](./steps/12-create-protected-route) — Build ProtectedRoute component
   - [Step 13: Verification & Commit](./steps/13-verification-commit) — Test everything and commit
4. **[Verification Checklist](./verification)** — Final comprehensive checklist before moving to Slice 3

## How to Use This Slice

### Start Here
If this is your first time building authentication, **start with the concepts**:

[Read Core Concepts First →](./concepts)

### Then Follow the Steps
Work through each step **in order**. Don't skip steps — authentication is security-critical:

[Begin Step 1: Understanding Authentication →](./steps/01-understanding-authentication)

### Use Active Learning
At each step:
- ✅ Read the "Ask AI" prompts and actually ask them
- ✅ Understand security implications before coding
- ✅ Ask follow-up questions if anything is unclear
- ✅ Test each feature immediately after building it
- ✅ Verify your work before moving on

### Security Matters
Authentication is different from other features:
- **Mistakes have consequences** — Security vulnerabilities can expose user data
- **Test thoroughly** — Follow every verification step
- **Understand the code** — Don't just copy; know what it does
- **Ask questions** — If something seems unclear, ask AI to explain

### Final Check
Before moving to Slice 3:

[Complete Verification Checklist →](./verification)

---

## Quick Navigation

**First time here?** → [Core Concepts](./concepts)

**Ready to build?** → [Step 1: Understanding Authentication](./steps/01-understanding-authentication)

**Want to see goals?** → [Goals](./goals)

**Finished building?** → [Verification Checklist](./verification)
