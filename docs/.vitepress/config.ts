import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/programming-bootcamp/',
  title: 'Programming Bootcamp',
  description: 'Learn to build web apps from zero to deployment',
  lang: 'en-US',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/programming-bootcamp/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:title', content: 'Programming Bootcamp | Zero to Web App' }],
    ['meta', { name: 'og:description', content: 'Learn to build real web applications with modern tools and AI assistance' }],
    ['meta', { name: 'og:site_name', content: 'Programming Bootcamp' }],
    ['meta', { name: 'og:image', content: 'https://eligoss.github.io/programming-bootcamp/og-image.svg' }]
  ],

  sitemap: {
    hostname: 'https://eligoss.github.io/programming-bootcamp/'
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Start', link: '/phase-0-learning-contract/' },
      { text: 'Reference', link: '/reference/terminal-cheatsheet' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eligoss/programming-bootcamp' }
    ],

    editLink: {
      pattern: 'https://github.com/eligoss/programming-bootcamp/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Welcome', link: '/' },
          { text: 'Session Overview', link: '/overview' }
        ]
      },
      {
        text: 'Phase 0: Before We Start',
        items: [
          { text: 'Quick Setup', link: '/phase-0-learning-contract/' }
        ]
      },
      {
        text: 'Phase 1: Setup',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-1-foundations/' },
          { text: 'Web Architecture', link: '/phase-1-foundations/02-how-the-web-works' },
          { text: 'Development Tools', link: '/phase-1-foundations/03-your-development-tools' },
          { text: 'Environment Setup', link: '/phase-1-foundations/04-setting-up-environment' },
          { text: 'Terminal Guide', link: '/phase-1-foundations/05-terminal-survival-guide' },
          { text: 'Git Basics', link: '/phase-1-foundations/06-git-in-10-minutes' }
        ]
      },
      {
        text: 'Phase 2: Requirements',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-2-requirements/' },
          { text: 'Why Requirements First', link: '/phase-2-requirements/01-why-requirements-first' },
          { text: 'Business Requirements', link: '/phase-2-requirements/02-business-requirements' },
          { text: 'Functional Requirements', link: '/phase-2-requirements/03-functional-requirements' },
          { text: 'Technical Requirements', link: '/phase-2-requirements/04-technical-requirements' },
          { text: 'Non-Functional', link: '/phase-2-requirements/05-non-functional-requirements' },
          { text: '📝 Worksheet', link: '/phase-2-requirements/exercises/requirements-worksheet' }
        ]
      },
      {
        text: 'Phase 3: Work Breakdown',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-3-work-breakdown/' },
          { text: 'From Big to Small', link: '/phase-3-work-breakdown/01-from-big-to-small' },
          { text: 'Good Tasks', link: '/phase-3-work-breakdown/02-what-makes-a-good-task' },
          { text: '📝 Backlog', link: '/phase-3-work-breakdown/exercises/backlog-worksheet' }
        ]
      },
      {
        text: 'Phase 4: Stack Selection',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-4-choosing-your-stack/' },
          { text: 'Decision Framework', link: '/phase-4-choosing-your-stack/01-decision-framework' },
          { text: 'Frontend Options', link: '/phase-4-choosing-your-stack/02-frontend-landscape' },
          { text: 'Backend Options', link: '/phase-4-choosing-your-stack/03-backend-landscape' },
          { text: 'TypeScript', link: '/phase-4-choosing-your-stack/04-typescript-explained' },
          { text: 'Our Stack', link: '/phase-4-choosing-your-stack/05-our-stack-decision' }
        ]
      },
      {
        text: 'Phase 5: Project Setup',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-5-project-setup/' },
          { text: 'GitHub Setup', link: '/phase-5-project-setup/01-github-quickstart' },
          { text: 'Project Structure', link: '/phase-5-project-setup/02-project-structure' },
          { text: 'ESLint + Prettier', link: '/phase-5-project-setup/03-code-quality-tools' },
          { text: 'Branch Protection', link: '/phase-5-project-setup/04-branch-protection' },
          { text: 'GitHub Actions', link: '/phase-5-project-setup/05-github-actions-intro' },
          { text: 'CLAUDE.md', link: '/phase-5-project-setup/06-claude-md-for-your-project' }
        ]
      },
      {
        text: 'Phase 6: Working with AI',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-6-working-with-ai/' },
          { text: 'AI as Partner', link: '/phase-6-working-with-ai/01-ai-as-pair-programmer' },
          { text: 'Good Prompts', link: '/phase-6-working-with-ai/02-anatomy-of-a-good-prompt' },
          { text: 'The Loop', link: '/phase-6-working-with-ai/03-the-ai-development-loop' },
          { text: 'Reviewing Code', link: '/phase-6-working-with-ai/04-reviewing-ai-code' },
          { text: 'Debugging', link: '/phase-6-working-with-ai/05-debugging-with-ai' },
          { text: 'Safety Rules', link: '/phase-6-working-with-ai/06-ai-safety-rules' },
          { text: 'When Stuck', link: '/phase-6-working-with-ai/07-when-ai-gets-stuck' }
        ]
      },
      {
        text: 'Phase 7: Building',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-7-building-the-app/' },
          { text: 'Vertical Slices', link: '/phase-7-building-the-app/01-vertical-slices-explained' },
          {
            text: 'Slice 1: Skeleton',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/phase-7-building-the-app/slice-1-skeleton/' },
              { text: 'Goals', link: '/phase-7-building-the-app/slice-1-skeleton/goals' },
              { text: 'Prompts', link: '/phase-7-building-the-app/slice-1-skeleton/prompts' }
            ]
          },
          {
            text: 'Slice 2: Auth',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/phase-7-building-the-app/slice-2-authentication/' },
              { text: 'Goals', link: '/phase-7-building-the-app/slice-2-authentication/goals' },
              { text: 'Prompts', link: '/phase-7-building-the-app/slice-2-authentication/prompts' }
            ]
          },
          {
            text: 'Slice 3: Feature',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/phase-7-building-the-app/slice-3-protected-feature/' },
              { text: 'Goals', link: '/phase-7-building-the-app/slice-3-protected-feature/goals' },
              { text: 'Prompts', link: '/phase-7-building-the-app/slice-3-protected-feature/prompts' }
            ]
          },
          {
            text: 'Slice 4: Security',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/phase-7-building-the-app/slice-4-security-rules/' },
              { text: 'Goals', link: '/phase-7-building-the-app/slice-4-security-rules/goals' },
              { text: 'Prompts', link: '/phase-7-building-the-app/slice-4-security-rules/prompts' }
            ]
          },
          {
            text: 'Slice 5: Polish',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/phase-7-building-the-app/slice-5-polish/' },
              { text: 'Goals', link: '/phase-7-building-the-app/slice-5-polish/goals' },
              { text: 'Prompts', link: '/phase-7-building-the-app/slice-5-polish/prompts' }
            ]
          }
        ]
      },
      {
        text: 'Phase 8: Ship It',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/phase-8-testing-and-deploy/' },
          { text: 'Testing', link: '/phase-8-testing-and-deploy/01-testing-basics' },
          { text: 'Deploy', link: '/phase-8-testing-and-deploy/02-deployment-walkthrough' },
          { text: 'Demo Prep', link: '/phase-8-testing-and-deploy/03-demo-checklist' }
        ]
      },
      {
        text: 'Phase 9: Reflection',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/phase-9-reflection/' },
          { text: 'Lessons Learned', link: '/phase-9-reflection/01-lessons-learned-template' },
          { text: 'New Skills', link: '/phase-9-reflection/02-your-new-superpowers' },
          { text: 'Next Steps', link: '/phase-9-reflection/03-whats-next' }
        ]
      },
      {
        text: 'Reference',
        collapsed: true,
        items: [
          { text: 'Terminal', link: '/reference/terminal-cheatsheet' },
          { text: 'Git', link: '/reference/git-cheatsheet' },
          { text: 'TypeScript', link: '/reference/typescript-basics' },
          { text: 'React', link: '/reference/react-patterns' },
          { text: 'Firebase', link: '/reference/firebase-quickref' },
          { text: 'Commits', link: '/reference/commit-message-guide' },
          { text: 'Troubleshooting', link: '/reference/troubleshooting-common-errors' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    },

    footer: {
      message: 'Built for learning | Open source on GitHub',
      copyright: 'MIT Licensed'
    },

    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode'
  }
})
