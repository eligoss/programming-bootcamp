# Frontend Landscape

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- Main frontend framework options
- How they compare
- Why we'll use React

## The Big Idea

The frontend is what users see and interact with. You need something to build the user interface (UI). The main choices are:

1. **Plain HTML/CSS/JavaScript** — No framework
2. **React** — Most popular framework (library)
3. **Vue** — Simpler alternative
4. **Angular** — Enterprise-focused framework
5. **Others** — Svelte, Solid, etc.

## The Options Compared

### Plain HTML/CSS/JavaScript

```html
<button id="btn">Click me</button>
<script>
  document.getElementById('btn').addEventListener('click', () => {
    alert('Clicked!');
  });
</script>
```

**Pros:**
- No setup needed
- No extra concepts to learn
- Works everywhere

**Cons:**
- Becomes messy as app grows
- Hard to manage complex UIs
- More boilerplate code

**Best for:** Very simple pages, learning web fundamentals

### React

```jsx
function Button() {
  return <button onClick={() => alert('Clicked!')}>Click me</button>;
}
```

**Pros:**
- Most popular (huge job market, community)
- Component-based (organized, reusable)
- Great documentation
- Massive ecosystem

**Cons:**
- Learning curve for beginners
- Need to understand some concepts (JSX, state)
- Can be overkill for tiny projects

**Best for:** Most web applications, learning industry standard

### Vue

```vue
<template>
  <button @click="handleClick">Click me</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('Clicked!');
    }
  }
}
</script>
```

**Pros:**
- Gentler learning curve than React
- Clear template syntax
- Good documentation

**Cons:**
- Smaller ecosystem than React
- Fewer job opportunities
- Less tooling support

**Best for:** Teams who find React too complex

### Angular

```typescript
@Component({
  selector: 'app-button',
  template: '<button (click)="handleClick()">Click me</button>'
})
export class ButtonComponent {
  handleClick() {
    alert('Clicked!');
  }
}
```

**Pros:**
- Full-featured framework
- Opinionated (fewer decisions)
- TypeScript built-in

**Cons:**
- Steep learning curve
- Heavy-weight for small projects
- Complex setup

**Best for:** Large enterprise applications

## Why React for This Bootcamp

| Factor | React Advantage |
|--------|----------------|
| **Job market** | Most in-demand skill |
| **Community** | Huge, active community |
| **Resources** | Countless tutorials, Stack Overflow answers |
| **Ecosystem** | Libraries for everything |
| **AI support** | Claude knows React very well |
| **Transferable** | Concepts apply to React Native, other frameworks |

React is the industry default. Learning it opens the most doors.

## React Concepts Preview

You'll learn these in practice:

### Components
Building blocks of UI. Like LEGO bricks.

```jsx
function Header() {
  return <h1>My App</h1>;
}

function App() {
  return (
    <div>
      <Header />
      <main>Content here</main>
    </div>
  );
}
```

### State
Data that can change over time.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Props
Data passed from parent to child.

```jsx
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

<Greeting name="Student" />
```

Don't worry if this looks foreign now. We'll build understanding as we code.

## Check Your Understanding

- [ ] Plain HTML works but doesn't scale well
- [ ] React is the most popular framework
- [ ] Vue and Angular are alternatives with different tradeoffs
- [ ] React will give us the most transferable skills

## Next Up

Now let's look at backend options.

[Continue: Backend Landscape →](./03-backend-landscape)
