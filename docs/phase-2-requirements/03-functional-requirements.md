# Functional Requirements

> **Time**: ~7 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to write user stories
- Creating acceptance criteria

## User Stories

### The Format

```
As a [type of user]
I want to [do something]
So that [benefit/reason]
```

This format ensures you think about **who**, **what**, and **why**.

## Core User Stories

### Authentication Stories

```
Story: Register
As a new user
I want to create an account with email and password
So that I can access my private data

Story: Login
As a registered user
I want to log in with my email and password
So that I can access my data

Story: Logout
As a logged-in user
I want to log out
So that no one else can access my data on this device
```

### Feature Stories (Notes Example)

```
Story: Create Note
As a logged-in user
I want to create a new note with title and content
So that I can save my thoughts

Story: View Notes
As a logged-in user
I want to see all my notes in a list
So that I can find what I've written

Story: Edit Note
As a logged-in user
I want to edit an existing note
So that I can update or fix mistakes

Story: Delete Note
As a logged-in user
I want to delete a note
So that I can remove things I no longer need
```

## Acceptance Criteria

Each story needs **acceptance criteria** — specific, testable conditions.

### Format
```
Given [context]
When [action]
Then [expected result]
```

### Example: Register Story

| # | Given | When | Then |
|---|-------|------|------|
| 1 | I'm on registration page | I enter valid email + password (6+ chars) | Account created, logged in |
| 2 | I'm on registration page | I enter invalid email format | See error message |
| 3 | I'm on registration page | I enter password < 6 chars | See "password too short" error |
| 4 | I'm on registration page | I enter already-registered email | See "account exists" error |

### Example: Create Note Story

| # | Given | When | Then |
|---|-------|------|------|
| 1 | I'm logged in | I click "New Note" | I see form with title and content fields |
| 2 | I'm on new note form | I fill out and click Save | Note saved, appears in my list |
| 3 | I'm on new note form | I try to save without title | See validation error |

## Your Stories Checklist

### Authentication (Required)
- [ ] Register with email/password
- [ ] Login with email/password
- [ ] Logout
- [ ] Protected pages require login

### Your Feature (CRUD)
- [ ] **C**reate — Add new item
- [ ] **R**ead — View list of items
- [ ] **U**pdate — Edit existing item
- [ ] **D**elete — Remove item

---

[Continue: Technical Requirements →](./04-technical-requirements)
