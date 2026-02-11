import { Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/mdx"

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

function HeadingAnchor({ id }: { id: string }): React.ReactElement {
  return (
    <a
      href={`#${id}`}
      className="ml-2 inline-flex opacity-0 transition-opacity group-hover:opacity-100"
      aria-label="Link to section"
    >
      <LinkIcon className="h-4 w-4 text-foreground-muted hover:text-accent" />
    </a>
  )
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const

  const styles: Record<number, string> = {
    1: "scroll-mt-20 text-4xl font-bold tracking-tight",
    2: "scroll-mt-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight mt-10 first:mt-0",
    3: "scroll-mt-20 text-xl font-semibold tracking-tight mt-8",
    4: "scroll-mt-20 text-lg font-semibold tracking-tight mt-6",
    5: "scroll-mt-20 text-base font-semibold tracking-tight mt-4",
    6: "scroll-mt-20 text-sm font-semibold tracking-tight mt-4",
  }

  return function Heading({ children, className }: Omit<HeadingProps, "level">): React.ReactElement {
    const text = typeof children === "string" ? children : ""
    const id = slugify(text)

    return (
      <Tag id={id} className={cn("group flex items-center", styles[level], className)}>
        {children}
        {id && <HeadingAnchor id={id} />}
      </Tag>
    )
  }
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)
