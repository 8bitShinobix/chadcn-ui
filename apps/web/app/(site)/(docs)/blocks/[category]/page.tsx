import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getBlocksByCategory,
  getCategorySlugs,
  getCategoryBySlug,
} from "@/lib/registry"
import { BlockCard } from "@/components/blocks/block-card"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const slugs = getCategorySlugs()
  return slugs.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryInfo = await getCategoryBySlug(category)

  if (!categoryInfo) {
    return { title: "Not Found" }
  }

  return {
    title: `${categoryInfo.name} Blocks`,
    description: categoryInfo.description,
  }
}

export default async function CategoryPage({
  params,
}: CategoryPageProps): Promise<React.ReactElement> {
  const { category } = await params

  const [blocks, categoryInfo] = await Promise.all([
    getBlocksByCategory(category),
    getCategoryBySlug(category),
  ])

  if (!categoryInfo) {
    notFound()
  }

  return (
    <div className="pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {categoryInfo.name}
        </h1>
        <p className="mt-2 text-lg text-foreground-muted">
          {categoryInfo.description}
        </p>
      </div>

      {blocks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <BlockCard key={`${block.category}/${block.slug}`} block={block} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <h3 className="text-lg font-medium">No blocks in this category</h3>
          <p className="mt-2 text-sm text-foreground-muted">
            Blocks will appear here once they are added.
          </p>
        </div>
      )}
    </div>
  )
}
