"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Fullscreen,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { RegistryBlock, BlockCategory, BlockVariant } from "@/types/registry";

interface PlaygroundClientProps {
  blocks: RegistryBlock[];
  categories: BlockCategory[];
}

type PlaygroundMode = "blocks" | "sandbox";
type Viewport = "desktop" | "tablet" | "mobile";

const viewportWidths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

const variantLabels: Record<BlockVariant, string> = {
  minimal: "Minimal",
  standard: "Standard",
  "feature-rich": "Feature Rich",
};

const viewportIcons: { key: Viewport; icon: typeof Monitor; label: string }[] = [
  { key: "desktop", icon: Monitor, label: "Desktop" },
  { key: "tablet", icon: Tablet, label: "Tablet" },
  { key: "mobile", icon: Smartphone, label: "Mobile" },
];

export function PlaygroundClient({ blocks, categories }: PlaygroundClientProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<PlaygroundMode>("blocks");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Block selection state
  const [selectedBlockKey, setSelectedBlockKey] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<BlockVariant>("standard");

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  // Sync preview theme with app theme on mount
  useEffect(() => {
    if (mounted && resolvedTheme) {
      setPreviewTheme(resolvedTheme === "dark" ? "dark" : "light");
    }
  }, [mounted, resolvedTheme]);

  // Group blocks by category
  const blocksByCategory = useMemo(() => {
    const grouped: Record<string, RegistryBlock[]> = {};
    for (const block of blocks) {
      if (!grouped[block.category]) {
        grouped[block.category] = [];
      }
      grouped[block.category].push(block);
    }
    return grouped;
  }, [blocks]);

  // Category name lookup
  const categoryNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const cat of categories) {
      map[cat.slug] = cat.name;
    }
    return map;
  }, [categories]);

  // Set default block on first render
  useEffect(() => {
    if (blocks.length > 0 && !selectedBlockKey) {
      setSelectedBlockKey(`${blocks[0].category}/${blocks[0].slug}`);
    }
  }, [blocks, selectedBlockKey]);

  // Derive selected block info
  const selectedBlock = useMemo(() => {
    if (!selectedBlockKey) return null;
    const [category, slug] = selectedBlockKey.split("/");
    return blocks.find((b) => b.category === category && b.slug === slug) ?? null;
  }, [blocks, selectedBlockKey]);

  // Reset variant when switching blocks if current variant isn't available
  useEffect(() => {
    if (selectedBlock && !selectedBlock.variants.includes(selectedVariant)) {
      setSelectedVariant(selectedBlock.variants[0]);
    }
  }, [selectedBlock, selectedVariant]);

  // Compute preview URL based on mode
  const previewUrl = mode === "sandbox"
    ? `/preview/sandbox?theme=${previewTheme}`
    : selectedBlock
      ? `/preview/${selectedBlock.category}/${selectedBlock.slug}?variant=${selectedVariant}&theme=${previewTheme}`
      : "";

  const handleBlockChange = (value: string): void => {
    setSelectedBlockKey(value);
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleVariantChange = (value: string): void => {
    setSelectedVariant(value as BlockVariant);
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleModeChange = (newMode: PlaygroundMode): void => {
    setMode(newMode);
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleReload = (): void => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleToggleTheme = (): void => {
    setPreviewTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Toolbar */}
      <div className="border-border bg-background flex h-14 shrink-0 items-center justify-between border-b px-4">
        {/* Left: Mode toggle + Block/Variant pickers */}
        <div className="flex items-center gap-3">
          {/* Blocks / Sandbox toggle */}
          <div className="border-border flex items-center gap-1 rounded-lg border p-1">
            <button
              onClick={() => handleModeChange("blocks")}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                mode === "blocks"
                  ? "bg-muted text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              Blocks
            </button>
            <button
              onClick={() => handleModeChange("sandbox")}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                mode === "sandbox"
                  ? "bg-muted text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              Sandbox
            </button>
          </div>

          {/* Block picker — only in blocks mode */}
          {mode === "blocks" && (
            <>
              <Select value={selectedBlockKey} onValueChange={handleBlockChange}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select a block" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Object.entries(blocksByCategory).map(([categorySlug, categoryBlocks]) => (
                    <SelectGroup key={categorySlug}>
                      <SelectLabel>{categoryNameMap[categorySlug] ?? categorySlug}</SelectLabel>
                      {categoryBlocks.map((block) => (
                        <SelectItem key={`${block.category}/${block.slug}`} value={`${block.category}/${block.slug}`}>
                          {block.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>

              {/* Variant picker */}
              {selectedBlock && selectedBlock.variants.length > 1 && (
                <Select value={selectedVariant} onValueChange={handleVariantChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedBlock.variants.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variantLabels[variant]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </>
          )}

          {/* Sandbox hint */}
          {mode === "sandbox" && (
            <span className="text-muted-foreground hidden text-xs md:inline">
              Edit <code className="bg-muted rounded px-1 py-0.5 font-mono">_sandbox/scratch.tsx</code>
            </span>
          )}
        </div>

        {/* Right: Viewport + Theme + Actions */}
        <div className="flex items-center gap-2">
          {/* Viewport switcher */}
          <div className="border-border hidden items-center rounded-lg border p-1 md:flex">
            {viewportIcons.map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                variant="ghost"
                size="icon"
                className={cn("h-7 w-7", viewport === key && "bg-muted")}
                onClick={() => setViewport(key)}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label} view</span>
              </Button>
            ))}
          </div>

          {/* Separator */}
          <div className="bg-border hidden h-6 w-px md:block" />

          {/* Theme toggle for preview */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleToggleTheme}
          >
            {previewTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle preview theme</span>
          </Button>

          {/* Reload */}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleReload}>
            <RotateCw className="h-4 w-4" />
            <span className="sr-only">Reload preview</span>
          </Button>

          {/* Open in new tab */}
          {previewUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => window.open(previewUrl, "_blank")}
            >
              <Fullscreen className="h-4 w-4" />
              <span className="sr-only">Open preview in new tab</span>
            </Button>
          )}
        </div>
      </div>

      {/* Preview area */}
      <div className="bg-background-subtle relative flex-1">
        {previewUrl ? (
          <div
            className="mx-auto h-full transition-all duration-300 ease-out"
            style={{
              width: viewportWidths[viewport],
              maxWidth: "100%",
            }}
          >
            {/* Loading skeleton */}
            {isLoading && (
              <div className="bg-background absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                  <Skeleton className="mx-auto h-4 w-32" />
                  <Skeleton className="mx-auto h-4 w-24" />
                </div>
              </div>
            )}

            <iframe
              key={iframeKey}
              src={previewUrl}
              className={cn(
                "border-border/50 bg-background h-full w-full border-x transition-opacity duration-200",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              title={mode === "sandbox" ? "Sandbox preview" : selectedBlock ? `${selectedBlock.name} preview` : "Block preview"}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-sm">No blocks available. Run <code className="font-mono text-xs">pnpm build:registry</code> first.</p>
          </div>
        )}
      </div>
    </div>
  );
}
