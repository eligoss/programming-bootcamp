# Step 3: Initialize Firebase Project

> **Time**: ~5 minutes | **Type**: Setup | **Concepts**: Firebase initialization, Project configuration

## What We're Building

Setting up Firebase configuration files in your project directory so you can manage Firestore rules and deployment locally.

## What is Firebase Init?

`firebase init` creates configuration files that tell Firebase:
- Which services you're using (Firestore, Hosting, etc.)
- Where your rules files are
- Where your build output is
- What project this directory belongs to

Think of it as "connecting your local folder to your Firebase project."

## Part 1: Run Firebase Init

**IMPORTANT:** Run this command **in your project's root directory** (where package.json is):

```bash
# Make sure you're in the right place
cd your-project-directory

# Initialize Firebase
firebase init
```

**You'll see:**
```
     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /path/to/your-project
```

## Part 2: Answer the Prompts

Firebase will ask several questions. Here's what to choose:

### Question 1: Which features?

```
? Which Firebase features do you want to set up for this directory?
❯ ◯ Realtime Database
  ◯ Firestore
  ◯ Functions
  ◯ Hosting
  ◯ Storage
  ◯ Emulators
```

**Select:**
- ✅ **Firestore** (press Space to select, then Enter)

Use arrow keys to navigate, Space to select, Enter to confirm.

**Why:** We only need Firestore rules right now. (We'll add Hosting later in Slice 8.)

### Question 2: Use an existing project?

```
? Please select an option:
  Use an existing project
❯ Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project
```

**Select:**
- ✅ **Use an existing project**

**Why:** You already created a Firebase project in Slice 2.

### Question 3: Which project?

```
? Select a default Firebase project for this directory:
❯ bootcamp-app-123 (My Bootcamp App)
  other-project-456 (Another Project)
```

**Select:**
- ✅ Your bootcamp project (from Slice 2)

**Why:** This connects your local folder to your Firebase project.

### Question 4: Firestore rules file?

```
? What file should be used for Firestore Rules?
  (firestore.rules)
```

**Answer:**
- ✅ Press Enter (accept default `firestore.rules`)

**Why:** This is the standard name for Firestore rules.

### Question 5: Firestore indexes file?

```
? What file should be used for Firestore indexes?
  (firestore.indexes.json)
```

**Answer:**
- ✅ Press Enter (accept default `firestore.indexes.json`)

**Why:** We won't use indexes in this bootcamp, but it's fine to create the file.

### Success Message

```
✔ Firebase initialization complete!
```

## Part 3: Verify Files Created

Check that Firebase created these files:

```bash
ls -la
```

**You should see:**
```
.firebaserc         (Project configuration)
firebase.json       (Firebase settings)
firestore.rules     (Security rules - we'll edit this)
firestore.indexes.json (Database indexes)
```

**Check contents:**

**.firebaserc**
```bash
cat .firebaserc
```

Should show:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

**firebase.json**
```bash
cat firebase.json
```

Should show:
```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

**firestore.rules**
```bash
cat firestore.rules
```

Should show (default rules):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**⚠️ Note:** Default rules block everything (`if false`). We'll replace these in Step 5.

## Part 4: Verify Everything

Run this to check Firebase sees your project:

```bash
firebase use
```

**Expected output:**
```
Active Project: your-project-id (My Bootcamp App)
```

**If you see your project name:** ✅ Initialization successful!

## Common Issues

### "Already initialized"

**Problem:** Firebase already initialized in this directory.

**Fix:** This is fine! Your files already exist. Continue to next step.

**If you want to re-initialize:**
```bash
# Remove Firebase files
rm .firebaserc firebase.json firestore.rules firestore.indexes.json

# Re-run init
firebase init
```

### "No project found"

**Problem:** Not logged in or wrong project.

**Fix:**
```bash
# Make sure you're logged in
firebase login

# List projects
firebase projects:list

# Set project manually
firebase use your-project-id
```

### "Permission denied"

**Problem:** Wrong directory or no write permissions.

**Fix:**
```bash
# Make sure you're in project root
pwd  # Should show your project directory

# Check you can create files
touch test.txt && rm test.txt

# If permission error, check folder ownership
```

### Files created but empty

**Problem:** Initialization didn't complete.

**Fix:**
```bash
# Re-run init
firebase init

# Make sure to select Firestore
# Accept all defaults
```

## Understanding What You Did

> **💡 Ask yourself (or ask AI):**
>
> 1. **What does firebase init do?** (Creates config files linking local directory to Firebase project)
> 2. **What is .firebaserc for?** (Stores which Firebase project to use)
> 3. **What is firestore.rules for?** (Defines security rules for Firestore)
> 4. **Can I edit firebase.json manually?** (Yes! It's just a JSON config file)
> 5. **What do the default rules do?** (Block all access — `if false`)

## What You Learned

At this point you should have:
- ✅ Firebase initialized in your project directory
- ✅ `.firebaserc` connecting to your Firebase project
- ✅ `firebase.json` with Firestore configuration
- ✅ `firestore.rules` file (default rules, we'll edit soon)
- ✅ `firestore.indexes.json` file
- ✅ Understanding that default rules block everything

## Next Step

Firebase is initialized! Now let's learn about the rules syntax before we write our own rules:

[Step 4: Understanding Rules Syntax →](./04-understanding-rules-syntax)
