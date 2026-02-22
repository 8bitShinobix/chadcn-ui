"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GitBranch } from "lucide-react"

const deployments = [
  {
    id: "dpl_1",
    status: "Ready" as const,
    branch: "main",
    commit: "fix: resolve hydration mismatch in sidebar nav",
    time: "2m ago",
  },
  {
    id: "dpl_2",
    status: "Building" as const,
    branch: "feat/auth-flow",
    commit: "feat: add OAuth2 provider support with PKCE",
    time: "8m ago",
  },
  {
    id: "dpl_3",
    status: "Ready" as const,
    branch: "main",
    commit: "chore: upgrade dependencies to latest versions",
    time: "1h ago",
  },
  {
    id: "dpl_4",
    status: "Failed" as const,
    branch: "fix/header-bug",
    commit: "fix: sticky header z-index conflict with modals",
    time: "3h ago",
  },
  {
    id: "dpl_5",
    status: "Ready" as const,
    branch: "main",
    commit: "docs: update API reference for v2 endpoints",
    time: "5h ago",
  },
]

function statusVariant(status: string) {
  switch (status) {
    case "Ready":
      return "default" as const
    case "Building":
      return "secondary" as const
    case "Failed":
      return "destructive" as const
    default:
      return "outline" as const
  }
}

export function DeploymentStatus() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-bold">Deployments</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Recent deployment activity for your project.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div
            key={deployment.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Badge variant={statusVariant(deployment.status)}>
                {deployment.status}
              </Badge>
              <div className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                <GitBranch className="h-3.5 w-3.5 shrink-0" />
                <span className="shrink-0 font-medium text-foreground">
                  {deployment.branch}
                </span>
              </div>
              <span className="truncate text-sm text-muted-foreground">
                {deployment.commit}
              </span>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {deployment.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
