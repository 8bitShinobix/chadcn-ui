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
  Globe,
  Zap,
  Clock,
  HardDrive,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

const metrics = [
  {
    name: "Bandwidth",
    icon: Globe,
    used: 45.2,
    limit: 100,
    unit: "GB",
    cost: 12.5,
    trend: 12.3,
    trendDirection: "up" as const,
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
  },
];

const projects = [
  {
    name: "marketing-site",
    bandwidth: 18.4,
    requests: 520000,
    percentage: 41,
  },
  {
    name: "api-backend",
    bandwidth: 15.8,
    requests: 2100000,
    percentage: 35,
  },
  {
    name: "docs-portal",
    bandwidth: 11.0,
    requests: 380000,
    percentage: 24,
  },
];

const costBreakdown = [
  { resource: "Bandwidth", amount: 12.5 },
  { resource: "Requests", amount: 8.6 },
  { resource: "Build Minutes", amount: 6.4 },
  { resource: "Storage", amount: 4.2 },
];

export default function UsageDashboardStandard() {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Usage Dashboard</h2>
          <p className="text-muted-foreground text-sm">
            Monitor resource consumption and costs
          </p>
        </div>
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
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {metrics.map((metric) => {
              const percentage = (metric.used / metric.limit) * 100;
              const isNearLimit = percentage > 80;
              return (
                <Card key={metric.name} className="gap-4 py-4 shadow-none">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <metric.icon className="text-muted-foreground size-4" />
                        <CardTitle className="text-sm font-medium">
                          {metric.name}
                        </CardTitle>
                      </div>
                      {isNearLimit && (
                        <Badge
                          variant="secondary"
                          className="text-foreground/80 gap-1 text-xs"
                        >
                          <AlertTriangle className="size-3" />
                          {percentage.toFixed(0)}% used
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-semibold">
                        {metric.used} {metric.unit}
                      </span>
                      <span className="text-muted-foreground text-sm">
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
                      <span
                        className={cn(
                          "font-medium",
                          metric.trendDirection === "up"
                            ? "text-muted-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {metric.trend > 0 ? "+" : ""}
                        {metric.trend}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Per-Project Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium font-mono">
                      {project.name}
                    </span>
                    <span className="text-muted-foreground">
                      {project.percentage}% of total
                    </span>
                  </div>
                  <Progress value={project.percentage} />
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Bandwidth: {project.bandwidth} GB</span>
                    <span>
                      Requests:{" "}
                      {project.requests >= 1000000
                        ? `${(project.requests / 1000000).toFixed(1)}M`
                        : `${(project.requests / 1000).toFixed(0)}K`}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="mt-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Cost Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {costBreakdown.map((item) => (
                <div
                  key={item.resource}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{item.resource}</span>
                  <span className="font-medium">
                    ${item.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total Estimated</span>
                <span className="text-lg font-semibold">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Full Billing Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
