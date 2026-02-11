import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main id="main-content" className="flex-1 px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
