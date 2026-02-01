# What Makes a Good Task

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- Characteristics of well-defined tasks
- The SMART criteria for tasks
- Common task mistakes

## The Big Idea

Not all tasks are created equal. A good task sets you up for success. A vague task leaves you spinning.

## The Good Task Formula

A good task is:

### 1. **S**mall
Completable in one focused session (5-30 minutes)

### 2. **M**easurable
You know exactly when it's done

### 3. **A**ctionable
Starts with a verb — something you can DO

### 4. **R**elevant
Contributes to a user story

### 5. **T**estable
You can verify it works

## Examples: Bad vs Good

### Example 1

**❌ Bad:** "Work on the login"

What does "work on" mean? When are you done?

**✅ Good:** "Create LoginForm component with email and password inputs"

Clear action, clear deliverable.

### Example 2

**❌ Bad:** "Fix bugs"

Which bugs? What counts as fixed?

**✅ Good:** "Fix bug where logout button doesn't redirect to login page"

Specific problem, testable solution.

### Example 3

**❌ Bad:** "Make it better"

Better how? According to whom?

**✅ Good:** "Add loading spinner while notes are being fetched"

Specific improvement, visible result.

## The Verb Test

Good tasks start with action verbs:

| Verb | Example Task |
|------|--------------|
| **Create** | Create NotesListPage component |
| **Add** | Add email validation to form |
| **Implement** | Implement logout function |
| **Connect** | Connect login form to Firebase Auth |
| **Fix** | Fix broken navigation link |
| **Update** | Update header to show user email |
| **Remove** | Remove unused imports |
| **Write** | Write saveNote function |

**Avoid:**
- "Think about..."
- "Consider..."
- "Work on..."
- "Look at..."

## The Done Definition

Each task should have an implicit "Done when..."

| Task | Done When... |
|------|--------------|
| Create LoginForm component | Component renders with inputs |
| Add email validation | Invalid emails show error |
| Connect to Firebase Auth | Successful login redirects |
| Add loading spinner | Spinner visible during load |

If you can't define "done," the task is too vague.

## Task Dependencies

Some tasks depend on others:

```
Create registration page route
    └─► Create RegistrationForm component
            └─► Connect to Firebase Auth
```

Can't connect Firebase if there's no form.
Can't add form if there's no route.

**Rule:** Start with tasks that have no dependencies.

## Task Ordering Strategy

1. **Infrastructure first** — Routes, page shells
2. **Core features second** — Main functionality
3. **Polish last** — Error handling, loading states

For authentication:
1. Create login page (infrastructure)
2. Create login form (feature)
3. Connect to Firebase (feature)
4. Add error messages (polish)

## Common Mistakes

### 1. Tasks Too Big
"Build the dashboard"
→ Break into: layout, navigation, content sections

### 2. Tasks Too Vague
"Handle errors"
→ Specify: "Show error message when login fails"

### 3. Tasks Mixed
"Create form and connect to database"
→ Split: "Create form" + "Connect to database"

### 4. Non-Actionable Tasks
"Research best practices"
→ Make it concrete: "Decide on form validation library"

## Quick Test

For each task, ask:
- [ ] Can I complete this in 30 minutes or less?
- [ ] Do I know exactly what "done" looks like?
- [ ] Does it start with a verb?
- [ ] Can I test that it works?
- [ ] Does it result in a single commit?

If no to any of these, refine the task.

## Check Your Understanding

- [ ] Good tasks are small, specific, and verifiable
- [ ] Tasks should start with action verbs
- [ ] "Done" should be clearly definable
- [ ] Dependencies determine order

## Phase 3 Complete!

You understand how to break big work into manageable tasks.

Now fill in your initial backlog!

[Complete the Backlog Worksheet →](./exercises/backlog-worksheet)
