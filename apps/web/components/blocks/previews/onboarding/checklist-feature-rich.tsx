"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronRight, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const tasks = [
  {
    id: "profile",
    title: "Complete your profile",
    description: "Add your name, photo, and bio to personalize your account.",
    cta: "Edit Profile",
  },
  {
    id: "team",
    title: "Create a team",
    description: "Set up your team and invite collaborators.",
    cta: "Create Team",
  },
  {
    id: "project",
    title: "Create your first project",
    description: "Start a new project to organize your work.",
    cta: "New Project",
  },
  {
    id: "integration",
    title: "Connect an integration",
    description: "Link your favorite tools like GitHub, Slack, or Jira.",
    cta: "Browse Integrations",
  },
];

export default function ChecklistFeatureRich() {
  const [completed, setCompleted] = useState<string[]>(["profile"]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggle = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const allDone = completed.length === tasks.length;
  const progress = (completed.length / tasks.length) * 100;

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <Card className="gap-0 overflow-hidden rounded-lg py-0 shadow-none">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Getting Started</h2>
            {allDone && (
              <Badge variant="secondary" className="text-xs">
                <PartyPopper size={14} />
                All done!
              </Badge>
            )}
          </div>
          <Progress value={progress} className="mt-3 h-2" />
          <p className="text-muted-foreground mt-1 text-xs">
            {completed.length} of {tasks.length} tasks complete
          </p>
        </div>

        {allDone ? (
          <div className="p-8 text-center">
            <PartyPopper size={40} className="text-primary mx-auto" />
            <h3 className="mt-3 text-lg font-semibold">Congratulations!</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              You&apos;ve completed all setup tasks.
            </p>
            <Button className="mt-4">Go to Dashboard</Button>
          </div>
        ) : (
          <div className="divide-y">
            {tasks.map((task) => {
              const isCompleted = completed.includes(task.id);
              const isExpanded = expandedItem === task.id;

              return (
                <div key={task.id}>
                  <div className="flex w-full items-center gap-3 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(task.id);
                      }}
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        isCompleted ? "border-primary bg-primary" : "border-muted-foreground/30"
                      )}
                    >
                      {isCompleted && <Check size={12} className="text-primary-foreground" />}
                    </button>
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setExpandedItem(isExpanded ? null : task.id)}
                    >
                      <p
                        className={cn(
                          "text-sm",
                          isCompleted ? "text-muted-foreground line-through" : "font-medium"
                        )}
                      >
                        {task.title}
                      </p>
                      {!isExpanded && (
                        <p className="text-muted-foreground text-xs">{task.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : task.id)}
                      className="text-muted-foreground shrink-0"
                    >
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4 pl-12">
                      <p className="text-muted-foreground text-sm">{task.description}</p>
                      <Button size="sm" className="mt-3">
                        {task.cta}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
