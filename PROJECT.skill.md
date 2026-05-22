---
name: resume-architecture
description: Core architecture, structure, and styling principles of the personal resume/portfolio project to reduce token usage during analysis.
---

# Resume Portfolio Project Knowledge Base

This file serves as the memory and architectural guideline for the personal resume/portfolio project. Read this file to understand the system without needing to re-analyze the entire repository.

## 1. Tech Stack
- **Framework**: Next.js (App Router), React 19, TypeScript
- **Styling**: Vanilla CSS (`globals.css`). **NO TailwindCSS is used.**
- **Deployment/Build**: Standard Next.js build process (`npm run build`, `npm run lint`).

## 2. Project Structure
- `src/app/globals.css`: The central source of truth for all styling, themes, animations, and responsive breakpoints.
- `src/app/page.tsx`: Main landing page (Homepage) aggregating all sections.
- `src/app/blog/page.tsx`: Blog/Articles section.
- `src/app/lifestyle/page.tsx`: Lifestyle and hobbies gallery.
- `src/components/`: Modular UI components (e.g., `Hero.tsx`, `Experience.tsx`, `Projects.tsx`, `Navbar.tsx`, etc.).

## 3. Styling Principles & UI Architecture
- **Vanilla CSS Only**: All custom styles, effects, and layouts must be written in standard CSS.
- **Theming**: Uses `[data-theme='light']` and `:root` (dark mode default) in `globals.css` for switching custom CSS properties (e.g., `--bg-dark`, `--text-primary`).
- **Premium Aesthetics**: Heavy utilization of **Glassmorphism** (using `backdrop-filter: blur()`), smooth CSS transitions, hover effects, and CSS `animation` (keyframes).
- **Modals/Overlays**: Modals always use `position: fixed; inset: 0;` for the overlay and `z-index: 10000` (or higher) to ensure they are on top of other 3D/transform contexts.
- **Scroll Animations**: Handled via `IntersectionObserver` adding an `.is-visible` class to `.animate-on-scroll` elements.

## 4. State Management & Localization
- **Interactivity**: Uses standard React `useState` and `useEffect` (e.g., `activeItem` for modals, `theme` for dark/light mode).
- **Localization**: Bilingual support (English `en` and Thai `th`). Content is managed via simple dictionary objects directly within the page/component (e.g., `const t = { en: {...}, th: {...} }`).

## 5. Development Guidelines
- Always ensure new UI elements respect both Dark and Light modes by testing against the defined CSS variables.
- Preserve existing animations and premium feel when adding new components.
- Run `npm run lint` and `npm run build` after making structural or styling changes to ensure zero compilation errors.
