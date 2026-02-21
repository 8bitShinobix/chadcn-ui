"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowUp,
  Paperclip,
  Square,
  Upload,
  X,
} from "lucide-react"

interface AttachedFile {
  id: string
  name: string
  size: string
}

export function PromptInput() {
  const [value, setValue] = useState("")
  const [model, setModel] = useState("claude-4")
  const [isGenerating, setIsGenerating] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_CHARS = 4000

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
    if (!value.trim() || isGenerating) return
    setIsGenerating(true)
    setTimeout(() => {
      setValue("")
      setAttachedFiles([])
      setIsGenerating(false)
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }, 2000)
  }

  const handleStop = () => {
    setIsGenerating(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newFiles: AttachedFile[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }))
    setAttachedFiles((prev) => [...prev, ...newFiles])
    e.target.value = ""
  }

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (!files.length) return
    const newFiles: AttachedFile[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }))
    setAttachedFiles((prev) => [...prev, ...newFiles])
  }

  const charCount = value.length
  const charPercent = (charCount / MAX_CHARS) * 100

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className={`relative rounded-2xl border bg-background shadow-sm transition-colors ${
          isDragOver ? "border-primary bg-primary/5" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-primary/5">
            <div className="flex flex-col items-center gap-2 text-primary">
              <Upload className="h-8 w-8" />
              <span className="text-sm font-medium">Drop files here</span>
            </div>
          </div>
        )}

        {/* Attached files */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs"
              >
                <Paperclip className="h-3 w-3 text-muted-foreground" />
                <span className="max-w-[150px] truncate font-medium">
                  {file.name}
                </span>
                <span className="text-muted-foreground">{file.size}</span>
                <button
                  onClick={() => removeFile(file.id)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setValue(e.target.value)
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={isGenerating}
          rows={1}
          className="w-full resize-none bg-transparent px-4 pt-4 pb-14 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 md:text-base"
        />

        {/* Bottom toolbar */}
        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleFileSelect}
              disabled={isGenerating}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="h-8 w-[140px] border-none bg-transparent text-xs shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-4">Claude 4</SelectItem>
                <SelectItem value="gemini-2">Gemini 2.0</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {/* Character count */}
            <span
              className={`text-xs ${
                charPercent > 90
                  ? "text-destructive"
                  : charPercent > 75
                    ? "text-amber-500"
                    : "text-muted-foreground"
              }`}
            >
              {charCount}/{MAX_CHARS}
            </span>

            {isGenerating ? (
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleStop}
              >
                <Square className="h-3 w-3 fill-current" />
              </Button>
            ) : (
              <Button
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={!value.trim()}
                onClick={handleSubmit}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        AI may produce inaccurate information. Verify important facts.
      </p>
    </div>
  )
}
