"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServerErrorPage() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <div className="text-7xl font-bold text-muted-foreground/50">500</div>
      <h1 className="mt-4 text-xl font-semibold">Server error</h1>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
        Something went wrong on our end. Please try again later.
      </p>
      <Button className="mt-6">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  )
}
