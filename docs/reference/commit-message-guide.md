# Commit Message Guide

> How to write clear, professional commit messages

## The Format

```
<type>: <subject>

[optional body]
```

## Subject Line Rules

1. **50 characters max** — Short and sweet
2. **Imperative mood** — "Add feature" not "Added feature"
3. **No period** at the end
4. **Capitalize** first letter

## Common Types

| Type | When to Use | Example |
|------|-------------|---------|
| **Add** | New feature | `Add user login form` |
| **Update** | Enhance existing | `Update header styling` |
| **Fix** | Bug fix | `Fix crash on empty input` |
| **Remove** | Delete code/feature | `Remove deprecated API calls` |
| **Refactor** | Code change, same behavior | `Refactor auth hook` |
| **Style** | Formatting only | `Style login form` |
| **Docs** | Documentation | `Docs: Add API examples` |
| **Test** | Testing | `Test: Add login tests` |

## Good Examples

```
Add email validation to signup form

Update dashboard layout for mobile

Fix bug where logout redirects to wrong page

Remove unused CSS classes

Refactor user context for cleaner API

Style navigation with hover states

Docs: Update README with setup instructions

Test: Add unit tests for auth hook
```

## Bad Examples

```
❌ fix                          (too vague)
❌ updates                      (what updates?)
❌ WIP                          (meaningless)
❌ Fixed the thing              (what thing?)
❌ asdfasdf                     (gibberish)
❌ Add feature and fix bug      (two things)
```

## When to Write a Body

If the subject isn't enough:

```
Fix login redirect bug

The login form was redirecting to /home instead of /dashboard
due to a typo in the Router configuration. Users were getting
confused because they couldn't find their data.

Changed ROUTES.home to ROUTES.dashboard in LoginForm.tsx
```

## Body Rules

- Blank line between subject and body
- Wrap at 72 characters
- Explain **why**, not **what** (code shows what)
- Use bullets for multiple points

## Example with Bullets

```
Add user profile feature

- Create ProfilePage component with edit form
- Add profile picture upload to Firebase Storage
- Implement profile data persistence in Firestore
- Add navigation link in header
```

## Quick Decision Tree

```
Is it new?                    → Add
Is it an improvement?         → Update
Is it a bug fix?              → Fix
Are you removing something?   → Remove
Same behavior, better code?   → Refactor
Just formatting/style?        → Style
```

## Commits to Avoid

### Too Big
```
Add login, signup, dashboard, and settings pages
```
→ Split into separate commits

### Too Small
```
Fix typo in comment
```
→ Combine with related work

### Meaningless
```
Changes
```
→ Describe what actually changed

## Commit Workflow

1. Make small, focused changes
2. Stage related files together
3. Write a clear message
4. Review before committing

```bash
# Stage specific files
git add src/components/LoginForm.tsx
git add src/pages/LoginPage.tsx

# Commit with message
git commit -m "Add login form with validation"
```

## Print-Friendly Cheat Card

```
┌─────────────────────────────────────┐
│         COMMIT MESSAGE              │
├─────────────────────────────────────┤
│ Format:  <verb>: <what changed>     │
│ Length:  Max 50 characters          │
│ Mood:    Imperative ("Add" not      │
│          "Added")                   │
├─────────────────────────────────────┤
│ Verbs:                              │
│   Add     - New feature             │
│   Update  - Improve existing        │
│   Fix     - Bug fix                 │
│   Remove  - Delete code             │
│   Refactor- Restructure             │
│   Style   - Formatting only         │
│   Docs    - Documentation           │
│   Test    - Add/fix tests           │
└─────────────────────────────────────┘
```

---

*Print this for quick reference while committing!*
