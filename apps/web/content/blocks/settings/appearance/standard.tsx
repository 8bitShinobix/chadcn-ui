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

const fontSizes = [
  { value: "small", label: "Small", size: "text-xs" },
  { value: "default", label: "Default", size: "text-sm" },
  { value: "large", label: "Large", size: "text-base" },
] as const

const densities = [
  { value: "compact", label: "Compact", description: "Tighter spacing, more content visible" },
  { value: "default", label: "Default", description: "Balanced spacing for most users" },
  { value: "comfortable", label: "Comfortable", description: "More whitespace, easier to read" },
] as const

export function AppearanceSettings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [fontSize, setFontSize] = useState<"small" | "default" | "large">("default")
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default")

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Appearance</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Customize the look and feel of the application.
        </p>
      </div>

      <Separator className="mt-4" />

      {/* Theme Selection */}
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

      <Separator className="mt-6" />

      {/* Font Size */}
      <div className="mt-6 space-y-3">
        <Label>Font Size</Label>
        <div className="grid grid-cols-3 gap-3">
          {fontSizes.map(({ value, label, size }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFontSize(value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors",
                fontSize === value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <span className={cn("font-medium", size)}>Aa</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="mt-6" />

      {/* Interface Density */}
      <div className="mt-6 space-y-3">
        <Label>Interface Density</Label>
        <div className="space-y-2">
          {densities.map(({ value, label, description }) => (
            <button
              key={value}
              type="button"
              onClick={() => setDensity(value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                density === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <div
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border",
                  density === value
                    ? "border-primary"
                    : "border-muted-foreground/40"
                )}
              >
                {density === value && (
                  <div className="size-2 rounded-full bg-primary" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button className="mt-6 w-full">Save Changes</Button>
    </div>
  )
}
