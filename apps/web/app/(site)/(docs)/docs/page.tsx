import Link from "next/link";
import type { Metadata } from "next";
import { getAllDocs } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use chadcn to build production-ready SaaS applications with our comprehensive documentation.",
};

interface DocSection {
  title: string;
  description: string;
  href: string;
  pattern: string;
}

const sections: DocSection[] = [
  {
    title: "Introduction",
    description: "Learn what chadcn is and how it works.",
    href: "/docs/introduction",
    pattern: "introduction",
  },
  {
    title: "Getting Started",
    description: "Install chadcn and set up your first project in minutes.",
    href: "/docs/getting-started/installation",
    pattern: "getting-started",
  },
  {
    title: "Changelog",
    description: "Latest updates and announcements.",
    href: "/docs/changelog",
    pattern: "changelog",
  },
];

export default async function DocsPage(): Promise<React.ReactElement> {
  const allDocs = await getAllDocs();

  return (
    <div className="pb-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="text-foreground-muted mt-4 text-xl">
          Everything you need to build beautiful, production-ready SaaS applications with chadcn.
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {sections.map((section) => {
          const sectionDocs = allDocs.filter((doc) => doc.slug.startsWith(section.pattern));

          return (
            <Link
              key={section.title}
              href={section.href}
              className="group border-border hover:border-foreground/20 block rounded-lg border p-6 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="text-foreground-muted mt-1 text-sm">{section.description}</p>
                  {sectionDocs.length > 0 && (
                    <p className="text-foreground-subtle mt-3 text-xs">
                      {sectionDocs.length} article{sectionDocs.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                <span className="text-foreground-muted ml-4 text-lg opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                  &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {allDocs.length > 0 && (
        <div className="mt-12 max-w-2xl">
          <h2 className="mb-6 text-2xl font-semibold">All Documentation</h2>
          <div className="divide-border divide-y">
            {allDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="hover:bg-background-subtle block py-4 transition-colors"
              >
                <h3 className="font-medium">{doc.title}</h3>
                {doc.description && (
                  <p className="text-foreground-muted mt-1 text-sm">{doc.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
