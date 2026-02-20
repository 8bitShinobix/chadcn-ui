"use client"

import { AlertTriangle, RefreshCw, Home, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServerErrorStandard() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <AlertTriangle className="text-muted-foreground" size={48} />
      <div className="mt-2 text-6xl font-bold text-muted-foreground/40">500</div>
      <h1 className="mt-4 text-xl font-semibold">Internal Server Error</h1>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        We&apos;re experiencing technical difficulties. Our team has been notified and is working on a fix.
      </p>
      <div className="mt-6 flex gap-3">
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline">
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
      </div>
      <Button variant="link" className="mt-4 text-sm h-auto p-0">
        Check system status
        <ExternalLink className="ml-1 h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
