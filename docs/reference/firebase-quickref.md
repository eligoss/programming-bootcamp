# Firebase Quick Reference

> Essential Firebase operations for web apps

## Setup

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Authentication

### Sign Up

```typescript
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
```

### Sign In

```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';

const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
```

### Sign Out

```typescript
import { signOut } from 'firebase/auth';

const logOut = async () => {
  await signOut(auth);
};
```

### Auth State Listener

```typescript
import { onAuthStateChanged } from 'firebase/auth';

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
```

### Current User

```typescript
import { auth } from './firebase';

const user = auth.currentUser;
const userId = user?.uid;
const email = user?.email;
```

## Firestore

### Add Document

```typescript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const addNote = async (title: string, content: string) => {
  const docRef = await addDoc(collection(db, 'notes'), {
    title,
    content,
    userId: auth.currentUser?.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};
```

### Get All Documents

```typescript
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const getNotes = async (userId: string) => {
  const q = query(
    collection(db, 'notes'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

### Get Single Document

```typescript
import { doc, getDoc } from 'firebase/firestore';

const getNote = async (noteId: string) => {
  const docRef = doc(db, 'notes', noteId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};
```

### Update Document

```typescript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const updateNote = async (noteId: string, title: string, content: string) => {
  const docRef = doc(db, 'notes', noteId);
  await updateDoc(docRef, {
    title,
    content,
    updatedAt: serverTimestamp(),
  });
};
```

### Delete Document

```typescript
import { doc, deleteDoc } from 'firebase/firestore';

const deleteNote = async (noteId: string) => {
  await deleteDoc(doc(db, 'notes', noteId));
};
```

### Real-time Listener

```typescript
import { collection, query, where, onSnapshot } from 'firebase/firestore';

useEffect(() => {
  const q = query(
    collection(db, 'notes'),
    where('userId', '==', userId)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes(notes);
  });

  return () => unsubscribe();
}, [userId]);
```

## Security Rules

### Basic User Isolation

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Common Errors

| Error | Meaning | Fix |
|-------|---------|-----|
| `auth/user-not-found` | No account with this email | Check email or register |
| `auth/wrong-password` | Password incorrect | Check password |
| `auth/email-already-in-use` | Email registered | Login instead |
| `auth/weak-password` | Password too short | Use 6+ characters |
| `permission-denied` | Security rules blocked | Check rules + userId |

## Firebase CLI

```bash
# Install
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init

# Deploy
firebase deploy

# Deploy specific
firebase deploy --only hosting
firebase deploy --only firestore:rules

# Emulators
firebase emulators:start
```

## Hosting

```json
// firebase.json
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

---

*Keep this handy for Firebase operations!*
