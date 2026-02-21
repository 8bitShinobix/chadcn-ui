"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Play, RotateCcw, Loader2 } from "lucide-react"

export function AIPlayground() {
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant. Respond concisely and accurately."
  )
  const [userMessage, setUserMessage] = useState("")
  const [response, setResponse] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleSubmit = () => {
    if (!userMessage.trim() || isRunning) return
    setIsRunning(true)
    setResponse("")

    const sampleResponse = `Based on your system prompt configuration, here is the model's response:

This is a simulated completion from the AI playground. In production, this would call your configured model endpoint with the system prompt and user message.

The response respects the system instructions provided and generates output accordingly. You can modify the system prompt above to change the model's behavior.`

    let i = 0
    const interval = setInterval(() => {
      i += 3
      if (i >= sampleResponse.length) {
        setResponse(sampleResponse)
        setIsRunning(false)
        clearInterval(interval)
      } else {
        setResponse(sampleResponse.slice(0, i))
      }
    }, 15)
  }

  const handleClear = () => {
    setUserMessage("")
    setResponse("")
  }

  return (
    <div className="mx-auto flex h-[600px] w-full max-w-2xl flex-col rounded-lg border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-semibold">Playground</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          disabled={isRunning}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Clear
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="space-y-2">
          <Label htmlFor="system-prompt">System Prompt</Label>
          <Textarea
            id="system-prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter system instructions..."
            className="min-h-[80px] resize-none text-sm"
            disabled={isRunning}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="user-message">User Message</Label>
          <Textarea
            id="user-message"
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
          <Label>Response</Label>
          <div className="min-h-[120px] rounded-md border bg-muted/50 p-3 text-sm">
            {response ? (
              <div className="whitespace-pre-wrap">
                {response}
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
  )
}
