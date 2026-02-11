import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlockInfo, getBlockCode, getBlockSlugs } from "@/lib/registry";
import { highlightCode } from "@/lib/highlight-code";
import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockVariant } from "@/types/registry";

interface BlockPageProps {
  params: Promise<{ category: string; block: string }>;
  searchParams: Promise<{ variant?: string }>;
}

export async function generateStaticParams(): Promise<{ category: string; block: string }[]> {
  return getBlockSlugs();
}

export async function generateMetadata({ params }: BlockPageProps): Promise<Metadata> {
  const { category, block: blockSlug } = await params;
  const blockInfo = await getBlockInfo(category, blockSlug);

  if (!blockInfo) {
    return { title: "Not Found" };
  }

  return {
    title: blockInfo.name,
    description: blockInfo.description,
  };
}

export default async function BlockPage({
  params,
  searchParams,
}: BlockPageProps): Promise<React.ReactElement> {
  const { category, block: blockSlug } = await params;
  const { variant = "standard" } = await searchParams;

  const blockInfo = await getBlockInfo(category, blockSlug);

  if (!blockInfo) {
    notFound();
  }

  // Validate variant
  const validVariant = blockInfo.variants.includes(variant as BlockVariant)
    ? (variant as BlockVariant)
    : blockInfo.variants[0];

  // Generate component name from slug: "login" → "LoginForm"
  const componentName =
    blockSlug.charAt(0).toUpperCase() +
    blockSlug.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()) +
    "Form";

  // 1. Generate usage page.tsx
  const usagePageCode = `import { ${componentName} } from "@/components/${blockSlug}-form"

export default function ${componentName.replace("Form", "")}Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <${componentName} />
    </div>
  )
}`;

  // 2. Get current variant's block code
  const blockCode = await getBlockCode(category, blockSlug, validVariant);

  // Build virtual file tree (block code + usage example only)
  const allFiles: { path: string; content: string }[] = [
    ...(blockCode ? [{ path: `components/${blockSlug}-form.tsx`, content: blockCode }] : []),
    { path: `app/${category}/page.tsx`, content: usagePageCode },
  ];

  // Highlight each file server-side (both themes)
  const highlightedFiles = await Promise.all(
    allFiles.map(async (file) => {
      const lang = file.path.endsWith(".json") ? "json" : "tsx";
      const [highlightedDark, highlightedLight] = await Promise.all([
        highlightCode({ code: file.content, lang, theme: "github-dark" }),
        highlightCode({ code: file.content, lang, theme: "github-light" }),
      ]);
      return {
        path: file.path,
        content: file.content,
        highlightedDark,
        highlightedLight,
      };
    })
  );

  return (
    <BlockViewer
      name={blockInfo.name}
      description={blockInfo.description}
      slug={blockInfo.slug}
      category={category}
      variants={blockInfo.variants}
      currentVariant={validVariant}
      files={highlightedFiles}
      defaultFileIndex={0}
      dependencies={blockInfo.dependencies}
      registryDependencies={blockInfo.registryDependencies}
    />
  );
}
