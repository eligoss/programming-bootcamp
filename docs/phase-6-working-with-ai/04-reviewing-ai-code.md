# Reviewing AI Code

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- What to look for when reviewing AI code
- Red flags that signal problems
- How to build understanding while reviewing

## The Big Idea

Never commit code you don't understand. AI code needs review just like human code — sometimes more, because AI can confidently produce incorrect solutions.

## The Review Checklist

### 1. Does It Do What You Asked?

Read through and verify:
- Does it implement your requirements?
- Did AI add things you didn't ask for?
- Did it miss something you specified?

**Common issue:** AI adds "helpful" extras that complicate things.

### 2. Do You Understand It?

For each section of code, can you explain:
- What it does?
- Why it's there?

If not, ask:
```
Prompt: "Can you explain what lines 15-20 do in this code?
Specifically, I don't understand the filter function."
```

### 3. Does It Handle Errors?

Check for:
- What happens if the network fails?
- What if the user enters bad data?
- What if required data is missing?

**Red flag:** No error handling at all.

### 4. Are There Security Issues?

Watch for:
- Passwords or secrets in code
- User input used directly without validation
- Sensitive data logged to console

More on this in [AI Safety Rules](./06-ai-safety-rules).

## Red Flags to Watch For

### 🚩 Overly Complex Solutions

**AI says:** Here's a 200-line function with 5 nested callbacks...

**You should think:** Is there a simpler way? Ask:
```
"This seems complex. Is there a simpler approach?"
```

### 🚩 Unfamiliar Libraries

**AI says:** We'll use `mega-form-validator` library...

**You should think:** Do I need another library? Ask:
```
"Can we do this without adding a new library?"
```

### 🚩 Deprecated Patterns

**AI says:** `componentWillMount()` in React...

**You should think:** Is this modern best practice? AI's knowledge has a cutoff date.

### 🚩 Copy-Paste Errors

**AI says:** Component name doesn't match filename, or uses wrong variable names.

**You should think:** Did AI properly adapt to my context?

### 🚩 No Types (in TypeScript)

**AI says:** `any` type everywhere...

**You should think:** This defeats the purpose of TypeScript.

## The "Explain It Back" Technique

Before committing, explain the code to yourself (or your mentor):

```
"This code:
1. Gets the user email from the form
2. Validates it's a proper email format
3. If valid, calls the API to register
4. If invalid, shows an error message
5. Handles API errors by showing a toast notification"
```

If you can't do this, you don't understand it enough.

## Levels of Review

### Quick Review (for small changes)
- Scan the code
- Verify it matches what you asked
- Run and test

### Thorough Review (for important features)
- Read line by line
- Look up unfamiliar functions
- Consider edge cases
- Check error handling

### Deep Review (for security-critical code)
- Verify authentication logic
- Check data validation
- Review what data goes where
- Consider attack vectors

## What to Do When You Don't Understand

### Option 1: Ask for Explanation
```
"Explain this code line by line, assuming I'm a beginner"
```

### Option 2: Ask for Simpler Version
```
"Can you rewrite this in a simpler way that a beginner could understand?"
```

### Option 3: Ask for Comments
```
"Add comments explaining what each section does"
```

### Option 4: Ask Your Mentor
Some things are better explained by a human in context.

## Building Understanding Over Time

Each time you review code:
1. Note patterns you see repeatedly
2. Look up one thing you don't understand
3. Try to predict what AI will suggest next time

This is how you learn — not by just accepting code, but by understanding it.

## Check Your Understanding

- [ ] I should never commit code I don't understand
- [ ] I know the review checklist
- [ ] I recognize common red flags
- [ ] I know how to ask for explanations
- [ ] Review depth matches code importance

## Next Up

Now let's learn how to debug effectively with AI help.

[Continue: Debugging with AI →](./05-debugging-with-ai)
