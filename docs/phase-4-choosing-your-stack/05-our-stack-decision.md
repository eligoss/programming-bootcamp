# Our Stack Decision

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- Our final technology choices
- The reasoning behind each choice
- How the pieces fit together

## The Big Idea

We've explored options. Now let's document our decisions and understand how everything works together.

## Our Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Language** | TypeScript | Catches errors, better autocomplete |
| **Frontend** | React | Industry standard, huge community |
| **Build Tool** | Vite | Fast, modern, simple setup |
| **Auth** | Firebase Auth | Handles security, fast to implement |
| **Database** | Firestore | Integrated with auth, real-time |
| **Hosting** | Firebase Hosting | One-command deploy, free tier |

## How It All Connects

```
┌─────────────────────────────────────────────────────────────┐
│                        Your Computer                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                      VS Code                            │ │
│  │   ┌─────────────────────────────────────────────────┐  │ │
│  │   │        TypeScript + React Code                   │  │ │
│  │   │   (Components, Pages, Logic)                     │  │ │
│  │   └─────────────────────────────────────────────────┘  │ │
│  │                        │                                │ │
│  │                        ▼                                │ │
│  │   ┌─────────────────────────────────────────────────┐  │ │
│  │   │         Vite Development Server                  │  │ │
│  │   │   (Hot reload, TypeScript compilation)           │  │ │
│  │   └─────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        Firebase                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    Auth      │  │  Firestore   │  │   Hosting    │       │
│  │   ┌──────┐   │  │   ┌──────┐   │  │   ┌──────┐   │       │
│  │   │Users │   │  │   │ Data │   │  │   │ Your │   │       │
│  │   └──────┘   │  │   └──────┘   │  │   │ App  │   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Decision Record

### ADR-001: Use React + TypeScript for Frontend

**Context:**
We need to build a user interface for our web application.

**Decision:**
Use React with TypeScript.

**Reasoning:**
- React is the most popular framework (community support)
- TypeScript catches errors early (helpful for beginners)
- Skills transfer to job market
- AI tools understand React well

**Tradeoffs:**
- Learning curve for complete beginners
- More setup than plain HTML

**Status:** Accepted

---

### ADR-002: Use Firebase for Backend Services

**Context:**
We need authentication, data storage, and hosting.

**Decision:**
Use Firebase (Auth, Firestore, Hosting).

**Reasoning:**
- All-in-one platform (less integration work)
- Fast setup (matches our time constraints)
- Handles security best practices
- Free tier sufficient for learning
- Excellent documentation

**Tradeoffs:**
- Vendor lock-in
- Less flexibility than custom backend
- Can be expensive at scale (not relevant for us)

**Status:** Accepted

---

### ADR-003: Use Vite as Build Tool

**Context:**
We need to bundle and serve our React application.

**Decision:**
Use Vite instead of Create React App.

**Reasoning:**
- Faster development server
- Modern and actively maintained
- Simpler configuration
- Better TypeScript support

**Tradeoffs:**
- Slightly less documentation than CRA (but enough)

**Status:** Accepted

## What You'll Install

| Package | Purpose |
|---------|---------|
| `vite` | Build tool and dev server |
| `react` | UI framework |
| `react-dom` | React for web browsers |
| `react-router-dom` | Page navigation |
| `firebase` | Auth, database, and more |
| `typescript` | Type checking |

## Stack Versions

We'll use current stable versions:
- Node.js: 20.x LTS
- React: 18.x
- TypeScript: 5.x
- Firebase: 10.x
- Vite: 5.x

## Check Your Understanding

- [ ] I know all the technologies in our stack
- [ ] I understand why each was chosen
- [ ] I see how they connect together
- [ ] I understand the tradeoffs we're accepting

## Phase 4 Complete!

You now understand:
- How to make technology decisions
- The frontend and backend landscape
- Why we chose React + Firebase
- How the pieces work together

Let's document your own ADR!

[Complete the ADR Worksheet →](./exercises/adr-worksheet)
