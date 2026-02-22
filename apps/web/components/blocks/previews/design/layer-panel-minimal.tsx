"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Layers } from "lucide-react"

interface Layer {
  id: string
  name: string
  visible: boolean
}

const initialLayers: Layer[] = [
  { id: "1", name: "CTA Button", visible: true },
  { id: "2", name: "Subtitle", visible: true },
  { id: "3", name: "Title Text", visible: true },
  { id: "4", name: "Logo", visible: false },
  { id: "5", name: "Header Image", visible: true },
  { id: "6", name: "Background", visible: true },
]

export default function LayerPanelMinimal() {
  const [layers, setLayers] = useState<Layer[]>(initialLayers)
  const [selectedId, setSelectedId] = useState<string>("3")

  const toggleVisibility = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    )
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg border bg-background p-4">
      <div className="mb-3 flex items-center gap-2">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Layers</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {layers.length}
        </span>
      </div>
      <Separator className="mb-3" />
      <div className="space-y-0.5">
        {layers.map((layer) => (
          <div
            key={layer.id}
            onClick={() => setSelectedId(layer.id)}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
              selectedId === layer.id
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleVisibility(layer.id)
              }}
            >
              {layer.visible ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </Button>
            <span
              className={
                layer.visible ? "" : "text-muted-foreground line-through"
              }
            >
              {layer.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
