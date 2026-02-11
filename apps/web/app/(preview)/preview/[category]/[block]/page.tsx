import { Suspense } from "react"
import { notFound } from "next/navigation"
import { loadBlockComponent, hasPreview } from "@/lib/block-loader"
import { getBlockSlugs } from "@/lib/registry"
import type { BlockVariant } from "@/types/registry"

interface PreviewPageProps {
  params: Promise<{ category: string; block: string }>
  searchParams: Promise<{ variant?: string; theme?: string }>
}

export async function generateStaticParams(): Promise<
  { category: string; block: string }[]
> {
  return getBlockSlugs()
}

function PreviewSkeleton(): React.ReactElement {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export default async function PreviewPage({
  params,
  searchParams,
}: PreviewPageProps): Promise<React.ReactElement> {
  const { category, block } = await params
  const { variant = "standard" } = await searchParams

  if (!hasPreview(category, block)) {
    notFound()
  }

  const Component = await loadBlockComponent(
    category,
    block,
    variant as BlockVariant
  )

  if (!Component) {
    return (
      <div className="text-center">
        <p className="text-foreground-muted">
          Preview not available for this variant
        </p>
      </div>
    )
  }

  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <Component />
    </Suspense>
  )
}
