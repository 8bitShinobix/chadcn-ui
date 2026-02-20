"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function ProfileSettings() {
  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <h2 className="text-lg font-semibold">Profile</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Manage your personal information.
      </p>
      <Separator className="mt-4" />
      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john@example.com" />
        </div>
        <Button>Save Changes</Button>
      </form>
    </div>
  )
}
