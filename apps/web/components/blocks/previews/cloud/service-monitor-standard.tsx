"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Activity,
  MoreVertical,
  RotateCcw,
  Square,
  FileText,
  Clock,
  Cpu,
  MemoryStick,
  Zap,
  RefreshCw,
} from "lucide-react";

interface Service {
  name: string;
  status: "healthy" | "degraded" | "down";
  uptime: string;
  responseTime: string;
  cpuUsage: number;
  memoryUsage: number;
  lastIncident: string;
  instances: number;
}

const services: Service[] = [
  {
    name: "API Server",
    status: "healthy",
    uptime: "99.98%",
    responseTime: "45ms",
    cpuUsage: 32,
    memoryUsage: 58,
    lastIncident: "No incidents",
    instances: 3,
  },
  {
    name: "Web Frontend",
    status: "healthy",
    uptime: "99.99%",
    responseTime: "12ms",
    cpuUsage: 18,
    memoryUsage: 42,
    lastIncident: "No incidents",
    instances: 2,
  },
  {
    name: "Worker Queue",
    status: "degraded",
    uptime: "98.72%",
    responseTime: "320ms",
    cpuUsage: 87,
    memoryUsage: 74,
    lastIncident: "2h ago - High latency",
    instances: 4,
  },
  {
    name: "Database (PostgreSQL)",
    status: "healthy",
    uptime: "99.95%",
    responseTime: "8ms",
    cpuUsage: 45,
    memoryUsage: 62,
    lastIncident: "3d ago - Connection spike",
    instances: 2,
  },
  {
    name: "Cache (Redis)",
    status: "healthy",
    uptime: "99.97%",
    responseTime: "2ms",
    cpuUsage: 12,
    memoryUsage: 35,
    lastIncident: "No incidents",
    instances: 1,
  },
  {
    name: "Email Service",
    status: "down",
    uptime: "97.30%",
    responseTime: "---",
    cpuUsage: 0,
    memoryUsage: 0,
    lastIncident: "12m ago - Unreachable",
    instances: 1,
  },
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

const statusBadgeVariant: Record<Service["status"], "secondary" | "outline" | "destructive"> = {
  healthy: "secondary",
  degraded: "outline",
  down: "destructive",
};

function cpuColor(value: number): string {
  if (value >= 80) return "text-red-500";
  if (value >= 60) return "text-amber-500";
  return "text-muted-foreground";
}

export default function ServiceMonitorStandard() {
  const [autoRefresh, setAutoRefresh] = useState(true);

  const healthyCount = services.filter((s) => s.status === "healthy").length;
  const degradedCount = services.filter((s) => s.status === "degraded").length;
  const downCount = services.filter((s) => s.status === "down").length;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-semibold">Service Monitor</h2>
            <p className="text-xs text-muted-foreground">Infrastructure health overview</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            {healthyCount} Healthy
            {degradedCount > 0 && (
              <>
                <Separator orientation="vertical" className="h-3" />
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                {degradedCount} Degraded
              </>
            )}
            {downCount > 0 && (
              <>
                <Separator orientation="vertical" className="h-3" />
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                {downCount} Down
              </>
            )}
          </div>
          <Separator orientation="vertical" className="h-5" />
          <div className="flex items-center gap-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              className="scale-75"
            />
            <span className="text-xs text-muted-foreground">
              {autoRefresh ? "Updated 30s ago" : "Paused"}
            </span>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={index} className="relative">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor[service.status]}`} />
                <CardTitle className="text-sm font-semibold">{service.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <RotateCcw className="mr-2 h-3.5 w-3.5" />
                    Restart
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Square className="mr-2 h-3.5 w-3.5" />
                    Stop
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-3.5 w-3.5" />
                    View Logs
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={statusBadgeVariant[service.status]} className="text-[10px]">
                  {statusLabel[service.status]}
                </Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {service.uptime} uptime
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Zap className="h-3 w-3" />
                  <span className="tabular-nums">{service.responseTime}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <RefreshCw className="h-3 w-3" />
                  <span className="tabular-nums">{service.instances} inst.</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Cpu className="h-3 w-3" />
                    CPU
                  </div>
                  <span className={`tabular-nums ${cpuColor(service.cpuUsage)}`}>
                    {service.cpuUsage}%
                  </span>
                </div>
                <Progress value={service.cpuUsage} className="h-1.5" />

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MemoryStick className="h-3 w-3" />
                    Memory
                  </div>
                  <span className={`tabular-nums ${cpuColor(service.memoryUsage)}`}>
                    {service.memoryUsage}%
                  </span>
                </div>
                <Progress value={service.memoryUsage} className="h-1.5" />
              </div>

              <Separator />

              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{service.lastIncident}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
