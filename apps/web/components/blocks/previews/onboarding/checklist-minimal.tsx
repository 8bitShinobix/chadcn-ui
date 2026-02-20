"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const tasks = [
  { id: "profile", title: "Complete your profile", description: "Add your name, photo, and bio to personalize your account." },
  { id: "team", title: "Create a team", description: "Set up your team and invite collaborators." },
  { id: "project", title: "Create your first project", description: "Start a new project to organize your work." },
  { id: "integration", title: "Connect an integration", description: "Link your favorite tools like GitHub, Slack, or Jira." },
]

export default function ChecklistMinimal() {
  const [completed, setCompleted] = useState<string[]>(["profile"])

  const toggle = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id))
    } else {
      setCompleted([...completed, id])
    }
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <h2 className="text-lg font-semibold">Getting Started</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {completed.length} of {tasks.length} complete
      </p>

      <div className="mt-4 space-y-2">
        {tasks.map((task) => {
          const isCompleted = completed.includes(task.id)
          return (
            <button
              key={task.id}
              onClick={() => toggle(task.id)}
              className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  isCompleted
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}
              >
                {isCompleted && <Check size={12} className="text-primary-foreground" />}
              </div>
              <span
                className={cn(
                  "text-sm",
                  isCompleted
                    ? "text-muted-foreground line-through"
                    : "font-medium"
                )}
              >
                {task.title}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
