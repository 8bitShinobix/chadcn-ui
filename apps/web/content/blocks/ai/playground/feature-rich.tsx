"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Play,
  RotateCcw,
  Loader2,
  Download,
  DollarSign,
  Braces,
  BookmarkPlus,
  Columns2,
} from "lucide-react"

interface ModelConfig {
  value: string
  label: string
  provider: string
  inputCostPer1k: number
  outputCostPer1k: number
}

const MODELS: ModelConfig[] = [
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI", inputCostPer1k: 0.005, outputCostPer1k: 0.015 },
  { value: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic", inputCostPer1k: 0.003, outputCostPer1k: 0.015 },
  { value: "gemini-pro", label: "Gemini Pro", provider: "Google", inputCostPer1k: 0.00125, outputCostPer1k: 0.005 },
  { value: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI", inputCostPer1k: 0.00015, outputCostPer1k: 0.0006 },
  { value: "claude-3-haiku", label: "Claude 3 Haiku", provider: "Anthropic", inputCostPer1k: 0.00025, outputCostPer1k: 0.00125 },
]

const PRESETS = [
  { value: "default", label: "Default", systemPrompt: "You are a helpful assistant." },
  { value: "coder", label: "Code Assistant", systemPrompt: "You are an expert programmer. Write clean, well-documented code with clear explanations." },
  { value: "writer", label: "Creative Writer", systemPrompt: "You are a creative writing assistant. Write engaging, vivid prose with attention to narrative structure." },
  { value: "analyst", label: "Data Analyst", systemPrompt: "You are a data analyst. Provide structured analysis with insights, trends, and actionable recommendations." },
  { value: "tutor", label: "Tutor", systemPrompt: "You are a patient tutor. Explain concepts step-by-step and check for understanding." },
]

const SAMPLE_RESPONSES: Record<string, string> = {
  "gpt-4o": `Here's the response from GPT-4o:

This model excels at complex reasoning, code generation, and nuanced understanding. It processes both text and images with state-of-the-art performance across a wide range of tasks.

Key strengths include advanced reasoning, creative problem solving, and multi-modal capabilities.`,
  "claude-3.5-sonnet": `Here's the response from Claude 3.5 Sonnet:

This model provides thoughtful, nuanced responses with strong analytical capabilities and careful reasoning. It excels at long-context understanding and structured output.

Key strengths include careful analysis, code generation with explanations, and document comprehension.`,
  "gemini-pro": `Here's the response from Gemini Pro:

This model combines strong language understanding with multi-modal capabilities. It offers efficient token usage and strong coding abilities.

Key strengths include multi-modal reasoning, factual knowledge retrieval, and efficient processing.`,
  "gpt-4o-mini": `Here's the response from GPT-4o Mini:

A compact yet capable model optimized for speed and cost efficiency. It handles most tasks well while being significantly more affordable than larger models.

Key strengths include fast response times, low cost, and solid general performance.`,
  "claude-3-haiku": `Here's the response from Claude 3 Haiku:

The fastest model in the Claude family, optimized for near-instant responses. Ideal for high-throughput applications that need quick, accurate outputs.

Key strengths include speed, cost efficiency, and reliable structured outputs.`,
}

function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.3)
}

interface ComparisonColumn {
  model: string
  response: string
  isRunning: boolean
  tokens: { prompt: number; completion: number }
}

export function AIPlayground() {
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant. Respond concisely and accurately."
  )
  const [userMessage, setUserMessage] = useState("")
  const [preset, setPreset] = useState("default")
  const [jsonMode, setJsonMode] = useState(false)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1024)

  const [leftColumn, setLeftColumn] = useState<ComparisonColumn>({
    model: "gpt-4o",
    response: "",
    isRunning: false,
    tokens: { prompt: 0, completion: 0 },
  })

  const [rightColumn, setRightColumn] = useState<ComparisonColumn>({
    model: "claude-3.5-sonnet",
    response: "",
    isRunning: false,
    tokens: { prompt: 0, completion: 0 },
  })

  const handlePresetChange = (value: string) => {
    setPreset(value)
    const selected = PRESETS.find((p) => p.value === value)
    if (selected) {
      setSystemPrompt(selected.systemPrompt)
    }
  }

  const simulateResponse = useCallback(
    (
      modelValue: string,
      setColumn: React.Dispatch<React.SetStateAction<ComparisonColumn>>
    ) => {
      const promptTk = estimateTokens(systemPrompt + " " + userMessage)
      let fullResponse = SAMPLE_RESPONSES[modelValue] || SAMPLE_RESPONSES["gpt-4o"]!

      if (jsonMode) {
        fullResponse = JSON.stringify(
          {
            response: fullResponse.split("\n")[0],
            model: modelValue,
            tokens_used: promptTk + 85,
            metadata: {
              temperature,
              max_tokens: maxTokens,
              finish_reason: "stop",
            },
          },
          null,
          2
        )
      }

      setColumn((prev) => ({
        ...prev,
        response: "",
        isRunning: true,
        tokens: { prompt: promptTk, completion: 0 },
      }))

      let i = 0
      const interval = setInterval(() => {
        i += 3
        if (i >= fullResponse.length) {
          const completionTk = estimateTokens(fullResponse)
          setColumn((prev) => ({
            ...prev,
            response: fullResponse,
            isRunning: false,
            tokens: { prompt: promptTk, completion: completionTk },
          }))
          clearInterval(interval)
        } else {
          setColumn((prev) => ({
            ...prev,
            response: fullResponse.slice(0, i),
            tokens: {
              ...prev.tokens,
              completion: estimateTokens(fullResponse.slice(0, i)),
            },
          }))
        }
      }, 15)
    },
    [systemPrompt, userMessage, jsonMode, temperature, maxTokens]
  )

  const handleSubmit = () => {
    if (!userMessage.trim()) return
    simulateResponse(leftColumn.model, setLeftColumn)
    if (comparisonMode) {
      simulateResponse(rightColumn.model, setRightColumn)
    }
  }

  const handleClear = () => {
    setUserMessage("")
    setLeftColumn((prev) => ({
      ...prev,
      response: "",
      tokens: { prompt: 0, completion: 0 },
    }))
    setRightColumn((prev) => ({
      ...prev,
      response: "",
      tokens: { prompt: 0, completion: 0 },
    }))
  }

  const handleExport = () => {
    const exportData = {
      systemPrompt,
      userMessage,
      temperature,
      maxTokens,
      results: comparisonMode
        ? [
            { model: leftColumn.model, response: leftColumn.response, tokens: leftColumn.tokens },
            { model: rightColumn.model, response: rightColumn.response, tokens: rightColumn.tokens },
          ]
        : [{ model: leftColumn.model, response: leftColumn.response, tokens: leftColumn.tokens }],
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "playground-export.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getCostEstimate = (col: ComparisonColumn): string => {
    const modelConfig = MODELS.find((m) => m.value === col.model)
    if (!modelConfig) return "$0.000"
    const inputCost = (col.tokens.prompt / 1000) * modelConfig.inputCostPer1k
    const outputCost =
      (col.tokens.completion / 1000) * modelConfig.outputCostPer1k
    return `$${(inputCost + outputCost).toFixed(4)}`
  }

  const isRunning = leftColumn.isRunning || rightColumn.isRunning

  const renderResponseColumn = (
    column: ComparisonColumn,
    setColumn: React.Dispatch<React.SetStateAction<ComparisonColumn>>,
    showModelSelector: boolean
  ) => (
    <div className="flex flex-1 flex-col gap-2">
      {showModelSelector && (
        <Select
          value={column.model}
          onValueChange={(v) => setColumn((prev) => ({ ...prev, model: v }))}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-[10px] font-mono">
          In: {column.tokens.prompt}
        </Badge>
        <Badge variant="outline" className="text-[10px] font-mono">
          Out: {column.tokens.completion}
        </Badge>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <DollarSign className="h-3 w-3" />
          <span className="font-mono">{getCostEstimate(column)}</span>
        </div>
      </div>

      <div className="min-h-[140px] flex-1 rounded-md border bg-muted/50 p-3 text-sm">
        {column.response ? (
          <div className={`whitespace-pre-wrap ${jsonMode ? "font-mono text-xs" : ""}`}>
            {column.response}
            {column.isRunning && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-foreground" />
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Response will appear here...
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div className="mx-auto flex h-[750px] w-full max-w-4xl flex-col rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold">Playground</h2>
          <Separator orientation="vertical" className="h-5" />
          <Select value={preset} onValueChange={handlePresetChange}>
            <SelectTrigger className="h-8 w-[160px] text-xs">
              <BookmarkPlus className="mr-1.5 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRESETS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border px-2.5 py-1.5">
            <Braces className="h-3.5 w-3.5 text-muted-foreground" />
            <Label className="text-xs cursor-pointer" htmlFor="json-mode">
              JSON
            </Label>
            <Switch
              id="json-mode"
              size="sm"
              checked={jsonMode}
              onCheckedChange={setJsonMode}
              disabled={isRunning}
            />
          </div>
          <div className="flex items-center gap-2 rounded-md border px-2.5 py-1.5">
            <Columns2 className="h-3.5 w-3.5 text-muted-foreground" />
            <Label className="text-xs cursor-pointer" htmlFor="compare-mode">
              Compare
            </Label>
            <Switch
              id="compare-mode"
              size="sm"
              checked={comparisonMode}
              onCheckedChange={setComparisonMode}
              disabled={isRunning}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={!leftColumn.response}
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={isRunning}
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt-fr">System Prompt</Label>
            <Textarea
              id="system-prompt-fr"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system instructions..."
              className="min-h-[70px] resize-none text-sm"
              disabled={isRunning}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="user-message-fr">User Message</Label>
            <Textarea
              id="user-message-fr"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Enter your message..."
              className="min-h-[70px] resize-none text-sm"
              disabled={isRunning}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!userMessage.trim() || isRunning}
            className="w-full"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running{comparisonMode ? " comparison..." : "..."}
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {comparisonMode ? "Run Comparison" : "Run"}
              </>
            )}
          </Button>

          {/* Response Area */}
          <div className="space-y-2">
            <Label>
              {comparisonMode ? "Model Comparison" : "Response"}
            </Label>
            <div
              className={`flex gap-4 ${comparisonMode ? "" : "flex-col"}`}
            >
              {renderResponseColumn(leftColumn, setLeftColumn, true)}
              {comparisonMode &&
                renderResponseColumn(rightColumn, setRightColumn, true)}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Parameters */}
        <div className="flex w-52 shrink-0 flex-col border-l">
          <div className="border-b px-3 py-3">
            <span className="text-sm font-medium">Parameters</span>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Temperature</Label>
                <span className="text-xs font-mono text-muted-foreground">
                  {temperature.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={temperature}
                onChange={(e) =>
                  setTemperature(parseFloat(e.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                disabled={isRunning}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Max Tokens</Label>
                <span className="text-xs font-mono text-muted-foreground">
                  {maxTokens}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={4096}
                step={1}
                value={maxTokens}
                onChange={(e) =>
                  setMaxTokens(parseInt(e.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                disabled={isRunning}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>1</span>
                <span>4096</span>
              </div>
            </div>

            <Separator />

            {/* Cost Summary */}
            <div className="space-y-2">
              <Label className="text-xs">Cost Estimate</Label>
              <div className="rounded-md border bg-muted/50 p-2 text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {MODELS.find((m) => m.value === leftColumn.model)
                        ?.label || "Model A"}
                    </span>
                    <span className="font-mono font-medium">
                      {getCostEstimate(leftColumn)}
                    </span>
                  </div>
                  {comparisonMode && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {MODELS.find((m) => m.value === rightColumn.model)
                          ?.label || "Model B"}
                      </span>
                      <span className="font-mono font-medium">
                        {getCostEstimate(rightColumn)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="font-mono">
                      $
                      {(
                        parseFloat(
                          getCostEstimate(leftColumn).replace("$", "")
                        ) +
                        (comparisonMode
                          ? parseFloat(
                              getCostEstimate(rightColumn).replace("$", "")
                            )
                          : 0)
                      ).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Model Info */}
            <div className="space-y-2">
              <Label className="text-xs">Token Summary</Label>
              <div className="rounded-md border bg-muted/50 p-2 text-xs text-muted-foreground">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total Input</span>
                    <span className="font-mono font-medium text-foreground">
                      {leftColumn.tokens.prompt +
                        (comparisonMode ? rightColumn.tokens.prompt : 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Output</span>
                    <span className="font-mono font-medium text-foreground">
                      {leftColumn.tokens.completion +
                        (comparisonMode
                          ? rightColumn.tokens.completion
                          : 0)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Grand Total</span>
                    <span className="font-mono text-foreground">
                      {leftColumn.tokens.prompt +
                        leftColumn.tokens.completion +
                        (comparisonMode
                          ? rightColumn.tokens.prompt +
                            rightColumn.tokens.completion
                          : 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
