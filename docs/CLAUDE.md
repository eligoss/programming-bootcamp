# Programming Bootcamp Documentation

## Project Overview

This is a **VitePress documentation site** containing a comprehensive learning guide for a programming bootcamp. It's designed to take a complete beginner through building their first web application with React, TypeScript, and Firebase in a 4-5 hour mentored session.

## Purpose

- **Primary audience:** Complete beginner high school students
- **Session format:** Single continuous 4-5 hour mentored session
- **Learning approach:** AI-assisted development with Claude Code
- **Project outcome:** Deployed web app with authentication + CRUD feature

## Tech Stack (for the docs site)

- **VitePress** — Static documentation site generator
- **Markdown** — Content format
- **Custom CSS** — Print-friendly styling

## Tech Stack (what students build)

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Firebase** — Auth, Firestore, Hosting
- **React Router** — Navigation

## Project Structure

```
programming-bootcamp/
├── docs/                   # VitePress content
│   ├── .vitepress/
│   │   ├── config.ts      # Site configuration
│   │   └── theme/         # Custom styles
│   ├── phase-0-learning-contract/
│   ├── phase-1-foundations/
│   ├── phase-2-requirements/
│   ├── phase-3-work-breakdown/
│   ├── phase-4-choosing-your-stack/
│   ├── phase-5-project-setup/
│   ├── phase-6-working-with-ai/
│   ├── phase-7-building-the-app/
│   ├── phase-8-testing-and-deploy/
│   ├── phase-9-reflection/
│   └── reference/
├── package.json
└── .github/workflows/      # GitHub Pages deployment
```

## Commands

```bash
npm install           # Install dependencies
npm run docs:dev      # Start dev server (localhost:5173)
npm run docs:build    # Build static site
npm run docs:preview  # Preview built site
```

## Content Guidelines

When editing or adding content:

### Tone
- **Beginner-friendly** — No assumed knowledge
- **Encouraging** — Learning is hard, celebrate progress
- **Practical** — Focus on doing, not just understanding
- **Concise** — High school attention spans

### Page Structure
Each content page follows this template:
```markdown
# Title

> **Time**: ~X minutes | **Difficulty**: Beginner

## What You'll Learn
- Bullet points of outcomes

## The Big Idea
Simple explanation with analogies

## Let's Do It
Step-by-step instructions

## Check Your Understanding
- [ ] Checklist items

## Next Up
Link to next page
```

### Code Examples
- Always use TypeScript
- Include imports when relevant
- Keep examples focused and minimal
- Explain "why" in comments

### Print-Friendly Pages
These files are formatted for printing:
- `reference/terminal-cheatsheet.md`
- `reference/git-cheatsheet.md`
- `phase-6-working-with-ai/03-the-ai-development-loop.md`
- `reference/commit-message-guide.md`

## Key Content Principles

1. **No unexplained jargon** — Define terms on first use
2. **Visual when possible** — Diagrams, tables, code blocks
3. **Small steps** — Break everything into tiny pieces
4. **Verification at each step** — Students should be able to confirm progress
5. **AI integration** — Example prompts included in building phases

## File Naming

- Phase README: `index.md`
- Numbered content: `01-name.md`, `02-name.md`
- Exercises: `exercises/name-worksheet.md`
- Slices: `slice-N-name/` folders

## When Helping with This Project

### Do:
- Keep language simple and accessible
- Maintain consistent formatting across pages
- Update navigation in config when adding pages
- Test links after changes
- Consider beginner perspective

### Don't:
- Add advanced concepts not needed for MVP
- Use unexplained technical terms
- Create overly long pages
- Assume prior knowledge
- Skip verification steps

## Session Timeline

| Phase | Duration | Focus |
|-------|----------|-------|
| 0 | 15 min | Learning contract |
| 1 | 45 min | Foundations + setup |
| 2 | 30 min | Requirements |
| 3 | 15 min | Work breakdown |
| 4 | 20 min | Stack selection |
| 5 | 30 min | Project setup |
| 6 | 25 min | AI workflow |
| 7 | 90 min | Building |
| 8 | 25 min | Testing + deploy |
| 9 | 15 min | Reflection |

Total: ~5 hours including breaks

## Deployment

The site deploys automatically to GitHub Pages via `.github/workflows/deploy-docs.yml` on push to main branch.

## Known Issues

(Add any known issues here as they arise)

## Contributing

When making changes:
1. Run `npm run docs:dev` to preview
2. Check all modified links work
3. Verify print styles for reference pages
4. Update this CLAUDE.md if structure changes
