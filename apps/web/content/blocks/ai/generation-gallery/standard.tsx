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
  Clock,
  ImageIcon,
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
}

interface HistoryEntry {
  id: string
  prompt: string
  timestamp: Date
  count: number
}

export function GenerationGallery() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [aspectRatio, setAspectRatio] = useState("aspect-square")
  const [activeStyle, setActiveStyle] = useState("Photorealistic")
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const getRandomGradients = useCallback((count: number): string[] => {
    const shuffled = [...GRADIENTS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }, [])

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return
    setIsGenerating(true)
    setImages([])

    setTimeout(() => {
      const gradients = getRandomGradients(4)
      const newImages: GeneratedImage[] = gradients.map((g, i) => ({
        id: `${Date.now()}-${i}`,
        gradient: g,
        prompt: prompt,
      }))
      setImages(newImages)
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          prompt,
          timestamp: new Date(),
          count: 4,
        },
        ...prev.slice(0, 9),
      ])
      setIsGenerating(false)
    }, 1500)
  }

  const handleVariation = (image: GeneratedImage) => {
    setIsGenerating(true)
    setTimeout(() => {
      const gradients = getRandomGradients(4)
      const newImages: GeneratedImage[] = gradients.map((g, i) => ({
        id: `${Date.now()}-${i}`,
        gradient: g,
        prompt: image.prompt + " (variation)",
      }))
      setImages(newImages)
      setIsGenerating(false)
    }, 1200)
  }

  const handleUpscale = (image: GeneratedImage) => {
    setImages([image])
  }

  const handleRegenerate = (image: GeneratedImage, index: number) => {
    const newGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
    setImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, id: Date.now().toString(), gradient: newGradient } : img
      )
    )
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-lg border p-4 md:flex-row md:gap-6 md:p-6">
      <div className="flex-1 space-y-5">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-base font-semibold md:text-lg">
            <Sparkles className="h-4 w-4 text-amber-500 md:h-5 md:w-5" />
            Image Generation
          </h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Generate and refine AI images
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleGenerate()
          }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cosmic landscape with nebulae and stars..."
            className="flex-1"
            disabled={isGenerating}
          />
          <Button type="submit" disabled={!prompt.trim() || isGenerating} className="w-full sm:w-auto">
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Aspect Ratio</span>
            <div className="flex gap-1">
              {ASPECT_RATIOS.map((ar) => (
                <Button key={ar.label} variant={aspectRatio === ar.value ? "default" : "outline"} size="sm" className="h-7 px-2.5 text-xs" onClick={() => setAspectRatio(ar.value)}>
                  {ar.label}
                </Button>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" className="hidden h-6 md:block" />
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Style</span>
            <div className="flex flex-wrap gap-1">
              {STYLE_PRESETS.map((style) => (
                <Button key={style} variant={activeStyle === style ? "default" : "outline"} size="sm" className="h-7 px-2.5 text-xs" onClick={() => setActiveStyle(style)}>
                  {style}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {isGenerating ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`${aspectRatio} animate-pulse rounded-lg bg-muted`} />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className={`grid gap-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
            {images.map((image, index) => (
              <div key={image.id} className="group relative">
                <div
                  className={`${aspectRatio} w-full rounded-lg bg-gradient-to-br ${image.gradient}`}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 rounded-b-lg bg-black/60 px-2 py-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => handleUpscale(image)}
                    title="Upscale"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => handleVariation(image)}
                    title="Variations"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => handleRegenerate(image, index)}
                    title="Regenerate"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex ${aspectRatio === "aspect-[9/16]" ? "aspect-[9/16] max-h-[500px]" : aspectRatio} items-center justify-center rounded-lg border bg-muted/30`}
          >
            <div className="text-center text-muted-foreground">
              <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
              <p className="text-sm">Generate a 2x2 grid of images</p>
            </div>
          </div>
        )}
      </div>

      <div className="hidden w-full shrink-0 space-y-3 border-t pt-4 md:block md:w-56 md:border-l md:border-t-0 md:pt-0">
        <h3 className="flex items-center gap-1.5 text-sm font-medium">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Prompt History
        </h3>
        <Separator />
        {history.length === 0 ? (
          <p className="text-xs text-muted-foreground">Your prompt history will appear here</p>
        ) : (
          <div className="space-y-2">
            {history.map((entry) => (
              <button key={entry.id} className="w-full rounded-md border bg-background p-2.5 text-left transition-colors hover:bg-muted/50" onClick={() => setPrompt(entry.prompt)}>
                <p className="truncate text-xs font-medium">{entry.prompt}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{formatTime(entry.timestamp)}</span>
                  <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">{entry.count} images</Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
