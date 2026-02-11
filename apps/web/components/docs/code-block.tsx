"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  highlightedCode: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  highlightedCode,
  language = "text",
  showLineNumbers = false,
  className,
}: CodeBlockProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <div className={cn("not-prose group relative my-6", className)}>
      {language && language !== "text" && (
        <div className="bg-muted text-muted-foreground absolute top-0 right-12 z-10 rounded-b-md px-2.5 py-1 text-xs">
          {language}
        </div>
      )}
      <button
        onClick={copyToClipboard}
        className="text-muted-foreground hover:text-foreground/70 absolute top-3 right-3 z-10 rounded-md p-1.5 opacity-0 transition-all group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
      <div
        className={cn(
          "border-border bg-muted/50 overflow-x-auto rounded-xl border p-4 text-sm",
          "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0",
          "[&_code]:!bg-transparent [&_code]:font-mono",
          showLineNumbers &&
            "[&_pre]:counter-reset-[line] [&_.line]:counter-increment-[line] [&_.line]:before:text-muted-foreground/50 [&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-4 [&_.line]:before:text-right [&_.line]:before:content-[counter(line)]"
        )}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}

interface PreProps {
  children: React.ReactNode;
  className?: string;
  "data-language"?: string;
  "data-code"?: string;
  "data-highlighted"?: string;
}

export function Pre({
  children,
  className,
  "data-language": language,
  "data-code": code,
  "data-highlighted": highlightedCode,
}: PreProps): React.ReactElement {
  if (code && highlightedCode) {
    return (
      <CodeBlock
        code={code}
        highlightedCode={highlightedCode}
        language={language}
        className={className}
      />
    );
  }

  return (
    <pre
      className={cn(
        "not-prose border-border bg-muted/50 text-foreground my-6 overflow-x-auto rounded-xl border p-4 font-mono text-sm",
        className
      )}
    >
      {children}
    </pre>
  );
}
