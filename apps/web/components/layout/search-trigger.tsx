"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface SearchTriggerProps {
  className?: string;
  onOpen?: () => void;
}

export function SearchTrigger({ className, onOpen }: SearchTriggerProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Search documentation"
      className={cn("relative w-full max-w-sm", className)}
    >
      <Input
        readOnly
        tabIndex={-1}
        type="search"
        placeholder="Search documentation..."
        className="text-muted-foreground cursor-pointer pr-6 text-sm"
      />

      {/* Cmd + K */}
      <kbd className="bg-muted text-muted-foreground pointer-events-none absolute top-1/2 right-3 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-md border px-2 py-0.5 text-xs font-medium">
        <span className="text-sm leading-none">⌘</span>
        <span className="text-xs leading-none">K</span>
      </kbd>
    </button>
  );
}
