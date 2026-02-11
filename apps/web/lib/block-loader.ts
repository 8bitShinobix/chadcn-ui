/**
 * Block Loader Utility
 * Provides dynamic loading of block components for preview rendering
 */

import type { ComponentType } from "react";
import type { BlockVariant } from "@/types/registry";

// Type for block component
type BlockComponent = ComponentType<Record<string, never>>;

// Registry of block components
// For now, hardcoded mapping for demo blocks
// In future phases, this could be dynamically generated

interface BlockRegistry {
  [key: string]: {
    [variant in BlockVariant]?: () => Promise<
      { default: BlockComponent } | { [key: string]: BlockComponent }
    >;
  };
}

// Map of block slugs to their component imports
// Format: "category/slug" -> { variant: () => import() }
const blockRegistry: BlockRegistry = {
  "auth/login": {
    minimal: () => import("@/components/blocks/previews/auth/login-minimal"),
    standard: () => import("@/components/blocks/previews/auth/login-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/login-feature-rich"),
  },
  "auth/signup": {
    minimal: () => import("@/components/blocks/previews/auth/signup-minimal"),
    standard: () => import("@/components/blocks/previews/auth/signup-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/signup-feature-rich"),
  },
  "auth/forgot-password": {
    minimal: () => import("@/components/blocks/previews/auth/forgot-password-minimal"),
    standard: () => import("@/components/blocks/previews/auth/forgot-password-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/forgot-password-feature-rich"),
  },
  "auth/reset-password": {
    minimal: () => import("@/components/blocks/previews/auth/reset-password-minimal"),
    standard: () => import("@/components/blocks/previews/auth/reset-password-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/reset-password-feature-rich"),
  },
  "auth/verify-email": {
    minimal: () => import("@/components/blocks/previews/auth/verify-email-minimal"),
    standard: () => import("@/components/blocks/previews/auth/verify-email-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/verify-email-feature-rich"),
  },
  "auth/two-factor": {
    minimal: () => import("@/components/blocks/previews/auth/two-factor-minimal"),
    standard: () => import("@/components/blocks/previews/auth/two-factor-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/two-factor-feature-rich"),
  },
  "auth/oauth-buttons": {
    minimal: () => import("@/components/blocks/previews/auth/oauth-buttons-minimal"),
    standard: () => import("@/components/blocks/previews/auth/oauth-buttons-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/oauth-buttons-feature-rich"),
  },
};

/**
 * Load a block component dynamically
 */
export async function loadBlockComponent(
  category: string,
  block: string,
  variant: BlockVariant = "standard"
): Promise<BlockComponent | null> {
  const key = `${category}/${block}`;
  const blockImports = blockRegistry[key];

  if (!blockImports) {
    console.warn(`Block not found in registry: ${key}`);
    return null;
  }

  const importFn = blockImports[variant] || blockImports.standard || Object.values(blockImports)[0];

  if (!importFn) {
    console.warn(`Variant not found: ${variant} for block ${key}`);
    return null;
  }

  try {
    const mod = await importFn();
    // Handle both default exports and named exports
    if ("default" in mod) {
      return mod.default;
    }
    // Try to find a component export (LoginForm, SignupForm, etc.)
    const componentExport = Object.values(mod).find((exp) => typeof exp === "function") as
      | BlockComponent
      | undefined;
    return componentExport || null;
  } catch (error) {
    console.error(`Failed to load block component: ${key}`, error);
    return null;
  }
}

/**
 * Check if a block has preview components available
 */
export function hasPreview(category: string, block: string): boolean {
  const key = `${category}/${block}`;
  return key in blockRegistry;
}

/**
 * Get available variants for a block preview
 */
export function getPreviewVariants(category: string, block: string): BlockVariant[] {
  const key = `${category}/${block}`;
  const blockImports = blockRegistry[key];

  if (!blockImports) return [];

  return Object.keys(blockImports) as BlockVariant[];
}
