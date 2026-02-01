# Deployment Walkthrough

> **Time**: ~10 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to build for production
- How to deploy to Firebase Hosting
- How to verify the deployment

## The Big Idea

Deployment takes your local code and puts it on the internet where anyone can use it.

```
Your Computer        Internet
┌──────────┐        ┌──────────┐
│ npm run  │        │ Firebase │
│   dev    │  ───►  │ Hosting  │
│          │        │          │
│ Local    │        │ Public   │
│ only     │        │ URL      │
└──────────┘        └──────────┘
```

## Prerequisites

Make sure you have:
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Logged in (`firebase login`)
- [ ] Firebase initialized in project
- [ ] firebase.json exists

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

### If Build Fails

Common issues:

**TypeScript errors:**
```bash
# Check for type errors
npm run type-check
# Or
npx tsc --noEmit
```

**ESLint errors:**
```bash
# Check for lint errors
npm run lint
# Auto-fix what's possible
npm run lint:fix
```

## Step 3: Preview the Build (Optional)

Test the production build locally:

```bash
npm run preview
```

This serves the built files. Check that everything still works.

## Step 4: Deploy to Firebase

If you haven't initialized hosting:

```bash
firebase init hosting
```

When asked:
- Public directory: `dist`
- Single-page app: `Yes`
- Overwrite index.html: `No`

Then deploy:

```bash
firebase deploy
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

## Step 5: Verify Deployment

Visit your Hosting URL (shown after deploy).

Test everything:
- [ ] Site loads
- [ ] Can register/login
- [ ] CRUD works
- [ ] Data persists

## Your Live URLs

Firebase gives you two URLs:
- `https://your-project.web.app`
- `https://your-project.firebaseapp.com`

Both work identically.

## Common Deployment Issues

### "Page not found" on refresh

Your firebase.json needs rewrites:

```json
{
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

### White screen after deploy

Check browser console for errors. Common causes:
- Environment variables not set
- Firebase config issues
- Build errors

### Old version showing

Clear browser cache or use incognito mode.

### Firestore permission denied

Make sure security rules are deployed:
```bash
firebase deploy --only firestore:rules
```

## Updating Your Site

Made changes? Deploy again:

```bash
npm run build
firebase deploy
```

It's that simple. Your site updates in seconds.

## Custom Domain (Optional)

Want your own domain?

1. Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Update DNS records

This is optional and can be done later.

## Sharing Your App

Now you can:
- Send the URL to friends
- Add it to your portfolio
- Put it on your resume

You built a real, deployed web application!

## Check Your Understanding

- [ ] `npm run build` creates production files
- [ ] `firebase deploy` puts them on the internet
- [ ] The site has a public URL
- [ ] I can update by running deploy again

## Next Up

Create a demo checklist to show off your work!

[Continue: Demo Checklist →](./03-demo-checklist)
