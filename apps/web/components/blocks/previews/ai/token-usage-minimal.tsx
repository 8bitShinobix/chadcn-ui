"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, DollarSign, Activity } from "lucide-react"

const DAILY_USAGE = [
  { day: "Mon", tokens: 12400 },
  { day: "Tue", tokens: 18200 },
  { day: "Wed", tokens: 9800 },
  { day: "Thu", tokens: 24100 },
  { day: "Fri", tokens: 15600 },
  { day: "Sat", tokens: 7200 },
  { day: "Sun", tokens: 21300 },
]

const maxTokens = Math.max(...DAILY_USAGE.map((d) => d.tokens))

export default function TokenUsageMinimal() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tokens
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284,600</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cost
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48.32</div>
            <p className="text-xs text-muted-foreground">
              +8.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Requests
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,847</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Usage Over Last 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-3">
            {DAILY_USAGE.map((entry) => (
              <div
                key={entry.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs text-muted-foreground">
                  {(entry.tokens / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full rounded-t-md bg-primary transition-all"
                  style={{
                    height: `${(entry.tokens / maxTokens) * 100}%`,
                    minHeight: "4px",
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {entry.day}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
