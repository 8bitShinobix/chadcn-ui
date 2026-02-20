"use client"

import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6">
      <div className="relative">
        <div className="text-[120px] sm:text-[160px] font-bold leading-none text-muted-foreground/10 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
          Page Not Found
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground text-center max-w-md">
        The page you&apos;re looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex w-full max-w-sm gap-2">
        <Input placeholder="Search for pages..." className="flex-1" />
        <Button>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-8 w-full max-w-sm">
        <h2 className="text-sm font-medium mb-3">Popular pages</h2>
        <div className="space-y-2">
          <Button variant="link" className="h-auto p-0 text-sm">
            Documentation
          </Button>
          <br />
          <Button variant="link" className="h-auto p-0 text-sm">
            Dashboard
          </Button>
          <br />
          <Button variant="link" className="h-auto p-0 text-sm">
            Settings
          </Button>
          <br />
          <Button variant="link" className="h-auto p-0 text-sm">
            API Reference
          </Button>
        </div>
      </div>
      <Button className="mt-6">
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    </div>
  )
}
