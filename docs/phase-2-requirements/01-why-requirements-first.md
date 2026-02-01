# Why Requirements First

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- Why we don't start with code
- How clarity prevents wasted work

## The Big Idea

The biggest mistake in software development isn't writing bad code — it's building the wrong thing.

**Requirements** = what you're building
**Code** = how you build it

Get the "what" wrong, and the "how" doesn't matter.

## The House Analogy

### Approach A: Just Start
"Let's start laying bricks! We'll figure out the room layout as we go."

→ Build a wall, realize the bathroom should be there. Tear down. Rebuild. Repeat.

### Approach B: Plan First
"Let's agree on the floor plan. 3 bedrooms, 2 baths, kitchen faces east."

→ You know where every wall goes before laying a single brick.

## What Requirements Prevent

### 1. Scope Creep
Without requirements: "Can we also add profiles? And messaging? And a store?"

With requirements: "That's not in our MVP. Let's finish this first."

### 2. Endless Changes
Without requirements: Build login with email → "Actually I wanted phone login" → Rebuild

With requirements: Written spec says "email login" → Both sides agreed before coding

### 3. Never Finishing
Without requirements: "Is it done? Maybe we need more features..."

With requirements: "All acceptance criteria pass. It's done."

## For Our Bootcamp

We have natural constraints:
- **Time:** 4-5 hours
- **User:** Just you (single user)
- **Features:** Auth + one protected feature
- **Tech:** React + Firebase

This clarity is a gift. No endless decisions.

## The Requirements Spectrum

```
← Too Vague                              Too Detailed →
"Make a good app"                        200-page spec
      ❌                  ✓                     ❌
               Just enough detail
               to know what to build
```

---

[Continue: Business Requirements →](./02-business-requirements)
