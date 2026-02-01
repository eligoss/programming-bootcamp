# AI Safety Rules

> **Time**: ~3 minutes | **Difficulty**: Beginner

## What You'll Learn

- What to NEVER share with AI
- Security practices for AI-assisted development
- How to keep your credentials safe

## The Big Idea

AI is helpful, but it's not private in the way you might expect. Anything you paste could potentially be seen by others. Treat AI conversations like public forums for security purposes.

## The Cardinal Rules

### 🚫 Rule 1: NEVER Share Passwords

Not even test passwords. Not even "temporary" ones.

```
// ❌ Never do this
const password = "myActualPassword123";

// ✅ Do this instead
const password = process.env.DB_PASSWORD;
```

### 🚫 Rule 2: NEVER Share API Keys

API keys are like passwords for services.

```
// ❌ Never share this
const apiKey = "sk-ant-api03-abc123xyz...";

// ✅ Use environment variables
const apiKey = process.env.API_KEY;
```

### 🚫 Rule 3: NEVER Share Private Keys or Tokens

This includes:
- Firebase admin credentials
- SSH keys
- JWT secrets
- OAuth tokens

### 🚫 Rule 4: NEVER Share Personal Data

Don't paste real:
- Social Security numbers
- Credit card numbers
- Real user data from databases
- Personal addresses or phone numbers

## Safe Practices

### Use Placeholder Values

When sharing code, replace real values:

```typescript
// Original (don't share)
const config = {
  apiKey: "AIzaSyC1234567890abcdefg",
  authDomain: "myapp.firebaseapp.com",
}

// Safe version (share this)
const config = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
}
```

### Environment Variables

Store secrets in `.env` files:

```bash
# .env file (never commit this)
FIREBASE_API_KEY=your-actual-key-here
```

```typescript
// In your code
const apiKey = process.env.FIREBASE_API_KEY;
```

### Check Before Sharing

Before pasting code to AI:
1. Scan for strings that look like credentials
2. Look for words like "password", "secret", "key", "token"
3. Replace with placeholders if found

## What If You Accidentally Share Something?

### Immediately:
1. **Rotate the credential** — Generate a new key/password
2. **Revoke the old one** — In the service's dashboard
3. **Update your code** with the new credential

### If it's a password:
1. Change the password immediately
2. Check for any unauthorized access
3. Change it anywhere else you used the same password

## The .gitignore File

Never commit secret files. Your `.gitignore` should include:

```
# Environment files
.env
.env.local
.env.*.local

# Firebase private keys
*-firebase-adminsdk-*.json

# Other secrets
secrets/
*.pem
*.key
```

## Red Flags to Watch For

When AI generates code, watch for:

### Hardcoded Secrets
```typescript
// 🚩 Red flag!
const password = "hardcodedPassword";
```

### Credentials in URLs
```typescript
// 🚩 Red flag!
const url = "https://api.service.com?api_key=12345";
```

### Logging Sensitive Data
```typescript
// 🚩 Red flag!
console.log("User logged in:", email, password);
```

## Quick Reference

| Type | Safe to Share | Not Safe |
|------|---------------|----------|
| Code | ✅ Logic, components | ❌ With hardcoded secrets |
| Errors | ✅ Error messages | ❌ That contain credentials |
| Config | ✅ Structure | ❌ Actual values |
| Data | ✅ Sample/fake data | ❌ Real user data |

## Check Your Understanding

- [ ] I will never share real passwords or API keys
- [ ] I'll use environment variables for secrets
- [ ] I'll scan code before sharing
- [ ] I know what to do if I accidentally share something
- [ ] I'll use .gitignore to protect secret files

## Next Up

Finally, let's learn what to do when AI can't help.

[Continue: When AI Gets Stuck →](./07-when-ai-gets-stuck)
