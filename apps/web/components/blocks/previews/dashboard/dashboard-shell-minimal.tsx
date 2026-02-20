"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Total Users", value: "2,420" },
  { label: "Active Projects", value: "18" },
  { label: "Open Tasks", value: "124" },
  { label: "Completion Rate", value: "92%" },
];

export default function DashboardShellMinimal() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="rounded-lg py-0 shadow-none">
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
