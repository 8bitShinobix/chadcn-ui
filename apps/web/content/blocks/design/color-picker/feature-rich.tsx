"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pipette,
  Copy,
  Check,
  Plus,
  Palette,
  Contrast,
  Blend,
} from "lucide-react"

const PALETTE_COLORS = [
  "#EF4444", "#F97316", "#F59E0B", "#EAB308",
  "#84CC16", "#22C55E", "#14B8A6", "#06B6D4",
  "#0EA5E9", "#3B82F6", "#6366F1", "#8B5CF6",
  "#A855F7", "#D946EF", "#EC4899", "#F43F5E",
]

const RECENT_COLORS = ["#1E40AF", "#9333EA", "#DC2626", "#059669"]

const SAVED_PALETTES = [
  {
    name: "Brand Primary",
    colors: ["#1E40AF", "#3B82F6", "#93C5FD", "#DBEAFE"],
  },
  {
    name: "Sunset Warm",
    colors: ["#DC2626", "#F97316", "#FBBF24", "#FEF3C7"],
  },
  {
    name: "Forest",
    colors: ["#166534", "#22C55E", "#86EFAC", "#DCFCE7"],
  },
]

function hexToRgb(hex: string) {
  const result = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("")}`.toUpperCase()
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
      case gn: h = ((bn - rn) / d + 2) / 6; break
      case bn: h = ((rn - gn) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToHex(h: number, s: number, l: number) {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let rn = 0, gn = 0, bn = 0
  if (h < 60) { rn = c; gn = x }
  else if (h < 120) { rn = x; gn = c }
  else if (h < 180) { gn = c; bn = x }
  else if (h < 240) { gn = x; bn = c }
  else if (h < 300) { rn = x; bn = c }
  else { rn = c; bn = x }
  return rgbToHex(
    Math.round((rn + m) * 255),
    Math.round((gn + m) * 255),
    Math.round((bn + m) * 255)
  )
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function contrastRatio(hex1: string, hex2: string) {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function hexToTailwind(hex: string) {
  const tailwindMap: Record<string, string> = {
    "#EF4444": "red-500", "#F97316": "orange-500", "#F59E0B": "amber-500",
    "#EAB308": "yellow-500", "#84CC16": "lime-500", "#22C55E": "green-500",
    "#14B8A6": "teal-500", "#06B6D4": "cyan-500", "#0EA5E9": "sky-500",
    "#3B82F6": "blue-500", "#6366F1": "indigo-500", "#8B5CF6": "violet-500",
    "#A855F7": "purple-500", "#D946EF": "fuchsia-500", "#EC4899": "pink-500",
    "#F43F5E": "rose-500", "#1E40AF": "blue-800", "#9333EA": "purple-600",
    "#DC2626": "red-600", "#059669": "emerald-600",
  }
  return tailwindMap[hex.toUpperCase()] || null
}

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6")
  const [opacity, setOpacity] = useState(100)
  const [copied, setCopied] = useState(false)
  const [copyFormat, setCopyFormat] = useState("hex")
  const [gradientEnd, setGradientEnd] = useState("#8B5CF6")

  const rgb = useMemo(() => hexToRgb(selectedColor), [selectedColor])
  const hsl = useMemo(() => hexToHsl(selectedColor), [selectedColor])

  const [hexInput, setHexInput] = useState("#3B82F6")
  const [rInput, setRInput] = useState("59")
  const [gInput, setGInput] = useState("130")
  const [bInput, setBInput] = useState("246")
  const [hInput, setHInput] = useState("217")
  const [sInput, setSInput] = useState("91")
  const [lInput, setLInput] = useState("60")

  const contrastWhite = useMemo(() => contrastRatio(selectedColor, "#FFFFFF"), [selectedColor])
  const contrastBlack = useMemo(() => contrastRatio(selectedColor, "#000000"), [selectedColor])

  function selectColor(color: string) {
    setSelectedColor(color)
    setHexInput(color)
    const { r, g, b } = hexToRgb(color)
    setRInput(String(r))
    setGInput(String(g))
    setBInput(String(b))
    const { h, s, l } = hexToHsl(color)
    setHInput(String(h))
    setSInput(String(s))
    setLInput(String(l))
  }

  function handleHexChange(value: string) {
    const sanitized = value.startsWith("#") ? value : `#${value}`
    setHexInput(sanitized)
    if (/^#[0-9A-Fa-f]{6}$/.test(sanitized)) {
      selectColor(sanitized.toUpperCase())
    }
  }

  function handleRgbChange(channel: "r" | "g" | "b", value: string) {
    const num = parseInt(value) || 0
    const clamped = Math.max(0, Math.min(255, num))
    const newR = channel === "r" ? clamped : rgb.r
    const newG = channel === "g" ? clamped : rgb.g
    const newB = channel === "b" ? clamped : rgb.b
    if (channel === "r") setRInput(value)
    if (channel === "g") setGInput(value)
    if (channel === "b") setBInput(value)
    const hex = rgbToHex(newR, newG, newB)
    setSelectedColor(hex)
    setHexInput(hex)
    const { h, s, l } = hexToHsl(hex)
    setHInput(String(h))
    setSInput(String(s))
    setLInput(String(l))
  }

  function handleHslChange(channel: "h" | "s" | "l", value: string) {
    const num = parseInt(value) || 0
    const maxVal = channel === "h" ? 360 : 100
    const clamped = Math.max(0, Math.min(maxVal, num))
    const newH = channel === "h" ? clamped : hsl.h
    const newS = channel === "s" ? clamped : hsl.s
    const newL = channel === "l" ? clamped : hsl.l
    if (channel === "h") setHInput(value)
    if (channel === "s") setSInput(value)
    if (channel === "l") setLInput(value)
    const hex = hslToHex(newH, newS, newL)
    setSelectedColor(hex)
    setHexInput(hex)
    const { r, g, b } = hexToRgb(hex)
    setRInput(String(r))
    setGInput(String(g))
    setBInput(String(b))
  }

  function getFormattedColor() {
    const tw = hexToTailwind(selectedColor)
    switch (copyFormat) {
      case "rgb": return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      case "hsl": return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      case "tailwind": return tw ? `bg-${tw}` : selectedColor
      default: return selectedColor
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(getFormattedColor())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      {/* Header with preview */}
      <div className="flex items-center gap-3">
        <div
          className="size-12 shrink-0 rounded-lg border shadow-sm"
          style={{ backgroundColor: selectedColor, opacity: opacity / 100 }}
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Color Picker</h2>
          <p className="text-sm font-mono text-muted-foreground">
            {getFormattedColor()}
          </p>
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Pipette className="size-4" />
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Color Format Tabs */}
      <Tabs defaultValue="hex" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="hex" className="flex-1">HEX</TabsTrigger>
          <TabsTrigger value="rgb" className="flex-1">RGB</TabsTrigger>
          <TabsTrigger value="hsl" className="flex-1">HSL</TabsTrigger>
        </TabsList>

        <TabsContent value="hex">
          <div className="mt-3 space-y-2">
            <Label htmlFor="hex-input">HEX Value</Label>
            <Input
              id="hex-input"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              maxLength={7}
              className="font-mono"
            />
          </div>
        </TabsContent>

        <TabsContent value="rgb">
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label htmlFor="fr-r" className="text-xs">R</Label>
              <Input
                id="fr-r"
                value={rInput}
                onChange={(e) => handleRgbChange("r", e.target.value)}
                type="number"
                min={0}
                max={255}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fr-g" className="text-xs">G</Label>
              <Input
                id="fr-g"
                value={gInput}
                onChange={(e) => handleRgbChange("g", e.target.value)}
                type="number"
                min={0}
                max={255}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fr-b" className="text-xs">B</Label>
              <Input
                id="fr-b"
                value={bInput}
                onChange={(e) => handleRgbChange("b", e.target.value)}
                type="number"
                min={0}
                max={255}
                className="font-mono"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hsl">
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label htmlFor="fr-h" className="text-xs">H</Label>
              <Input
                id="fr-h"
                value={hInput}
                onChange={(e) => handleHslChange("h", e.target.value)}
                type="number"
                min={0}
                max={360}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fr-s" className="text-xs">S</Label>
              <Input
                id="fr-s"
                value={sInput}
                onChange={(e) => handleHslChange("s", e.target.value)}
                type="number"
                min={0}
                max={100}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fr-l" className="text-xs">L</Label>
              <Input
                id="fr-l"
                value={lInput}
                onChange={(e) => handleHslChange("l", e.target.value)}
                type="number"
                min={0}
                max={100}
                className="font-mono"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      {/* Copy Format + Copy Button */}
      <div className="flex items-center gap-2">
        <Select value={copyFormat} onValueChange={setCopyFormat}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hex">HEX</SelectItem>
            <SelectItem value="rgb">RGB</SelectItem>
            <SelectItem value="hsl">HSL</SelectItem>
            <SelectItem value="tailwind">Tailwind Class</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleCopy} className="shrink-0">
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Opacity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Opacity</Label>
          <span className="text-sm font-mono text-muted-foreground">{opacity}%</span>
        </div>
        <Slider
          value={[opacity]}
          onValueChange={(v) => setOpacity(v[0])}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <Separator className="my-4" />

      {/* Palette Grid */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-muted-foreground" />
          <Label>Palette</Label>
        </div>
        <div className="grid grid-cols-8 gap-1.5">
          {PALETTE_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => selectColor(color)}
              className={`size-8 rounded-md border-2 shadow-sm transition-all hover:scale-110 ${
                selectedColor === color
                  ? "border-foreground ring-2 ring-ring"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Recently Used */}
      <div className="space-y-2">
        <Label>Recently Used</Label>
        <div className="flex gap-2">
          {RECENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => selectColor(color)}
              className={`size-8 rounded-md border-2 shadow-sm transition-all hover:scale-110 ${
                selectedColor === color
                  ? "border-foreground ring-2 ring-ring"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Saved Palettes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Blend className="size-4 text-muted-foreground" />
            <Label>Saved Palettes</Label>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-1 size-3" />
            Save Current
          </Button>
        </div>
        <div className="space-y-2">
          {SAVED_PALETTES.map((palette) => (
            <div
              key={palette.name}
              className="flex items-center gap-3 rounded-lg border p-2"
            >
              <div className="flex gap-1">
                {palette.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => selectColor(color)}
                    className="size-6 rounded border shadow-sm transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{palette.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Gradient Preview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Blend className="size-4 text-muted-foreground" />
          <Label>Gradient Preview</Label>
        </div>
        <div
          className="h-12 w-full rounded-lg border shadow-sm"
          style={{
            background: `linear-gradient(to right, ${selectedColor}, ${gradientEnd})`,
          }}
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Start</Label>
            <div className="flex items-center gap-2">
              <div
                className="size-6 shrink-0 rounded border shadow-sm"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-xs font-mono text-muted-foreground">{selectedColor}</span>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">End</Label>
            <Input
              value={gradientEnd}
              onChange={(e) => setGradientEnd(e.target.value)}
              className="h-8 text-xs font-mono"
              maxLength={7}
            />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* WCAG Contrast Checker */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Contrast className="size-4 text-muted-foreground" />
          <Label>Contrast Checker</Label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Against White */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">vs White</span>
              <span className="text-xs font-mono text-muted-foreground">
                {contrastWhite.toFixed(2)}:1
              </span>
            </div>
            <div
              className="flex h-8 items-center justify-center rounded text-xs font-semibold"
              style={{ backgroundColor: "#FFFFFF", color: selectedColor }}
            >
              Sample
            </div>
            <div className="flex gap-1">
              <Badge
                variant={contrastWhite >= 4.5 ? "default" : "destructive"}
                className="text-[10px]"
              >
                AA {contrastWhite >= 4.5 ? "Pass" : "Fail"}
              </Badge>
              <Badge
                variant={contrastWhite >= 7 ? "default" : "destructive"}
                className="text-[10px]"
              >
                AAA {contrastWhite >= 7 ? "Pass" : "Fail"}
              </Badge>
            </div>
          </div>
          {/* Against Black */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">vs Black</span>
              <span className="text-xs font-mono text-muted-foreground">
                {contrastBlack.toFixed(2)}:1
              </span>
            </div>
            <div
              className="flex h-8 items-center justify-center rounded text-xs font-semibold"
              style={{ backgroundColor: "#000000", color: selectedColor }}
            >
              Sample
            </div>
            <div className="flex gap-1">
              <Badge
                variant={contrastBlack >= 4.5 ? "default" : "destructive"}
                className="text-[10px]"
              >
                AA {contrastBlack >= 4.5 ? "Pass" : "Fail"}
              </Badge>
              <Badge
                variant={contrastBlack >= 7 ? "default" : "destructive"}
                className="text-[10px]"
              >
                AAA {contrastBlack >= 7 ? "Pass" : "Fail"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
