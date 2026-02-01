# Backlog Worksheet

> **Time**: ~5 minutes | **Difficulty**: Beginner

::: tip Print This Page!
This is your task list for the bootcamp. Check off items as you complete them.
:::

---

## Your Initial Backlog

Order matters! Work from top to bottom.

### Phase 5 Tasks: Project Setup

- [ ] Create GitHub repository
- [ ] Clone repository to local machine
- [ ] Initialize React + TypeScript project with Vite
- [ ] Install and configure ESLint + Prettier
- [ ] Create Firebase project
- [ ] Add Firebase configuration to project
- [ ] Create CLAUDE.md file
- [ ] Make initial commit

---

### Slice 1: App Skeleton

- [ ] Create basic folder structure (pages, components)
- [ ] Set up React Router with basic routes
- [ ] Create placeholder Home page
- [ ] Create placeholder Login page
- [ ] Create placeholder Dashboard page
- [ ] Create Navigation component
- [ ] Verify navigation works
- [ ] Commit: "Add app skeleton with routing"

---

### Slice 2: Authentication

**Registration:**
- [ ] Create RegistrationPage component
- [ ] Create RegistrationForm with email/password inputs
- [ ] Add form validation (email format, password length)
- [ ] Connect to Firebase Auth createUserWithEmailAndPassword
- [ ] Handle success (redirect to dashboard)
- [ ] Handle error (show error message)
- [ ] Commit: "Add user registration"

**Login:**
- [ ] Create LoginPage component
- [ ] Create LoginForm with email/password inputs
- [ ] Connect to Firebase Auth signInWithEmailAndPassword
- [ ] Handle success (redirect to dashboard)
- [ ] Handle error (show error message)
- [ ] Add link to registration page
- [ ] Commit: "Add user login"

**Auth State:**
- [ ] Create AuthContext for app-wide auth state
- [ ] Create useAuth hook
- [ ] Create ProtectedRoute component
- [ ] Wrap protected pages with ProtectedRoute
- [ ] Commit: "Add auth state management"

**Logout:**
- [ ] Add logout button to navigation/header
- [ ] Implement logout function (Firebase signOut)
- [ ] Redirect to login page after logout
- [ ] Commit: "Add logout functionality"

---

### Slice 3: Your Feature

**My feature:** ________________ (Notes/Tasks/Posts/Bookmarks)

**Create:**
- [ ] Create [New Item] page route
- [ ] Create [New Item] form component
- [ ] Add input fields for my data type
- [ ] Add form validation
- [ ] Create save function (Firestore addDoc)
- [ ] Redirect to list page after save
- [ ] Commit: "Add create [feature]"

**Read/List:**
- [ ] Create [Items] list page
- [ ] Create query to fetch user's items
- [ ] Create [Item] card component
- [ ] Display items in a list/grid
- [ ] Handle empty state (no items yet)
- [ ] Commit: "Add [feature] list view"

**Update:**
- [ ] Create [Edit Item] page route
- [ ] Load existing item data into form
- [ ] Create update function (Firestore updateDoc)
- [ ] Redirect to list after update
- [ ] Commit: "Add edit [feature]"

**Delete:**
- [ ] Add delete button to item card
- [ ] Add confirmation dialog
- [ ] Create delete function (Firestore deleteDoc)
- [ ] Remove item from list after delete
- [ ] Commit: "Add delete [feature]"

---

### Slice 4: Security Rules

- [ ] Write Firestore security rules
- [ ] Test: logged-in user can CRUD their own data
- [ ] Test: can't access other users' data
- [ ] Test: can't access without being logged in
- [ ] Deploy security rules
- [ ] Commit: "Add Firestore security rules"

---

### Slice 5: Polish

- [ ] Add loading spinners during async operations
- [ ] Improve error message display
- [ ] Add success feedback (toasts or messages)
- [ ] Review and improve UI styling
- [ ] Test all user flows end-to-end
- [ ] Commit: "Add polish and loading states"

---

### Phase 8: Deploy

- [ ] Run production build (npm run build)
- [ ] Verify build has no errors
- [ ] Configure Firebase Hosting
- [ ] Deploy to Firebase (firebase deploy)
- [ ] Test live URL
- [ ] Commit: "Deploy to production"

---

## Progress Tracker

| Section | Tasks | Completed |
|---------|-------|-----------|
| Project Setup | 8 | __ / 8 |
| Slice 1: Skeleton | 8 | __ / 8 |
| Slice 2: Authentication | 16 | __ / 16 |
| Slice 3: Feature | 14 | __ / 14 |
| Slice 4: Security | 6 | __ / 6 |
| Slice 5: Polish | 6 | __ / 6 |
| Deploy | 6 | __ / 6 |
| **Total** | **64** | **__ / 64** |

---

## Notes

Any blockers, questions, or observations:

> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________

---

**Last updated:** ________________

---

[Continue to Phase 4: Choosing Your Stack →](../../phase-4-choosing-your-stack/)
