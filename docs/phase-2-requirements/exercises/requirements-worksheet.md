# Requirements Worksheet

> **Time**: ~5 minutes | **Difficulty**: Beginner

::: tip Print This Page!
This worksheet helps you document your project requirements. Fill it in during or after Phase 2.
:::

---

## Project Summary

**Project Name:** ________________________________

**One-sentence description:**

> "A web app where I can ________________________________"

---

## Business Requirements

### The Problem
What problem does this solve?

> ____________________________________________________________
> ____________________________________________________________

### The User
Who is this for?

> ____________________________________________________________

### The Value
Why is this valuable?

> ____________________________________________________________
> ____________________________________________________________

### Constraints

| Constraint | Value |
|------------|-------|
| Time available | __________ hours |
| User type | Single user / Multiple users |
| Platform | Web (browser) |
| Skill level | Beginner |

---

## Feature Choice

**My chosen feature:** (circle one)

- Notes
- Tasks
- Posts
- Bookmarks
- Other: ________________

**Why this choice?**

> ____________________________________________________________

---

## User Stories

### Authentication

```
As a new user
I want to register with email and password
So that I can access my private data
```
- [ ] Included in my MVP

```
As a registered user
I want to log in with my credentials
So that I can access my data
```
- [ ] Included in my MVP

```
As a logged-in user
I want to log out
So that I can secure my session
```
- [ ] Included in my MVP

### My Feature

**Story 1: Create**
```
As a logged-in user
I want to ________________________________
So that ________________________________
```

**Story 2: Read/View**
```
As a logged-in user
I want to ________________________________
So that ________________________________
```

**Story 3: Update/Edit**
```
As a logged-in user
I want to ________________________________
So that ________________________________
```

**Story 4: Delete**
```
As a logged-in user
I want to ________________________________
So that ________________________________
```

---

## Acceptance Criteria

Pick one story and write detailed criteria:

**Story:** ________________________________

**Criteria:**

1. Given ________________________________
   When ________________________________
   Then ________________________________

2. Given ________________________________
   When ________________________________
   Then ________________________________

3. Given ________________________________
   When ________________________________
   Then ________________________________

---

## Technical Requirements

| Component | Choice |
|-----------|--------|
| Frontend | React + TypeScript |
| Build tool | Vite |
| Authentication | Firebase Auth |
| Database | Firestore |
| Hosting | Firebase Hosting |

### Data Model

What fields does my main data type have?

```typescript
interface ____________ {
  id: string;
  _________: _________;
  _________: _________;
  _________: _________;
  userId: string;
  createdAt: Date;
}
```

---

## Non-Functional Requirements

### Security
- [ ] Only owner can access their data
- [ ] Passwords handled by Firebase (secure)
- [ ] Protected routes require login

### Usability
- [ ] Clear navigation
- [ ] Error messages are helpful
- [ ] Loading states visible

### Reliability
- [ ] Data persists after refresh
- [ ] Errors don't crash the app

---

## Out of Scope

Things we are NOT building (to stay focused):

1. ________________________________
2. ________________________________
3. ________________________________

---

## Definition of Done

My project is complete when:

- [ ] I can register a new account
- [ ] I can log in with my account
- [ ] I can create a new [feature item]
- [ ] I can view my [feature items]
- [ ] I can edit a [feature item]
- [ ] I can delete a [feature item]
- [ ] I can log out
- [ ] When logged out, I can't access my data
- [ ] The app is deployed and accessible via URL

---

## Notes

Any other thoughts, questions, or decisions:

> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________

---

**Date completed:** ________________

**Reviewed by:** ________________

---

[Continue to Phase 3: Work Breakdown →](../../phase-3-work-breakdown/)
