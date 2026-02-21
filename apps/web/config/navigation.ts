import {
  LucideIcon,
  KeyRound,
  LayoutDashboard,
  Table,
  Settings,
  CreditCard,
  Rocket,
  CircleAlert,
  Sparkles,
} from "lucide-react";

// Types
export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  badge?: string;
}

export interface NavCategory {
  title: string;
  icon?: LucideIcon;
  items: NavItem[];
}

// Main nav (TopBar)
export const mainNav: NavItem[] = [
  { title: "Docs", href: "/docs" },
  { title: "Blocks", href: "/blocks" },
];

// Sidebar categories
export const blockCategories: NavCategory[] = [
  {
    title: "AI Interfaces",
    icon: Sparkles,
    items: [
      { title: "Chat", href: "/blocks/ai/chat" },
      { title: "Prompt Input", href: "/blocks/ai/prompt-input" },
      { title: "Message Card", href: "/blocks/ai/message-card" },
      { title: "Copilot Sidebar", href: "/blocks/ai/copilot-sidebar" },
      { title: "AI Search", href: "/blocks/ai/ai-search" },
      { title: "Playground", href: "/blocks/ai/playground" },
      { title: "Token Usage", href: "/blocks/ai/token-usage" },
      { title: "Generation Gallery", href: "/blocks/ai/generation-gallery" },
    ],
  },
  {
    title: "Authentication",
    icon: KeyRound,
    items: [
      { title: "Login", href: "/blocks/auth/login" },
      { title: "Signup", href: "/blocks/auth/signup" },
      { title: "Forgot Password", href: "/blocks/auth/forgot-password" },
      { title: "Reset Password", href: "/blocks/auth/reset-password" },
      { title: "OAuth Buttons", href: "/blocks/auth/oauth-buttons" },
      { title: "Verify Email", href: "/blocks/auth/verify-email" },
      { title: "Two-Factor Auth", href: "/blocks/auth/two-factor" },
      { title: "Magic Link", href: "/blocks/auth/magic-link" },
    ],
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { title: "Sidebar Navigation", href: "/blocks/dashboard/sidebar-nav" },
      { title: "Dashboard Shell", href: "/blocks/dashboard/dashboard-shell" },
      { title: "Top Navigation", href: "/blocks/dashboard/top-nav" },
    ],
  },
  {
    title: "Tables",
    icon: Table,
    items: [
      { title: "Data Table", href: "/blocks/tables/data-table" },
      { title: "Sortable Table", href: "/blocks/tables/sortable" },
      { title: "Filterable Table", href: "/blocks/tables/filterable" },
      { title: "Table Actions", href: "/blocks/tables/data-table-actions" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "Profile", href: "/blocks/settings/profile" },
      { title: "Account", href: "/blocks/settings/account" },
      { title: "Notifications", href: "/blocks/settings/notifications" },
      { title: "Security", href: "/blocks/settings/security" },
      { title: "API Keys", href: "/blocks/settings/api-keys" },
      { title: "Appearance", href: "/blocks/settings/appearance" },
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    items: [
      { title: "Pricing Table", href: "/blocks/billing/pricing-table" },
      { title: "Plan Selection", href: "/blocks/billing/plan-selection" },
      { title: "Payment Form", href: "/blocks/billing/payment-form" },
      { title: "Invoice History", href: "/blocks/billing/invoice-history" },
      { title: "Usage Meter", href: "/blocks/billing/usage-meter" },
    ],
  },
  {
    title: "Onboarding",
    icon: Rocket,
    items: [
      { title: "Multi-Step Wizard", href: "/blocks/onboarding/wizard" },
      { title: "Checklist", href: "/blocks/onboarding/checklist" },
    ],
  },
  {
    title: "States",
    icon: CircleAlert,
    items: [
      { title: "Empty State", href: "/blocks/states/empty" },
      { title: "Loading Skeleton", href: "/blocks/states/loading" },
      { title: "Error State", href: "/blocks/states/error" },
      { title: "Success", href: "/blocks/states/success" },
      { title: "404 Page", href: "/blocks/states/404" },
      { title: "500 Page", href: "/blocks/states/500" },
      { title: "Maintenance", href: "/blocks/states/maintenance" },
    ],
  },
];

// Footer nav
export const footerNav = {
  product: [
    { title: "Blocks", href: "/blocks" },
    { title: "Pricing", href: "/pricing" },
  ],
  resources: [
    { title: "Documentation", href: "/docs" },
    { title: "GitHub", href: "https://github.com/...", external: true },
  ],
};

// Social links
export const socialLinks = {
  github: "https://github.com/your-username/chadcn",
  twitter: "https://twitter.com/...",
  discord: "https://discord.gg/...",
};
