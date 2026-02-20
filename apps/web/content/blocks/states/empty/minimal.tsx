"use client"

import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <Inbox className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-semibold">No items yet</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        Get started by creating your first item.
      </p>
      <Button className="mt-6">Create Item</Button>
    </div>
  )
}
