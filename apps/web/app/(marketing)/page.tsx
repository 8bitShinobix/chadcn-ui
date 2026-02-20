import { Hero } from "@/components/marketing/hero";
import { BlockShowcase } from "@/components/marketing/block-showcase";

export default function Home(): React.ReactElement {
  return (
    <main className="flex flex-col items-center px-6 pt-8 pb-24 sm:pt-12">
      <Hero />

      {/* Block showcase */}
      <section className="mx-auto mt-16 w-full max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Built for every SaaS page
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            35+ production-ready blocks across auth, billing, settings, dashboards, and more.
          </p>
        </div>
        <BlockShowcase />
      </section>
    </main>
  );
}
