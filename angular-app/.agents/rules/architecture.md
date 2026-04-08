# Skill: Angular 21 Senior Architecture (Agent-First)

## 1. Core Principles
- **Framework:** Angular 21 (vNext).
- **Component Model:** 100% Standalone Components. No NgModules allowed.
- **Reactivity:** Use Signals for UI state and local data. Use RxJS only for complex streams or global services.
- **Styling:** Tailwind CSS (utility-first) + CSS Variables for design tokens. Respect `preflight: false` configuration.

## 2. Feature-Based Structure (Mandatory)
Every new functionality must be encapsulated in `src/app/features/`.
Structure per feature:
- `features/[feature-name]/`
  - `components/` (Presentational/Dumb components)
  - `pages/` (Smart components/Containers)
  - `services/` (Feature-specific logic)
  - `models/` (Interfaces and types)
  - `[feature-name].routes.ts` (Lazy-loaded routes)

## 3. Coding Standards
- **Signals First:** Use `signal()`, `computed()`, and `effect()`. Prefer `input()`, `output()` and `model()` (Angular 17.2+) over old decorators.
- **Data Flow:** Services manage state via Signals or BehaviorSubjects. Components consume but do not mutate state directly.
- **Dumb Components:** Must use `changeDetection: ChangeDetectionStrategy.OnPush`.
- **Naming:** Follow official Angular Style Guide (kebab-case for files, PascalCase for classes).

## 4. UI & Responsive Rules
- **Tailwind-Only:** Avoid writing custom CSS in `.css` files unless strictly necessary (use `@layer components` or `@layer utilities`).
- **Design Tokens:** Use the Figma values mapped to Tailwind classes or CSS variables.
- **Mobile-First:** Apply Tailwind classes for mobile as base, and `md:`, `lg:` for desktop overrides.
