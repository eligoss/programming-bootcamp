# How the Web Works

> **Time**: ~8 minutes | **Difficulty**: Beginner

## What You'll Learn

- Client/server model and where your code runs
- Frontend vs backend responsibilities
- Our tech stack overview

## The Journey of a Web Page

When you type a URL and press Enter:

1. **Browser finds the server** — DNS lookup for the IP address
2. **Browser requests the page** — HTTP GET request
3. **Server responds** — Sends HTML, CSS, JavaScript
4. **Browser renders** — Draws the page on screen

```
┌──────────────┐                      ┌──────────────┐
│              │   1. Request page    │              │
│   Browser    │ ──────────────────▶  │    Server    │
│  (Frontend)  │                      │   (Backend)  │
│              │   2. Send files      │              │
│              │ ◀──────────────────  │              │
└──────────────┘                      └──────────────┘
       │                                     │
       │                                     │
   Where your                           Where data
   UI code runs                         is stored
```

## Frontend vs Backend

| Aspect | Frontend | Backend |
|--------|----------|---------|
| **Where it runs** | User's browser | Remote server |
| **Who sees the code** | Anyone (inspect element) | Only developers |
| **What it does** | Shows UI, handles clicks | Stores data, runs logic |
| **Languages** | HTML, CSS, JavaScript | Many options |
| **Examples** | Buttons, forms, animations | Database, authentication |

### Restaurant Analogy

- **Frontend** = The dining room (what customers see)
- **Backend** = The kitchen (where food is prepared)
- **Database** = The pantry (where ingredients are stored)
- **API** = The waiter (carries requests back and forth)

## Our Stack

| Layer | Technology | Role |
|-------|------------|------|
| **Frontend** | React (JavaScript) | The UI users interact with |
| **Backend** | Firebase | Handles authentication and database |
| **Database** | Firestore | Stores user data |
| **Hosting** | Firebase Hosting | Serves files to browsers |

Firebase combines backend and database into one service — less to set up.

## The Three Languages of the Web

### HTML — Structure
```html
<button>Click me</button>
```

### CSS — Style
```css
button { color: blue; padding: 10px; }
```

### JavaScript — Behavior
```javascript
button.addEventListener('click', () => {
  alert('You clicked!');
});
```

React (which we'll use) writes HTML inside JavaScript, making it easier to build interactive UIs.

---

[Continue: Your Development Tools →](./03-your-development-tools)
