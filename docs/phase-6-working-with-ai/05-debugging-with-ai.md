# Debugging with AI

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to describe bugs effectively
- The debugging conversation pattern
- Common React/TypeScript errors explained

## The Big Idea

Debugging is detective work. AI can help, but you need to provide the clues. The better you describe the problem, the faster you'll solve it.

## The Bug Report Template

When something doesn't work, use this structure:

```
## What I Expected
[What should have happened]

## What Actually Happened
[What actually happened]

## Error Message (if any)
[Copy the exact error]

## Steps to Reproduce
1. [First thing you did]
2. [Second thing you did]
3. [When the problem appeared]

## Relevant Code
[Paste the code that might be causing the issue]

## What I Already Tried
[Anything you attempted that didn't work]
```

## Example: Good Bug Report

```
## What I Expected
When I click the "Login" button, it should log me in and redirect to /dashboard.

## What Actually Happened
Nothing happens. No error in console. Button does nothing.

## Error Message
None visible in console.

## Steps to Reproduce
1. Go to /login
2. Enter email: test@test.com
3. Enter password: password123
4. Click "Login" button
5. Nothing happens

## Relevant Code
[paste LoginForm component]

## What I Already Tried
- Checked that onClick is attached to the button
- Added console.log in handleSubmit - it never runs
```

## The Debugging Conversation

### Step 1: Report the Bug
Use the template above.

### Step 2: AI Suggests Causes
AI will list possibilities:
- "The form might be submitting before your handler"
- "The button might not be inside the form"
- "There might be a type error preventing execution"

### Step 3: Gather More Info
AI might ask you to:
```
"Can you add console.log statements here and tell me what prints?"
"What does the browser network tab show?"
"Can you share the full component?"
```

### Step 4: Apply the Fix
AI suggests a fix. Apply it, test, and report back.

### Step 5: Iterate if Needed
If it's not fixed, share the new state and continue.

## Common React Errors

### "Cannot read property 'X' of undefined"

**Means:** You're trying to access something that doesn't exist yet.

**Common causes:**
- Data hasn't loaded from API yet
- Typo in property name
- Object is null

**Fix pattern:**
```typescript
// Add optional chaining
user?.name  // instead of user.name

// Or check before using
if (user) {
  console.log(user.name);
}
```

### "React Hook must be called in the same order"

**Means:** You have a hook inside a condition or loop.

**Common cause:**
```typescript
// ❌ Wrong
if (loggedIn) {
  const [data, setData] = useState();
}
```

**Fix:** Always call hooks at the top level of the component.

### "Each child should have a unique key prop"

**Means:** You're rendering a list without unique keys.

**Fix:**
```typescript
// ❌ Wrong
items.map(item => <Item item={item} />)

// ✅ Right
items.map(item => <Item key={item.id} item={item} />)
```

### "Type 'X' is not assignable to type 'Y'"

**Means:** TypeScript expected one type but got another.

**Common causes:**
- Function returns wrong type
- Prop has wrong type
- Variable might be null

**Fix:** Read the error carefully — it usually tells you what's wrong.

## Using Console.log Strategically

When confused about what's happening:

```typescript
function handleSubmit(e) {
  console.log("1. handleSubmit called");
  console.log("2. email:", email);
  console.log("3. password:", password ? "[exists]" : "[empty]");

  // rest of function
}
```

Then tell AI:
```
"When I click submit, I see '1' and '2' in console, but not '3'"
```

This narrows down where the problem is.

## Using Browser DevTools

### Console Tab
Shows errors and your console.log outputs.

### Network Tab
Shows API calls — did the request go out? What came back?

### Elements Tab
Inspect the HTML — is your button actually there?

## When AI Gets It Wrong

Sometimes AI's first suggestion doesn't fix it. That's normal.

```
"That didn't work. After making that change:
- I still see [same problem]
- Or now I see [new problem]

Here's the current code: [paste]"
```

Be patient — debugging sometimes takes multiple rounds.

## Check Your Understanding

- [ ] I know how to write a good bug report
- [ ] I'll include error messages and code when asking for help
- [ ] I can use console.log to narrow down problems
- [ ] Common React errors make more sense now
- [ ] Debugging is iterative — multiple rounds are normal

## Next Up

Now let's cover critical safety rules for working with AI.

[Continue: AI Safety Rules →](./06-ai-safety-rules)
