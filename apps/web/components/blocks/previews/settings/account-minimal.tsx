"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function AccountMinimal() {
  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-2xl font-semibold">Account</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <Separator className="mt-4" />
      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="johndoe" />
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
