"use client"

import { cn } from "@/lib/utils"

const usageData = [
  { name: "API Calls", used: 7500, limit: 10000, unit: "calls" },
  { name: "Storage", used: 3.2, limit: 5, unit: "GB" },
  { name: "Bandwidth", used: 45, limit: 100, unit: "GB" },
]

function getColor(pct: number) {
  if (pct > 90) return "bg-foreground/90"
  if (pct > 70) return "bg-foreground/60"
  return "bg-primary"
}

export default function UsageMeterMinimal() {
  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <h2 className="text-lg font-semibold">Usage</h2>
      <div className="mt-6 space-y-6">
        {usageData.map((item) => {
          const percentage = (item.used / item.limit) * 100
          return (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">
                  {item.used} / {item.limit} {item.unit}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", getColor(percentage))}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
