/**
 * Build Registry Script
 * Auto-generates content/blocks/registry.json from metadata.json files.
 *
 * Run with: pnpm build:registry
 *
 * Scans content/blocks/[category]/[block]/metadata.json files and
 * generates the master registry.json that the app uses at build time.
 */

import fs from "fs";
import path from "path";

const BLOCKS_DIR = path.join(process.cwd(), "content/blocks");
const REGISTRY_PATH = path.join(BLOCKS_DIR, "registry.json");

interface BlockMetadata {
  name: string;
  slug: string;
  category: string;
  description: string;
  variants: string[];
  dependencies: Record<string, string>;
  registryDependencies: string[];
  files: Record<string, string[]>;
  keywords?: string[];
}

interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

// Category display metadata — add new categories here as you create them
const CATEGORY_META: Record<string, CategoryInfo> = {
  auth: {
    name: "Authentication",
    slug: "auth",
    description: "Login, signup, and authentication flows",
    icon: "KeyRound",
  },
  dashboard: {
    name: "Dashboard",
    slug: "dashboard",
    description: "Dashboard layouts and navigation components",
    icon: "LayoutDashboard",
  },
  tables: {
    name: "Tables",
    slug: "tables",
    description: "Data tables with sorting, filtering, and pagination",
    icon: "Table",
  },
  settings: {
    name: "Settings",
    slug: "settings",
    description: "User profile and application settings pages",
    icon: "Settings",
  },
  billing: {
    name: "Billing",
    slug: "billing",
    description: "Pricing tables, payment forms, and subscription management",
    icon: "CreditCard",
  },
  onboarding: {
    name: "Onboarding",
    slug: "onboarding",
    description: "User onboarding flows and wizards",
    icon: "Rocket",
  },
  states: {
    name: "States",
    slug: "states",
    description: "Empty states, loading skeletons, and error pages",
    icon: "CircleAlert",
  },
};

function buildRegistry(): void {
  console.log("Building block registry...\n");

  // Find all metadata.json files
  const metadataFiles: string[] = [];
  const categories = fs.readdirSync(BLOCKS_DIR, { withFileTypes: true });

  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const catPath = path.join(BLOCKS_DIR, cat.name);
    const blocks = fs.readdirSync(catPath, { withFileTypes: true });

    for (const block of blocks) {
      if (!block.isDirectory()) continue;
      const metaPath = path.join(catPath, block.name, "metadata.json");
      if (fs.existsSync(metaPath)) {
        metadataFiles.push(metaPath);
      }
    }
  }

  if (metadataFiles.length === 0) {
    console.log("No blocks found. Writing empty registry.");
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify({ categories: {}, blocks: {} }, null, 2) + "\n");
    return;
  }

  // Build registry from metadata files
  const registryCategories: Record<string, CategoryInfo> = {};
  const registryBlocks: Record<string, { category: string; name: string }> = {};

  for (const metaPath of metadataFiles) {
    const content = fs.readFileSync(metaPath, "utf-8");
    const metadata: BlockMetadata = JSON.parse(content);

    const key = `${metadata.category}/${metadata.slug}`;
    registryBlocks[key] = {
      category: metadata.category,
      name: metadata.slug,
    };

    // Add category if not already present
    if (!registryCategories[metadata.category]) {
      const catMeta = CATEGORY_META[metadata.category];
      if (catMeta) {
        registryCategories[metadata.category] = catMeta;
      } else {
        // Auto-generate category info for unknown categories
        registryCategories[metadata.category] = {
          name: metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1),
          slug: metadata.category,
          description: `${metadata.category} blocks`,
          icon: "Blocks",
        };
        console.warn(
          `  Warning: Unknown category "${metadata.category}" — add it to CATEGORY_META in build-registry.ts`
        );
      }
    }

    console.log(`  Found: ${key} (${metadata.variants.length} variants)`);
  }

  // Sort blocks alphabetically
  const sortedBlocks = Object.fromEntries(
    Object.entries(registryBlocks).sort(([a], [b]) => a.localeCompare(b))
  );

  const registry = {
    categories: registryCategories,
    blocks: sortedBlocks,
  };

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

  const blockCount = Object.keys(sortedBlocks).length;
  const catCount = Object.keys(registryCategories).length;
  console.log(`\nRegistry built: ${blockCount} blocks across ${catCount} categories`);
  console.log(`Written to: ${REGISTRY_PATH}`);
}

buildRegistry();
