# Step 2: Create Firebase Project

> **Time**: ~10 minutes | **Type**: Manual Setup | **Concepts**: Firebase Console, Project Configuration

## What We're Building

Creating a Firebase project in the Google Cloud console and enabling Email/Password authentication.

## Before You Code: Understanding Firebase

> **💡 Ask AI First:**
>
> ```
> What is Firebase and why do web apps use it?
> What does Firebase Authentication provide that I don't have to build myself?
> What's the difference between Firebase Auth and a database like Firestore?
> ```

**What you should learn:**
- Firebase is a Backend-as-a-Service (BaaS) platform from Google
- Authentication handles user accounts, login, and sessions
- Firebase handles password hashing, tokens, and security
- Later we'll add Firestore (database) to the same project

## Let's Build It

### Step 1: Access Firebase Console

1. Open your browser and go to: [https://console.firebase.google.com](https://console.firebase.google.com)
2. Sign in with your Google account (create one if needed)
3. You should see the Firebase console homepage

**What to expect:**
- Clean interface with "Add project" or "Create a project" button
- List of any existing projects (probably empty if this is your first time)

### Step 2: Create New Project

1. Click **"Add project"** or **"Create a project"**
2. **Project name**: Enter `todo-app` (or your app's name)
3. Click **"Continue"**

**What you'll see:**
- Project name field turns green with checkmark when valid
- "Continue" button becomes active

### Step 3: Google Analytics (Optional)

1. You'll see "Enable Google Analytics for this project?"
2. **Toggle OFF** (we don't need it for this bootcamp)
3. Click **"Create project"**

**What happens next:**
- Firebase creates your project (takes ~30 seconds)
- Progress indicator shows "Creating project..." then "Your new project is ready"
4. Click **"Continue"**

**What to expect:**
- You're now in your project's dashboard
- Left sidebar shows various Firebase services
- Welcome screen might appear (you can dismiss it)

### Step 4: Register Web App

1. On the project overview page, look for the **Web icon** (`</>` symbol)
2. If you don't see it, click the gear icon next to "Project Overview" at the top
3. Click **"Add app"** → Select **Web** (the `</>` icon)

**What you'll see:**
- Modal asking "Add Firebase to your web app"

4. **App nickname**: Enter `todo-web` (or any name you like)
5. **Firebase Hosting**: Leave UNCHECKED (we'll set this up later)
6. Click **"Register app"**

**What happens:**
- Firebase generates configuration code for your app
- You'll see a code snippet with your Firebase config

### Step 5: Copy Firebase Config

You'll see code that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "todo-app-12345.firebaseapp.com",
  projectId: "todo-app-12345",
  storageBucket: "todo-app-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**IMPORTANT:**
1. **Copy this entire object** (from `{` to `}`)
2. Save it in a text file or keep the browser tab open
3. You'll need this in the next step
4. Click **"Continue to console"**

**What to expect:**
- You're back at the project overview
- Your web app is now registered

### Step 6: Enable Email/Password Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"** (if first time)

**What you'll see:**
- Authentication dashboard
- Multiple tabs at the top: Users, Sign-in method, Templates, Usage, Settings

3. Click the **"Sign-in method"** tab
4. Find **"Email/Password"** in the list of providers
5. Click on it (the row is clickable)

**What happens:**
- Modal opens with "Email/Password" settings

6. **Enable toggle**: Turn ON the first option ("Email/Password")
7. **Email link**: Leave OFF (we'll use password-based login)
8. Click **"Save"**

**What to expect:**
- "Email/Password" row now shows "Enabled" status
- Green dot or checkmark next to it

## Verify It Works

### Checklist:

- [ ] Firebase project created and visible in console
- [ ] Web app registered (shows under Project Settings → General → Your apps)
- [ ] Firebase config copied and saved
- [ ] Email/Password authentication enabled (shows "Enabled" in Sign-in methods)

### How to Check:

**Verify web app:**
1. Click gear icon → **"Project settings"**
2. Scroll to "Your apps" section
3. Should see your web app listed

**Verify authentication:**
1. Click **"Authentication"** in sidebar
2. Click **"Sign-in method"** tab
3. Email/Password should show "Enabled"

## Common Issues

### "Project name already exists"

**Problem:** Someone else already used that name

**Fix:**
- Firebase project names are globally unique
- Try adding numbers: `todo-app-2024` or `todo-app-yourname`

### Can't find "Enable" toggle

**Problem:** Wrong tab or wrong provider

**Fix:**
- Make sure you're on "Sign-in method" tab (not "Users")
- Click the "Email/Password" ROW itself (not just hovering)
- Look for two toggles — enable the FIRST one

### "This site can't be reached" error

**Problem:** Typo in URL or internet connection

**Fix:**
- URL should be exactly: `console.firebase.google.com`
- Check your internet connection
- Try incognito/private browsing mode

### Firebase config not showing

**Problem:** Skipped registering web app

**Fix:**
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. If empty, click "Add app" → Web icon
4. Complete registration steps

## What the Config Means

Understanding your Firebase config object:

```javascript
const firebaseConfig = {
  apiKey: "...",           // Public key for Firebase API
  authDomain: "...",       // Domain for auth redirects
  projectId: "...",        // Your project's unique ID
  storageBucket: "...",    // Cloud Storage bucket
  messagingSenderId: "...", // For push notifications
  appId: "..."             // Your web app's unique ID
};
```

**Is it safe to share?**
- The `apiKey` is NOT a secret (it's meant to be public)
- Firebase uses Security Rules to protect your data
- You'll add these rules in a later slice

## What You Learned

At this point you should understand:
- ✅ What Firebase provides (auth, database, hosting)
- ✅ How to create a Firebase project
- ✅ How to register a web app in Firebase
- ✅ How to enable authentication providers
- ✅ What the Firebase config object contains

## Next Step

Project created! Now let's install the Firebase SDK in your React app:

[Step 3: Install Firebase SDK →](./03-install-firebase-sdk)
