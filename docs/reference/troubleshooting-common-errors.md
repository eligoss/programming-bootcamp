# Troubleshooting Common Errors

> Quick fixes for errors you'll encounter

## Terminal Errors

### "command not found: node"

**Problem:** Node.js isn't installed or not in PATH.

**Fix:**
```bash
# Check if installed
which node

# If not, install
# Mac: https://nodejs.org or
brew install node

# Windows: https://nodejs.org
```

### "command not found: npm"

**Problem:** npm comes with Node. Same fix as above.

### "EACCES: permission denied"

**Problem:** npm trying to write where it shouldn't.

**Fix:**
```bash
# Mac/Linux: Use sudo (not ideal)
sudo npm install -g package

# Better: Fix npm permissions
# https://docs.npmjs.com/resolving-eacces-permissions-errors
```

### "ENOENT: no such file or directory"

**Problem:** File or folder doesn't exist.

**Fix:** Check your path. Common causes:
- Typo in filename
- Wrong directory
- File deleted

## React Errors

### "Cannot read property 'X' of undefined"

**Problem:** Accessing property on undefined variable.

**Fix:**
```typescript
// Bad
user.name  // crashes if user is undefined

// Good
user?.name  // returns undefined safely
```

### "Each child should have a unique key prop"

**Problem:** List items missing keys.

**Fix:**
```tsx
// Bad
{items.map(item => <Item item={item} />)}

// Good
{items.map(item => <Item key={item.id} item={item} />)}
```

### "Too many re-renders"

**Problem:** Infinite render loop, usually from setState in render.

**Fix:**
```tsx
// Bad - updates state on every render
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // Infinite loop!
}

// Good - update in event handler
function Component() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

### "React Hook must be called at the top level"

**Problem:** Hook inside condition or loop.

**Fix:**
```tsx
// Bad
if (loggedIn) {
  const [data] = useState();  // Error!
}

// Good
const [data] = useState();  // Always at top
```

## TypeScript Errors

### "Type 'X' is not assignable to type 'Y'"

**Problem:** Wrong type being used.

**Fix:** Check what type is expected and provide it.
```typescript
// If expecting string[]
const items: string[] = ['a', 'b'];  // not [1, 2]
```

### "Property 'X' does not exist on type 'Y'"

**Problem:** Using property that's not defined.

**Fix:**
```typescript
// Add to interface
interface User {
  name: string;
  email: string;  // Add missing property
}
```

### "Object is possibly 'undefined'"

**Problem:** TypeScript protecting you from null access.

**Fix:**
```typescript
// Option 1: Optional chaining
user?.name

// Option 2: Check first
if (user) {
  console.log(user.name);
}

// Option 3: Non-null assertion (only if you're sure)
user!.name
```

## Firebase Errors

### "Firebase: Error (auth/wrong-password)"

**Problem:** Incorrect password.

**Fix:** Check password. Consider adding password reset.

### "Firebase: Error (auth/user-not-found)"

**Problem:** No account with this email.

**Fix:** Register first or check email spelling.

### "Firebase: Error (auth/email-already-in-use)"

**Problem:** Account already exists.

**Fix:** Login instead of register.

### "Missing or insufficient permissions"

**Problem:** Firestore security rules blocking access.

**Fix:**
1. Check you're logged in
2. Check userId matches document owner
3. Verify security rules are correct

### "Firebase: No Firebase App '[DEFAULT]'"

**Problem:** Firebase not initialized before use.

**Fix:** Make sure `initializeApp()` runs before accessing Firebase services.

## Git Errors

### "fatal: not a git repository"

**Problem:** Not in a Git-initialized folder.

**Fix:**
```bash
# Initialize Git
git init

# Or, you're in wrong folder
cd correct-folder
```

### "error: failed to push some refs"

**Problem:** Remote has changes you don't have.

**Fix:**
```bash
# Pull first
git pull

# Then push
git push
```

### "CONFLICT (content): Merge conflict"

**Problem:** Same lines changed in different places.

**Fix:**
1. Open conflicting files
2. Look for `<<<<<<<` markers
3. Decide which version to keep
4. Remove markers
5. Commit the resolution

## Build Errors

### "Module not found"

**Problem:** Package not installed or wrong import path.

**Fix:**
```bash
# Install missing package
npm install package-name

# Check import path
import X from './correct/path'  # Not '../wrong/path'
```

### "SyntaxError: Unexpected token"

**Problem:** Invalid syntax somewhere.

**Fix:** Check the line number in the error. Common causes:
- Missing comma
- Extra bracket
- Typo in keyword

## Browser Errors

### "CORS error"

**Problem:** Browser blocking cross-origin request.

**Fix:** This is a server-side fix. With Firebase, shouldn't happen for normal use.

### "Failed to fetch"

**Problem:** Network request failed.

**Fix:**
- Check internet connection
- Check if server/Firebase is up
- Check URL is correct

## Debug Steps

When something breaks:

1. **Read the error** — It often tells you what's wrong
2. **Check the line number** — Go to that file and line
3. **Add console.log** — See what values actually are
4. **Search the error** — Someone else had this problem
5. **Simplify** — Remove code until it works, then add back
6. **Ask AI** — Paste the error and relevant code

## Console.log Debugging

```typescript
function brokenFunction(data) {
  console.log('1. Function called');
  console.log('2. Data received:', data);

  const result = process(data);
  console.log('3. After process:', result);

  return result;
}
```

Check which log appears last → problem is after that.

---

*Keep this handy when errors appear!*
