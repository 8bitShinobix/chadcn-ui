/**
 * Block Registry Utilities
 * Functions for accessing and querying the block registry
 */

import fs from "fs";
import path from "path";
import type {
  RegistryBlock,
  BlockCategory,
  BlockVariant,
  BlockApiResponse,
  BlockFile,
  RegistryFile,
  BlockMetadata,
} from "@/types/registry";

const BLOCKS_DIRECTORY = path.join(process.cwd(), "content/blocks");
const REGISTRY_PATH = path.join(BLOCKS_DIRECTORY, "registry.json");

// Cache for registry data (populated on first read)
let registryCache: RegistryFile | null = null;

/**
 * Load and cache the master registry file
 */
function getRegistry(): RegistryFile {
  if (registryCache) return registryCache;

  if (!fs.existsSync(REGISTRY_PATH)) {
    return { categories: {}, blocks: {} };
  }

  const content = fs.readFileSync(REGISTRY_PATH, "utf-8");
  registryCache = JSON.parse(content) as RegistryFile;
  return registryCache;
}

/**
 * Get block metadata from its metadata.json file
 */
async function getBlockMetadata(category: string, name: string): Promise<BlockMetadata | null> {
  const metadataPath = path.join(BLOCKS_DIRECTORY, category, name, "metadata.json");

  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  const content = fs.readFileSync(metadataPath, "utf-8");
  return JSON.parse(content) as BlockMetadata;
}

/**
 * Convert BlockMetadata to RegistryBlock format
 */
function metadataToRegistryBlock(metadata: BlockMetadata): RegistryBlock {
  // Flatten all file arrays into a single array
  const files = Object.values(metadata.files).flat();

  return {
    name: metadata.name,
    slug: metadata.slug,
    category: metadata.category,
    description: metadata.description,
    variants: metadata.variants,
    dependencies: metadata.dependencies,
    registryDependencies: metadata.registryDependencies,
    files,
  };
}

/**
 * Get all categories from the registry
 */
export async function getCategories(): Promise<BlockCategory[]> {
  const registry = getRegistry();
  return Object.values(registry.categories);
}

/**
 * Get all category slugs (for generateStaticParams)
 */
export function getCategorySlugs(): string[] {
  const registry = getRegistry();
  return Object.keys(registry.categories);
}

/**
 * Get all blocks from the registry
 */
export async function getAllBlocks(): Promise<RegistryBlock[]> {
  const registry = getRegistry();
  const blocks: RegistryBlock[] = [];

  for (const blockKey of Object.keys(registry.blocks)) {
    const [category, name] = blockKey.split("/");
    const metadata = await getBlockMetadata(category, name);
    if (metadata) {
      blocks.push(metadataToRegistryBlock(metadata));
    }
  }

  return blocks;
}

/**
 * Get all block slugs (for generateStaticParams)
 */
export function getBlockSlugs(): { category: string; block: string }[] {
  const registry = getRegistry();
  return Object.keys(registry.blocks).map((key) => {
    const [category, block] = key.split("/");
    return { category, block };
  });
}

/**
 * Get all blocks in a specific category
 */
export async function getBlocksByCategory(category: string): Promise<RegistryBlock[]> {
  const registry = getRegistry();
  const blocks: RegistryBlock[] = [];

  for (const [, info] of Object.entries(registry.blocks)) {
    if (info.category === category) {
      const metadata = await getBlockMetadata(category, info.name);
      if (metadata) {
        blocks.push(metadataToRegistryBlock(metadata));
      }
    }
  }

  return blocks;
}

/**
 * Get a single block with full data including file contents
 */
export async function getBlock(
  category: string,
  name: string,
  variant: BlockVariant = "standard"
): Promise<BlockApiResponse | null> {
  const metadata = await getBlockMetadata(category, name);
  if (!metadata) {
    return null;
  }

  // Validate and fallback variant
  const validVariant = metadata.variants.includes(variant) ? variant : metadata.variants[0];

  // Get files for this variant
  const variantFiles = metadata.files[validVariant] || [`${validVariant}.tsx`];
  const files: BlockFile[] = [];

  for (const fileName of variantFiles) {
    const filePath = path.join(BLOCKS_DIRECTORY, category, name, fileName);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      files.push({
        path: `components/${category}/${fileName}`,
        content,
      });
    }
  }

  return {
    name: metadata.name,
    category,
    variant: validVariant,
    files,
    dependencies: metadata.dependencies,
    registryDependencies: metadata.registryDependencies,
  };
}

/**
 * Get block metadata only (without file contents)
 */
export async function getBlockInfo(category: string, name: string): Promise<BlockMetadata | null> {
  return getBlockMetadata(category, name);
}

/**
 * Get raw code for a specific variant
 */
export async function getBlockCode(
  category: string,
  name: string,
  variant: BlockVariant = "standard"
): Promise<string | null> {
  const variantPath = path.join(BLOCKS_DIRECTORY, category, name, `${variant}.tsx`);

  if (!fs.existsSync(variantPath)) {
    return null;
  }

  return fs.readFileSync(variantPath, "utf-8");
}

/**
 * Get a category by its slug
 */
export async function getCategoryBySlug(slug: string): Promise<BlockCategory | null> {
  const registry = getRegistry();
  return registry.categories[slug] || null;
}
