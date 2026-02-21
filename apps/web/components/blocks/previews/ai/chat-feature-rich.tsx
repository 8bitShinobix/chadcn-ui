"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Send, RotateCcw, Copy, Check, Loader2, ThumbsUp, ThumbsDown,
  ChevronDown, ChevronRight, Share, Sparkles, ChevronLeft,
} from "lucide-react"

interface Citation { id: number; title: string; url: string }
interface Message {
  id: string; role: "user" | "assistant"; content: string; timestamp: Date
  isStreaming?: boolean; reasoning?: string; citations?: Citation[]
  branches?: string[]; activeBranch?: number; feedback?: "up" | "down" | null
}

const SAMPLE_CITATIONS: Citation[] = [
  { id: 1, title: "React Documentation", url: "https://react.dev" },
  { id: 2, title: "Next.js App Router", url: "https://nextjs.org/docs" },
  { id: 3, title: "TypeScript Handbook", url: "https://typescriptlang.org/docs" },
]

export default function ChatFeatureRich() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1", role: "assistant",
      content: "Hello! I'm your AI assistant with advanced features. I can show my reasoning process, cite sources, and provide alternative responses. Try asking me something!",
      timestamp: new Date(),
      reasoning: "The user just started a conversation. I should introduce myself and highlight the advanced features available: reasoning blocks, citations, and message branching.",
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedReasoning, setExpandedReasoning] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const simulateStreaming = useCallback((msgId: string, fullText: string) => {
    let i = 0
    const interval = setInterval(() => {
      i += 3
      if (i >= fullText.length) {
        setMessages((prev) => prev.map((m) => m.id === msgId ? { ...m, content: fullText, isStreaming: false } : m))
        setIsGenerating(false)
        clearInterval(interval)
      } else {
        setMessages((prev) => prev.map((m) => m.id === msgId ? { ...m, content: fullText.slice(0, i) } : m))
      }
    }, 20)
  }, [])

  const handleSend = () => {
    if (!input.trim() || isGenerating) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() }
    const assistantId = (Date.now() + 1).toString()
    const assistantMsg: Message = {
      id: assistantId, role: "assistant", content: "", timestamp: new Date(), isStreaming: true,
      reasoning: "Let me analyze the user's question. I need to provide a comprehensive answer with relevant citations.",
      citations: SAMPLE_CITATIONS, branches: ["Primary response...", "Alternative perspective..."], activeBranch: 0, feedback: null,
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput("")
    setIsGenerating(true)
    const sampleResponse = `Great question! Let me provide a detailed answer with sources.\n\nAccording to the official documentation [1], React's component model enables building reusable UI. The App Router in Next.js [2] builds on this with server components.\n\n\`\`\`typescript\nexport default async function Page() {\n  const data = await fetchData()\n  return <Component data={data} />\n}\n\`\`\`\n\nFor type safety, TypeScript [3] adds static types that catch errors at compile time.\n\n**Key takeaways:**\n- Server components reduce client-side JavaScript\n- Type safety prevents common runtime errors\n- The component model promotes reusability`
    setTimeout(() => simulateStreaming(assistantId, sampleResponse), 500)
  }

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleFeedback = (msgId: string, type: "up" | "down") => {
    setMessages((prev) => prev.map((m) => m.id === msgId ? { ...m, feedback: m.feedback === type ? null : type } : m))
  }

  const handleBranchSwitch = (msgId: string, direction: "prev" | "next") => {
    setMessages((prev) => prev.map((m) => {
      if (m.id !== msgId || !m.branches) return m
      const current = m.activeBranch ?? 0
      const next = direction === "next" ? Math.min(current + 1, m.branches.length - 1) : Math.max(current - 1, 0)
      return { ...m, activeBranch: next }
    }))
  }

  const toggleReasoning = (msgId: string) => {
    setExpandedReasoning((prev) => { const next = new Set(prev); next.has(msgId) ? next.delete(msgId) : next.add(msgId); return next })
  }

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="mx-auto flex h-[700px] w-full max-w-2xl flex-col rounded-lg border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <div>
            <h2 className="font-semibold">AI Chat</h2>
            <p className="text-xs text-muted-foreground">with reasoning, citations & branching</p>
          </div>
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
                  <AvatarFallback className="text-xs">{msg.role === "user" ? "U" : "AI"}</AvatarFallback>
                </Avatar>
                <div className="max-w-[85%] space-y-2">
                  {msg.role === "assistant" && msg.reasoning && (
                    <button onClick={() => toggleReasoning(msg.id)} className="flex w-full items-center gap-1.5 rounded-md border border-dashed px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50">
                      {expandedReasoning.has(msg.id) ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />}
                      <Sparkles className="h-3 w-3 shrink-0 text-amber-500" />
                      <span className="font-medium">Reasoning</span>
                      {!expandedReasoning.has(msg.id) && <span className="truncate">— {msg.reasoning}</span>}
                    </button>
                  )}
                  {msg.role === "assistant" && msg.reasoning && expandedReasoning.has(msg.id) && (
                    <div className="rounded-md border border-dashed bg-muted/30 px-3 py-2 text-xs text-muted-foreground">{msg.reasoning}</div>
                  )}
                  <div className={`rounded-lg px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.isStreaming && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current" />}
                  </div>
                  {msg.role === "assistant" && msg.citations && !msg.isStreaming && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Sources</p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((cite) => (
                          <span key={cite.id} className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                            <span className="font-mono text-[10px] font-bold text-foreground">[{cite.id}]</span>{cite.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="mr-2 text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                    {msg.role === "assistant" && !msg.isStreaming && (
                      <>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(msg.id, msg.content)}>
                          {copiedId === msg.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                        <Button variant="ghost" size="icon" className={`h-6 w-6 ${msg.feedback === "up" ? "text-emerald-500" : ""}`} onClick={() => handleFeedback(msg.id, "up")}>
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className={`h-6 w-6 ${msg.feedback === "down" ? "text-red-500" : ""}`} onClick={() => handleFeedback(msg.id, "down")}>
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Share className="h-3 w-3" /></Button>
                        {msg.branches && msg.branches.length > 1 && (
                          <div className="ml-2 flex items-center gap-1 rounded border px-1">
                            <Button variant="ghost" size="icon" className="h-5 w-5" disabled={(msg.activeBranch ?? 0) === 0} onClick={() => handleBranchSwitch(msg.id, "prev")}>
                              <ChevronLeft className="h-3 w-3" />
                            </Button>
                            <span className="text-xs text-muted-foreground">{(msg.activeBranch ?? 0) + 1}/{msg.branches.length}</span>
                            <Button variant="ghost" size="icon" className="h-5 w-5" disabled={(msg.activeBranch ?? 0) === msg.branches.length - 1} onClick={() => handleBranchSwitch(msg.id, "next")}>
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isGenerating && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" />Generating response...</div>}
        </div>
      </div>
      <Separator />
      <div className="p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1" disabled={isGenerating} />
          <Button type="submit" size="icon" disabled={!input.trim() || isGenerating}><Send className="h-4 w-4" /></Button>
          <Button type="button" size="icon" variant="outline" disabled={isGenerating || messages.length < 2} onClick={() => {
            const last = [...messages].reverse().find((m) => m.role === "assistant")
            if (!last) return
            const newId = Date.now().toString()
            setMessages((prev) => prev.map((m) => m.id === last.id ? { ...m, id: newId, content: "", isStreaming: true } : m))
            setIsGenerating(true)
            simulateStreaming(newId, "Here's an alternative response via branch navigation.")
          }}><RotateCcw className="h-4 w-4" /></Button>
        </form>
      </div>
    </div>
  )
}
