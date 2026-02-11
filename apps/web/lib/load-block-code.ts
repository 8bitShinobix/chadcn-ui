import { readFileSync } from "fs";
import { join } from "path";
import { highlightCode } from "@/lib/highlight-code";

export interface HighlightedPair {
  dark: string;
  light: string;
}

/**
 * Read a block source file and return syntax-highlighted HTML for both themes.
 */
export async function loadBlockCode(
  category: string,
  block: string,
  variant: string
): Promise<HighlightedPair> {
  const filePath = join(
    process.cwd(),
    "content/blocks",
    category,
    block,
    `${variant}.tsx`
  );
  const code = readFileSync(filePath, "utf-8");

  const [dark, light] = await Promise.all([
    highlightCode({ code, lang: "typescript", theme: "github-dark" }),
    highlightCode({ code, lang: "typescript", theme: "github-light" }),
  ]);

  return { dark, light };
}
