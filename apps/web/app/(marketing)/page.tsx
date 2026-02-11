import { Hero } from "@/components/marketing/hero";
import { BlockComparison } from "@/components/marketing/block-comparison";
import { loadBlockCode } from "@/lib/load-block-code";

export default async function Home(): Promise<React.ReactElement> {
  const [genericHighlighted, chadcnHighlighted] = await Promise.all([
    loadBlockCode("auth", "login", "minimal"),
    loadBlockCode("auth", "login", "feature-rich"),
  ]);

  return (
    <main className="flex flex-col items-center px-6 pt-8 pb-24 sm:pt-12">
      <Hero />

      {/* Block comparison */}
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <p className="text-muted-foreground mb-6 text-center text-sm">
          Everything between shadcn and production &mdash; chadcn.
        </p>
        <BlockComparison
          genericHighlighted={genericHighlighted}
          chadcnHighlighted={chadcnHighlighted}
        />
      </section>
    </main>
  );
}
