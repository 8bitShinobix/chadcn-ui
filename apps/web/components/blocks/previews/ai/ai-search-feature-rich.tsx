"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Globe,
  GraduationCap,
  Code,
  Bookmark,
  BookmarkCheck,
  Check,
  ExternalLink,
  ArrowRight,
  Loader2,
  Send,
} from "lucide-react"

type FocusMode = "web" | "academic" | "code"

type SearchStep = "searching" | "reading" | "generating" | "done"

interface Source {
  id: number
  title: string
  url: string
  domain: string
  snippet: string
}

const DEMO_SOURCES: Source[] = [
  {
    id: 1,
    title: "Next.js 15 Release Notes",
    url: "https://nextjs.org/blog/next-15",
    domain: "nextjs.org",
    snippet: "Next.js 15 introduces Partial Prerendering, improved caching semantics, and React 19 support with Server Actions stabilized.",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    url: "https://react.dev/blog/server-components",
    domain: "react.dev",
    snippet: "Server Components let you write UI that can be rendered and cached on the server, reducing the client bundle size significantly.",
  },
  {
    id: 3,
    title: "Vercel Edge Runtime Documentation",
    url: "https://vercel.com/docs/functions/edge",
    domain: "vercel.com",
    snippet: "Edge Functions run at the edge of the network, providing low-latency responses by executing code closer to the user.",
  },
  {
    id: 4,
    title: "Turbopack: The Successor to Webpack",
    url: "https://turbo.build/pack/docs",
    domain: "turbo.build",
    snippet: "Turbopack is an incremental bundler built with Rust, offering up to 700x faster updates than Webpack in large applications.",
  },
  {
    id: 5,
    title: "App Router Migration Guide",
    url: "https://nextjs.org/docs/app/migration",
    domain: "nextjs.org",
    snippet: "Migrate from Pages Router to App Router with step-by-step guidance covering layouts, loading states, and data fetching patterns.",
  },
]

const DEMO_ANSWER = `Next.js has evolved significantly with its recent releases, introducing several groundbreaking features that reshape how modern web applications are built [1].

**React Server Components (RSC)** are now the default rendering model in the App Router. Components render on the server by default, sending only the minimal JavaScript needed for interactivity to the client [2]. This dramatically reduces bundle sizes and improves initial page load performance.

**Partial Prerendering (PPR)** combines the best of static and dynamic rendering in a single route. Static shells are served instantly from the edge, while dynamic content streams in progressively [1]. This means users see content immediately without waiting for data fetching.

**Key architectural improvements include:**

- **Turbopack** as the development bundler, offering dramatically faster hot module replacement compared to Webpack [4]
- **Edge Runtime** support for middleware and API routes, reducing latency by running code closer to users [3]
- **Server Actions** for simplified form handling and data mutations without separate API routes
- **Streaming SSR** with React Suspense boundaries for granular loading states

The migration path from Pages Router to App Router is incremental \u2014 both can coexist in the same project, allowing teams to adopt new patterns gradually [5].

For production applications, the combination of RSC, PPR, and Edge Functions creates an architecture that delivers near-instant page loads with full dynamic capabilities.`

const SEARCH_STEPS: { key: SearchStep; label: string }[] = [
  { key: "searching", label: "Searching the web..." },
  { key: "reading", label: "Reading sources..." },
  { key: "generating", label: "Generating answer..." },
]

export default function AISearchFeatureRich() {
  const [query, setQuery] = useState("")
  const [followUpQuery, setFollowUpQuery] = useState("")
  const [focusMode, setFocusMode] = useState<FocusMode>("web")
  const [currentStep, setCurrentStep] = useState<SearchStep | null>(null)
  const [displayedAnswer, setDisplayedAnswer] = useState("")
  const [hasResult, setHasResult] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [demoQuery] = useState("What are the latest features in Next.js and how do they improve performance?")

  const simulateStreaming = useCallback((fullText: string) => {
    let i = 0
    setIsStreaming(true)
    const interval = setInterval(() => {
      i += 5
      if (i >= fullText.length) {
        setDisplayedAnswer(fullText)
        setIsStreaming(false)
        clearInterval(interval)
      } else {
        setDisplayedAnswer(fullText.slice(0, i))
      }
    }, 12)
    return interval
  }, [])

  const runSearchSequence = useCallback(() => {
    setHasResult(false)
    setDisplayedAnswer("")
    setIsSaved(false)

    setCurrentStep("searching")
    setTimeout(() => {
      setCurrentStep("reading")
      setTimeout(() => {
        setCurrentStep("generating")
        setTimeout(() => {
          setCurrentStep("done")
          setHasResult(true)
          simulateStreaming(DEMO_ANSWER)
        }, 800)
      }, 1000)
    }, 1000)
  }, [simulateStreaming])

  useEffect(() => {
    setQuery(demoQuery)
    runSearchSequence()
  }, [demoQuery, runSearchSequence])

  const handleSearch = () => {
    if (!query.trim() || (currentStep !== null && currentStep !== "done")) return
    runSearchSequence()
  }

  const handleFollowUp = () => {
    if (!followUpQuery.trim() || (currentStep !== null && currentStep !== "done")) return
    setQuery(followUpQuery)
    setFollowUpQuery("")
    runSearchSequence()
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl gap-0 rounded-lg border">
      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">AI Search</h2>
              <p className="text-sm text-muted-foreground">
                Deep research with AI-powered answers
              </p>
            </div>
            {hasResult && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsSaved(!isSaved)}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Focus mode tabs */}
          <Tabs
            value={focusMode}
            onValueChange={(v) => setFocusMode(v as FocusMode)}
          >
            <TabsList>
              <TabsTrigger value="web" className="gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                Web
              </TabsTrigger>
              <TabsTrigger value="academic" className="gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-1.5">
                <Code className="h-3.5 w-3.5" />
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className="pl-9"
                disabled={currentStep !== null && currentStep !== "done"}
              />
            </div>
            <Button
              type="submit"
              disabled={!query.trim() || (currentStep !== null && currentStep !== "done")}
            >
              Search
            </Button>
          </form>

          {/* Multi-step progress indicator */}
          {currentStep && currentStep !== "done" && (
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                {SEARCH_STEPS.map((step, i) => {
                  const stepIndex = SEARCH_STEPS.findIndex((s) => s.key === currentStep)
                  const isActive = step.key === currentStep
                  const isComplete = i < stepIndex

                  return (
                    <div key={step.key} className="flex items-center gap-2">
                      {isComplete ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      ) : isActive ? (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          isActive
                            ? "text-foreground"
                            : isComplete
                              ? "text-muted-foreground"
                              : "text-muted-foreground/50"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Answer */}
          {hasResult && (
            <div className="space-y-5">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {displayedAnswer}
                {isStreaming && (
                  <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-foreground" />
                )}
              </div>

              {/* Follow-up input */}
              {!isStreaming && (
                <>
                  <Separator />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleFollowUp()
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={followUpQuery}
                      onChange={(e) => setFollowUpQuery(e.target.value)}
                      placeholder="Ask a follow-up question..."
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="outline"
                      disabled={!followUpQuery.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Source sidebar */}
      {hasResult && (
        <div className="w-72 shrink-0 border-l bg-muted/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Sources</h3>
            <Badge variant="secondary" className="text-[10px]">
              {DEMO_SOURCES.length} found
            </Badge>
          </div>
          <div className="space-y-3">
            {DEMO_SOURCES.map((source) => (
              <div
                key={source.id}
                className="cursor-pointer space-y-1 rounded-md border bg-background p-2.5 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 font-mono text-[10px] font-bold text-primary">
                    [{source.id}]
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium leading-tight">
                      {source.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1">
                      <Globe className="h-2.5 w-2.5 text-muted-foreground" />
                      <span className="truncate text-[10px] text-muted-foreground">
                        {source.domain}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                </div>
                <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                  {source.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
