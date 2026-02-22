"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Pipette, Copy, Check } from "lucide-react"

const PALETTE_COLORS = [
  "#EF4444", "#F97316", "#F59E0B", "#EAB308",
  "#84CC16", "#22C55E", "#14B8A6", "#06B6D4",
  "#0EA5E9", "#3B82F6", "#6366F1", "#8B5CF6",
  "#A855F7", "#D946EF", "#EC4899", "#F43F5E",
]

const RECENT_COLORS = ["#1E40AF", "#9333EA", "#DC2626", "#059669"]

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

export default function ColorPickerStandard() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6")
  const [opacity, setOpacity] = useState(100)
  const [copied, setCopied] = useState(false)

  const rgb = useMemo(() => hexToRgb(selectedColor), [selectedColor])
  const hsl = useMemo(() => hexToHsl(selectedColor), [selectedColor])

  const [hexInput, setHexInput] = useState("#3B82F6")
  const [rInput, setRInput] = useState("59")
  const [gInput, setGInput] = useState("130")
  const [bInput, setBInput] = useState("246")
  const [hInput, setHInput] = useState("217")
  const [sInput, setSInput] = useState("91")
  const [lInput, setLInput] = useState("60")

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

  function handleCopy() {
    navigator.clipboard.writeText(selectedColor)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <div className="flex items-center gap-3">
        <div
          className="size-12 shrink-0 rounded-lg border shadow-sm"
          style={{ backgroundColor: selectedColor, opacity: opacity / 100 }}
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Color Picker</h2>
          <p className="text-sm text-muted-foreground">
            {selectedColor} &middot; {opacity}% opacity
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={handleCopy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
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
            <Label htmlFor="hex-value">HEX Value</Label>
            <div className="flex items-center gap-2">
              <Input
                id="hex-value"
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
        </TabsContent>

        <TabsContent value="rgb">
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label htmlFor="r-value" className="text-xs">R</Label>
              <Input
                id="r-value"
                value={rInput}
                onChange={(e) => handleRgbChange("r", e.target.value)}
                type="number"
                min={0}
                max={255}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="g-value" className="text-xs">G</Label>
              <Input
                id="g-value"
                value={gInput}
                onChange={(e) => handleRgbChange("g", e.target.value)}
                type="number"
                min={0}
                max={255}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="b-value" className="text-xs">B</Label>
              <Input
                id="b-value"
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
              <Label htmlFor="h-value" className="text-xs">H</Label>
              <Input
                id="h-value"
                value={hInput}
                onChange={(e) => handleHslChange("h", e.target.value)}
                type="number"
                min={0}
                max={360}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-value" className="text-xs">S</Label>
              <Input
                id="s-value"
                value={sInput}
                onChange={(e) => handleHslChange("s", e.target.value)}
                type="number"
                min={0}
                max={100}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="l-value" className="text-xs">L</Label>
              <Input
                id="l-value"
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

      {/* Palette */}
      <div className="space-y-2">
        <Label>Palette</Label>
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

      {/* Recent Colors */}
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
    </div>
  )
}
