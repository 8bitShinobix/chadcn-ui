# AGENTS.md

This file provides guidance to agentic coding agents operating in this repository.

## Project Overview

**chadcn** is a pnpm monorepo: `apps/web/` (docs site, Next.js 16, Tailwind CSS 4) and `packages/cli/` (CLI tool).

## Build Commands

```bash
pnpm dev              # Start docs site (localhost:3000)
pnpm build            # Build docs site
pnpm build:cli        # Build CLI package
pnpm lint             # Lint all packages
pnpm format           # Format with Prettier
pnpm type-check       # Type-check all packages
pnpm test             # Run tests in all packages

# Web app specific
pnpm --filter web build:registry    # Auto-generate registry.json
pnpm --filter web lint:fix          # Lint with auto-fix

# CLI specific
pnpm --filter @chadcn/cli build
```

## Test Commands

```bash
pnpm test                          # Run all tests
pnpm --filter web test             # Run web tests once
pnpm --filter web test:watch       # Watch mode
pnpm --filter web test:e2e         # Playwright E2E tests
pnpm --filter web test path/to/file.test.ts   # Single test file
pnpm --filter web test -- --grep "pattern"    # Pattern matching
```

Framework: Vitest (unit), Playwright (E2E). Tests in `__tests__/` co-located with source.

## Code Style

### Formatting (Prettier)
```json
{ "semi": true, "trailingComma": "es5", "singleQuote": false, "tabWidth": 2, "printWidth": 100 }
```

### Component Pattern
```tsx
interface ButtonProps {
  variant?: "default" | "outline";
  size?: "default" | "sm";
}

export function Button({ variant = "default", size = "default", ...props }: ButtonProps) {
  // ...
}
```

### Styling
- Tailwind utilities only (no CSS modules)
- Use `cn()` for conditional classes: `cn(baseClasses, conditionalClass)`
- Color tokens: `bg-background`, `text-foreground`, `text-foreground-muted`

### TypeScript
- Strict mode enabled
- Explicit return types on exported functions
- Use `type` for object types, `interface` for props

## Import Order

1. React/Next.js
2. Third-party libraries
3. Internal packages (`@chadcn/*`)
4. Internal aliases (`@/components`, `@/lib`, `@/types`)
5. Relative imports
6. Type imports (use `type` keyword)

```tsx
import { useState } from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { RegistryBlock } from "@/types/registry";
import { Button } from "./button";
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlockCard.tsx` |
| Utilities | camelCase | `getBlocksByCategory.ts` |
| Types | PascalCase | `RegistryBlock`, `BlockCardProps` |
| File names | kebab-case | `block-card.tsx` |
| API routes | kebab-case | `[...block]/route.ts` |

## File Organization

```
apps/web/
├── components/ui/     # shadcn primitives
├── components/layout/ # TopBar, Sidebar, Footer
├── components/blocks/ # Block viewer/preview components
├── lib/               # Utilities
├── types/             # TypeScript types
└── content/blocks/    # Block metadata + component code
```

One component per file. Co-locate tests: `Component.test.tsx` next to `Component.tsx`.

## Error Handling

- Return `null` for missing resources (don't throw)
- Early returns for validation failures
- Validate inputs before processing

```ts
export async function getBlock(category: string, name: string): Promise<Block | null> {
  const metadata = await getBlockMetadata(category, name);
  if (!metadata) return null;
  // Process and return
}
```

## Key Patterns

### Server Components (Default)
```tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Component id={id} />;
}
```

### Client Components (When Needed)
```tsx
"use client";
import { useTheme } from "next-themes";
export function ThemeToggle() { /* ... */ }
```

## Before Making Changes

1. Read relevant spec files in `/research/` (PRD.md, SRS.md, UIDD.md, Progress.md)
2. Check if similar patterns exist in codebase
3. Follow existing patterns - don't invent new ones
4. Run `pnpm lint && pnpm type-check` after changes

## Common Tasks

**Add a new block:**
1. Create `apps/web/content/blocks/[category]/[name]/`
2. Add `metadata.json`
3. Add component files (`minimal.tsx`, `standard.tsx`, `feature-rich.tsx`)
4. Run `pnpm --filter web build:registry`

**Test CLI locally:**
```bash
pnpm build:cli && node packages/cli/dist/index.js <command>
```
