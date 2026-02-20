"use client";

import {
  Bell,
  Plus,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stats = [
  {
    label: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    value: "+2,350",
    change: "+180.1%",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Active Users",
    value: "+12,234",
    change: "-2.5%",
    trend: "down" as const,
    icon: Activity,
  },
  {
    label: "Growth",
    value: "+573",
    change: "+201",
    trend: "up" as const,
    icon: TrendingUp,
  },
];

const notifications = [
  {
    title: "New sale completed",
    description: "Olivia Martin purchased Pro plan",
    time: "2 min ago",
  },
  { title: "New team member", description: "Jackson Lee joined the workspace", time: "1 hour ago" },
  { title: "Bug report resolved", description: "Issue #423 has been closed", time: "3 hours ago" },
  {
    title: "Deployment successful",
    description: "v2.4.0 deployed to production",
    time: "5 hours ago",
  },
];

const recentSales = [
  { name: "Olivia Martin", email: "olivia@example.com", amount: "+$1,999.00" },
  { name: "Jackson Lee", email: "jackson@example.com", amount: "+$39.00" },
  {
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    amount: "+$299.00",
  },
  { name: "William Kim", email: "william@example.com", amount: "+$99.00" },
  { name: "Sofia Davis", email: "sofia@example.com", amount: "+$39.00" },
];

export default function DashboardShellFeatureRich() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Platform</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
              <Input type="search" placeholder="Search..." className="h-9 w-64 pl-8" />
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
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Welcome back, John. Here&apos;s your overview.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 size-4" />
              New Project
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="rounded-lg py-0 shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <stat.icon className="text-muted-foreground size-4" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="size-3 text-muted-foreground" />
                    ) : (
                      <TrendingDown className="size-3 text-muted-foreground" />
                    )}
                    <span className="text-muted-foreground">
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="gap-0 rounded-lg py-0 shadow-none lg:col-span-4">
              <CardHeader className="border-b p-4">
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="flex h-[200px] w-full items-end gap-2">
                  {[40, 65, 45, 80, 55, 70, 50, 75, 60, 85, 45, 90].map((height, i) => (
                    <div
                      key={i}
                      className="bg-primary/20 flex-1 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="gap-0 rounded-lg py-0 shadow-none lg:col-span-3">
              <CardHeader className="border-b p-4">
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentSales.map((sale) => (
                    <div key={sale.email} className="flex items-center gap-4 p-4">
                      <Avatar className="size-9">
                        <AvatarFallback>
                          {sale.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm leading-none font-medium">{sale.name}</p>
                        <p className="text-muted-foreground text-xs">{sale.email}</p>
                      </div>
                      <p className="text-sm font-medium">{sale.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
