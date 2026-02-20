import Link from "next/link";
import { GitHubIcon } from "@/components/icons";

export function GithubLinkButton() {
  return (
    <Link
      href="https://github.com/8bitShinobix/chadcn-ui"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full">
        <GitHubIcon className="h-4 w-4" />
      </div>
    </Link>
  );
}
