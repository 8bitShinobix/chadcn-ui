import { cn } from "@/lib/utils"

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export function InlineCode({
  children,
  className,
}: InlineCodeProps): React.ReactElement {
  return (
    <code
      className={cn(
        "relative rounded bg-background-subtle px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground",
        className
      )}
    >
      {children}
    </code>
  )
}
