"use client"

import { Wrench, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MaintenanceMinimal() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <Wrench className="h-12 w-12 text-muted-foreground" />
      <h1 className="mt-4 text-xl font-semibold">We&apos;ll be back soon</h1>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        We&apos;re performing scheduled maintenance to improve your experience.
        Please check back shortly.
      </p>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Estimated time: ~30 minutes</span>
      </div>
      <Button className="mt-6" variant="outline">
        Refresh Page
      </Button>
    </div>
  )
}
