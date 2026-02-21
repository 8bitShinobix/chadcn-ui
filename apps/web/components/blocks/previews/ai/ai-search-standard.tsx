"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, ExternalLink, Globe, ArrowRight } from "lucide-react"

interface Source {
  id: number
  title: string
  url: string
  domain: string
}

const DEMO_SOURCES: Source[] = [
  { id: 1, title: "Introduction to Rust Programming", url: "https://doc.rust-lang.org/book/", domain: "doc.rust-lang.org" },
  { id: 2, title: "Why Rust is the Future of Systems Programming", url: "https://stackoverflow.blog/rust-future", domain: "stackoverflow.blog" },
  { id: 3, title: "Rust vs C++: A Performance Comparison", url: "https://benchmarksgame.alioth.debian.org", domain: "benchmarksgame.alioth.debian.org" },
  { id: 4, title: "Memory Safety Without Garbage Collection", url: "https://arxiv.org/abs/rust-memory", domain: "arxiv.org" },
]

const DEMO_ANSWER = `Rust is a systems programming language focused on safety, speed, and concurrency. It achieves memory safety without a garbage collector through its unique ownership system [1].

Unlike C and C++, Rust prevents common bugs like null pointer dereferences, buffer overflows, and data races at compile time [2]. The borrow checker enforces strict rules about how references to data are used, catching potential issues before the code ever runs.

**Performance benchmarks** show Rust performing comparably to C++ in most workloads, with some cases where Rust's zero-cost abstractions actually outperform hand-written C++ [3].

Rust's approach to memory management uses three key concepts:

- **Ownership** \u2014 each value has a single owner variable
- **Borrowing** \u2014 references can temporarily access data without taking ownership
- **Lifetimes** \u2014 the compiler tracks how long references are valid

This system eliminates the need for garbage collection while still preventing memory leaks and use-after-free bugs, making Rust particularly well-suited for embedded systems, WebAssembly, and high-performance backends [4].`

const RELATED_QUESTIONS = [
  "How does Rust's ownership model work?",
  "What are the best use cases for Rust in production?",
  "How does Rust compare to Go for backend development?",
]

export default function AISearchStandard() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [displayedAnswer, setDisplayedAnswer] = useState("")
  const [hasResult, setHasResult] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [demoQuery] = useState("Why is Rust gaining popularity in systems programming?")

  const simulateStreaming = useCallback((fullText: string) => {
    let i = 0
    setIsStreaming(true)
    const interval = setInterval(() => {
      i += 4
      if (i >= fullText.length) {
        setDisplayedAnswer(fullText)
        setIsStreaming(false)
        clearInterval(interval)
      } else {
        setDisplayedAnswer(fullText.slice(0, i))
      }
    }, 15)
    return interval
  }, [])

  useEffect(() => {
    setQuery(demoQuery)
    setIsSearching(true)
    const searchTimeout = setTimeout(() => {
      setIsSearching(false)
      setHasResult(true)
      const interval = simulateStreaming(DEMO_ANSWER)
      return () => clearInterval(interval)
    }, 1500)
    return () => clearTimeout(searchTimeout)
  }, [demoQuery, simulateStreaming])

  const handleSearch = () => {
    if (!query.trim() || isSearching) return
    setIsSearching(true)
    setHasResult(false)
    setDisplayedAnswer("")
    setTimeout(() => {
      setIsSearching(false)
      setHasResult(true)
      simulateStreaming(DEMO_ANSWER)
    }, 1500)
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">AI Search</h2>
        <p className="text-sm text-muted-foreground">
          Get AI-powered answers with cited sources
        </p>
      </div>

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
            disabled={isSearching}
          />
        </div>
        <Button type="submit" disabled={!query.trim() || isSearching}>
          Search
        </Button>
      </form>

      {isSearching && (
        <div className="space-y-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex min-w-[180px] items-center gap-2 rounded-lg border p-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-2/3" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      )}

      {hasResult && (
        <div className="space-y-5">
          {/* Source cards */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {DEMO_SOURCES.map((source) => (
              <div
                key={source.id}
                className="flex min-w-[200px] cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium leading-tight">
                    {source.title}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                    {source.domain}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] font-bold text-muted-foreground">
                  [{source.id}]
                </span>
              </div>
            ))}
          </div>

          {/* Answer with inline citations */}
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {displayedAnswer}
            {isStreaming && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-foreground" />
            )}
          </div>

          {/* Related questions */}
          {!isStreaming && (
            <div className="border-t pt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Related questions
              </p>
              <div className="space-y-1.5">
                {RELATED_QUESTIONS.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(question)
                      handleSearch()
                    }}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span>{question}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
