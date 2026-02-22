"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Download, Link2 } from "lucide-react"

const FORMATS = [
  { value: "png", label: "PNG" },
  { value: "svg", label: "SVG" },
  { value: "pdf", label: "PDF" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
]

const SCALES = ["1x", "2x", "3x"]

export default function ExportDialogStandard() {
  const [format, setFormat] = useState("png")
  const [quality, setQuality] = useState(80)
  const [scale, setScale] = useState("2x")
  const [width, setWidth] = useState("1920")
  const [height, setHeight] = useState("1080")
  const [linked, setLinked] = useState(true)
  const [transparentBg, setTransparentBg] = useState(false)
  const [fileName, setFileName] = useState("design-export")

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

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <h2 className="text-lg font-semibold">Export Settings</h2>
      <p className="text-sm text-muted-foreground">
        Configure your export options.
      </p>

      <Separator className="my-4" />

      {/* Format & Quality */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Quality{" "}
              <span className="text-muted-foreground">({quality}%)</span>
            </Label>
            <input
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
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
          <Label htmlFor="file-name">File name</Label>
          <Input
            id="file-name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Untitled"
          />
        </div>
      </div>

      <Separator className="my-4" />

      {/* Footer */}
      <Card className="mb-4">
        <CardContent className="flex items-center justify-between p-3">
          <span className="text-sm text-muted-foreground">
            Estimated size
          </span>
          <span className="text-sm font-medium">~2.4 MB</span>
        </CardContent>
      </Card>

      <Button className="w-full">
        <Download className="mr-2 size-4" />
        Export {format.toUpperCase()}
      </Button>
    </div>
  )
}
