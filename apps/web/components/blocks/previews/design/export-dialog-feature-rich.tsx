"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ClipboardCopy,
  Download,
  FileImage,
  Link2,
  RotateCcw,
} from "lucide-react"

const FORMATS = [
  { value: "png", label: "PNG", description: "Raster image" },
  { value: "svg", label: "SVG", description: "Vector graphic" },
  { value: "pdf", label: "PDF", description: "Document" },
  { value: "jpeg", label: "JPEG", description: "Compressed image" },
  { value: "webp", label: "WebP", description: "Modern web format" },
]

const SCALES = ["1x", "2x", "3x"]

const COLOR_PROFILES = [
  { value: "srgb", label: "sRGB" },
  { value: "display-p3", label: "Display P3" },
  { value: "adobe-rgb", label: "Adobe RGB" },
]

const ARTBOARDS = [
  { id: "homepage", name: "Homepage", size: "1920 × 1080" },
  { id: "about", name: "About", size: "1920 × 1080" },
  { id: "contact", name: "Contact", size: "1920 × 800" },
]

const PRESETS: Record<string, { format: string; quality: number; scale: string }> = {
  web: { format: "png", quality: 80, scale: "2x" },
  print: { format: "pdf", quality: 100, scale: "3x" },
  social: { format: "jpeg", quality: 85, scale: "1x" },
}

const EXPORT_HISTORY = [
  {
    id: "1",
    name: "homepage-v3.png",
    date: "Feb 20, 2026",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "about-final.svg",
    date: "Feb 19, 2026",
    size: "340 KB",
  },
  {
    id: "3",
    name: "contact-draft.pdf",
    date: "Feb 18, 2026",
    size: "1.1 MB",
  },
]

export default function ExportDialogFeatureRich() {
  const [format, setFormat] = useState("png")
  const [quality, setQuality] = useState(80)
  const [scale, setScale] = useState("2x")
  const [width, setWidth] = useState("1920")
  const [height, setHeight] = useState("1080")
  const [linked, setLinked] = useState(true)
  const [transparentBg, setTransparentBg] = useState(false)
  const [fileName, setFileName] = useState("design-export")
  const [colorProfile, setColorProfile] = useState("srgb")
  const [selectedArtboards, setSelectedArtboards] = useState<string[]>([
    "homepage",
  ])
  const [preset, setPreset] = useState("web")
  const [exportProgress] = useState(0)

  function handleWidthChange(value: string) {
    setWidth(value)
    if (linked && value) {
      const ratio = 1080 / 1920
      setHeight(String(Math.round(Number(value) * ratio)))
    }
  }

  function handleHeightChange(value: string) {
    setHeight(value)
    if (linked && value) {
      const ratio = 1920 / 1080
      setWidth(String(Math.round(Number(value) * ratio)))
    }
  }

  function toggleArtboard(id: string) {
    setSelectedArtboards((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  function applyPreset(key: string) {
    setPreset(key)
    const p = PRESETS[key]
    setFormat(p.format)
    setQuality(p.quality)
    setScale(p.scale)
  }

  function getQualityLabel(): string {
    if (quality >= 90) return "Lossless"
    if (quality >= 70) return "High"
    if (quality >= 40) return "Medium"
    return "Low"
  }

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Export Settings</h2>
          <p className="text-sm text-muted-foreground">
            Advanced export configuration
          </p>
        </div>
        <Badge variant="secondary">{format.toUpperCase()}</Badge>
      </div>

      <Separator className="my-4" />

      {/* Preset Tabs */}
      <Tabs value={preset} onValueChange={applyPreset}>
        <TabsList className="w-full">
          <TabsTrigger value="web" className="flex-1">
            Web
          </TabsTrigger>
          <TabsTrigger value="print" className="flex-1">
            Print
          </TabsTrigger>
          <TabsTrigger value="social" className="flex-1">
            Social Media
          </TabsTrigger>
        </TabsList>
        <TabsContent value="web">
          <p className="mt-2 text-xs text-muted-foreground">
            Optimized for screens at 72 DPI with sRGB color.
          </p>
        </TabsContent>
        <TabsContent value="print">
          <p className="mt-2 text-xs text-muted-foreground">
            High-resolution output at 300 DPI for professional printing.
          </p>
        </TabsContent>
        <TabsContent value="social">
          <p className="mt-2 text-xs text-muted-foreground">
            Sized and compressed for social media platforms.
          </p>
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      {/* Batch Export */}
      <div className="space-y-3">
        <Label>Artboards</Label>
        <div className="space-y-2">
          {ARTBOARDS.map((artboard) => (
            <div
              key={artboard.id}
              className="flex items-center gap-3 rounded-md border px-3 py-2"
            >
              <Checkbox
                id={`artboard-${artboard.id}`}
                checked={selectedArtboards.includes(artboard.id)}
                onCheckedChange={() => toggleArtboard(artboard.id)}
              />
              <Label
                htmlFor={`artboard-${artboard.id}`}
                className="flex flex-1 cursor-pointer items-center justify-between font-normal"
              >
                <span className="text-sm font-medium">{artboard.name}</span>
                <span className="text-xs text-muted-foreground">
                  {artboard.size}
                </span>
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {selectedArtboards.length} of {ARTBOARDS.length} selected
        </p>
      </div>

      <Separator className="my-4" />

      {/* Format & Quality */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Format</Label>
            <RadioGroup value={format} onValueChange={setFormat}>
              {FORMATS.map((f) => (
                <div key={f.value} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={f.value}
                    id={`fr-format-${f.value}`}
                  />
                  <Label
                    htmlFor={`fr-format-${f.value}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {f.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Quality</Label>
                <Badge variant="outline" className="text-xs">
                  {getQualityLabel()}
                </Badge>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
              <p className="text-right text-xs text-muted-foreground">
                {quality}%
              </p>
            </div>

            <div className="space-y-2">
              <Label>Color Profile</Label>
              <Select value={colorProfile} onValueChange={setColorProfile}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_PROFILES.map((cp) => (
                    <SelectItem key={cp.value} value={cp.value}>
                      {cp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Scale */}
        <div className="space-y-2">
          <Label>Scale</Label>
          <div className="flex gap-2">
            {SCALES.map((s) => (
              <Button
                key={s}
                variant={scale === s ? "default" : "outline"}
                size="sm"
                onClick={() => setScale(s)}
                className="flex-1"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Dimensions */}
        <div className="space-y-2">
          <Label>Dimensions</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              placeholder="Width"
              className="font-mono"
            />
            <Button
              variant={linked ? "default" : "outline"}
              size="icon"
              className="shrink-0"
              onClick={() => setLinked(!linked)}
            >
              <Link2 className="size-4" />
            </Button>
            <Input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              placeholder="Height"
              className="font-mono"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {linked ? "Aspect ratio locked" : "Aspect ratio unlocked"}
          </p>
        </div>

        <Separator />

        {/* Background */}
        <div className="flex items-center justify-between">
          <div>
            <Label>Transparent background</Label>
            <p className="text-xs text-muted-foreground">
              {transparentBg ? "Transparent" : "White background"}
            </p>
          </div>
          <Switch checked={transparentBg} onCheckedChange={setTransparentBg} />
        </div>

        <Separator />

        {/* File name */}
        <div className="space-y-2">
          <Label htmlFor="fr-file-name">File name</Label>
          <Input
            id="fr-file-name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Untitled"
          />
        </div>
      </div>

      <Separator className="my-4" />

      {/* Export Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Export Progress</Label>
          <span className="text-xs text-muted-foreground">
            {exportProgress}%
          </span>
        </div>
        <Progress value={exportProgress} />
      </div>

      <Separator className="my-4" />

      {/* Estimated size & actions */}
      <Card className="mb-4">
        <CardContent className="flex items-center justify-between p-3">
          <span className="text-sm text-muted-foreground">Estimated size</span>
          <span className="text-sm font-medium">~2.4 MB</span>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <ClipboardCopy className="mr-2 size-4" />
          Copy to Clipboard
        </Button>
        <Button className="flex-1">
          <Download className="mr-2 size-4" />
          Export
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Export History */}
      <div className="space-y-3">
        <Label>Recent Exports</Label>
        <div className="space-y-2">
          {EXPORT_HISTORY.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 rounded-md border px-3 py-2"
            >
              <FileImage className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex-1 space-y-0.5">
                <p className="text-sm font-medium">{entry.name}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.date} &middot; {entry.size}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="size-8 shrink-0">
                <RotateCcw className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
