"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

interface PackageInstallProps {
  /** The package(s) to install, e.g. "zod react-hook-form" */
  packages?: string;
  /** Whether this is a dev dependency */
  dev?: boolean;
  /** Whether this is a global install */
  global?: boolean;
  /** Whether this is an npx/dlx/bunx command (not install) */
  command?: string;
}

const managers: { id: PackageManager; label: string }[] = [
  { id: "pnpm", label: "pnpm" },
  { id: "npm", label: "npm" },
  { id: "yarn", label: "yarn" },
  { id: "bun", label: "bun" },
];

function getCommand(
  pm: PackageManager,
  packages: string,
  dev: boolean,
  global: boolean,
  command?: string
): string {
  if (command) {
    const parts = command.split(/\s+/);
    const runner = parts[0];
    const rest = parts.slice(1).join(" ");

    if (runner === "npx" || runner === "pnpx" || runner === "bunx") {
      switch (pm) {
        case "pnpm":
          return `pnpm dlx ${rest}`;
        case "npm":
          return `npx ${rest}`;
        case "yarn":
          return `npx ${rest}`;
        case "bun":
          return `bunx ${rest}`;
      }
    }
    return command;
  }

  const devFlag = dev ? (pm === "npm" ? " --save-dev" : " -D") : "";
  const globalFlag = global ? (pm === "yarn" ? " global" : " -g") : "";

  switch (pm) {
    case "pnpm":
      return `pnpm add${globalFlag}${devFlag} ${packages}`;
    case "npm":
      return `npm install${globalFlag}${devFlag} ${packages}`;
    case "yarn":
      return `yarn${globalFlag} add${devFlag} ${packages}`;
    case "bun":
      return `bun add${globalFlag}${devFlag} ${packages}`;
  }
}

export function PackageInstall({
  packages = "",
  dev = false,
  global: isGlobal = false,
  command,
}: PackageInstallProps): React.ReactElement {
  const [active, setActive] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);

  const cmd = getCommand(active, packages, dev, isGlobal, command);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <div className="not-prose border-border bg-muted/50 my-6 overflow-hidden rounded-xl border">
      {/* Header with tabs and copy */}
      <div className="border-border flex items-center gap-0 border-b px-1">
        <div className="text-muted-foreground flex shrink-0 items-center px-3 py-2.5">
          <Terminal className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-0">
          {managers.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setActive(pm.id)}
              className={cn(
                "relative px-3 py-2.5 text-[13px] font-medium transition-colors",
                active === pm.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              )}
            >
              {pm.label}
              {active === pm.id && (
                <span className="bg-foreground absolute inset-x-0 bottom-0 h-px" />
              )}
            </button>
          ))}
        </div>
        <div className="ml-auto pr-2">
          <button
            onClick={copyToClipboard}
            className="text-muted-foreground hover:text-foreground/70 rounded-md p-2 transition-colors"
            aria-label="Copy command"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Command */}
      <div className="px-4 py-4">
        <code className="text-foreground font-mono text-sm">{cmd}</code>
      </div>
    </div>
  );
}
