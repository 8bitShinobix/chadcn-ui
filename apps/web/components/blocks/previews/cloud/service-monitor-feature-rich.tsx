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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  ChevronDown,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Bell,
  Terminal,
  Link2,
  ArrowUpRight,
  Shield,
} from "lucide-react";

// --- Types ---

interface Service {
  name: string;
  status: "healthy" | "degraded" | "down";
  uptime: string;
  responseTime: string;
  cpuUsage: number;
  memoryUsage: number;
  lastIncident: string;
  instances: number;
  healthEndpoint: string;
  healthStatus: number;
  dependencies: string[];
  uptimeHistory: ("up" | "down" | "degraded")[];
}

interface Incident {
  id: string;
  service: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  duration: string;
  resolved: boolean;
}

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  service: string;
}

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  threshold: string;
  enabled: boolean;
}

// --- Mock Data ---

function generateUptimeHistory(): ("up" | "down" | "degraded")[] {
  const history: ("up" | "down" | "degraded")[] = [];
  for (let i = 0; i < 30; i++) {
    const rand = Math.random();
    if (rand > 0.95) history.push("down");
    else if (rand > 0.88) history.push("degraded");
    else history.push("up");
  }
  return history;
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
    healthEndpoint: "/health",
    healthStatus: 200,
    dependencies: ["Database", "Cache"],
    uptimeHistory: generateUptimeHistory(),
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
    healthEndpoint: "/api/health",
    healthStatus: 200,
    dependencies: ["API Server", "CDN"],
    uptimeHistory: generateUptimeHistory(),
  },
  {
    name: "Worker Queue",
    status: "degraded",
    uptime: "98.72%",
    responseTime: "320ms",
    cpuUsage: 87,
    memoryUsage: 74,
    lastIncident: "2h ago",
    instances: 4,
    healthEndpoint: "/healthz",
    healthStatus: 200,
    dependencies: ["Database", "Cache", "API Server"],
    uptimeHistory: generateUptimeHistory(),
  },
  {
    name: "Database (PostgreSQL)",
    status: "healthy",
    uptime: "99.95%",
    responseTime: "8ms",
    cpuUsage: 45,
    memoryUsage: 62,
    lastIncident: "3d ago",
    instances: 2,
    healthEndpoint: ":5432/health",
    healthStatus: 200,
    dependencies: [],
    uptimeHistory: generateUptimeHistory(),
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
    healthEndpoint: ":6379/ping",
    healthStatus: 200,
    dependencies: [],
    uptimeHistory: generateUptimeHistory(),
  },
  {
    name: "Email Service",
    status: "down",
    uptime: "97.30%",
    responseTime: "---",
    cpuUsage: 0,
    memoryUsage: 0,
    lastIncident: "12m ago",
    instances: 1,
    healthEndpoint: "/health",
    healthStatus: 503,
    dependencies: ["API Server"],
    uptimeHistory: generateUptimeHistory(),
  },
];

const incidents: Incident[] = [
  {
    id: "INC-1042",
    service: "Email Service",
    severity: "critical",
    title: "Email service unreachable",
    description: "SMTP connection refused. Upstream provider reporting outage. Failover initiated.",
    timestamp: "2025-02-21 14:32 UTC",
    duration: "12m (ongoing)",
    resolved: false,
  },
  {
    id: "INC-1041",
    service: "Worker Queue",
    severity: "warning",
    title: "High queue latency detected",
    description: "Average processing time exceeded 300ms threshold. Auto-scaling triggered additional 2 instances.",
    timestamp: "2025-02-21 12:15 UTC",
    duration: "18m",
    resolved: true,
  },
  {
    id: "INC-1040",
    service: "Database",
    severity: "warning",
    title: "Connection pool spike",
    description: "Connection count reached 85% of pool limit. Query optimization recommended.",
    timestamp: "2025-02-18 09:44 UTC",
    duration: "7m",
    resolved: true,
  },
  {
    id: "INC-1039",
    service: "API Server",
    severity: "info",
    title: "Scheduled maintenance completed",
    description: "Rolling restart completed across all 3 instances. Zero-downtime deployment verified.",
    timestamp: "2025-02-15 03:00 UTC",
    duration: "4m",
    resolved: true,
  },
];

const logEntries: LogEntry[] = [
  { timestamp: "14:44:12", level: "error", service: "email-svc", message: "SMTP connection refused: connect ECONNREFUSED 10.0.3.12:587" },
  { timestamp: "14:44:10", level: "warn", service: "worker", message: "Queue depth exceeding threshold: 1,247 pending jobs" },
  { timestamp: "14:44:08", level: "info", service: "api", message: "Health check passed: all dependencies responding" },
  { timestamp: "14:44:05", level: "info", service: "frontend", message: "CDN cache invalidation completed for /assets/*" },
  { timestamp: "14:44:01", level: "debug", service: "db", message: "Connection pool stats: active=42, idle=18, waiting=0" },
];

const alertRules: AlertRule[] = [
  { id: "1", name: "High CPU Usage", metric: "cpu", threshold: "90", enabled: true },
  { id: "2", name: "High Memory Usage", metric: "memory", threshold: "80", enabled: true },
  { id: "3", name: "Slow Response Time", metric: "response_time", threshold: "500", enabled: true },
  { id: "4", name: "Service Down", metric: "status", threshold: "down", enabled: true },
  { id: "5", name: "Low Uptime", metric: "uptime", threshold: "99", enabled: false },
];

// --- Helpers ---

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

const severityBadgeVariant: Record<Incident["severity"], "destructive" | "outline" | "secondary"> = {
  critical: "destructive",
  warning: "outline",
  info: "secondary",
};

const uptimeBlockColor: Record<string, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
};

const logLevelColor: Record<LogEntry["level"], string> = {
  error: "text-red-400",
  warn: "text-amber-400",
  info: "text-blue-400",
  debug: "text-zinc-500",
};

function resourceColor(value: number): string {
  if (value >= 80) return "text-red-500";
  if (value >= 60) return "text-amber-500";
  return "text-muted-foreground";
}

// --- Component ---

export default function ServiceMonitorFeatureRich() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedService, setSelectedService] = useState<string>("all");
  const [instanceCounts, setInstanceCounts] = useState<Record<string, number>>(
    Object.fromEntries(services.map((s) => [s.name, s.instances]))
  );
  const [openIncidents, setOpenIncidents] = useState<Record<string, boolean>>({});
  const [alerts, setAlerts] = useState<AlertRule[]>(alertRules);

  const healthyCount = services.filter((s) => s.status === "healthy").length;
  const degradedCount = services.filter((s) => s.status === "degraded").length;
  const downCount = services.filter((s) => s.status === "down").length;

  const filteredServices =
    selectedService === "all"
      ? services
      : services.filter((s) => s.status === selectedService);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const adjustInstances = (serviceName: string, delta: number) => {
    setInstanceCounts((prev) => ({
      ...prev,
      [serviceName]: Math.max(1, Math.min(10, (prev[serviceName] || 1) + delta)),
    }));
  };

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-5xl space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="text-lg font-semibold">Service Monitor</h2>
              <p className="text-xs text-muted-foreground">
                Infrastructure health &middot; {services.length} services
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {healthyCount}
              {degradedCount > 0 && (
                <>
                  <Separator orientation="vertical" className="h-3" />
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                  {degradedCount}
                </>
              )}
              {downCount > 0 && (
                <>
                  <Separator orientation="vertical" className="h-3" />
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                  {downCount}
                </>
              )}
            </div>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="degraded">Degraded</SelectItem>
                <SelectItem value="down">Down</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
                className="scale-75"
              />
              <span className="text-xs text-muted-foreground">
                {autoRefresh ? "Live" : "Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">
              Incidents
              {incidents.filter((i) => !i.resolved).length > 0 && (
                <Badge variant="destructive" className="ml-1.5 h-4 px-1 text-[10px]">
                  {incidents.filter((i) => !i.resolved).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service, index) => (
                <Card key={index} className="relative">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor[service.status]}`}
                      />
                      <CardTitle className="text-sm font-semibold">
                        {service.name}
                      </CardTitle>
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
                    {/* Status + Uptime */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={statusBadgeVariant[service.status]}
                        className="text-[10px]"
                      >
                        {statusLabel[service.status]}
                      </Badge>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {service.uptime} uptime
                      </span>
                    </div>

                    {/* 30-day uptime visualization */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">30-day uptime</span>
                        <span className="text-[10px] text-muted-foreground">today</span>
                      </div>
                      <div className="flex gap-[2px]">
                        {service.uptimeHistory.map((day, i) => (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <div
                                className={`h-3 flex-1 rounded-[1px] ${uptimeBlockColor[day]}`}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-[10px]">
                              Day {i + 1}: {day === "up" ? "Operational" : day === "degraded" ? "Degraded" : "Outage"}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>

                    {/* Metrics row */}
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Zap className="h-3 w-3" />
                        <span className="tabular-nums">{service.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <RefreshCw className="h-3 w-3" />
                        <span className="tabular-nums">
                          {instanceCounts[service.name]} inst.
                        </span>
                      </div>
                    </div>

                    {/* Resource bars */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Cpu className="h-3 w-3" />
                          CPU
                        </div>
                        <span className={`tabular-nums ${resourceColor(service.cpuUsage)}`}>
                          {service.cpuUsage}%
                        </span>
                      </div>
                      <Progress value={service.cpuUsage} className="h-1.5" />

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MemoryStick className="h-3 w-3" />
                          Memory
                        </div>
                        <span className={`tabular-nums ${resourceColor(service.memoryUsage)}`}>
                          {service.memoryUsage}%
                        </span>
                      </div>
                      <Progress value={service.memoryUsage} className="h-1.5" />
                    </div>

                    {/* Scaling controls */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">Instances</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => adjustInstances(service.name, -1)}
                          disabled={instanceCounts[service.name] <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs tabular-nums font-medium">
                          {instanceCounts[service.name]}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => adjustInstances(service.name, 1)}
                          disabled={instanceCounts[service.name] >= 10}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Health endpoint */}
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Link2 className="h-3 w-3" />
                        <span className="font-mono">{service.healthEndpoint}</span>
                      </div>
                      <Badge
                        variant={service.healthStatus === 200 ? "secondary" : "destructive"}
                        className="text-[10px] font-mono"
                      >
                        {service.healthStatus}
                      </Badge>
                    </div>

                    {/* Dependencies */}
                    {service.dependencies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">Depends on:</span>
                        {service.dependencies.map((dep) => (
                          <Badge key={dep} variant="outline" className="text-[10px] font-normal">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Last incident */}
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Last incident: {service.lastIncident}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* INCIDENTS TAB */}
          <TabsContent value="incidents" className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Incident Timeline</h3>
              <span className="text-xs text-muted-foreground">
                {incidents.filter((i) => !i.resolved).length} active &middot;{" "}
                {incidents.filter((i) => i.resolved).length} resolved
              </span>
            </div>

            <div className="space-y-2">
              {incidents.map((incident) => (
                <Collapsible
                  key={incident.id}
                  open={openIncidents[incident.id] || false}
                  onOpenChange={(open) =>
                    setOpenIncidents((prev) => ({ ...prev, [incident.id]: open }))
                  }
                >
                  <div className="rounded-lg border">
                    <CollapsibleTrigger asChild>
                      <button className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          {incident.severity === "critical" ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : incident.severity === "warning" ? (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{incident.title}</span>
                              <Badge
                                variant={severityBadgeVariant[incident.severity]}
                                className="text-[10px]"
                              >
                                {incident.severity}
                              </Badge>
                              {!incident.resolved && (
                                <Badge variant="destructive" className="text-[10px]">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{incident.service}</span>
                              <span>&middot;</span>
                              <span>{incident.timestamp}</span>
                              <span>&middot;</span>
                              <span>{incident.duration}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Separator />
                      <div className="px-4 py-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {incident.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <Shield className="h-3 w-3" />
                          <span>ID: {incident.id}</span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </TabsContent>

          {/* ALERTS TAB */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Alert Rules</h3>
                <p className="text-xs text-muted-foreground">
                  Configure notification thresholds for service metrics
                </p>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {alerts.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleAlert(rule.id)}
                      className="scale-75"
                    />
                    <div>
                      <p className="text-sm font-medium">{rule.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Trigger when{" "}
                        <span className="font-mono text-foreground">{rule.metric}</span>{" "}
                        exceeds{" "}
                        <span className="font-mono text-foreground">
                          {rule.threshold}
                          {rule.metric !== "status" && rule.metric !== "uptime" ? "%" : ""}
                          {rule.metric === "response_time" ? "ms" : ""}
                          {rule.metric === "uptime" ? "%" : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20">
                      <Input
                        className="h-7 text-xs font-mono text-center"
                        defaultValue={rule.threshold}
                        disabled={!rule.enabled}
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-7 w-[100px] text-xs" disabled={!rule.enabled}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All services</SelectItem>
                        <SelectItem value="api">API Server</SelectItem>
                        <SelectItem value="web">Web Frontend</SelectItem>
                        <SelectItem value="worker">Worker Queue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-dashed p-3 text-center">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                <Plus className="mr-1 h-3 w-3" />
                Add Alert Rule
              </Button>
            </div>
          </TabsContent>

          {/* LOGS TAB */}
          <TabsContent value="logs" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Log Stream</h3>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="h-7 w-[110px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="error">Errors</SelectItem>
                    <SelectItem value="warn">Warnings</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-services">
                  <SelectTrigger className="h-7 w-[120px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-services">All Services</SelectItem>
                    <SelectItem value="api">API Server</SelectItem>
                    <SelectItem value="web">Web Frontend</SelectItem>
                    <SelectItem value="worker">Worker Queue</SelectItem>
                    <SelectItem value="email">Email Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border bg-zinc-950 p-3">
              <div className="space-y-1 font-mono text-xs">
                {logEntries.map((entry, i) => (
                  <div key={i} className="flex gap-2 leading-relaxed">
                    <span className="shrink-0 text-zinc-600">{entry.timestamp}</span>
                    <span className={`shrink-0 w-12 uppercase ${logLevelColor[entry.level]}`}>
                      {entry.level}
                    </span>
                    <span className="shrink-0 text-zinc-500">[{entry.service}]</span>
                    <span className="text-zinc-300">{entry.message}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-2 bg-zinc-800" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-600">
                  Showing last {logEntries.length} entries
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-2 text-[10px] text-zinc-500 hover:text-zinc-300"
                >
                  <ArrowUpRight className="mr-1 h-2.5 w-2.5" />
                  Open full logs
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
