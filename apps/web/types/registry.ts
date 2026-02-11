/**
 * Block Registry Types
 * Defines the structure for block metadata and registry
 */

export type BlockVariant = "minimal" | "standard" | "feature-rich";

export interface BlockDependencies {
  [packageName: string]: string;
}

export interface BlockFile {
  path: string;
  content: string;
}

export interface RegistryBlock {
  name: string;
  slug: string;
  category: string;
  description: string;
  variants: BlockVariant[];
  dependencies: BlockDependencies;
  registryDependencies: string[];
  files: string[];
}

export interface BlockCategory {
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface Registry {
  blocks: Record<string, RegistryBlock>;
  categories: Record<string, BlockCategory>;
}

export interface BlockApiResponse {
  name: string;
  category: string;
  variant: BlockVariant;
  files: BlockFile[];
  dependencies: BlockDependencies;
  registryDependencies: string[];
}

export interface SearchResult {
  type: "block" | "doc";
  title: string;
  slug: string;
  category?: string;
  excerpt: string;
}

export interface SearchApiResponse {
  results: SearchResult[];
  total: number;
}

/**
 * Master registry file structure (registry.json)
 */
export interface RegistryFile {
  categories: Record<string, BlockCategory>;
  blocks: Record<string, { category: string; name: string }>;
}

/**
 * Per-block metadata.json structure
 */
export interface BlockMetadata {
  name: string;
  slug: string;
  category: string;
  description: string;
  variants: BlockVariant[];
  dependencies: BlockDependencies;
  registryDependencies: string[];
  files: Record<string, string[]>;
  keywords?: string[];
}
