# Step 1: Understanding Routing

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Client-side routing, SPAs

## What This Step Is About

Before we install any code, let's make sure you understand **why** we need routing and **what problem it solves**. This isn't just memorizing — this is the foundation of how modern web apps work.

## Interactive Learning

> **💡 Ask AI to Teach You:**
>
> Copy this prompt into Claude and read the response carefully:
>
> ```
> I'm learning to build a React app. Can you explain:
>
> 1. What is client-side routing and why do single-page apps need it?
> 2. What's the difference between clicking a <Link> in React Router vs clicking a regular <a> tag?
> 3. Why don't modern web apps just load new HTML pages from the server like traditional websites?
>
> Use simple analogies — I'm a beginner.
> ```

## What You Should Learn

After AI explains, you should be able to answer these questions:

- **What happens** when you click a regular `<a>` tag? (Full page reload)
- **What happens** when you click a React Router `<Link>`? (Component swap, no reload)
- **Why is "no reload" better?** (Faster, keeps state, smoother UX)
- **What is a single-page app?** (One HTML file, JavaScript swaps content)

If AI's explanation didn't cover these points, ask follow-up questions like:
- "Can you give an example of state that would be lost on page reload?"
- "What makes SPAs feel faster than traditional websites?"

## Check Your Understanding

Before moving to the next step, you should be able to explain:

- [ ] What a single-page application (SPA) is
- [ ] The difference between server-side and client-side routing
- [ ] Why React apps use React Router instead of regular links

## Why This Matters

Understanding **why** you're using a tool is just as important as knowing **how** to use it. When you hit problems later (and you will!), understanding the underlying concepts helps you debug and find solutions.

## Next Step

Now that you understand the "why," let's install the routing library:

[Step 2: Install React Router →](./02-install-router)
