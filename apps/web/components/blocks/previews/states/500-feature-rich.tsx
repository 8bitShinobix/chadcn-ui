"use client"

import { useState } from "react"
import { AlertTriangle, RefreshCw, Home, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ServerErrorFeatureRich() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6">
      <div className="relative">
        <div className="text-[120px] sm:text-[160px] font-bold leading-none text-muted-foreground/10 select-none">
          500
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AlertTriangle className="text-muted-foreground" size={40} />
        </div>
      </div>

      <h1 className="mt-6 text-2xl font-semibold">Internal Server Error</h1>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        Our servers encountered an unexpected error. We&apos;ve been notified and are investigating the issue.
      </p>

      <Button
        variant="ghost"
        className="mt-4 text-sm"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? (
          <ChevronUp className="mr-2 h-4 w-4" />
        ) : (
          <ChevronDown className="mr-2 h-4 w-4" />
        )}
        View error details
      </Button>

      {showDetails && (
        <Card className="mt-2 w-full max-w-md bg-muted/50">
          <CardContent className="p-4">
            <div className="font-mono text-xs space-y-1 text-muted-foreground">
              <div>Timestamp: 2024-01-15T10:23:45Z</div>
              <div>Request ID: req_abc123def456</div>
              <div>Status: 500 Internal Server Error</div>
              <div>Path: /api/v1/data</div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6 w-full max-w-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between rounded border px-3 py-2 text-sm">
            <span>API Server</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-foreground" />
              <span className="text-muted-foreground">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded border px-3 py-2 text-sm">
            <span>Database</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
              <span className="text-muted-foreground">Degraded</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded border px-3 py-2 text-sm">
            <span>CDN</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-foreground" />
              <span className="text-muted-foreground">Operational</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline">
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </div>
    </div>
  )
}
