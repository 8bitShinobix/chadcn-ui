"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Copy, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlockDependencies } from "@/types/registry";

interface CodePanelProps {
  code: string;
  highlightedCodeDark?: string;
  highlightedCodeLight?: string;
  highlightedUsageDark?: string;
  highlightedUsageLight?: string;
  highlightedPropsDark?: string;
  highlightedPropsLight?: string;
  propsName?: string | null;
  dependencies: BlockDependencies;
  registryDependencies: string[];
  category: string;
  blockSlug: string;
}

type Tab = "component" | "props" | "dependencies" | "usage";

const STORAGE_KEY = "chadcn-code-panel-expanded";

export function CodePanel({
  code,
  highlightedCodeDark,
  highlightedCodeLight,
  highlightedUsageDark,
  highlightedUsageLight,
  highlightedPropsDark,
  highlightedPropsLight,
  propsName,
  dependencies,
  registryDependencies,
  category,
  blockSlug,
}: CodePanelProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("component");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const highlightedCode = isDark ? highlightedCodeDark : highlightedCodeLight;
  const highlightedUsage = isDark ? highlightedUsageDark : highlightedUsageLight;
  const highlightedProps = isDark ? highlightedPropsDark : highlightedPropsLight;

  // Load expanded state from session storage
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          setIsExpanded(JSON.parse(stored));
        }
      } catch {
        // Ignore errors
      }
    });
  }, []);

  // Save expanded state to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded));
    } catch {
      // Ignore errors
    }
  }, [isExpanded]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Generate npm install command
  const npmDeps = Object.keys(dependencies);
  const npmCommand = npmDeps.length > 0 ? `npm install ${npmDeps.join(" ")}` : null;

  // Generate shadcn add command
  const shadcnCommand =
    registryDependencies.length > 0
      ? `npx shadcn@latest add ${registryDependencies.join(" ")}`
      : null;

  // Generate usage example
  const componentName =
    blockSlug.charAt(0).toUpperCase() +
    blockSlug.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()) +
    "Form";

  const usageCode = `import { ${componentName} } from "@/components/${category}/${blockSlug}"

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <${componentName} />
    </div>
  )
}`;

  // Extract props interface from code for copy
  const propsMatch = code.match(/interface\s+\w+Props\s*\{[^}]+\}/s);
  const propsCode = propsMatch ? propsMatch[0] : "";

  const getCurrentContent = (): string => {
    switch (activeTab) {
      case "component":
        return code;
      case "props":
        return propsCode || "No props interface found";
      case "dependencies":
        return (
          [npmCommand, shadcnCommand].filter(Boolean).join("\n\n") || "No dependencies required"
        );
      case "usage":
        return usageCode;
    }
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const renderCode = (codeText: string, highlighted?: string) => {
    if (highlighted) {
      // Use the pre-highlighted code from server
      return (
        <div
          className="text-sm [&_code]:!bg-transparent [&_code]:font-mono [&_pre]:!bg-transparent [&_pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    }

    // Fallback to plain text
    return (
      <pre className="text-sm">
        <code className="text-foreground-muted">{codeText}</code>
      </pre>
    );
  };

  return (
    <div className="border-border bg-card border-t">
      {/* Tab bar */}
      <div className="border-border flex h-12 items-center justify-between border-b px-4">
        <div className="flex gap-4">
          {(["component", "props", "dependencies", "usage"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "text-sm capitalize transition-colors",
                activeTab === tab
                  ? "text-foreground font-medium"
                  : "text-foreground-muted hover:text-foreground/70"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {/* Copy button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => copyToClipboard(getCurrentContent())}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy code</span>
          </Button>

          {/* Expand/collapse button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="sr-only">{isExpanded ? "Collapse" : "Expand"} code panel</span>
          </Button>
        </div>
      </div>

      {/* Code content */}
      {isExpanded && (
        <div className="bg-background max-h-100 overflow-auto p-4">
          {activeTab === "component" && renderCode(code, highlightedCode)}

          {activeTab === "props" && (
            <div className="space-y-4">
              {highlightedProps ? (
                <div>
                  <h4 className="text-foreground mb-3 text-sm font-medium">
                    {propsName || "Props"}
                  </h4>
                  {renderCode("", highlightedProps)}
                </div>
              ) : (
                <div className="border-border bg-background rounded-lg border p-6 text-center">
                  <p className="text-foreground-muted text-sm">
                    This component does not expose any configurable props.
                  </p>
                  <p className="text-foreground-subtle mt-1 text-xs">
                    It&apos;s a self-contained block ready to use as-is.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "dependencies" && (
            <div className="space-y-4">
              {npmCommand && (
                <div>
                  <h4 className="text-foreground mb-2 text-sm font-medium">NPM Dependencies</h4>
                  <pre className="rounded-md bg-black/5 p-3 text-sm dark:bg-white/5">
                    <code className="text-foreground-muted">{npmCommand}</code>
                  </pre>
                </div>
              )}
              {shadcnCommand && (
                <div>
                  <h4 className="text-foreground mb-2 text-sm font-medium">shadcn/ui Components</h4>
                  <pre className="rounded-md bg-black/5 p-3 text-sm dark:bg-white/5">
                    <code className="text-foreground-muted">{shadcnCommand}</code>
                  </pre>
                </div>
              )}
              {!npmCommand && !shadcnCommand && (
                <p className="text-foreground-muted text-sm">
                  No additional dependencies required.
                </p>
              )}
            </div>
          )}

          {activeTab === "usage" && renderCode(usageCode, highlightedUsage)}
        </div>
      )}
    </div>
  );
}
