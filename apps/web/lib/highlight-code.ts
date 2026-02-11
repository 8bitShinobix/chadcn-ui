import { createHighlighter, type Highlighter, type BundledLanguage } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [
        "typescript",
        "javascript",
        "json",
        "bash",
        "shell",
        "css",
        "html",
        "markdown",
        "mdx",
        "yaml",
        "sql",
        "python",
        "go",
        "rust",
      ],
    });
  }
  return highlighter;
}

export interface HighlightOptions {
  code: string;
  lang?: string;
  theme?: "github-dark" | "github-light";
}

// Remap unstable grammars to stable alternatives
const LANG_REMAP: Record<string, string> = {
  tsx: "typescript",
  jsx: "javascript",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function highlightCode({
  code,
  lang = "typescript",
  theme = "github-dark",
}: HighlightOptions): Promise<string> {
  const hl = await getHighlighter();

  // Remap unstable langs (tsx → typescript, jsx → javascript)
  const remapped = LANG_REMAP[lang] || lang;

  const loaded = hl.getLoadedLanguages();
  const supportedLang = loaded.includes(remapped as BundledLanguage)
    ? (remapped as BundledLanguage)
    : "typescript";

  try {
    return hl.codeToHtml(code, { lang: supportedLang, theme });
  } catch {
    // If primary lang crashes, try javascript as fallback
    try {
      return hl.codeToHtml(code, { lang: "javascript", theme });
    } catch {
      // Last resort: return escaped HTML preserving theme colors
      const bg = theme === "github-dark" ? "#24292e" : "#ffffff";
      const fg = theme === "github-dark" ? "#e1e4e8" : "#24292e";
      return `<pre class="shiki" style="background-color:${bg};color:${fg}"><code>${escapeHtml(code)}</code></pre>`;
    }
  }
}

export function extractLanguage(className?: string): string {
  if (!className) return "text";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "text";
}
