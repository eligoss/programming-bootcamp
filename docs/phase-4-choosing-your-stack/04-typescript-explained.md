# TypeScript Explained

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- What TypeScript is
- Why types help beginners
- How TypeScript catches errors

## The Big Idea

TypeScript is JavaScript with **types**. Types tell you (and the computer) what kind of data you're working with.

Think of it as JavaScript with guardrails.

## JavaScript vs TypeScript

### JavaScript: No Types

```javascript
function greet(name) {
  return "Hello, " + name;
}

greet("Alice");     // Works: "Hello, Alice"
greet(42);          // Works but weird: "Hello, 42"
greet();            // Works but broken: "Hello, undefined"
```

JavaScript lets you pass anything anywhere. Mistakes happen at runtime (when the code runs).

### TypeScript: With Types

```typescript
function greet(name: string): string {
  return "Hello, " + name;
}

greet("Alice");     // ✅ Works
greet(42);          // ❌ Error: number is not string
greet();            // ❌ Error: missing required argument
```

TypeScript catches mistakes before you run the code.

## What Are Types?

Types are labels that describe data:

| Type | What It Is | Examples |
|------|-----------|----------|
| `string` | Text | `"Hello"`, `"user@email.com"` |
| `number` | Numbers | `42`, `3.14`, `-10` |
| `boolean` | True/False | `true`, `false` |
| `array` | List of items | `[1, 2, 3]`, `["a", "b"]` |
| `object` | Structured data | `{ name: "Alice", age: 25 }` |
| `null` | Intentionally empty | `null` |
| `undefined` | Not yet set | `undefined` |

## TypeScript in Practice

### Defining Data Shapes

```typescript
// Define what a Note looks like
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

// TypeScript knows exactly what fields exist
const myNote: Note = {
  id: "123",
  title: "My Note",
  content: "Note content",
  createdAt: new Date()
};

myNote.titel  // ❌ Error: typo caught! (titel vs title)
```

### Function Parameters

```typescript
// TypeScript knows what the function expects
function saveNote(note: Note): Promise<void> {
  // ...
}

saveNote({ id: "1" }); // ❌ Error: missing title, content, createdAt
```

### Editor Autocomplete

With types, your editor knows what's available:

```typescript
myNote.    // Editor shows: id, title, content, createdAt
           // No guessing!
```

## Why Types Help Beginners

### 1. Catch Mistakes Early

```typescript
// JavaScript: Error at runtime (when user clicks button)
// TypeScript: Error immediately in editor, before running
```

Seeing errors instantly is less frustrating than mysterious runtime failures.

### 2. Better Autocomplete

TypeScript tells your editor what options exist. Instead of remembering, you see suggestions.

### 3. Documentation Built-In

```typescript
interface User {
  id: string;
  email: string;
  displayName: string | null;  // can be string OR null
  createdAt: Date;
}
```

The types ARE the documentation. No separate doc to maintain.

### 4. Refactoring Safety

Change a property name? TypeScript shows you every place that breaks.

## TypeScript Syntax You'll See

### Variable Types

```typescript
const name: string = "Alice";
const age: number = 25;
const isActive: boolean = true;
```

### Function Types

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### Optional Properties

```typescript
interface Note {
  id: string;
  title: string;
  description?: string;  // ? means optional
}
```

### Array Types

```typescript
const numbers: number[] = [1, 2, 3];
const names: string[] = ["Alice", "Bob"];
```

## Don't Worry About Memorizing

You don't need to memorize TypeScript syntax. You'll:
1. See patterns as you code
2. Ask AI when unsure
3. Let the editor guide you

TypeScript's job is to help you, not test you.

## Check Your Understanding

- [ ] TypeScript is JavaScript with types
- [ ] Types describe what kind of data you have
- [ ] TypeScript catches errors before running code
- [ ] Types give better autocomplete and documentation

## Next Up

Let's document our final stack decision.

[Continue: Our Stack Decision →](./05-our-stack-decision)
