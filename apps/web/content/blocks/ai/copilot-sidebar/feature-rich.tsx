"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  X,
  Sparkles,
  Command,
  FileText,
  BarChart3,
  Settings,
  Pin,
  PinOff,
  Search,
  Loader2,
  CheckCircle2,
  FileCode,
  Clock,
  MessageSquare,
  Zap,
  History,
  AlertCircle,
  ChevronRight,
} from "lucide-react"

interface ToolCall {
  id: string
  name: string
  status: "running" | "completed" | "error"
  description: string
}

interface FileRef {
  name: string
  path: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  toolCalls?: ToolCall[]
  fileRefs?: FileRef[]
}

interface HistoryEntry {
  id: string
  title: string
  timestamp: string
  preview: string
}

const historyEntries: HistoryEntry[] = [
  {
    id: "h1",
    title: "Dashboard metrics analysis",
    timestamp: "2 hours ago",
    preview: "Analyzed revenue trends and user engagement...",
  },
  {
    id: "h2",
    title: "Debug API timeout issue",
    timestamp: "Yesterday",
    preview: "Found root cause in the database connection pool...",
  },
  {
    id: "h3",
    title: "Generate quarterly report",
    timestamp: "2 days ago",
    preview: "Created comprehensive Q4 report with charts...",
  },
  {
    id: "h4",
    title: "Refactor auth middleware",
    timestamp: "3 days ago",
    preview: "Improved token validation and error handling...",
  },
]

const recentActions = [
  {
    id: "a1",
    action: "Updated dashboard layout",
    time: "10 min ago",
    status: "completed" as const,
  },
  {
    id: "a2",
    action: "Ran test suite (47 passed)",
    time: "25 min ago",
    status: "completed" as const,
  },
  {
    id: "a3",
    action: "Deployed to staging",
    time: "1 hour ago",
    status: "completed" as const,
  },
  {
    id: "a4",
    action: "Database migration pending",
    time: "2 hours ago",
    status: "error" as const,
  },
]

export function CopilotSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "I've analyzed the current page context. Here's what I found relevant to your workflow:",
      toolCalls: [
        {
          id: "tc1",
          name: "Searching codebase",
          status: "completed",
          description: "Found 12 related files in /src/dashboard",
        },
        {
          id: "tc2",
          name: "Reading page context",
          status: "completed",
          description: "Extracted dashboard metrics and activity data",
        },
      ],
    },
    {
      id: "2",
      role: "user",
      content:
        "Can you check the recent deployment status and see if there are any issues?",
      fileRefs: [
        { name: "deploy.config.ts", path: "/config/deploy.config.ts" },
      ],
    },
    {
      id: "3",
      role: "assistant",
      content:
        "I've checked the deployment pipeline. The latest deployment to staging (v2.4.1) completed successfully, but I noticed a database migration that failed. Here's a summary:",
      toolCalls: [
        {
          id: "tc3",
          name: "Checking CI/CD pipeline",
          status: "completed",
          description: "Queried last 5 deployments from pipeline API",
        },
        {
          id: "tc4",
          name: "Reading error logs",
          status: "completed",
          description: "Found migration timeout in logs",
        },
      ],
      fileRefs: [
        { name: "migration-024.sql", path: "/db/migrations/024.sql" },
        { name: "pipeline.log", path: "/logs/pipeline.log" },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isPinned, setIsPinned] = useState(true)
  const [activeTab, setActiveTab] = useState("chat")
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
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "I've processed your request and taken the necessary actions. The results are shown above in the tool call cards.",
      toolCalls: [
        {
          id: "tc-new",
          name: "Processing request",
          status: "completed",
          description: "Analyzed input and generated response",
        },
      ],
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput("")
  }

  const renderToolCall = (tc: ToolCall) => (
    <div
      key={tc.id}
      className="flex items-start gap-2 rounded-md border bg-muted/30 px-2.5 py-2"
    >
      {tc.status === "running" ? (
        <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-amber-500" />
      ) : tc.status === "completed" ? (
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
      ) : (
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium">{tc.name}</p>
        <p className="truncate text-[10px] text-muted-foreground">
          {tc.description}
        </p>
      </div>
    </div>
  )

  const renderFileRef = (ref: FileRef) => (
    <span
      key={ref.path}
      className="inline-flex items-center gap-1 rounded-md border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted"
    >
      <FileCode className="h-3 w-3 shrink-0" />
      {ref.name}
    </span>
  )

  return (
    <div className="flex h-[700px] w-full overflow-hidden rounded-lg border">
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
        <div className="flex w-[380px] shrink-0 flex-col border-l bg-background">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold">AI Copilot</h3>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsPinned(!isPinned)}
                title={isPinned ? "Unpin panel" : "Pin panel"}
              >
                {isPinned ? (
                  <PinOff className="h-3.5 w-3.5" />
                ) : (
                  <Pin className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <TabsList className="mx-3 mt-2 w-auto">
              <TabsTrigger value="chat" className="gap-1.5 text-xs">
                <MessageSquare className="h-3 w-3" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="actions" className="gap-1.5 text-xs">
                <Zap className="h-3 w-3" />
                Actions
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-1.5 text-xs">
                <History className="h-3 w-3" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Chat tab */}
            <TabsContent
              value="chat"
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      <div
                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="h-6 w-6 shrink-0">
                          <AvatarFallback className="text-[10px]">
                            {msg.role === "user" ? "U" : "AI"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-[85%] space-y-2">
                          {/* Tool calls */}
                          {msg.role === "assistant" &&
                            msg.toolCalls &&
                            msg.toolCalls.length > 0 && (
                              <div className="space-y-1.5">
                                {msg.toolCalls.map(renderToolCall)}
                              </div>
                            )}

                          {/* Message content */}
                          <div
                            className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">
                              {msg.content}
                            </div>
                          </div>

                          {/* File references */}
                          {msg.fileRefs && msg.fileRefs.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {msg.fileRefs.map(renderFileRef)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Input */}
              <div className="p-3">
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
            </TabsContent>

            {/* Actions tab */}
            <TabsContent
              value="actions"
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-3">
                  <p className="text-[11px] font-medium text-muted-foreground">
                    Recent Actions
                  </p>
                  {recentActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-start gap-2.5 rounded-md border p-2.5"
                    >
                      {action.status === "completed" ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{action.action}</p>
                        <div className="mt-0.5 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">
                            {action.time}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* History tab */}
            <TabsContent
              value="history"
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="border-b px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search history..."
                    className="h-7 pl-7 text-xs"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2">
                  {historyEntries.map((entry) => (
                    <button
                      key={entry.id}
                      className="w-full rounded-md border p-2.5 text-left transition-colors hover:bg-muted/50"
                    >
                      <p className="text-xs font-medium">{entry.title}</p>
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {entry.preview}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          {entry.timestamp}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
