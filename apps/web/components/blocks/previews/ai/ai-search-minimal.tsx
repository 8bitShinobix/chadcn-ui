"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink } from "lucide-react"

interface Source {
  title: string
  url: string
}

const DEMO_ANSWER = `WebAssembly (Wasm) is a binary instruction format designed as a portable compilation target for programming languages. It enables high-performance applications to run on the web at near-native speed.

Key advantages of WebAssembly include:

- **Near-native performance** for computationally intensive tasks like gaming, video editing, and scientific simulations
- **Language flexibility** allowing developers to write in C, C++, Rust, and other languages that compile to Wasm
- **Security** through a sandboxed execution environment with memory isolation
- **Portability** across all modern browsers and increasingly in server-side environments

WebAssembly works alongside JavaScript rather than replacing it. JavaScript handles DOM manipulation and high-level application logic, while Wasm takes on performance-critical computation.`

const DEMO_SOURCES: Source[] = [
  { title: "MDN Web Docs - WebAssembly", url: "developer.mozilla.org" },
  { title: "WebAssembly.org", url: "webassembly.org" },
  { title: "Can I use WebAssembly?", url: "caniuse.com" },
]

export default function AISearchMinimal() {
  const [query, setQuery] = useState("What is WebAssembly and why does it matter?")
  const [hasSearched, setHasSearched] = useState(true)

  const handleSearch = () => {
    if (!query.trim()) return
    setHasSearched(true)
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">AI Search</h2>
        <p className="text-sm text-muted-foreground">
          Ask anything and get an AI-powered answer with sources
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
          />
        </div>
        <Button type="submit" disabled={!query.trim()}>
          Search
        </Button>
      </form>

      {hasSearched && (
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {DEMO_ANSWER}
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Sources
            </p>
            <div className="space-y-1.5">
              {DEMO_SOURCES.map((source, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  <span className="font-medium">{source.title}</span>
                  <span className="text-xs">({source.url})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
