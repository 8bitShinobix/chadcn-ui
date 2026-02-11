"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { blockCategories } from "@/config/navigation";
import Link from "next/link";

export function AppSidebar() {
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {blockCategories.map((category) => (
                  <SidebarMenuItem key={category.title}>
                    <SidebarMenuButton>
                      <span>{category.title}</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {category.items.map((item) => (
                        <SidebarMenuSubItem key={item.href}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.href}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* Fixed gradient overlays - always visible on top and bottom */}
      <div
        className="pointer-events-none fixed left-0 top-14 z-50 h-32 w-64 hidden lg:block from-background to-transparent bg-gradient-to-b"
      />
      <div
        className="pointer-events-none fixed left-0 bottom-0 z-50 h-32 w-64 hidden lg:block from-background to-transparent bg-gradient-to-t"
      />
    </>
  );
}
