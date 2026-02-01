# React Patterns

> Quick reference for common React patterns

## Component Structure

```tsx
import { useState, useEffect } from 'react';

interface Props {
  title: string;
  onSave: (value: string) => void;
}

export function MyComponent({ title, onSave }: Props) {
  // 1. State hooks
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Effects
  useEffect(() => {
    // Effect code
  }, [dependency]);

  // 3. Handlers
  const handleSubmit = () => {
    onSave(value);
  };

  // 4. Render
  return (
    <div>
      <h1>{title}</h1>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
```

## useState

```tsx
// Basic
const [count, setCount] = useState(0);

// Object
const [user, setUser] = useState({ name: '', email: '' });

// Update object (spread existing)
setUser({ ...user, name: 'Alice' });

// Functional update
setCount(prev => prev + 1);

// Nullable
const [data, setData] = useState<User | null>(null);
```

## useEffect

```tsx
// Run on every render
useEffect(() => {
  console.log('rendered');
});

// Run once on mount
useEffect(() => {
  console.log('mounted');
}, []);

// Run when dependency changes
useEffect(() => {
  console.log('userId changed');
}, [userId]);

// Cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

## Conditional Rendering

```tsx
// If/else with ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Show only if true
{isAdmin && <AdminPanel />}

// Multiple conditions
{status === 'loading' && <Spinner />}
{status === 'error' && <Error />}
{status === 'success' && <Content />}

// Early return
if (loading) return <Spinner />;
if (error) return <Error />;
return <Content />;
```

## Lists

```tsx
// Map array to elements
{items.map(item => (
  <ItemCard key={item.id} item={item} />
))}

// With index (only if no unique id)
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// Filter then map
{items
  .filter(item => item.active)
  .map(item => <Item key={item.id} {...item} />)}
```

## Forms

```tsx
function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Custom Hooks

```tsx
// Create
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}

// Use
function Counter() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Context

```tsx
// Create context
const ThemeContext = createContext<'light' | 'dark'>('light');

// Provider
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Main />
    </ThemeContext.Provider>
  );
}

// Consumer
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

## Loading & Error States

```tsx
function DataComponent() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!data) return <Empty />;
  return <Display data={data} />;
}
```

## Event Handlers

```tsx
// Click
<button onClick={() => handleClick(id)}>Click</button>

// Change
<input onChange={e => setValue(e.target.value)} />

// Submit
<form onSubmit={e => {
  e.preventDefault();
  handleSubmit();
}}>

// Keyboard
<input onKeyDown={e => {
  if (e.key === 'Enter') submit();
}} />
```

## Common Patterns

### Controlled Input
```tsx
<input value={state} onChange={e => setState(e.target.value)} />
```

### Prop Drilling Alternative (Context)
```tsx
// Instead of prop1 → prop2 → prop3
// Use context for shared state
```

### Lifting State Up
```tsx
// Move shared state to nearest common ancestor
function Parent() {
  const [shared, setShared] = useState('');
  return (
    <>
      <ChildA value={shared} />
      <ChildB onChange={setShared} />
    </>
  );
}
```

---

*Keep this handy while building React apps!*
