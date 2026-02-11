import Link from "next/link";
import type { RegistryBlock } from "@/types/registry";

interface BlockCardProps {
  block: RegistryBlock;
}

export function BlockCard({ block }: BlockCardProps): React.ReactElement {
  return (
    <Link
      href={`/blocks/${block.category}/${block.slug}`}
      className="group border-border hover:border-foreground/20 block rounded-lg border p-5 transition-all"
    >
      <h3 className="font-semibold">{block.name}</h3>
      <p className="text-foreground-muted mt-1.5 line-clamp-2 text-sm">{block.description}</p>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-foreground-subtle text-xs">
          {block.variants.length} variant
          {block.variants.length !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-1">
          {block.variants.map((variant) => (
            <span
              key={variant}
              className="bg-foreground-subtle h-1.5 w-1.5 rounded-full"
              title={variant}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
