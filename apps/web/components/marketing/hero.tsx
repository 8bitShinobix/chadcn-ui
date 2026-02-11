import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero(): React.ReactElement {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      {/* Announcement pill */}
      <Link
        href="/docs/changelog"
        className="group border-border text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm transition-colors"
      >
        Auth blocks now available
        <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
      </Link>

      {/* Headline */}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        The missing layer above shadcn.{" "}
      </h1>
      {/* Subtitle */}
      <p className="text-muted-foreground mt-4 max-w-xl text-base sm:text-lg">
        Production-ready blocks for shadcn/ui that feel custom-built, not template-generated. Copy.
        Paste. Ship.
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex items-center gap-4">
        <Button asChild size="lg">
          <Link href="/docs/getting-started/installation">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/blocks">Browse Blocks</Link>
        </Button>
      </div>
    </div>
  );
}
