"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function NotificationsStandard() {
  const [settings, setSettings] = useState({
    marketing: { email: true, push: false },
    security: { email: true, push: true },
    updates: { email: false, push: true },
  })

  const toggle = (category: keyof typeof settings, channel: "email" | "push") => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel],
      },
    }))
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Notifications</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose what notifications you want to receive and how
        </p>
      </div>

      <Separator className="mt-4" />

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-base font-medium">Marketing</h3>
          <p className="text-sm text-muted-foreground">
            Promotional content and special offers
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Email</Label>
              <Switch checked={settings.marketing.email} onCheckedChange={() => toggle("marketing", "email")} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Push</Label>
              <Switch checked={settings.marketing.push} onCheckedChange={() => toggle("marketing", "push")} />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-base font-medium">Security Alerts</h3>
          <p className="text-sm text-muted-foreground">
            Important security updates and account activity
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Email</Label>
              <Switch checked={settings.security.email} onCheckedChange={() => toggle("security", "email")} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Push</Label>
              <Switch checked={settings.security.push} onCheckedChange={() => toggle("security", "push")} />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-base font-medium">Product Updates</h3>
          <p className="text-sm text-muted-foreground">
            New features and product announcements
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Email</Label>
              <Switch checked={settings.updates.email} onCheckedChange={() => toggle("updates", "email")} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Push</Label>
              <Switch checked={settings.updates.push} onCheckedChange={() => toggle("updates", "push")} />
            </div>
          </div>
        </div>
      </div>

      <Button className="mt-6 w-full">Save Preferences</Button>
    </div>
  )
}
