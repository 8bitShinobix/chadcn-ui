"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export default function PromptInputMinimal() {
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const handleSubmit = () => {
    if (!value.trim() || isSubmitting) return
    setIsSubmitting(true)
    setTimeout(() => {
      setValue("")
      setIsSubmitting(false)
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative rounded-2xl border bg-background shadow-sm">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={isSubmitting}
          rows={1}
          className="w-full resize-none bg-transparent px-4 pt-4 pb-14 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 md:text-base"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {isSubmitting ? "Sending..." : "\u2318 Enter"}
          </span>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={!value.trim() || isSubmitting}
            onClick={handleSubmit}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        AI may produce inaccurate information. Verify important facts.
      </p>
    </div>
  )
}
