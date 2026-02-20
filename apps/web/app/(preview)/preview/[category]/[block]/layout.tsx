"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

function PreviewLayoutInner({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const searchParams = useSearchParams()
  const theme = searchParams.get("theme") || "dark"

  useEffect(() => {
    // Apply theme class to html element
    document.documentElement.className = theme
    // Hide scrollbar visually but keep scrollable
    document.documentElement.style.scrollbarWidth = "none" // Firefox
    document.body.style.scrollbarWidth = "none"
    // For webkit browsers (Chrome, Safari) + hide Next.js dev indicator
    const style = document.createElement("style")
    style.textContent = `
      ::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }
      [data-nextjs-dev-tools], nextjs-portal { display: none !important; }
    `
    document.head.appendChild(style)
    return () => {
      document.documentElement.style.scrollbarWidth = ""
      document.body.style.scrollbarWidth = ""
      style.remove()
    }
  }, [theme])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      {children}
    </div>
  )
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background p-8">
          {children}
        </div>
      }
    >
      <PreviewLayoutInner>{children}</PreviewLayoutInner>
    </Suspense>
  )
}
