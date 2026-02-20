"use client"

import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundStandard() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <div className="text-8xl font-bold text-muted-foreground/30">404</div>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        removed, renamed, or didn&apos;t exist in the first place.
      </p>
      <div className="mt-6 flex gap-3">
        <Button>
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Or try searching for what you need
      </p>
    </div>
  )
}
