"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch";
;

export default function NotificationsFeatureRich() {
  const [settings, setSettings] = useState({
    comments: { email: true, push: true, sms: false },
    mentions: { email: true, push: true, sms: true },
    updates: { email: true, push: false, sms: false },
    marketing: { email: false, push: false, sms: false },
  });

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    start: "22:00",
    end: "08:00",
  });

  const toggle = (category: keyof typeof settings, channel: "email" | "push" | "sms") => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel],
      },
    }));
  };

  const toggleQuietHours = () => {
    setQuietHours((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const categories = [
    {
      key: "comments" as const,
      name: "Comments",
      description: "When someone comments on your posts",
    },
    {
      key: "mentions" as const,
      name: "Mentions",
      description: "When you're mentioned in a conversation",
    },
    {
      key: "updates" as const,
      name: "Updates",
      description: "Product updates and changelog",
    },
    {
      key: "marketing" as const,
      name: "Marketing",
      description: "Promotional emails and offers",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure how and when you want to be notified
        </p>
      </div>

      <Separator className="mt-4" />

      <div className="mt-6">
        <div className="grid grid-cols-4 gap-4 border-b pb-2">
          <div></div>
          <div className="text-muted-foreground text-center text-sm font-medium">Email</div>
          <div className="text-muted-foreground text-center text-sm font-medium">Push</div>
          <div className="text-muted-foreground text-center text-sm font-medium">SMS</div>
        </div>

        {categories.map((category) => (
          <div
            key={category.key}
            className="grid grid-cols-4 items-center gap-4 border-b py-3 last:border-0"
          >
            <div>
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-muted-foreground text-xs">{category.description}</div>
            </div>
            <div className="flex justify-center">
              <Switch checked={settings[category.key].email} onCheckedChange={() => toggle(category.key, "email")} />
            </div>
            <div className="flex justify-center">
              <Switch checked={settings[category.key].push} onCheckedChange={() => toggle(category.key, "push")} />
            </div>
            <div className="flex justify-center">
              <Switch checked={settings[category.key].sms} onCheckedChange={() => toggle(category.key, "sms")} />
            </div>
          </div>
        ))}
      </div>

      <Separator className="mt-6" />

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">Quiet Hours</h3>
            <p className="text-muted-foreground text-sm">
              Pause all notifications during specified hours
            </p>
          </div>
          <Switch checked={quietHours.enabled} onCheckedChange={toggleQuietHours} />
        </div>

        {quietHours.enabled && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">From</Label>
              <Input
                id="start-time"
                type="time"
                value={quietHours.start}
                onChange={(e) => setQuietHours((prev) => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="end-time">To</Label>
              <Input
                id="end-time"
                type="time"
                value={quietHours.end}
                onChange={(e) => setQuietHours((prev) => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>

      <Button className="mt-6 w-full">Save Preferences</Button>
    </div>
  );
}
