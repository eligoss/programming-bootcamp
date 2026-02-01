# Non-Functional Requirements

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What non-functional requirements are
- Security, performance, and usability basics
- Quality attributes for your app

## The Big Idea

Non-functional requirements answer: **How well should it work?**

Functional: "Users can log in"
Non-functional: "Login completes in under 2 seconds"

These are the quality attributes that make good software great (or bad).

## Key Categories

### 1. Security

**Must have:**
- Passwords are never stored in plain text (Firebase handles this)
- Only the owner can see their data
- Authentication is required for protected routes

**For our project:**
```
- All user data is private to that user
- Firestore security rules prevent unauthorized access
- No credentials stored in client-side code
```

### 2. Performance

**Must have:**
- Pages load in reasonable time
- App is responsive to user input

**For our project:**
```
- Initial page load under 3 seconds
- Actions (save, delete) feel instant
- List of items loads efficiently
```

Note: With Firebase and React, these come mostly for free if we don't do anything silly.

### 3. Usability

**Must have:**
- User knows what to do
- Feedback for actions (success, error)
- Works on different screen sizes

**For our project:**
```
- Clear navigation between pages
- Error messages are understandable
- Loading states show something is happening
- Works on laptop and phone browsers
```

### 4. Reliability

**Must have:**
- Data isn't lost
- App handles errors gracefully

**For our project:**
```
- Saved data persists (Firebase handles this)
- Network errors show a message, don't crash
- User can retry failed actions
```

### 5. Maintainability

**For a learning project:**
- Code is understandable
- Someone else could read and modify it

**For our project:**
```
- Clean code structure
- Meaningful variable names
- Comments where logic isn't obvious
```

## Security Requirements in Detail

Since we're building authentication, security matters:

| Requirement | How We Meet It |
|-------------|---------------|
| **Password security** | Firebase Auth handles hashing/salting |
| **Data isolation** | Firestore rules require userId match |
| **Protected routes** | React router checks auth state |
| **No credential exposure** | Environment variables, not hardcoded |

### Firestore Security Rules Preview

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Notes belong to users
    match /notes/{noteId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.userId;
    }
  }
}
```

This says: "Only the owner can read or write their notes."

## Usability Requirements in Detail

| Requirement | Implementation |
|-------------|----------------|
| **Feedback on save** | Show "Saved!" or toast message |
| **Feedback on error** | Show error message in red |
| **Loading indication** | Show spinner or "Loading..." |
| **Clear actions** | Buttons labeled with verbs |
| **Confirmation for delete** | "Are you sure?" dialog |

## What We're NOT Worrying About

For this learning project, we skip:

- **High availability** (99.99% uptime)
- **Massive scale** (millions of users)
- **Internationalization** (multiple languages)
- **Accessibility** (screen readers, ARIA) — important but out of scope
- **Offline support** (works without internet)

These matter for production apps. Not for a 4-hour bootcamp.

## Quality Checklist

Before calling the app "done":

- [ ] Can only see my own data (security)
- [ ] Pages load without long delays (performance)
- [ ] Errors show messages, don't crash (reliability)
- [ ] I understand what to click (usability)
- [ ] Code is organized and readable (maintainability)

## Check Your Understanding

- [ ] Non-functional requirements are about quality, not features
- [ ] Security is critical for authentication apps
- [ ] Our scope is MVP quality, not production perfect
- [ ] Firebase handles the hard security stuff for us

## Phase 2 Complete!

You now have:
- Business requirements (the problem)
- Functional requirements (user stories)
- Technical requirements (the stack)
- Non-functional requirements (quality)

Time to fill in the worksheet!

[Complete the Requirements Worksheet →](./exercises/requirements-worksheet)
