import { mainNav } from "@/config/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={className}>
      {mainNav.map((item) => (
        <Link href={item.href} key={item.href}>
          <Button variant={"link"}>{item.title}</Button>
        </Link>
      ))}
    </nav>
  );
}
