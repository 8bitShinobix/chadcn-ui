"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUp,
  Paperclip,
  Square,
  X,
  Mic,
  MicOff,
  Image,
  FileText,
  Slash,
} from "lucide-react"

interface AttachedFile {
  id: string
  name: string
  size: string
  type: "file" | "image"
}

interface SlashCommand {
  command: string
  description: string
  icon: React.ReactNode
}

const SLASH_COMMANDS: SlashCommand[] = [
  { command: "/summarize", description: "Summarize a long text or document", icon: <FileText className="h-4 w-4" /> },
  { command: "/translate", description: "Translate text to another language", icon: <FileText className="h-4 w-4" /> },
  { command: "/code", description: "Generate or explain code", icon: <Slash className="h-4 w-4" /> },
  { command: "/image", description: "Describe or analyze an image", icon: <Image className="h-4 w-4" /> },
  { command: "/edit", description: "Edit or refine existing text", icon: <FileText className="h-4 w-4" /> },
]

const SUGGESTION_PILLS = [
  "Explain this concept",
  "Write a summary",
  "Help me debug",
  "Generate code",
]

export function PromptInput() {
  const [value, setValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashFilter, setSlashFilter] = useState("")
  const [selectedSlashIndex, setSelectedSlashIndex] = useState(0)
  const [hasImagePaste, setHasImagePaste] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const slashMenuRef = useRef<HTMLDivElement>(null)

  const filteredCommands = SLASH_COMMANDS.filter((cmd) =>
    cmd.command.toLowerCase().includes(slashFilter.toLowerCase())
  )

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  useEffect(() => {
    setSelectedSlashIndex(0)
  }, [slashFilter])

  const handleSubmit = () => {
    if (!value.trim() || isGenerating) return
    setIsGenerating(true)
    setTimeout(() => {
      setValue("")
      setAttachedFiles([])
      setIsGenerating(false)
      setHasImagePaste(false)
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }, 2000)
  }

  const handleStop = () => {
    setIsGenerating(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    // Detect slash commands
    const lastWord = newValue.split(/\s/).pop() || ""
    if (lastWord.startsWith("/") && lastWord.length > 0) {
      setShowSlashMenu(true)
      setSlashFilter(lastWord)
    } else {
      setShowSlashMenu(false)
      setSlashFilter("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSlashMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedSlashIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        )
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedSlashIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        )
        return
      }
      if (e.key === "Enter" && filteredCommands.length > 0) {
        e.preventDefault()
        insertSlashCommand(filteredCommands[selectedSlashIndex])
        return
      }
      if (e.key === "Escape") {
        setShowSlashMenu(false)
        return
      }
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  const insertSlashCommand = (cmd: SlashCommand) => {
    const words = value.split(/\s/)
    words.pop()
    const newValue = [...words, cmd.command + " "].join(" ")
    setValue(newValue)
    setShowSlashMenu(false)
    setSlashFilter("")
    textareaRef.current?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        e.preventDefault()
        setHasImagePaste(true)
        const file = items[i].getAsFile()
        if (file) {
          setAttachedFiles((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              name: `Pasted image ${prev.filter((f) => f.type === "image").length + 1}`,
              size: `${(file.size / 1024).toFixed(1)} KB`,
              type: "image",
            },
          ])
        }
        break
      }
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
      type: file.type.startsWith("image/") ? "image" : "file",
    }))
    setAttachedFiles((prev) => [...prev, ...newFiles])
    e.target.value = ""
  }

  const removeFile = (id: string) => {
    const file = attachedFiles.find((f) => f.id === id)
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id))
    if (file?.type === "image" && !attachedFiles.some((f) => f.type === "image" && f.id !== id)) {
      setHasImagePaste(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording((prev) => !prev)
    if (isRecording) {
      // Simulate voice input result
      setValue((prev) => prev + (prev ? " " : "") + "Transcribed voice input text here")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion)
    textareaRef.current?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Suggestion pills */}
      {!value && !isGenerating && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTION_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => handleSuggestionClick(pill)}
              className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {pill}
            </button>
          ))}
        </div>
      )}

      <div className="relative rounded-2xl border bg-background shadow-sm">
        {/* Slash command menu */}
        {showSlashMenu && filteredCommands.length > 0 && (
          <div
            ref={slashMenuRef}
            className="absolute bottom-full left-0 z-20 mb-2 w-72 overflow-hidden rounded-lg border bg-popover shadow-lg"
          >
            <div className="p-1">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Commands
              </div>
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.command}
                  onClick={() => insertSlashCommand(cmd)}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
                    index === selectedSlashIndex
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                    {cmd.icon}
                  </span>
                  <div className="text-left">
                    <div className="font-medium">{cmd.command}</div>
                    <div className="text-xs text-muted-foreground">
                      {cmd.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image paste indicator */}
        {hasImagePaste && (
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <Image className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">
              Image pasted from clipboard
            </span>
          </div>
        )}

        {/* Attached files list */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs"
              >
                {file.type === "image" ? (
                  <Image className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <FileText className="h-3 w-3 text-muted-foreground" />
                )}
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Ask anything, or type / for commands..."
          disabled={isGenerating}
          rows={1}
          className="w-full resize-none bg-transparent px-4 pt-4 pb-14 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 md:text-base"
        />

        {/* Bottom toolbar */}
        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
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
            <Button
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={toggleRecording}
              disabled={isGenerating}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            {isRecording && (
              <Badge variant="destructive" className="gap-1 text-xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                Recording
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {isGenerating ? "Generating..." : "\u2318 Enter"}
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
