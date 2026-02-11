"use client";

import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface BlockPreviewProps {
  category: string;
  blockSlug: string;
  variant: string;
}

type Viewport = "desktop" | "tablet" | "mobile";
type Zoom = 100 | 75 | 50;

const viewportConfig: Record<Viewport, { width: string; icon: typeof Monitor }> = {
  desktop: { width: "100%", icon: Monitor },
  tablet: { width: "768px", icon: Tablet },
  mobile: { width: "375px", icon: Smartphone },
};

export function BlockPreview({
  category,
  blockSlug,
  variant,
}: BlockPreviewProps): React.ReactElement {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [zoom, setZoom] = useState<Zoom>(100);
  const [isLoading, setIsLoading] = useState(true);

  const previewUrl = `/preview/${category}/${blockSlug}?variant=${variant}&theme=${theme}`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open(previewUrl, "_blank");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Control bar */}
      <div className="border-border bg-background flex h-12 shrink-0 items-center justify-between border-b px-4">
        {/* Viewport switcher */}
        <div className="flex items-center gap-1">
          {(Object.keys(viewportConfig) as Viewport[]).map((vp) => {
            const Icon = viewportConfig[vp].icon;
            return (
              <Button
                key={vp}
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", viewport === vp && "bg-muted")}
                onClick={() => setViewport(vp)}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{vp} view</span>
              </Button>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">Toggle preview theme</span>
          </Button>

          {/* Zoom dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                {zoom === 100 ? <ZoomIn className="h-4 w-4" /> : <ZoomOut className="h-4 w-4" />}
                <span className="text-xs">{zoom}%</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {([100, 75, 50] as Zoom[]).map((z) => (
                <DropdownMenuItem
                  key={z}
                  onClick={() => setZoom(z)}
                  className={zoom === z ? "bg-muted" : undefined}
                >
                  {z}%
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Open in new tab */}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openInNewTab}>
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open in new tab</span>
          </Button>
        </div>
      </div>

      {/* Preview area */}
      <div className="bg-background-subtle relative flex-1 overflow-auto p-4 md:p-6">
        <div
          className="mx-auto h-full transition-all duration-300 ease-out"
          style={{
            width: viewportConfig[viewport].width,
            maxWidth: "100%",
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          {/* MacBook-style browser frame */}
          <div
            className={cn(
              "border-border/50 flex h-full flex-col overflow-hidden border bg-[#1c1c1e] shadow-2xl transition-all duration-300 dark:bg-[#2d2d2d]",
              viewport === "mobile"
                ? "rounded-[2rem]"
                : viewport === "tablet"
                  ? "rounded-2xl"
                  : "rounded-xl"
            )}
          >
            {/* Title bar with traffic lights */}
            <div
              className={cn(
                "flex shrink-0 items-center gap-2 border-b border-white/5 bg-[#323234] dark:bg-[#3d3d3f]",
                viewport === "mobile" ? "h-8 px-4" : "h-10 px-3"
              )}
            >
              {/* Traffic light buttons */}
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80",
                    viewport === "mobile" ? "h-2.5 w-2.5" : "h-3 w-3"
                  )}
                />
                <div
                  className={cn(
                    "rounded-full bg-[#febc2e] transition-opacity hover:opacity-80",
                    viewport === "mobile" ? "h-2.5 w-2.5" : "h-3 w-3"
                  )}
                />
                <div
                  className={cn(
                    "rounded-full bg-[#28c840] transition-opacity hover:opacity-80",
                    viewport === "mobile" ? "h-2.5 w-2.5" : "h-3 w-3"
                  )}
                />
              </div>

              {/* URL bar placeholder - hidden on mobile viewport */}
              {viewport !== "mobile" && (
                <div className="ml-4 flex flex-1 items-center justify-center">
                  <div className="flex h-6 w-full max-w-md items-center justify-center rounded-md bg-black/20 px-3 text-xs text-white/40">
                    chadcn.dev/preview
                  </div>
                </div>
              )}

              {/* Spacer for symmetry */}
              {viewport !== "mobile" && <div className="w-13" />}
            </div>

            {/* Browser content area */}
            <div className="relative flex-1 overflow-hidden">
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

              {/* Iframe - scaled down to fit content */}
              <div
                className="h-full w-full origin-top-left scale-[0.8]"
                style={{ width: "125%", height: "125%" }}
              >
                <iframe
                  key={`${previewUrl}-${theme}`}
                  src={previewUrl}
                  className={cn(
                    "bg-background h-full w-full transition-opacity duration-200",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  title={`${blockSlug} preview`}
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
