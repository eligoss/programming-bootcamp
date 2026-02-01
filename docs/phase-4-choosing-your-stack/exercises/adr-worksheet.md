# ADR Worksheet

> **Time**: ~5 minutes | **Difficulty**: Beginner

::: tip Print This Page!
An Architecture Decision Record (ADR) documents why you chose certain technologies.
:::

---

## Your Stack ADR

**Project:** ________________________________

**Date:** ________________________________

---

## ADR-001: Our Frontend Stack

**Context:**
What problem were we solving?

> We needed to build a web application that ________________________________

**Decision:**
What did we decide?

> Use **React** with **TypeScript** for the frontend.

**Why This Choice:**
(Check the ones that apply)

- [ ] Most popular framework (community support)
- [ ] TypeScript catches errors before running
- [ ] Skills are valuable in job market
- [ ] Good documentation available
- [ ] AI tools understand it well
- [ ] Other: ________________________________

**What We Gave Up:**
(Check the ones that apply)

- [ ] Simpler setup of plain HTML/JS
- [ ] Lower learning curve of other frameworks
- [ ] Other: ________________________________

---

## ADR-002: Our Backend Stack

**Context:**
What did we need the backend to do?

> We needed ________________________________ (auth, data storage, hosting)

**Decision:**

> Use **Firebase** for authentication, database, and hosting.

**Why This Choice:**

- [ ] All-in-one platform
- [ ] Fast to set up
- [ ] Free tier is sufficient
- [ ] Handles security for us
- [ ] Works well with React
- [ ] Other: ________________________________

**What We Gave Up:**

- [ ] Full control over the backend
- [ ] Flexibility of custom server
- [ ] Avoiding vendor lock-in
- [ ] Other: ________________________________

---

## Our Final Stack

| Component | Choice | Main Reason |
|-----------|--------|-------------|
| Language | TypeScript | __________________ |
| UI Framework | React | __________________ |
| Build Tool | Vite | __________________ |
| Authentication | Firebase Auth | __________________ |
| Database | Firestore | __________________ |
| Hosting | Firebase Hosting | __________________ |

---

## Constraints That Shaped Our Decisions

| Constraint | How It Affected Our Choice |
|------------|---------------------------|
| Time (4-5 hours) | ________________________________ |
| Skill level (beginner) | ________________________________ |
| Budget ($0) | ________________________________ |
| Features needed | ________________________________ |

---

## What Would Change Our Decisions?

If circumstances were different, we might choose differently:

**If we had more time:**
> We might ________________________________

**If we needed to scale to millions of users:**
> We might ________________________________

**If we had an experienced team:**
> We might ________________________________

---

## Key Takeaway

The most important lesson about technology choices:

> ____________________________________________________________
> ____________________________________________________________

---

**Reviewed by:** ________________________________

---

[Continue to Phase 5: Project Setup →](../../phase-5-project-setup/)
