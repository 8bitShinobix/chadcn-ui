"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, ChevronDown, Terminal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { BlockVariant } from "@/types/registry";

interface BlockHeaderProps {
  name: string;
  slug: string;
  category: string;
  variants: BlockVariant[];
  currentVariant: BlockVariant;
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagerCommands: Record<PackageManager, (path: string) => string> = {
  pnpm: (path) => `pnpm dlx @chadcn/cli add ${path}`,
  npm: (path) => `npx @chadcn/cli add ${path}`,
  yarn: (path) => `yarn dlx @chadcn/cli add ${path}`,
  bun: (path) => `bunx @chadcn/cli add ${path}`,
};

export function BlockHeader({
  name,
  slug,
  category,
  variants,
  currentVariant,
}: BlockHeaderProps): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");

  const blockPath = `${category}/${slug}`;
  const cliCommand = packageManagerCommands[packageManager](blockPath);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cliCommand);
    toast.success("Copied to clipboard!");
  };

  const handleVariantChange = (variant: BlockVariant) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", variant);
    router.push(`?${params.toString()}`);
  };

  const variantLabels: Record<BlockVariant, string> = {
    minimal: "Minimal",
    standard: "Standard",
    "feature-rich": "Feature Rich",
  };

  return (
    <div className="border-border bg-background sticky top-0 z-10 shrink-0 border-b">
      {/* Main row */}
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-4">
          {/* Breadcrumb - full on md+, collapsed on small */}
          <div className="flex min-w-0 items-center gap-1.5 text-sm">
            {/* Full breadcrumb - hidden on small screens */}
            <Link
              href="/blocks"
              className="text-foreground-muted hover:text-foreground hidden sm:inline"
            >
              Blocks
            </Link>
            <span className="text-foreground-subtle hidden sm:inline">/</span>
            <Link
              href={`/blocks/${category}`}
              className="text-foreground-muted hover:text-foreground hidden capitalize md:inline"
            >
              {category}
            </Link>
            <span className="text-foreground-subtle hidden md:inline">/</span>

            {/* Mobile: show category link */}
            <Link
              href={`/blocks/${category}`}
              className="text-foreground-muted hover:text-foreground capitalize sm:hidden"
            >
              {category}
            </Link>
            <span className="text-foreground-subtle sm:hidden">/</span>

            {/* Block name - always visible, truncate on small screens */}
            <span className="truncate font-medium">{name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Variant switcher */}
          {variants.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {variantLabels[currentVariant]}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {variants.map((variant) => (
                  <DropdownMenuItem
                    key={variant}
                    onClick={() => handleVariantChange(variant)}
                    className={variant === currentVariant ? "bg-accent/10" : undefined}
                  >
                    {variantLabels[variant]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Copy button only - shown on small screens */}
          <Button variant="outline" size="sm" className="gap-2 lg:hidden" onClick={handleCopy}>
            <Copy className="h-3.5 w-3.5" />
            Copy CLI
          </Button>
        </div>
      </div>

      {/* CLI Command Palette - hidden on small screens */}
      <div className="border-border bg-muted hidden border-t lg:block dark:bg-[#1c1c1e]">
        {/* Header with terminal icon, package manager tabs, and copy button */}
        <div className="flex h-10 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Terminal icon */}
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black/5 dark:bg-white/10">
              <Terminal className="text-foreground-muted h-4 w-4" />
            </div>

            {/* Package manager tabs */}
            <div className="flex items-center gap-1">
              {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPackageManager(pm)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
                    packageManager === pm
                      ? "text-foreground bg-black/10 dark:bg-white/15"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* Copy button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground-muted hover:text-foreground h-7 w-7 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy CLI command</span>
          </Button>
        </div>

        {/* Command line */}
        <div className="border-border border-t px-4 py-3">
          <code className="text-foreground-muted font-mono text-sm">{cliCommand}</code>
        </div>
      </div>
    </div>
  );
}
