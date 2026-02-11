#!/usr/bin/env node

/**
 * @chadcn/cli - CLI for chadcn
 *
 * Commands:
 * - chadcn init     Initialize chadcn in your project
 * - chadcn add      Add a block to your project
 * - chadcn list     List available blocks
 */

import { Command } from "commander";

const program = new Command();

program
  .name("chadcn")
  .description("CLI for adding chadcn blocks to your project")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize chadcn in your project")
  .action(async () => {
    console.log("Initializing chadcn...");
    console.log("TODO: Implement init command in Phase 17.3");
  });

program
  .command("add <block>")
  .description("Add a block to your project (e.g., chadcn add auth/login)")
  .option("-v, --variant <variant>", "Block variant", "standard")
  .action(async (block: string, options: { variant: string }) => {
    console.log(`Adding block: ${block} (variant: ${options.variant})`);
    console.log("TODO: Implement add command in Phase 17.3");
  });

program
  .command("list")
  .description("List available blocks")
  .option("-c, --category <category>", "Filter by category")
  .action(async (options: { category?: string }) => {
    console.log("Available blocks:");
    if (options.category) {
      console.log(`Filtering by category: ${options.category}`);
    }
    console.log("TODO: Implement list command in Phase 17.3");
  });

program.parse();
