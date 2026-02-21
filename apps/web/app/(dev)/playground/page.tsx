import { notFound } from "next/navigation";
import { getAllBlocks, getCategories } from "@/lib/registry";
import { PlaygroundClient } from "./playground-client";

export const dynamic = "force-dynamic";

export default async function PlaygroundPage(): Promise<React.ReactElement> {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const [blocks, categories] = await Promise.all([getAllBlocks(), getCategories()]);

  return <PlaygroundClient blocks={blocks} categories={categories} />;
}
