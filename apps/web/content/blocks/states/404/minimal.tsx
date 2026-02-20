"use client"

import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <div className="text-7xl font-bold text-muted-foreground/50">404</div>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button className="mt-6">
        <Home className="mr-2 h-4 w-4" />
        Go Home
      </Button>
    </div>
  )
}
