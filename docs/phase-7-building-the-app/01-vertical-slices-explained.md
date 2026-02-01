# Vertical Slices Explained

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What vertical slices are
- Why this approach works
- How we'll build the app

## The Big Idea

A **vertical slice** is a thin, complete feature that cuts through all layers of the application.

Instead of building all the UI, then all the logic, then all the database — we build one complete feature at a time.

## Two Approaches Compared

### Horizontal Layers (Not This)

```
Week 1: Build all the UI
Week 2: Build all the logic
Week 3: Connect to database
Week 4: Finally test it...

Problem: Nothing works until Week 4
```

### Vertical Slices (This!)

```
Hour 1: Login works end-to-end
Hour 2: Registration works end-to-end
Hour 3: Create note works end-to-end
...

Benefit: Something works at every step
```

## Visual Comparison

```
Horizontal Layers:
┌───────────────────────────────────────┐
│         UI (all pages)                │ ← Build this first
├───────────────────────────────────────┤
│         Logic (all features)          │ ← Then this
├───────────────────────────────────────┤
│         Database (all data)           │ ← Then this
└───────────────────────────────────────┘
Nothing works until all layers done.

Vertical Slices:
┌─────────┬─────────┬─────────┬─────────┐
│ Login   │ Notes   │ Edit    │ Delete  │
│ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │
│ │ UI  │ │ │ UI  │ │ │ UI  │ │ │ UI  │ │
│ ├─────┤ │ ├─────┤ │ ├─────┤ │ ├─────┤ │
│ │Logic│ │ │Logic│ │ │Logic│ │ │Logic│ │
│ ├─────┤ │ ├─────┤ │ ├─────┤ │ ├─────┤ │
│ │ DB  │ │ │ DB  │ │ │ DB  │ │ │ DB  │ │
│ └─────┘ │ └─────┘ │ └─────┘ │ └─────┘ │
│  Done!  │  Done!  │  Done!  │  Done!  │
└─────────┴─────────┴─────────┴─────────┘
Each slice works independently.
```

## Why Vertical Slices for Learning

### 1. See Progress Immediately
Each slice produces something you can show and use.

### 2. Catch Problems Early
If login doesn't work, you find out in slice 1, not at the end.

### 3. Natural Commit Points
Each slice = one meaningful commit.

### 4. Motivation
Completing real features feels good and keeps you going.

### 5. Working Software Always
Never more than 20 minutes from a working state.

## Our Slices

| Slice | What We Build | Outcome |
|-------|---------------|---------|
| **1: Skeleton** | Routes, navigation, page shells | App structure works |
| **2: Authentication** | Register, login, logout | Can sign in and out |
| **3: Protected Feature** | Your CRUD feature | Core functionality works |
| **4: Security Rules** | Firestore protection | Data is secure |
| **5: Polish** | Loading states, error handling | Feels complete |

Each slice builds on the previous one.

## The Pattern for Each Slice

```
1. UNDERSTAND what we're building
   - Read the goals
   - Check acceptance criteria

2. BUILD with AI assistance
   - Use provided prompts
   - Modify as needed

3. VERIFY it works
   - Test manually
   - Check all criteria

4. COMMIT the working code
   - Meaningful commit message
   - Push to GitHub
```

## What "Done" Looks Like for Each Slice

### Slice 1: Skeleton
- [ ] App loads without errors
- [ ] Navigation between pages works
- [ ] Basic layout visible

### Slice 2: Authentication
- [ ] Can create account
- [ ] Can log in
- [ ] Can log out
- [ ] Protected pages require login

### Slice 3: Protected Feature
- [ ] Can create items
- [ ] Can view item list
- [ ] Can edit items
- [ ] Can delete items
- [ ] Data persists after refresh

### Slice 4: Security Rules
- [ ] Rules deployed
- [ ] Only owner can access their data
- [ ] Tested with different scenarios

### Slice 5: Polish
- [ ] Loading spinners visible
- [ ] Error messages helpful
- [ ] Success feedback shown
- [ ] UI looks clean

## Check Your Understanding

- [ ] Vertical slices are complete features, not layers
- [ ] Each slice produces working functionality
- [ ] We build one slice at a time
- [ ] Each slice ends with a commit

## Ready to Build!

Let's start with Slice 1: the app skeleton.

[Start Slice 1: Skeleton →](./slice-1-skeleton/)
