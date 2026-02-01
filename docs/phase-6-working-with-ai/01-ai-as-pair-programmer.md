# AI as Pair Programmer

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- The right mental model for AI collaboration
- What AI is good at (and not)
- How to think about AI as a tool

## The Big Idea

AI is not a magic button that writes code for you. It's more like having a very knowledgeable colleague sitting next to you — one who knows a lot but still needs clear instructions and sometimes makes mistakes.

## The Right Mental Model

### ❌ Wrong: AI as Oracle
"Just tell AI what you want and it'll figure it out perfectly."

### ✅ Right: AI as Pair Programmer
"Work together, where I drive and AI assists."

In pair programming:
- One person is the **Driver** (types, makes decisions)
- One person is the **Navigator** (suggests, reviews, catches errors)

With AI:
- **You** are always the Driver
- **AI** is the Navigator

## What AI Is Good At

| Strength | Example |
|----------|---------|
| **Generating boilerplate** | "Create a React component with these props" |
| **Explaining concepts** | "Explain what useEffect does" |
| **Debugging** | "Why might this error be happening?" |
| **Suggesting patterns** | "What's a good way to structure this?" |
| **Translation** | "Convert this to TypeScript" |
| **Documentation** | "Add comments explaining this code" |

## What AI Is Not Good At

| Limitation | Reality |
|------------|---------|
| **Reading minds** | It can't know your full context without you explaining |
| **Perfect code** | It makes mistakes, uses outdated patterns |
| **Business logic** | Only you know what your app *should* do |
| **Security guarantees** | Always verify security-sensitive code |
| **Running code** | It can write code, but you must run and test it |

## The Amplification Effect

Here's the key insight:

> **AI amplifies your current abilities.**

- If you vaguely understand React, AI helps you learn faster
- If you clearly understand what you want, AI builds it faster
- If you're confused, AI can't read your mind

The more you understand, the better your prompts, the better the output.

## A Day in Pair Programming

Without AI:
```
1. Think about what to build
2. Look up documentation
3. Write code slowly
4. Debug errors
5. Repeat
```

With AI:
```
1. Think about what to build      ← Still you
2. Ask AI for approach            ← AI helps
3. AI writes initial code         ← AI generates
4. You review and understand      ← Still you
5. You run and test               ← Still you
6. Fix issues together            ← Both
```

Notice: You're still thinking, reviewing, and running. AI accelerates the middle parts.

## The Trust Spectrum

How much should you trust AI code?

```
Blind Trust     Reasonable Trust     Verify Everything
❌ ─────────────────── ✓ ────────────────────── ❌
    Never              Sweet spot           Too slow
```

**Reasonable trust means:**
- Read the code before running
- Understand what it does
- Test that it works
- Be extra careful with security

## Real Example

**Bad approach:**
```
"Build my app"
→ AI produces something, you have no idea what it does
→ You can't debug it because you don't understand it
```

**Good approach:**
```
"Create a login form component with email and password fields"
→ AI produces focused code
→ You understand what you asked for
→ You can verify it does what you wanted
```

## Your Responsibilities

When working with AI, you're responsible for:

1. **Clear instructions** — AI can't read your mind
2. **Understanding** — Don't commit code you don't understand
3. **Verification** — Run the code, test it works
4. **Security** — Never share passwords, API keys
5. **Final decisions** — You're the author, not AI

## Check Your Understanding

- [ ] AI is a pair programmer, not a magic button
- [ ] I'm the Driver; AI is the Navigator
- [ ] AI amplifies my abilities
- [ ] I need to verify and understand AI code
- [ ] Clear instructions get better results

## Next Up

Now let's learn how to write prompts that get good results.

[Continue: Anatomy of a Good Prompt →](./02-anatomy-of-a-good-prompt)
