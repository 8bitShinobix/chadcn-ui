"use client"

import { useState } from "react"
import { Sun, Moon, Monitor, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

const accentColors = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "pink", label: "Pink", color: "bg-pink-500" },
] as const

const fontSizes = [
  { value: "small", label: "Small", preview: "13px" },
  { value: "default", label: "Default", preview: "14px" },
  { value: "large", label: "Large", preview: "16px" },
] as const

const densities = [
  { value: "compact", label: "Compact", description: "Tighter spacing, more content visible" },
  { value: "default", label: "Default", description: "Balanced spacing for most users" },
  { value: "comfortable", label: "Comfortable", description: "More whitespace, easier to read" },
] as const

export default function AppearanceFeatureRich() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [accentColor, setAccentColor] = useState<string>("blue")
  const [fontSize, setFontSize] = useState<"small" | "default" | "large">("default")
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default")
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">("left")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
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
      <Separator className="mt-6" />
      <div className="mt-6 space-y-3">
        <Label>Accent Color</Label>
        <div className="flex gap-3">
          {accentColors.map(({ value, label, color }) => (
            <button
              key={value}
              type="button"
              onClick={() => setAccentColor(value)}
              title={label}
              className={cn(
                "relative flex size-8 items-center justify-center rounded-full transition-transform",
                color,
                accentColor === value
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                  : "hover:scale-110"
              )}
            >
              {accentColor === value && <Check className="size-4 text-white" />}
            </button>
          ))}
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="mt-6 space-y-3">
        <Label>Font Size</Label>
        <div className="grid grid-cols-3 gap-3">
          {fontSizes.map(({ value, label, preview }) => (
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
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{preview}</span>
            </button>
          ))}
        </div>
      </div>
      <Separator className="mt-6" />
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
                  density === value ? "border-primary" : "border-muted-foreground/40"
                )}
              >
                {density === value && <div className="size-2 rounded-full bg-primary" />}
              </div>
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="mt-6 space-y-3">
        <Label>Sidebar Position</Label>
        <div className="grid grid-cols-2 gap-3">
          {(["left", "right"] as const).map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => setSidebarPosition(position)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg border p-3 capitalize transition-colors",
                sidebarPosition === position
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <div className="flex h-6 w-10 overflow-hidden rounded border">
                <div className={cn("w-3 border-r", position === "left" ? "bg-primary/20" : "bg-transparent")} />
                <div className="flex-1" />
                <div className={cn("w-3 border-l", position === "right" ? "bg-primary/20" : "bg-transparent")} />
              </div>
              <span className="text-sm font-medium">{position}</span>
            </button>
          ))}
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="mt-6 flex items-center justify-between">
        <div>
          <Label>Reduced Motion</Label>
          <p className="text-sm text-muted-foreground">
            Minimize animations throughout the interface
          </p>
        </div>
        <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
      </div>
      <Button className="mt-6 w-full" onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Saving..." : isSaved ? (
          <>
            <Check size={14} className="mr-2" />
            Saved
          </>
        ) : "Save Changes"}
      </Button>
    </div>
  )
}
