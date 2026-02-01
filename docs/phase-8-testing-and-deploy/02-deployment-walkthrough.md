# Deployment Walkthrough

> **Time**: ~10 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to build for production
- How to deploy to Firebase Hosting
- How to verify the deployment
- How to monitor your live app
- What to do if deployment breaks

## The Big Idea

Deployment takes your local code and puts it on the internet where anyone can use it.

**Ask AI:** "What's the difference between development mode and production mode for a web app?"

## The Deployment Flow

```
┌─────────────────┐
│  Your Computer  │
│                 │
│  1. Edit code   │
│  2. Test local  │
│  3. Build       │
└────────┬────────┘
         │
         ↓ npm run build
┌─────────────────┐
│   dist/ folder  │
│                 │
│  Optimized JS   │
│  Minified CSS   │
│  index.html     │
└────────┬────────┘
         │
         ↓ firebase deploy
┌─────────────────┐
│ Firebase Hosting│
│                 │
│  Live on web    │
│  Public URL     │
│  Anyone can use │
└─────────────────┘
         │
         ↓
┌─────────────────┐
│     Users       │
│                 │
│ https://your-   │
│ project.web.app │
└─────────────────┘
```

## Prerequisites

Make sure you have:
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Logged in (`firebase login`)
- [ ] Firebase initialized in project
- [ ] firebase.json exists

**Ask AI:** "How do I check if Firebase CLI is installed and what version I'm running?"

## Step 1: Final Local Check

Before deploying, make sure everything works locally:

```bash
# Run the development server
npm run dev
```

Test all features one more time:
- [ ] Register/Login/Logout work
- [ ] CRUD operations work
- [ ] No console errors
- [ ] No broken links
- [ ] Mobile view looks good

**Why this matters:** Broken code that works locally will be broken when deployed. Fix it now, not after deployment.

## Step 2: Build for Production

The build process creates optimized files:

```bash
npm run build
```

This creates a `dist/` folder with your production-ready app.

### What Happens During Build

1. TypeScript compiles to JavaScript
2. React code is bundled
3. CSS is minified
4. Code is optimized for speed
5. Source maps generated for debugging

You'll see output like:
```
vite v4.x.x building for production...
✓ 156 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-a3b4c5d6.css   12.34 kB
dist/assets/index-e7f8g9h0.js    145.67 kB
✓ built in 3.42s
```

**Ask AI:** "What does minification mean and why do we do it for production builds?"

### If Build Fails

Common issues:

**TypeScript errors:**
```bash
# Check for type errors
npm run type-check
# Or
npx tsc --noEmit
```

Fix any type errors before building.

**ESLint errors:**
```bash
# Check for lint errors
npm run lint
# Auto-fix what's possible
npm run lint:fix
```

**Import errors:**
```
error: Module not found: Can't resolve './components/Thing'
```
→ Fix the import path or create the missing file

**Environment variable errors:**
```
error: process is not defined
```
→ Make sure you're using `import.meta.env.VITE_*` not `process.env.*`

**Ask AI:** "My build is failing with this error: [paste error]. How do I fix it?"

## Step 3: Preview the Build (Optional)

Test the production build locally:

```bash
npm run preview
```

This serves the built files. Check that everything still works.

**Why preview?** Sometimes things work in dev mode but break in production. This catches those issues.

Visit the preview URL (usually http://localhost:4173) and test:
- [ ] App loads correctly
- [ ] All features work
- [ ] No console errors
- [ ] Firebase connection works

## Step 4: Deploy to Firebase

If you haven't initialized hosting:

```bash
firebase init hosting
```

When asked:
- Public directory: `dist`
- Single-page app: `Yes`
- Overwrite index.html: `No`
- Set up GitHub Actions: `No` (unless you want CI/CD)

**Ask AI:** "What does 'single-page app' mean in Firebase Hosting configuration?"

Then deploy:

```bash
firebase deploy
```

**Or deploy only hosting (faster):**
```bash
firebase deploy --only hosting
```

### What You'll See

```
=== Deploying to 'your-project-name'...

i  deploying firestore, hosting
i  firestore: reading indexes from firestore.indexes.json
✔  firestore: deployed indexes
✔  firestore: deployed rules
i  hosting: preparing dist directory for upload
✔  hosting: 15 files uploaded successfully
✔  Deploy complete!

Project Console: https://console.firebase.google.com/...
Hosting URL: https://your-project-name.web.app
```

**Copy that Hosting URL!** That's your live site.

## Step 5: Verify Deployment

Visit your Hosting URL (shown after deploy).

Test everything:
- [ ] Site loads
- [ ] Home page displays correctly
- [ ] Can navigate to different routes
- [ ] Can register new account
- [ ] Can login with existing account
- [ ] CRUD operations work
- [ ] Data persists across refresh
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] No console errors

**Test in incognito mode** to avoid cached data issues.

## Your Live URLs

Firebase gives you two URLs:
- `https://your-project.web.app`
- `https://your-project.firebaseapp.com`

Both work identically. Use the `.web.app` one (it's newer and nicer).

## Environment Variables

If your app uses environment variables:

### For Vite
Create `.env.production`:
```
VITE_FIREBASE_API_KEY=your-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
...
```

The build process includes these automatically.

**Ask AI:** "How do environment variables work in Vite? What's the difference between .env and .env.production?"

### Security Note
**Never commit API keys to Git!** Add `.env*` to `.gitignore`.

For Firebase config, it's safe to include in your code. Firebase uses security rules, not hidden keys.

## Common Deployment Issues

### Issue 1: "Page not found" on refresh

**Symptoms:**
- Direct navigation works
- Clicking links works
- Refreshing on `/dashboard` shows 404

**Why it happens:** Firebase doesn't know `/dashboard` is part of your single-page app.

**Fix:** Add rewrites to `firebase.json`:

```json
{
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

Then redeploy:
```bash
firebase deploy --only hosting
```

### Issue 2: White screen after deploy

**Symptoms:** App loads but shows blank white page

**How to diagnose:**
1. Open browser Console (F12)
2. Look for errors

**Common causes:**

**Environment variables missing:**
```
Error: Firebase config is undefined
```
→ Check your .env.production file exists

**Wrong base path:**
```
Error: Failed to fetch dynamically imported module
```
→ Check vite.config.ts has correct base path

**Firebase config wrong:**
```
Error: Firebase App not initialized
```
→ Check Firebase config values match your project

**Build errors ignored:**
- Go back and check if `npm run build` had warnings
- Fix all TypeScript errors

**Ask AI:** "My app shows a white screen after deploying. The console shows: [paste error]"

### Issue 3: Old version showing

**Symptoms:** Deployed new version but seeing old code

**Fix:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Try incognito mode
3. Check Firebase Console → Hosting to see if new version deployed
4. Wait a few minutes for CDN to update

### Issue 4: Firestore permission denied

**Symptoms:**
```
Error: Missing or insufficient permissions
```

**Fix:**
Make sure security rules are deployed:
```bash
firebase deploy --only firestore:rules
```

Check rules in Firebase Console:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Issue 5: Build succeeds but deploy fails

**Symptoms:**
```
Error: HTTP Error: 403, Permission denied
```

**Fix:**
1. Check you're logged into correct Google account:
   ```bash
   firebase logout
   firebase login
   ```
2. Check you have deploy permissions for the project
3. Check project ID is correct:
   ```bash
   firebase use --add
   ```

### Issue 6: Assets not loading (404 for CSS/JS)

**Symptoms:** Page loads but no styling, broken layout

**Fix:**
Check `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // Should be '/' for Firebase Hosting
  // ...
})
```

Rebuild and redeploy:
```bash
npm run build
firebase deploy --only hosting
```

## Rollback (If Deployment Breaks Production)

**Oh no, the site is broken!** Don't panic. You can rollback.

### Quick Rollback via Firebase Console

1. Go to Firebase Console → Hosting
2. Click "Release history"
3. Find the last working version
4. Click "⋮" menu → "Rollback"
5. Confirm

Your site reverts to the previous version in seconds.

### Rollback via CLI

```bash
# List previous deployments
firebase hosting:channel:list

# Or just redeploy previous working code
git checkout <previous-commit>
npm run build
firebase deploy --only hosting
git checkout main
```

**Then:** Fix the issue locally, test thoroughly, and redeploy.

## Monitoring Your Deployed App

### Check for Errors

After deploying, monitor for issues:

1. **Firebase Console → Hosting:** Check deployment status
2. **Firebase Console → Firestore:** Watch for unusual activity
3. **Firebase Console → Authentication:** Check sign-ups
4. **Browser Console:** Visit site and check for errors

### Usage Monitoring

Firebase provides basic analytics:

1. Go to Firebase Console
2. Click "Analytics" (if enabled)
3. Or check Hosting → Usage tab

You can see:
- Number of requests
- Data transferred
- Geographic distribution

**Ask AI:** "What metrics should I monitor for a newly deployed web app?"

## Updating Your Site

Made changes? Deploy again:

```bash
# 1. Test locally first
npm run dev
# ... test everything ...

# 2. Build
npm run build

# 3. Preview (optional but recommended)
npm run preview
# ... test the production build ...

# 4. Deploy
firebase deploy --only hosting
```

**Pro tip:** Deploy only what changed:
- `--only hosting` for frontend changes
- `--only firestore:rules` for security rules
- `--only functions` if using Cloud Functions

Your site updates in 10-30 seconds.

## Deployment Checklist

Before deploying:
- [ ] All tests pass locally
- [ ] No console errors in dev mode
- [ ] `npm run build` succeeds
- [ ] `npm run preview` shows working app
- [ ] Git committed all changes
- [ ] .env.production has correct values

After deploying:
- [ ] Visit live URL
- [ ] Test in incognito mode
- [ ] Test all user flows
- [ ] Check console for errors
- [ ] Test on mobile device
- [ ] Verify Firestore data isolated by user
- [ ] Check Firebase Console for errors

## Custom Domain (Optional)

Want your own domain like `myapp.com`?

**Ask AI:** "How do I add a custom domain to my Firebase Hosted app?"

1. Buy a domain (Namecheap, Google Domains, etc.)
2. Firebase Console → Hosting
3. Click "Add custom domain"
4. Enter your domain
5. Follow verification steps
6. Update DNS records (Firebase provides exact values)
7. Wait for SSL certificate (15 min - 24 hours)

This is optional and can be done anytime.

## Sharing Your App

Now you can:
- ✅ Send the URL to friends and family
- ✅ Add it to your portfolio site
- ✅ Put it on your resume
- ✅ Share on LinkedIn
- ✅ Include in job applications

**You built a real, deployed web application!**

### What to Share

**Good LinkedIn post:**
> Just deployed my first web app! 🚀
>
> Built a personal notes app with:
> • React + TypeScript
> • Firebase Authentication
> • Cloud Firestore database
> • Deployed on Firebase Hosting
>
> Try it: https://your-project.web.app
> Code: https://github.com/you/project
>
> Learned a ton about modern web development!

## Check Your Understanding

- [ ] `npm run build` creates production files
- [ ] `firebase deploy` puts them on the internet
- [ ] The site has a public URL anyone can visit
- [ ] I can update by building and deploying again
- [ ] I can rollback if deployment breaks
- [ ] I know how to monitor for errors
- [ ] Environment variables are configured correctly
- [ ] I can fix common deployment issues

## Next Up

Create a demo checklist to show off your work!

[Continue: Demo Checklist →](./03-demo-checklist)
