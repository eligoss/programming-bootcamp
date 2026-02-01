# Slice 3: Protected Feature (CRUD)

> **Time**: ~88 minutes | **Goal**: Full CRUD operations with Firestore database

## What We're Building

The data layer of your app:
- Firestore database integration
- Create operation (add new todos)
- Read operation (list todos with queries)
- Update operation (edit existing todos)
- Delete operation (remove todos)
- Loading and empty states
- User-specific data (privacy via queries)

Real data persistence that survives page refreshes and browser closes.

## By the End

You'll have:
- [ ] Firestore enabled and configured
- [ ] TypeScript types for your data model
- [ ] Form to add new todos (CREATE)
- [ ] List view with loading states (READ)
- [ ] Edit functionality for existing todos (UPDATE)
- [ ] Delete with confirmation (DELETE)
- [ ] Empty state when there's no data
- [ ] User-specific todos (each user sees only their data)
- [ ] Deep understanding of databases and CRUD

## Prerequisites

Before starting:
- [ ] Slice 2 complete (authentication works)
- [ ] Can log in and access protected routes
- [ ] Firebase project exists

## Learning Approach

This slice breaks CRUD into **11 interactive steps**. Each step:
1. **Explains database concepts first** — Understand Firestore, NoSQL, queries
2. **Prompts you to ask AI questions** — Active learning about data modeling
3. **Builds one operation** — Never more than 12 minutes per step
4. **Verifies it works** — Test immediately with real data
5. **Ensures understanding** — Can explain what you built

## Contents

1. **[Core Concepts](./concepts)** — Understanding databases, Firestore, CRUD, queries, and data modeling
2. **Step-by-Step Guide:**
   - [Step 1: Understanding Databases](./steps/01-understanding-databases) — Learn what databases are and why Firestore
   - [Step 2: Enable & Install Firestore](./steps/02-enable-install-firestore) — Firebase Console setup and package verification
   - [Step 3: Initialize Firestore & Types](./steps/03-initialize-firestore-types) — Configure Firestore and create data model
   - [Step 4: Understanding CRUD](./steps/04-understanding-crud) — Learn the four fundamental operations
   - [Step 5: Create Add Form](./steps/05-create-add-form) — Build CREATE operation (add new todos)
   - [Step 6: Understanding Queries](./steps/06-understanding-queries) — Learn Firestore filtering and sorting
   - [Step 7: List Items with Loading](./steps/07-list-items-loading) — Build READ operation (fetch and display)
   - [Step 8: Add Empty State](./steps/08-add-empty-state) — UX when there's no data
   - [Step 9: Edit Item](./steps/09-edit-item) — Build UPDATE operation (modify existing)
   - [Step 10: Delete Item](./steps/10-delete-item) — Build DELETE operation (remove with confirmation)
   - [Step 11: Verification & Commit](./steps/11-verification-commit) — Test everything and commit
3. **[Verification Checklist](./verification)** — Final comprehensive checklist before moving to Slice 4

## How to Use This Slice

### Start Here
If this is your first time working with databases, **start with the concepts**:

[Read Core Concepts First →](./concepts)

### Then Follow the Steps
Work through each step **in order**. Don't skip steps — each builds on the previous one:

[Begin Step 1: Understanding Databases →](./steps/01-understanding-databases)

### Use Active Learning
At each step:
- ✅ Read the "Ask AI" prompts and actually ask them
- ✅ Wait for AI to explain before writing code
- ✅ Ask follow-up questions if anything is unclear
- ✅ Test each operation immediately after building it
- ✅ Verify data appears in Firebase Console

### Don't Just Copy
The goal is **understanding**, not speed. You should be able to explain:
- How each CRUD operation works
- Why we use queries to filter data
- How Firestore differs from SQL databases
- Why every document needs a userId

### Final Check
Before moving to Slice 4:

[Complete Verification Checklist →](./verification)

---

## Quick Navigation

**First time here?** → [Core Concepts](./concepts)

**Ready to build?** → [Step 1: Understanding Databases](./steps/01-understanding-databases)

**Finished building?** → [Verification Checklist](./verification)
