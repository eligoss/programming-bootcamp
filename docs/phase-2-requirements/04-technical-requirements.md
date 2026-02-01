# Technical Requirements

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- Key technology decisions for your app
- Why we chose each technology

## Technical Decisions

### 1. Frontend Framework
**Decision:** React
- Most popular framework
- Huge ecosystem and community
- Skills transfer to job market

### 2. Language
**Decision:** TypeScript
- Catches errors before running code
- Better autocomplete and documentation
- Industry standard for professional projects

### 3. Authentication
**Decision:** Firebase Authentication
- Handles security best practices
- Email/password out of the box
- Free for small projects

### 4. Database
**Decision:** Firebase Firestore
- Works seamlessly with Firebase Auth
- Real-time updates
- No server to manage

### 5. Hosting
**Decision:** Firebase Hosting
- One-command deployment
- Free tier available
- Integrated with our other Firebase services

### 6. Build Tool
**Decision:** Vite
- Very fast development server
- Modern and simple
- Easy setup

## The Stack Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Your App                          │
├─────────────────────────┬───────────────────────────┤
│      Frontend           │         Backend           │
│  ┌─────────────────┐   │    ┌─────────────────┐   │
│  │ React           │   │    │ Firebase Auth   │   │
│  │ TypeScript      │◄──┼───►│ Firestore       │   │
│  │ React Router    │   │    │ Hosting         │   │
│  └─────────────────┘   │    └─────────────────┘   │
│        Vite            │        (managed)          │
└─────────────────────────┴───────────────────────────┘
```

## Why This Combination?

| Choice | Benefit |
|--------|---------|
| **React** | Most in-demand skill, great ecosystem |
| **TypeScript** | Catches errors early, better DX |
| **Firebase** | One ecosystem, minimal setup, free tier |
| **Vite** | Fast dev server, simple config |

**Key benefit:** Firebase combines auth, database, and hosting. Instead of setting up three different services, we set up one.

## Data Model Preview

```typescript
// Notes
interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Tasks
interface Task {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
  createdAt: Timestamp;
}

// Bookmarks
interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Timestamp;
}
```

---

[Continue: Non-Functional Requirements →](./05-non-functional-requirements)
