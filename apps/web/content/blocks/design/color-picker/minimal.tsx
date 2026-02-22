"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Pipette } from "lucide-react"

const PRESET_COLORS = [
  "#EF4444", "#F97316", "#EAB308", "#22C55E",
  "#3B82F6", "#8B5CF6", "#EC4899", "#64748B",
]

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6")
  const [hexInput, setHexInput] = useState("#3B82F6")

  function handleHexChange(value: string) {
    const sanitized = value.startsWith("#") ? value : `#${value}`
    setHexInput(sanitized)
    if (/^#[0-9A-Fa-f]{6}$/.test(sanitized)) {
      setSelectedColor(sanitized)
    }
  }

  function handleSwatchClick(color: string) {
    setSelectedColor(color)
    setHexInput(color)
  }

  return (
    <div className="mx-auto w-full max-w-sm p-6">
      <div className="flex items-center gap-3">
        <div
          className="size-10 shrink-0 rounded-lg border shadow-sm"
          style={{ backgroundColor: selectedColor }}
        />
        <div>
          <h2 className="text-lg font-semibold">Color Picker</h2>
          <p className="text-sm text-muted-foreground">Select a color</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <Label htmlFor="hex-input">HEX Value</Label>
        <div className="flex items-center gap-2">
          <Input
            id="hex-input"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#000000"
            maxLength={7}
            className="font-mono"
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <Pipette className="size-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <Label>Presets</Label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleSwatchClick(color)}
              className={`size-10 rounded-lg border-2 shadow-sm transition-all hover:scale-105 ${
                selectedColor === color
                  ? "border-foreground ring-2 ring-ring"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
