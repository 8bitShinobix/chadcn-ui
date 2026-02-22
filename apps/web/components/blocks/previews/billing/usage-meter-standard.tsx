"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const usageData = [
  { name: "API Calls", used: 7500, limit: 10000, unit: "calls" },
  { name: "Storage", used: 3.2, limit: 5, unit: "GB" },
  { name: "Bandwidth", used: 45, limit: 100, unit: "GB" },
];

function getColor(pct: number) {
  if (pct > 90) return "bg-foreground/90";
  if (pct > 70) return "bg-foreground/60";
  return "bg-primary";
}

export default function UsageMeterStandard() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Redirecting to upgrade...");
    }, 2000);
  };

  return (
    <div className="mx-auto w-full max-w-lg p-6">
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
      <Separator className="mt-6" />
      <Card className="mt-6 rounded-lg py-0 shadow-none">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium">Need more resources?</p>
            <p className="text-muted-foreground text-xs">Upgrade your plan for higher limits.</p>
          </div>
          <Button size="sm" onClick={handleUpgrade} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Upgrade Plan"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
