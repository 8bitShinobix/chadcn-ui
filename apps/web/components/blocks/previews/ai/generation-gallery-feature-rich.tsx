"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sparkles,
  Loader2,
  Maximize2,
  Shuffle,
  RotateCcw,
  Heart,
  Bookmark,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  ImageIcon,
  SlidersHorizontal,
  ListChecks,
  Clock,
  Check,
} from "lucide-react"

const GRADIENTS = [
  "from-purple-500 via-pink-500 to-orange-400",
  "from-cyan-500 via-blue-500 to-purple-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-rose-400 via-fuchsia-500 to-indigo-500",
  "from-amber-400 via-orange-500 to-red-500",
  "from-violet-500 via-purple-500 to-fuchsia-400",
  "from-sky-400 via-indigo-500 to-purple-600",
  "from-lime-400 via-emerald-500 to-teal-600",
  "from-pink-400 via-rose-500 to-red-500",
  "from-teal-400 via-cyan-500 to-blue-500",
  "from-orange-400 via-amber-500 to-yellow-500",
  "from-indigo-400 via-violet-500 to-purple-500",
]

const ASPECT_RATIOS = [
  { label: "1:1", value: "aspect-square" },
  { label: "16:9", value: "aspect-video" },
  { label: "9:16", value: "aspect-[9/16]" },
]

const STYLE_PRESETS = ["Photorealistic", "Illustration", "Anime", "Abstract"]

interface GeneratedImage {
  id: string
  gradient: string
  prompt: string
  favorited: boolean
  saved: boolean
}

interface QueueItem {
  id: string
  prompt: string
  status: "pending" | "generating" | "complete"
  images: GeneratedImage[]
}

export default function GenerationGalleryFeatureRich() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [gallery, setGallery] = useState<GeneratedImage[]>([])
  const [aspectRatio, setAspectRatio] = useState("aspect-square")
  const [activeStyle, setActiveStyle] = useState("Photorealistic")
  const [steps, setSteps] = useState(30)
  const [guidance, setGuidance] = useState(7.5)
  const [seed, setSeed] = useState("")
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [lightboxImage, setLightboxImage] = useState<GeneratedImage | null>(null)
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [showParams, setShowParams] = useState(true)

  const getRandomGradients = useCallback((count: number): string[] => {
    const shuffled = [...GRADIENTS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }, [])

  const processQueue = useCallback(
    (queueItems: QueueItem[]) => {
      const pendingIndex = queueItems.findIndex((q) => q.status === "pending")
      if (pendingIndex === -1) {
        setIsGenerating(false)
        return
      }

      setQueue((prev) =>
        prev.map((item, i) =>
          i === pendingIndex ? { ...item, status: "generating" as const } : item
        )
      )

      setTimeout(() => {
        const gradients = getRandomGradients(4)
        const newImages: GeneratedImage[] = gradients.map((g, i) => ({
          id: `${Date.now()}-${i}`,
          gradient: g,
          prompt: queueItems[pendingIndex].prompt,
          favorited: false,
          saved: false,
        }))

        setQueue((prev) => {
          const updated = prev.map((item, i) =>
            i === pendingIndex
              ? { ...item, status: "complete" as const, images: newImages }
              : item
          )
          const nextPending = updated.findIndex((q) => q.status === "pending")
          if (nextPending !== -1) {
            setTimeout(() => processQueue(updated), 200)
          } else {
            setIsGenerating(false)
          }
          return updated
        })

        setGallery((prev) => [...newImages, ...prev])
      }, 1500)
    },
    [getRandomGradients]
  )

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return

    const newItem: QueueItem = {
      id: Date.now().toString(),
      prompt: prompt,
      status: "pending",
      images: [],
    }

    const updatedQueue = [newItem, ...queue]
    setQueue(updatedQueue)
    setIsGenerating(true)
    setPrompt("")
    processQueue(updatedQueue)
  }

  const handleBatchGenerate = () => {
    if (!prompt.trim() || isGenerating) return

    const items: QueueItem[] = Array.from({ length: 3 }, (_, i) => ({
      id: `${Date.now()}-batch-${i}`,
      prompt: `${prompt} (batch ${i + 1}/3)`,
      status: "pending" as const,
      images: [],
    }))

    const updatedQueue = [...items, ...queue]
    setQueue(updatedQueue)
    setIsGenerating(true)
    setPrompt("")
    processQueue(updatedQueue)
  }

  const toggleFavorite = (imageId: string) => {
    setGallery((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, favorited: !img.favorited } : img
      )
    )
    if (lightboxImage?.id === imageId) {
      setLightboxImage((prev) =>
        prev ? { ...prev, favorited: !prev.favorited } : null
      )
    }
  }

  const toggleSave = (imageId: string) => {
    setGallery((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, saved: !img.saved } : img
      )
    )
    if (lightboxImage?.id === imageId) {
      setLightboxImage((prev) =>
        prev ? { ...prev, saved: !prev.saved } : null
      )
    }
  }

  const openLightbox = (image: GeneratedImage) => {
    setLightboxImage(image)
    setLightboxZoom(1)
  }

  return (
    <>
      <div className="mx-auto w-full max-w-6xl space-y-6 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Image Generation Studio
            </h2>
            <p className="text-sm text-muted-foreground">
              Advanced generation with parameter controls and batch processing
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowParams(!showParams)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {showParams ? "Hide" : "Show"} Parameters
          </Button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Prompt
                </label>
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A cosmic landscape with nebulae and stars..."
                  disabled={isGenerating}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Negative Prompt
                </label>
                <Input
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="blurry, low quality, distorted..."
                  disabled={isGenerating}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Aspect Ratio
                </span>
                <div className="flex gap-1">
                  {ASPECT_RATIOS.map((ar) => (
                    <Button
                      key={ar.label}
                      variant={aspectRatio === ar.value ? "default" : "outline"}
                      size="sm"
                      className="h-7 px-2.5 text-xs"
                      onClick={() => setAspectRatio(ar.value)}
                    >
                      {ar.label}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Style
                </span>
                <div className="flex gap-1">
                  {STYLE_PRESETS.map((style) => (
                    <Button
                      key={style}
                      variant={activeStyle === style ? "default" : "outline"}
                      size="sm"
                      className="h-7 px-2.5 text-xs"
                      onClick={() => setActiveStyle(style)}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {showParams && (
              <div className="rounded-lg border bg-muted/20 p-4">
                <h4 className="mb-3 flex items-center gap-1.5 text-xs font-medium">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Generation Parameters
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-muted-foreground">Steps</label>
                      <span className="text-xs font-mono font-medium">{steps}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      value={steps}
                      onChange={(e) => setSteps(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary/20 accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>10</span>
                      <span>50</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-muted-foreground">
                        Guidance Scale
                      </label>
                      <span className="text-xs font-mono font-medium">
                        {guidance.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={guidance}
                      onChange={(e) => setGuidance(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary/20 accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Seed</label>
                    <Input
                      type="number"
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      placeholder="Random"
                      className="h-8 text-xs"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Leave empty for random
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate
              </Button>
              <Button
                variant="outline"
                onClick={handleBatchGenerate}
                disabled={!prompt.trim() || isGenerating}
              >
                <ListChecks className="mr-2 h-4 w-4" />
                Batch (3x)
              </Button>
            </div>
          </div>

          <div className="w-64 shrink-0 space-y-3">
            <h3 className="flex items-center gap-1.5 text-sm font-medium">
              <ListChecks className="h-4 w-4 text-muted-foreground" />
              Generation Queue
            </h3>
            <Separator />
            {queue.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Queue is empty. Generate some images to get started.
              </p>
            ) : (
              <div className="max-h-[300px] space-y-2 overflow-y-auto">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md border bg-background p-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="flex-1 truncate text-xs font-medium">
                        {item.prompt}
                      </p>
                      {item.status === "complete" ? (
                        <Badge
                          variant="outline"
                          className="shrink-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Done
                        </Badge>
                      ) : item.status === "generating" ? (
                        <Badge variant="secondary" className="shrink-0">
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Running
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="shrink-0">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    {item.status === "complete" && item.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-4 gap-1">
                        {item.images.map((img) => (
                          <div
                            key={img.id}
                            className={`aspect-square rounded bg-gradient-to-br ${img.gradient} cursor-pointer`}
                            onClick={() => openLightbox(img)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Gallery</h3>
            <span className="text-xs text-muted-foreground">
              {gallery.length} images
            </span>
          </div>

          {gallery.length === 0 ? (
            <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted/30">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
                <p className="text-sm">Generated images will appear here</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {gallery.map((image) => (
                <div key={image.id} className="group relative">
                  <div
                    className={`aspect-square cursor-pointer rounded-lg bg-gradient-to-br ${image.gradient} transition-transform hover:scale-[1.02]`}
                    onClick={() => openLightbox(image)}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-lg bg-black/60 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex gap-0.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(image.id)
                        }}
                      >
                        <Heart
                          className={`h-3 w-3 ${image.favorited ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSave(image.id)
                        }}
                      >
                        <Bookmark
                          className={`h-3 w-3 ${image.saved ? "fill-amber-500 text-amber-500" : ""}`}
                        />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        openLightbox(image)
                      }}
                    >
                      <Maximize2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Dialog */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-12 right-0 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setLightboxZoom((z) => Math.max(0.5, z - 0.25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium text-white">
                {Math.round(lightboxZoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setLightboxZoom((z) => Math.min(3, z + 0.25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-5 bg-white/30" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={() => toggleFavorite(lightboxImage.id)}
              >
                <Heart
                  className={`h-4 w-4 ${lightboxImage.favorited ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={() => toggleSave(lightboxImage.id)}
              >
                <Bookmark
                  className={`h-4 w-4 ${lightboxImage.saved ? "fill-amber-500 text-amber-500" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setLightboxImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg">
              <div
                className={`aspect-square w-full bg-gradient-to-br ${lightboxImage.gradient} transition-transform`}
                style={{ transform: `scale(${lightboxZoom})` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="max-w-md truncate text-sm text-white/70">
                &ldquo;{lightboxImage.prompt}&rdquo;
              </p>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-white hover:bg-white/20 hover:text-white"
                >
                  <Maximize2 className="mr-1.5 h-3 w-3" />
                  Upscale
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-white hover:bg-white/20 hover:text-white"
                >
                  <Shuffle className="mr-1.5 h-3 w-3" />
                  Variations
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-white hover:bg-white/20 hover:text-white"
                >
                  <RotateCcw className="mr-1.5 h-3 w-3" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
