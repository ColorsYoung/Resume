---
name: "resume-architecture"
description: "Core architecture, workspace files, components, and localization rules for the personal portfolio/resume project."
version: "1.1.0"
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

Visual reference of the active directory tree structure of the workspace (updated dynamically):

```text
src/app/
├── globals.css     # Central source of truth for styling
└── [locale]/       # Localized App Router group
    ├── blog/      # Sub-page route
    ├── layout.tsx
    ├── lifestyle/      # Sub-page route
    ├── page.module.css
    └── page.tsx

├── public/                 # Static assets (images, PDF CV, icons)
├── messages/               # Localization translation dictionaries (en.json, th.json)
├── detailcv/               # Markdown files containing full CV/Resume details
├── data/                   # Raw content data (blog posts, lifestyle content)
└── doc_lib/                # Design documentations, UI blueprints, and spec sheets
```

## 2. Key Pages & Components Mapping
- **Pages (`src/app/[locale]/`)**:
  - `page.tsx`: Home portfolio landing page aggregating modules like Hero, Experience, Skills, Projects, and GitHubHeatmap.
  - `blog/page.tsx`: Blog route rendering articles dynamically using Client-side state.
  - `lifestyle/page.tsx`: Lifestyle and hobby collection rendering photo galleries and custom tags.
- **Client Interactive Components (`src/components/`)**:
  - `BlogClient.tsx`: Manage interactive blog views, markdown parsing, search fields, and read modals.
  - `LifestyleClient.tsx`: Manage image viewer galleries, category switches, and hobby drawers.
  - `Galaxy.tsx`: High-performance WebGL particle system using `ogl` rendering premium galaxy background.
- **Modular Components in Project**:
  - `About.tsx`
  - `AnimatedCounter.tsx`
  - `BlogClient.tsx`
  - `Contact.tsx`
  - `Experience.tsx`
  - `Galaxy.tsx`
  - `GitHubHeatmap.tsx`
  - `Hero.tsx`
  - `LifestyleClient.tsx`
  - `Navbar.tsx`
  - `Projects.tsx`
  - `Quotes.tsx`
  - `Skills.tsx`
  - `Typewriter.tsx`

## 3. Localization (Bilingual en/th)
- Uses Next.js App Router localization under standard `[locale]` subroutes powered by `next-intl`.
- Dictionary resources are under `messages/en.json` and `messages/th.json`. Update both files simultaneously when adding text keys.
