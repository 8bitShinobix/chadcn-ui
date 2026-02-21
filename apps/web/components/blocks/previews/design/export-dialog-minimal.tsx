"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"

const FORMATS = [
  { value: "png", label: "PNG", description: "Raster image" },
  { value: "svg", label: "SVG", description: "Vector graphic" },
  { value: "pdf", label: "PDF", description: "Document" },
  { value: "jpeg", label: "JPEG", description: "Compressed image" },
]

export default function ExportDialogMinimal() {
  const [format, setFormat] = useState("png")

  return (
    <div className="mx-auto w-full max-w-sm p-6">
      <h2 className="text-lg font-semibold">Export</h2>
      <p className="text-sm text-muted-foreground">
        Choose a format and export your design.
      </p>

      <Separator className="my-4" />

      <div className="space-y-3">
        <Label>Format</Label>
        <RadioGroup value={format} onValueChange={setFormat}>
          {FORMATS.map((f) => (
            <div key={f.value} className="flex items-center gap-3">
              <RadioGroupItem value={f.value} id={`format-${f.value}`} />
              <Label
                htmlFor={`format-${f.value}`}
                className="flex flex-1 cursor-pointer items-center justify-between font-normal"
              >
                <span className="font-medium">{f.label}</span>
                <span className="text-xs text-muted-foreground">
                  {f.description}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">1920 × 1080 px</span>
        <Button>
          <Download className="mr-2 size-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
