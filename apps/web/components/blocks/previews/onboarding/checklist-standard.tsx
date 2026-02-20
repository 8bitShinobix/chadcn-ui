"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const tasks = [
  {
    id: "profile",
    title: "Complete your profile",
    description: "Add your name, photo, and bio to personalize your account.",
  },
  { id: "team", title: "Create a team", description: "Set up your team and invite collaborators." },
  {
    id: "project",
    title: "Create your first project",
    description: "Start a new project to organize your work.",
  },
  {
    id: "integration",
    title: "Connect an integration",
    description: "Link your favorite tools like GitHub, Slack, or Jira.",
  },
];

export default function ChecklistStandard() {
  const [completed, setCompleted] = useState<string[]>(["profile"]);

  const toggle = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const progress = (completed.length / tasks.length) * 100;

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <Card className="gap-0 rounded-lg py-0 shadow-none">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Getting Started</h2>
          <Progress value={progress} className="mt-3 h-2" />
          <p className="text-muted-foreground mt-1 text-xs">
            {completed.length} of {tasks.length} tasks complete
          </p>
        </div>

        <div className="divide-y">
          {tasks.map((task) => {
            const isCompleted = completed.includes(task.id);
            return (
              <button
                key={task.id}
                onClick={() => toggle(task.id)}
                className="hover:bg-muted/50 flex w-full items-center gap-3 p-4 text-left transition-colors"
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isCompleted ? "border-primary bg-primary" : "border-muted-foreground/30"
                  )}
                >
                  {isCompleted && <Check size={12} className="text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-sm",
                      isCompleted ? "text-muted-foreground line-through" : "font-medium"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-muted-foreground text-xs">{task.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-t p-4">
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
        </div>
      </Card>
    </div>
  );
}
