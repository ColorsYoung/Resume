# Implementation Plan: Fix Invisible Blog Modals and Undefined CSS Variables

## Goal Description

The user reported that clicking "Read Article" on the `/blog` page doesn't show anything. Our investigation reveals two key issues:

1. **Light Mode Overlay/Accessibility Bug**: In light mode, the modal container inherits a dark semi-transparent background from `.modal-content` (`rgba(10, 10, 18, 0.6)`) but the text color inside resolves to dark gray/black (`#121212` / `#444444`). This makes the modal contents completely black-on-black and visually invisible!
2. **Undefined CSS Variables**: The custom CSS variables `--bg-dark` and `--text-primary` are referenced in `/blog`, `/lifestyle`, and `globals.css` but are never defined in `:root` or `[data-theme='light']`. This leads to broken fallback styles.

## Proposed Changes

### Styles & Design System

#### [MODIFY] [globals.css](file:///Users/num/Documents/resume/src/app/globals.css)

- Define `--bg-dark` and `--text-primary` variables in `:root` (dark mode) and `[data-theme='light']` sections.
- Add a light mode override for `.modal-content` using an elegant white semi-transparent glassmorphism styling to match the premium aesthetics.
- Enhance `.modal-overlay` using `inset: 0` instead of `width: 100vw; height: 100vh;` for better mobile layout containment.

## Verification Plan

### Automated Tests

- Run `npm run lint` to ensure zero typescript/linter errors.
- Run `npm run build` to verify a successful Next.js build compilation.

### Manual Verification

- Launch local environment and verify that in both dark and light modes, clicking "Read Article" opens a beautifully designed, highly readable modal.
