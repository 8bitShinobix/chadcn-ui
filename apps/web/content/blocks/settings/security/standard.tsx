"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Shield } from "lucide-react"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-bold">Security</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your security preferences.
        </p>
      </div>
      <Separator className="my-6" />

      {/* Change Password Section */}
      <div>
        <h3 className="text-lg font-semibold">Change Password</h3>
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

      <Separator className="mt-8" />

      {/* Two-Factor Authentication Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Two-Factor Authentication</h3>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Add an extra layer of security to your account.
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
          />
        </div>
        <p className="mt-2 text-sm">
          {twoFactorEnabled ? (
            <span className="text-muted-foreground">
              Two-factor authentication is enabled.
            </span>
          ) : (
            <span className="text-muted-foreground">
              Two-factor authentication is disabled.
            </span>
          )}
        </p>
      </div>

      <Button className="mt-6">Save Changes</Button>
    </div>
  )
}
