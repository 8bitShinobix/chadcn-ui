"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  GitBranch,
  ExternalLink,
  MoreVertical,
  RotateCcw,
  ArrowUpCircle,
  RefreshCw,
  Clock,
} from "lucide-react"

type DeploymentStatus = "Ready" | "Building" | "Failed" | "Cancelled"

interface Deployment {
  id: string
  status: DeploymentStatus
  branch: string
  commitHash: string
  commitMessage: string
  url: string
  buildDuration: string
  author: string
  authorInitials: string
  time: string
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
    author: "Sarah Chen",
    authorInitials: "SC",
    time: "2m ago",
  },
  {
    id: "dpl_d4e5f6",
    status: "Building",
    branch: "feat/auth-flow",
    commitHash: "d4e5f6g",
    commitMessage: "feat: add OAuth2 provider support with PKCE",
    url: "my-app-d4e5f6g.vercel.app",
    buildDuration: "1m 23s",
    author: "Alex Rivera",
    authorInitials: "AR",
    time: "8m ago",
  },
  {
    id: "dpl_h7i8j9",
    status: "Ready",
    branch: "main",
    commitHash: "h7i8j9k",
    commitMessage: "chore: upgrade dependencies to latest versions",
    url: "my-app-h7i8j9k.vercel.app",
    buildDuration: "52s",
    author: "Sarah Chen",
    authorInitials: "SC",
    time: "1h ago",
  },
  {
    id: "dpl_l0m1n2",
    status: "Failed",
    branch: "fix/header-bug",
    commitHash: "l0m1n2o",
    commitMessage: "fix: sticky header z-index conflict with modals",
    url: "my-app-l0m1n2o.vercel.app",
    buildDuration: "38s",
    author: "Jordan Park",
    authorInitials: "JP",
    time: "3h ago",
  },
  {
    id: "dpl_p3q4r5",
    status: "Cancelled",
    branch: "feat/dashboard-v2",
    commitHash: "p3q4r5s",
    commitMessage: "feat: redesign analytics dashboard layout",
    url: "my-app-p3q4r5s.vercel.app",
    buildDuration: "12s",
    author: "Alex Rivera",
    authorInitials: "AR",
    time: "5h ago",
  },
  {
    id: "dpl_t6u7v8",
    status: "Ready",
    branch: "main",
    commitHash: "t6u7v8w",
    commitMessage: "docs: update API reference for v2 endpoints",
    url: "my-app-t6u7v8w.vercel.app",
    buildDuration: "41s",
    author: "Sarah Chen",
    authorInitials: "SC",
    time: "8h ago",
  },
]

function statusColor(status: DeploymentStatus) {
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

function statusVariant(status: DeploymentStatus) {
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

export function DeploymentStatus() {
  const [filter, setFilter] = useState<string>("all")

  const filtered =
    filter === "all"
      ? deployments
      : deployments.filter(
          (d) => d.status.toLowerCase() === filter.toLowerCase()
        )

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Deployments</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Deployment history and status for your project.
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

      <div className="space-y-3">
        {filtered.map((deployment) => (
          <Card key={deployment.id} className="rounded-lg py-0 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusColor(deployment.status)}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={statusVariant(deployment.status)} className="text-xs">
                        {deployment.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <GitBranch className="h-3.5 w-3.5" />
                        <span className="font-medium text-foreground">
                          {deployment.branch}
                        </span>
                      </div>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                        {deployment.commitHash}
                      </code>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="truncate text-sm text-muted-foreground">
                        {deployment.commitMessage}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <a
                        href={`https://${deployment.url}`}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No deployments match the selected filter.
          </div>
        )}
      </div>
    </div>
  )
}
