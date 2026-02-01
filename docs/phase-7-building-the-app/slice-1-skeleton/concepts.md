# Core Concepts: App Skeleton

> Understanding the building blocks before we build

Before we start building the app skeleton, let's understand the key concepts you'll be working with. These aren't just tools to memorize — they're fundamental patterns that make modern web apps work.

## What is React?

**React** is a JavaScript library for building user interfaces. Think of it as LEGO for web pages: you create small, reusable pieces (components) and combine them to build complex UIs.

React's key idea is the **component model**: instead of writing one massive HTML file, you break your UI into small, independent pieces. A button is a component. A form is a component. A whole page is a component made of smaller components.

Unlike traditional websites where every click loads a new HTML page from the server, React apps are **single-page applications (SPAs)**. The HTML loads once, and then React swaps out components in JavaScript as users navigate. This makes apps feel instant and smooth.

## What are Components?

A **component** is a JavaScript function that returns JSX (which looks like HTML). It's a reusable piece of UI.

```tsx
// This is a component!
function WelcomeMessage() {
  return <h1>Hello, World!</h1>;
}
```

Components can:
- **Accept inputs** (called "props") to customize their behavior
- **Manage their own state** (data that changes over time)
- **Be composed** together to build complex UIs

Think of components like functions in math: they take inputs and produce outputs. But instead of numbers, they take data and produce UI.

### The Component Tree

Components nest inside each other, forming a tree:

```
App
├── Navigation
│   ├── Link (Home)
│   ├── Link (Login)
│   └── Link (Dashboard)
├── HomePage
│   ├── Heading
│   └── WelcomeMessage
└── Footer
```

This tree structure is how React knows what to display and what to update when data changes.

## What is JSX?

**JSX** (JavaScript XML) is a syntax extension that lets you write HTML-like markup inside JavaScript or TypeScript code. It makes writing UI components feel natural and readable.

```tsx
// JSX: looks like HTML
const element = <h1>Hello!</h1>;

// What it really is: JavaScript function calls
const element = React.createElement('h1', null, 'Hello!');
```

**Why JSX exists:** Without JSX, you'd have to write verbose `React.createElement()` calls. JSX is syntactic sugar that compiles to those calls but looks much cleaner.

### JSX vs HTML Differences

JSX looks like HTML but has some key differences:
- Use `className` instead of `class` (because `class` is a JavaScript keyword)
- Use `{curly braces}` to embed JavaScript expressions: `<h1>Hello, {name}!</h1>`
- Self-closing tags need the `/` (like `<img />` or `<br />`)
- Attribute names use camelCase: `onClick` not `onclick`, `backgroundColor` not `background-color`

### JSX Works with Both JavaScript and TypeScript

- **JavaScript + JSX** → `.jsx` files
- **TypeScript + JSX** → `.tsx` files

**In this bootcamp, we use `.tsx`** because we want TypeScript's type safety along with JSX's readable markup.

## What is React Router?

**React Router** is a library that adds navigation to single-page apps. It connects URLs to components.

Without React Router:
```
User clicks link → Browser loads new HTML from server → Page reloads
```

With React Router:
```
User clicks link → React Router swaps components → No reload, instant
```

### Key React Router Concepts

**`<BrowserRouter>`** — Wraps your entire app and provides routing context. You only need one of these at the root of your app.

**`<Routes>`** — Container for all your route definitions. Think of it as the "routing configuration" section.

**`<Route>`** — Maps a URL path to a component. Takes two main props:
- `path="/login"` — The URL to match
- `element={<LoginPage />}` — The component to render

**`<Link>`** — A clickable link that changes routes without reloading. Use this instead of `<a>` tags for internal navigation.

### Routing Flow

Here's how routing works in a React app:

```
1. User clicks <Link to="/login">
2. React Router updates browser URL to /login
3. React Router looks for <Route path="/login">
4. Finds matching route's element prop
5. Renders <LoginPage /> component
6. Old component unmounts, new component mounts
```

All of this happens **without reloading the page**. The browser's URL changes, but the page stays loaded. This is what makes SPAs feel fast.

### Client-Side vs Server-Side Routing

**Traditional (Server-Side):**
```
Browser: "I need /login"
Server: "Here's a whole new HTML page"
Browser: *reloads everything*
```

**React Router (Client-Side):**
```
Browser: "I need /login"
React Router: "I'll swap the component"
Browser: *just updates the content, no reload*
```

Client-side routing:
- ✅ Faster (no page reload)
- ✅ Keeps JavaScript state alive
- ✅ Smooth transitions possible
- ❌ Requires JavaScript enabled
- ❌ Initial load includes all route code

## What is TypeScript?

**TypeScript** is JavaScript with **types**. Types are like labels that tell you what kind of data something is.

```typescript
// JavaScript: no types
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

// TypeScript: with types
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
```

The `: string` part tells TypeScript "this variable must be a string." If you try to pass a number, TypeScript will warn you before you even run the code.

**Why use TypeScript?**
- **Catch errors early** — Typos and wrong types get caught as you write code
- **Better autocomplete** — Your editor knows what properties/methods exist
- **Self-documenting** — Types show what a function expects and returns
- **Safer refactoring** — Rename something and TypeScript finds all usages

For React components, TypeScript helps you define what props a component expects:

```tsx
interface WelcomeProps {
  userName: string;
  isLoggedIn: boolean;
}

function Welcome({ userName, isLoggedIn }: WelcomeProps) {
  // TypeScript knows userName is a string
  // It knows isLoggedIn is a boolean
  return <h1>Hello, {userName}!</h1>;
}
```

## JSX + TypeScript = TSX (How They Work Together)

**Important:** JSX and TypeScript are **NOT alternatives** — they work together in React apps!

### The Confusion

Beginners often think: "If I'm using TypeScript, do I still need JSX?"

**Answer:** YES! You need **both**. They do different things.

### What Each Provides

**JSX provides:**
- The syntax to write HTML-like markup in your code
- How you describe what the UI should look like
- Example: `<div><h1>Hello</h1></div>`

**TypeScript provides:**
- Type checking to catch errors before runtime
- Type definitions for your data and props
- Example: `name: string`, `age: number`

### File Extensions Explained

This is key to understanding how they work together:

| Extension | Meaning | Use Case |
|-----------|---------|----------|
| `.js` | Plain JavaScript | Old-school JavaScript (no types, no JSX) |
| `.jsx` | JavaScript + JSX | React components without TypeScript |
| `.ts` | TypeScript | TypeScript code that doesn't use JSX (utilities, configs) |
| `.tsx` | TypeScript + JSX | **React components with TypeScript** ← This is what we use! |

**In this bootcamp, all React components use `.tsx` because we want both type safety AND JSX syntax.**

### Side-by-Side Comparison

Here's the same component written different ways:

**Plain JavaScript (no types, no JSX):**
```js
// greeting.js
function Greeting(props) {
  return React.createElement('div', null,
    React.createElement('h1', null, 'Hello, ' + props.name)
  );
}
```
❌ No type checking
❌ Hard to read (createElement everywhere)

**JavaScript + JSX:**
```jsx
// Greeting.jsx
function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}</h1>
    </div>
  );
}
```
✅ Readable markup
❌ No type checking (props.name could be anything)

**TypeScript + JSX:**
```tsx
// Greeting.tsx
interface GreetingProps {
  name: string;
  age: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
}
```
✅ Readable markup (from JSX)
✅ Type safety (from TypeScript)
✅ Best of both worlds!

### How They Work Together in Practice

When you write a React component with TypeScript:

```tsx
// UserCard.tsx - This file uses BOTH JSX and TypeScript

// TypeScript: Define the shape of your data
interface User {
  id: number;
  name: string;
  email: string;
}

// TypeScript: Define component props with types
interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

// TypeScript + JSX combined:
export default function UserCard({ user, onDelete }: UserCardProps) {
  // TypeScript checks types in your logic
  const handleDelete = () => {
    onDelete(user.id); // TypeScript ensures user.id is a number
  };

  // JSX describes your UI
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

**What TypeScript does here:**
- Ensures `user` has `id`, `name`, and `email` properties
- Ensures `onDelete` is a function that takes a number
- Catches typos like `user.naem` before you run the code

**What JSX does here:**
- Lets you write `<div>` instead of `React.createElement('div', ...)`
- Makes the markup readable and maintainable
- Allows embedding JavaScript with `{curly braces}`

### Why You Need Both

Think of it this way:

- **JSX** = How you write the UI (the markup)
- **TypeScript** = How you ensure correctness (the safety net)

Together:
- JSX makes your components readable
- TypeScript makes your components reliable

### Common Misconception

❌ **Wrong:** "I'm using TypeScript, so I don't need JSX"
✅ **Right:** "I'm using TypeScript AND JSX together via .tsx files"

❌ **Wrong:** "JSX is only for JavaScript, not TypeScript"
✅ **Right:** "JSX works with both JavaScript and TypeScript"

### In This Bootcamp

Every React component file you create will:
1. Use the `.tsx` extension
2. Have TypeScript types for props/state
3. Return JSX markup

This gives you the best development experience: readable code with type safety.

## What is NPM?

**NPM** (Node Package Manager) is a tool for installing code libraries that other developers have written.

Think of it like an app store, but for code. Instead of building everything from scratch, you can `npm install` a library that does what you need.

**Key NPM concepts:**

**`package.json`** — A file listing all the libraries your project uses (called "dependencies"). It's like a shopping list for your app's code.

**`node_modules/`** — A folder where installed libraries live. You never edit files here directly.

**`npm install`** — Command that reads `package.json` and downloads all listed libraries into `node_modules/`.

**`npm install react-router-dom`** — Command that installs a specific library AND adds it to `package.json`.

When you install a package, NPM:
1. Downloads it from npmjs.com
2. Puts it in `node_modules/`
3. Adds it to `package.json` so teammates can install the same version

## Putting It All Together

Here's how all these concepts work together in our app skeleton:

1. **React** provides the component model
2. **TypeScript** adds type safety to our components
3. **JSX** lets us write component templates that look like HTML
4. **React Router** connects URLs to components
5. **NPM** manages the libraries we need (React, React Router, etc.)

```tsx
// App.tsx - All concepts combined

// NPM packages (installed via npm install)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// TypeScript types for our component props
interface PageProps {
  title: string;
}

// React component written in JSX
function HomePage({ title }: PageProps) {
  return (
    <div>
      <h1>{title}</h1>
      {/* React Router Link for navigation */}
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

// React Router setup
function App() {
  return (
    {/* React Router's BrowserRouter */}
    <BrowserRouter>
      <Routes>
        {/* Route maps URL to component */}
        <Route path="/" element={<HomePage title="Welcome" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Visual Diagrams

### Component Tree Structure

```
┌─────────────────────────────────────┐
│ App                                  │
│ ┌─────────────────────────────────┐ │
│ │ BrowserRouter                   │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │ Routes                      │ │ │
│ │ │ ┌─────────────────────────┐ │ │ │
│ │ │ │ Route (path="/")        │ │ │ │
│ │ │ │   → HomePage            │ │ │ │
│ │ │ └─────────────────────────┘ │ │ │
│ │ │ ┌─────────────────────────┐ │ │ │
│ │ │ │ Route (path="/login")   │ │ │ │
│ │ │ │   → LoginPage           │ │ │ │
│ │ │ └─────────────────────────┘ │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Client-Side Routing Flow

```
User clicks link          React Router intercepts
      │                          │
      ├──────────────────────────┤
      │                          │
      ▼                          ▼
┌──────────────┐          ┌──────────────┐
│ URL changes  │   ───►   │ Find matching│
│ to /login    │          │ route        │
└──────────────┘          └──────────────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │ Render       │
                          │ LoginPage    │
                          └──────────────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │ Page updates │
                          │ (no reload!) │
                          └──────────────┘
```

### Single-Page App vs Traditional Web

```
Traditional (Server-Side):
┌─────────┐  Request /login  ┌─────────┐
│ Browser │ ──────────────►  │ Server  │
│         │                  │         │
│         │ ◄────────────────│         │
│         │  Full HTML page  │         │
└─────────┘                  └─────────┘
     │
     └──► Full page reload, start over

Single-Page App (Client-Side):
┌─────────┐  Initial load    ┌─────────┐
│ Browser │ ──────────────►  │ Server  │
│         │                  │         │
│ ┌─────┐ │ ◄────────────────│         │
│ │React│ │  HTML + React    │         │
│ └─────┘ │                  └─────────┘
│    │    │
│    └────┼──► All routing happens here
│         │     (No more server requests)
└─────────┘     (Page never reloads)
```

## Why These Patterns Matter

You might wonder: "Why not just use `<a>` tags and regular HTML pages?"

**For small sites**, that's fine. But modern web apps need:

1. **State persistence** — Logged-in status, form data, etc. shouldn't reset on every navigation
2. **Fast interactions** — No waiting for full page loads
3. **Rich UIs** — Smooth transitions, dynamic updates, complex interactions
4. **Code reusability** — Components let you build once, use everywhere

React + TypeScript + React Router give you these capabilities out of the box. They're industry-standard tools used by millions of developers.

## What You'll Build

In this slice, you'll create:

- ✅ A React app with TypeScript
- ✅ Four pages (Home, Login, Register, Dashboard)
- ✅ A navigation component
- ✅ Client-side routing between pages
- ✅ A layout component for consistent structure

By the end, you'll have a working skeleton that you can navigate through. No functionality yet — just the bones that everything else will build on.

---

## Next Steps

Now that you understand the concepts, let's start building:

[Step 1: Understanding Routing →](./steps/01-understanding-routing)
