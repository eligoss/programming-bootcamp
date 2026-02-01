# Backend Landscape

> **Time**: ~4 minutes | **Difficulty**: Beginner

## What You'll Learn

- What backends do
- Options for backend services
- Why Firebase fits our needs

## The Big Idea

The backend handles things you can't do in the browser:
- **Authentication:** Verifying who users are
- **Database:** Storing and retrieving data
- **Security:** Protecting data from unauthorized access
- **Business logic:** Complex operations on data

## Two Approaches

### Approach 1: Build Your Own Backend

Create a server using Node.js, Python, etc.

```javascript
// Example: Express.js server
app.post('/api/notes', (req, res) => {
  const note = req.body;
  database.save(note);
  res.json({ success: true });
});
```

**What you need to set up:**
- Server (Node.js, Python, Go, etc.)
- Database (PostgreSQL, MongoDB, etc.)
- Authentication (JWT, sessions, etc.)
- Hosting (AWS, DigitalOcean, etc.)

**Pros:**
- Full control
- No vendor lock-in
- Can do anything

**Cons:**
- Lots of setup
- Security is your responsibility
- Need to maintain servers
- Takes much longer

**Time estimate:** 4-5 hours just for setup, before features

### Approach 2: Use a Backend-as-a-Service (BaaS)

Let a service handle the infrastructure.

```javascript
// Example: Firebase
import { collection, addDoc } from 'firebase/firestore';

await addDoc(collection(db, 'notes'), {
  title: 'My Note',
  content: 'Note content',
  userId: user.uid
});
```

**Popular options:**
- **Firebase** (Google)
- **Supabase** (Open source Firebase alternative)
- **AWS Amplify** (Amazon)

**Pros:**
- Auth, database, hosting included
- Fast setup
- Handles security basics
- Generous free tiers

**Cons:**
- Vendor lock-in
- Less flexibility
- Can get expensive at scale

**Time estimate:** 30 minutes to have auth + database working

## Firebase Deep Dive

Firebase is Google's development platform. It provides:

### Firebase Authentication
- Email/password login
- Social logins (Google, Facebook, etc.)
- Handles password hashing, security
- Free for most use cases

### Cloud Firestore
- NoSQL document database
- Real-time updates
- Security rules built-in
- Works directly from frontend

### Firebase Hosting
- Static site hosting
- CDN (fast globally)
- Free SSL certificates
- One-command deploys

### The Integration

```
┌─────────────────────────────────────────────────────┐
│                     Firebase                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │    Auth     │  │  Firestore  │  │   Hosting   │ │
│  │             │  │             │  │             │ │
│  │ • Sign up   │  │ • Database  │  │ • Deploy    │ │
│  │ • Log in    │  │ • Queries   │  │ • CDN       │ │
│  │ • Sessions  │  │ • Real-time │  │ • SSL       │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
                        │
                        │ One SDK, one project
                        │
                        ▼
              ┌─────────────────────┐
              │    Your React App   │
              └─────────────────────┘
```

## Firebase vs Custom: Comparison

| Factor | Firebase | Custom Backend |
|--------|----------|----------------|
| **Setup time** | 30 minutes | 4+ hours |
| **Auth complexity** | Handled | Build yourself |
| **Security** | Rules built-in | Your responsibility |
| **Scalability** | Automatic | You manage |
| **Cost at scale** | Can be high | More control |
| **Flexibility** | Some limits | Unlimited |
| **Learning curve** | Moderate | Steep |

## Why Firebase for This Bootcamp

| Requirement | Firebase Fit |
|-------------|--------------|
| **Limited time** | ✅ Fast setup |
| **Need auth** | ✅ Built-in |
| **Need database** | ✅ Firestore |
| **Need hosting** | ✅ Firebase Hosting |
| **Free tier** | ✅ Generous limits |
| **Good docs** | ✅ Excellent |

Firebase lets us focus on building features instead of infrastructure.

## Check Your Understanding

- [ ] Backend handles auth, data, and security
- [ ] Building your own gives control but takes time
- [ ] BaaS like Firebase provides ready-made solutions
- [ ] Firebase fits our time and complexity constraints

## Next Up

Let's understand why we use TypeScript.

[Continue: TypeScript Explained →](./04-typescript-explained)
