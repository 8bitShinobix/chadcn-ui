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
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Sparkles,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

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
  { value: "source-sans", label: "Source Sans Pro" },
  { value: "dm-sans", label: "DM Sans" },
] as const

const fontWeights = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extrabold" },
] as const

const fontSizePresets = [
  { value: "12", label: "12" },
  { value: "14", label: "14" },
  { value: "16", label: "16" },
  { value: "18", label: "18" },
  { value: "24", label: "24" },
  { value: "32", label: "32" },
  { value: "48", label: "48" },
  { value: "64", label: "64" },
] as const

const textTransformOptions = [
  { value: "none", label: "None" },
  { value: "uppercase", label: "Uppercase" },
  { value: "lowercase", label: "Lowercase" },
  { value: "capitalize", label: "Capitalize" },
] as const

const textDecorationOptions = [
  { value: "none", label: "None" },
  { value: "underline", label: "Underline" },
  { value: "line-through", label: "Strikethrough" },
] as const

const fontPairings = [
  {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    description: "Classic editorial",
  },
  {
    heading: "Montserrat",
    body: "Open Sans",
    description: "Modern geometric",
  },
  {
    heading: "Raleway",
    body: "Lato",
    description: "Clean and elegant",
  },
] as const

const stylePresets = [
  { name: "Heading 1", font: "inter", size: "48", weight: "700" },
  { name: "Heading 2", font: "inter", size: "32", weight: "600" },
  { name: "Heading 3", font: "inter", size: "24", weight: "600" },
  { name: "Body", font: "inter", size: "16", weight: "400" },
  { name: "Caption", font: "inter", size: "12", weight: "400" },
  { name: "Overline", font: "inter", size: "11", weight: "600" },
] as const

const responsiveScales: Record<string, number> = {
  desktop: 1,
  tablet: 0.875,
  mobile: 0.75,
}

export default function TypographySelectorFeatureRich() {
  const [fontFamily, setFontFamily] = useState("inter")
  const [fontWeight, setFontWeight] = useState("400")
  const [fontSize, setFontSize] = useState("16")
  const [letterSpacing, setLetterSpacing] = useState("0")
  const [lineHeight, setLineHeight] = useState("1.5")
  const [formatting, setFormatting] = useState<string[]>([])
  const [alignment, setAlignment] = useState("left")
  const [textColor, setTextColor] = useState("#000000")
  const [textTransform, setTextTransform] = useState("none")
  const [textDecoration, setTextDecoration] = useState("none")
  const [responsivePreview, setResponsivePreview] = useState("desktop")
  const [antiAliased, setAntiAliased] = useState(true)
  const [savedPresets, setSavedPresets] = useState<
    Array<{ name: string; font: string; size: string; weight: string }>
  >([...stylePresets])

  const selectedFont =
    fonts.find((f) => f.value === fontFamily)?.label ?? "Inter"

  const scale = responsiveScales[responsivePreview] ?? 1
  const scaledSize = Math.round(Number(fontSize) * scale)

  const previewStyle: React.CSSProperties = {
    fontFamily: selectedFont,
    fontSize: `${scaledSize}px`,
    fontWeight: formatting.includes("bold") ? 700 : Number(fontWeight),
    fontStyle: formatting.includes("italic") ? "italic" : "normal",
    textDecoration:
      textDecoration !== "none"
        ? textDecoration
        : formatting.includes("underline")
          ? "underline"
          : "none",
    letterSpacing: `${letterSpacing}em`,
    lineHeight,
    textAlign: alignment as React.CSSProperties["textAlign"],
    color: textColor,
    textTransform: textTransform as React.CSSProperties["textTransform"],
    WebkitFontSmoothing: antiAliased ? "antialiased" : "auto",
  }

  const handleApplyPairing = (heading: string, body: string) => {
    const headingFont = fonts.find((f) => f.label === heading)
    if (headingFont) {
      setFontFamily(headingFont.value)
    }
    setFontWeight("700")
    setFontSize("32")
  }

  const handleSavePreset = () => {
    const newPreset = {
      name: `Custom ${savedPresets.length + 1}`,
      font: fontFamily,
      size: fontSize,
      weight: fontWeight,
    }
    setSavedPresets([...savedPresets, newPreset])
  }

  const handleLoadPreset = (preset: {
    font: string
    size: string
    weight: string
  }) => {
    setFontFamily(preset.font)
    setFontSize(preset.size)
    setFontWeight(preset.weight)
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full typographic controls with pairing suggestions and presets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="anti-alias" className="text-sm">
            Anti-alias
          </Label>
          <Switch
            id="anti-alias"
            checked={antiAliased}
            onCheckedChange={setAntiAliased}
          />
        </div>
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

      {/* Spacing */}
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

      {/* Formatting, Alignment & Color */}
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

      {/* Text Transform, Decoration & Color */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Text Transform</Label>
          <Select value={textTransform} onValueChange={setTextTransform}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textTransformOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Text Decoration</Label>
          <Select value={textDecoration} onValueChange={setTextDecoration}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textDecorationOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex items-center gap-2">
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
      </div>

      <Separator className="mt-6" />

      {/* Font Pairing Suggestions */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-muted-foreground" />
          <Label>Font Pairing Suggestions</Label>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {fontPairings.map((pair) => (
            <button
              key={pair.heading}
              type="button"
              onClick={() => handleApplyPairing(pair.heading, pair.body)}
              className={cn(
                "rounded-lg border p-3 text-left transition-colors",
                "hover:border-primary/50 hover:bg-accent"
              )}
            >
              <p className="text-sm font-semibold">{pair.heading}</p>
              <p className="text-xs text-muted-foreground">+ {pair.body}</p>
              <Badge variant="secondary" className="mt-2 text-[10px]">
                {pair.description}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator className="mt-6" />

      {/* Responsive Preview */}
      <div className="mt-4">
        <Label>Responsive Preview</Label>
        <Tabs
          value={responsivePreview}
          onValueChange={setResponsivePreview}
          className="mt-2"
        >
          <TabsList>
            <TabsTrigger value="desktop">
              <Monitor className="mr-1.5 size-3.5" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="tablet">
              <Tablet className="mr-1.5 size-3.5" />
              Tablet
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="mr-1.5 size-3.5" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="desktop">
            <Card>
              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Desktop Preview ({fontSize}px)
                  </p>
                  <Badge variant="outline" className="text-[10px]">
                    1x
                  </Badge>
                </div>
                <p style={previewStyle}>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tablet">
            <Card>
              <CardContent className="mx-auto max-w-md p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Tablet Preview ({scaledSize}px)
                  </p>
                  <Badge variant="outline" className="text-[10px]">
                    0.875x
                  </Badge>
                </div>
                <p style={previewStyle}>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile">
            <Card>
              <CardContent className="mx-auto max-w-xs p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Mobile Preview ({scaledSize}px)
                  </p>
                  <Badge variant="outline" className="text-[10px]">
                    0.75x
                  </Badge>
                </div>
                <p style={previewStyle}>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="mt-6" />

      {/* Style Presets */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <Label>Style Presets</Label>
          <Button variant="outline" size="sm" onClick={handleSavePreset}>
            <Save className="mr-1.5 size-3.5" />
            Save as Preset
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {savedPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleLoadPreset(preset)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                "hover:border-primary/50 hover:bg-accent"
              )}
            >
              <span className="font-medium">{preset.name}</span>
              <span className="ml-1.5 text-xs text-muted-foreground">
                {preset.size}px
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
