"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SecurityMinimal() {
  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-2xl font-bold">Security</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your password.
        </p>
      </div>
      <Separator className="my-6" />
      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            placeholder="Enter current password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
          />
        </div>
        <Button type="submit">Update Password</Button>
      </form>
    </div>
  )
}
