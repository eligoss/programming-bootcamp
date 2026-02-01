# Testing Basics

> **Time**: ~10 minutes | **Difficulty**: Beginner

## What You'll Learn

- What testing means for web apps
- Manual testing strategy
- How to use browser DevTools to find bugs
- When to test
- How AI can help with debugging

## The Big Idea

Testing verifies that your app works as expected. Before showing anyone your app, you need to confirm every feature works.

**Ask AI:** "What's the difference between manual and automated testing? Which should I use for my first project?"

## Types of Testing

### Manual Testing (What We'll Do)
You click through the app and verify everything works. This is like being your own quality assurance tester.

### Automated Testing (Future Learning)
Code that tests your code automatically. Think of it like a robot that clicks through your app and checks everything.

For this bootcamp, manual testing is sufficient. Automated testing is an important skill for later.

**Ask AI:** "When should I consider adding automated tests to my web application?"

## How Testing Works

Here's the basic flow of testing:

```
User Action → App Behavior → Expected Result
    ↓              ↓               ↓
Click Login → Send credentials → Redirect to dashboard
                  ↓                      ↓
            Check with Firebase    Show user's data
                  ↓
            Error or Success?
                  ↓
        ┌─────────┴─────────┐
        ↓                   ↓
    SUCCESS              ERROR
        ↓                   ↓
  Dashboard loads    Show error message
```

Every test follows this pattern:
1. **Do something** (click, type, submit)
2. **Check what happens** (page changes, data appears, error shown)
3. **Compare to expected** (is this what should happen?)

## Manual Testing Strategy

### Test Each User Flow

A **user flow** is a path a user takes through your app.

**Flow 1: New User Registration**
```
1. Go to /register
2. Enter valid email and password
3. Click Register
4. Verify: Redirected to dashboard
5. Verify: User shown in Firebase console
```

**Flow 2: Returning User Login**
```
1. Go to /login
2. Enter valid credentials
3. Click Login
4. Verify: Redirected to dashboard
5. Verify: Can see their data
```

**Flow 3: Create Item**
```
1. Go to dashboard
2. Click "New [Item]"
3. Fill out form
4. Click Save
5. Verify: Redirected to list
6. Verify: New item appears
7. Verify: Item in Firestore
```

**Flow 4: Edit Item**
```
1. Click Edit on an item
2. Change some data
3. Click Save
4. Verify: Changes saved
5. Verify: Changes persist after refresh
```

**Flow 5: Delete Item**
```
1. Click Delete on an item
2. Confirm deletion
3. Verify: Item removed from list
4. Verify: Item gone from Firestore
```

**Flow 6: Logout**
```
1. Click Logout
2. Verify: Redirected to home/login
3. Try to access /dashboard
4. Verify: Redirected to login
```

## Edge Cases to Test

### Error Conditions

| Test | Expected Result |
|------|-----------------|
| Login with wrong password | Error message shown |
| Register with existing email | Error message shown |
| Submit empty form | Validation errors shown |
| Submit invalid email | Validation error shown |
| Lose network connection | Graceful error handling |

### Edge Cases

| Test | Expected Result |
|------|-----------------|
| Very long title | Handles gracefully (truncates or scrolls) |
| Special characters | Works correctly |
| Rapid clicking | Doesn't create duplicates |
| Refresh during operation | Doesn't break |

## Using Browser DevTools

DevTools is your best friend for finding bugs. Here's how to use it:

**Ask AI:** "What are browser DevTools and how do they help me debug my web application?"

### Opening DevTools

- **Windows/Linux:** Press `F12` or `Ctrl+Shift+I`
- **Mac:** Press `Cmd+Option+I`

### The Console Tab

The Console shows JavaScript errors and logs.

```
Step-by-step: Finding errors in Console
┌──────────────────────────────────────┐
│ 1. Open DevTools (F12)               │
│ 2. Click "Console" tab                │
│ 3. Look for red error messages        │
│ 4. Click the error to see details     │
│ 5. Note the file and line number      │
└──────────────────────────────────────┘
```

**What to look for:**
- Red text = errors (these break your app)
- Yellow text = warnings (might cause problems)
- Blue text = info messages (usually harmless)

**Common Console Errors:**

```
Uncaught TypeError: Cannot read property 'map' of undefined
→ Means: You're trying to use .map() on something that doesn't exist yet
→ Fix: Add a loading check or default value
```

```
Warning: Each child in a list should have a unique "key" prop
→ Means: Your .map() items need key attributes
→ Fix: Add key={item.id} to each item
```

```
firebase.auth().signInWithEmailAndPassword(...) failed
→ Means: Login credentials were wrong or Firebase has an issue
→ Fix: Check email/password, check Firebase console
```

### The Network Tab

The Network tab shows all requests your app makes.

```
Step-by-step: Checking API calls
┌──────────────────────────────────────┐
│ 1. Open DevTools (F12)               │
│ 2. Click "Network" tab                │
│ 3. Perform the action (login, save)   │
│ 4. Look for red items (failed)        │
│ 5. Click a request to see details     │
└──────────────────────────────────────┘
```

**What to look for:**
- Status codes in the "Status" column
  - 200 = Success
  - 400 = Bad request (your code sent wrong data)
  - 401 = Unauthorized (need to log in)
  - 403 = Forbidden (security rules block you)
  - 404 = Not found
  - 500 = Server error

### The Application Tab

The Application tab shows stored data.

```
Step-by-step: Checking stored data
┌──────────────────────────────────────┐
│ 1. Open DevTools (F12)               │
│ 2. Click "Application" tab            │
│ 3. Look in "Storage" section          │
│ 4. Check localStorage                 │
│ 5. Check cookies if using them        │
└──────────────────────────────────────┘
```

**What to check:**
- localStorage: Does it have your auth token?
- Cookies: Are they set correctly?
- If these are missing, auth won't persist

## Common Issues and How to Fix Them

### Issue 1: App shows white screen

**Symptoms:** Nothing loads, blank white page

**How to diagnose:**
1. Open Console (F12 → Console)
2. Look for red errors
3. Most common: "Cannot read property of undefined"

**How to fix:**
- Check if you're loading data before it's ready
- Add loading states: `if (!data) return <div>Loading...</div>`
- Check Firebase connection

**Ask AI:** "My React app shows a white screen. Here's the console error: [paste error]"

### Issue 2: Data doesn't appear after creation

**Symptoms:** You create an item but don't see it in the list

**How to diagnose:**
1. Open Network tab
2. Create an item
3. Check if request succeeded (status 200)
4. Check Firestore console for the data

**How to fix:**
- If request failed: Check Firebase security rules
- If request succeeded but no display: Check your query
- If data in Firestore but not shown: Check userId filtering

**Ask AI:** "I created an item but it doesn't show in my list. The Firestore console shows the data. What could be wrong?"

### Issue 3: Login doesn't redirect

**Symptoms:** Login succeeds but stays on login page

**How to diagnose:**
1. Open Console
2. Try logging in
3. Check for navigation errors

**How to fix:**
- Check if you're calling `navigate('/dashboard')` after successful login
- Check if React Router is set up correctly
- Make sure auth state is being set

**Ask AI:** "My Firebase login succeeds but doesn't redirect to the dashboard. Here's my login code: [paste code]"

### Issue 4: "Permission denied" errors

**Symptoms:** Can't read or write data, console shows "PERMISSION_DENIED"

**How to diagnose:**
1. Open Firestore console
2. Go to Rules tab
3. Check your security rules

**How to fix:**
- Make sure user is authenticated
- Check rules allow authenticated users: `allow read, write: if request.auth != null`
- Check userId filtering in rules

**Ask AI:** "I'm getting PERMISSION_DENIED errors in Firestore. Here are my security rules: [paste rules]"

### Issue 5: Changes don't appear after refresh

**Symptoms:** You make changes but refreshing shows old data

**How to diagnose:**
1. Check browser cache (Ctrl+Shift+R to hard refresh)
2. Check if data in Firestore matches what you expect
3. Check if your query is correct

**How to fix:**
- Try incognito mode to rule out cache
- Check Firestore console to verify data is actually saved
- Check your real-time listeners are working

**Ask AI:** "My app shows old data after refresh even though Firestore has the new data. What could cause this?"

## Testing with AI

AI can help you debug and test! Here's how:

### When Something Breaks

**Good AI prompts for debugging:**

```
"I'm getting this error: [paste error message]
Here's the code where it happens: [paste code]
What's wrong and how do I fix it?"
```

```
"My login form submits but nothing happens.
Here's my handleSubmit function: [paste code]
What am I missing?"
```

```
"I created an item but it doesn't show in the list.
Here's my create function: [paste create code]
Here's my list component: [paste list code]
What's wrong?"
```

### Testing Coverage

**Ask AI:** "I've built a notes app with Firebase auth and CRUD. What testing scenarios should I cover before deploying?"

### Understanding Errors

**Ask AI:** "What does 'Uncaught TypeError: Cannot read property map of undefined' mean in React? How do I fix it?"

### Security Testing

**Ask AI:** "How can I test if my Firestore security rules are working correctly?"

## Testing Checklist

Before deploying, verify:

### Authentication
- [ ] Can register new account
- [ ] Can't register with existing email
- [ ] Can login with correct credentials
- [ ] Can't login with wrong password
- [ ] Can logout
- [ ] Protected pages redirect when logged out
- [ ] Auth persists on refresh
- [ ] No console errors during auth flows

### CRUD Operations
- [ ] Can create item
- [ ] Item appears in list immediately
- [ ] Item appears in Firestore console
- [ ] Can edit item
- [ ] Changes persist after save
- [ ] Changes persist after page refresh
- [ ] Can delete item
- [ ] Item removed from list immediately
- [ ] Item removed from Firestore
- [ ] Empty state shows when no items

### Data Isolation
- [ ] Only see own items
- [ ] Can't access others' data (test with rules playground)
- [ ] URLs with other user IDs don't work
- [ ] Logging out clears sensitive data

### UI/UX
- [ ] No console errors (red text)
- [ ] No console warnings about keys
- [ ] Loading states visible during operations
- [ ] Error messages helpful and specific
- [ ] Success feedback shown (toasts, messages)
- [ ] Forms clear after submission
- [ ] Buttons disable during loading
- [ ] Works on mobile browser (responsive)

### Performance
- [ ] Pages load in under 2 seconds
- [ ] No lag when typing
- [ ] Lists of 20+ items perform well
- [ ] No unnecessary re-renders (check React DevTools)

## Testing Tips

### Use Developer Tools

Press `F12` or `Cmd+Option+I` to open DevTools:

- **Console:** Check for errors
- **Network:** See API calls
- **Application:** Check localStorage, cookies

Keep DevTools open while testing. Get comfortable reading errors.

### Test Different Scenarios

1. **Happy path:** Everything goes right
2. **Error path:** Things go wrong
3. **Edge cases:** Unusual inputs

Most bugs hide in error paths and edge cases.

### Test in Different States

- **Logged out:** Can you access protected pages?
- **Logged in:** Does everything work?
- **Empty state:** No items created yet
- **Full state:** Many items in the list
- **During loading:** What shows while data loads?

### Document Issues

When you find bugs:
```
Bug: Can't delete last item in list
Steps:
  1. Go to dashboard
  2. Delete all items except one
  3. Try to delete the last item
  4. Click delete and confirm
Expected: Item deleted, empty state shown
Actual: Error in console, item still visible
```

This format helps you (or AI) fix it later.

### Test on Different Devices

If possible:
- Desktop browser
- Mobile browser
- Different browsers (Chrome, Firefox, Safari)

**Ask AI:** "What's the best way to test my web app on mobile without deploying it?"

## Check Your Understanding

- [ ] Manual testing means clicking through the app
- [ ] I need to test each user flow
- [ ] Edge cases are unusual situations
- [ ] Console shows JavaScript errors (red text)
- [ ] Network tab shows API calls and status codes
- [ ] I have a checklist to follow
- [ ] DevTools helps me find and fix bugs
- [ ] AI can help me debug errors

## Next Up

Time to deploy your app to the internet!

[Continue: Deployment Walkthrough →](./02-deployment-walkthrough)
