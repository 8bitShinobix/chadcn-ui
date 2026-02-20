"use client";

import { Home, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { title: "Dashboard", href: "#", isActive: true },
  { title: "Projects", href: "#" },
  { title: "Tasks", href: "#" },
  { title: "Calendar", href: "#" },
  { title: "Settings", href: "#" },
];

export default function TopNavStandard() {
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
          <Separator orientation="vertical" className="hidden h-4 md:block" />
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
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
              <Input type="search" placeholder="Search..." className="h-9 w-48 pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-accent flex items-center gap-2 rounded-md p-1.5">
                  <Avatar className="size-7">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, John. Here&apos;s your overview.
          </p>
        </div>
      </main>
    </div>
  );
}
