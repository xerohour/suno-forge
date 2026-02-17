# Technology Stack

**Analysis Date:** 2024-07-29

## Languages

**Primary:**
- TypeScript 5.9.3 - Used for all application logic and components.

**Secondary:**
- JavaScript - Used for configuration files (e.g., `postcss.config.js`, `tailwind.config.js`, `jest.config.js`).

## Runtime

**Environment:**
- Node.js (implicit via Next.js)

**Package Manager:**
- npm - Version (Implicitly managed by Node.js/Next.js setup)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js (latest) - Full-stack React framework for server-side rendering, routing, and API routes.
- React (latest) - UI library for building user interfaces.

**Testing:**
- Jest 29.7.0 - JavaScript testing framework.
- ts-jest 29.1.5 - Jest preset for TypeScript.

**Build/Dev:**
- Webpack/Babel - Handled internally by Next.js.
- PostCSS 8.5.6 - CSS post-processor for transforming styles.
- Tailwind CSS 4.1.18 - Utility-first CSS framework.
- Autoprefixer - PostCSS plugin to parse CSS and add vendor prefixes.

## Key Dependencies

**Critical:**
- `@radix-ui/react-*` - UI component primitives for building accessible design systems.
- `@supabase/supabase-js` 2.0.0 - Client library for interacting with Supabase services (database, auth).
- `openai` 4.0.0 - Official Node.js library for OpenAI API.
- `uuid` 9.0.0 - For generating unique IDs.

**Infrastructure:**
- `next-themes` 0.4.6 - Theme provider for Next.js applications.
- `class-variance-authority`, `clsx`, `tailwind-merge` - Utilities for managing Tailwind CSS classes.
- `lucide-react` - Icon library.

## Configuration

**Environment:**
- Configured via `.env*` files (not read), accessed through `process.env`.
- Key configs are likely for Supabase and OpenAI API keys/URLs.

**Build:**
- `next.config.js` (not explicitly present but implicit for Next.js)
- `tsconfig.json` - TypeScript compiler configuration.
- `postcss.config.js` - PostCSS plugin configuration.
- `tailwind.config.js` - Tailwind CSS configuration.
- `jest.config.js` - Jest test runner configuration.

## Platform Requirements

**Development:**
- Node.js (LTS version recommended by Next.js).
- npm.

**Production:**
- Vercel (common for Next.js deployments) or any Node.js compatible hosting environment.

---

*Stack analysis: 2024-07-29*
