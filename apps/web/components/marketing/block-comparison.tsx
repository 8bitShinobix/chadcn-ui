"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import LoginMinimal from "@/components/blocks/previews/auth/login-minimal";
import LoginFeatureRich from "@/components/blocks/previews/auth/login-feature-rich";

type SubTab = "preview" | "code";

interface HighlightedCode {
  dark: string;
  light: string;
}

interface BlockComparisonProps {
  genericHighlighted: HighlightedCode;
  chadcnHighlighted: HighlightedCode;
}

function PanelSide({
  label,
  sublabel,
  badge,
  preview,
  highlightedCode,
}: {
  label: string;
  sublabel: string;
  badge?: "muted" | "accent";
  preview: React.ReactNode;
  highlightedCode: HighlightedCode;
}): React.ReactElement {
  const [subTab, setSubTab] = useState<SubTab>("preview");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              badge === "accent"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            )}
          >
            {label}
          </span>
          <span className="text-muted-foreground text-xs">{sublabel}</span>
        </div>
        <div className="border-border bg-muted/50 flex gap-0.5 rounded-lg border p-0.5">
          <button
            onClick={() => setSubTab("preview")}
            className={cn(
              "rounded-md px-3 py-1 text-[11px] font-medium transition-all",
              subTab === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setSubTab("code")}
            className={cn(
              "rounded-md px-3 py-1 text-[11px] font-medium transition-all",
              subTab === "code"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Code
          </button>
        </div>
      </div>

      {/* Panel content */}
      <div
        className={cn(
          "border-border h-[560px] overflow-auto border-t",
          subTab === "preview"
            ? "flex items-center justify-center bg-[image:radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] p-4"
            : "p-0"
        )}
      >
        {subTab === "preview" ? (
          <div className="w-full origin-top scale-90">{preview}</div>
        ) : (
          <div
            className="overflow-auto text-[13px] leading-[1.7] [&_code]:!bg-transparent [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!p-5"
            dangerouslySetInnerHTML={{
              __html: isDark ? highlightedCode.dark : highlightedCode.light,
            }}
          />
        )}
      </div>
    </div>
  );
}

export function BlockComparison({
  genericHighlighted,
  chadcnHighlighted,
}: BlockComparisonProps): React.ReactElement {
  return (
    <div className="border-border bg-background overflow-hidden rounded-2xl border shadow-lg">
      <div className="flex flex-col lg:flex-row">
        <PanelSide
          label="Generic"
          sublabel="Basic shadcn/ui sign in"
          badge="muted"
          preview={<LoginMinimal />}
          highlightedCode={genericHighlighted}
        />
        {/* Gradient divider */}
        <div className="relative hidden lg:block">
          <div className="via-border absolute inset-0 w-px bg-gradient-to-b from-transparent to-transparent" />
        </div>
        <div className="border-border border-b lg:hidden" />
        <PanelSide
          label="chadcn"
          sublabel="Feature-rich sign in"
          badge="accent"
          preview={<LoginFeatureRich />}
          highlightedCode={chadcnHighlighted}
        />
      </div>
    </div>
  );
}
