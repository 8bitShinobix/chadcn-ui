import { BentoGrid } from "@/components/marketing/bento-grid";
import { FadeIn } from "@/components/marketing/fade-in";
import { Hero } from "@/components/marketing/hero";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Home(): React.ReactElement {
  return (
    <main className="relative flex flex-col items-center overflow-hidden pb-24">
      {/* Hero */}
      <section className="w-full px-6 pt-16 sm:pt-24">
        <Hero />
      </section>

      {/* Bento Grid Showcase */}
      <FadeIn className="mx-auto mt-20 w-full max-w-7xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            The UI library your SaaS deserves.
          </h2>
          <p className="text-muted-foreground mt-2 text-base">
            A growing collection of responsive, accessible blocks you can drop into any project
            across auth, billing, AI, cloud, and more.
          </p>
        </div>
        <BentoGrid />
      </FadeIn>

      <footer className="border-border mt-20 w-full">
        <div className="text-muted-foreground mx-auto flex max-w-7xl items-center justify-center gap-1 px-6 py-6 text-sm">
          <span>Built with</span>
          <Heart className="h-4 w-4 fill-current text-red-500" />
          <span>for designers. By designers.</span>
          <Link
            href="https://github.com/8bitShinobix"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium transition-colors hover:underline"
          >
            (8bitshinobi)
          </Link>
        </div>
      </footer>
    </main>
  );
}
