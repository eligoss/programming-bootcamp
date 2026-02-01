# Slice 1 Goals

> **Time**: ~15 minutes | **Outcome**: Navigable app skeleton

## What "Done" Looks Like

When this slice is complete:

1. **App loads** at localhost:5173 without errors
2. **Four pages exist:** Home, Login, Register, Dashboard
3. **Navigation works:** Can click between pages
4. **URLs work:** Each page has its own route

## Acceptance Criteria

### App Loads
- [ ] No console errors on load
- [ ] Base styling applied
- [ ] Default route shows Home page

### Pages Exist
- [ ] `/` → Home page with welcome message
- [ ] `/login` → Login page with "Login" heading
- [ ] `/register` → Register page with "Register" heading
- [ ] `/dashboard` → Dashboard page with "Dashboard" heading

### Navigation Works
- [ ] Navigation visible on all pages
- [ ] Links change the URL
- [ ] Page content updates when navigating

## Technical Requirements

### File Structure After This Slice

```
src/
├── components/
│   └── Layout/
│       └── Navigation.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── App.tsx          # Routes defined here
└── main.tsx
```

### Routes Configuration

| Path | Component | Public? |
|------|-----------|---------|
| `/` | HomePage | Yes |
| `/login` | LoginPage | Yes |
| `/register` | RegisterPage | Yes |
| `/dashboard` | DashboardPage | Yes (for now) |

### Page Requirements

Each page needs:
- A heading indicating which page it is
- Placeholder content
- Same navigation component

## NOT in This Slice

- ❌ Actual login functionality
- ❌ Forms with inputs
- ❌ Database connections
- ❌ Protected routes
- ❌ Styling beyond basics

These come in later slices.

## Commit Message

When done:
```
Add app skeleton with routing and navigation
```

---

[View Prompts →](./prompts)
