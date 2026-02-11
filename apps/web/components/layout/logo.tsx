import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" aria-label="Home" className={cn("m-2", className)}>
      {/* Dark logo (black) - visible on light
      backgrounds */}
      <Image
        src="/logo-dark.svg"
        alt="Logo"
        width={21}
        height={25}
        className="dark:hidden"
        priority
      />

      {/* Light logo (white) - visible on dark
      backgrounds */}
      <Image
        src="/logo-light.svg"
        alt="Logo"
        width={21}
        height={25}
        className="hidden dark:block"
        priority
      />
    </Link>
  );
}
