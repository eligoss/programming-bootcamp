# Testing Basics

> **Time**: ~10 minutes | **Difficulty**: Beginner

## What You'll Learn

- What testing means for web apps
- Manual testing strategy
- When to test

## The Big Idea

Testing verifies that your app works as expected. Before showing anyone your app, you need to confirm every feature works.

## Types of Testing

### Manual Testing (What We'll Do)
You click through the app and verify everything works.

### Automated Testing (Future Learning)
Code that tests your code automatically.

For this bootcamp, manual testing is sufficient. Automated testing is an important skill for later.

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

### CRUD Operations
- [ ] Can create item
- [ ] Item appears in list
- [ ] Can edit item
- [ ] Changes persist
- [ ] Can delete item
- [ ] Item removed from list
- [ ] Empty state shows when no items

### Data Isolation
- [ ] Only see own items
- [ ] Can't access others' data (test with rules playground)

### UI/UX
- [ ] No console errors
- [ ] Loading states visible
- [ ] Error messages helpful
- [ ] Success feedback shown
- [ ] Works on mobile browser

## Testing Tips

### Use Developer Tools

Press `F12` or `Cmd+Option+I` to open DevTools:

- **Console:** Check for errors
- **Network:** See API calls
- **Application:** Check localStorage, cookies

### Test Different Scenarios

1. **Happy path:** Everything goes right
2. **Error path:** Things go wrong
3. **Edge cases:** Unusual inputs

### Document Issues

When you find bugs:
```
Bug: [What's wrong]
Steps: [How to reproduce]
Expected: [What should happen]
Actual: [What actually happens]
```

## Check Your Understanding

- [ ] Manual testing means clicking through the app
- [ ] I need to test each user flow
- [ ] Edge cases are unusual situations
- [ ] Console shows JavaScript errors
- [ ] I have a checklist to follow

## Next Up

Time to deploy your app to the internet!

[Continue: Deployment Walkthrough →](./02-deployment-walkthrough)
