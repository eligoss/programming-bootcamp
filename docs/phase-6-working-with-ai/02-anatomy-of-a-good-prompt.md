# Anatomy of a Good Prompt

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What makes a prompt effective
- The structure of a good prompt
- Common mistakes to avoid

## The Big Idea

A prompt is your instruction to the AI. Better prompts get better results. It's like the difference between asking someone "help me with my project" versus "can you review this specific function for potential bugs?"

## The CCIR Framework

Good prompts have four parts:

| Part | Question | Example |
|------|----------|---------|
| **C**ontext | What's the situation? | "I'm building a React app with Firebase" |
| **C**onstraint | What are the limits? | "Use TypeScript, no external libraries" |
| **I**ntent | What do you want? | "Create a login form" |
| **R**esult | What should I get? | "A component with email/password fields" |

## Examples: Bad vs Good

### Example 1: Creating a Component

**❌ Vague:**
```
Make a form
```

**✅ Clear:**
```
Create a React component called LoginForm with:
- Email input field with validation
- Password input field
- Submit button
- Error message display area

Use TypeScript and handle form submission with a prop callback.
```

### Example 2: Fixing a Bug

**❌ Vague:**
```
This doesn't work, fix it
[pastes code]
```

**✅ Clear:**
```
This function should filter users by age > 18, but it's returning
an empty array even when there are adults in the list.

[pastes code]

Expected: Users over 18
Actual: Empty array
```

### Example 3: Understanding Code

**❌ Vague:**
```
Explain this
[pastes code]
```

**✅ Clear:**
```
I'm a beginner learning React. Can you explain what this useEffect
hook does, line by line? Specifically, I don't understand the
dependency array.

[pastes code]
```

## Prompt Templates

Use these as starting points:

### For Creating Code
```
Create a [component/function/class] called [Name] that:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Tech stack: [React/TypeScript/Firebase/etc.]
Style: [How you want it written]
```

### For Fixing Bugs
```
I have a bug in my [component/function].

What I expect: [Expected behavior]
What happens: [Actual behavior]

Here's the code:
[paste code]

Error message (if any):
[paste error]
```

### For Understanding
```
I'm learning [topic]. Can you explain:
1. What does [specific thing] do?
2. Why would I use it instead of [alternative]?
3. Show me a simple example
```

### For Reviewing
```
Review this code for:
- Potential bugs
- Security issues
- Best practices

[paste code]
```

## Common Mistakes

### 1. Too Vague
**Bad:** "Make it better"
**Good:** "Add error handling for when the API call fails"

### 2. Too Much at Once
**Bad:** "Build the entire user authentication system"
**Good:** "Create the login form component" (then iterate)

### 3. No Context
**Bad:** "Why doesn't this work?" + code
**Good:** "In my React app, this button should open a modal but nothing happens" + code

### 4. Assuming AI Knows Your Project
**Bad:** "Update the UserCard component"
**Good:** [Paste the current UserCard code] "Update this to also show the user's email"

## Iteration is Normal

Don't expect perfection on the first try:

```
You: Create a button component
AI: [Creates a button]

You: Make it blue and add rounded corners
AI: [Updates styling]

You: Also disable it when isLoading is true
AI: [Adds loading state]
```

This back-and-forth is normal and expected. It's a conversation, not a single command.

## The Context Window

AI can "see" the conversation history. Use this:

- **Don't repeat everything** — AI remembers earlier context
- **Reference previous code** — "In the component you just created..."
- **Build incrementally** — Each message builds on the last

## Check Your Understanding

- [ ] Good prompts have Context, Constraint, Intent, Result
- [ ] Specific prompts get better results than vague ones
- [ ] Break big tasks into small prompts
- [ ] Iteration and back-and-forth is normal
- [ ] AI remembers the conversation context

## Next Up

Now let's learn the full development loop — how to go from idea to committed code.

[Continue: The AI Development Loop →](./03-the-ai-development-loop)
