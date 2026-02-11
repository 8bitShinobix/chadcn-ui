"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { TocItem } from "@/lib/mdx"

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({
  items,
  className,
}: TableOfContentsProps): React.ReactElement | null {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0% -80% 0%",
        threshold: 0,
      }
    )

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    headingElements.forEach((el) => observer.observe(el))

    return () => {
      headingElements.forEach((el) => observer.unobserve(el))
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  // Filter to only show h2 and h3 in TOC
  const tocItems = items.filter((item) => item.level >= 2 && item.level <= 3)

  if (tocItems.length === 0) {
    return null
  }

  return (
    <nav className={cn("space-y-1", className)} aria-label="Table of contents">
      <p className="mb-4 text-sm font-semibold text-foreground">On this page</p>
      <ul className="space-y-2 text-sm">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-foreground-muted transition-colors hover:text-foreground",
                item.level === 3 && "pl-4",
                activeId === item.id && "font-medium text-accent"
              )}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                  setActiveId(item.id)
                  // Update URL hash without scrolling
                  window.history.pushState(null, "", `#${item.id}`)
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
