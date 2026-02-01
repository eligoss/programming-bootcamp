# Programming Bootcamp

> **From Zero to Web App** — A comprehensive learning guide for complete beginners

Learn to build real web applications with modern tools and AI assistance in a single 4-5 hour mentored session.

🌐 **[View Documentation Site](https://eligoss.github.io/programming-bootcamp/)**

---

## What is This?

A structured curriculum designed to take a complete beginner (high school student with no prior programming experience) through building their first production-ready web application.

### What You'll Build

- User authentication (registration, login, logout)
- A private dashboard with CRUD functionality
- Deploy to a live URL anyone can access

### Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Firebase (Authentication + Firestore + Hosting)
- **Development:** Claude Code (AI-assisted development)
- **Version Control:** Git + GitHub + Fork GUI

---

## Session Structure

| Phase | Duration | What You'll Learn |
|-------|----------|-------------------|
| **Phase 0** | 15 min | Learning contract, expectations, goals |
| **Phase 1** | 45 min | Development environment setup |
| **Phase 2** | 30 min | Requirements gathering |
| **Phase 3** | 15 min | Work breakdown and planning |
| **Phase 4** | 20 min | Technology stack selection |
| **Phase 5** | 30 min | Project initialization and tooling |
| **Phase 6** | 25 min | AI-assisted development workflow |
| **Phase 7** | 90 min | Building the application (5 slices) |
| **Phase 8** | 25 min | Testing and deployment |
| **Phase 9** | 15 min | Reflection and next steps |

**Total:** ~5 hours (including breaks)

---

## Key Features

✅ **Complete Beginner Friendly** — No programming experience required
✅ **AI-Powered Learning** — Learn to work with Claude Code as a development partner
✅ **Real Project** — Build something you can actually show people
✅ **Modern Tools** — Industry-standard tech stack (React, TypeScript, Firebase)
✅ **Windows & Mac Support** — All commands work on both platforms
✅ **Visual Git Workflow** — Fork GUI for easy version control
✅ **Professional Practices** — Git workflow, commit messages, code quality

---

## Documentation

The full curriculum is available as a **VitePress documentation site**:

📚 **[https://eligoss.github.io/programming-bootcamp/](https://eligoss.github.io/programming-bootcamp/)**

### Quick Links

- [Start Learning](https://eligoss.github.io/programming-bootcamp/phase-0-learning-contract/)
- [Phase 1: Foundations](https://eligoss.github.io/programming-bootcamp/phase-1-foundations/)
- [Reference Materials](https://eligoss.github.io/programming-bootcamp/reference/terminal-cheatsheet)

---

## Running the Documentation Locally

```bash
# Clone the repository
git clone https://github.com/eligoss/programming-bootcamp.git
cd programming-bootcamp

# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

The site will be available at `http://localhost:5173`

---

## Project Structure

```
programming-bootcamp/
├── docs/                           # VitePress documentation
│   ├── .vitepress/
│   │   ├── config.ts              # Site configuration
│   │   └── theme/                 # Custom theme
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
│   └── reference/                 # Cheatsheets and quick refs
├── .github/
│   └── workflows/
│       └── deploy-docs.yml        # Auto-deploy to GitHub Pages
├── package.json
└── README.md
```

---

## For Instructors

### Session Preparation

1. **Environment Check** (1 day before)
   - Verify student has a laptop (Windows or Mac)
   - Send pre-session checklist (Node.js, VS Code, Git)

2. **Day of Session**
   - Start with Phase 0 (expectations, definition of done)
   - Follow the phases sequentially
   - Use the provided worksheets in each phase

3. **Tools to Have Ready**
   - [Fork](https://git-fork.com) for visual git workflow
   - [Firebase Console](https://console.firebase.google.com) for backend setup
   - [Claude Code](https://claude.ai/download) for AI assistance

### Customization

The curriculum is flexible:
- **Feature Choice:** Student picks between Notes, Tasks, or Bookmarks app
- **Tech Stack:** Can be adapted (currently React + Firebase)
- **Pacing:** Adjust based on student comprehension

---

## Contributing

This is an open-source educational resource. Contributions welcome!

### Ways to Contribute

- 🐛 **Bug Reports** — Found an error in the documentation?
- 💡 **Improvements** — Better explanations or examples?
- 🌍 **Translations** — Help make this available in other languages
- 📝 **Content** — Additional exercises or reference materials

### Development

```bash
# Create a feature branch
git checkout -b feature/your-improvement

# Make changes and test locally
npm run docs:dev

# Commit with descriptive message
git commit -m "Add explanation for X concept"

# Push and create PR
git push origin feature/your-improvement
gh pr create
```

---

## License

MIT License - feel free to use this for teaching, learning, or adapting to your needs.

---

## Credits

**Created by:** Anton Borodulin
**Purpose:** Teaching programming fundamentals through hands-on project work
**Inspiration:** Bootcamp-style learning, AI-assisted development, beginner-friendly approach

---

## Questions or Feedback?

- 📧 Open an issue on GitHub
- 💬 Start a discussion
- 🌟 Star the repo if you find it useful!

**Happy Learning! 🚀**
