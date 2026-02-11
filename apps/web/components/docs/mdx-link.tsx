import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface MdxLinkProps {
  href?: string
  children: React.ReactNode
  className?: string
}

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://")
}

export function MdxLink({
  href,
  children,
  className,
}: MdxLinkProps): React.ReactElement {
  if (!href) {
    return <span className={className}>{children}</span>
  }

  const isExternal = isExternalLink(href)

  const linkStyles = cn(
    "text-[#0070f3] underline underline-offset-4 hover:text-[#0060df] transition-colors",
    className
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkStyles, "inline-flex items-center gap-1")}
      >
        {children}
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    )
  }

  return (
    <Link href={href} className={linkStyles}>
      {children}
    </Link>
  )
}
