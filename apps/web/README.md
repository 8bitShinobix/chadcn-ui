# chadcn — Documentation Site

The documentation site and block demo application for chadcn. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4.

## Running Locally

```bash
# From the repo root
pnpm dev

# Or from this directory
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Directories

```
app/
  (marketing)/          # Homepage (no sidebar)
  (site)/(docs)/        # Docs shell with sidebar
    docs/[...slug]/     # MDX documentation pages
    blocks/[category]/  # Block category + detail pages
  (preview)/            # Isolated block preview (iframe)
  api/                  # Registry and search API routes

content/
  blocks/               # Block source code + metadata (35+ blocks)
    registry.json       # Auto-generated master index
    auth/               # 8 blocks
    dashboard/          # 3 blocks
    tables/             # 4 blocks
    settings/           # 6 blocks
    billing/            # 5 blocks
    onboarding/         # 2 blocks
    states/             # 7 blocks
  docs/                 # MDX documentation files

components/
  ui/                   # shadcn primitives (Button, Input, etc.)
  layout/               # TopBar, Sidebar, Footer, MobileNav
  blocks/               # BlockViewer, BlockPreview, preview components
  docs/                 # MDX components, TOC, CodeBlock
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm build:registry` | Regenerate registry.json from metadata files |
| `pnpm build:search` | Build the search index |
| `pnpm type-check` | Type-check with tsc |
| `pnpm lint` | Run ESLint |

## Block Architecture

Each block lives in `content/blocks/[category]/[slug]/` with:
- `metadata.json` — Name, description, dependencies, variants, keywords
- `minimal.tsx` — Simplest variant (named export)
- `standard.tsx` — Balanced variant with validation/interactivity
- `feature-rich.tsx` — Production-ready with all features

Preview mirrors in `components/blocks/previews/[category]/` use default exports for iframe rendering.

See the [root README](../../README.md) for full project documentation.
