"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Scratch from "@/components/blocks/previews/_sandbox/scratch";

function SandboxPreviewInner(): React.ReactElement {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "dark";

  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.scrollbarWidth = "none";
    document.body.style.scrollbarWidth = "none";

    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }
      [data-nextjs-dev-tools], nextjs-portal { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.scrollbarWidth = "";
      document.body.style.scrollbarWidth = "";
      style.remove();
    };
  }, [theme]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <Scratch />
    </div>
  );
}

export function SandboxPreview(): React.ReactElement {
  return (
    <Suspense
      fallback={
        <div className="bg-background flex min-h-screen items-center justify-center p-8">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      }
    >
      <SandboxPreviewInner />
    </Suspense>
  );
}
