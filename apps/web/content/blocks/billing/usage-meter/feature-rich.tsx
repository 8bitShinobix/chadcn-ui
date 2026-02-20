"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const usageData = [
  { name: "API Calls", used: 7500, limit: 10000, unit: "calls" },
  { name: "Storage", used: 3.2, limit: 5, unit: "GB" },
  { name: "Bandwidth", used: 45, limit: 100, unit: "GB" },
];

const dailyUsage = [
  { day: "Mon", calls: 1200 },
  { day: "Tue", calls: 1800 },
  { day: "Wed", calls: 950 },
  { day: "Thu", calls: 2100 },
  { day: "Fri", calls: 1600 },
  { day: "Sat", calls: 400 },
  { day: "Sun", calls: 450 },
];

function getColor(pct: number) {
  if (pct > 90) return "bg-foreground/90";
  if (pct > 70) return "bg-foreground/60";
  return "bg-primary";
}

export function UsageMeter() {
  const maxCalls = Math.max(...dailyUsage.map((d) => d.calls));

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-lg font-semibold">Resource Usage</h2>
        <p className="text-muted-foreground text-sm">
          Current billing period: Jan 1 – Jan 31, 2024
        </p>
      </div>
      <Separator className="my-6" />
      <div className="mt-6 space-y-6">
        {usageData.map((item) => {
          const percentage = (item.used / item.limit) * 100;
          return (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">
                  {item.used} / {item.limit} {item.unit} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="bg-muted h-2 w-full rounded-full">
                <div
                  className={cn("h-full rounded-full", getColor(percentage))}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Card className="mt-4 rounded-lg bg-muted py-0 shadow-none">
        <CardContent className="flex items-start gap-2 p-3">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-sm text-foreground">
            You&apos;ve used 75% of your API calls. Consider upgrading to avoid interruptions.
          </p>
        </CardContent>
      </Card>
      <Separator className="my-6" />
      <div className="mt-6">
        <h3 className="text-base font-medium">Daily API Usage</h3>
        <div className="mt-4 flex h-32 items-end gap-2">
          {dailyUsage.map((day) => (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="bg-primary w-full rounded-t"
                style={{ height: `${(day.calls / maxCalls) * 100}%` }}
              />
              <span className="text-muted-foreground text-xs">{day.day}</span>
              <span className="text-xs font-medium">{day.calls}</span>
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-6" />
      <div className="mt-6">
        <h3 className="text-base font-medium">Breakdown</h3>
        <div className="mt-4 space-y-2">
          {usageData.map((item) => {
            const percentage = (item.used / item.limit) * 100;
            return (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">
                  {item.used} / {item.limit} {item.unit}
                </span>
                <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <Separator className="my-6" />
      <Card className="mt-6 rounded-lg py-0 shadow-none">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium">Need more resources?</p>
            <p className="text-muted-foreground text-xs">Upgrade your plan for higher limits.</p>
          </div>
          <Button size="sm">Upgrade Plan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
