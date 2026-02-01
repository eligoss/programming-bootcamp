# Step 7: Understanding Forms

> **Time**: ~5 minutes | **Type**: Learning | **Concepts**: Controlled Components, Form Validation, Event Handling

## What This Step Is About

Before building registration and login forms, you need to understand **controlled components** and how React handles form inputs differently than plain HTML.

## Interactive Learning

> **💡 Ask AI to Teach You:**
>
> Copy this prompt into Claude and read the response carefully:
>
> ```
> I'm about to build forms in React. Can you explain:
>
> 1. What is a controlled component vs an uncontrolled component?
> 2. Why do we use useState for form inputs?
> 3. What does the onChange event do?
> 4. How do we prevent form submission from refreshing the page?
>
> Use simple examples — I'm a beginner.
> ```

## What You Should Learn

After AI explains, you should be able to answer these questions:

- **What is a controlled component?** (Input value controlled by React state)
- **What is an uncontrolled component?** (Input manages its own value, like plain HTML)
- **Why controlled?** (React state is source of truth, easier to validate)
- **What is `e.preventDefault()`?** (Stops form from refreshing page)

If AI's explanation didn't cover these points, ask follow-up questions like:
- "Show me an example of a controlled input"
- "What happens if I don't call preventDefault()?"

## The Controlled Component Pattern

In plain HTML, the input manages its own value:

```html
<!-- Uncontrolled (HTML manages value) -->
<input type="text" name="email" />
```

In React, **we** control the value with state:

```typescript
// Controlled (React state manages value)
const [email, setEmail] = useState('');

<input
  type="text"
  value={email}           // State controls value
  onChange={(e) => setEmail(e.target.value)}  // Update state on change
/>
```

**Key insight:** The input displays what's in state. When you type, onChange updates state, which updates the display.

## The Form Submission Flow

Here's what happens when a user submits a login form:

```typescript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // 1. Stop page refresh!

    // 2. Validate inputs
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // 3. Call auth function
    try {
      await signIn(email, password);
      // 4. Success! (context updates, app re-renders)
    } catch (error) {
      // 5. Show error to user
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
```

## Why Controlled Components for Auth Forms

**Validation:**
- Check if email is valid before submission
- Check if password meets requirements
- Show real-time feedback as user types

**Security:**
- Prevent empty submissions
- Enforce password strength
- Sanitize inputs before sending to Firebase

**User Experience:**
- Disable submit button if form invalid
- Show error messages below specific fields
- Clear form after successful submission

**Example validation:**

```typescript
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (value: string) => {
  if (!value.includes('@')) {
    setError('Please enter a valid email');
  } else {
    setError('');
  }
  setEmail(value);
};

<input
  type="email"
  value={email}
  onChange={(e) => validateEmail(e.target.value)}
/>
{error && <p style={{ color: 'red' }}>{error}</p>}
```

## Common Form Patterns We'll Use

### Pattern 1: Basic Input

```typescript
const [email, setEmail] = useState('');

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>
```

### Pattern 2: Form Submission

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();  // Always first!

  // Your logic here
  await someAsyncFunction();
};

<form onSubmit={handleSubmit}>
  {/* inputs */}
  <button type="submit">Submit</button>
</form>
```

### Pattern 3: Error Handling

```typescript
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');  // Clear previous errors

  try {
    await signIn(email, password);
  } catch (err) {
    setError(err.message);
  }
};

{error && <p className="error">{error}</p>}
```

### Pattern 4: Loading State

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await signIn(email, password);
  } finally {
    setIsLoading(false);
  }
};

<button type="submit" disabled={isLoading}>
  {isLoading ? 'Logging in...' : 'Log In'}
</button>
```

## Form Validation Checklist

For our authentication forms, we'll validate:

**Registration:**
- [ ] Email is not empty
- [ ] Email contains @
- [ ] Password is not empty
- [ ] Password is at least 6 characters (Firebase requirement)
- [ ] Password and confirm password match

**Login:**
- [ ] Email is not empty
- [ ] Password is not empty

## Check Your Understanding

Before moving to the next step, you should be able to explain:

- [ ] What a controlled component is
- [ ] How `value` and `onChange` work together
- [ ] Why we call `e.preventDefault()` on form submit
- [ ] How to show error messages to users
- [ ] How to disable a button during submission

## Real-World Analogy

Think of a controlled component like a cash register:

**Uncontrolled (HTML):**
- Customer writes their own receipt
- You don't know what they wrote until they hand it to you
- Hard to validate or correct

**Controlled (React):**
- You enter everything into the register
- Display shows exactly what you entered (the state)
- You can validate before finalizing
- Single source of truth (the register, not random pieces of paper)

The input field (display) shows what's in state (register), and onChange updates state when you type (ring up items).

## Next Step

Now that you understand forms, let's build the registration form:

[Step 8: Create Registration Form →](./08-create-registration-form)
