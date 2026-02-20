"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ErrorMinimal() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <AlertTriangle className="text-muted-foreground" size={48} />
      <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <Button className="mt-6">
        <RefreshCw size={16} className="mr-2" />
        Try Again
      </Button>
    </div>
  )
}
