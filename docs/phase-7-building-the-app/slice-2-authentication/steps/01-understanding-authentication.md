# Step 1: Understanding Authentication

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Authentication, Authorization, Security

## What This Step Is About

Before writing any code, you need to understand **why** apps need authentication and **what problem it solves**. This foundational knowledge will help you make better security decisions later.

## Interactive Learning

> **💡 Ask AI to Teach You:**
>
> Copy this prompt into Claude and read the response carefully:
>
> ```
> I'm learning to build authentication for a web app. Can you explain:
>
> 1. What is authentication and why do web apps need it?
> 2. What's the difference between authentication and authorization?
> 3. Why shouldn't I build my own authentication system from scratch?
> 4. What security risks exist if authentication is done wrong?
>
> Use simple examples — I'm a beginner.
> ```

## What You Should Learn

After AI explains, you should be able to answer these questions:

- **What is authentication?** (Proving you are who you say you are)
- **What is authorization?** (What you're allowed to do once authenticated)
- **Why use Firebase Auth instead of building your own?** (Security, complexity, best practices)
- **What could go wrong?** (Password storage, XSS, CSRF, session hijacking)

If AI's explanation didn't cover these points, ask follow-up questions like:
- "Can you give an example of when authentication succeeds but authorization fails?"
- "What makes password storage so complex?"
- "How does Firebase keep my users' passwords safe?"

## Key Security Concepts

Make sure you understand these terms:

**Authentication** = "Who are you?"
- Login with email/password
- Firebase verifies credentials
- You get a token proving your identity

**Authorization** = "What can you do?"
- Access dashboard (allowed if authenticated)
- Edit someone else's data (denied even if authenticated)
- Delete content (might require admin role)

**Why Firebase?**
- Passwords never stored in plain text
- Industry-standard encryption (bcrypt)
- Handles password resets securely
- Manages session tokens
- Battle-tested against attacks

## Check Your Understanding

Before moving to the next step, you should be able to explain:

- [ ] Why apps need to know who is using them
- [ ] The difference between "who you are" and "what you can do"
- [ ] Why building auth from scratch is risky
- [ ] What Firebase Authentication provides

## Real-World Analogy

Think of authentication like getting into a concert:

**Authentication (Who are you?):**
- Show your ticket at the entrance
- Security verifies it's real
- You get a wristband

**Authorization (What can you do?):**
- Wristband lets you enter the venue (allowed)
- Try to go backstage (denied - wrong access level)
- Try to get VIP seating (denied - wrong ticket type)

Your **ticket** = email/password
Your **wristband** = Firebase auth token
**Security checking** = Firebase verifying credentials

## Why This Matters

Understanding authentication before implementing it helps you:
- Make secure design decisions
- Debug auth problems more effectively
- Explain security to non-technical stakeholders
- Avoid common security mistakes

## Next Step

Now that you understand the "why," let's create a Firebase project:

[Step 2: Create Firebase Project →](./02-create-firebase-project)
