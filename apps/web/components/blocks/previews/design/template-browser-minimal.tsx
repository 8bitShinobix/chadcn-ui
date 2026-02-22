"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { LayoutTemplate } from "lucide-react"

const templates = [
  {
    name: "Landing Page",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Dashboard",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    name: "Portfolio",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "E-commerce",
    gradient: "from-emerald-500 to-teal-600",
  },
]

export default function TemplateBrowserMinimal() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center gap-2">
        <LayoutTemplate className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Templates</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.name} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className={`flex h-32 items-center justify-center bg-gradient-to-br ${template.gradient}`}
              >
                <div className="rounded-md bg-white/20 px-4 py-6 backdrop-blur-sm">
                  <div className="mb-2 h-2 w-16 rounded bg-white/60" />
                  <div className="h-2 w-10 rounded bg-white/40" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3">
              <span className="text-sm font-medium">{template.name}</span>
              <Button size="sm" variant="outline">
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
