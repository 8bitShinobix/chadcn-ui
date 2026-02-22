"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  GitBranch,
  ExternalLink,
  MoreVertical,
  RotateCcw,
  ArrowUpCircle,
  RefreshCw,
  Clock,
  ChevronDown,
  FileCode,
  XCircle,
  Zap,
  Timer,
} from "lucide-react"

type DeploymentStatusType = "Ready" | "Building" | "Failed" | "Cancelled"
type Environment = "Production" | "Preview" | "Development"

interface LogLine {
  type: "info" | "success" | "warning" | "error"
  text: string
}

interface Deployment {
  id: string
  status: DeploymentStatusType
  branch: string
  commitHash: string
  commitMessage: string
  url: string
  buildDuration: string
  coldStart: string
  author: string
  authorInitials: string
  time: string
  environment: Environment
  filesChanged: number
  buildProgress: number
  logs: LogLine[]
}

const deployments: Deployment[] = [
  {
    id: "dpl_a1b2c3",
    status: "Ready",
    branch: "main",
    commitHash: "a1b2c3d",
    commitMessage: "fix: resolve hydration mismatch in sidebar nav",
    url: "my-app-a1b2c3d.vercel.app",
    buildDuration: "45s",
    coldStart: "124ms",
    author: "Sarah Chen",
    authorInitials: "SC",
    time: "2m ago",
    environment: "Production",
    filesChanged: 3,
    buildProgress: 100,
    logs: [
      { type: "info", text: "Cloning repository..." },
      { type: "info", text: "Installing dependencies..." },
      { type: "warning", text: "warn: peer dependency react@^18 not satisfied" },
      { type: "info", text: "Building application..." },
      { type: "success", text: "Build completed successfully in 45s" },
      { type: "info", text: "Deploying to production..." },
      { type: "success", text: "Deployment ready at https://my-app-a1b2c3d.vercel.app" },
    ],
  },
  {
    id: "dpl_d4e5f6",
    status: "Building",
    branch: "feat/auth-flow",
    commitHash: "d4e5f6g",
    commitMessage: "feat: add OAuth2 provider support with PKCE",
    url: "my-app-d4e5f6g.vercel.app",
    buildDuration: "1m 23s",
    coldStart: "--",
    author: "Alex Rivera",
    authorInitials: "AR",
    time: "8m ago",
    environment: "Preview",
    filesChanged: 12,
    buildProgress: 67,
    logs: [
      { type: "info", text: "Cloning repository..." },
      { type: "info", text: "Installing dependencies..." },
      { type: "info", text: "Building application..." },
      { type: "warning", text: "warn: bundle size exceeds 500KB limit for /auth route" },
      { type: "info", text: "Compiling routes (14/21)..." },
    ],
  },
  {
    id: "dpl_h7i8j9",
    status: "Ready",
    branch: "main",
    commitHash: "h7i8j9k",
    commitMessage: "chore: upgrade dependencies to latest versions",
    url: "my-app-h7i8j9k.vercel.app",
    buildDuration: "52s",
    coldStart: "98ms",
    author: "Sarah Chen",
    authorInitials: "SC",
    time: "1h ago",
    environment: "Production",
    filesChanged: 2,
    buildProgress: 100,
    logs: [
      { type: "info", text: "Cloning repository..." },
      { type: "info", text: "Installing dependencies..." },
      { type: "info", text: "Building application..." },
      { type: "success", text: "Build completed successfully in 52s" },
      { type: "success", text: "Deployment ready at https://my-app-h7i8j9k.vercel.app" },
    ],
  },
  {
    id: "dpl_l0m1n2",
    status: "Failed",
    branch: "fix/header-bug",
    commitHash: "l0m1n2o",
    commitMessage: "fix: sticky header z-index conflict with modals",
    url: "my-app-l0m1n2o.vercel.app",
    buildDuration: "38s",
    coldStart: "--",
    author: "Jordan Park",
    authorInitials: "JP",
    time: "3h ago",
    environment: "Preview",
    filesChanged: 5,
    buildProgress: 100,
    logs: [
      { type: "info", text: "Cloning repository..." },
      { type: "info", text: "Installing dependencies..." },
      { type: "info", text: "Building application..." },
      { type: "error", text: "Error: Type 'string' is not assignable to type 'number'" },
      { type: "error", text: "  at components/layout/Header.tsx:42:11" },
      { type: "error", text: "Build failed with 1 error" },
    ],
  },
  {
    id: "dpl_p3q4r5",
    status: "Cancelled",
    branch: "feat/dashboard-v2",
    commitHash: "p3q4r5s",
    commitMessage: "feat: redesign analytics dashboard layout",
    url: "my-app-p3q4r5s.vercel.app",
    buildDuration: "12s",
    coldStart: "--",
    author: "Alex Rivera",
    authorInitials: "AR",
    time: "5h ago",
    environment: "Development",
    filesChanged: 18,
    buildProgress: 23,
    logs: [
      { type: "info", text: "Cloning repository..." },
      { type: "info", text: "Installing dependencies..." },
      { type: "warning", text: "Build cancelled by user" },
    ],
  },
  {
    id: "dpl_t6u7v8",
    status: "Ready",
    branch: "main",
    commitHash: "t6u7v8w",
    commitMessage: "docs: update API reference for v2 endpoints",
    url: "my-app-t6u7v8w.vercel.app",
    buildDuration: "41s",
    coldStart: "105ms",
    author: "Sarah Chen",
    authorInitials: "SC",
    time: "8h ago",
    environment: "Production",
    filesChanged: 7,
    buildProgress: 100,
    logs: [
      { type: "info", text: "Cloning repository..." },
      { type: "info", text: "Installing dependencies..." },
      { type: "info", text: "Building application..." },
      { type: "success", text: "Build completed successfully in 41s" },
      { type: "success", text: "Deployment ready at https://my-app-t6u7v8w.vercel.app" },
    ],
  },
]

const buildLogs: LogLine[] = [
  { type: "info", text: "[build] Starting build process..." },
  { type: "info", text: "[build] Node.js 20.11.0 detected" },
  { type: "info", text: "[deps]  Installing dependencies with pnpm..." },
  { type: "info", text: "[deps]  Packages: +342 added" },
  { type: "warning", text: "[deps]  warn: deprecated package found: glob@7.2.3" },
  { type: "info", text: "[build] Compiling TypeScript..." },
  { type: "info", text: "[build] Generating static pages (23/23)..." },
  { type: "warning", text: "[build] warn: Image optimization disabled for /og route" },
  { type: "info", text: "[build] Collecting build traces..." },
  { type: "success", text: "[build] Build completed in 45s" },
  { type: "info", text: "[deploy] Uploading build artifacts..." },
  { type: "info", text: "[deploy] Assigning custom domains..." },
  { type: "success", text: "[deploy] Deployment ready at https://my-app.vercel.app" },
  { type: "info", text: "[metrics] Bundle size: 412KB (gzipped)" },
  { type: "info", text: "[metrics] First Load JS: 89KB" },
  { type: "success", text: "[done] Deployment complete. All checks passed." },
]

function statusColor(status: DeploymentStatusType) {
  switch (status) {
    case "Ready":
      return "bg-emerald-500"
    case "Building":
      return "bg-yellow-500 animate-pulse"
    case "Failed":
      return "bg-red-500"
    case "Cancelled":
      return "bg-muted-foreground"
  }
}

function statusVariant(status: DeploymentStatusType) {
  switch (status) {
    case "Ready":
      return "default" as const
    case "Building":
      return "secondary" as const
    case "Failed":
      return "destructive" as const
    case "Cancelled":
      return "outline" as const
  }
}

function envVariant(env: Environment) {
  switch (env) {
    case "Production":
      return "default" as const
    case "Preview":
      return "secondary" as const
    case "Development":
      return "outline" as const
  }
}

function logColor(type: LogLine["type"]) {
  switch (type) {
    case "success":
      return "text-emerald-400"
    case "warning":
      return "text-yellow-400"
    case "error":
      return "text-red-400"
    default:
      return "text-muted-foreground"
  }
}

export default function DeploymentStatusFeatureRich() {
  const [filter, setFilter] = useState<string>("all")
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set())

  const filtered =
    filter === "all"
      ? deployments
      : deployments.filter(
          (d) => d.status.toLowerCase() === filter.toLowerCase()
        )

  function toggleLog(id: string) {
    setExpandedLogs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Deployments</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Deployment history, build logs, and environment management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3" />
            <span>Auto-refreshes every 30s</span>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="building">Building</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="my-6" />

      <Tabs defaultValue="deployments">
        <TabsList>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="build-logs">Build Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="mt-4 space-y-3">
          {filtered.map((deployment) => (
            <Collapsible
              key={deployment.id}
              open={expandedLogs.has(deployment.id)}
              onOpenChange={() => toggleLog(deployment.id)}
            >
              <Card className="rounded-lg py-0 shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusColor(deployment.status)}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={statusVariant(deployment.status)}
                            className="text-xs"
                          >
                            {deployment.status}
                          </Badge>
                          <Badge
                            variant={envVariant(deployment.environment)}
                            className="text-xs"
                          >
                            {deployment.environment}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <GitBranch className="h-3.5 w-3.5" />
                            <span className="font-medium text-foreground">
                              {deployment.branch}
                            </span>
                          </div>
                          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                            {deployment.commitHash}
                          </code>
                        </div>
                        <div className="mt-1.5">
                          <span className="truncate text-sm text-muted-foreground">
                            {deployment.commitMessage}
                          </span>
                        </div>

                        {deployment.status === "Building" && (
                          <div className="mt-2">
                            <Progress
                              value={deployment.buildProgress}
                              className="h-1.5"
                            />
                            <span className="mt-1 text-xs text-muted-foreground">
                              Building... {deployment.buildProgress}%
                            </span>
                          </div>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <a
                            href={`https://${deployment.url}`}
                            className="flex items-center gap-1 transition-colors hover:text-foreground"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {deployment.url}
                          </a>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {deployment.buildDuration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            Cold start: {deployment.coldStart}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileCode className="h-3 w-3" />
                            {deployment.filesChanged} files changed
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {deployment.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {deployment.time}
                      </span>
                      {deployment.status === "Building" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expandedLogs.has(deployment.id) ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ArrowUpCircle className="mr-2 h-4 w-4" />
                            Promote to Production
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Rollback
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>

                <CollapsibleContent>
                  <Separator />
                  <div className="rounded-b-lg bg-muted/50 p-4">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Build Output
                    </h4>
                    <div className="rounded-md bg-background p-3 font-mono text-xs leading-relaxed">
                      {deployment.logs.map((line, i) => (
                        <div key={i} className={logColor(line.type)}>
                          {line.text}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        Build: {deployment.buildDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Cold start: {deployment.coldStart}
                      </span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No deployments match the selected filter.
            </div>
          )}
        </TabsContent>

        <TabsContent value="build-logs" className="mt-4">
          <Card className="rounded-lg py-0 shadow-none">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">
                Latest Build - Production (main @ a1b2c3d)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
                {buildLogs.map((line, i) => (
                  <div key={i} className={logColor(line.type)}>
                    {line.text}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  Total build time: 45s
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Cold start: 124ms
                </span>
                <span className="flex items-center gap-1">
                  <FileCode className="h-3 w-3" />
                  3 files changed
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
