"use client"

import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ErrorState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <AlertTriangle className="text-muted-foreground" size={48} />
      <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        We encountered an unexpected error while processing your request. Please try again or contact support if the problem persists.
      </p>
      <Badge variant="secondary" className="mt-3 font-mono">
        Error code: ERR_500_INTERNAL
      </Badge>
      <div className="mt-6 flex gap-3">
        <Button>
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </Button>
        <Button variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  )
}
