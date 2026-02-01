# Step 6: Create Firebase Config

> **Time**: ~5 minutes | **Type**: Configuration | **Concepts**: firebase.json, deployment configuration

## What We're Building

Verifying and updating `firebase.json` to ensure Firebase knows where your rules file is and setting up for future deployment.

## What is firebase.json?

`firebase.json` is Firebase's main configuration file. It tells Firebase:
- Where your Firestore rules are
- Where your hosting files are (for deployment later)
- What to deploy when you run `firebase deploy`

Think of it as the "table of contents" for your Firebase project.

## Part 1: Check Existing firebase.json

**Open `firebase.json` in your project:**

```bash
cat firebase.json
```

**You should see** (from Step 3):

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

**This is good!** It already points to your rules file.

**If your file looks different or is missing:**
- Make sure you ran `firebase init` in Step 3
- Create the file manually (see below)

## Part 2: Add Hosting Configuration (Optional, for Slice 8)

Let's add hosting configuration now so it's ready when we deploy in Slice 8:

**Update firebase.json** to include hosting:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**What this adds:**

- `"public": "dist"` — Your build output folder (Vite creates this)
- `"ignore"` — Files Firebase should ignore when deploying
- `"rewrites"` — Send all routes to index.html (for React Router)

**Why add this now?**
- We'll need it in Slice 8 for deployment
- Doesn't affect anything until we run `firebase deploy --only hosting`
- Good to have it ready

## Part 3: Verify Configuration

Check that your `firebase.json` is valid JSON:

```bash
cat firebase.json | python3 -m json.tool
```

**Expected output:**
Your JSON formatted nicely (no errors)

**If you see errors:**
- Check for missing commas
- Check for extra/missing brackets
- Use a JSON validator online

**Alternative check:**

```bash
firebase deploy --only firestore:rules --dry-run
```

**Should show:**
```
✔  firestore: rules file firestore.rules compiled successfully
```

## Part 4: Understanding the Config

Let's break down each part:

### Firestore Section

```json
"firestore": {
  "rules": "firestore.rules",
  "indexes": "firestore.indexes.json"
}
```

**What it means:**
- `"rules": "firestore.rules"` — Rules file location
- `"indexes": "firestore.indexes.json"` — Indexes file (for complex queries)

**When you run `firebase deploy --only firestore:rules`:**
- Firebase uploads `firestore.rules` to your project
- Rules take effect immediately

### Hosting Section (Optional)

```json
"hosting": {
  "public": "dist",
  "ignore": [...],
  "rewrites": [...]
}
```

**What it means:**
- `"public": "dist"` — Deploy files from `dist/` folder
- `"ignore"` — Don't deploy these files
- `"rewrites"` — All URLs go to `index.html` (for SPA routing)

**When you run `firebase deploy --only hosting`:**
- Firebase uploads everything in `dist/`
- Your app is live at `your-project.web.app`

## Common Issues

### "File firestore.rules not found"

**Problem:** Rules file doesn't exist or wrong path.

**Fix:**
```bash
# Check file exists
ls -la firestore.rules

# If missing, create it
touch firestore.rules

# Make sure path in firebase.json matches actual file location
```

### "Invalid JSON"

**Problem:** Syntax error in firebase.json.

**Fix:**
- Check for missing commas between sections
- Check that all brackets match: `{ }` and `[ ]`
- Use a code editor with JSON validation
- Paste into https://jsonlint.com to find errors

### "Property 'hosting.public' must be a string"

**Problem:** Wrong data type in config.

**Fix:**
```json
// ❌ Wrong
"public": ["dist"]

// ✅ Correct
"public": "dist"
```

### Still having issues?

**Ask AI:**
```
I'm getting this error with my firebase.json:
[paste error message]

Here's my firebase.json:
[paste file contents]

What's wrong?
```

## Understanding What You Did

> **💡 Ask yourself (or ask AI):**
>
> 1. **What does firebase.json configure?** (Firestore rules, hosting settings, other Firebase services)
> 2. **Where does "public": "dist" point to?** (The build output folder from `npm run build`)
> 3. **Why do we need the "rewrites" section?** (To make React Router work — all routes go to index.html)
> 4. **Can I change the rules file name?** (Yes, just update `firebase.json` to match)
> 5. **What happens when I deploy rules?** (Firebase uploads rules to your project, enforces them immediately)

## What You Learned

At this point you should have:
- ✅ `firebase.json` configured for Firestore
- ✅ Rules file path correctly specified
- ✅ Hosting configuration added (ready for Slice 8)
- ✅ JSON syntax validated
- ✅ Understanding of what each config section does

## Next Step

Configuration is ready! Now let's test your rules in the Firebase Rules Playground before deploying them:

[Step 7: Test & Deploy Rules →](./07-test-deploy-rules)
