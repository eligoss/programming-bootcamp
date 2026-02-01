# Step 2: Enable and Install Firestore

> **Time**: ~8 minutes | **Type**: Setup | **Concepts**: Firebase Console, Package Installation

## What We're Building

Enabling Firestore in your Firebase project and verifying the Firebase package is installed.

## Part 1: Enable Firestore in Firebase Console

### Manual Setup (You Do This)

1. **Go to Firebase Console:**
   - Open [https://console.firebase.google.com](https://console.firebase.google.com)
   - Select your project (the one you created in Slice 2)

2. **Navigate to Firestore:**
   - In the left sidebar, click **"Firestore Database"**
   - (Or find it under "Build" section)

3. **Create Database:**
   - Click **"Create database"** button
   - Choose location: **Start in production mode** (we'll add security rules later)
   - Click **"Next"**

4. **Select Location:**
   - Choose a region close to your users
   - (For the bootcamp, default is fine)
   - Click **"Enable"**

5. **Wait for Creation:**
   - Firestore is setting up your database
   - Should take 30-60 seconds
   - You'll see "Cloud Firestore" page when ready

6. **Verify:**
   - You should see an empty database
   - Tabs: Data, Rules, Indexes, Usage
   - Under "Data" tab, you'll see "Start collection" button

**What you should see:**
```
Cloud Firestore
┌────────────────────────────────────┐
│ Data | Rules | Indexes | Usage     │
├────────────────────────────────────┤
│                                    │
│  No collections yet                │
│  [+ Start collection]              │
│                                    │
└────────────────────────────────────┘
```

## Part 2: Verify Firebase Package Installed

Since you installed Firebase in Slice 2 for Authentication, the package should already be installed. Let's verify:

### Check package.json

```bash
cat package.json
```

Look for `firebase` in the `dependencies` section:

```json
{
  "dependencies": {
    "firebase": "^10.x.x",  // ← Should be here
    "react": "^18.x.x",
    // ...
  }
}
```

**If you see `firebase` listed:** ✅ You're good! Skip to Part 3.

**If you DON'T see `firebase`:** Install it now:

```bash
npm install firebase
```

## Part 3: Verify Installation

Run your dev server to make sure everything still works:

```bash
npm run dev
```

**Check:**
- [ ] Server starts without errors
- [ ] No "Cannot find module 'firebase'" errors
- [ ] App loads at `http://localhost:5173`
- [ ] Authentication still works (try logging in)

## Common Issues

### "Firestore Database" not showing in Firebase Console

**Problem:** Wrong Firebase project or billing required.

**Fix:**
- Verify you're in the correct project (top left dropdown)
- Some Firebase features require Blaze plan (pay-as-you-go)
- For the bootcamp, Firestore should be available on free Spark plan
- If blocked, check Firebase Console for upgrade prompt

### "firebase is not defined" in browser console

**Problem:** Firebase not imported in your code yet.

**Fix:** This is expected! We'll add Firestore to your firebase config in the next step. No action needed yet.

### "Error creating database"

**Problem:** Region unavailable or quota exceeded.

**Fix:**
- Try a different region
- Make sure you only have one Firestore database per project
- Check Firebase status page for outages

### npm install fails

**Problem:** Network issue or package conflict.

**Fix:**
```bash
# Clear cache and retry
npm cache clean --force
npm install firebase
```

## Understanding What You Did

> **💡 Ask yourself (or ask AI):**
>
> 1. **Where is Firestore data actually stored?** (In Google's servers, not your computer)
> 2. **Why did we choose "production mode"?** (We'll add specific security rules ourselves)
> 3. **What does the Firebase package give us?** (JavaScript SDK to interact with Firebase)
> 4. **Do we need to install Firestore separately from Firebase?** (No, Firestore is part of the Firebase package)

## What You Learned

At this point you should have:
- ✅ Firestore Database enabled in Firebase Console
- ✅ Firebase package installed (`firebase` in package.json)
- ✅ Dev server running without errors
- ✅ Understanding that Firestore is now ready to use

## Next Step

Firestore is enabled! Now let's add it to your app's Firebase configuration and create TypeScript types for your data:

[Step 3: Initialize Firestore and Types →](./03-initialize-firestore-types)
