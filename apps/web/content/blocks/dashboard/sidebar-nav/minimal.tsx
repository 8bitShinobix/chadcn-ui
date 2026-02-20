"use client"

import {
  Home,
  FolderKanban,
  CheckSquare,
  Settings,
  Users,
  BarChart3,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", icon: Home, isActive: true },
  { title: "Projects", icon: FolderKanban },
  { title: "Tasks", icon: CheckSquare },
  { title: "Analytics", icon: BarChart3 },
  { title: "Team", icon: Users },
  { title: "Settings", icon: Settings },
]

export function SidebarNav() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href="#">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Select a page from the sidebar to navigate.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
