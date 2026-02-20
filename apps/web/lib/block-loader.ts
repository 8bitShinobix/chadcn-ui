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
  "auth/magic-link": {
    minimal: () => import("@/components/blocks/previews/auth/magic-link-minimal"),
    standard: () => import("@/components/blocks/previews/auth/magic-link-standard"),
    "feature-rich": () => import("@/components/blocks/previews/auth/magic-link-feature-rich"),
  },
  "dashboard/sidebar-nav": {
    minimal: () => import("@/components/blocks/previews/dashboard/sidebar-nav-minimal"),
    standard: () => import("@/components/blocks/previews/dashboard/sidebar-nav-standard"),
    "feature-rich": () => import("@/components/blocks/previews/dashboard/sidebar-nav-feature-rich"),
  },
  "dashboard/dashboard-shell": {
    minimal: () => import("@/components/blocks/previews/dashboard/dashboard-shell-minimal"),
    standard: () => import("@/components/blocks/previews/dashboard/dashboard-shell-standard"),
    "feature-rich": () =>
      import("@/components/blocks/previews/dashboard/dashboard-shell-feature-rich"),
  },
  "dashboard/top-nav": {
    minimal: () => import("@/components/blocks/previews/dashboard/top-nav-minimal"),
    standard: () => import("@/components/blocks/previews/dashboard/top-nav-standard"),
    "feature-rich": () => import("@/components/blocks/previews/dashboard/top-nav-feature-rich"),
  },
  // States
  "states/empty": {
    minimal: () => import("@/components/blocks/previews/states/empty-minimal"),
    standard: () => import("@/components/blocks/previews/states/empty-standard"),
    "feature-rich": () => import("@/components/blocks/previews/states/empty-feature-rich"),
  },
  "states/loading": {
    minimal: () => import("@/components/blocks/previews/states/loading-minimal"),
    standard: () => import("@/components/blocks/previews/states/loading-standard"),
    "feature-rich": () => import("@/components/blocks/previews/states/loading-feature-rich"),
  },
  "states/error": {
    minimal: () => import("@/components/blocks/previews/states/error-minimal"),
    standard: () => import("@/components/blocks/previews/states/error-standard"),
    "feature-rich": () => import("@/components/blocks/previews/states/error-feature-rich"),
  },
  "states/success": {
    minimal: () => import("@/components/blocks/previews/states/success-minimal"),
    standard: () => import("@/components/blocks/previews/states/success-standard"),
    "feature-rich": () => import("@/components/blocks/previews/states/success-feature-rich"),
  },
  "states/404": {
    minimal: () => import("@/components/blocks/previews/states/404-minimal"),
    standard: () => import("@/components/blocks/previews/states/404-standard"),
    "feature-rich": () => import("@/components/blocks/previews/states/404-feature-rich"),
  },
  "states/500": {
    minimal: () => import("@/components/blocks/previews/states/500-minimal"),
    standard: () => import("@/components/blocks/previews/states/500-standard"),
    "feature-rich": () => import("@/components/blocks/previews/states/500-feature-rich"),
  },
  "states/maintenance": {
    minimal: () => import("@/components/blocks/previews/states/maintenance-minimal"),
    standard: () => import("@/components/blocks/previews/states/maintenance-standard"),
    "feature-rich": () =>
      import("@/components/blocks/previews/states/maintenance-feature-rich"),
  },
  // Tables
  "tables/data-table": {
    minimal: () => import("@/components/blocks/previews/tables/data-table-minimal"),
    standard: () => import("@/components/blocks/previews/tables/data-table-standard"),
    "feature-rich": () => import("@/components/blocks/previews/tables/data-table-feature-rich"),
  },
  "tables/sortable": {
    minimal: () => import("@/components/blocks/previews/tables/sortable-minimal"),
    standard: () => import("@/components/blocks/previews/tables/sortable-standard"),
    "feature-rich": () => import("@/components/blocks/previews/tables/sortable-feature-rich"),
  },
  "tables/filterable": {
    minimal: () => import("@/components/blocks/previews/tables/filterable-minimal"),
    standard: () => import("@/components/blocks/previews/tables/filterable-standard"),
    "feature-rich": () => import("@/components/blocks/previews/tables/filterable-feature-rich"),
  },
  "tables/data-table-actions": {
    minimal: () => import("@/components/blocks/previews/tables/data-table-actions-minimal"),
    standard: () => import("@/components/blocks/previews/tables/data-table-actions-standard"),
    "feature-rich": () =>
      import("@/components/blocks/previews/tables/data-table-actions-feature-rich"),
  },
  // Settings
  "settings/profile": {
    minimal: () => import("@/components/blocks/previews/settings/profile-minimal"),
    standard: () => import("@/components/blocks/previews/settings/profile-standard"),
    "feature-rich": () => import("@/components/blocks/previews/settings/profile-feature-rich"),
  },
  "settings/account": {
    minimal: () => import("@/components/blocks/previews/settings/account-minimal"),
    standard: () => import("@/components/blocks/previews/settings/account-standard"),
    "feature-rich": () => import("@/components/blocks/previews/settings/account-feature-rich"),
  },
  "settings/notifications": {
    minimal: () => import("@/components/blocks/previews/settings/notifications-minimal"),
    standard: () => import("@/components/blocks/previews/settings/notifications-standard"),
    "feature-rich": () =>
      import("@/components/blocks/previews/settings/notifications-feature-rich"),
  },
  "settings/security": {
    minimal: () => import("@/components/blocks/previews/settings/security-minimal"),
    standard: () => import("@/components/blocks/previews/settings/security-standard"),
    "feature-rich": () => import("@/components/blocks/previews/settings/security-feature-rich"),
  },
  "settings/api-keys": {
    minimal: () => import("@/components/blocks/previews/settings/api-keys-minimal"),
    standard: () => import("@/components/blocks/previews/settings/api-keys-standard"),
    "feature-rich": () => import("@/components/blocks/previews/settings/api-keys-feature-rich"),
  },
  "settings/appearance": {
    minimal: () => import("@/components/blocks/previews/settings/appearance-minimal"),
    standard: () => import("@/components/blocks/previews/settings/appearance-standard"),
    "feature-rich": () => import("@/components/blocks/previews/settings/appearance-feature-rich"),
  },
  // Billing
  "billing/pricing-table": {
    minimal: () => import("@/components/blocks/previews/billing/pricing-table-minimal"),
    standard: () => import("@/components/blocks/previews/billing/pricing-table-standard"),
    "feature-rich": () => import("@/components/blocks/previews/billing/pricing-table-feature-rich"),
  },
  "billing/plan-selection": {
    minimal: () => import("@/components/blocks/previews/billing/plan-selection-minimal"),
    standard: () => import("@/components/blocks/previews/billing/plan-selection-standard"),
    "feature-rich": () =>
      import("@/components/blocks/previews/billing/plan-selection-feature-rich"),
  },
  "billing/payment-form": {
    minimal: () => import("@/components/blocks/previews/billing/payment-form-minimal"),
    standard: () => import("@/components/blocks/previews/billing/payment-form-standard"),
    "feature-rich": () => import("@/components/blocks/previews/billing/payment-form-feature-rich"),
  },
  "billing/invoice-history": {
    minimal: () => import("@/components/blocks/previews/billing/invoice-history-minimal"),
    standard: () => import("@/components/blocks/previews/billing/invoice-history-standard"),
    "feature-rich": () =>
      import("@/components/blocks/previews/billing/invoice-history-feature-rich"),
  },
  "billing/usage-meter": {
    minimal: () => import("@/components/blocks/previews/billing/usage-meter-minimal"),
    standard: () => import("@/components/blocks/previews/billing/usage-meter-standard"),
    "feature-rich": () => import("@/components/blocks/previews/billing/usage-meter-feature-rich"),
  },
  // Onboarding
  "onboarding/wizard": {
    minimal: () => import("@/components/blocks/previews/onboarding/wizard-minimal"),
    standard: () => import("@/components/blocks/previews/onboarding/wizard-standard"),
    "feature-rich": () => import("@/components/blocks/previews/onboarding/wizard-feature-rich"),
  },
  "onboarding/checklist": {
    minimal: () => import("@/components/blocks/previews/onboarding/checklist-minimal"),
    standard: () => import("@/components/blocks/previews/onboarding/checklist-standard"),
    "feature-rich": () => import("@/components/blocks/previews/onboarding/checklist-feature-rich"),
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
