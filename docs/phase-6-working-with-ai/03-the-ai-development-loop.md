# The AI Development Loop

> **Time**: ~5 minutes | **Difficulty**: Beginner

::: tip Print This Page!
This is the core workflow you'll use throughout the bootcamp. Consider printing it for reference.
:::

## What You'll Learn

- The step-by-step workflow for AI-assisted development
- How to stay in control while moving fast
- When to commit your work

## The Big Idea

Development with AI follows a predictable loop. Mastering this loop is the key skill that separates frustrating AI experiences from productive ones.

## The Loop: Plan → Implement → Verify → Commit

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   1. STATE           2. PLAN           3. IMPLEMENT     │
│   the task           the approach       with AI         │
│      │                   │                  │           │
│      ▼                   ▼                  ▼           │
│   ┌─────┐           ┌─────┐            ┌─────┐         │
│   │     │──────────▶│     │───────────▶│     │         │
│   └─────┘           └─────┘            └─────┘         │
│                                            │            │
│                                            ▼            │
│   7. COMMIT         6. TEST            4. RUN          │
│   if working        the behavior       the code        │
│      ▲                   ▲                  │           │
│      │                   │                  ▼           │
│   ┌─────┐           ┌─────┐            ┌─────┐         │
│   │     │◀──────────│     │◀───────────│     │         │
│   └─────┘           └─────┘            └─────┘         │
│                          │                              │
│                          ▼              5. REVIEW       │
│                     Fix issues          the output      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Step by Step

### 1. STATE the Task Clearly

**One sentence describing what you're doing.**

Good:
- "Add email validation to the signup form"
- "Create a button that opens a modal"
- "Fix the bug where logout doesn't redirect"

Bad:
- "Work on the form"
- "Do the next thing"
- "Make it work"

### 2. PLAN the Approach

Before writing code, know:
- What files will change?
- What's the general approach?
- What "done" looks like?

**Example prompt:**
```
I need to add email validation to the signup form.
Before writing code, can you outline:
1. What files need to change?
2. What validation rules should we use?
3. How should errors be displayed?
```

### 3. IMPLEMENT with AI

Now request the actual code:

```
Create an email validation function that:
- Checks for @ symbol and domain
- Returns an error message if invalid
- Returns null if valid

Then show me how to integrate it into the SignupForm component.
```

**Key principle:** Request the smallest working change, not a complete rewrite.

### 4. RUN the Code

**Every time AI gives you code, run it.**

```bash
npm run dev
```

Check:
- Does it compile?
- Does the page load?
- Any errors in the console?

### 5. REVIEW the Output

In the browser or terminal:
- Does it look right?
- Does it behave right?
- Any unexpected side effects?

### 6. TEST the Behavior

Manually test the feature:
- Enter valid input → does it work?
- Enter invalid input → does it show error?
- Edge cases?

If something's wrong → go back to step 3 with a fix request.

### 7. COMMIT if Working

Only commit when the feature works:

```bash
git add .
git commit -m "Add email validation to signup form"
```

Then start the loop again for the next task.

## The Golden Rule

> **Never be more than 20 minutes from a working state.**

If you've been coding for 20 minutes and things are broken, stop and get back to working first. Then make smaller changes.

## Real-World Example

**Task:** "Add a logout button to the header"

```
1. STATE: Add logout button to header

2. PLAN:
   - Modify Header component
   - Add button that calls Firebase signOut
   - Redirect to login page after logout

3. IMPLEMENT:
   Prompt: "Add a logout button to the Header component that:
   - Only shows when user is logged in
   - Calls Firebase auth signOut
   - Redirects to /login after signing out

   Here's my current Header component:
   [paste code]"

4. RUN: npm run dev, check the header

5. REVIEW: Button appears? Looks right?

6. TEST:
   - Click logout → does it sign out?
   - Am I redirected to login?
   - Can I access protected pages after logout?

7. COMMIT: git commit -m "Add logout button to header"
```

## When Things Go Wrong

### Code Won't Compile

```
Prompt: "I'm getting this error when running the code you gave me:
[paste error]

Here's the code:
[paste code]

What's wrong?"
```

### Feature Doesn't Work

```
Prompt: "The logout button appears but clicking it does nothing.
No errors in console.

Here's my code:
[paste code]"
```

### It Worked, Then Broke

```
Prompt: "Login was working, but after adding [feature], it broke.
Error: [paste error]

I think the problem might be in:
[paste code]"
```

## Check Your Understanding

- [ ] I understand the 7-step loop
- [ ] I'll run code after every AI response
- [ ] I'll commit when features work
- [ ] Small steps beat big changes
- [ ] I know how to report bugs to AI

## The Cheatsheet Version

```
1. STATE   → What am I building? (one sentence)
2. PLAN    → What files, what approach?
3. IMPLEMENT → Ask AI for the smallest working change
4. RUN     → npm run dev, check for errors
5. REVIEW  → Does it look right?
6. TEST    → Does it behave right?
7. COMMIT  → If working: git commit -m "..."

Repeat for each feature.
```

## Next Up

Now let's learn how to review AI-generated code — what to look for.

[Continue: Reviewing AI Code →](./04-reviewing-ai-code)
