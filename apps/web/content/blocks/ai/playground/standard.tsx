"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
  Trash2,
  MessageSquare,
} from "lucide-react"

interface ConversationEntry {
  id: string
  role: "user" | "assistant"
  content: string
}

const MODELS = [
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { value: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { value: "gemini-pro", label: "Gemini Pro", provider: "Google" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
  { value: "claude-3-haiku", label: "Claude 3 Haiku", provider: "Anthropic" },
]

const SAMPLE_RESPONSES: Record<string, string> = {
  "gpt-4o": `Here's the response from GPT-4o. This model excels at complex reasoning, code generation, and nuanced understanding. It processes both text and images with state-of-the-art performance.

Key capabilities:
- Advanced reasoning and analysis
- Code generation and debugging
- Creative writing and brainstorming
- Multi-modal understanding`,
  "claude-3.5-sonnet": `Here's the response from Claude 3.5 Sonnet. This model is designed for thoughtful, nuanced responses with strong analytical capabilities and careful reasoning.

Key capabilities:
- Careful analysis and reasoning
- Long-context understanding
- Code generation with explanations
- Structured output formatting`,
  "gemini-pro": `Here's the response from Gemini Pro. This model combines strong language understanding with multi-modal capabilities across text, code, and images.

Key capabilities:
- Multi-modal reasoning
- Strong coding abilities
- Factual knowledge retrieval
- Efficient token usage`,
}

function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.3)
}

export function AIPlayground() {
  const [model, setModel] = useState("gpt-4o")
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant. Respond concisely and accurately."
  )
  const [userMessage, setUserMessage] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1024)
  const [topP, setTopP] = useState(0.9)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentResponse, setCurrentResponse] = useState("")

  const promptTokens = estimateTokens(systemPrompt + " " + userMessage)
  const completionTokens = estimateTokens(currentResponse)
  const totalTokens = promptTokens + completionTokens

  const handleSubmit = useCallback(() => {
    if (!userMessage.trim() || isRunning) return
    setIsRunning(true)

    const userEntry: ConversationEntry = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    }

    setConversation((prev) => [...prev, userEntry])

    const fullResponse =
      SAMPLE_RESPONSES[model] ||
      SAMPLE_RESPONSES["gpt-4o"]!

    setCurrentResponse("")
    let i = 0
    const interval = setInterval(() => {
      i += 3
      if (i >= fullResponse.length) {
        setCurrentResponse(fullResponse)
        const assistantEntry: ConversationEntry = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fullResponse,
        }
        setConversation((prev) => [...prev, assistantEntry])
        setIsRunning(false)
        setUserMessage("")
        clearInterval(interval)
      } else {
        setCurrentResponse(fullResponse.slice(0, i))
      }
    }, 15)
  }, [userMessage, isRunning, model])

  const handleClear = () => {
    setConversation([])
    setUserMessage("")
    setCurrentResponse("")
  }

  return (
    <div className="mx-auto flex h-[700px] w-full max-w-5xl rounded-lg border">
      {/* Left Panel - Conversation History */}
      <div className="flex w-64 shrink-0 flex-col border-r">
        <div className="flex items-center justify-between border-b px-3 py-3">
          <span className="text-sm font-medium">History</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleClear}
            disabled={isRunning}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {conversation.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-xs text-muted-foreground">
                No messages yet
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {conversation.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-md border px-2.5 py-2"
                >
                  <div className="mb-1 flex items-center gap-1.5">
                    <Badge
                      variant={
                        entry.role === "user" ? "default" : "secondary"
                      }
                      className="text-[10px] px-1.5 py-0"
                    >
                      {entry.role === "user" ? "User" : "AI"}
                    </Badge>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Panel - Main Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="font-semibold">Playground</h2>
          <div className="flex items-center gap-3">
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="h-8 w-[180px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    <span>{m.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt-std">System Prompt</Label>
            <Textarea
              id="system-prompt-std"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system instructions..."
              className="min-h-[80px] resize-none text-sm"
              disabled={isRunning}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="user-message-std">User Message</Label>
            <Textarea
              id="user-message-std"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Enter your message..."
              className="min-h-[80px] resize-none text-sm"
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
                Running...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run
              </>
            )}
          </Button>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Response</Label>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono">
                  Prompt: {promptTokens}
                </Badge>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Completion: {completionTokens}
                </Badge>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  Total: {totalTokens}
                </Badge>
              </div>
            </div>
            <div className="min-h-[120px] rounded-md border bg-muted/50 p-3 text-sm">
              {currentResponse || conversation.length > 0 ? (
                <div className="whitespace-pre-wrap">
                  {isRunning
                    ? currentResponse
                    : conversation.filter((e) => e.role === "assistant").pop()
                        ?.content || ""}
                  {isRunning && (
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
        </div>
      </div>

      {/* Right Panel - Parameters */}
      <div className="flex w-56 shrink-0 flex-col border-l">
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
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
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
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              disabled={isRunning}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1</span>
              <span>4096</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Top P</Label>
              <span className="text-xs font-mono text-muted-foreground">
                {topP.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              disabled={isRunning}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0</span>
              <span>1</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-xs">Model Info</Label>
            <div className="rounded-md border bg-muted/50 p-2 text-xs text-muted-foreground">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Provider</span>
                  <span className="font-medium text-foreground">
                    {MODELS.find((m) => m.value === model)?.provider}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max Context</span>
                  <span className="font-medium text-foreground">128K</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="font-medium text-foreground">Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
