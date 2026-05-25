---
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
- **Single Source of Truth**: All global styles, root variables, animations, and core component styles belong in `src/app/globals.css`.
- **CSS Variables**: Always use predefined CSS variables for colors, backgrounds, borders, and shadows to maintain design consistency and theme compatibility.

## 2. Active CSS Variables (Scanned from globals.css)

### 🌙 Dark Mode Variables (Default :root)
  - `--bg-color: #030303`
  - `--bg-dark: #07070a`
  - `--text-color: #f8f9fa`
  - `--text-primary: #f8f9fa`
  - `--text-secondary: #c0c0c0`
  - `--text-muted: #888888`
  - `--accent-color: #6200ee`
  - `--accent-light: #bb86fc`
  - `--accent-blue: #03dac6`
  - `--card-bg: rgba(18, 18, 18, 0.7)`
  - `--card-border: rgba(255, 255, 255, 0.08)`
  - `--glass-bg: rgba(10, 10, 10, 0.6)`
  - `--nav-bg: rgba(3, 3, 3, 0.8)`
  - `--timeline-line: rgba(157, 78, 221, 0.5)`

### ☀️ Light Mode Variables ([data-theme="light"])
  - `--bg-color: #f8f9fa`
  - `--bg-dark: #ffffff`
  - `--text-color: #121212`
  - `--text-primary: #121212`
  - `--text-secondary: #444444`
  - `--text-muted: #666666`
  - `--accent-color: #6200ee`
  - `--accent-light: #3700b3`
  - `--accent-blue: #018786`
  - `--card-bg: rgba(255, 255, 255, 0.8)`
  - `--card-border: rgba(0, 0, 0, 0.08)`
  - `--glass-bg: rgba(240, 240, 240, 0.8)`
  - `--nav-bg: rgba(255, 255, 255, 0.85)`
  - `--timeline-line: rgba(98, 0, 238, 0.3)`

## 3. Premium Aesthetic & UI Standards
- **Glassmorphism**: Combine semi-transparent backgrounds with backdrop blur filters:
  ```css
  background: rgba(255, 255, 255, 0.05); /* or rgba(10, 10, 18, 0.6) for dark */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  ```
- **Robust Modals and Overlays**:
  - **Modal Containers**: Overlay should use `position: fixed; inset: 0; z-index: 10000;` to overlay perfectly across all viewports.
  - **Light Mode Accessibility Override**: Since light modes use high-contrast dark typography, modal contents must override standard dark semi-transparent styling with clear, elegant light-glass surfaces:
    ```css
    [data-theme="light"] .modal-content {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    ```
- **Micro-animations & Hover States**: Add gentle transitions (`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) and scale effects (`transform: translateY(-4px)`) on cards and interactive buttons.
