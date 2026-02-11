"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  RotateCw,
  Fullscreen,
  Terminal,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTree } from "./file-tree";
import { cn } from "@/lib/utils";
import type { BlockVariant, BlockDependencies } from "@/types/registry";

interface BlockFile {
  path: string;
  content: string;
  highlightedDark: string;
  highlightedLight: string;
}

interface BlockViewerProps {
  name: string;
  description: string;
  slug: string;
  category: string;
  variants: BlockVariant[];
  currentVariant: BlockVariant;
  files: BlockFile[];
  defaultFileIndex?: number;
  dependencies: BlockDependencies;
  registryDependencies: string[];
}

type ViewMode = "preview" | "code";
type Viewport = "desktop" | "tablet" | "mobile";

const viewportWidths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function BlockViewer({
  name,
  slug,
  category,
  variants,
  currentVariant,
  files,
  defaultFileIndex = 0,
}: BlockViewerProps): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ViewMode>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [selectedFileIndex, setSelectedFileIndex] = useState(defaultFileIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const previewUrl = `/preview/${category}/${slug}?variant=${currentVariant}&theme=${isDark ? "dark" : "light"}`;
  const cliCommand = `npx @chadcn/cli add ${category}/${slug}`;

  const selectedFile = files[selectedFileIndex] || files[0];

  const handleCopyCommand = async () => {
    await navigator.clipboard.writeText(cliCommand);
    toast.success("Copied to clipboard!");
  };

  const handleCopyCode = async () => {
    if (selectedFile) {
      await navigator.clipboard.writeText(selectedFile.content);
      toast.success("Copied to clipboard!");
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleVariantChange = (variant: BlockVariant) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", variant);
    router.push(`?${params.toString()}`);
  };

  const handleFileSelect = (path: string) => {
    const index = files.findIndex((f) => f.path === path);
    if (index !== -1) {
      setSelectedFileIndex(index);
    }
  };

  const variantLabels: Record<BlockVariant, string> = {
    minimal: "Minimal",
    standard: "Standard",
    "feature-rich": "Feature Rich",
  };

  const viewportIcons: { key: Viewport; icon: typeof Monitor }[] = [
    { key: "desktop", icon: Monitor },
    { key: "tablet", icon: Tablet },
    { key: "mobile", icon: Smartphone },
  ];

  return (
    <div className="border-border flex flex-col overflow-hidden rounded-lg border">
      {/* Toolbar */}
      <div className="border-border bg-background flex h-14 items-center justify-between border-b px-4">
        {/* Left: Preview / Code toggle */}
        <div className="border-border flex items-center gap-1 rounded-lg border p-1">
          <button
            onClick={() => setMode("preview")}
            className={cn(
              "rounded-md px-3 py-1 text-sm font-medium transition-colors",
              mode === "preview"
                ? "bg-muted text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setMode("code")}
            className={cn(
              "rounded-md px-3 py-1 text-sm font-medium transition-colors",
              mode === "code"
                ? "bg-muted text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            Code
          </button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Viewport switcher + preview + reload — only in preview mode */}
          {mode === "preview" && (
            <div className="border-border hidden items-center rounded-lg border p-1 md:flex">
              {viewportIcons.map(({ key, icon: Icon }) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7", viewport === key && "bg-muted")}
                  onClick={() => setViewport(key)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{key} view</span>
                </Button>
              ))}
              <div className="bg-border mx-1 h-4 w-px" />
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => window.open(previewUrl, "_blank")}
              >
                <Fullscreen className="h-4 w-4" />
                <span className="sr-only">Open preview in new tab</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleReload}>
                <RotateCw className="h-4 w-4" />
                <span className="sr-only">Reload preview</span>
              </Button>
            </div>
          )}

          {/* CLI command badge */}
          <button
            onClick={handleCopyCommand}
            className="border-border bg-muted hover:bg-muted/80 hidden items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors lg:flex"
          >
            <Terminal className="text-foreground-muted h-3.5 w-3.5 shrink-0" />
            <code className="text-foreground-muted font-mono text-xs whitespace-nowrap">
              npx @chadcn/cli add {category}/{slug}
            </code>
          </button>

          {/* Mobile: Copy CLI button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden"
            onClick={handleCopyCommand}
          >
            <Terminal className="h-4 w-4" />
            <span className="sr-only">Copy CLI command</span>
          </Button>

          {/* Variant switcher */}
          {variants.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {variantLabels[currentVariant]}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {variants.map((variant) => (
                  <DropdownMenuItem
                    key={variant}
                    onClick={() => handleVariantChange(variant)}
                    className={variant === currentVariant ? "bg-muted" : undefined}
                  >
                    {variantLabels[variant]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Content area */}
      {mode === "preview" ? (
        /* Preview Mode */
        <div className="bg-background-subtle relative h-[calc(100vh-12rem)] min-h-100">
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
              title={`${name} preview`}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      ) : (
        /* Code Mode */
        <div className="flex h-[calc(100vh-12rem)] min-h-100">
          {/* File tree panel */}
          <div className="border-border bg-background hidden w-64 shrink-0 overflow-y-auto border-r md:block">
            <FileTree
              files={files}
              selectedPath={selectedFile?.path || ""}
              onSelect={handleFileSelect}
            />
          </div>

          {/* Code viewer panel */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* File header */}
            <div className="border-border bg-background flex h-10 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2 text-sm">
                {/* Mobile: file selector dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-foreground-muted flex items-center gap-1 font-mono text-xs md:pointer-events-none">
                      <span>{selectedFile?.path}</span>
                      <ChevronDown className="h-3 w-3 md:hidden" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="md:hidden">
                    {files.map((file, i) => (
                      <DropdownMenuItem
                        key={file.path}
                        onClick={() => setSelectedFileIndex(i)}
                        className={i === selectedFileIndex ? "bg-muted" : undefined}
                      >
                        <span className="font-mono text-xs">{file.path}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopyCode}>
                <Copy className="h-3.5 w-3.5" />
                <span className="sr-only">Copy code</span>
              </Button>
            </div>

            {/* Code content with line numbers */}
            <div className="bg-background flex-1 overflow-auto">
              {selectedFile && (
                <div
                  className="code-with-line-numbers p-4 text-sm [&_code]:!bg-transparent [&_code]:font-mono [&_pre]:!bg-transparent [&_pre]:!p-0"
                  dangerouslySetInnerHTML={{
                    __html: isDark ? selectedFile.highlightedDark : selectedFile.highlightedLight,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Line number styles */}
      <style>{`
        .code-with-line-numbers code {
          counter-reset: line;
        }
        .code-with-line-numbers .line::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 2.5rem;
          margin-right: 1rem;
          text-align: right;
          color: var(--color-foreground-subtle, #6b7280);
          font-size: 0.8em;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
