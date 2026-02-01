# CLAUDE.md for Your Project

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What CLAUDE.md is
- How it helps AI understand your project
- Creating one for your app

## The Big Idea

CLAUDE.md is a special file that gives Claude (and other AI tools) context about your project. It's like a briefing document that helps AI give better, more relevant answers.

## Why CLAUDE.md?

Without context:
> "Create a button component"
> AI: Creates generic button, might not match your style

With CLAUDE.md:
> "Create a button component"
> AI: Creates a TypeScript React component with your project's patterns

## What to Include

A good CLAUDE.md covers:

1. **Project overview** — What is this?
2. **Tech stack** — What tools are used?
3. **Code conventions** — How do you write code?
4. **Common commands** — How to run things?
5. **Architecture notes** — How is code organized?

## Template for Your Project

Create `CLAUDE.md` in your project root:

```markdown
# My Notes App

## Project Overview
This is a personal notes application with user authentication.
Built as a learning project by a programming bootcamp student.

## Tech Stack
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **Hosting:** Firebase Hosting
- **Styling:** Plain CSS (no framework)

## Code Conventions

### General
- Use TypeScript strict mode
- Prefer function components with hooks
- Use meaningful, spelled-out variable names
- Add comments explaining "why" for non-obvious code

### File Naming
- React components: PascalCase (e.g., `LoginForm.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `firebase.ts`)

### Component Structure
```tsx
interface Props {
  // typed props
}

export function ComponentName({ prop1, prop2 }: Props) {
  // hooks first
  // handlers next
  // return JSX
}
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (routes)
├── hooks/          # Custom React hooks
├── lib/            # Utilities (firebase config, etc.)
├── types/          # TypeScript type definitions
├── App.tsx         # Main app with routing
└── main.tsx        # Entry point
```

## Commands

### Development
```bash
npm run dev         # Start dev server at localhost:5173
npm run lint        # Check for linting errors
npm run lint:fix    # Auto-fix linting errors
npm run format      # Format code with Prettier
npm run build       # Build for production
```

### Deployment
```bash
firebase deploy     # Deploy to Firebase Hosting
```

## Firebase Configuration
- Firebase config is in `src/lib/firebase.ts`
- Environment variables are NOT used (config is public anyway for Firebase web)
- Firestore security rules are in `firestore.rules`

## Authentication Flow
1. User registers/logs in via Firebase Auth
2. Auth state stored in React Context (AuthContext)
3. Protected routes check auth state via useAuth hook
4. Firestore queries include userId for data isolation

## Data Models

### Note (example, adjust for your feature)
```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## When Helping with This Project

### Do:
- Explain what the code does (I'm learning)
- Use TypeScript with proper types
- Follow the existing code patterns
- Suggest next steps after completing a task

### Don't:
- Use `any` type (defeats TypeScript's purpose)
- Create overly complex solutions
- Add features I didn't ask for
- Use external libraries without discussing first

## Current Status
🚧 Under development

## Known Issues
(Add issues here as they come up)
```

## Customizing for Your Feature

Replace "Notes" references with your chosen feature:

**For Tasks:**
```typescript
interface Task {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
  createdAt: Timestamp;
}
```

**For Bookmarks:**
```typescript
interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Timestamp;
}
```

## Commit Your CLAUDE.md

```bash
git add CLAUDE.md
git commit -m "Add CLAUDE.md for AI context"
git push
```

## Keeping It Updated

As your project evolves:
- Add new patterns you establish
- Document decisions made
- Note any quirks or workarounds
- Update status and known issues

## Check Your Understanding

- [ ] CLAUDE.md gives AI context about my project
- [ ] It includes tech stack, conventions, and structure
- [ ] I've created one for my project
- [ ] I'll update it as the project evolves

## Phase 5 Complete! 🎉

You now have:
- GitHub repository set up
- React + TypeScript project initialized
- ESLint and Prettier configured
- Branch protection enabled
- CI workflow running
- CLAUDE.md ready

**Total time for Phase 5:** ~30 minutes

Take a break! Then we'll learn to work with AI effectively.

---

[Start Phase 6: Working with AI →](../phase-6-working-with-ai/)
