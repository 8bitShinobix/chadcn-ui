"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Coins,
  DollarSign,
  Activity,
  Gauge,
  TrendingUp,
} from "lucide-react"

interface ModelUsage {
  model: string
  tokens: number
  promptTokens: number
  completionTokens: number
  cost: number
  requests: number
}

const MODEL_DATA: Record<string, ModelUsage[]> = {
  "7d": [
    { model: "GPT-4o", tokens: 524300, promptTokens: 367010, completionTokens: 157290, cost: 22.47, requests: 1420 },
    { model: "Claude 3.5 Sonnet", tokens: 489200, promptTokens: 342440, completionTokens: 146760, cost: 18.65, requests: 1580 },
    { model: "Gemini Pro", tokens: 271100, promptTokens: 189770, completionTokens: 81330, cost: 7.20, requests: 847 },
  ],
  "1d": [
    { model: "GPT-4o", tokens: 74900, promptTokens: 52430, completionTokens: 22470, cost: 3.21, requests: 203 },
    { model: "Claude 3.5 Sonnet", tokens: 69886, promptTokens: 48920, completionTokens: 20966, cost: 2.66, requests: 226 },
    { model: "Gemini Pro", tokens: 38729, promptTokens: 27110, completionTokens: 11619, cost: 1.03, requests: 121 },
  ],
  "30d": [
    { model: "GPT-4o", tokens: 2245000, promptTokens: 1571500, completionTokens: 673500, cost: 96.32, requests: 6086 },
    { model: "Claude 3.5 Sonnet", tokens: 2096000, promptTokens: 1467200, completionTokens: 628800, cost: 79.94, requests: 6771 },
    { model: "Gemini Pro", tokens: 1162000, promptTokens: 813400, completionTokens: 348600, cost: 30.86, requests: 3630 },
  ],
}

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

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export function TokenUsage() {
  const [dateRange, setDateRange] = useState("7d")
  const models = MODEL_DATA[dateRange]
  const totalTokens = models.reduce((s, m) => s + m.tokens, 0)
  const totalCost = models.reduce((s, m) => s + m.cost, 0)
  const totalRequests = models.reduce((s, m) => s + m.requests, 0)
  const costPerRequest = totalCost / totalRequests

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header with Date Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Token Usage</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your API usage and costs
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Today</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tokens
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalTokens)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from previous period
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
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +8.1% from previous period
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
            <div className="text-2xl font-bold">{formatNumber(totalRequests)}</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cost / Request
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${costPerRequest.toFixed(4)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average across all models
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Daily Token Usage
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

      {/* Model Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Usage by Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Tokens</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead>Prompt / Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => {
                const promptPct = Math.round(
                  (model.promptTokens / model.tokens) * 100
                )
                return (
                  <TableRow key={model.model}>
                    <TableCell className="font-medium">
                      {model.model}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(model.tokens)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${model.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(model.requests)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${promptPct}%` }}
                          />
                          <div
                            className="h-full bg-primary/40"
                            style={{ width: `${100 - promptPct}%` }}
                          />
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {promptPct}/{100 - promptPct}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rate Limit Indicator */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Rate Limit Status
          </CardTitle>
          <Gauge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Requests per minute
              </span>
              <span className="font-medium">
                847 / 1,000
                <Badge variant="outline" className="ml-2">
                  84.7%
                </Badge>
              </span>
            </div>
            <Progress value={84.7} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Tokens per minute
              </span>
              <span className="font-medium">
                124,600 / 200,000
                <Badge variant="outline" className="ml-2">
                  62.3%
                </Badge>
              </span>
            </div>
            <Progress value={62.3} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
