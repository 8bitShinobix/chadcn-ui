import { BentoGrid } from "@/components/marketing/bento-grid";
import { FadeIn } from "@/components/marketing/fade-in";
import { Hero } from "@/components/marketing/hero";

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
            Built for every SaaS page
          </h2>
          <p className="text-muted-foreground mt-2 text-base">
            57+ production-ready blocks across auth, billing, AI, cloud, and more.
          </p>
        </div>
        <BentoGrid />
      </FadeIn>
    </main>
  );
}
