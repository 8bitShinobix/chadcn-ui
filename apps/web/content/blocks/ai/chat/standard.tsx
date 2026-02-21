"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Send, RotateCcw, Copy, Check, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. Ask me anything and I'll do my best to help.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const simulateStreaming = useCallback((msgId: string, fullText: string) => {
    let i = 0
    const interval = setInterval(() => {
      i += 3
      if (i >= fullText.length) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, content: fullText, isStreaming: false } : m
          )
        )
        setIsGenerating(false)
        clearInterval(interval)
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, content: fullText.slice(0, i) } : m
          )
        )
      }
    }, 20)
  }, [])

  const handleSend = () => {
    if (!input.trim() || isGenerating) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    const assistantId = (Date.now() + 1).toString()
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput("")
    setIsGenerating(true)

    const sampleResponse = `Here's a helpful response to your question. This demonstrates **streaming text** that appears character by character.

You can include:
- Bullet points for organization
- **Bold text** for emphasis
- Code references like \`console.log()\`

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

This is what a real AI response looks like in production.`

    setTimeout(() => simulateStreaming(assistantId, sampleResponse), 300)
  }

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleRegenerate = () => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant")
    if (!lastAssistant || isGenerating) return

    const newId = Date.now().toString()
    setMessages((prev) =>
      prev.map((m) =>
        m.id === lastAssistant.id
          ? { ...m, id: newId, content: "", isStreaming: true }
          : m
      )
    )
    setIsGenerating(true)
    simulateStreaming(newId, "Here's a regenerated response with different content. Each regeneration can provide a fresh perspective on your question.")
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="mx-auto flex h-[600px] w-full max-w-2xl flex-col rounded-lg border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="font-semibold">AI Chat</h2>
          <p className="text-xs text-muted-foreground">Powered by AI</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="group">
              <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs">
                    {msg.role === "user" ? "U" : "AI"}
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[80%] space-y-1">
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.isStreaming && (
                      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.role === "assistant" && !msg.isStreaming && (
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopy(msg.id, msg.content)}
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Generating response...
            </div>
          )}
        </div>
      </div>

      <Separator />
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isGenerating}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isGenerating}>
            <Send className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={isGenerating || messages.length < 2}
            onClick={handleRegenerate}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
