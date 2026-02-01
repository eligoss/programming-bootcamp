# Slice 4 Prompts

> Example prompts for security rules

## Before You Start

Make sure you have Firebase CLI:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize in your project
firebase init
```

When running `firebase init`:
- Select "Firestore" (use spacebar to select, enter to continue)
- Use existing project → select yours
- Accept default firestore.rules filename
- Accept default firestore.indexes.json filename

---

## Prompt 1: Create Security Rules

```
Create Firestore security rules for my notes app.

Collection: notes
Document structure:
- id: string
- title: string
- content: string
- userId: string
- createdAt: timestamp
- updatedAt: timestamp

Requirements:
1. Only authenticated users can access
2. Users can only read their own notes (where userId == their uid)
3. Users can only create notes with their own userId
4. Users can only update their own notes
5. Users can only delete their own notes
6. Title and content are required strings on create
7. userId cannot be changed on update

Create the firestore.rules file with these rules.
```

### What to Expect

Complete rules file with all conditions.

---

## Prompt 2: Understand the Rules

```
Explain these Firestore security rules line by line,
as if explaining to a beginner:

[PASTE YOUR RULES HERE]

For each line, explain:
1. What it does
2. Why it's important
3. What could go wrong without it
```

### Why This Helps

Understanding > copying. You should know why each rule exists.

---

## Prompt 3: Create Firebase Configuration

```
Create firebase.json configuration file for my project.

I need to configure:
1. Firestore rules (firestore.rules file)
2. Hosting with build directory as 'dist'
3. Rewrites for SPA routing (all routes to index.html)

Show me the firebase.json file.
```

### What to Expect

```json
{
  "firestore": {
    "rules": "firestore.rules"
  },
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## Deploy Rules

After creating the rules file:

```bash
# Deploy only Firestore rules
firebase deploy --only firestore:rules
```

You should see:
```
✔  firestore: released rules firestore.rules
```

---

## Testing in Rules Playground

1. Go to Firebase Console
2. Open Firestore
3. Click "Rules" tab
4. Click "Rules Playground" at the top

### Test: Read Own Note

- Simulation type: `get`
- Location: `notes/someNoteId`
- Authenticated: Yes
- Provider: Custom
- Firebase UID: [your user ID]

Add this to "Request resource data":
```json
{
  "userId": "[your user ID]"
}
```

Should show: ✅ Allowed

### Test: Read Without Auth

Same as above but:
- Authenticated: No

Should show: ❌ Denied

### Test: Read Other's Note

- Authenticated: Yes
- Firebase UID: "different-user-id"

Request resource userId stays as your ID.

Should show: ❌ Denied

---

## Common Issues

### "Missing required permissions"

After deploying rules, your app might get errors if:
- You were using test mode before
- Your code doesn't set userId correctly

Check that every document write includes:
```typescript
userId: auth.currentUser.uid
```

### Rules not taking effect

Rules can take a minute to propagate. Wait and try again.

### Getting user ID in rules playground

Find your user ID:
1. Firebase Console → Authentication
2. Find your user
3. Copy the UID

---

## Verification Checklist

Before committing:

- [ ] firestore.rules file exists
- [ ] firebase.json configured
- [ ] Rules deployed to Firebase
- [ ] App still works after deployment
- [ ] Cannot access others' data (tested)
- [ ] Cannot access without login (tested)
- [ ] `npm run lint` passes

---

## Commit

```bash
git add firestore.rules firebase.json
git commit -m "Add Firestore security rules"
git push
```

---

[Start Slice 5: Polish →](../slice-5-polish/)
