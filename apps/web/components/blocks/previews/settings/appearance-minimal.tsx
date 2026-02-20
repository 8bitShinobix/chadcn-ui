"use client"

import { useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export default function AppearanceMinimal() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Appearance</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Customize the look and feel of the application.
        </p>
      </div>
      <Separator className="mt-4" />
      <div className="mt-6 space-y-3">
        <Label>Theme</Label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                theme === value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <Icon className="size-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <Button className="mt-6 w-full">Save Changes</Button>
    </div>
  )
}
