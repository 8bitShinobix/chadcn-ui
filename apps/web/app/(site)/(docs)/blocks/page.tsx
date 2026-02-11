import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getAllBlocks } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Browse our collection of production-ready SaaS blocks built with React, Tailwind CSS, and shadcn/ui.",
};

export default async function BlocksPage(): Promise<React.ReactElement> {
  const [categories, allBlocks] = await Promise.all([getCategories(), getAllBlocks()]);

  // Count blocks per category
  const blockCounts = allBlocks.reduce(
    (acc, block) => {
      acc[block.category] = (acc[block.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="pb-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blocks</h1>
        <p className="text-foreground-muted mt-4 text-xl">
          Production-ready UI blocks for your SaaS application. Built with React, Tailwind CSS, and
          shadcn/ui.
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blocks/${category.slug}`}
            className="group border-border hover:border-foreground/20 block rounded-lg border p-6 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <p className="text-foreground-muted mt-1 text-sm">{category.description}</p>
                <p className="text-foreground-subtle mt-3 text-xs">
                  {blockCounts[category.slug] || 0} block
                  {(blockCounts[category.slug] || 0) !== 1 ? "s" : ""}
                </p>
              </div>
              <span className="text-foreground-muted ml-4 text-lg opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="border-border rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">No blocks yet</h3>
          <p className="text-foreground-muted mt-2 text-sm">
            Blocks will appear here once they are added to the registry.
          </p>
        </div>
      )}
    </div>
  );
}
