"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Search,
  MoreHorizontal,
  FolderOpen,
  Copy,
  Merge,
} from "lucide-react"

type LayerType = "image" | "text" | "rectangle" | "ellipse"
type BlendMode = "normal" | "multiply" | "screen" | "overlay"

interface Layer {
  id: string
  name: string
  type: LayerType
  visible: boolean
  locked: boolean
  opacity: number
  color: string
  blendMode: BlendMode
  groupId?: string
}

interface LayerGroup {
  id: string
  name: string
  visible: boolean
  locked: boolean
  open: boolean
}

const initialGroups: LayerGroup[] = [
  { id: "g1", name: "Header Group", visible: true, locked: false, open: true },
  { id: "g2", name: "Content Group", visible: true, locked: false, open: true },
]

const initialLayers: Layer[] = [
  {
    id: "1",
    name: "Navigation Bar",
    type: "rectangle",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#6366f1",
    blendMode: "normal",
    groupId: "g1",
  },
  {
    id: "2",
    name: "Logo",
    type: "image",
    visible: true,
    locked: true,
    opacity: 100,
    color: "#f97316",
    blendMode: "normal",
    groupId: "g1",
  },
  {
    id: "3",
    name: "Header Text",
    type: "text",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#0f172a",
    blendMode: "normal",
    groupId: "g1",
  },
  {
    id: "4",
    name: "Hero Image",
    type: "image",
    visible: true,
    locked: false,
    opacity: 90,
    color: "#22c55e",
    blendMode: "normal",
    groupId: "g2",
  },
  {
    id: "5",
    name: "Title Text",
    type: "text",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#0f172a",
    blendMode: "normal",
    groupId: "g2",
  },
  {
    id: "6",
    name: "Subtitle",
    type: "text",
    visible: true,
    locked: false,
    opacity: 80,
    color: "#64748b",
    blendMode: "multiply",
    groupId: "g2",
  },
  {
    id: "7",
    name: "CTA Button",
    type: "rectangle",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#6366f1",
    blendMode: "normal",
  },
  {
    id: "8",
    name: "Decorative Circle",
    type: "ellipse",
    visible: false,
    locked: false,
    opacity: 50,
    color: "#ec4899",
    blendMode: "screen",
  },
  {
    id: "9",
    name: "Card Shape",
    type: "rectangle",
    visible: true,
    locked: false,
    opacity: 100,
    color: "#f1f5f9",
    blendMode: "normal",
  },
  {
    id: "10",
    name: "Background",
    type: "rectangle",
    visible: true,
    locked: true,
    opacity: 100,
    color: "#f8fafc",
    blendMode: "normal",
  },
]

const typeIcons: Record<LayerType, React.ReactNode> = {
  image: <Image className="h-3.5 w-3.5" />,
  text: <Type className="h-3.5 w-3.5" />,
  rectangle: <Square className="h-3.5 w-3.5" />,
  ellipse: <Circle className="h-3.5 w-3.5" />,
}

export function LayerPanel() {
  const [layers, setLayers] = useState<Layer[]>(initialLayers)
  const [groups, setGroups] = useState<LayerGroup[]>(initialGroups)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["5"]))
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLayers = useMemo(() => {
    if (!searchQuery.trim()) return layers
    const q = searchQuery.toLowerCase()
    return layers.filter((l) => l.name.toLowerCase().includes(q))
  }, [layers, searchQuery])

  const ungroupedLayers = useMemo(
    () => filteredLayers.filter((l) => !l.groupId),
    [filteredLayers]
  )

  const getGroupLayers = (groupId: string) =>
    filteredLayers.filter((l) => l.groupId === groupId)

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

  const toggleGroupOpen = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, open: !g.open } : g))
    )
  }

  const toggleSelect = (id: string, multi: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(multi ? prev : [])
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleBulkSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  const setBlendMode = (id: string, mode: BlendMode) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, blendMode: mode } : layer
      )
    )
  }

  const moveLayer = (id: string, direction: "up" | "down") => {
    setLayers((prev) => {
      const index = prev.findIndex((l) => l.id === id)
      if (index === -1) return prev
      const targetIndex = direction === "up" ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= prev.length) return prev
      const next = [...prev]
      const temp = next[index]
      next[index] = next[targetIndex]
      next[targetIndex] = temp
      return next
    })
  }

  const duplicateLayer = (id: string) => {
    const layer = layers.find((l) => l.id === id)
    if (!layer) return
    const newLayer: Layer = {
      ...layer,
      id: String(Date.now()),
      name: `${layer.name} Copy`,
    }
    const index = layers.findIndex((l) => l.id === id)
    setLayers((prev) => {
      const next = [...prev]
      next.splice(index, 0, newLayer)
      return next
    })
  }

  const deleteLayer = (id: string) => {
    if (layers.length <= 1) return
    setLayers((prev) => prev.filter((l) => l.id !== id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
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
      blendMode: "normal",
    }
    setLayers((prev) => [newLayer, ...prev])
  }

  const renderLayerRow = (layer: Layer) => {
    const isSelected = selectedIds.has(layer.id)

    return (
      <div
        key={layer.id}
        onClick={() => toggleSelect(layer.id, false)}
        className={`group flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1 text-sm transition-colors ${
          isSelected
            ? "bg-accent text-accent-foreground"
            : "hover:bg-muted"
        }`}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) =>
            toggleBulkSelect(layer.id, !!checked)
          }
          onClick={(e) => e.stopPropagation()}
          className="mr-0.5 h-3.5 w-3.5"
        />

        <GripVertical className="h-3.5 w-3.5 shrink-0 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />

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
            <Eye className="h-3 w-3" />
          ) : (
            <EyeOff className="h-3 w-3 text-muted-foreground" />
          )}
        </Button>

        <div
          className="h-4 w-4 shrink-0 rounded border"
          style={{ backgroundColor: layer.color }}
        />

        <span className="text-muted-foreground">
          {typeIcons[layer.type]}
        </span>

        <span
          className={`min-w-0 flex-1 truncate ${
            !layer.visible ? "text-muted-foreground line-through" : ""
          }`}
        >
          {layer.name}
        </span>

        <Select
          value={layer.blendMode}
          onValueChange={(val) =>
            setBlendMode(layer.id, val as BlendMode)
          }
        >
          <SelectTrigger
            className="h-5 w-[72px] border-none bg-transparent px-1 text-[10px] text-muted-foreground shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="multiply">Multiply</SelectItem>
            <SelectItem value="screen">Screen</SelectItem>
            <SelectItem value="overlay">Overlay</SelectItem>
          </SelectContent>
        </Select>

        <span className="w-7 text-right text-[10px] text-muted-foreground">
          {layer.opacity}%
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0"
          onClick={(e) => {
            e.stopPropagation()
            toggleLock(layer.id)
          }}
        >
          {layer.locked ? (
            <Lock className="h-2.5 w-2.5 text-amber-500" />
          ) : (
            <Unlock className="h-2.5 w-2.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => duplicateLayer(layer.id)}>
              <Copy className="mr-2 h-3.5 w-3.5" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteLayer(layer.id)}>
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => moveLayer(layer.id, "up")}>
              <Merge className="mr-2 h-3.5 w-3.5" />
              Merge Down
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers className="mr-2 h-3.5 w-3.5" />
              Flatten
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-md rounded-lg border bg-background p-4">
        <div className="mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Layers</h3>
          <Badge variant="secondary" className="text-xs">
            {layers.length}
          </Badge>
          {selectedIds.size > 1 && (
            <Badge variant="outline" className="text-xs">
              {selectedIds.size} selected
            </Badge>
          )}
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search layers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>

        <Separator className="mb-3" />

        <div className="max-h-[400px] space-y-1 overflow-y-auto">
          {groups.map((group) => {
            const groupLayers = getGroupLayers(group.id)
            if (searchQuery && groupLayers.length === 0) return null

            return (
              <Collapsible
                key={group.id}
                open={group.open}
                onOpenChange={() => toggleGroupOpen(group.id)}
              >
                <CollapsibleTrigger className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium hover:bg-muted">
                  <ChevronRight
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                      group.open ? "rotate-90" : ""
                    }`}
                  />
                  <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="flex-1 text-left">{group.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {groupLayers.length}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3 border-l pl-2">
                    {groupLayers.map(renderLayerRow)}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}

          {ungroupedLayers.length > 0 && (
            <>
              {groups.length > 0 && (
                <div className="py-1">
                  <Separator />
                </div>
              )}
              {ungroupedLayers.map(renderLayerRow)}
            </>
          )}
        </div>

        <Separator className="my-3" />

        <div className="flex items-center gap-1">
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
                size="icon"
                className="h-8 w-8"
                disabled={selectedIds.size === 0}
                onClick={() => {
                  const id = Array.from(selectedIds)[0]
                  if (id) moveLayer(id, "up")
                }}
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move up</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={selectedIds.size === 0}
                onClick={() => {
                  const id = Array.from(selectedIds)[0]
                  if (id) moveLayer(id, "down")
                }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move down</TooltipContent>
          </Tooltip>

          <div className="flex-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={selectedIds.size === 0}
                onClick={() => {
                  selectedIds.forEach((id) => deleteLayer(id))
                }}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete selected layers</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
