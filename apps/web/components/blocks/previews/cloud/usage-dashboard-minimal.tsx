"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Globe, Zap, Clock, HardDrive } from "lucide-react";

const metrics = [
  {
    name: "Bandwidth",
    icon: Globe,
    used: 45.2,
    limit: 100,
    unit: "GB",
  },
  {
    name: "Requests",
    icon: Zap,
    used: 1.2,
    limit: 5,
    unit: "M",
  },
  {
    name: "Build Minutes",
    icon: Clock,
    used: 320,
    limit: 1000,
    unit: "min",
  },
  {
    name: "Storage",
    icon: HardDrive,
    used: 2.1,
    limit: 5,
    unit: "GB",
  },
];

export default function UsageDashboardMinimal() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-lg font-semibold">Usage</h2>
        <p className="text-muted-foreground text-sm">
          Current billing period: Feb 1 &ndash; Feb 28, 2026
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((metric) => {
          const percentage = (metric.used / metric.limit) * 100;
          return (
            <Card key={metric.name} className="gap-4 py-4 shadow-none">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <metric.icon className="text-muted-foreground size-4" />
                  <CardTitle className="text-sm font-medium">
                    {metric.name}
                  </CardTitle>
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
