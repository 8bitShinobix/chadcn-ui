"use client";

import { DollarSign, Users, Activity, TrendingUp } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    value: "+2,350",
    change: "+180.1%",
    icon: Users,
  },
  {
    label: "Active Users",
    value: "+12,234",
    change: "+19%",
    icon: Activity,
  },
  {
    label: "Growth",
    value: "+573",
    change: "+201",
    icon: TrendingUp,
  },
];

const recentActivity = [
  { user: "Alice Johnson", action: "created a new project", time: "2 min ago" },
  { user: "Bob Smith", action: "completed 3 tasks", time: "15 min ago" },
  { user: "Carol White", action: "updated billing info", time: "1 hour ago" },
  { user: "Dan Brown", action: "invited 2 team members", time: "3 hours ago" },
];

export function DashboardShell() {
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
          <div className="ml-auto">
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
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back, John. Here&apos;s your overview.
            </p>
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
                  <p className="text-muted-foreground mt-1 text-xs">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="gap-0 rounded-lg py-0 shadow-none">
            <CardHeader className="border-b p-4">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <Avatar className="size-8">
                      <AvatarFallback>
                        {item.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{item.user}</span> {item.action}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs">{item.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
