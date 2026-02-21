"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Loader2, ImageIcon } from "lucide-react"

const GRADIENTS = [
  "from-purple-500 via-pink-500 to-orange-400",
  "from-cyan-500 via-blue-500 to-purple-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-rose-400 via-fuchsia-500 to-indigo-500",
  "from-amber-400 via-orange-500 to-red-500",
  "from-violet-500 via-purple-500 to-fuchsia-400",
]

export default function GenerationGalleryMinimal() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedGradient, setGeneratedGradient] = useState<string | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null)

  const simulateGeneration = useCallback(() => {
    setIsGenerating(true)
    setProgress(0)
    setGeneratedGradient(null)

    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => {
          const gradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
          setGeneratedGradient(gradient)
          setIsGenerating(false)
        }, 300)
      } else {
        setProgress(Math.min(p, 99))
      }
    }, 200)
  }, [])

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return
    setCurrentPrompt(prompt)
    simulateGeneration()
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 rounded-lg border p-6">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Image Generation
        </h2>
        <p className="text-sm text-muted-foreground">
          Describe what you want to create
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleGenerate()
        }}
        className="flex gap-2"
      >
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A sunset over mountains with vibrant colors..."
          className="flex-1"
          disabled={isGenerating}
        />
        <Button type="submit" disabled={!prompt.trim() || isGenerating}>
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate
        </Button>
      </form>

      <div className="overflow-hidden rounded-lg border bg-muted/30">
        {isGenerating ? (
          <div className="flex aspect-square items-center justify-center p-8">
            <div className="w-full max-w-xs space-y-4 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Generating your image...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(progress)}% complete
                </p>
              </div>
            </div>
          </div>
        ) : generatedGradient ? (
          <div className="space-y-3 p-3">
            <div
              className={`aspect-square w-full rounded-md bg-gradient-to-br ${generatedGradient}`}
            />
            <p className="truncate text-xs text-muted-foreground">
              &ldquo;{currentPrompt}&rdquo;
            </p>
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
              <p className="text-sm">Your generated image will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
