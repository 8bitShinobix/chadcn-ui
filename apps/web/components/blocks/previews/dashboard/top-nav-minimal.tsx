"use client";

import { Home, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { title: "Dashboard", href: "#", isActive: true },
  { title: "Projects", href: "#" },
  { title: "Tasks", href: "#" },
  { title: "Analytics", href: "#" },
];

export default function TopNavMinimal() {
  return (
    <div className="flex min-h-[400px] flex-col">
      <header className="bg-background border-b">
        <div className="flex h-14 items-center gap-4 px-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
              <Home className="size-4" />
            </div>
            <span className="hidden sm:inline">Acme Inc</span>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 md:hidden">
                <Menu className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.title}>{link.title}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  link.isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.title}
              </a>
            ))}
          </nav>
          <div className="ml-auto">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Select a page from the navigation above.</p>
      </main>
    </div>
  );
}
