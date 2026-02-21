"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const messages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Show me how to create a custom React hook for fetching data.",
    timestamp: "3:22 PM",
  },
  {
    id: "2",
    role: "assistant",
    content: `Here's a reusable data-fetching hook with **loading**, **error**, and **data** states:

## useFetch Hook

\`\`\`typescript
import { useState, useEffect } from "react"

interface UseFetchResult<T> {
  data: T | null
  error: string | null
  isLoading: boolean
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        setIsLoading(true)
        const res = await fetch(url, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error("Request failed")
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [url])

  return { data, error, isLoading }
}
\`\`\`

### Usage

\`\`\`tsx
function UserList() {
  const { data, error, isLoading } = useFetch<User[]>("/api/users")

  if (isLoading) return <Spinner />
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

Key features:
- **AbortController** for cleanup on unmount
- **Generic type parameter** for type-safe responses
- Automatic refetch when the \`url\` changes`,
    timestamp: "3:22 PM",
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
  const regex = /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g
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
    } else if (m.startsWith("[")) {
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

export function MessageCard() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Record<string, "up" | "down" | null>>({})

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleFeedback = (msgId: string, type: "up" | "down") => {
    setFeedback((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }))
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
      {messages.map((msg) => (
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
              className={`max-w-[85%] space-y-1 ${msg.role === "user" ? "items-end" : ""}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="space-y-0">{renderMarkdown(msg.content)}</div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                )}
              </div>

              <div
                className={`flex items-center gap-1 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >
                <span className="mr-2 text-xs text-muted-foreground">
                  {msg.timestamp}
                </span>
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
                      className={`h-7 w-7 ${
                        feedback[msg.id] === "up" ? "text-emerald-500" : ""
                      }`}
                      onClick={() => handleFeedback(msg.id, "up")}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${
                        feedback[msg.id] === "down" ? "text-red-500" : ""
                      }`}
                      onClick={() => handleFeedback(msg.id, "down")}
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
