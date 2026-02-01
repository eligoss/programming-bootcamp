# Slice 4: Security Rules

> **Time**: ~53 minutes | **Goal**: Server-side security for Firestore database

## What We're Building

The security layer of your app:
- Firestore security rules (server-side validation)
- Authentication requirements for all operations
- User data isolation (each user can only access their own data)
- Field validation (required fields, types, lengths)
- Immutability rules (userId and createdAt can't be changed)
- Testing and deployment of rules

**Critical:** Without security rules, anyone can access, modify, or delete ALL your users' data. This is NOT optional.

## By the End

You'll have:
- [ ] Firebase CLI installed and configured
- [ ] Firebase initialized in your project
- [ ] Security rules written and validated
- [ ] Rules deployed to production
- [ ] Authentication required for all operations
- [ ] User data isolation enforced
- [ ] Invalid data rejected automatically
- [ ] Immutable fields protected
- [ ] App tested with rules enabled
- [ ] Deep understanding of security

## Prerequisites

Before starting:
- [ ] Slice 3 complete (CRUD operations work)
- [ ] Can create, read, update, delete todos
- [ ] Firebase project exists
- [ ] Firestore database enabled

## Learning Approach

This slice breaks security rules into **8 interactive steps**. Each step:
1. **Explains security concepts first** — Understand why rules matter
2. **Prompts you to ask AI questions** — Active learning about security
3. **Builds one part** — Never more than 10 minutes per step
4. **Verifies it works** — Test immediately with real scenarios
5. **Ensures understanding** — Can explain what you built

**Security emphasis:** This slice repeatedly emphasizes the consequences of missing or wrong rules. Take this seriously — security bugs mean data breaches, privacy violations, and legal liability.

## Contents

1. **[Core Concepts](./concepts)** — Understanding security rules, client vs server validation, request vs resource, rule syntax
2. **Step-by-Step Guide:**
   - [Step 1: Understanding Security](./steps/01-understanding-security) — Learn why client-side validation isn't enough
   - [Step 2: Install Firebase CLI](./steps/02-install-firebase-cli) — Install and login to Firebase CLI
   - [Step 3: Initialize Firebase Project](./steps/03-initialize-firebase-project) — Run firebase init and create config files
   - [Step 4: Understanding Rules Syntax](./steps/04-understanding-rules-syntax) — Learn match, allow, if, request, resource
   - [Step 5: Create Security Rules](./steps/05-create-security-rules) — Write comprehensive rules for todos
   - [Step 6: Create Firebase Config](./steps/06-create-firebase-config) — Verify firebase.json configuration
   - [Step 7: Test & Deploy Rules](./steps/07-test-deploy-rules) — Test in Playground, deploy, verify app works
   - [Step 8: Verification & Commit](./steps/08-verification-commit) — Comprehensive security testing and Git commit
3. **[Verification Checklist](./verification)** — Final comprehensive checklist before moving to Slice 5

## How to Use This Slice

### Start Here

If this is your first time working with security rules, **start with the concepts**:

[Read Core Concepts First →](./concepts)

### Then Follow the Steps

Work through each step **in order**. Don't skip steps — security requires understanding every layer:

[Begin Step 1: Understanding Security →](./steps/01-understanding-security)

### Use Active Learning

At each step:
- ✅ Read the "Ask AI" prompts and actually ask them
- ✅ Wait for AI to explain before writing code
- ✅ Ask follow-up questions if anything is unclear
- ✅ Test each rule immediately after deploying
- ✅ Verify security works (can't access others' data)

### Don't Just Copy

The goal is **understanding**, not speed. You should be able to explain:
- Why client-side validation isn't enough
- How server-side rules protect your data
- What request vs resource means
- Why userId must be validated
- What happens when rules deny a request

### Test Security Thoroughly

**CRITICAL:** After deploying rules, test these scenarios:
1. ✅ Can access your own data
2. ❌ Can't access others' data
3. ❌ Can't create invalid data (empty title)
4. ❌ Can't change userId or createdAt
5. ❌ Can't access data when logged out

If ANY of these fail, fix the rules before moving on.

### Final Check

Before moving to Slice 5:

[Complete Verification Checklist →](./verification)

---

## Quick Navigation

**First time here?** → [Core Concepts](./concepts)

**Ready to build?** → [Step 1: Understanding Security](./steps/01-understanding-security)

**Finished building?** → [Verification Checklist](./verification)

---

## Why This Slice Matters

Security rules are the difference between:
- A hobby project vs production-ready app
- Safe user data vs data breach headlines
- Sleep vs 3am panicked debugging
- Legal compliance vs lawsuits

**Real-world impact:**

Apps without proper security rules have:
- Leaked millions of user records
- Faced GDPR fines (up to 4% of revenue)
- Been forced to shut down
- Lost user trust permanently

**Don't skip this slice. Security is NOT optional.**

---

## Time Breakdown

| Step | Time | Type | What You Build |
|------|------|------|----------------|
| 1 | 5 min | Learning | Understand security vulnerabilities |
| 2 | 5 min | Setup | Install Firebase CLI |
| 3 | 5 min | Setup | Initialize Firebase project |
| 4 | 5 min | Learning | Understand rules syntax |
| 5 | 10 min | Coding | Write security rules |
| 6 | 5 min | Config | Verify firebase.json |
| 7 | 10 min | Testing | Test in Playground, deploy |
| 8 | 8 min | Testing | Comprehensive verification |

**Total: ~53 minutes**

---

## What You'll Learn

**Security concepts:**
- Why client-side validation is not security
- How attackers bypass your React code
- Server-side vs client-side validation
- Principle of least privilege
- Attack scenarios and prevention

**Firestore rules:**
- Rules syntax (match, allow, if)
- request vs resource objects
- Helper functions for DRY rules
- Authentication checks
- Ownership validation
- Data type validation
- Immutability enforcement

**Firebase CLI:**
- Installing and configuring
- Project initialization
- Rules deployment
- Syntax validation
- Testing with dry-run

**Security testing:**
- Rules Playground
- Testing authentication requirements
- Testing user isolation
- Testing data validation
- Browser console security testing

---

## Common Mistakes to Avoid

**❌ Skipping security rules**
- "I'll add them later" → Never happens, data gets leaked

**❌ Trusting client-side validation**
- Users control the browser, can bypass anything

**❌ Not testing with multiple users**
- Single user testing misses isolation bugs

**❌ Allowing `if true` in production**
- Opens ALL data to EVERYONE

**❌ Not testing invalid data**
- Validation rules might not work as expected

**❌ Deploying without testing**
- Can break production app, lock out users

**✅ DO:**
- Test rules in Playground first
- Test with multiple user accounts
- Try to bypass your own rules
- Read Firebase Console rule logs
- Ask AI to review your rules

---

## Emergency Rollback

If you deploy rules and your app breaks:

```bash
# Quick fix: Allow authenticated reads/writes (temporary!)
# Go to Firebase Console → Firestore → Rules
# Replace with:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null;
    }
  }
}

# Click "Publish"
# Your app should work again
# Then fix the real rules and redeploy
```

**Note:** This is a temporary fix. Proper rules validate userId and data.

---

## Next Slice Preview

After security rules are deployed, you'll move to Slice 5: Polish, where you'll add:
- Better error handling
- Improved loading states
- Responsive design
- Accessibility features
- Performance optimizations

But first, make sure your security is bulletproof!

[Start with Core Concepts →](./concepts)
