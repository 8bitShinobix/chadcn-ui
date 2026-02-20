"use client";

import { Home, Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  {
    title: "Products",
    href: "#",
    children: [
      { title: "All Products", href: "#" },
      { title: "Categories", href: "#" },
      { title: "Inventory", href: "#" },
    ],
  },
  {
    title: "Team",
    href: "#",
    children: [
      { title: "Members", href: "#" },
      { title: "Roles", href: "#" },
      { title: "Invitations", href: "#" },
    ],
  },
  { title: "Analytics", href: "#" },
  { title: "Settings", href: "#" },
];

const notifications = [
  {
    title: "New sale completed",
    description: "Olivia Martin purchased Pro plan",
    time: "2 min ago",
  },
  { title: "New team member", description: "Jackson Lee joined the workspace", time: "1 hour ago" },
  { title: "Bug report resolved", description: "Issue #423 has been closed", time: "3 hours ago" },
];

export function TopNav() {
  return (
    <div className="flex min-h-[500px] flex-col">
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
            <DropdownMenuContent align="start" className="w-48">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.title}>
                    <DropdownMenuLabel className="text-xs">{link.title}</DropdownMenuLabel>
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.title} className="pl-4">
                        {child.title}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                ) : (
                  <DropdownMenuItem key={link.title}>{link.title}</DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.title}>
                  <DropdownMenuTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors">
                      {link.title}
                      <ChevronDown className="size-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.title}>{child.title}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
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
              )
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
              <Input type="search" placeholder="Search..." className="h-9 w-48 pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative size-9">
                  <Bell className="size-4" />
                  <span className="bg-destructive absolute top-1.5 right-1.5 size-2 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((n) => (
                  <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-muted-foreground text-xs">{n.description}</p>
                    <p className="text-muted-foreground text-xs">{n.time}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="h-4" />
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
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="border-b px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
