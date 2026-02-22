"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { ArrowRight, CircleDashed, FileText, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { blockCategories } from "@/config/navigation";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const pages = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/getting-started/installation" },
  { title: "Blocks", href: "/blocks" },
  { title: "Charts", href: "/docs/charts" },
  { title: "Create", href: "/docs/getting-started/usage" },
];

const docs = [
  { title: "Introduction", href: "/docs/introduction" },
  { title: "Installation", href: "/docs/getting-started/installation" },
  { title: "Usage", href: "/docs/getting-started/usage" },
  { title: "Changelog", href: "/docs/changelog" },
];

export function CommandPalette({
  open,
  onOpenChange,
}: CommandPaletteProps): React.ReactElement {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [router, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-[20%] translate-y-0 gap-0 overflow-hidden rounded-xl p-0 sm:max-w-[540px]"
      >
        <DialogTitle className="sr-only">Search documentation</DialogTitle>
        <Command>
          {/* Input */}
          <div className="flex items-center gap-2 px-4">
            <Search className="text-muted-foreground h-4 w-4 shrink-0" />
            <Command.Input
              placeholder="Search documentation..."
              className="text-foreground placeholder:text-muted-foreground h-12 w-full border-none bg-transparent text-sm shadow-none outline-none ring-0 focus:ring-0 focus:outline-none"
              autoFocus
            />
          </div>

          <Separator />

          {/* Results */}
          <Command.List className="max-h-[min(360px,50vh)] overflow-y-auto p-2">
            <Command.Empty className="text-muted-foreground py-8 text-center text-sm">
              No results found.
            </Command.Empty>

            {/* Pages */}
            <Command.Group heading="Pages">
              {pages.map((page) => (
                <Command.Item
                  key={page.href}
                  value={page.title}
                  onSelect={() => navigate(page.href)}
                >
                  <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0" />
                  {page.title}
                </Command.Item>
              ))}
            </Command.Group>

            {/* Blocks — grouped by category */}
            {blockCategories.map((category) => (
              <Command.Group key={category.title} heading={category.title}>
                {category.items.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${category.title} ${item.title}`}
                    onSelect={() => navigate(item.href)}
                  >
                    <CircleDashed className="text-muted-foreground h-4 w-4 shrink-0" />
                    {item.title}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}

            {/* Documentation */}
            <Command.Group heading="Documentation">
              {docs.map((doc) => (
                <Command.Item
                  key={doc.href}
                  value={`docs ${doc.title}`}
                  onSelect={() => navigate(doc.href)}
                >
                  <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
                  {doc.title}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <Separator />
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <kbd className="border-border bg-muted text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-mono text-[11px] font-medium shadow-sm">
                ↵
              </kbd>
              <span className="text-muted-foreground text-xs">Go to Page</span>
            </div>

            <Separator orientation="vertical" className="!h-4" />

            <div className="flex items-center gap-1.5">
              <kbd className="border-border bg-muted text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-mono text-[11px] font-medium shadow-sm">
                ↑
              </kbd>
              <kbd className="border-border bg-muted text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-mono text-[11px] font-medium shadow-sm">
                ↓
              </kbd>
              <span className="text-muted-foreground text-xs">Navigate</span>
            </div>

            <Separator orientation="vertical" className="!h-4" />

            <div className="flex items-center gap-1.5">
              <kbd className="border-border bg-muted text-muted-foreground inline-flex h-5 items-center justify-center rounded border px-1.5 font-mono text-[11px] font-medium shadow-sm">
                esc
              </kbd>
              <span className="text-muted-foreground text-xs">Close</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
