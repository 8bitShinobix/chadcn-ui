import { ThemeProvider } from "@/components/layout/theme-provider";
import { TopBar } from "@/components/layout/top-bar";
import { Toaster } from "sonner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TopBar />
        <div id="main-content" className="pt-14">
          {children}
        </div>

        <Toaster position="bottom-right" />
      </ThemeProvider>
    </>
  );
}
