"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Send,
  X,
  Sparkles,
  Command,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function CopilotSidebarMinimal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI copilot. I can help you navigate, answer questions, or take actions in your app. What would you like to do?",
    },
    {
      id: "2",
      role: "user",
      content: "Can you summarize the recent activity on my dashboard?",
    },
    {
      id: "3",
      role: "assistant",
      content:
        "Based on your dashboard data, here's a quick summary:\n\n- 3 new sign-ups in the last hour\n- Revenue is up 12% compared to yesterday\n- 2 support tickets are awaiting response\n\nWould you like me to go into detail on any of these?",
    },
  ])
  const [input, setInput] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I've processed your request. In production, this would be connected to your AI backend and could take actions within your application.",
      },
    ])
    setInput("")
  }

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg border">
      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-6 py-3">
          <h2 className="font-semibold">Dashboard</h2>
          {!sidebarOpen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Copilot
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    Revenue
                  </div>
                  <p className="mt-1 text-2xl font-bold">$12,480</p>
                  <p className="text-xs text-emerald-600">+12% today</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Documents
                  </div>
                  <p className="mt-1 text-2xl font-bold">284</p>
                  <p className="text-xs text-muted-foreground">8 new</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Settings className="h-4 w-4" />
                    Active Users
                  </div>
                  <p className="mt-1 text-2xl font-bold">1,429</p>
                  <p className="text-xs text-emerald-600">+3.2%</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
              <div className="space-y-2">
                {[
                  "New user signed up: alex@example.com",
                  "Invoice #1084 was paid ($299)",
                  "Support ticket #342 resolved",
                  "Deployment v2.4.1 completed",
                  "New user signed up: morgan@example.com",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-md border px-3 py-2 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copilot sidebar panel */}
      {sidebarOpen && (
        <div className="flex w-[340px] shrink-0 flex-col border-l bg-background">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold">AI Copilot</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarFallback className="text-[10px]">
                      {msg.role === "user" ? "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-3">
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
                placeholder="Ask anything..."
                className="h-8 flex-1 text-xs"
              />
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8"
                disabled={!input.trim()}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>K to toggle copilot</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
