# TypeScript Basics

> Quick reference for essential TypeScript syntax

## Basic Types

```typescript
// Primitives
const name: string = "Alice";
const age: number = 25;
const isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: string[] = ["Alice", "Bob"];

// Object
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
```

## Type Aliases

```typescript
// Define reusable types
type UserId = string;
type Status = "pending" | "active" | "closed";

// Use them
const id: UserId = "abc123";
const status: Status = "active";
```

## Interfaces

```typescript
// Define object shape
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;  // Optional (?)
}

// Use it
const user: User = {
  id: "1",
  name: "Alice",
  email: "alice@example.com"
};
```

## Functions

```typescript
// Parameter and return types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a: number, b: number): number => {
  return a + b;
};

// Optional parameters
function log(message: string, level?: string): void {
  console.log(level || "INFO", message);
}

// Default parameters
function greet(name: string = "World"): string {
  return `Hello, ${name}!`;
}
```

## Union Types

```typescript
// Can be either type
type Result = string | number;
type Status = "loading" | "success" | "error";

function display(value: string | number): void {
  console.log(value);
}
```

## Type Narrowing

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows it's string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows it's number here
    console.log(value.toFixed(2));
  }
}
```

## Generics

```typescript
// Type parameter <T>
function first<T>(array: T[]): T | undefined {
  return array[0];
}

// Usage (type inferred)
const num = first([1, 2, 3]);        // number
const str = first(["a", "b", "c"]);  // string
```

## React Component Types

```typescript
// Props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Function component
function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// With children
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}
```

## Event Types

```typescript
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// Input events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// Click events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("clicked");
};
```

## useState Types

```typescript
// Type inferred
const [count, setCount] = useState(0);  // number

// Explicit type
const [user, setUser] = useState<User | null>(null);

// Array type
const [items, setItems] = useState<string[]>([]);
```

## Common Patterns

### Nullable Types
```typescript
// Can be null
const user: User | null = null;

// Safe access
user?.name  // undefined if user is null
```

### Type Assertions
```typescript
// When you know more than TypeScript
const element = document.getElementById("app") as HTMLDivElement;
```

### Readonly
```typescript
interface Config {
  readonly apiUrl: string;
}
```

## Quick Fixes

### "Type X is not assignable to type Y"
Check that your data matches the expected type.

### "Object is possibly undefined"
Use optional chaining (`?.`) or check for null.

### "Property X does not exist on type Y"
Add the property to your interface or check for typos.

---

*Keep this handy while coding!*
