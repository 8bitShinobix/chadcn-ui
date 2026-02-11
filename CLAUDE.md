# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Rules (Always Follow)

1. **Read before writing**: Before any implementation, read the relevant `/research/` files
2. **Follow the specs**: All decisions in PRD, SRS, UIDD are intentional—don't override them
3. **Track progress**: Update `Progress.md` checkboxes as you complete tasks
4. **Stay in phase**: Work on current phase tasks only; don't skip ahead
5. **Ask when unclear**: If specs conflict or are missing details, ask before assuming

## Project Overview

**chadcn** is a shadcn-compatible library of production-ready SaaS blocks with a documentation site. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4.

## Monorepo Structure

This is a pnpm monorepo with two packages:

| Package | Path | Purpose |
|---------|------|---------|
| **web** | `apps/web/` | Documentation site + block demos |
| **@chadcn/cli** | `packages/cli/` | CLI for adding blocks to projects |

## Commands

```bash
# Root-level commands (run from repo root)
pnpm dev              # Start docs site dev server (localhost:3000)
pnpm build            # Build docs site
pnpm build:cli        # Build @chadcn/cli package
pnpm lint             # Lint all packages
pnpm format           # Format all packages
pnpm type-check       # Type-check all packages
pnpm test             # Run tests in all packages

# Package-specific commands
cd apps/web && pnpm dev                # Dev server for docs site
cd apps/web && pnpm build:registry     # Auto-generate registry.json from metadata files
cd packages/cli && pnpm build          # Build CLI tool
```

## Architecture

### Rendering Strategy (apps/web)
- **Static (SSG)**: All `/docs/*` and `/blocks/*` pages pre-rendered at build time
- **Edge Functions**: `/api/search`, `/api/registry/*`
- **Client Components**: Only for interactivity (theme toggle, command palette, code panel)

### Directory Structure
```
chadcn/
├── apps/
│   └── web/                    # Documentation site + demo
│       ├── app/
│       │   ├── (marketing)/    # Homepage (no sidebar)
│       │   ├── (site)/(docs)/  # Docs shell with sidebar
│       │   │   ├── docs/[...slug]/   # MDX documentation
│       │   │   └── blocks/[category]/[block]/  # Block detail pages
│       │   └── api/
│       │       ├── registry/   # CLI block fetch endpoint
│       │       └── search/     # Search API
│       ├── components/
│       │   ├── ui/             # shadcn primitives (Button, Input, etc.)
│       │   ├── layout/         # Shared layout (TopBar, Sidebar, Footer, MobileNav)
│       │   ├── blocks/         # Block viewer/preview/card components
│       │   └── docs/           # Docs-only (CodePanel, TOC, MDX components)
│       ├── content/
│       │   ├── docs/           # MDX files
│       │   └── blocks/         # Block metadata JSON + component code (auto-generates registry.json)
│       ├── scripts/            # Build scripts (build-registry.ts, build-search.ts)
│       ├── lib/                # Utilities (registry, mdx, search)
│       ├── stores/             # Zustand stores
│       └── types/              # Shared TypeScript types
│
├── packages/
│   └── cli/                    # @chadcn/cli - CLI tool
│       └── src/                # CLI source code
│
└── research/                   # Specification documents
    ├── PRD.md                  # Product requirements
    ├── SRS.md                  # Software requirements
    ├── UIDD.md                 # UI design document
    └── Progress.md             # Project progress tracking
```

### Key Patterns

**Server Components by Default**
```tsx
// apps/web/app/(docs)/blocks/[category]/page.tsx
export default async function CategoryPage({ params }) {
  const blocks = await getBlocksByCategory(params.category)
  return <BlockGrid blocks={blocks} />
}
```

**Client Components Only When Needed**
```tsx
// apps/web/components/docs/theme-toggle.tsx
"use client"
import { useTheme } from "next-themes"
```

**Block Registry Pattern**
```typescript
// apps/web/content/blocks/auth/login/metadata.json
{
  "name": "Login Form",
  "slug": "login",
  "category": "auth",
  "description": "A complete login form with email and password authentication.",
  "variants": ["minimal", "standard", "feature-rich"],
  "dependencies": { "zod": "^3.22.0", "react-hook-form": "^7.48.0" },
  "registryDependencies": ["button", "input", "label"],
  "files": { "minimal": ["minimal.tsx"], "standard": ["standard.tsx"], "feature-rich": ["feature-rich.tsx"] }
}
// Run `pnpm --filter web build:registry` to auto-generate content/blocks/registry.json
```

**Zustand Store Pattern**
```typescript
// apps/web/stores/ui.ts
export const useUIStore = create<UIState>((set) => ({
  theme: 'system',
  commandPaletteOpen: false,
  codePanelExpanded: false,
  openCommandPalette: () => set({ commandPaletteOpen: true }),
}))
```

## Specifications (MUST READ BEFORE CHANGES)

All design decisions are documented in `/research/`. **Before implementing any feature or making architectural changes, you MUST read the relevant specification files:**

| File | Read Before |
|------|-------------|
| **PRD.md** | Adding features, changing user flows, modifying block categories |
| **SRS.md** | API changes, auth logic, database/state decisions, route changes |
| **UIDD.md** | UI components, colors, spacing, typography, responsive behavior |
| **Progress.md** | Starting any task (check current phase), mark tasks complete when done |

**Workflow:**
1. Read `Progress.md` to identify current phase and pending tasks
2. Read relevant spec file(s) for the task at hand
3. Implement according to specifications
4. Update `Progress.md` checkbox when task is complete
5. If specs are unclear or conflicting, ask before proceeding

**Never:**
- Add features not in PRD.md without user approval
- Change color tokens, typography, or spacing without checking UIDD.md
- Modify API contracts without verifying against SRS.md
- Skip phases in Progress.md

## Code Style

**Component Files**
- Use function declarations: `export default function ComponentName()`
- Props interface above component: `interface ComponentNameProps { ... }`
- Extract hooks and utilities to `/lib`

**Styling**
- Tailwind utilities only (no CSS modules)
- Use `cn()` helper for conditional classes
- Follow color tokens from UIDD.md (`bg-background`, `text-foreground`)

**TypeScript**
- Strict mode enabled
- Explicit return types on exported functions
- Use `satisfies` for type-safe object literals

## API Routes

**Registry API** (`apps/web/app/api/registry/[...block]/route.ts`)
```typescript
// GET /api/registry/auth/login?variant=minimal
// Returns: { name, category, variant, files[], dependencies, registryDependencies }
```

**Search API** (`apps/web/app/api/search/route.ts`)
```typescript
// GET /api/search?q=login&limit=10
// Returns: { results: [{ type, title, slug, excerpt }], total }
```

## Testing

- Unit tests: Vitest in `__tests__/` directories
- Component tests: Testing Library
- E2E tests: Playwright in `apps/web/e2e/`
- Single test: `pnpm test path/to/file.test.ts`

## Common Tasks

**Add a new block:**
1. Create folder: `apps/web/content/blocks/[category]/[name]/`
2. Add `metadata.json` with block metadata (see Block Registry Pattern above)
3. Add component files (minimal.tsx, standard.tsx, feature-rich.tsx)
4. Run `pnpm --filter web build:registry` to auto-generate registry.json

**Add a new doc page:**
1. Create MDX file: `apps/web/content/docs/[path]/page.mdx`
2. Page auto-generates via `generateStaticParams`

**Update search index:**
1. Modify content in `apps/web/content/`
2. Run `pnpm --filter web build:search`

**Test CLI locally:**
1. Build CLI: `pnpm build:cli`
2. Run: `node packages/cli/dist/index.js <command>`

## Session Start Checklist

Every new Claude session should begin with:

```
1. Read /research/Progress.md → Know current phase and what's done
2. Read /research/SRS.md → Understand architecture decisions
3. Read /research/UIDD.md → Know UI patterns and tokens
4. Check what user is asking → Map to specific Progress.md task
5. Read relevant existing code → Understand current patterns before changes
```

## Consistency Rules

**Naming Conventions:**
- Components: PascalCase (`BlockCard.tsx`)
- Utilities: camelCase (`getBlocksByCategory.ts`)
- Types: PascalCase with suffix (`BlockCardProps`, `RegistryBlock`)
- CSS variables: kebab-case (`--background-subtle`)

**File Organization:**
- One component per file
- Co-locate tests: `ComponentName.test.tsx` next to `ComponentName.tsx`
- Shared types in `apps/web/types/`
- Shared utilities in `apps/web/lib/`

**Import Order:**
1. React/Next.js
2. Third-party libraries
3. Internal packages (`@chadcn/*`)
4. Internal aliases (`@/components`, `@/lib`)
5. Relative imports
6. Types (with `type` keyword)

**Before Making Changes:**
- [ ] Read the relevant spec file in `/research/`
- [ ] Check if similar patterns exist in codebase
- [ ] Follow existing patterns, don't invent new ones
- [ ] Update Progress.md when task is complete
