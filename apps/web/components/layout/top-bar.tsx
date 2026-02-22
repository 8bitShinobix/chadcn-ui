"use client";

import { useState } from "react";
import { ModeToggle } from "./theme-toggle-button";
import { Logo } from "./logo";
import { GithubLinkButton } from "./github-link";
import { Navigation } from "./navigation";
import { MobileNav } from "./mobile-nav";
import { SearchTrigger } from "./search-trigger";
import { CommandPalette } from "./command-palette";

export function TopBar() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <header className="bg-background fixed top-0 left-0 right-0 z-50 h-14">
      <div className="mx-auto flex h-full items-center px-4">
        <Logo className="hidden lg:block" />
        <MobileNav className="lg:hidden" />
        <Navigation className="ml-8 hidden lg:flex" />
        <SearchTrigger
          className="ml-auto hidden lg:flex"
          onOpen={() => setCommandOpen(true)}
        />
        <div className="ml-auto flex items-center gap-2">
          <GithubLinkButton />
          <ModeToggle />
        </div>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
