import Link from "next/link";
import { Logo } from "./logo";
import { GitHubIcon, TwitterIcon, DiscordIcon } from "@/components/icons";
import { socialLinks } from "@/config/navigation";

const footerLinks = {
  Product: [
    { label: "Blocks", href: "/blocks" },
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/docs/changelog" },
  ],
  Resources: [
    { label: "Getting Started", href: "/docs/getting-started/installation" },
    { label: "CLI", href: "/docs/cli" },
    { label: "GitHub", href: "https://github.com" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
  ],
};

export function Footer(): React.ReactElement {
  return (
    <footer className="border-border mt-auto border-t">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="text-muted-foreground mt-3 text-sm">
              Production-ready blocks for shadcn/ui.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-foreground text-sm font-semibold">{heading}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-border mt-10 flex flex-col items-center gap-4 border-t pt-6 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} chadcn. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
            </Link>
            <Link
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <TwitterIcon className="h-4 w-4" />
            </Link>
            <Link
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <DiscordIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
