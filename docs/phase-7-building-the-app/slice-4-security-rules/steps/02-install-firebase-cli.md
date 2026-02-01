# Step 2: Install Firebase CLI

> **Time**: ~5 minutes | **Type**: Setup | **Concepts**: Firebase CLI, Command-line tools

## What We're Building

Installing the Firebase command-line interface (CLI) so you can manage Firestore rules, deploy your app, and work with Firebase from your terminal.

## What is Firebase CLI?

The **Firebase CLI** is a command-line tool that lets you:
- Deploy security rules
- Deploy your app to Firebase Hosting
- Manage Firebase projects
- Test functions locally
- View logs and debug

Think of it as the "developer toolkit" for Firebase.

## Part 1: Install Firebase CLI

### Install Globally with npm

```bash
npm install -g firebase-tools
```

**What this does:**
- Downloads Firebase CLI
- Installs it globally (available in any terminal)
- Adds `firebase` command to your system

**Wait time:** 1-2 minutes

### Verify Installation

Check that Firebase CLI installed correctly:

```bash
firebase --version
```

**Expected output:**
```
13.0.0
```

(Version number may differ, any 12.x or 13.x is fine)

**If you see version number:** ✅ Installation successful!

**If you see "command not found":** See Common Issues below.

## Part 2: Login to Firebase

Now let's connect the CLI to your Firebase account:

```bash
firebase login
```

**What happens:**
1. Opens browser window
2. Shows Google login page
3. Asks for permission to manage Firebase projects
4. Shows success message

**In browser:**
- Choose the Google account you used for Firebase
- Click "Allow" when asked for permissions
- See "Success! You're logged in"

**In terminal:**
```
✔ Success! Logged in as your-email@gmail.com
```

**If login succeeds:** ✅ You're authenticated!

## Part 3: Verify Access to Your Project

List your Firebase projects:

```bash
firebase projects:list
```

**Expected output:**
```
┌──────────────────────┬─────────────────┬──────────────────────┐
│ Project Display Name │ Project ID      │ Project Number       │
├──────────────────────┼─────────────────┼──────────────────────┤
│ My Bootcamp App      │ bootcamp-app-123│ 123456789012         │
└──────────────────────┴─────────────────┴──────────────────────┘
```

**Check:**
- [ ] Your project appears in the list
- [ ] Project ID matches what you see in Firebase Console

**If you see your project:** ✅ CLI has access to your Firebase project!

## Common Issues

### "firebase: command not found"

**Problem:** npm global bin directory not in PATH.

**Fix (macOS/Linux):**
```bash
# Find where npm installs global packages
npm config get prefix
# Output: /usr/local (or similar)

# Add to PATH (add this line to ~/.bashrc or ~/.zshrc)
export PATH="/usr/local/bin:$PATH"

# Reload shell
source ~/.bashrc  # or source ~/.zshrc

# Try again
firebase --version
```

**Fix (Windows):**
```bash
# Run as Administrator
npm install -g firebase-tools

# If still doesn't work, add to PATH manually:
# 1. Search "Environment Variables" in Windows
# 2. Edit "Path" variable
# 3. Add: C:\Users\YourName\AppData\Roaming\npm
# 4. Restart terminal
```

**Alternative:** Use npx instead:
```bash
npx firebase --version
npx firebase login
```

### "Permission denied" during install (macOS/Linux)

**Problem:** No permission to write to global npm directory.

**Fix:**
```bash
# Use sudo (not recommended but works)
sudo npm install -g firebase-tools

# Or fix npm permissions (better):
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g firebase-tools
```

### "Login failed" or browser doesn't open

**Problem:** Firewall blocking or headless environment.

**Fix:**
```bash
# Use --no-localhost flag
firebase login --no-localhost
```

Follow the instructions to copy/paste the auth code.

### "No projects found"

**Problem:** Logged in with wrong account or project doesn't exist.

**Fix:**
1. Check Firebase Console — is your project there?
2. Log out and log in again:
   ```bash
   firebase logout
   firebase login
   ```
3. Choose the correct Google account

### Still having issues?

**Ask AI:**
```
I'm getting this error when trying to install Firebase CLI:
[paste your error message]

What should I do?
```

## Understanding What You Did

> **💡 Ask yourself (or ask AI):**
>
> 1. **What does the Firebase CLI let you do?** (Deploy rules, host apps, manage projects)
> 2. **Why did we install it globally?** (So `firebase` command works in any directory)
> 3. **What does `firebase login` do?** (Authenticates CLI with your Google account)
> 4. **Can I use Firebase without the CLI?** (Yes, via Firebase Console, but CLI is more powerful)

## What You Learned

At this point you should have:
- ✅ Firebase CLI installed globally
- ✅ Successfully logged in to Firebase
- ✅ Verified access to your Firebase project
- ✅ `firebase` command working in terminal

## Next Step

Firebase CLI is ready! Now let's initialize Firebase in your project directory so we can create security rules:

[Step 3: Initialize Firebase Project →](./03-initialize-firebase-project)
