---
name: "resume-architecture"
description: "Core architecture, workspace files, components, and localization rules for the personal portfolio/resume project."
version: "1.0.0"
triggers:
  - "portfolio architecture"
  - "project structure"
  - "locale setup"
  - "components mapping"
  - "i18n"
  - "structure overview"
---

# Resume Architecture Skill

Use this skill to analyze, modify, or add features to the core portfolio pages and modular React components while conserving AI tokens.

## 1. Project Directory & File Tree

Having a visual reference of the workspace prevents the AI from needing to run heavy list commands, conserving tokens:

```text
├── public/                 # Static assets (images, PDF CV, icons)
├── messages/               # Localization translation dictionaries (en.json, th.json)
├── detailcv/               # Markdown files containing full CV/Resume details
├── data/                   # Raw content data
│   └── blog/               # Blog post markdown articles (e.g., totourialai.md)
├── src/
│   ├── app/                # Next.js App Router root
│   │   ├── globals.css     # Central source of truth for Vanilla CSS styling
│   │   └── [locale]/       # Localized routing folder
│   │       ├── page.tsx    # Home portfolio landing page
│   │       ├── blog/       # Blog post viewing pages
│   │       └── lifestyle/  # Lifestyle/hobbies page
│   ├── components/         # Reusable UI components (Hero, Navbar, Experience, etc.)
│   ├── i18n/               # next-intl routing and request configuration
│   └── middleware.ts       # Pathname matching localization middleware
├── skills/                 # Modular AI Skill sets
│   ├── resume-architecture/
│   ├── vanilla-css-styling/
│   └── nextjs-approuter/
├── PROJECT.skill.md        # Central index router for AI agents
└── AGENTS.md               # Antigravity agent system instructions
```

## 2. Key Pages & Components Mapping
- **Pages (`src/app/[locale]/`)**:
  - `page.tsx`: Home landing page aggregating components: `Hero`, `About`, `Experience`, `Skills`, `Projects`, `GitHubHeatmap`, `Quotes`, `Contact`.
  - `blog/`: Blog area rendering articles and reading modals via `BlogClient.tsx`.
  - `lifestyle/`: Creative lifestyle hub (gallery, quotes, hobbies) via `LifestyleClient.tsx`.
- **Components (`src/components/`)**:
  - `Hero.tsx`: Dynamic introduction page containing CV download links and social buttons.
  - `Navbar.tsx`: Responsive navigation bar with dark/light mode toggle and language switcher.
  - `Experience.tsx` & `Projects.tsx`: Card timelines and grid display.
  - `Skills.tsx` & `GitHubHeatmap.tsx`: Visual stats and activities.
  - Helper UI components: `AnimatedCounter.tsx`, `Quotes.tsx`, `Typewriter.tsx`.

## 2. Localization (Bilingual en/th)
- Uses Next.js localized routing under `[locale]` and standard Next-intl config.
- Translating content:
  - Check the local dictionaries or translation files under `messages/` directory.
  - When editing text, always update both English (`en`) and Thai (`th`) versions to ensure consistency.

## 3. Implementation Workflow
- **No Over-fetching**: Do not read all files in `src/components/` unless explicitly editing them. Use this architecture outline to target changes.
- **Verification**:
  - Always run `npm run lint` to check for TypeScript and ESLint compliance.
  - Test production bundle capability with `npm run build`.
