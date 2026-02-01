# Project Structure

> **Time**: ~7 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to initialize a React + TypeScript project
- Standard project folder structure
- What each file and folder does

## The Big Idea

A well-organized project is easier to work with. We'll use conventions that most React projects follow.

## Step 1: Initialize with Vite

In your project folder:

```bash
# Create a new Vite project in the current directory
npm create vite@latest . -- --template react-ts
```

When prompted:
- **Package name:** Press Enter (uses current folder name)
- **Select framework:** React
- **Select variant:** TypeScript

### Install Dependencies

```bash
npm install
```

### Test It Works

```bash
npm run dev
```

Open the URL shown (usually `http://localhost:5173`). You should see a React welcome page!

Press `Ctrl+C` to stop the server.

## Step 2: Understand the Initial Structure

After initialization, you'll have:

```
my-notes-app/
├── node_modules/        # Downloaded packages (don't touch)
├── public/              # Static files (favicon, etc.)
├── src/                 # Your source code
│   ├── App.css
│   ├── App.tsx          # Main component
│   ├── index.css
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # TypeScript config
├── .gitignore           # Files Git ignores
├── index.html           # HTML shell
├── package.json         # Project config
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## Step 3: Create Our Structure

Let's organize for our app:

```bash
# Create folders
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/types
```

The structure will be:

```
src/
├── components/     # Reusable UI pieces
│   ├── Layout/
│   ├── forms/
│   └── ui/
├── pages/          # Page components (routes)
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── hooks/          # Custom React hooks
│   └── useAuth.ts
├── lib/            # Utility code
│   └── firebase.ts
├── types/          # TypeScript type definitions
│   └── index.ts
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## What Each Folder Contains

### `/components`
Reusable pieces of UI:

```tsx
// components/Button.tsx
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### `/pages`
Full page components (one per route):

```tsx
// pages/LoginPage.tsx
function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
```

### `/hooks`
Custom React hooks (shared logic):

```tsx
// hooks/useAuth.ts
function useAuth() {
  const [user, setUser] = useState(null);
  // ... auth logic
  return { user, login, logout };
}
```

### `/lib`
Utility code, configurations:

```tsx
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
export const app = initializeApp(config);
```

### `/types`
TypeScript type definitions:

```tsx
// types/index.ts
export interface Note {
  id: string;
  title: string;
  content: string;
}
```

## Step 4: Install Core Dependencies

We need a few more packages:

```bash
# React Router for navigation
npm install react-router-dom

# Firebase for backend
npm install firebase
```

## Step 5: Clean Up Default Files

Remove Vite's demo content:

1. Replace `src/App.tsx`:

```tsx
function App() {
  return (
    <div>
      <h1>My Notes App</h1>
      <p>Coming soon...</p>
    </div>
  );
}

export default App;
```

2. Replace `src/App.css` with an empty file or delete it

3. Replace `src/index.css` with:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #333;
}
```

## Step 6: Verify

```bash
npm run dev
```

You should see "My Notes App" and "Coming soon..."

## Commit Your Progress

```bash
git add .
git commit -m "Initialize React + TypeScript project with Vite"
git push
```

## Check Your Understanding

- [ ] I initialized the project with Vite
- [ ] I understand the folder structure
- [ ] I created the additional folders we need
- [ ] I installed react-router-dom and firebase
- [ ] The project runs without errors

## Next Up

Let's add code quality tools that catch mistakes.

[Continue: Code Quality Tools →](./03-code-quality-tools)
