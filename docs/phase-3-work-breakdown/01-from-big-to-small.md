# From Big to Small

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- How to break large work into manageable pieces
- The hierarchy: Epics → Stories → Tasks
- Why small beats big

## The Big Idea

"Build an app" is overwhelming.
"Add email field to form" is doable.

The skill of breaking big things into small things is what separates paralyzed beginners from productive developers.

## The Hierarchy

```
Epic (Big Goal)
├── Story (User Action)
│   ├── Task (Small Step)
│   ├── Task
│   └── Task
├── Story
│   ├── Task
│   └── Task
└── Story
    └── Task
```

### Epic
A major feature or milestone.
**Example:** "User Authentication"

### Story
Something a user can do (from Phase 2).
**Example:** "User can register with email"

### Task
A single development action.
**Example:** "Create registration form component"

## Our Project Breakdown

### Epic: Authentication

```
Epic: Authentication
├── Story: User can register
│   ├── Task: Create registration page route
│   ├── Task: Create RegistrationForm component
│   ├── Task: Add email and password inputs
│   ├── Task: Add form validation
│   ├── Task: Connect to Firebase Auth
│   └── Task: Handle success/error
├── Story: User can login
│   ├── Task: Create login page route
│   ├── Task: Create LoginForm component
│   ├── Task: Connect to Firebase Auth
│   └── Task: Redirect on success
└── Story: User can logout
    ├── Task: Add logout button to header
    └── Task: Implement logout function
```

### Epic: Notes Feature (Example)

```
Epic: Notes Feature
├── Story: User can create notes
│   ├── Task: Create notes collection in Firestore
│   ├── Task: Create NewNoteForm component
│   ├── Task: Add save function
│   └── Task: Navigate to list after save
├── Story: User can view notes
│   ├── Task: Create NotesListPage component
│   ├── Task: Fetch notes from Firestore
│   ├── Task: Create NoteCard component
│   └── Task: Display empty state
├── Story: User can edit notes
│   ├── Task: Create EditNotePage with form
│   ├── Task: Load existing note data
│   └── Task: Update note in Firestore
└── Story: User can delete notes
    ├── Task: Add delete button to NoteCard
    ├── Task: Add confirmation dialog
    └── Task: Delete from Firestore
```

## Why Small Tasks?

### 1. Progress is Visible

```
Big task: "Build authentication" — stuck for hours

Small tasks:
✅ Create page route
✅ Create form component
✅ Add email field
⬜ Add password field     ← I'm here!
⬜ Add validation
⬜ Connect to Firebase
```

You can see you're making progress.

### 2. Easier to Debug

Big task fails: Where's the problem?
Small task fails: The problem is in this small thing.

### 3. Natural Commit Points

Each task = one commit opportunity.

### 4. AI Works Better

```
❌ "Build the authentication system"
✅ "Create a form with email and password inputs"
```

Small, specific prompts get better results.

## The Ideal Task Size

A good task:
- Takes 5-20 minutes
- Has a clear "done" state
- Results in runnable code
- Is worth a commit message

### Too Big
"Implement user registration with validation and Firebase connection"

### Just Right
"Create registration form with email and password inputs"

### Too Small
"Add the letter 'a' to the email label"

## Practice: Breaking Down

Let's practice with "User can create notes":

**Too vague:**
- "Build note creation"

**Better:**
1. Create /notes/new route
2. Create NewNoteForm component
3. Add title input field
4. Add content textarea
5. Add Save button
6. Write saveNote function
7. Connect form to saveNote
8. Navigate to notes list after save

Each of these can be done, tested, and committed.

## Check Your Understanding

- [ ] Epics contain Stories contain Tasks
- [ ] Small tasks are easier to complete
- [ ] Each task should be completable in ~15 minutes
- [ ] AI works better with specific, small requests

## Next Up

Now let's learn what makes a task truly "good."

[Continue: What Makes a Good Task →](./02-what-makes-a-good-task)
