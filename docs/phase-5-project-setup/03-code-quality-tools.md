# Code Quality Tools

> **Time**: ~5 minutes | **Difficulty**: Beginner

## What You'll Learn

- What ESLint and Prettier do
- How to set them up
- Why they make your life easier

## The Big Idea

Code quality tools automatically:
- **ESLint:** Finds bugs and bad patterns
- **Prettier:** Formats code consistently

They catch mistakes before you even run the code.

## Why Use These Tools?

### Without Code Quality Tools

```typescript
// Inconsistent formatting
function   greet(name){
return 'Hello, '+name
  }

// Bugs you might miss
const user = getUser()
if (user = null) {  // Bug: = instead of ===
  console.log('no user')
}
```

### With Code Quality Tools

```typescript
// Prettier formats consistently
function greet(name) {
  return 'Hello, ' + name;
}

// ESLint catches bugs
const user = getUser();
if (user === null) {  // ESLint would flag the original
  console.log('no user');
}
```

## Step 1: Vite Already Includes ESLint

Good news! Vite's React TypeScript template includes ESLint. Check your `package.json` — you should see eslint packages.

If not present, install:

```bash
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react-refresh
```

## Step 2: Configure ESLint

Create or update `eslint.config.js`:

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
```

## Step 3: Install Prettier

```bash
npm install -D prettier eslint-config-prettier
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

Create `.prettierignore`:

```
node_modules
dist
build
.git
```

## Step 4: Add Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "preview": "vite preview"
  }
}
```

## Step 5: VS Code Integration

Install these VS Code extensions (if not already):
- **ESLint** (by Microsoft)
- **Prettier** (by Prettier)

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

Now, when you save a file:
- Prettier formats automatically
- ESLint fixes auto-fixable issues

## Step 6: Test It Works

### Test ESLint

Create a file with an issue:

```typescript
// src/test.ts
const unused = "hello"  // ESLint: unused variable
```

Run:
```bash
npm run lint
```

You should see a warning about `unused` being declared but never used.

### Test Prettier

Mess up some formatting, then:
```bash
npm run format
```

Or just save the file — it should auto-format.

Delete `src/test.ts` after testing.

## Step 7: Commit

```bash
git add .
git commit -m "Add ESLint and Prettier configuration"
git push
```

## What These Rules Do

### ESLint Rules (selected)

| Rule | What It Catches |
|------|----------------|
| No unused vars | Variables declared but never used |
| No undef | Using variables that don't exist |
| React hooks rules | Incorrect hook usage |
| Prefer const | Using `let` when `const` works |

### Prettier Rules (selected)

| Rule | What It Does |
|------|-------------|
| semi: true | Adds semicolons |
| singleQuote: true | Uses 'single' not "double" quotes |
| tabWidth: 2 | 2-space indentation |
| trailingComma: "es5" | Adds trailing commas where valid |

## Check Your Understanding

- [ ] ESLint finds bugs and bad patterns
- [ ] Prettier handles formatting
- [ ] Both run on save in VS Code
- [ ] I can run them manually with npm scripts

## Next Up

Let's add branch protection to guard your main branch.

[Continue: Branch Protection →](./04-branch-protection)
