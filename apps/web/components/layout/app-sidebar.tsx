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
import { usePathname } from "next/navigation";
import { NewBadge } from "./new-badge";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarContent className="pt-5 pb-5">
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
                          <SidebarMenuSubButton asChild isActive={pathname === item.href}>
                            <Link href={item.href}>
                              {item.title}
                              {item.badge === "new" && <NewBadge />}
                            </Link>
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
      <div className="from-background pointer-events-none fixed top-14 left-0 z-50 hidden h-32 w-64 bg-gradient-to-b to-transparent lg:block" />
      <div className="from-background pointer-events-none fixed bottom-0 left-0 z-50 hidden h-32 w-64 bg-gradient-to-t to-transparent lg:block" />
    </>
  );
}
