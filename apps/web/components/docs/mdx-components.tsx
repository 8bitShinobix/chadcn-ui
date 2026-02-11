import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { H1, H2, H3, H4, H5, H6 } from "./heading";
import { Pre } from "./code-block";
import { InlineCode } from "./inline-code";
import { MdxLink } from "./mdx-link";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./mdx-table";
import { Callout } from "./callout";
import { PackageInstall } from "./package-install";
import { FileTree } from "./file-tree";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  // Headings with anchor links
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  // Code blocks
  pre: Pre,
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
    // Check if this is a code block (inside pre) or inline code
    const isCodeBlock = className?.includes("language-");
    if (isCodeBlock) {
      // This will be handled by the pre component
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return <InlineCode {...props}>{children}</InlineCode>;
  },

  // Links
  a: MdxLink,

  // Tables
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,

  // Block elements
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn("border-border text-foreground-muted mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("text-foreground-muted", className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("border-border my-8", className)} {...props} />
  ),
  img: ({ className, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("border-border rounded-lg border", className)} alt={alt} {...props} />
  ),

  // Custom components for MDX
  Callout,
  PackageInstall,
  FileTree,
};
