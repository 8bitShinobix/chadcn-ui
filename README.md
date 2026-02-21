# chadcn

Production-ready SaaS blocks for React. Copy, paste, and ship.

Built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui.

---

## What is chadcn?

chadcn is a library of **complete, production-ready UI blocks** for SaaS applications. Not just components — full screens and workflows with real-world states (loading, error, empty, success), form validation, and responsive design out of the box.

Every block is **copy-pasteable or CLI-installable**. You own 100% of the code. No dependency lock-in, no version conflicts, no breaking changes from library updates.

### Why chadcn?

- **Production-quality** — Real forms with validation (Zod + React Hook Form), loading states, error handling. Not happy-path-only demos.
- **Multiple variants** — Each block ships with Minimal, Standard, and Feature-rich variants. Start simple, upgrade when needed.
- **Own the code** — Copy it into your project and modify freely. It's yours.
- **shadcn-compatible** — Built on the same primitives (Radix UI, Tailwind CSS, CVA). Drops right into any shadcn project.
- **Dark mode included** — Every block works in both light and dark themes.

---

## Block Categories

| Category | Blocks | Description |
|----------|--------|-------------|
| **AI Interfaces** | 8 | Chat, prompt input, message card, copilot sidebar, AI search, playground, token usage, generation gallery |
| **Authentication** | 8 | Login, signup, forgot password, reset password, verify email, two-factor, OAuth buttons, magic link |
| **Dashboard** | 3 | Sidebar navigation, dashboard shell, top navigation |
| **Tables** | 4 | Data table, sortable table, filterable table, table actions |
| **Settings** | 6 | Profile, account, notifications, security, API keys, appearance |
| **Billing** | 5 | Pricing table, plan selection, payment form, invoice history, usage meter |
| **Onboarding** | 2 | Multi-step wizard, checklist |
| **States** | 7 | Empty state, loading skeleton, error state, success, 404 page, 500 page, maintenance |

**43 blocks total**, each with 3 variants (minimal, standard, feature-rich) = **129 component variants**.

### All Blocks

**AI Interfaces** (8 blocks)
- `ai/chat` — Full AI chat interface with streaming text and markdown rendering
- `ai/prompt-input` — AI prompt bar with attachments, model selector, and actions
- `ai/message-card` — AI response cards with reasoning blocks, citations, and feedback
- `ai/copilot-sidebar` — Side panel AI assistant with tool calls and context awareness
- `ai/ai-search` — Perplexity-style search with citation-forward answers and source cards
- `ai/playground` — Model testing sandbox with parameter controls and comparison mode
- `ai/token-usage` — Token/cost monitoring dashboard with model breakdown and projections
- `ai/generation-gallery` — AI image generation gallery with lightbox and batch queue

**Authentication** (8 blocks)
- `auth/login` — Email + password login with OAuth options
- `auth/signup` — Registration with password strength and terms acceptance
- `auth/forgot-password` — Password reset request with email verification
- `auth/reset-password` — New password form with strength indicator
- `auth/verify-email` — OTP input with resend and cooldown timer
- `auth/two-factor` — 2FA code input with backup code toggle
- `auth/oauth-buttons` — Social login buttons (Google, GitHub, Apple, Microsoft, Twitter)
- `auth/magic-link` — Passwordless login via email magic link

**Dashboard** (3 blocks)
- `dashboard/sidebar-nav` — Collapsible sidebar with nested navigation
- `dashboard/dashboard-shell` — Content layout with header bar and stat cards
- `dashboard/top-nav` — Horizontal navigation with search and user menu

**Tables** (4 blocks)
- `tables/data-table` — Data display with checkboxes, badges, and row actions
- `tables/sortable` — Column sorting with direction indicators and pagination
- `tables/filterable` — Search input with filter dropdowns and active filter chips
- `tables/data-table-actions` — Table with inline and bulk action controls

**Settings** (6 blocks)
- `settings/profile` — Personal info form with avatar upload
- `settings/account` — Username, language, connected accounts, danger zone
- `settings/notifications` — Channel toggles with per-category granular controls
- `settings/security` — Password change, 2FA toggle, active sessions
- `settings/api-keys` — API key management with create, revoke, and permissions
- `settings/appearance` — Theme, accent color, font size, and density preferences

**Billing** (5 blocks)
- `billing/pricing-table` — Plan comparison cards with feature checklist
- `billing/plan-selection` — Interactive plan picker with billing toggle
- `billing/payment-form` — Card/bank payment with billing address and order summary
- `billing/invoice-history` — Invoice table with status badges and download actions
- `billing/usage-meter` — Resource usage bars with color-coded thresholds

**Onboarding** (2 blocks)
- `onboarding/wizard` — Multi-step form with step indicators and navigation
- `onboarding/checklist` — Task checklist with progress tracking

**States** (7 blocks)
- `states/empty` — No-data placeholders with call-to-action prompts
- `states/loading` — Skeleton loading placeholders mimicking content layout
- `states/error` — Error displays with retry actions and error details
- `states/success` — Confirmation screens with summary details
- `states/404` — Page not found with search and popular links
- `states/500` — Server error with system status indicators
- `states/maintenance` — Scheduled maintenance page with status and countdown

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | [TypeScript](https://typescriptlang.org) (strict mode) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| UI Primitives | [shadcn/ui](https://ui.shadcn.com) (Radix UI + CVA) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Content | [MDX](https://mdxjs.com) via next-mdx-remote |
| Syntax Highlighting | [Shiki](https://shiki.style) |
| Icons | [Lucide React](https://lucide.dev) |
| Dark Mode | [next-themes](https://github.com/pacocoursey/next-themes) |
| Toasts | [Sonner](https://sonner.emilkowal.dev) |
| Package Manager | [pnpm](https://pnpm.io) (monorepo) |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chadcn.git
cd chadcn

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the docs site.

### Using a Block

**Option 1: Copy-paste**

Browse to a block on the docs site, switch to the Code tab, and copy the component file into your project.

**Option 2: CLI** (coming soon)

```bash
npx @chadcn/cli add auth/login
```

The CLI fetches the block files, installs npm dependencies, and scaffolds everything into your project.

---

## Project Structure

This is a pnpm monorepo with two packages:

```
chadcn/
├── apps/
│   └── web/                          # Documentation site + block demos
│       ├── app/
│       │   ├── (marketing)/          # Homepage
│       │   ├── (site)/(docs)/        # Docs + block pages (with sidebar)
│       │   │   ├── docs/[...slug]/   # MDX documentation pages
│       │   │   └── blocks/           # Block listing + detail pages
│       │   └── (preview)/            # Isolated block preview (iframe)
│       ├── components/
│       │   ├── ui/                   # shadcn primitives (Button, Input, etc.)
│       │   ├── layout/              # TopBar, Sidebar, MobileNav, Logo
│       │   ├── blocks/              # BlockViewer, BlockPreview, CodePanel
│       │   └── docs/                # MDX components, TOC, CodeBlock
│       ├── content/
│       │   ├── blocks/              # Block source code + metadata
│       │   │   ├── registry.json    # Auto-generated master index (43 blocks)
│       │   │   ├── ai/              # 8 blocks (chat, prompt-input, playground, ...)
│       │   │   ├── auth/            # 8 blocks (login, signup, magic-link, ...)
│       │   │   ├── dashboard/       # 3 blocks (sidebar-nav, dashboard-shell, top-nav)
│       │   │   ├── tables/          # 4 blocks (data-table, sortable, filterable, actions)
│       │   │   ├── settings/        # 6 blocks (profile, account, appearance, ...)
│       │   │   ├── billing/         # 5 blocks (pricing-table, payment-form, ...)
│       │   │   ├── onboarding/      # 2 blocks (wizard, checklist)
│       │   │   └── states/          # 7 blocks (empty, loading, error, maintenance, ...)
│       │   └── docs/                # MDX documentation files
│       ├── config/                  # Navigation, site config
│       ├── lib/                     # Utilities (registry, mdx, highlight)
│       ├── scripts/                 # Build scripts
│       ├── stores/                  # Zustand stores
│       └── types/                   # TypeScript types
│
├── packages/
│   └── cli/                         # @chadcn/cli
│       └── src/                     # Commander-based CLI
│
├── research/                        # Specification documents
│   ├── PRD.md                       # Product requirements
│   ├── SRS.md                       # Software requirements
│   ├── UIDD.md                      # UI design document
│   └── Progress.md                  # Phase tracking
│
├── CLAUDE.md                        # AI assistant instructions
└── pnpm-workspace.yaml
```

---

## Block Architecture

Blocks are the core of chadcn. Each block is a self-contained folder with metadata and variant files.

### Block Structure

```
content/blocks/auth/login/
├── metadata.json       # Block metadata, dependencies, variants
├── minimal.tsx         # Minimal variant
├── standard.tsx        # Standard variant (default)
└── feature-rich.tsx    # Feature-rich variant
```

### metadata.json

```json
{
  "name": "Login Form",
  "slug": "login",
  "category": "auth",
  "description": "A complete login form with email and password authentication.",
  "variants": ["minimal", "standard", "feature-rich"],
  "dependencies": {
    "zod": "^3.22.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0"
  },
  "registryDependencies": ["button", "input", "label"],
  "files": {
    "minimal": ["minimal.tsx"],
    "standard": ["standard.tsx"],
    "feature-rich": ["feature-rich.tsx"]
  },
  "keywords": ["login", "auth", "sign in", "email", "password"]
}
```

**Fields:**
- `variants` — Available complexity levels for this block
- `dependencies` — npm packages the block requires (installed by CLI)
- `registryDependencies` — shadcn/ui components the block uses
- `files` — Maps each variant to its source files
- `keywords` — For search indexing

### Registry

The master `registry.json` is **auto-generated** from all `metadata.json` files:

```bash
pnpm --filter web build:registry
```

This scans `content/blocks/*/*/metadata.json` and produces `content/blocks/registry.json`. You never edit the registry file manually.

### How Blocks Are Served

```
User browses docs site
  → /blocks/auth/login page (pre-rendered at build time)
  → Reads metadata.json + variant .tsx files
  → Displays live preview (iframe) + syntax-highlighted code

User with CLI
  → npx @chadcn/cli add auth/login
  → GET /api/registry/auth/login
  → Returns { files, dependencies, registryDependencies }
  → CLI writes files to user's project
```

---

## Adding a New Block

1. **Create the folder:**
   ```bash
   mkdir -p apps/web/content/blocks/[category]/[name]
   ```

2. **Add `metadata.json`:**
   ```json
   {
     "name": "Block Display Name",
     "slug": "block-slug",
     "category": "category-slug",
     "description": "What this block does.",
     "variants": ["minimal", "standard", "feature-rich"],
     "dependencies": {},
     "registryDependencies": ["button"],
     "files": {
       "minimal": ["minimal.tsx"],
       "standard": ["standard.tsx"],
       "feature-rich": ["feature-rich.tsx"]
     },
     "keywords": ["keyword1", "keyword2"]
   }
   ```

3. **Create variant files** (`minimal.tsx`, `standard.tsx`, `feature-rich.tsx`):
   ```tsx
   "use client"

   import { Button } from "@/components/ui/button"

   export function MyBlock() {
     return (
       <div>
         <Button>Click me</Button>
       </div>
     )
   }
   ```

4. **Regenerate the registry:**
   ```bash
   pnpm --filter web build:registry
   ```

5. **Verify** — visit `http://localhost:3000/blocks/[category]/[block-slug]`

### Block Conventions

- Use `"use client"` directive — blocks are interactive components
- Import shadcn primitives from `@/components/ui/*`
- Export a single named function (e.g., `LoginForm`, `DataTable`)
- Use Tailwind utilities only, no CSS modules
- Include all real-world states: loading, error, empty, success
- Use `cn()` for conditional classes

---

## Available Scripts

Run from the **repository root**:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the docs site dev server (localhost:3000) |
| `pnpm build` | Build the docs site for production |
| `pnpm build:cli` | Build the @chadcn/cli package |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format all packages with Prettier |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm test` | Run tests across all packages |

Run from **apps/web**:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm build:registry` | Auto-generate registry.json from metadata files |
| `pnpm build:search` | Build the search index |
| `pnpm type-check` | Type-check the web app |
| `pnpm lint:fix` | Lint and auto-fix |

---

## Design System

### Colors

Dark theme is the default. Light mode is fully supported via `next-themes`.

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--background` | `#0a0a0a` | `#ffffff` | Page background |
| `--foreground` | `#fafafa` | `#0a0a0a` | Primary text |
| `--muted-foreground` | `#a1a1aa` | `#71717a` | Secondary text |
| `--accent` | `#0070f3` | `#0070f3` | Links, interactive elements |
| `--destructive` | `#ef4444` | `#ef4444` | Error states |
| `--border` | `#27272a` | `#e4e4e7` | Borders, dividers |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Body / UI | Inter | 400, 500, 600, 700 |
| Code | JetBrains Mono | 400 |

### Layout Dimensions

| Element | Size |
|---------|------|
| Top bar | 56px |
| Sidebar | 240px |
| Border radius (cards) | 8px |
| Border radius (buttons) | 6px |
| Border radius (inputs) | 4px |

---

## Rendering Strategy

| Route Type | Strategy | Example |
|------------|----------|---------|
| Documentation | Static (SSG) | `/docs/*`, `/blocks/*` |
| Block previews | Static (SSG) | `/preview/auth/login` |
| API routes | Edge Functions | `/api/registry/*`, `/api/search` |
| Interactive UI | Client Components | Theme toggle, code panel, command palette |

Server Components are the default. Client Components (`"use client"`) are used only where interactivity is needed.

---

## Roadmap

chadcn is in active development. Current status: **All 43 blocks implemented across 8 categories**.

### Completed
- [x] Core layout and navigation (TopBar, Sidebar, Footer, MobileNav)
- [x] MDX content system for documentation
- [x] Theme system with dark/light mode
- [x] Block registry with auto-generated registry.json
- [x] Authentication blocks (8 blocks)
- [x] Dashboard blocks (3 blocks)
- [x] Tables blocks (4 blocks)
- [x] Settings blocks (6 blocks)
- [x] Billing blocks (5 blocks)
- [x] Onboarding blocks (2 blocks)
- [x] States blocks (7 blocks)
- [x] AI Interfaces blocks (8 blocks)

### In Progress
- [ ] Block preview system with viewport switcher
- [ ] Block registry API endpoints
- [ ] Search with command palette (Cmd+K)

### Planned
- [ ] CLI implementation (`npx @chadcn/cli add`)
- [ ] Theming customization guide
- [ ] Community block contributions
- [ ] Integration guides (Supabase, Clerk)

See [research/Progress.md](research/Progress.md) for the full phase-by-phase breakdown.

---

## Code Conventions

**Components**: PascalCase files, function declarations, props interface above component.

**Imports** (in order):
1. React / Next.js
2. Third-party libraries
3. Internal aliases (`@/components`, `@/lib`)
4. Relative imports
5. Types (with `type` keyword)

**Styling**: Tailwind utilities only. Use `cn()` for conditional classes. Follow color tokens from the design system.

**TypeScript**: Strict mode. Explicit return types on exported functions.

---

## License

MIT - [8bitShinobi](https://github.com/8bitShinobi)
