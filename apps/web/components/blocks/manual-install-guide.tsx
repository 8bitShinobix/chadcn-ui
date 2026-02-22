"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Check, Copy, ChevronDown, ChevronUp, Info } from "lucide-react";
import { PackageInstall } from "@/components/docs/package-install";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { BlockVariant } from "@/types/registry";

interface HighlightedFile {
  path: string;
  content: string;
  highlightedDark: string;
  highlightedLight: string;
}

interface ManualInstallGuideProps {
  dependencies: string[];
  registryDependencies: string[];
  variantFiles: Record<string, HighlightedFile>;
  variants: BlockVariant[];
  currentVariant: BlockVariant;
  usageFile: HighlightedFile;
  notes?: string;
}

const variantLabels: Record<BlockVariant, string> = {
  minimal: "Minimal",
  standard: "Standard",
  "feature-rich": "Feature Rich",
};

function StepNumber({ number }: { number: number }): React.ReactElement {
  return (
    <div className="bg-muted text-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium">
      {number}
    </div>
  );
}

function CopyButton({ text }: { text: string }): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground rounded-md p-1.5 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function CodeSection({
  file,
  defaultOpen = false,
}: {
  file: HighlightedFile;
  defaultOpen?: boolean;
}): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const highlightedHtml = isDark
    ? file.highlightedDark
    : file.highlightedLight;

  if (!defaultOpen) return <></>;

  return (
    <div>
      <div className="border-border bg-muted/50 flex items-center justify-between rounded-t-lg border px-4 py-2.5">
        <span className="text-muted-foreground font-mono text-xs">
          {file.path}
        </span>
        <CopyButton text={file.content} />
      </div>
      <div
        className={cn(
          "border-border bg-muted/50 overflow-x-auto rounded-b-lg border border-t-0 p-4 text-sm",
          "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0",
          "[&_code]:!bg-transparent [&_code]:font-mono"
        )}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}

function VariantCodeSection({
  variantFiles,
  variants,
  currentVariant,
}: {
  variantFiles: Record<string, HighlightedFile>;
  variants: BlockVariant[];
  currentVariant: BlockVariant;
}): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<BlockVariant>(currentVariant);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const file = variantFiles[selectedVariant];

  if (!file) return <></>;

  const highlightedHtml = isDark
    ? file.highlightedDark
    : file.highlightedLight;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-border bg-muted/50 overflow-hidden rounded-t-lg border">
        {/* Variant tabs */}
        {variants.length > 1 && (
          <div className="border-border flex items-center border-b px-1">
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={cn(
                  "relative px-3 py-2 text-[13px] font-medium transition-colors",
                  selectedVariant === v
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                )}
              >
                {variantLabels[v]}
                {selectedVariant === v && (
                  <span className="bg-foreground absolute inset-x-0 bottom-0 h-px" />
                )}
              </button>
            ))}
          </div>
        )}
        {/* File path + controls */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-muted-foreground font-mono text-xs">
            {file.path}
          </span>
          <div className="flex items-center gap-1">
            <CollapsibleTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors">
                {isOpen ? (
                  <>
                    Collapse
                    <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Expand
                    <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            </CollapsibleTrigger>
            <CopyButton text={file.content} />
          </div>
        </div>
      </div>
      <CollapsibleContent>
        <div
          className={cn(
            "border-border bg-muted/50 overflow-x-auto rounded-b-lg border border-t-0 p-4 text-sm",
            "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0",
            "[&_code]:!bg-transparent [&_code]:font-mono"
          )}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ManualInstallGuide({
  dependencies,
  registryDependencies,
  variantFiles,
  variants,
  currentVariant,
  usageFile,
  notes,
}: ManualInstallGuideProps): React.ReactElement {
  const hasNpmDeps = dependencies.length > 0;
  const hasShadcnDeps = registryDependencies.length > 0;

  let stepNumber = 0;

  return (
    <div className="mt-8">
      <h2 className="text-foreground text-lg font-semibold">
        Manual Installation
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Follow the steps below to manually add this component to your project.
      </p>

      <div className="mt-6 space-y-0">
        {/* Step: Install npm dependencies */}
        {hasNpmDeps && (
          <div className="relative pb-8">
            <div className="border-border absolute top-7 bottom-0 left-3.5 w-px border-l" />
            <div className="flex items-start gap-4">
              <StepNumber number={++stepNumber} />
              <div className="flex-1 pt-0.5">
                <h3 className="text-foreground text-sm font-medium">
                  Install dependencies
                </h3>
                <PackageInstall packages={dependencies.join(" ")} />
              </div>
            </div>
          </div>
        )}

        {/* Step: Add shadcn components */}
        {hasShadcnDeps && (
          <div className="relative pb-8">
            <div className="border-border absolute top-7 bottom-0 left-3.5 w-px border-l" />
            <div className="flex items-start gap-4">
              <StepNumber number={++stepNumber} />
              <div className="flex-1 pt-0.5">
                <h3 className="text-foreground text-sm font-medium">
                  Add required components
                </h3>
                <PackageInstall
                  command={`npx shadcn@latest add ${registryDependencies.join(" ")}`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step: Copy component code */}
        <div className="relative pb-8">
          <div className="border-border absolute top-7 bottom-0 left-3.5 w-px border-l" />
          <div className="flex items-start gap-4">
            <StepNumber number={++stepNumber} />
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-foreground mb-3 text-sm font-medium">
                Copy and paste the component code
              </h3>
              <VariantCodeSection
                variantFiles={variantFiles}
                variants={variants}
                currentVariant={currentVariant}
              />
            </div>
          </div>
        </div>

        {/* Step: Use in your app */}
        <div className="relative">
          <div className="flex items-start gap-4">
            <StepNumber number={++stepNumber} />
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-foreground mb-3 text-sm font-medium">
                Use in your app
              </h3>
              <CodeSection file={usageFile} defaultOpen />
            </div>
          </div>
        </div>

        {/* Optional notes */}
        {notes && (
          <div className="mt-6 ml-11">
            <div className="border-border bg-muted/30 flex items-start gap-2.5 rounded-lg border p-4">
              <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-muted-foreground text-sm">{notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
