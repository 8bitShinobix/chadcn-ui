import fs from "fs"
import path from "path"
import matter from "gray-matter"

const DOCS_DIRECTORY = path.join(process.cwd(), "content/docs")

export interface DocFrontmatter {
  title: string
  description?: string
  published?: boolean
  date?: string
  author?: string
}

export interface Doc {
  slug: string
  frontmatter: DocFrontmatter
  content: string
}

export interface DocMeta {
  slug: string
  title: string
  description?: string
}

function ensureDirectory(dir: string): boolean {
  return fs.existsSync(dir)
}

function getAllMdxFiles(dir: string, basePath = ""): string[] {
  if (!ensureDirectory(dir)) {
    return []
  }

  const files: string[] = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const relativePath = basePath ? `${basePath}/${item}` : item
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, relativePath))
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      // Remove extension and convert to slug
      const slug = relativePath.replace(/\.(mdx|md)$/, "")
      files.push(slug)
    }
  }

  return files
}

export function getDocSlugs(): string[] {
  return getAllMdxFiles(DOCS_DIRECTORY)
}

export async function getDocBySlug(slugArray: string[]): Promise<Doc> {
  const slug = slugArray.join("/")

  // Try .mdx first, then .md
  let filePath = path.join(DOCS_DIRECTORY, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DOCS_DIRECTORY, `${slug}.md`)
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Document not found: ${slug}`)
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: {
      title: data.title || slug,
      description: data.description,
      published: data.published ?? true,
      date: data.date,
      author: data.author,
    },
    content,
  }
}

export async function getAllDocs(): Promise<DocMeta[]> {
  const slugs = getDocSlugs()
  const docs: DocMeta[] = []

  for (const slug of slugs) {
    try {
      const doc = await getDocBySlug(slug.split("/"))
      if (doc.frontmatter.published !== false) {
        docs.push({
          slug: doc.slug,
          title: doc.frontmatter.title,
          description: doc.frontmatter.description,
        })
      }
    } catch {
      // Skip invalid docs
    }
  }

  return docs
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = slugify(text)
    headings.push({ id, text, level })
  }

  return headings
}
