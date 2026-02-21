"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  GripVertical,
  Image,
  Type,
  Square,
  Circle,
  Layers,
  Plus,
  Trash2,
} from "lucide-react"

type LayerType = "image" | "text" | "rectangle" | "ellipse"

interface Layer {
  id: string
  name: string
  type: LayerType
  visible: boolean
  locked: boolean
  opacity: number
  color: string
}

const initialLayers: Layer[] = [
  {
    id: "1",
    name: "CTA Button",
    type: "rectangle",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#6366f1",
  },
  {
    id: "2",
    name: "Subtitle",
    type: "text",
    visible: true,
    locked: false,
    opacity: 80,
    color: "#64748b",
  },
  {
    id: "3",
    name: "Title Text",
    type: "text",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#0f172a",
  },
  {
    id: "4",
    name: "Logo",
    type: "image",
    visible: true,
    locked: true,
    opacity: 100,
    color: "#f97316",
  },
  {
    id: "5",
    name: "Hero Image",
    type: "image",
    visible: true,
    locked: false,
    opacity: 90,
    color: "#22c55e",
  },
  {
    id: "6",
    name: "Card Shape",
    type: "ellipse",
    visible: false,
    locked: false,
    opacity: 50,
    color: "#ec4899",
  },
  {
    id: "7",
    name: "Background",
    type: "rectangle",
    visible: true,
    locked: true,
    opacity: 100,
    color: "#f8fafc",
  },
]

const typeIcons: Record<LayerType, React.ReactNode> = {
  image: <Image className="h-3.5 w-3.5" />,
  text: <Type className="h-3.5 w-3.5" />,
  rectangle: <Square className="h-3.5 w-3.5" />,
  ellipse: <Circle className="h-3.5 w-3.5" />,
}

export default function LayerPanelStandard() {
  const [layers, setLayers] = useState<Layer[]>(initialLayers)
  const [selectedId, setSelectedId] = useState<string>("3")

  const toggleVisibility = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    )
  }

  const toggleLock = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, locked: !layer.locked } : layer
      )
    )
  }

  const addLayer = () => {
    const newLayer: Layer = {
      id: String(Date.now()),
      name: `Layer ${layers.length + 1}`,
      type: "rectangle",
      visible: true,
      locked: false,
      opacity: 100,
      color: "#a855f7",
    }
    setLayers((prev) => [newLayer, ...prev])
  }

  const deleteLayer = () => {
    if (selectedId && layers.length > 1) {
      setLayers((prev) => prev.filter((l) => l.id !== selectedId))
      setSelectedId(layers.find((l) => l.id !== selectedId)?.id ?? "")
    }
  }

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-sm rounded-lg border bg-background p-4">
        <div className="mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Layers</h3>
          <Badge variant="secondary" className="ml-auto text-xs">
            {layers.length}
          </Badge>
        </div>
        <Separator className="mb-3" />

        <div className="space-y-0.5">
          {layers.map((layer) => (
            <div
              key={layer.id}
              onClick={() => setSelectedId(layer.id)}
              className={`group flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1.5 text-sm transition-colors ${
                selectedId === layer.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <GripVertical className="h-3.5 w-3.5 shrink-0 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />

              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {layer.visible ? "Hide layer" : "Show layer"}
                </TooltipContent>
              </Tooltip>

              <div
                className="h-5 w-5 shrink-0 rounded border"
                style={{ backgroundColor: layer.color }}
              />

              <span className="mr-1 text-muted-foreground">
                {typeIcons[layer.type]}
              </span>

              <span
                className={`flex-1 truncate ${
                  !layer.visible ? "text-muted-foreground line-through" : ""
                }`}
              >
                {layer.name}
              </span>

              <span className="mr-1 text-xs text-muted-foreground">
                {layer.opacity}%
              </span>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLock(layer.id)
                    }}
                  >
                    {layer.locked ? (
                      <Lock className="h-3 w-3 text-amber-500" />
                    ) : (
                      <Unlock className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {layer.locked ? "Unlock layer" : "Lock layer"}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={addLayer}>
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add new layer</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={deleteLayer}
                disabled={layers.length <= 1}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete selected layer</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
