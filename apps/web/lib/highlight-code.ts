import { createHighlighter, type Highlighter, type BundledLanguage } from "shiki";

let highlighterDark: Highlighter | null = null;
let highlighterLight: Highlighter | null = null;

const shikiLangs = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
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
] as const;

async function getHighlighterForTheme(
  theme: "github-dark" | "github-light"
): Promise<Highlighter> {
  if (theme === "github-dark") {
    if (!highlighterDark) {
      highlighterDark = await createHighlighter({ themes: [theme], langs: [...shikiLangs] });
    }
    return highlighterDark;
  }
  if (!highlighterLight) {
    highlighterLight = await createHighlighter({ themes: [theme], langs: [...shikiLangs] });
  }
  return highlighterLight;
}

export interface HighlightOptions {
  code: string;
  lang?: string;
  theme?: "github-dark" | "github-light";
}

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
  const hl = await getHighlighterForTheme(theme);

  const loaded = hl.getLoadedLanguages();
  const supportedLang = loaded.includes(lang as BundledLanguage)
    ? (lang as BundledLanguage)
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
