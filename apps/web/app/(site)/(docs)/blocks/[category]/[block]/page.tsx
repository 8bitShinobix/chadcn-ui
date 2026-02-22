import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlockInfo, getBlockCode, getBlockSlugs } from "@/lib/registry";
import { highlightCode } from "@/lib/highlight-code";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { ManualInstallGuide } from "@/components/blocks/manual-install-guide";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  const usagePageCode = `import { ${componentName} } from "@/components/block/${blockSlug}-form"

export default function ${componentName.replace("Form", "")}Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <${componentName} />
    </div>
  )
}`;

  // 2. Get current variant's block code
  const blockCode = await getBlockCode(category, blockSlug, validVariant);

  // Extract UI component imports from block code (accurate per-variant)
  const uiImports = blockCode
    ? [...blockCode.matchAll(/from\s+["']@\/components\/ui\/([^"']+)["']/g)].map((m) => m[1])
    : [];
  const uniqueUiDeps = [...new Set(uiImports)].sort();

  // Extract third-party npm imports from block code (skip built-ins)
  const builtins = new Set(["react", "next", "next-themes", "next/navigation", "next/image", "next/link"]);
  const thirdPartyImports = blockCode
    ? [...blockCode.matchAll(/from\s+["']([^"'@./][^"']*)["']/g)]
        .map((m) => m[1])
        .filter((pkg) => !builtins.has(pkg) && !pkg.startsWith("lucide"))
    : [];
  const uniqueNpmDeps = [...new Set(thirdPartyImports)].sort();

  // 3. Load and highlight all variants' code for the manual install guide
  const allVariantCodes = await Promise.all(
    blockInfo.variants.map(async (v) => ({
      variant: v,
      code: await getBlockCode(category, blockSlug, v),
    }))
  );
  const variantFiles: Record<string, { path: string; content: string; highlightedDark: string; highlightedLight: string }> = {};
  await Promise.all(
    allVariantCodes.map(async ({ variant: v, code }) => {
      if (code) {
        const [highlightedDark, highlightedLight] = await Promise.all([
          highlightCode({ code, lang: "tsx", theme: "github-dark" }),
          highlightCode({ code, lang: "tsx", theme: "github-light" }),
        ]);
        variantFiles[v] = {
          path: `components/block/${blockSlug}-form.tsx`,
          content: code,
          highlightedDark,
          highlightedLight,
        };
      }
    })
  );

  // Build virtual file tree (block code + UI dependencies + usage example)
  const allFiles: { path: string; content: string }[] = [
    ...(blockCode ? [{ path: `components/block/${blockSlug}-form.tsx`, content: blockCode }] : []),
    ...uniqueUiDeps.map((dep) => ({
      path: `components/ui/${dep}.tsx`,
      content: `// shadcn/ui component\n// Docs: https://ui.shadcn.com/docs/components/${dep}`,
    })),
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
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/blocks">Blocks</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/blocks/${category}`} className="capitalize">
                {category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blockInfo.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
      <ManualInstallGuide
        dependencies={uniqueNpmDeps}
        registryDependencies={uniqueUiDeps}
        variantFiles={variantFiles}
        variants={blockInfo.variants}
        currentVariant={validVariant}
        usageFile={highlightedFiles[highlightedFiles.length - 1]}
      />
    </>
  );
}
