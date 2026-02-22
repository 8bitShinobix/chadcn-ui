"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Wrench,
  Pencil,
  ExternalLink,
  X,
} from "lucide-react"

interface Citation {
  id: number
  title: string
  url: string
}

interface ToolCall {
  name: string
  input: string
  output: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  reasoning?: {
    steps: string[]
  }
  citations?: Citation[]
  toolCalls?: ToolCall[]
  branchCount?: number
  activeBranch?: number
}

const messages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What are the performance differences between Vite and Webpack for a large-scale React app?",
    timestamp: "4:07 PM",
  },
  {
    id: "2",
    role: "assistant",
    content: `Based on recent benchmarks and documentation, here's a detailed comparison:

## Build Performance

Vite uses **native ES modules** during development, which means it doesn't need to bundle your entire application before serving [1]. This gives it a significant advantage in dev server startup time.

Webpack, on the other hand, bundles everything upfront. For a large project with 1,000+ modules, this can mean **30-60 second** cold starts compared to Vite's near-instant startup [2].

## Hot Module Replacement

Vite's HMR is consistently fast regardless of app size because it only processes the changed module and its direct importers. Webpack's HMR speed can degrade as the dependency graph grows [1].

## Production Builds

For production, the gap narrows significantly. Vite uses Rollup under the hood, while Webpack 5 has tree-shaking and code splitting built in. Both produce well-optimized bundles [3].

\`\`\`typescript
// vite.config.ts — optimized production build
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-popover"],
        },
      },
    },
  },
})
\`\`\`

## Key Takeaways

- **Development speed**: Vite is 10-20x faster for dev server startup
- **HMR**: Vite maintains constant speed; Webpack degrades with scale
- **Production**: Both produce comparable output with proper configuration
- **Ecosystem**: Webpack has broader plugin ecosystem; Vite is growing rapidly`,
    timestamp: "4:08 PM",
    reasoning: {
      steps: [
        "Analyzing the user's question about build tool performance comparison",
        "Retrieving benchmark data from recent build tool comparisons",
        "Structuring response around key performance dimensions: build time, HMR, and production output",
        "Adding a practical code example for Vite configuration",
      ],
    },
    citations: [
      { id: 1, title: "Vite Documentation — Why Vite", url: "https://vitejs.dev/guide/why.html" },
      { id: 2, title: "Build Tool Benchmark 2024", url: "https://blog.example.com/build-benchmarks" },
      { id: 3, title: "Webpack 5 Performance Guide", url: "https://webpack.js.org/guides/build-performance" },
    ],
    toolCalls: [
      {
        name: "search_docs",
        input: '{"query": "vite vs webpack performance benchmarks 2024"}',
        output: "Found 12 relevant results from documentation and benchmark reports",
      },
    ],
    branchCount: 3,
    activeBranch: 0,
  },
]

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n")
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLang = ""
  let blockKey = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock key={`code-${blockKey++}`} language={codeLang} code={codeLines.join("\n")} />
        )
        codeLines = []
        codeLang = ""
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLang = line.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={`h-${blockKey++}`} className="mt-4 mb-2 text-sm font-semibold">
          {line.slice(3)}
        </h3>
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h4 key={`h-${blockKey++}`} className="mt-3 mb-1.5 text-sm font-medium">
          {line.slice(4)}
        </h4>
      )
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={`li-${blockKey++}`} className="ml-4 list-disc text-sm leading-relaxed">
          {renderInline(line.slice(2))}
        </li>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={`br-${blockKey++}`} className="h-2" />)
    } else {
      elements.push(
        <p key={`p-${blockKey++}`} className="text-sm leading-relaxed">
          {renderInline(line)}
        </p>
      )
    }
  }

  return elements
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\[\d+\])/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const m = match[0]
    if (m.startsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold">
          {m.slice(2, -2)}
        </strong>
      )
    } else if (m.startsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
        >
          {m.slice(1, -1)}
        </code>
      )
    } else if (m.startsWith("[") && m.includes("](")) {
      const linkMatch = m.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            className="text-primary underline underline-offset-2"
          >
            {linkMatch[1]}
          </a>
        )
      }
    } else if (/^\[\d+\]$/.test(m)) {
      const num = m.slice(1, -1)
      parts.push(
        <sup
          key={match.index}
          className="ml-0.5 cursor-pointer rounded bg-primary/10 px-1 py-0.5 font-mono text-[10px] font-bold text-primary hover:bg-primary/20"
        >
          {num}
        </sup>
      )
    }

    lastIndex = match.index + m.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 overflow-hidden rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-400">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-zinc-200"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-xs leading-relaxed text-zinc-200">
          {code}
        </code>
      </pre>
    </div>
  )
}

function ReasoningBlock({ steps }: { steps: string[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50">
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        )}
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-500" />
        <span className="font-medium">Thinking</span>
        {!isOpen && (
          <span className="truncate text-muted-foreground/70">
            — {steps.length} steps
          </span>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-1.5 space-y-2 rounded-lg border border-dashed bg-muted/30 px-3 py-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-[10px] font-bold text-amber-600">
                {i + 1}
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {step}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ToolCallCard({ toolCall }: { toolCall: ToolCall }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg border bg-background px-3 py-2 text-left text-xs transition-colors hover:bg-muted/50">
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
        <Wrench className="h-3.5 w-3.5 shrink-0 text-blue-500" />
        <span className="font-medium text-foreground">{toolCall.name}</span>
        <Badge variant="secondary" className="ml-auto text-[10px]">
          completed
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-1.5 space-y-2 rounded-lg border bg-muted/30 px-3 py-3">
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Input
            </p>
            <pre className="rounded bg-zinc-950 p-2 font-mono text-xs text-zinc-300 dark:bg-zinc-900">
              {toolCall.input}
            </pre>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Output
            </p>
            <p className="text-xs text-muted-foreground">{toolCall.output}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function MessageCardFeatureRich() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [feedbackState, setFeedbackState] = useState<Record<string, "up" | "down" | null>>({})
  const [branchState, setBranchState] = useState<Record<string, number>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleFeedback = (msgId: string, type: "up" | "down") => {
    setFeedbackState((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }))
  }

  const handleBranchSwitch = (msgId: string, direction: "prev" | "next", total: number) => {
    setBranchState((prev) => {
      const current = prev[msgId] ?? 0
      const next =
        direction === "next"
          ? Math.min(current + 1, total - 1)
          : Math.max(current - 1, 0)
      return { ...prev, [msgId]: next }
    })
  }

  const startEdit = (msg: Message) => {
    setEditingId(msg.id)
    setEditValue(msg.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
      {messages.map((msg) => {
        const currentBranch = branchState[msg.id] ?? msg.activeBranch ?? 0
        const fb = feedbackState[msg.id] ?? null

        return (
          <div key={msg.id} className="group">
            <div
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback
                  className={`text-xs ${
                    msg.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "items-end" : ""}`}
              >
                {/* Reasoning block */}
                {msg.role === "assistant" && msg.reasoning && (
                  <ReasoningBlock steps={msg.reasoning.steps} />
                )}

                {/* Tool calls */}
                {msg.role === "assistant" && msg.toolCalls && (
                  <div className="space-y-1.5">
                    {msg.toolCalls.map((tc, i) => (
                      <ToolCallCard key={i} toolCall={tc} />
                    ))}
                  </div>
                )}

                {/* Message content or edit mode */}
                {editingId === msg.id ? (
                  <div className="space-y-2">
                    <textarea
                      className="w-full rounded-lg border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      rows={3}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" onClick={cancelEdit}>
                        Save & Resubmit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>
                        <X className="mr-1 h-3 w-3" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-0">
                        {renderMarkdown(msg.content)}
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                )}

                {/* Citations */}
                {msg.role === "assistant" && msg.citations && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Sources
                    </p>
                    <div className="space-y-1">
                      {msg.citations.map((cite) => (
                        <div
                          key={cite.id}
                          className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-xs"
                        >
                          <span className="font-mono text-[10px] font-bold text-primary">
                            [{cite.id}]
                          </span>
                          <span className="flex-1 truncate text-muted-foreground">
                            {cite.title}
                          </span>
                          <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions bar */}
                <div
                  className={`flex items-center gap-1 ${
                    msg.role === "user" ? "justify-end" : ""
                  }`}
                >
                  <span className="mr-2 text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>

                  {/* User edit button */}
                  {msg.role === "user" && editingId !== msg.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => startEdit(msg)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  {/* Assistant actions */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleCopy(msg.id, msg.content)}
                      >
                        {copiedId === msg.id ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 ${fb === "up" ? "text-emerald-500" : ""}`}
                        onClick={() => handleFeedback(msg.id, "up")}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 ${fb === "down" ? "text-red-500" : ""}`}
                        onClick={() => handleFeedback(msg.id, "down")}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </Button>

                      {/* Branch navigation */}
                      {msg.branchCount && msg.branchCount > 1 && (
                        <div className="ml-1 flex items-center gap-0.5 rounded-md border px-1 py-0.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            disabled={currentBranch === 0}
                            onClick={() =>
                              handleBranchSwitch(msg.id, "prev", msg.branchCount!)
                            }
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </Button>
                          <span className="min-w-[2rem] text-center text-xs text-muted-foreground">
                            {currentBranch + 1}/{msg.branchCount}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            disabled={currentBranch === msg.branchCount - 1}
                            onClick={() =>
                              handleBranchSwitch(msg.id, "next", msg.branchCount!)
                            }
                          >
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
