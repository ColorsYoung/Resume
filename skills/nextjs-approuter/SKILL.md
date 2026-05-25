---
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
- **Client Components (`'use client'`)**: Mark components that use state (`useState`, `useEffect`), event handlers, browser-only APIs, or client-side navigation.
  - Interactive components: `BlogClient.tsx`, `LifestyleClient.tsx`, `Galaxy.tsx`, `Navbar.tsx`, `Hero.tsx`.

## 2. Localization Routing with `next-intl`
- **Configuration (`src/i18n/routing.ts`)**:
  - Supported Locales: `'en'` (English, Default), `'th'` (Thai).
  - Middleware: Dynamic paths mapped via Next.js middleware matching `'/'` and `'/(th|en)/:path*'`.
- **Navigation Wrapper**:
  - Never import navigation components directly from `next/navigation` if locale-aware navigation is required.
  - Import them from `src/i18n/routing`:
    ```typescript
    import { Link, useRouter, usePathname } from '@/i18n/routing';
    ```
- **Language Switcher**:
  - Controlled dynamically through `Navbar.tsx` by prefixing the path with the desired locale.
