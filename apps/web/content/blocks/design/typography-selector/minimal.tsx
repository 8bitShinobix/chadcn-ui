"use client"

import { useState } from "react"
import { Bold, Italic, Underline } from "lucide-react"
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

const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "lato", label: "Lato" },
  { value: "montserrat", label: "Montserrat" },
] as const

export function TypographySelector() {
  const [fontFamily, setFontFamily] = useState("inter")
  const [fontSize, setFontSize] = useState("16")
  const [formatting, setFormatting] = useState<string[]>([])

  const previewStyle: React.CSSProperties = {
    fontFamily: fonts.find((f) => f.value === fontFamily)?.label ?? "Inter",
    fontSize: `${fontSize}px`,
    fontWeight: formatting.includes("bold") ? 700 : 400,
    fontStyle: formatting.includes("italic") ? "italic" : "normal",
    textDecoration: formatting.includes("underline") ? "underline" : "none",
  }

  return (
    <div className="mx-auto w-full max-w-sm p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select font family, size, and formatting.
        </p>
      </div>

      <Separator className="mt-4" />

      <div className="mt-6 space-y-4">
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
          <Label>Font Size (px)</Label>
          <Input
            type="number"
            min={8}
            max={120}
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>

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
      </div>

      <Separator className="mt-6" />

      <div className="mt-4 rounded-lg border bg-muted/30 p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Preview
        </p>
        <p style={previewStyle}>The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  )
}
