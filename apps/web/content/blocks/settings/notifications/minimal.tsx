"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Notifications</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage how you receive notifications
        </p>
      </div>

      <Separator className="mt-4" />

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch checked={settings.email} onCheckedChange={() => toggle("email")} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your devices
            </p>
          </div>
          <Switch checked={settings.push} onCheckedChange={() => toggle("push")} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via text message
            </p>
          </div>
          <Switch checked={settings.sms} onCheckedChange={() => toggle("sms")} />
        </div>
      </div>

      <Button className="mt-6 w-full">Save Preferences</Button>
    </div>
  )
}
