"use client";

import dynamic from "next/dynamic";
import { BentoCell } from "./bento-cell";
import { Skeleton } from "@/components/ui/skeleton";

// Loading placeholder for dynamic imports
function CellSkeleton(): React.ReactElement {
  return <Skeleton className="h-full w-full rounded-none" />;
}

// ── Dynamic imports (8 blocks, SSR disabled for bundle performance) ──
const PlaygroundFeatureRich = dynamic(
  () => import("@/components/blocks/previews/ai/playground-feature-rich"),
  { ssr: false, loading: CellSkeleton }
);
const LoginFeatureRich = dynamic(
  () => import("@/components/blocks/previews/auth/login-feature-rich"),
  { ssr: false, loading: CellSkeleton }
);
const AiSearchStandard = dynamic(
  () => import("@/components/blocks/previews/ai/ai-search-standard"),
  { ssr: false, loading: CellSkeleton }
);
const StorageBrowserFeatureRich = dynamic(
  () => import("@/components/blocks/previews/cloud/storage-browser-feature-rich"),
  { ssr: false, loading: CellSkeleton }
);
const DeploymentStatusFeatureRich = dynamic(
  () => import("@/components/blocks/previews/cloud/deployment-status-standard"),
  { ssr: false, loading: CellSkeleton }
);
const TwoFactorFeatureRich = dynamic(
  () => import("@/components/blocks/previews/auth/two-factor-standard"),
  { ssr: false, loading: CellSkeleton }
);
const PaymentFormFeatureRich = dynamic(
  () => import("@/components/blocks/previews/billing/payment-form-feature-rich"),
  { ssr: false, loading: CellSkeleton }
);
const DataTableActionStandard = dynamic(
  () => import("@/components/blocks/previews/tables/data-table-actions-standard"),
  { ssr: false, loading: CellSkeleton }
);

// ── Grid: 3 columns, 280px rows, 8 blocks ──────────────────────────────
export function BentoGrid(): React.ReactElement {
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-3">
        {/* ── Row 1-2: AI Playground (hero) + Login + Prompt Input ── */}
        <BentoCell
          label="AI Playground"
          category="AI"
          href="/blocks/ai/playground"
          className="h-75 sm:col-span-2 sm:h-105 lg:row-span-2 lg:h-auto"
          scale={0.92}
        >
          <PlaygroundFeatureRich />
        </BentoCell>

        <BentoCell
          label="Login"
          category="Auth"
          href="/blocks/auth/login"
          className="h-[280px] lg:h-auto"
          scale={0.6}
        >
          <LoginFeatureRich />
        </BentoCell>

        <BentoCell
          label="Prompt Input"
          category="AI"
          href="/blocks/ai/ai-search"
          className="h-[280px] lg:h-auto"
          scale={0.8}
        >
          <AiSearchStandard />
        </BentoCell>

        {/* ── Row 3: Usage Dashboard (wide) + Deployment Status ── */}
        <BentoCell
          label="Storage Browser"
          category="Cloud"
          href="/blocks/cloud/storage-browser"
          className="h-[280px] sm:col-span-2 sm:h-[300px] lg:col-span-2 lg:h-auto"
          scale={0.67}
        >
          <StorageBrowserFeatureRich />
        </BentoCell>

        <BentoCell
          label="Deployment Status"
          category="Cloud"
          href="/blocks/cloud/deployment-status"
          className="hidden h-[280px] sm:block lg:h-auto"
          scale={0.58}
        >
          <DeploymentStatusFeatureRich />
        </BentoCell>

        {/* ── Row 4: Two-Factor + Payment Form + Pricing Table ── */}
        <BentoCell
          label="Two-Factor Auth"
          category="Auth"
          href="/blocks/auth/two-factor"
          className="h-[280px] lg:h-auto"
          scale={0.8}
        >
          <TwoFactorFeatureRich />
        </BentoCell>

        <BentoCell
          label="Payment Form"
          category="Billing"
          href="/blocks/billing/payment-form"
          className="h-[280px] lg:h-auto"
          scale={0.8}
        >
          <PaymentFormFeatureRich />
        </BentoCell>

        <BentoCell
          label="Pricing Table"
          category="Billing"
          href="/blocks/tables/data-table-actions"
          className="hidden h-[280px] sm:block lg:h-auto"
          scale={0.75}
        >
          <DataTableActionStandard />
        </BentoCell>
      </div>
    </div>
  );
}
