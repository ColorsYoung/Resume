const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Helper to list components
function getComponents() {
  const compDir = path.join(rootDir, 'src', 'components');
  if (!fs.existsSync(compDir)) return [];
  return fs.readdirSync(compDir)
    .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
    .map(f => f.replace(/\.(tsx|ts)$/, ''))
    .sort();
}

// 2. Helper to parse CSS variables from globals.css
function parseCssVariables() {
  const cssPath = path.join(rootDir, 'src', 'app', 'globals.css');
  if (!fs.existsSync(cssPath)) return { dark: [], light: [] };

  const content = fs.readFileSync(cssPath, 'utf8');
  
  // Regex to extract :root and [data-theme="light"] blocks
  const rootMatch = content.match(/:root\s*\{([\s\S]*?)\}/);
  const lightMatch = content.match(/\[data-theme="light"\]\s*\{([\s\S]*?)\}/);

  const extractVars = (blockText) => {
    if (!blockText) return [];
    const lines = blockText.split('\n');
    return lines
      .map(line => line.trim())
      .filter(line => line.startsWith('--'))
      .map(line => {
        const parts = line.split(':');
        if (parts.length < 2) return null;
        const name = parts[0].trim();
        const value = parts.slice(1).join(':').replace(/;$/, '').trim();
        return { name, value };
      })
      .filter(item => item !== null);
  };

  return {
    dark: extractVars(rootMatch ? rootMatch[1] : ''),
    light: extractVars(lightMatch ? lightMatch[1] : '')
  };
}

// 3. Helper to reconstruct active routing tree
function getAppRoutes() {
  const appDir = path.join(rootDir, 'src', 'app');
  if (!fs.existsSync(appDir)) return 'No app directory found';

  // Build tree
  let tree = 'src/app/\n';
  tree += '├── globals.css     # Central source of truth for styling\n';
  tree += '└── [locale]/       # Localized App Router group\n';
  
  const localeDir = path.join(appDir, '[locale]');
  if (fs.existsSync(localeDir)) {
    const subItems = fs.readdirSync(localeDir, { withFileTypes: true });
    subItems.forEach((item, index) => {
      const isLast = index === subItems.length - 1;
      const prefix = isLast ? '    └── ' : '    ├── ';
      if (item.isDirectory()) {
        tree += `${prefix}${item.name}/      # Sub-page route\n`;
      } else {
        if (item.name.endsWith('.tsx') || item.name.endsWith('.css')) {
          tree += `${prefix}${item.name}\n`;
        }
      }
    });
  }
  return tree;
}

// Update resume-architecture/SKILL.md
function updateArchitectureSkill() {
  const skillPath = path.join(rootDir, 'skills', 'resume-architecture', 'SKILL.md');
  const components = getComponents();
  const routesTree = getAppRoutes();

  const content = `---
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

\`\`\`text
${routesTree}
├── public/                 # Static assets (images, PDF CV, icons)
├── messages/               # Localization translation dictionaries (en.json, th.json)
├── detailcv/               # Markdown files containing full CV/Resume details
├── data/                   # Raw content data (blog posts, lifestyle content)
└── doc_lib/                # Design documentations, UI blueprints, and spec sheets
\`\`\`

## 2. Key Pages & Components Mapping
- **Pages (\`src/app/[locale]/\`)**:
  - \`page.tsx\`: Home portfolio landing page aggregating modules like Hero, Experience, Skills, Projects, and GitHubHeatmap.
  - \`blog/page.tsx\`: Blog route rendering articles dynamically using Client-side state.
  - \`lifestyle/page.tsx\`: Lifestyle and hobby collection rendering photo galleries and custom tags.
- **Client Interactive Components (\`src/components/\`)**:
  - \`BlogClient.tsx\`: Manage interactive blog views, markdown parsing, search fields, and read modals.
  - \`LifestyleClient.tsx\`: Manage image viewer galleries, category switches, and hobby drawers.
  - \`Galaxy.tsx\`: High-performance WebGL particle system using \`ogl\` rendering premium galaxy background.
- **Modular Components in Project**:
${components.map(c => `  - \`${c}.tsx\``).join('\n')}

## 3. Localization (Bilingual en/th)
- Uses Next.js App Router localization under standard \`[locale]\` subroutes powered by \`next-intl\`.
- Dictionary resources are under \`messages/en.json\` and \`messages/th.json\`. Update both files simultaneously when adding text keys.
`;

  fs.writeFileSync(skillPath, content, 'utf8');
  console.log('✅ Updated resume-architecture/SKILL.md successfully');
}

// Update vanilla-css-styling/SKILL.md
function updateStylingSkill() {
  const skillPath = path.join(rootDir, 'skills', 'vanilla-css-styling', 'SKILL.md');
  const vars = parseCssVariables();

  const formattedDarkVars = vars.dark.map(v => `  - \`${v.name}: ${v.value}\``).join('\n');
  const formattedLightVars = vars.light.map(v => `  - \`${v.name}: ${v.value}\``).join('\n');

  const content = `---
name: "vanilla-css-styling"
description: "Guidelines and design system standards for writing custom Vanilla CSS styling, premium Glassmorphism, animations, and dark/light themes."
version: "1.1.0"
triggers:
  - "css styling"
  - "design system"
  - "theme colors"
  - "glassmorphism"
  - "modal styling"
  - "tailwind alternative"
  - "responsive breakpoints"
---

# Vanilla CSS Styling & Design System Skill

Use this skill whenever modifying styles, adding visual elements, fixing accessibility contrast, or creating custom CSS animations.

## 1. Styling Constraints & Flexibility
- **Tailwind CSS & twinCSS Allowed**: Tailwind utility classes are fully allowed and supported. You can write styling using either Tailwind classes or pure Vanilla CSS, or combine them as needed.
- **Single Source of Truth**: All global styles, root variables, animations, and core component styles belong in \`src/app/globals.css\`.
- **CSS Variables**: Always use predefined CSS variables for colors, backgrounds, borders, and shadows to maintain design consistency and theme compatibility.

## 2. Active CSS Variables (Scanned from globals.css)

### 🌙 Dark Mode Variables (Default :root)
${formattedDarkVars || '  - No dark variables found'}

### ☀️ Light Mode Variables ([data-theme="light"])
${formattedLightVars || '  - No light variables found'}

## 3. Premium Aesthetic & UI Standards
- **Glassmorphism**: Combine semi-transparent backgrounds with backdrop blur filters:
  \`\`\`css
  background: rgba(255, 255, 255, 0.05); /* or rgba(10, 10, 18, 0.6) for dark */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  \`\`\`
- **Robust Modals and Overlays**:
  - **Modal Containers**: Overlay should use \`position: fixed; inset: 0; z-index: 10000;\` to overlay perfectly across all viewports.
  - **Light Mode Accessibility Override**: Since light modes use high-contrast dark typography, modal contents must override standard dark semi-transparent styling with clear, elegant light-glass surfaces:
    \`\`\`css
    [data-theme="light"] .modal-content {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    \`\`\`
- **Micro-animations & Hover States**: Add gentle transitions (\`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)\`) and scale effects (\`transform: translateY(-4px)\`) on cards and interactive buttons.
`;

  fs.writeFileSync(skillPath, content, 'utf8');
  console.log('✅ Updated vanilla-css-styling/SKILL.md successfully');
}

// Update nextjs-approuter/SKILL.md
function updateAppRouterSkill() {
  const skillPath = path.join(rootDir, 'skills', 'nextjs-approuter', 'SKILL.md');
  const content = `---
name: "nextjs-approuter"
description: "Guidelines and architecture for Next.js App Router (React 19), Server Components, locale routing, and next-intl translation bindings."
version: "1.1.0"
triggers:
  - "nextjs routing"
  - "app router"
  - "client components"
  - "server components"
  - "next-intl middleware"
  - "locale navigation"
  - "locales configuration"
---

# Next.js App Router & Localization Skill

Use this skill when creating pages, modifying route structures, managing layouts, working with local navigation APIs, or debugging middleware and localization.

## 1. App Router & React 19 Paradigms
- **Server Components (Default)**: Use standard Server Components for static/dynamic rendering.
- **Client Components (\`'use client'\`)**: Mark components that use state (\`useState\`, \`useEffect\`), event handlers, browser-only APIs, or client-side navigation.
  - Interactive components: \`BlogClient.tsx\`, \`LifestyleClient.tsx\`, \`Galaxy.tsx\`, \`Navbar.tsx\`, \`Hero.tsx\`.

## 2. Localization Routing with \`next-intl\`
- **Configuration (\`src/i18n/routing.ts\`)**:
  - Supported Locales: \`'en'\` (English, Default), \`'th'\` (Thai).
  - Middleware: Dynamic paths mapped via Next.js middleware matching \`'/'\` and \`'/(th|en)/:path*'\`.
- **Navigation Wrapper**:
  - Never import navigation components directly from \`next/navigation\` if locale-aware navigation is required.
  - Import them from \`src/i18n/routing\`:
    \`\`\`typescript
    import { Link, useRouter, usePathname } from '@/i18n/routing';
    \`\`\`
- **Language Switcher**:
  - Controlled dynamically through \`Navbar.tsx\` by prefixing the path with the desired locale.
`;

  fs.writeFileSync(skillPath, content, 'utf8');
  console.log('✅ Updated nextjs-approuter/SKILL.md successfully');
}

// Main execution
console.log('🔄 Starting automated project skill sync...');
try {
  updateArchitectureSkill();
  updateStylingSkill();
  updateAppRouterSkill();
  console.log('🎉 Project skills synchronization completed successfully!');
} catch (error) {
  console.error('❌ Error during synchronization:', error);
  process.exit(1);
}
