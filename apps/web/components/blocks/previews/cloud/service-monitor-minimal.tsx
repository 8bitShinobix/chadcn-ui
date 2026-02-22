"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity } from "lucide-react";

interface Service {
  name: string;
  status: "healthy" | "degraded" | "down";
  uptime: string;
  lastChecked: string;
}

const services: Service[] = [
  { name: "API Server", status: "healthy", uptime: "99.98%", lastChecked: "12s ago" },
  { name: "Web Frontend", status: "healthy", uptime: "99.99%", lastChecked: "8s ago" },
  { name: "Worker Queue", status: "degraded", uptime: "98.72%", lastChecked: "15s ago" },
  { name: "Database", status: "healthy", uptime: "99.95%", lastChecked: "5s ago" },
  { name: "Cache (Redis)", status: "healthy", uptime: "99.97%", lastChecked: "10s ago" },
];

const statusColor: Record<Service["status"], string> = {
  healthy: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
};

const statusLabel: Record<Service["status"], string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};

export default function ServiceMonitorMinimal() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border bg-background">
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <Activity className="h-5 w-5 text-muted-foreground" />
        <div>
          <h2 className="text-sm font-semibold">Services</h2>
          <p className="text-xs text-muted-foreground">Real-time health overview</p>
        </div>
      </div>

      <div className="divide-y">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor[service.status]}`} />
              <div>
                <p className="text-sm font-medium">{service.name}</p>
                <p className="text-xs text-muted-foreground">Checked {service.lastChecked}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-muted-foreground">{service.uptime}</span>
              <Badge
                variant={service.status === "healthy" ? "secondary" : "destructive"}
                className="text-[10px]"
              >
                {statusLabel[service.status]}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <Separator />
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs text-muted-foreground">5 services monitored</span>
        <span className="text-xs text-muted-foreground">Auto-refreshing every 30s</span>
      </div>
    </div>
  );
}
