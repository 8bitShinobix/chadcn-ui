"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const messages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Can you explain how React Server Components work?",
    timestamp: "2:14 PM",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "React Server Components (RSC) allow you to render components on the server. They never ship JavaScript to the client, which means they can directly access backend resources like databases and file systems. The key benefit is a smaller client bundle and faster initial page loads.",
    timestamp: "2:14 PM",
  },
  {
    id: "3",
    role: "user",
    content: "How are they different from SSR?",
    timestamp: "2:15 PM",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Great question! SSR renders the full page to HTML on each request, then hydrates everything on the client. Server Components are more granular — they render individual components on the server and stream them to the client. Client Components still hydrate normally, but Server Components never hydrate at all. This means you get server rendering benefits without the hydration cost.",
    timestamp: "2:15 PM",
  },
]

export default function MessageCardMinimal() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback
              className={`text-xs ${
                msg.role === "assistant"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.role === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div
            className={`max-w-[80%] space-y-1 ${msg.role === "user" ? "items-end" : ""}`}
          >
            <div
              className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.content}
            </div>
            <p
              className={`text-xs text-muted-foreground ${
                msg.role === "user" ? "text-right" : ""
              }`}
            >
              {msg.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
