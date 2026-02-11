"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { mainNav } from "@/config/navigation";
import Link from "next/link";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <div className={className}>
        <Button
          variant="ghost"
          aria-label="mobile-navigation"
          className="hover:bg-muted relative inline-flex h-9 items-center justify-center rounded-md transition-colors"
        >
          <Menu className="h-4 w-4" />
          Menu
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            aria-label="mobile-navigation"
            className="hover:bg-muted relative inline-flex h-9 items-center justify-center rounded-md transition-colors"
          >
            <Menu className="h-4 w-4" />
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent showCloseButton={false} side="left">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <Logo />
              <span className="text-2xl font-normal">chadcn</span>
            </SheetTitle>
          </SheetHeader>
          <div className="no-scrollbar overflow-y-auto px-4">
            <span className="text-muted-foreground my-3 block pl-4">Menu</span>
            <div className="flex flex-col">
              {mainNav.map((item) => (
                <Link href={item.href} key={item.href}>
                  <Button variant={"link"} className="text-2xl">
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
