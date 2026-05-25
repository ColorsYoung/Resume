---
name: "vanilla-css-styling"
description: "Guidelines and design system standards for writing custom Vanilla CSS styling, premium Glassmorphism, animations, and dark/light themes."
version: "1.0.0"
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

## 1. Strict Styling Constraints
- **NO TailwindCSS**: Avoid using Tailwind utility classes. All visual structures are written in pure Vanilla CSS.
- **Single Source of Truth**: All global styles, root variables, animations, and core component styles belong in `src/app/globals.css`.
- **CSS Variables**: Always use predefined CSS variables for colors, backgrounds, borders, and shadows to maintain design consistency and theme compatibility.

## 2. Theme Configuration (Dark / Light Mode)
- **Dark Mode (Default)**: Set under `:root` in `globals.css`.
  - Uses deep slate backgrounds (`--bg-dark`), neon glows, and highly readable high-contrast texts (`--text-primary`, `--text-secondary`).
- **Light Mode**: Switched via `[data-theme='light']` in `globals.css`.
  - Uses soft white/gray backgrounds, elegant border tints, and dark contrast typography.
- **Variable Alignment**: When creating new UI components, verify compatibility in both modes.

## 3. Premium Aesthetic Principles
- **Glassmorphism**: Combine semi-transparent backgrounds with backdrop blur filters:
  ```css
  background: rgba(255, 255, 255, 0.05); /* or rgba(10, 10, 18, 0.6) for dark */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  ```
- **Micro-animations & Hover States**: Add gentle transitions (`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) and scale effects (`transform: translateY(-4px)`) on cards and interactive buttons.
- **Modals and Overlays**:
  - Must use `position: fixed; inset: 0; z-index: 10000;` to bypass parent 3D transform stacking contexts and overlay perfectly.
  - Implement smooth fade-in animations for modal visibility.
