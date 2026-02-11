import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getDocBySlug, getDocSlugs, extractHeadings } from "@/lib/mdx";
import { highlightCode, extractLanguage } from "@/lib/highlight-code";
import { mdxComponents, TableOfContents } from "@/components/docs";
import { Pre } from "@/components/docs/code-block";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const slugs = getDocSlugs();
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const doc = await getDocBySlug(slug);
    return {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
    };
  } catch {
    return {
      title: "Not Found",
    };
  }
}

// Custom pre component that handles code highlighting
async function CodeBlockWrapper({
  children,
  ...props
}: React.ComponentProps<"pre">): Promise<React.ReactElement> {
  // Extract the code element from children
  const codeElement = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (!codeElement?.props) {
    return <pre {...props}>{children}</pre>;
  }

  const code = codeElement.props.children || "";
  const className = codeElement.props.className || "";
  const language = extractLanguage(className);

  // Highlight the code
  const highlightedCode = await highlightCode({
    code: typeof code === "string" ? code.trim() : "",
    lang: language,
    theme: "github-dark",
  });

  // Return the Pre client component with highlighted code + copy button
  return (
    <Pre
      data-language={language}
      data-code={typeof code === "string" ? code.trim() : ""}
      data-highlighted={highlightedCode}
      className={props.className as string}
    >
      {children}
    </Pre>
  );
}

export default async function DocPage({ params }: DocPageProps): Promise<React.ReactElement> {
  const { slug } = await params;

  let doc;
  try {
    doc = await getDocBySlug(slug);
  } catch {
    notFound();
  }

  const headings = extractHeadings(doc.content);

  // Create components with the async code block wrapper
  const components = {
    ...mdxComponents,
    pre: CodeBlockWrapper,
  };

  return (
    <div className="flex gap-10">
      <article className="prose prose-neutral dark:prose-invert max-w-none min-w-0 flex-1 pb-12">
        <h1 className="scroll-mt-20 text-4xl font-bold tracking-tight">{doc.frontmatter.title}</h1>
        {doc.frontmatter.description && (
          <p className="text-foreground-muted mt-2 text-xl">{doc.frontmatter.description}</p>
        )}
        <hr className="border-border my-8" />
        <MDXRemote
          source={doc.content}
          components={components}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
      {headings.length > 0 && (
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20">
            <TableOfContents items={headings} />
          </div>
        </aside>
      )}
    </div>
  );
}
