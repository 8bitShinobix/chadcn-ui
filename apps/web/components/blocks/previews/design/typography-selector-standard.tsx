"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "lato", label: "Lato" },
  { value: "montserrat", label: "Montserrat" },
  { value: "poppins", label: "Poppins" },
  { value: "raleway", label: "Raleway" },
  { value: "nunito", label: "Nunito" },
  { value: "playfair", label: "Playfair Display" },
  { value: "merriweather", label: "Merriweather" },
] as const

const fontWeights = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
] as const

const fontSizePresets = [
  { value: "12", label: "12" },
  { value: "14", label: "14" },
  { value: "16", label: "16" },
  { value: "18", label: "18" },
  { value: "24", label: "24" },
  { value: "32", label: "32" },
  { value: "48", label: "48" },
] as const

export default function TypographySelectorStandard() {
  const [fontFamily, setFontFamily] = useState("inter")
  const [fontWeight, setFontWeight] = useState("400")
  const [fontSize, setFontSize] = useState("16")
  const [letterSpacing, setLetterSpacing] = useState("0")
  const [lineHeight, setLineHeight] = useState("1.5")
  const [formatting, setFormatting] = useState<string[]>([])
  const [alignment, setAlignment] = useState("left")
  const [textColor, setTextColor] = useState("#000000")

  const selectedFont =
    fonts.find((f) => f.value === fontFamily)?.label ?? "Inter"

  const previewStyle: React.CSSProperties = {
    fontFamily: selectedFont,
    fontSize: `${fontSize}px`,
    fontWeight: Number(fontWeight),
    fontStyle: formatting.includes("italic") ? "italic" : "normal",
    textDecoration: formatting.includes("underline") ? "underline" : "none",
    letterSpacing: `${letterSpacing}em`,
    lineHeight,
    textAlign: alignment as React.CSSProperties["textAlign"],
    color: textColor,
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure font properties, spacing, and text formatting.
        </p>
      </div>

      <Separator className="mt-4" />

      {/* Font Family & Weight */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Font Weight</Label>
          <Select value={fontWeight} onValueChange={setFontWeight}>
            <SelectTrigger>
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent>
              {fontWeights.map((w) => (
                <SelectItem key={w.value} value={w.value}>
                  {w.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Font Size */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Size (px)</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger>
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizePresets.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Custom Size</Label>
          <Input
            type="number"
            min={8}
            max={120}
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>
      </div>

      <Separator className="mt-6" />

      {/* Letter Spacing & Line Height */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Letter Spacing (em)</Label>
          <Input
            type="number"
            step={0.01}
            min={-0.1}
            max={1}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Line Height</Label>
          <Input
            type="number"
            step={0.1}
            min={0.8}
            max={3}
            value={lineHeight}
            onChange={(e) => setLineHeight(e.target.value)}
          />
        </div>
      </div>

      <Separator className="mt-6" />

      {/* Formatting & Alignment */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Formatting</Label>
          <ToggleGroup
            type="multiple"
            value={formatting}
            onValueChange={setFormatting}
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Alignment</Label>
          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={(val) => val && setAlignment(val)}
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Justify">
              <AlignJustify className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Text Color */}
      <div className="mt-4 space-y-2">
        <Label>Text Color</Label>
        <div className="flex items-center gap-3">
          <div
            className="size-8 shrink-0 rounded-md border"
            style={{ backgroundColor: textColor }}
          />
          <Input
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            placeholder="#000000"
            className="font-mono"
          />
        </div>
      </div>

      <Separator className="mt-6" />

      {/* Live Preview */}
      <Card className="mt-4">
        <CardContent className="p-6">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Preview
          </p>
          <p style={previewStyle}>
            The quick brown fox jumps over the lazy dog. Pack my box with five
            dozen liquor jugs.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
