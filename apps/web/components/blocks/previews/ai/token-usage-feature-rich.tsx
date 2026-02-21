"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  Download,
  AlertTriangle,
  ArrowUpRight,
  Users,
} from "lucide-react"

interface ModelUsage {
  model: string
  tokens: number
  promptTokens: number
  completionTokens: number
  cost: number
  requests: number
}

interface TeamUsage {
  team: string
  project: string
  tokens: number
  cost: number
  requests: number
  trend: "up" | "down" | "stable"
  anomaly?: boolean
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

const TEAM_USAGE: TeamUsage[] = [
  { team: "Engineering", project: "Copilot Integration", tokens: 482000, cost: 19.28, requests: 1240, trend: "up", anomaly: true },
  { team: "Product", project: "User Research Bot", tokens: 215000, cost: 8.60, requests: 680, trend: "stable" },
  { team: "Marketing", project: "Content Generator", tokens: 178000, cost: 7.12, requests: 520, trend: "up" },
  { team: "Support", project: "Ticket Classifier", tokens: 142000, cost: 5.68, requests: 890, trend: "down" },
  { team: "Data Science", project: "Analysis Pipeline", tokens: 267600, cost: 7.64, requests: 517, trend: "up", anomaly: true },
]

const DAILY_USAGE = [
  { day: "Mon", tokens: 12400 },
  { day: "Tue", tokens: 18200 },
  { day: "Wed", tokens: 9800 },
  { day: "Thu", tokens: 24100 },
  { day: "Fri", tokens: 15600 },
  { day: "Sat", tokens: 7200 },
  { day: "Sun", tokens: 21300 },
]

const MODEL_COST_COMPARISON = [
  { model: "GPT-4o", costPer1k: 0.03 },
  { model: "Claude 3.5", costPer1k: 0.024 },
  { model: "Gemini Pro", costPer1k: 0.0125 },
]

const maxCostPer1k = Math.max(...MODEL_COST_COMPARISON.map((m) => m.costPer1k))
const maxTokens = Math.max(...DAILY_USAGE.map((d) => d.tokens))

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export default function TokenUsageFeatureRich() {
  const [dateRange, setDateRange] = useState("7d")
  const [budgetLimit, setBudgetLimit] = useState("500")
  const [alertThreshold, setAlertThreshold] = useState("80")

  const models = MODEL_DATA[dateRange]
  const totalTokens = models.reduce((s, m) => s + m.tokens, 0)
  const totalCost = models.reduce((s, m) => s + m.cost, 0)
  const totalRequests = models.reduce((s, m) => s + m.requests, 0)
  const costPerRequest = totalCost / totalRequests

  const monthlyBudget = parseFloat(budgetLimit) || 500
  const currentMonthSpend = 207.12
  const budgetPct = Math.min((currentMonthSpend / monthlyBudget) * 100, 100)
  const thresholdPct = parseFloat(alertThreshold) || 80
  const isOverThreshold = budgetPct >= thresholdPct

  // Projection based on current daily rate
  const daysElapsed = 14
  const daysInMonth = 30
  const projectedSpend = (currentMonthSpend / daysElapsed) * daysInMonth

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Token Usage Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive usage analytics and cost management
          </p>
        </div>
        <div className="flex items-center gap-2">
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
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Daily Bar Chart */}
        <Card className="lg:col-span-2">
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

        {/* Model Cost Comparison Mini Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Cost per 1k Tokens
            </CardTitle>
            <CardDescription>Model comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {MODEL_COST_COMPARISON.map((m) => (
              <div key={m.model} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.model}</span>
                  <span className="font-medium">${m.costPer1k.toFixed(4)}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${(m.costPer1k / maxCostPer1k) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

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

      {/* Team / Project Breakdown */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">
              Team &amp; Project Breakdown
            </CardTitle>
            <CardDescription>
              Usage by team and project across your organization
            </CardDescription>
          </div>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Tokens</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM_USAGE.map((team) => (
                <TableRow key={`${team.team}-${team.project}`}>
                  <TableCell className="font-medium">{team.team}</TableCell>
                  <TableCell>{team.project}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(team.tokens)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${team.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(team.requests)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {team.trend === "up" && (
                        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                      )}
                      {team.trend === "down" && (
                        <ArrowUpRight className="h-3 w-3 rotate-90 text-red-500" />
                      )}
                      {team.trend === "stable" && (
                        <span className="text-xs text-muted-foreground">--</span>
                      )}
                      {team.anomaly && (
                        <Badge variant="destructive" className="text-[10px]">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Spike
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Budget & Projection Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Budget Alert Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Budget Configuration
            </CardTitle>
            <CardDescription>
              Set monthly spending limits and alert thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget-limit">Monthly Budget ($)</Label>
                <Input
                  id="budget-limit"
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  placeholder="500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                <Input
                  id="alert-threshold"
                  type="number"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  placeholder="80"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Current month spend
                </span>
                <span className="font-medium">
                  ${currentMonthSpend.toFixed(2)} / ${monthlyBudget.toFixed(2)}
                </span>
              </div>
              <div className="relative">
                <Progress value={budgetPct} />
                {/* Threshold marker */}
                <div
                  className="absolute top-0 h-2 w-0.5 bg-destructive"
                  style={{ left: `${thresholdPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{budgetPct.toFixed(1)}% used</span>
                {isOverThreshold && (
                  <Badge variant="destructive" className="text-[10px]">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Over {thresholdPct}% threshold
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Projection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Usage Projection
            </CardTitle>
            <CardDescription>
              Estimated end-of-month spend based on current rate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Daily average
                </span>
                <span className="text-sm font-medium">
                  ${(currentMonthSpend / daysElapsed).toFixed(2)} / day
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Projected monthly spend
                </span>
                <span className="text-lg font-bold">
                  ${projectedSpend.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Budget remaining
                </span>
                <span
                  className={`text-sm font-medium ${
                    projectedSpend > monthlyBudget
                      ? "text-destructive"
                      : "text-emerald-500"
                  }`}
                >
                  {projectedSpend > monthlyBudget
                    ? `-$${(projectedSpend - monthlyBudget).toFixed(2)} over budget`
                    : `$${(monthlyBudget - projectedSpend).toFixed(2)} under budget`}
                </span>
              </div>
            </div>

            <Separator />

            {/* Rate Limit Status */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Rate Limits</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">RPM</span>
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
                  <span className="text-muted-foreground">TPM</span>
                  <span className="font-medium">
                    124.6k / 200k
                    <Badge variant="outline" className="ml-2">
                      62.3%
                    </Badge>
                  </span>
                </div>
                <Progress value={62.3} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
