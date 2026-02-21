"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Globe,
  Zap,
  Clock,
  HardDrive,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Bell,
} from "lucide-react";

const metrics = [
  {
    name: "Bandwidth",
    icon: Globe,
    used: 82.4,
    limit: 100,
    unit: "GB",
    cost: 22.5,
    trend: 18.3,
    trendDirection: "up" as const,
    prevUsed: 69.7,
  },
  {
    name: "Requests",
    icon: Zap,
    used: 4.3,
    limit: 5,
    unit: "M",
    cost: 8.6,
    trend: 24.1,
    trendDirection: "up" as const,
    prevUsed: 3.5,
  },
  {
    name: "Build Minutes",
    icon: Clock,
    used: 320,
    limit: 1000,
    unit: "min",
    cost: 6.4,
    trend: -8.5,
    trendDirection: "down" as const,
    prevUsed: 350,
  },
  {
    name: "Storage",
    icon: HardDrive,
    used: 2.1,
    limit: 5,
    unit: "GB",
    cost: 4.2,
    trend: 3.1,
    trendDirection: "up" as const,
    prevUsed: 2.04,
  },
];

const dailyBandwidth = [
  { day: "Feb 7", value: 4.2 },
  { day: "Feb 8", value: 5.8 },
  { day: "Feb 9", value: 3.1 },
  { day: "Feb 10", value: 6.4 },
  { day: "Feb 11", value: 7.2 },
  { day: "Feb 12", value: 5.5 },
  { day: "Feb 13", value: 4.8 },
  { day: "Feb 14", value: 6.9 },
  { day: "Feb 15", value: 8.1 },
  { day: "Feb 16", value: 3.6 },
  { day: "Feb 17", value: 2.9 },
  { day: "Feb 18", value: 7.5 },
  { day: "Feb 19", value: 6.2 },
  { day: "Feb 20", value: 5.3 },
];

const projects = [
  {
    name: "marketing-site",
    bandwidth: 28.4,
    requests: 1520000,
    buildMinutes: 85,
    storage: 0.8,
    cost: 14.2,
  },
  {
    name: "api-backend",
    bandwidth: 32.8,
    requests: 2100000,
    buildMinutes: 120,
    storage: 0.6,
    cost: 16.8,
  },
  {
    name: "docs-portal",
    bandwidth: 14.2,
    requests: 480000,
    buildMinutes: 65,
    storage: 0.4,
    cost: 7.1,
  },
  {
    name: "staging-env",
    bandwidth: 7.0,
    requests: 200000,
    buildMinutes: 50,
    storage: 0.3,
    cost: 3.6,
  },
];

const teamMembers = [
  { name: "Sarah Chen", initials: "SC", bandwidth: 28.4, requests: 1.8 },
  { name: "Alex Rivera", initials: "AR", bandwidth: 32.1, requests: 1.6 },
  { name: "Jordan Park", initials: "JP", bandwidth: 21.9, requests: 0.9 },
];

const budgetAlerts = [
  { metric: "Bandwidth", threshold: 80, enabled: true },
  { metric: "Requests", threshold: 90, enabled: true },
  { metric: "Build Minutes", threshold: 75, enabled: false },
  { metric: "Storage", threshold: 85, enabled: true },
];

const costBreakdown = [
  { resource: "Bandwidth", amount: 22.5 },
  { resource: "Requests", amount: 8.6 },
  { resource: "Build Minutes", amount: 6.4 },
  { resource: "Storage", amount: 4.2 },
];

export default function UsageDashboardFeatureRich() {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const projectedCost = totalCost * 1.14;
  const maxBandwidth = Math.max(...dailyBandwidth.map((d) => d.value));

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Usage Dashboard</h2>
          <p className="text-muted-foreground text-sm">
            Monitor resource consumption, costs, and team attribution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-days">Last 7 Days</SelectItem>
              <SelectItem value="30-days">Last 30 Days</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const percentage = (metric.used / metric.limit) * 100;
          const isNearLimit = percentage > 80;
          return (
            <Card key={metric.name} className="gap-3 py-4 shadow-none">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="text-muted-foreground size-4" />
                    <CardTitle className="text-sm font-medium">
                      {metric.name}
                    </CardTitle>
                  </div>
                  {isNearLimit && (
                    <AlertTriangle className="size-4 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-semibold">
                    {metric.used} {metric.unit}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    / {metric.limit} {metric.unit}
                  </span>
                </div>
                <Progress value={percentage} />
                <div className="flex items-center gap-1 text-xs">
                  {metric.trendDirection === "up" ? (
                    <TrendingUp className="size-3 text-muted-foreground" />
                  ) : (
                    <TrendingDown className="size-3 text-muted-foreground" />
                  )}
                  <span className="font-medium text-muted-foreground">
                    {metric.trend > 0 ? "+" : ""}
                    {metric.trend}%
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="chart" className="w-full">
        <TabsList>
          <TabsTrigger value="chart">Daily Usage</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Daily Usage Bar Chart */}
        <TabsContent value="chart" className="mt-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Daily Bandwidth Usage (GB)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-2">
                {dailyBandwidth.map((day) => {
                  const heightPct = (day.value / maxBandwidth) * 100;
                  return (
                    <div
                      key={day.day}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <span className="text-muted-foreground text-xs font-medium">
                        {day.value}
                      </span>
                      <div className="flex w-full items-end justify-center" style={{ height: "140px" }}>
                        <div
                          className="bg-primary w-full max-w-[32px] rounded-t"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-[10px]">
                        {day.day.split(" ")[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Per-Project Table */}
        <TabsContent value="projects" className="mt-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Per-Project Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Bandwidth</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Build Min</TableHead>
                    <TableHead className="text-right">Storage</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.name}>
                      <TableCell className="font-medium font-mono text-sm">
                        {project.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {project.bandwidth} GB
                      </TableCell>
                      <TableCell className="text-right">
                        {project.requests >= 1000000
                          ? `${(project.requests / 1000000).toFixed(1)}M`
                          : `${(project.requests / 1000).toFixed(0)}K`}
                      </TableCell>
                      <TableCell className="text-right">
                        {project.buildMinutes}
                      </TableCell>
                      <TableCell className="text-right">
                        {project.storage} GB
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${project.cost.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Costs & Projections */}
        <TabsContent value="costs" className="mt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {costBreakdown.map((item) => (
                  <div
                    key={item.resource}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.resource}
                    </span>
                    <span className="font-medium">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Current Total</span>
                  <span className="text-lg font-semibold">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Cost Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">
                    Projected cost this month
                  </p>
                  <p className="text-3xl font-semibold">
                    ${projectedCost.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="size-3 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">
                    +14% vs last month
                  </span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Period Comparison</p>
                  {metrics.map((metric) => {
                    const prevPct = (metric.prevUsed / metric.limit) * 100;
                    const currPct = (metric.used / metric.limit) * 100;
                    return (
                      <div key={metric.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{metric.name}</span>
                          <span>
                            {metric.prevUsed} &rarr; {metric.used} {metric.unit}
                          </span>
                        </div>
                        <div className="flex gap-1 h-2">
                          <div className="bg-muted relative flex-1 rounded-full overflow-hidden">
                            <div
                              className="bg-muted-foreground/30 h-full rounded-full"
                              style={{ width: `${prevPct}%` }}
                            />
                          </div>
                          <div className="bg-muted relative flex-1 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${currPct}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>Previous</span>
                          <span>Current</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Attribution */}
        <TabsContent value="team" className="mt-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Team Member Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => {
                const bandwidthPct =
                  (member.bandwidth /
                    metrics.find((m) => m.name === "Bandwidth")!.used) *
                  100;
                return (
                  <div key={member.name} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-8 items-center justify-center rounded-full text-xs font-medium">
                        {member.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {member.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {member.bandwidth} GB bandwidth &middot;{" "}
                            {member.requests}M requests
                          </span>
                        </div>
                        <Progress
                          value={bandwidthPct}
                          className="mt-1.5 h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Alerts */}
        <TabsContent value="alerts" className="mt-6">
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">
                  Budget Alerts
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {budgetAlerts.map((alert) => (
                <div
                  key={alert.metric}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-1">
                    <Label className="text-sm font-medium">
                      {alert.metric}
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        Alert at
                      </span>
                      <Input
                        type="number"
                        defaultValue={alert.threshold}
                        className="h-7 w-16 text-xs"
                      />
                      <span className="text-muted-foreground text-xs">
                        % usage
                      </span>
                    </div>
                  </div>
                  <Switch defaultChecked={alert.enabled} />
                </div>
              ))}
              <Separator />
              <Button variant="outline" size="sm" className="w-full">
                Save Alert Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
