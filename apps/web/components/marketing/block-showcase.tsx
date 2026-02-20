"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamic imports — SSR disabled to keep marketing page bundle lean
const PaymentForm = dynamic(
  () => import("@/components/blocks/previews/billing/payment-form-feature-rich"),
  { ssr: false }
);
const Login = dynamic(
  () => import("@/components/blocks/previews/auth/login-feature-rich"),
  { ssr: false }
);
const Account = dynamic(
  () => import("@/components/blocks/previews/settings/account-feature-rich"),
  { ssr: false }
);
const TwoFactor = dynamic(
  () => import("@/components/blocks/previews/auth/two-factor-feature-rich"),
  { ssr: false }
);
const Notifications = dynamic(
  () => import("@/components/blocks/previews/settings/notifications-feature-rich"),
  { ssr: false }
);
const Security = dynamic(
  () => import("@/components/blocks/previews/settings/security-feature-rich"),
  { ssr: false }
);
const Profile = dynamic(
  () => import("@/components/blocks/previews/settings/profile-feature-rich"),
  { ssr: false }
);
const UsageMeter = dynamic(
  () => import("@/components/blocks/previews/billing/usage-meter-feature-rich"),
  { ssr: false }
);
const InvoiceHistory = dynamic(
  () => import("@/components/blocks/previews/billing/invoice-history-feature-rich"),
  { ssr: false }
);

function ShowcaseCell({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}): React.ReactElement {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg",
        className
      )}
    >
      <div
        className="pointer-events-none origin-top-left scale-[0.65]"
        style={{ width: "154%" }}
      >
        {children}
      </div>

      {/* Bottom fade + label */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-background via-background/80 to-transparent px-4 pb-3 pt-12">
        <span className="text-[13px] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}

export function BlockShowcase(): React.ReactElement {
  return (
    <div className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[320px] lg:grid-cols-3">
      {/* Row 1: Payment Form, Login, Account */}
      <ShowcaseCell label="Payment Form">
        <PaymentForm />
      </ShowcaseCell>
      <ShowcaseCell label="Login">
        <Login />
      </ShowcaseCell>
      <ShowcaseCell className="row-span-2 hidden sm:block" label="Account">
        <Account />
      </ShowcaseCell>

      {/* Row 2: Two-Factor Auth */}
      <ShowcaseCell label="Two-Factor Auth">
        <TwoFactor />
      </ShowcaseCell>

      {/* Row 3: Notifications, Security, Profile */}
      <ShowcaseCell className="hidden lg:block" label="Notifications">
        <Notifications />
      </ShowcaseCell>
      <ShowcaseCell className="hidden sm:block" label="Security">
        <Security />
      </ShowcaseCell>
      <ShowcaseCell className="hidden lg:block" label="Usage Meter">
        <UsageMeter />
      </ShowcaseCell>
      <ShowcaseCell className="hidden sm:block" label="Invoice History">
        <InvoiceHistory />
      </ShowcaseCell>
    </div>
  );
}
