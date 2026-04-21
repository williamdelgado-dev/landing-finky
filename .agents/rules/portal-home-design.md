# Portal Home Design System Rules

Whenever working on the **Portal Home** (main landing page and related components), you MUST adhere to the following design system tokens and visual identity:

## Color Palette
- **Primary Orange**: `#f16c2d` (Use for CTAs, highlights, active states)
- **Primary Orange Light**: `#ff7e42` (Use for hovers, subtle backgrounds)
- **Background**: White (#ffffff)
- **Deep Navy**: `#0f172a` (Use for headings)
- **Text Main**: `#1e293b`
- **Text Muted**: `#64748b`
- **Soft Background**: `#f8fafc`
- **Glass Effect**: `rgba(255, 255, 255, 0.8)`

## Animations
- **Library**: ALWAYS use **AOS** (Animate On Scroll) for entrance and scroll-based animations.
- **Attributes**: Use `data-aos="fade-up"` (or other AOS variants) and `[attr.data-aos-delay]` for staggered effects.
- **Initialization**: AOS is initialized in `PortalHomeComponent`. Avoid manual `@keyframes` for entry animations to keep the CSS lean and consistent.

## Typography
- **Primary Font**: 'Plus Jakarta Sans', sans-serif
- **Weight**: 700/800 for titles, 400/500 for body.

## Visual Style
- **Premium Shadow**: `0 20px 40px rgba(15, 23, 42, 0.06)`
- **Corners**: Large border-radius (usually 24px - 32px) for a modern, friendly feel.
- **Tone**: Clean, editorial, premium. No heavy purples unless specified as an accent.

## Components specific notes
- **Lina Widget**: Must use the Orange-White palette. Avoid the institutional Green/Purple.
- **Scroll Button**: Must use Orange-White.
